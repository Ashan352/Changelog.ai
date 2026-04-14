export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, GitCommit, CreditCard } from "lucide-react"
import { UsageChart } from "@/components/dashboard/UsageChart"
import { unstable_cache } from "next/cache"

const getCachedHistory = (userId: string) => unstable_cache(
  async () => {
    return await prisma.generation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 7,
    });
  },
  [`dashboard-usage-history-${userId}`],
  { tags: ['history', `history-${userId}`], revalidate: 3600 }
)();

async function StatsContent() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  // Fetch source of truth from database (session data can be stale)
  const [dbUser, history] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { generations: true, plan: true }
    }),
    getCachedHistory(session.user.id)
  ])

  if (!dbUser) redirect("/login")

  // Format data for chart (last 7 generations)
  const chartData = history.reverse().map((item: { commits: number | null }, index: number) => ({
    name: `Gen ${index + 1}`,
    commits: item.commits || 0,
  }))

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-bg-surface border border-border shadow-sm">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent">
                 <GitCommit className="h-4 w-4" />
              </div>
              <span className="text-sm font-mono text-text-muted uppercase tracking-widest">Total Generations</span>
           </div>
           <div className="text-4xl font-serif italic text-text-primary">{dbUser.generations}</div>
        </div>
        
        <div className="p-6 rounded-2xl bg-bg-surface border border-border shadow-sm">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500">
                 <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-sm font-mono text-text-muted uppercase tracking-widest">Plan Tier</span>
           </div>
           <div className="text-4xl font-serif italic text-text-primary capitalize">{dbUser.plan}</div>
        </div>

        <div className="p-6 rounded-2xl bg-bg-surface border border-border shadow-sm">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500">
                 <CreditCard className="h-4 w-4" />
              </div>
              <span className="text-sm font-mono text-text-muted uppercase tracking-widest">Usage Limit</span>
           </div>
           <div className="text-4xl font-serif italic text-text-primary">
              {dbUser.plan === 'free' ? `${dbUser.generations} / 5` : 'Unlimited'}
           </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-bg-surface border border-border shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-serif italic text-text-primary">Activity Overview</h3>
            <p className="font-mono text-[12px] text-text-muted uppercase tracking-widest mt-1">Number of commits processed in recent generations</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-accent" />
            <span className="text-[12px] font-mono text-text-secondary uppercase">Analyzed Commits</span>
          </div>
        </div>

        <UsageChart data={chartData} />
      </div>
    </div>
  )
}

export default function UsagePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-serif italic text-text-primary">Usage & Analytics</h1>
        <p className="font-mono text-xs text-text-muted mt-1 uppercase tracking-widest">
          Track your platform activity and AI performance
        </p>
      </div>

      <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 gap-6"><Skeleton className="h-32 w-full" /><Skeleton className="h-32 w-full" /><Skeleton className="h-32 w-full" /></div>}>
        <StatsContent />
      </Suspense>
    </div>
  )
}
