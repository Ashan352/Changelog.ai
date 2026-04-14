import { generateStreamingContent, parseTaggedResponse } from "@/lib/openrouter";
import { sanitizeInput } from "@/lib/sanitize";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/ratelimit";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

// Input Validation Schema
const generateSchema = z.object({
  commits: z.string().min(1, "Commits are required").max(50000, "Input too large"),
  version: z.string().max(50, "Version too long").optional(),
  repoName: z.string().max(100, "Project name too long").optional(),
  projectName: z.string().max(100, "Project name too long").optional(),
});

// Strictly follow Vercel Free Tier 10s timeout
export const maxDuration = 10;

// Server-side max input length: 50,000 chars (~12,500 tokens)
const MAX_INPUT_CHARS = 50_000;

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Rate Limiting — check first to protect DB
    const limitResult = await checkRateLimit(session.user.id) as { success: boolean };
    if (!limitResult.success) {
      return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), { 
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Always re-fetch user from DB — don't trust stale session JWT for plan/generations
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true, generations: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const { plan, generations } = user;

    if (plan === "free" && generations >= 5) {
      return new Response(JSON.stringify({ error: "Free limit reached" }), { status: 403 });
    }

    const jsonBody = await req.json();
    const validation = generateSchema.safeParse(jsonBody);
    
    if (!validation.success) {
      return new Response(JSON.stringify({ 
        error: "Validation failed", 
        details: validation.error.flatten().fieldErrors 
      }), { status: 400 });
    }

    const { commits, version, repoName, projectName } = validation.data;
    const targetCommits = commits;

    const sanitizedCommits = sanitizeInput(targetCommits);
    const isPro = plan === "pro";

    // Start generation — increment usage BEFORE stream to survive Vercel's function death
    // Vercel kills process immediately after response is sent, so onFinish won't reliably fire
    // We pre-increment and save pre-emptively, then use onFinish as best-effort history save
    const newGenerations = generations + 1;
    await prisma.user.update({
      where: { id: session.user.id },
      data: { generations: newGenerations },
    });

    const result = await generateStreamingContent(
      sanitizedCommits,
      version || "Latest",
      isPro,
      projectName || repoName || "",
      async ({ text }) => {
        // Best-effort: save history after stream completes
        // This may not run on Vercel Hobby but is not critical for the generation itself
        const object = parseTaggedResponse(text);
        if (!object.changelog) return;
        try {
          await prisma.generation.create({
            data: {
              userId: session.user.id,
              repoName: repoName || projectName || "Unnamed Project",
              version: object.version_detected || version || "Latest",
              content: object.changelog,
              commits: String(sanitizedCommits).split('\n').filter((l: string) => l.trim()).length,
            } as any
          });
          revalidatePath('/dashboard');
          revalidatePath('/dashboard/usage');
          (revalidateTag as any)('history');
          (revalidateTag as any)(`history-${session.user.id}`);
        } catch (err) {
          // Non-critical — generation count already incremented above
          console.error("History save failed (non-critical):", err);
        }
      }
    );

    return (result as any).toTextStreamResponse();

  } catch (error: any) {
    console.error("Generate API Error:", error.message || error);
    return new Response(JSON.stringify({ error: "Failed to generate content" }), { status: 500 });
  }
}
