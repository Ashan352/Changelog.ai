import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import authConfig from "./auth.config"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      plan: string
      generations: number
      accessToken?: string | null
      provider?: string | null
      stripeCustomerId?: string | null
      stripeSubscriptionId?: string | null
    } & import("next-auth").DefaultSession["user"]
  }

  interface User {
    plan: string
    generations: number
    accessToken?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    password?: string | null
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    ...authConfig.providers,
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
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      // Check if user already exists in DB
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true }
      });

      if (existingUser) {
        // If they are logging in with a new provider for the first time
        const isLinkedToThisProvider = existingUser.accounts.some(
          (acc) => acc.provider === account?.provider
        );

        if (!isLinkedToThisProvider && existingUser.accounts.length > 0) {
          // If the existing account was a 'credentials' account, we're okay with linking 
          // because OAuth providers (Google/GitHub) already verified the email.
          // This ensures that 'Stats' and 'Limits' are synced across providers.
          console.log(`Syncing stats for user ${user.email} from ${account?.provider}`);
        }
      }

      return true;
    },
  },
})

