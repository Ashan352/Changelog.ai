import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, User, Calendar, GitCommit } from "lucide-react"
import { BlogContent } from "./BlogContent"
import { Metadata, ResolvingMetadata } from "next"

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { id: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const generation = await prisma.generation.findUnique({
    where: { id: params.id },
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

// Inline GitHub icon for the external link
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const generation = await prisma.generation.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: { name: true, image: true }
      }
    }
  })

  if (!generation) {
    notFound()
  }

  // Best-effort GitHub URL parsing if repoName looks like "owner/repo"
  const isOwnerRepo = generation.repoName?.includes('/')
  const githubUrl = isOwnerRepo ? `https://github.com/${generation.repoName}` : `https://github.com/search?q=${generation.repoName}`

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 flex flex-col">
      <header className="border-b border-border bg-bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[800px] mx-auto w-full px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/blog" className="text-sm font-mono text-text-muted hover:text-text-primary transition-colors flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Log
            </Link>
            <Link href="/" className="font-serif italic tracking-tighter text-text-primary hover:text-accent transition-colors flex items-center">
              Changelog.ai <span className="ml-1 text-accent">⎇</span>
            </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 sm:px-6 py-16 md:py-24">
        <article>
          <header className="mb-12">
             <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-accent/10 text-accent border border-accent/20 font-mono text-xs uppercase tracking-widest font-bold">
                  v{generation.version}
                </span>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg text-text-primary border border-border hover:border-accent/40 font-mono text-xs uppercase tracking-widest font-bold transition-all">
                  <GitHubIcon className="h-3 w-3" /> View Repo
                </a>
             </div>
             
             <h1 className="text-4xl md:text-6xl font-serif italic text-text-primary mb-8 leading-tight">
               {generation.repoName || 'Unnamed Project'} Release
             </h1>

             <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-text-muted border-t border-b border-border/50 py-6 mb-12">
                <div className="flex items-center gap-2">
                   <div className="h-6 w-6 rounded-full bg-accent/10 overflow-hidden">
                     {generation.user?.image ? (
                        <img src={generation.user?.image} alt={generation.user?.name || 'User'} className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-accent"><User className="h-3 w-3" /></div>
                     )}
                   </div>
                   <span className="text-text-primary">{generation.user?.name || 'A Developer'}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Calendar className="h-4 w-4" />
                   {format(new Date(generation.createdAt), "MMMM d, yyyy")}
                </div>
                <div className="flex items-center gap-2">
                   <GitCommit className="h-4 w-4" />
                   {generation.commits || '?'} commits bundled
                </div>
             </div>
          </header>

          <div className="prose prose-invert prose-emerald max-w-none">
            <BlogContent content={generation.content} />
          </div>
        </article>

        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-bg-surface to-bg border border-border flex flex-col items-center text-center">
           <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <span className="text-2xl text-accent">⎇</span>
           </div>
           <h3 className="text-2xl font-serif italic text-text-primary mb-3">Ship faster. Write less.</h3>
           <p className="text-text-secondary font-mono text-sm max-w-md mb-6 leading-relaxed">
             This changelog was generated automatically from raw git commits using Changelog.ai.
           </p>
           <Link href="/login?signup=true" className="px-6 h-12 rounded-full bg-accent text-bg font-mono text-sm font-bold flex items-center justify-center hover:bg-accent/90 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(232,255,71,0.2)]">
             Automate your relase notes
           </Link>
        </div>
      </main>
    </div>
  )
}
