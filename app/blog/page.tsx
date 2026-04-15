import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { GitCommit, User, ArrowRight, LayoutGrid } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function BlogIndexPage() {
  const generations = await prisma.generation.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, image: true, id: true }
      }
    }
  })

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 flex flex-col">
      <header className="border-b border-border bg-bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-serif italic text-2xl tracking-tighter text-text-primary hover:text-accent transition-colors flex items-center gap-2">
              <span className="text-xl">⎇</span> Changelog.ai
            </Link>
            <div className="flex items-center gap-4">
               <Link href="/dashboard" className="text-sm font-mono text-text-muted hover:text-text-primary transition-colors">
                 Dashboard
               </Link>
            </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12 cursor-default">
           <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-[0.2em] mb-4">
              <LayoutGrid className="h-4 w-4" />
              Public Changelogs
           </div>
           <h1 className="text-4xl md:text-5xl font-serif italic text-text-primary mb-4">The Ship Log</h1>
           <p className="text-text-secondary font-mono max-w-xl leading-relaxed">
             A real-time feed of what developers are building and shipping across the Changelog.ai network.
           </p>
        </div>

        {generations.length === 0 ? (
           <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-bg-surface/30">
              <p className="font-mono text-text-muted">No changelogs have been shipped yet.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generations.map((gen: any) => (
              <Link 
                href={`/blog/${gen.id}`} 
                key={gen.id}
                className="group flex flex-col p-6 rounded-2xl bg-bg-surface border border-border hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(155,177,94,0.1)] transition-all duration-300"
              >
                 <div className="flex items-center gap-3 mb-6">
                   <div className="h-8 w-8 rounded-full bg-accent/10 border border-accent/20 overflow-hidden shrink-0">
                     {gen.user?.image ? (
                        <img src={gen.user.image} alt={gen.user.name || 'User'} className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-accent"><User className="h-4 w-4" /></div>
                     )}
                   </div>
                   <div className="min-w-0 flex-1">
                      <p className="text-sm font-mono font-bold text-text-primary truncate">{gen.repoName || 'Unnamed Project'}</p>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-text-muted truncate">
                         By {gen.user?.name?.split(' ')[0] || 'A Developer'} • {formatDistanceToNow(new Date(gen.createdAt))} ago
                      </p>
                   </div>
                 </div>

                 <div className="mb-6 flex-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-dim text-accent border border-accent/20 font-mono text-[10px] uppercase tracking-widest font-bold mb-3">
                       v{gen.version}
                    </span>
                    <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed">
                       {gen.content.replace(/#.*?\n/g, '').replace(/[\*\_]/g, '').slice(0, 150)}...
                    </p>
                 </div>

                 <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                    <div className="flex items-center gap-1.5 text-text-muted font-mono text-xs">
                       <GitCommit className="h-3.5 w-3.5" />
                       {gen.commits || '?'} commits
                    </div>
                    <div className="flex items-center gap-1 text-accent font-mono text-xs font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                       Read Log <ArrowRight className="h-3 w-3" />
                    </div>
                 </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
