'use client'
import React, { useState } from 'react'
import { FileText, MessageSquare, Copy, Check, Download, Zap, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react'

// Custom X/Twitter Logo
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
import { motion, AnimatePresence } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import type { GenerationOutput as GenerationResult } from '@/lib/openrouter'

type Tab = 'changelog' | 'release' | 'tweet' | 'raw'

export function OutputPanel({ data, isLoading, hasStarted, rawResult }: { data: GenerationResult | null; isLoading: boolean; hasStarted: boolean; rawResult?: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('changelog')
  const [copied, setCopied] = useState(false)

  const getContent = (): string => {
    if (activeTab === 'raw') return rawResult || ''
    if (!data) return ''
    if (activeTab === 'changelog') return data.changelog
    if (activeTab === 'release') return data.release_body
    if (activeTab === 'tweet') return data.tweet || ''
    return ''
  }

  const handleCopy = () => {
    const content = getContent()
    if (content) {
      navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const handleDownload = () => {
    if (!data?.changelog) return
    const blob = new Blob([data.changelog], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'CHANGELOG.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const tabs = [
    { id: 'changelog' as Tab, label: 'Changelog', icon: FileText },
    { 
      id: 'release' as Tab, 
      label: 'GitHub Release', 
      icon: (props: any) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      )
    },
    { id: 'tweet' as Tab, label: 'Twitter Post', icon: MessageSquare },
    { id: 'raw' as Tab, label: 'Raw AI', icon: Zap },
  ]

  if (!hasStarted && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full border border-dashed border-border rounded-2xl bg-bg-surface/50 text-text-muted space-y-4">
        <div className="p-4 rounded-full bg-bg-elevated border border-border">
          <Zap className="h-8 w-8 text-text-muted" />
        </div>
        <p className="font-mono text-sm">Enter your commits to generate artifacts.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-accent/5">
      {/* Tab Bar */}
      <div className="flex items-center border-b border-border bg-bg-elevated/50 px-2 overflow-x-auto scroller-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-4 font-mono text-sm transition-all relative shrink-0 ${
              activeTab === tab.id ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <tab.icon className={`h-3.5 w-3.5 transition-colors ${activeTab === tab.id ? 'text-accent' : ''}`} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      {/* Warnings Bar */}
      {data && (data.slop_warning || data.breaking_changes) && (
        <div className="flex flex-wrap gap-2 px-6 pt-4">
          {data.slop_warning && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="h-3 w-3 text-yellow-500" />
              <span className="text-[12px] font-mono text-yellow-500 font-bold uppercase tracking-wider">Review Required: AI Slop Detected</span>
            </div>
          )}
          {data.breaking_changes && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger/10 border border-danger/20">
              <ShieldAlert className="h-3 w-3 text-danger" />
              <span className="text-[12px] font-mono text-danger font-bold uppercase tracking-wider">Breaking Change Flagged</span>
            </div>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 p-6 md:p-8 overflow-y-auto selection:bg-accent/30"
        >
          {/* Skeletons while streaming */}
          {isLoading && !data && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-24 w-5/6" />
            </div>
          )}

          {activeTab === 'tweet' ? (
            <div className="space-y-6 max-w-lg mx-auto pb-8">
               {!data?.tweet && isLoading ? (
                  <div className="p-5 rounded-2xl border border-border bg-bg flex flex-col gap-4">
                     <div className="flex items-center gap-3">
                        <Skeleton className="size-10 rounded-full" />
                        <div className="flex flex-col gap-1.5">
                           <Skeleton className="h-3 w-24" />
                           <Skeleton className="h-2 w-16" />
                        </div>
                     </div>
                     <Skeleton className="h-20 w-full" />
                  </div>
               ) : data?.tweet && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-bg border border-border shadow-sm relative group hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                             <Sparkles className="h-5 w-5" />
                          </div>
                          <div>
                             <div className="text-xs font-bold text-text-primary">Changelog AI</div>
                             <div className="text-[10px] font-mono text-text-muted">@changelog_ai</div>
                          </div>
                       </div>
                       <TwitterIcon className="h-4 w-4 text-text-muted group-hover:text-text-primary transition-colors" />
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-text-primary whitespace-pre-wrap font-sans">
                       {data.tweet}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                       <span className={`text-[10px] font-mono ${data.tweet.length > 260 ? 'text-danger' : 'text-text-muted'}`}>
                          {data.tweet.length} / 280
                       </span>
                       <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest font-bold">Consolidated Post</span>
                    </div>
                  </motion.div>
               )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
               {!getContent() && isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-64 w-full" />
                  </div>
               ) : (
                 <pre className="whitespace-pre-wrap font-sans text-base sm:text-lg text-white leading-relaxed antialiased">
                   {getContent() || (isLoading && "Crafting artifact...")}
                 </pre>
               )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 md:p-6 border-t border-border flex flex-col sm:flex-row items-center justify-between bg-bg-elevated/30 gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleCopy}
            disabled={!getContent()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-11 rounded-full bg-bg border border-border hover:border-accent/40 text-text-primary font-mono text-xs transition-all active:scale-[0.98] group"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-accent" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 group-hover:text-accent transition-colors" />
                Copy Text
              </>
            )}
          </button>
          
          {activeTab === 'changelog' && (
            <button
              onClick={handleDownload}
              disabled={!data}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-11 rounded-full bg-accent text-bg font-mono text-xs font-bold transition-all active:scale-[0.98] hover:shadow-[0_0_20px_rgba(232,255,71,0.2)]"
            >
              <Download className="h-4 w-4" />
              Export .md
            </button>
          )}
        </div>
        
        <div className="hidden sm:flex flex-col items-end gap-1">
          <div className="text-[12px] font-mono text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
            Status: <span className={isLoading ? "text-accent animate-pulse" : "text-green-500"}>
              {isLoading ? "Generating..." : "Finalized"}
            </span>
          </div>
          {data?.version_detected && (
            <div className="text-[12px] font-mono text-accent">
               Target Version: {data.version_detected}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
