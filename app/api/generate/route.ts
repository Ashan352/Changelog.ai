import { generateStreamingContent } from "@/lib/openrouter";
import { sanitizeInput } from "@/lib/sanitize";
import { authEdge } from "@/lib/auth-edge";
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
    // Use the Edge-safe authEdge instead of the Prisma-heavy auth()
    const session = await authEdge();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userId = session.user.id;
    const plan = session.user.plan || "free";
    const generations = session.user.generations || 0;
    const email = session.user.email;

    // Check Redis for permanent usage (prevents delete/recreate abuse)
    const { getUsage } = await import("@/lib/usage");
    const redisGenerations = email ? await getUsage(email) : 0;
    const totalGenerations = Math.max(generations, redisGenerations);

    // Rate Limiting (Upstash works on Edge)
    const limitResult = await checkRateLimit(userId);
    if (!limitResult.success) {
      return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), { 
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Check plan limits from session OR Redis
    if (plan === "free" && totalGenerations >= 5) {
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

    // Enforce 100 word limit on Free Plan
    if (!isPro) {
      const wordCount = sanitizedCommits.trim().split(/\s+/).length;
      if (wordCount > 100) {
        return new Response(JSON.stringify({ 
          error: "100 word limit exceeded on Free Plan. Please upgrade for unlimited words." 
        }), { status: 403 });
      }
    }

    // Start generation with retry logic handled inside generateStreamingContent
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
