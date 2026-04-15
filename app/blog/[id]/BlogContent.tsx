'use client'
import ReactMarkdown from 'react-markdown'

export function BlogContent({ content }: { content: string }) {
  return (
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
       {content}
    </ReactMarkdown>
  )
}
