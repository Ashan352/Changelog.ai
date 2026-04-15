import { generateStreamingContent } from "@/lib/openrouter";
import { sanitizeInput } from "@/lib/sanitize";
import { auth } from "@/lib/auth";
import { checkRateLimit } from "@/lib/ratelimit";
import { z } from "zod";

// Use Edge Runtime to bypass the 10s limit (Edge allows 30s streaming on Hobby)
export const runtime = 'edge';

// Input Validation Schema
const generateSchema = z.object({
  commits: z.string().min(1, "Commits are required").max(50000, "Input too large"),
  version: z.string().max(50, "Version too long").optional(),
  repoName: z.string().max(100, "Project name too long").optional(),
  projectName: z.string().max(100, "Project name too long").optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Rate Limiting (Upstash works on Edge)
    const limitResult = await checkRateLimit(session.user.id);
    if (!limitResult.success) {
      return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), { 
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Check plan limits from session (Soft check for Edge)
    const { plan, generations } = session.user;
    if (plan === "free" && (generations || 0) >= 5) {
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
    const sanitizedCommits = sanitizeInput(commits);
    const isPro = plan === "pro";

    // Start generation
    // We don't save to DB here because Prisma is not Edge-compatible.
    // The client will call /api/history once the stream is finished.
    const result = await generateStreamingContent(
      sanitizedCommits,
      version || "Latest",
      isPro,
      projectName || repoName || ""
    );

    return (result as any).toTextStreamResponse();

  } catch (error: any) {
    console.error("Generate API Error:", error.message || error);
    return new Response(JSON.stringify({ error: "Failed to generate content" }), { status: 500 });
  }
}
