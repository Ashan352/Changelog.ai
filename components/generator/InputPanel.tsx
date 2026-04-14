'use client'
import React, { useState, useEffect, useRef } from 'react'
import { GitCommit, Zap, Loader2, Info } from 'lucide-react'
import { Kbd } from '@/components/ui/kbd'

interface InputPanelProps {
  onGenerate: (commits: string, version: string, repoName?: string) => void;
  isLoading: boolean;
}

// 12 particles at evenly-spaced angles with slight random spread
const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 2 * Math.PI + (Math.random() - 0.5) * 0.4
  const dist = 60 + Math.random() * 30
  return {
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist,
    delay: Math.random() * 80,
  }
})

export function InputPanel({ onGenerate, isLoading }: InputPanelProps) {
  const [commits, setCommits] = useState('')
  const [version, setVersion] = useState('')
  const [repoName, setRepoName] = useState('')
  const [springing, setSpringing] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (!isLoading && commits.trim()) {
          triggerAndGenerate()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commits, version, repoName, isLoading])

  const charCount = commits.length
  const maxChars = 50000
  const percentage = (charCount / maxChars) * 100

  const handleLoadExample = () => {
    setCommits(`feat(auth): add GitHub OAuth login\nfix: resolve crash on empty input\nchore: update dependencies\nrefactor(api): improve response time by 40%`)
    setVersion('1.2.0')
    setRepoName('changelog-ai')
  }

  const triggerAndGenerate = () => {
    // Spring animation
    setSpringing(true)
    setTimeout(() => setSpringing(false), 500)
    // Particle burst
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 520)
    // Actual generation
    onGenerate(commits, version, repoName)
  }

  const handleClick = () => {
    if (!isLoading && commits.trim()) triggerAndGenerate()
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
            className="input-focus-glow w-full flex-1 bg-bg-surface border border-border rounded-xl p-4 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong transition-all resize-none"
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
              className="input-focus-glow w-full bg-bg-surface border border-border rounded-lg px-4 h-10 font-mono text-sm text-text-primary focus:outline-none focus:border-border-strong transition-all"
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
              className="input-focus-glow w-full bg-bg-surface border border-border rounded-lg px-4 h-10 font-mono text-sm text-text-primary focus:outline-none focus:border-border-strong transition-all"
            />
          </div>
        </div>
      </div>

      {/* Generate button with spring + particle burst */}
      <div className="relative">
        {/* Particle burst */}
        {showParticles && (
          <div className="particle-container">
            {PARTICLES.map((p, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-1 h-1 rounded-sm bg-accent"
                style={{
                  '--tx': `${p.tx}px`,
                  '--ty': `${p.ty}px`,
                  animation: `particleFly 500ms ease-out forwards`,
                  animationDelay: `${p.delay}ms`,
                  marginLeft: '-2px',
                  marginTop: '-2px',
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        <button
          ref={btnRef}
          onClick={handleClick}
          disabled={isLoading || !commits.trim()}
          className={`w-full flex items-center justify-between px-6 rounded-full bg-accent h-14 font-mono font-bold text-text-primary hover:bg-accent/90 transition-all active:scale-[0.97] disabled:opacity-50 disabled:active:scale-100 shadow-[0_8px_24px_rgba(155,177,94,0.2)] hover:shadow-[0_12px_32px_rgba(155,177,94,0.3)] relative group overflow-hidden ${springing ? 'btn-spring' : ''}`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 w-full">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating...</span>
            </div>
          ) : (
            <>
              <Zap className="h-5 w-5 shrink-0" />
              <span className="text-base tracking-tight">Generate changelog</span>
              <div className="hidden sm:flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                <Kbd className="bg-text-primary/10 border-text-primary/20 text-text-primary text-[11px] min-w-[22px] h-6 flex items-center justify-center font-bold">⌘</Kbd>
                <Kbd className="bg-text-primary/10 border-text-primary/20 text-text-primary text-[11px] h-6 flex items-center justify-center px-1.5 font-bold">Enter</Kbd>
              </div>
            </>
          )}
        </button>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-accent-dim border border-accent/10">
        <Info className="h-4 w-4 text-accent mt-0.5" />
        <p className="text-[11px] font-mono text-text-secondary leading-relaxed">
          Tip: Use <code className="text-accent">git log --oneline</code> for the best results. We categorize features, fixes, and breaking changes automatically.
        </p>
      </div>
    </div>
  )
}


