import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      plan: string
      generations: number
      stripeCustomerId?: string | null
      stripeSubscriptionId?: string | null
    } & import("next-auth").DefaultSession["user"]
  }

  interface User {
    plan: string
    generations: number
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    password?: string | null
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.plan,
          generations: user.generations,
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.plan = (user as any).plan
        token.generations = (user as any).generations
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        session.user.plan = token.plan as string
        session.user.generations = token.generations as number
      }
      return session
    },
  },
})
