import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const historySchema = z.object({
  repoName: z.string(),
  version: z.string(),
  content: z.string(),
  commitsCount: z.number(),
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

    const { repoName, version, content, commitsCount } = validation.data;

    // Update generation count and save history
    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: { generations: { increment: 1 } },
      }),
      prisma.generation.create({
        data: {
          userId: session.user.id,
          repoName: repoName || "Unnamed Project",
          version: version || "Latest",
          content: content,
          commits: commitsCount,
        }
      })
    ]);

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/usage');
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
