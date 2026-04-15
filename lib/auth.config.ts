import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: "read:user user:email repo" } },
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session, account }) {
      if (user) {
        token.id = user.id
        token.plan = (user as any).plan
        token.generations = (user as any).generations
      }
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
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
        session.user.accessToken = token.accessToken as string
        session.user.provider = token.provider as string
      }
      return session
    },
  },
} satisfies NextAuthConfig
