import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, User, Calendar, GitCommit } from "lucide-react"
import ReactMarkdown from 'react-markdown'

export const dynamic = 'force-dynamic'

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
            <ReactMarkdown 
               components={{
                  h1: ({node, ...props}) => <h2 className="text-2xl font-serif italic text-text-primary mt-12 mb-6" {...props} />,
                  h2: ({node, ...props}) => <h3 className="text-xl font-mono uppercase tracking-widest text-accent mt-10 mb-4" {...props} />,
                  h3: ({node, ...props}) => <h4 className="text-lg font-bold text-text-primary mt-8 mb-3" {...props} />,
                  ul: ({node, ...props}) => <ul className="space-y-2 mb-6 font-mono text-sm text-text-secondary" {...props} />,
                  li: ({node, ...props}) => <li className="flex items-start gap-2" {...props}><span className="text-accent mt-1 select-none">→</span><span className="flex-1">{props.children}</span></li>,
                  code: ({node, inline, ...props}: any) => 
                     inline 
                     ? <code className="bg-bg border border-border px-1.5 py-0.5 rounded text-accent text-[0.9em] mx-1" {...props} />
                     : <pre className="bg-[#0D0D0D] border border-border/50 p-4 rounded-xl overflow-x-auto my-6"><code className="text-sm font-mono text-text-secondary" {...props} /></pre>
               }}
            >
               {generation.content}
            </ReactMarkdown>
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
