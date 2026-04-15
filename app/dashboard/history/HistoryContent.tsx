'use client'
import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { GitCommit, Calendar, Copy, Check, ChevronRight, FileText, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tree, Folder, File } from '@/components/ui/file-tree'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Generation {
  id: string
  repoName: string
  version: string
  content: string
  commits: number | null
  createdAt: Date
}

export function HistoryContent({ history }: { history: Generation[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(history[0]?.id || null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Group by project for the tree
  const projectTree = useMemo(() => {
    const groups: Record<string, Generation[]> = {}
    history.forEach(item => {
      const name = item.repoName || 'Unnamed'
      if (!groups[name]) groups[name] = []
      groups[name].push(item)
    })
    
    return Object.entries(groups).map(([name, items]) => ({
      id: name,
      name,
      type: 'folder' as const,
      children: items.map(gen => ({
        id: gen.id,
        name: `v${gen.version} - ${format(new Date(gen.createdAt), 'MMM dd')}`,
        type: 'file' as const
      }))
    }))
  }, [history])

  const selectedItem = useMemo(() => 
    history.find(item => item.id === selectedId), 
  [history, selectedId])

  const handleDownload = () => {
    if (!selectedItem?.content) return
    const blob = new Blob([selectedItem.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `CHANGELOG-${selectedItem.repoName}-${selectedItem.version}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 min-h-[600px] lg:h-[calc(100vh-12rem)] border border-border rounded-2xl bg-bg-surface overflow-hidden shadow-2xl">
      {/* Navigation - File Tree Sidebar */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-bg-elevated/30 flex flex-col h-72 lg:h-auto">
        <div className="p-4 border-b border-border/50 bg-bg-surface/50">
          <h3 className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] px-2 mb-1">Project Explorer</h3>
          <p className="text-[10px] font-mono text-text-muted/60 px-2 italic">Select a generation to view</p>
        </div>
        <ScrollArea className="flex-1 p-2">
          <div className="pb-10"> {/* Extra bottom space for mobile scroll */}
            <Tree
              elements={projectTree}
              initialSelectedId={selectedId || undefined}
              className="p-1"
            >
              {projectTree.map((project) => (
                <Folder key={project.id} element={project.name} value={project.id}>
                    {project.children?.map((file) => (
                      <File 
                        key={file.id} 
                        value={file.id} 
                        onClick={() => setSelectedId(file.id)}
                        className={selectedId === file.id ? 'text-accent font-bold' : ''}
                      >
                        <span className="text-xs">{file.name}</span>
                      </File>
                    ))}
                </Folder>
              ))}
            </Tree>
          </div>
        </ScrollArea>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-bg min-h-[400px]">
        <AnimatePresence mode="wait">
          {selectedItem ? (
            <motion.div 
              key={selectedItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-border bg-bg-surface/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-serif italic text-text-primary leading-none truncate">
                      {selectedItem.repoName}
                    </h2>
                    <div className="flex items-center gap-3 mt-1.5 font-mono text-[10px] text-text-muted uppercase tracking-widest">
                       <span className="text-accent/80">v{selectedItem.version}</span>
                       <span className="opacity-30">•</span>
                       <Calendar className="h-3 w-3" />
                       {format(new Date(selectedItem.createdAt), 'MMMM dd, yyyy')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => copyToClipboard(selectedItem.content, selectedItem.id)}
                    className="flex items-center gap-2 px-4 h-10 rounded-lg bg-bg border border-border hover:border-accent/40 text-text-primary font-mono text-xs transition-all active:scale-[0.98] group"
                  >
                    {copiedId === selectedItem.id ? (
                      <Check className="h-3.5 w-3.5 text-accent" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 group-hover:text-accent transition-colors" />
                    )}
                    <span>{copiedId === selectedItem.id ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 h-10 rounded-lg bg-accent text-bg font-mono text-xs font-bold transition-all active:scale-[0.98] hover:shadow-[0_0_20px_rgba(232,255,71,0.2)]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <ScrollArea className="flex-1 p-8" data-slot="history-content-scroll">
                <div className="max-w-3xl mx-auto pb-24">
                   <div className="font-mono text-[11px] text-text-muted uppercase tracking-[0.3em] mb-8 border-b border-border pb-2 inline-block">
                     Document Content
                   </div>
                   <div className="prose prose-invert prose-mono max-w-none text-base leading-relaxed text-text-secondary whitespace-pre-wrap selection:bg-accent/30 selection:text-bg">
                      {selectedItem.content}
                   </div>
                </div>
              </ScrollArea>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-text-muted p-12 text-center">
              <Zap className="h-12 w-12 opacity-20 mb-4" />
              <p className="font-mono text-sm max-w-xs">Select a generation from the Project Explorer to preview artifacts.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Zap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.71 14.71 4H20v5.29L9.29 20H4z" />
      <path d="M15 4 4 15" />
      <path d="M14 10 9 15" />
    </svg>
  )
}
