'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

import { z } from "zod"

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be under 50 characters"),
});

export async function updateProfile(data: { name: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validation = updateProfileSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.issues[0].message);
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: validation.data.name }
    });

    revalidatePath('/dashboard/settings');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    throw new Error("Failed to update profile");
  }
}

export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    await prisma.user.delete({
      where: { id: session.user.id }
    });
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete account");
  }
}
