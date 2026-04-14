'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitCommit, Zap, Loader2, FileText, MessageSquare, Copy, Check } from 'lucide-react'
import { TypeWriter } from '@/components/motion/TypeWriter'
import { FadeUp } from '@/components/motion/FadeUp'
import { ShinyText } from '@/components/ui/ShinyText'
import { TiltedCard } from '@/components/motion/TiltedCard'

// Each example has matching commits AND matching output — no disconnect
const EXAMPLES = [
  {
    commits: "feat(auth): add GitHub OAuth login\nfix: resolve crash on empty input\nchore: update dependencies",
    output: {
      changelog: `## [1.3.0] - ${new Date().toISOString().split('T')[0]}\n### Added\n- GitHub OAuth login support\n### Fixed\n- Crash on empty input\n### Chores\n- Updated project dependencies`,
      release: `🚀 v1.3.0\n\n✅ GitHub OAuth login is here!\n🐛 Fixed a crash that occurred on empty input\n📦 Dependencies updated to latest`,
      tweet: `We just shipped v1.3.0 of our app! 🎉\n\n🔐 Sign in with GitHub — now live\n🐛 Fixed empty input crash\n\nSmall release, big quality bump. 🚢`,
    }
  },
  {
    commits: "feat: dark mode support\nrefactor(api): improve response time by 40%\nfix(ui): button alignment on mobile",
    output: {
      changelog: `## [2.1.0] - ${new Date().toISOString().split('T')[0]}\n### Added\n- Full dark mode support across all pages\n### Performance\n- API response time improved by ~40%\n### Fixed\n- Button alignment on mobile viewports`,
      release: `🚀 v2.1.0\n\n🌙 Dark mode is finally here!\n⚡ API is now 40% faster\n📱 Mobile button alignment fixed`,
      tweet: `v2.1.0 just dropped! 🌙\n\n✨ Dark mode — the feature you've all been waiting for\n⚡ APIs are 40% faster now\n🐛 Mobile UI cleanup\n\nShipping every week! 🚢`,
    }
  },
  {
    commits: "feat!: new pricing model\nBREAKING CHANGE: free tier limit reduced to 5\nfeat: annual billing option added",
    output: {
      changelog: `## [3.0.0] - ${new Date().toISOString().split('T')[0]}\n⚠️ BREAKING CHANGES\n\n### Changed\n- Free tier now limited to 5 generations\n### Added\n- Annual billing option (save 25%!)`,
      release: `🚀 v3.0.0 — Major Release\n\n⚠️ Breaking: Free tier capped at 5/month\n💳 Annual billing is now available\n\nUpgrade to Pro for unlimited access.`,
      tweet: `BIG update: v3.0.0 🔥\n\n⚠️ Free tier is now capped at 5/month\n💳 Annual plan launched — save 25%\n\nTime to go Pro? 👇 [link]`,
    }
  }
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded hover:bg-bg-elevated transition-colors group"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3 w-3 text-accent" />
      ) : (
        <Copy className="h-3 w-3 text-text-muted group-hover:text-text-primary transition-colors" />
      )}
    </button>
  )
}

export function ProductShowcase() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showOutput, setShowOutput] = useState(false)
  const [exampleIdx, setExampleIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGenerating && !showOutput) {
        setExampleIdx(prev => (prev + 1) % EXAMPLES.length)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [isGenerating, showOutput])

  const current = EXAMPLES[exampleIdx]

  const handleDemoGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowOutput(true)
    }, 1800)
  }

  const handleReset = () => {
    setShowOutput(false)
    setIsGenerating(false)
  }

  const outputCards = [
    { title: 'Changelog', icon: FileText, content: current.output.changelog },
    { title: 'Release Body', icon: MessageSquare, content: current.output.release },
    { title: 'Tweet Thread', icon: MessageSquare, content: current.output.tweet },
  ]

  return (
    <section id="demo" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <FadeUp>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-text-primary mb-4 px-2">From messy logs to marketing copy</h2>
          <p className="font-mono text-xs sm:text-sm text-text-muted max-w-[600px] px-2 mx-auto">
            Turn raw git history into polished <ShinyText text="release notes" /> in under 2 seconds. No prompt engineering required.
          </p>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Panel — Input */}
        <FadeUp>
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="flex items-center gap-2 font-mono text-xs text-text-secondary uppercase tracking-widest">
                <GitCommit className="h-4 w-4" />
                Your commits
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-accent/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" aria-hidden="true" />
                <div 
                  className="relative bg-bg-surface border border-border rounded-xl p-4 sm:p-6 min-h-[140px] sm:min-h-[180px] font-mono text-xs sm:text-sm leading-relaxed text-text-primary overflow-hidden"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {!showOutput ? (
                    <TypeWriter key={exampleIdx} text={current.commits} speed={28} />
                  ) : (
                    <span className="text-text-primary whitespace-pre-wrap">{current.commits}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <span>Version (optional)</span>
                <span className="px-1.5 py-0.5 rounded border border-border bg-bg-elevated/50 font-bold">1.3.0</span>
              </div>
            </div>

            <button
              onClick={handleDemoGenerate}
              disabled={isGenerating || showOutput}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent h-12 font-mono font-bold text-bg hover:bg-accent/90 transition-all shadow-[0_0_24px_rgba(232,255,71,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Generate changelog
                </>
              )}
            </button>
          </div>
        </FadeUp>

        {/* Right Panel — Output */}
        <div className="relative min-h-[300px] sm:min-h-[400px]">
          <TiltedCard>
            <AnimatePresence mode="wait">
              {!showOutput ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center border border-dashed border-border rounded-2xl bg-bg-surface/30"
                >
                  <div className="h-10 w-10 bg-bg-elevated border border-border rounded-lg flex items-center justify-center mb-4">
                    <span className="text-text-muted font-mono text-lg">⌘</span>
                  </div>
                  <p className="font-mono text-xs text-text-muted">Output artifacts will appear here</p>
                  <p className="font-mono text-[10px] text-text-muted/50 mt-1">Hit "Generate changelog" →</p>
                </motion.div>
              ) : (
                <motion.div
                  key={`results-${exampleIdx}`}
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {outputCards.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className="bg-bg-surface border border-border rounded-xl p-4 shadow-xl"
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                        <div className="flex items-center gap-2">
                          <item.icon className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
                          <span className="font-mono text-[10px] text-text-primary uppercase tracking-widest font-bold">{item.title}</span>
                        </div>
                        <CopyButton text={item.content} />
                      </div>
                      <div className="font-mono text-[11px] text-text-secondary whitespace-pre-wrap leading-relaxed">
                        {item.content}
                      </div>
                    </motion.div>
                  ))}

                  <button
                    onClick={handleReset}
                    className="w-full font-mono text-[10px] text-text-muted hover:text-accent transition-colors py-2"
                  >
                    ↺ Try another example
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </TiltedCard>
        </div>
      </div>
    </section>
  )
}
