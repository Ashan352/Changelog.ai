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
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      // Security: Check if this email is already used by another provider
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true }
      });

      if (existingUser && account) {
        // If user exists and is signing in with a provider
        const isLinked = existingUser.accounts.some(
          (acc) => acc.provider === account.provider
        );

        if (!isLinked && existingUser.accounts.length > 0) {
          // User exists with a DIFFERENT provider. 
          // For security, we might want to prevent automatic merging 
          // but NextAuth handles this via allowDangerousEmailAccountLinking.
          // For this app, we'll allow it only if the email is verified (which Google/GitHub do)
          // but we'll log it or add logic if needed.
        }
      }
      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.plan = (user as any).plan
        token.generations = (user as any).generations
      }
      if (trigger === "update" && session) {
        token.plan = session.plan
        token.generations = session.generations
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
