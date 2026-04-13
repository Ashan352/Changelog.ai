'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'

export function UpgradeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ priceId: 'default' }) // Normally, fetch the real price ID
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-bg/80 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-bg-surface border border-danger/30 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto shadow-[0_0_120px_rgba(255,51,102,0.15)] flex flex-col"
            >
              {/* Header */}
              <div className="relative p-6 sm:p-8 bg-danger/5 border-b border-danger/10">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full hover:bg-bg border border-transparent hover:border-border transition-all text-text-muted hover:text-text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger/20 border border-danger/30">
                    <AlertTriangle className="h-5 w-5 text-danger" />
                  </div>
                  <span className="font-mono text-[10px] text-danger uppercase tracking-widest font-bold">Limit Reached (5/5)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif italic text-text-primary max-w-[90%] leading-tight">
                  Your changelog history will be deleted in 23 hours.
                </h2>
                <p className="mt-3 font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">
                  The Free tier only stores outputs temporarily. Upgrade to permanently save your work, unlock Priority AI, and host public release pages.
                </p>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                     <Check className="h-4 w-4 text-accent shrink-0" />
                     <span className="font-mono text-xs text-text-secondary">Unlimited generations</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="h-4 w-4 text-accent shrink-0" />
                     <span className="font-mono text-xs text-text-secondary">Permanent output history</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="h-4 w-4 text-accent shrink-0" />
                     <span className="font-mono text-xs text-text-secondary">Custom hosted release page</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="h-4 w-4 text-accent shrink-0" />
                     <span className="font-mono text-xs text-text-secondary">GitHub README badge</span>
                   </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleUpgrade}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 h-14 rounded-xl bg-accent text-bg font-mono font-bold text-sm transition-all hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</> : "Start 7-day free trial"}
                  </button>
                  <p className="text-center font-mono text-[10px] text-text-muted mt-4">
                    Defaults to Annual ($72/year). Cancel anytime during trial.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
