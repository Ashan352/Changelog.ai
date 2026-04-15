import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { LandingContent } from "@/components/landing/LandingContent"

export default async function LandingPage() {
  let session = null
  try {
    session = await auth()
    
    // If logged in, fetch fresh plan status from DB to override potentially stale JWT
    if (session?.user?.id) {
       const dbUser = await prisma.user.findUnique({
         where: { id: session.user.id },
         select: { plan: true }
       })
       if (dbUser && session.user) {
         session.user.plan = dbUser.plan
       }
    }
  } catch {
    // Stale cookie fallback
  }

  return <LandingContent session={session} />
}
