import { auth } from "@/lib/auth"
import { GitHubImport } from "@/components/dashboard/GitHubImport"
import { prisma } from "@/lib/prisma"

export default async function ImportPage() {
  const session = await auth()
  const userId = session?.user?.id
  const plan = session?.user?.plan || "free"
  
  let accessToken = session?.user?.accessToken
  let provider = session?.user?.provider

  // If already github, we're good. If not, try to find a linked github account in the DB.
  if (provider !== 'github' && userId) {
    const githubAccount = await prisma.account.findFirst({
      where: {
        userId: userId,
        provider: 'github'
      }
    })
    
    if (githubAccount?.access_token) {
      accessToken = githubAccount.access_token
      provider = 'github' // Mark as github for the component logic
    }
  }

  return (
    <div className="w-full h-full max-w-5xl mx-auto py-8">
      <GitHubImport accessToken={accessToken} provider={provider} plan={plan} />
    </div>
  )
}
