import NextAuth from "next-auth"
import authConfig from "./auth.config"

// Edge-compatible auth retrieval (No Prisma Adapter)
export const { auth: authEdge } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
})
