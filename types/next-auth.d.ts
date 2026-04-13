import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      plan: string
      generations: number
    } & DefaultSession["user"]
  }

  interface User {
    plan: string
    generations: number
  }
}
