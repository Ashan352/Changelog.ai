import { auth } from "@/lib/auth"
import { LandingContent } from "@/components/landing/LandingContent"

export default async function LandingPage() {
  let session = null
  try {
    session = await auth()
  } catch {
    // Stale cookie fallback
  }

  return <LandingContent session={session} />
}
