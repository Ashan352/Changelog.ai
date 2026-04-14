"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
})

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  // Validate inputs
  const result = signupSchema.safeParse({ email, password, name })
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "User already exists with this email" }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user in database
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        plan: "free",
        generations: 0,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "Something went wrong during registration" }
  }
}

export async function checkUserExists(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });
    return { exists: !!user };
  } catch (error) {
    return { exists: false };
  }
}
