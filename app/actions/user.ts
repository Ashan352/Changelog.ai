'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateProfile(data: { name: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: data.name }
    });

    revalidatePath('/dashboard/settings');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    throw new Error("Failed to update profile");
  }
}
