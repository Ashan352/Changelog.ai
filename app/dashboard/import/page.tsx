import { auth } from "@/lib/auth"
import { GitHubImport } from "@/components/dashboard/GitHubImport"

export default async function ImportPage() {
  const session = await auth()
  const accessToken = session?.user?.accessToken
  const provider = session?.user?.provider
  const plan = session?.user?.plan || "free"

  return (
    <div className="w-full h-full max-w-5xl mx-auto py-8">
      <GitHubImport accessToken={accessToken} provider={provider} plan={plan} />
    </div>
  )
}
