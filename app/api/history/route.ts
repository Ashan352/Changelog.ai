import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const historySchema = z.object({
  repoName: z.string(),
  version: z.string(),
  content: z.string(),
  commitsCount: z.number(),
  isPublic: z.boolean().optional().default(false),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const json = await req.json();
    const validation = historySchema.safeParse(json);
    
    if (!validation.success) {
      return new Response(JSON.stringify({ error: "Invalid data" }), { status: 400 });
    }

    const body = validation.data;

    // Update generation count and save history
    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: { generations: { increment: 1 } },
      }),
      prisma.generation.create({
        data: {
          userId: session.user.id,
          repoName: body.repoName || "Unnamed Project",
          version: body.version || "Latest",
          content: body.content,
          commits: body.commitsCount,
          isPublic: body.isPublic,
        }
      })
    ]);

    // Persistent Redis tracking to prevent delete/recreate abuse
    if (session.user.email) {
      const { incrementUsage } = await import("@/lib/usage");
      await incrementUsage(session.user.email);
    }

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/usage');
    revalidatePath('/blog');
    // @ts-ignore
    revalidateTag('history');
    // @ts-ignore
    revalidateTag(`history-${session.user.id}`);

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error: any) {
    console.error("History Save Error:", error.message || error);
    return new Response(JSON.stringify({ error: "Failed to save history" }), { status: 500 });
  }
}
