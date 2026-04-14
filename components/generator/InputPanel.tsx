'use client'
import { useState, useEffect } from 'react'
import { GitCommit, Zap, Loader2, Info } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Kbd } from '@/components/ui/kbd'

interface InputPanelProps {
  onGenerate: (commits: string, version: string, repoName?: string) => void;
  isLoading: boolean;
}

export function InputPanel({ onGenerate, isLoading }: InputPanelProps) {
  const [commits, setCommits] = useState('')
  const [version, setVersion] = useState('')
  const [repoName, setRepoName] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (!isLoading && commits.trim()) {
          onGenerate(commits, version, repoName)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commits, version, repoName, isLoading, onGenerate])

  const charCount = commits.length
  const maxChars = 50000
  const percentage = (charCount / maxChars) * 100

  const handleLoadExample = () => {
    setCommits(`feat(auth): add GitHub OAuth login
fix: resolve crash on empty input
chore: update dependencies
refactor(api): improve response time by 40%`)
    setVersion('1.2.0')
    setRepoName('changelog-ai')
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-mono text-sm text-text-secondary">
            <GitCommit className="h-4 w-4" />
            Git input
          </label>
          <button 
            onClick={handleLoadExample}
            disabled={isLoading}
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            Load example
          </button>
        </div>

        <div className="relative flex-1 flex flex-col group">
          <textarea
            value={commits}
            onChange={(e) => setCommits(e.target.value)}
            disabled={isLoading}
            placeholder="Paste your git log or commit messages here..."
            className="w-full flex-1 bg-bg-surface border border-border rounded-xl p-4 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong transition-all resize-none"
          />
          <div className={`absolute bottom-3 right-3 font-mono text-[10px] ${percentage > 95 ? 'text-danger' : percentage > 80 ? 'text-danger/70' : 'text-text-muted'}`}>
            {charCount.toLocaleString()} / {maxChars.toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="font-mono text-sm text-text-secondary">Version</label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              disabled={isLoading}
              placeholder="e.g. 1.2.0"
              className="w-full bg-bg-surface border border-border rounded-lg px-4 h-10 font-mono text-sm text-text-primary focus:outline-none focus:border-border-strong transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-sm text-text-secondary">Project</label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              disabled={isLoading}
              placeholder="e.g. my-app"
              className="w-full bg-bg-surface border border-border rounded-lg px-4 h-10 font-mono text-sm text-text-primary focus:outline-none focus:border-border-strong transition-all"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => onGenerate(commits, version, repoName)}
        disabled={isLoading || !commits.trim()}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent h-12 font-mono font-bold text-bg hover:bg-accent/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-[0_0_24px_rgba(232,255,71,0.15)] hover:shadow-[0_0_32px_rgba(232,255,71,0.25)] relative group"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Zap className="h-5 w-5" />
            <span className="flex-1 text-center">Generate changelog</span>
            <div className="hidden sm:flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity pr-2">
              <Kbd className="bg-bg/20 border-bg/30 text-bg text-[10px] min-w-[20px] h-5 flex items-center justify-center">⌘</Kbd>
              <Kbd className="bg-bg/20 border-bg/30 text-bg text-[10px] h-5 flex items-center justify-center px-1">Enter</Kbd>
            </div>
          </>
        )}
      </button>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-accent-dim border border-accent/10">
        <Info className="h-4 w-4 text-accent mt-0.5" />
        <p className="text-[11px] font-mono text-text-secondary leading-relaxed">
          Tip: Use <code className="text-accent">git log --oneline</code> for the best results. We categorize features, fixes, and breaking changes automatically.
        </p>
      </div>
    </div>
  )
}
