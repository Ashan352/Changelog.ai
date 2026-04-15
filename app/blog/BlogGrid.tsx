'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { GitCommit, User, ChevronRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function BlogGrid({ generations }: { generations: any[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {generations.map((gen: any) => (
        <motion.div key={gen.id} variants={item}>
          <Link 
            href={`/blog/${gen.id}`} 
            className="group flex flex-col p-8 rounded-[2rem] bg-bg-surface border border-border/50 hover:border-accent/40 hover:bg-bg-elevated transition-all duration-500 hover:shadow-[0_20px_50px_rgba(155,177,94,0.1)] relative overflow-hidden h-full"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             
             <div className="relative z-10 flex flex-col h-full">
               <div className="flex items-center justify-between mb-8">
                 <span className="inline-flex items-center px-3 py-1 rounded-md bg-bg-elevated text-accent border border-border font-mono text-[10px] uppercase tracking-widest font-bold">
                    v{gen.version}
                 </span>
                 <div className="flex items-center gap-2 text-text-muted group-hover:text-accent transition-colors font-mono text-[10px] uppercase tracking-widest">
                   <GitCommit className="h-3 w-3" />
                   {gen.commits || '?'}
                 </div>
               </div>

               <h3 className="text-2xl font-serif italic text-text-primary mb-4 truncate group-hover:text-accent transition-colors">
                 {gen.repoName || 'Unnamed Project'}
               </h3>

               <p className="text-text-secondary/70 text-sm line-clamp-3 leading-relaxed font-sans mb-8 flex-1 italic">
                  "{gen.content.replace(/#.*?\n/g, '').replace(/[\*\_]/g, '').trim().slice(0, 140)}..."
               </p>

               <div className="flex items-center justify-between pt-6 border-t border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-bg-elevated border border-border overflow-hidden shrink-0">
                      {gen.user?.image ? (
                         <img src={gen.user.image} alt={gen.user.name || 'User'} className="w-full h-full object-cover" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-accent"><User className="h-4 w-4" /></div>
                      )}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[11px] font-bold text-text-primary font-mono">{gen.user?.name?.split(' ')[0] || 'Gen'}</span>
                       <span className="text-[9px] text-text-muted uppercase tracking-tighter font-mono">{formatDistanceToNow(new Date(gen.createdAt))} ago</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-accent font-mono text-[10px] uppercase tracking-widest font-bold transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                     View <ChevronRight className="h-3 w-3" />
                  </div>
               </div>
             </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
