import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, User, Calendar, GitCommit, Sparkles, Share2 } from "lucide-react"
import { BlogContent } from "./BlogContent"
import { Metadata, ResolvingMetadata } from "next"
import { Navbar } from "@/components/landing/Navbar"
import { auth } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { id } = await params;
  const generation = await prisma.generation.findUnique({
    where: { id },
    include: {
      user: { select: { name: true } }
    }
  })
  
  if (!generation) return { title: 'Not Found' }
  
  return {
    title: `${generation.repoName || 'Project'} v${generation.version} Changelog | Changelog.ai`,
    description: `Read the latest release notes for ${generation.repoName} v${generation.version}, shipped by ${generation.user?.name || 'a developer'}.`,
    openGraph: {
      title: `${generation.repoName || 'Project'} v${generation.version} Released`,
      description: `Automatically generated changelog for ${generation.repoName}. See what's new in version ${generation.version}.`,
    }
  }
}

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth()
  const generation = await prisma.generation.findFirst({
    where: { 
      id,
      OR: [
        { isPublic: true },
        { userId: session?.user?.id || 'unauthenticated' }
      ]
    },
    include: {
      user: {
        select: { name: true, image: true }
      }
    }
  })

  if (!generation) {
    notFound()
  }

  const isOwnerRepo = generation.repoName?.includes('/')
  const githubUrl = isOwnerRepo ? `https://github.com/${generation.repoName}` : `https://github.com/search?q=${generation.repoName}`

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Navbar session={session} />

      <main className="flex-1 w-full max-w-[800px] mx-auto px-6 pt-40 pb-24 relative z-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-mono text-text-muted hover:text-accent uppercase tracking-[0.2em] mb-12 transition-colors">
          <ArrowLeft className="h-3 w-3" /> Back to Ship Log
        </Link>

        <article>
          <header className="mb-16">
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                   <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-accent/10 text-accent border border-accent/20 font-mono text-[10px] uppercase tracking-widest font-bold">
                     Release v{generation.version}
                   </span>
                   <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-surface text-text-muted border border-border hover:border-accent/40 hover:text-text-primary font-mono text-[10px] uppercase tracking-widest font-bold transition-all">
                     <GitHubIcon className="h-3 w-3" /> Source
                   </a>
                </div>
                <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all">
                   <Share2 className="h-4 w-4" />
                </button>
             </div>
             
             <h1 className="text-5xl md:text-7xl font-serif italic text-text-primary mb-12 tracking-tighter leading-[0.9]">
               {generation.repoName || 'Unnamed Project'}
             </h1>

             <div className="flex flex-wrap items-center gap-8 text-[11px] font-mono text-text-muted border-t border-b border-border/40 py-8 uppercase tracking-widest">
                <div className="flex items-center gap-3">
                   <div className="h-8 w-8 rounded-full bg-bg-elevated border border-border overflow-hidden">
                     {generation.user?.image ? (
                        <img src={generation.user?.image} alt={generation.user?.name || 'User'} className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-accent"><User className="h-3.5 w-3.5" /></div>
                     )}
                   </div>
                   <span className="text-text-primary font-bold">{generation.user?.name || 'A Developer'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                   <Calendar className="h-3.5 w-3.5 opacity-40" />
                   {format(new Date(generation.createdAt), "MMM d, yyyy")}
                </div>
                <div className="flex items-center gap-2.5">
                   <GitCommit className="h-3.5 w-3.5 opacity-40" />
                   {generation.commits || '?'} bundles
                </div>
             </div>
          </header>

          <div className="prose prose-invert prose-emerald max-w-none">
            <BlogContent content={generation.content} />
          </div>
        </article>

        <div className="mt-32 p-12 md:p-16 rounded-[2.5rem] bg-bg-surface border border-border/50 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.03] to-transparent pointer-events-none" />
            <Sparkles className="h-6 w-6 text-accent mb-6" />
            <h3 className="text-3xl font-serif italic text-text-primary mb-4 leading-tight">Automate your shipping.</h3>
            <p className="text-text-secondary font-mono text-[11px] max-w-sm mb-10 leading-relaxed uppercase tracking-widest opacity-60">
              Transform your raw commits into professional release notes in seconds.
            </p>
            <Link href="/dashboard" className="px-10 h-14 rounded-full bg-accent text-bg font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center hover:bg-accent/90 transition-all hover:scale-[1.05] shadow-[0_20px_40px_rgba(155,177,94,0.2)]">
              Build your own
            </Link>
        </div>
      </main>
    </div>
  )
}

