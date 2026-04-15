import { GeneratorApp } from "@/components/generator/GeneratorApp"
import { auth } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await auth()
  const plan = session?.user?.plan || "free"

  return (
    <div className="w-full h-full max-w-7xl mx-auto">
      <GeneratorApp plan={plan} />
    </div>
  )
}
