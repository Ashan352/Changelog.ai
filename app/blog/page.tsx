import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { GitCommit, User, ArrowRight, LayoutGrid, Sparkles, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/landing/Navbar"
import { auth } from "@/lib/auth"
import { motionContent } from "./motion-content"
import { BlogGrid } from "./BlogGrid"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogIndexPage() {
  const session = await auth()
  const generations = await prisma.generation.findMany({
    where: { isPublic: true },
    take: 30,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, image: true, id: true }
      }
    }
  })

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 flex flex-col relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Navbar session={session} />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 pt-32 pb-24 relative z-10">
        <header className="mb-24 flex flex-col items-center text-center">
           <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/10 mb-8">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] font-bold">The Public Ship Log</span>
           </div>
           
           <h1 className="text-6xl md:text-8xl font-serif italic text-text-primary mb-8 tracking-tighter leading-[0.9]">
             Latest Ships
           </h1>
           
           <p className="text-text-secondary font-mono text-sm max-w-xl leading-relaxed uppercase tracking-wider opacity-60">
             A raw, authentic stream of developer progress from around the world.
           </p>
        </header>

        {generations.length === 0 ? (
           <div className="text-center py-32 border border-dashed border-border rounded-[2.5rem] bg-bg-surface/30 backdrop-blur-sm">
              <p className="font-mono text-text-muted uppercase tracking-widest text-xs">The log is currently quiet...</p>
           </div>
        ) : (
          <BlogGrid generations={generations} />
        )}
      </main>

      {/* Footer CTA */}
      <footer className="w-full max-w-[1400px] mx-auto px-6 pb-24">
         <div className="p-12 md:p-20 rounded-[3rem] bg-bg-surface border border-border/50 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.03] to-transparent pointer-events-none" />
            <Sparkles className="h-8 w-8 text-accent mb-8" />
            <h2 className="text-4xl md:text-6xl font-serif italic text-text-primary mb-6">Want your project here?</h2>
            <p className="text-text-secondary font-mono text-sm max-w-md mb-10 leading-relaxed uppercase tracking-widest opacity-60">
              Transform your commits into luxury release notes and join the ship log.
            </p>
            <Link 
              href="/dashboard"
              className="group flex items-center gap-3 px-10 h-14 rounded-full bg-accent text-bg font-mono font-bold text-xs uppercase tracking-[0.2em] transform transition-all hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(155,177,94,0.3)]"
            >
               Start Shipping <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
         </div>
      </footer>
    </div>
  )
}

