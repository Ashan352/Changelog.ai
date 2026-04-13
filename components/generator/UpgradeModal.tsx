'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, X, Loader2 } from 'lucide-react'

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [isAnnual, setIsAnnual] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAnnual })
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    "Unlimited changelogs (forever)",
    "Permanent history & project organization",
    "Priority AI models (faster & smarter)",
    "GitHub Action integration (coming soon)",
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-[440px] bg-bg-surface border border-border shadow-2xl rounded-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent blur-2xl opacity-20" />
                  <div className="relative h-16 w-16 bg-bg-surface border border-accent/20 rounded-2xl flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-accent animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-serif italic text-text-primary">Upgrade to Pro</h2>
                <p className="text-sm font-mono text-text-secondary">Unlock the full power of Changelog.ai</p>
              </div>

              <div className="bg-bg-elevated/50 border border-border rounded-xl p-6 mb-8">
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-4xl font-serif italic text-text-primary">
                    {isAnnual ? '$72' : '$8'}
                  </span>
                  <span className="text-sm font-mono text-text-muted">
                    {isAnnual ? '/year' : '/month'}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <span className={`text-[10px] font-mono transition-colors ${!isAnnual ? 'text-text-primary' : 'text-text-muted'}`}>Monthly</span>
                  <button 
                    onClick={() => setIsAnnual(!isAnnual)}
                    className="w-10 h-5 bg-bg-surface border border-border rounded-full relative p-1 group"
                  >
                    <motion.div 
                      animate={{ x: isAnnual ? 20 : 0 }}
                      className={`w-3 h-3 rounded-full transition-colors ${isAnnual ? 'bg-accent' : 'bg-text-muted'}`}
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono transition-colors ${isAnnual ? 'text-text-primary' : 'text-text-muted'}`}>Yearly</span>
                    {isAnnual && (
                      <span className="px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20 text-[9px] font-mono text-accent">Save $24</span>
                    )}
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <Check className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <span className="text-xs font-mono text-text-secondary leading-normal">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent h-12 font-mono font-bold text-bg hover:bg-accent/90 transition-all active:scale-[0.98] shadow-[0_0_24px_rgba(232,255,71,0.15)]"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  `Get Pro — ${isAnnual ? '$72/year' : '$8/month'}`
                )}
              </button>
              
              <button 
                onClick={onClose}
                className="w-full mt-4 text-[11px] font-mono text-text-muted hover:text-text-secondary transition-colors"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
