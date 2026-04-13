'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const faqs = [
    { q: "What Git formats do you support?", a: "We support standard git log, git shortlog, and even raw diffs. If you can copy it from your terminal, we can parse it." },
    { q: "Do you store my code or commits?", a: "No. We only process the text you paste. We do not integrate with your repositories directly unless you specifically use our future GitHub Action." },
    { q: "Which AI model do you use?", a: "By default, we use Mistral instruction-tuned models optimized for developer workflows. Pro users get access to higher-context models for massive commit logs." },
    { q: "What happens when I hit the free limit?", a: "You'll be prompted to upgrade to Pro. Free accounts are limited to 5 total generations to help us cover API costs." },
    { q: "Can I cancel anytime?", a: "Yes. Our Pro subscription is handled by Stripe. You can cancel with one click in your billing dashboard." },
    { q: "Is there a GitHub Action?", a: "It's currently in beta for Pro users. You'll be able to automatically generate releases on every tag push soon." },
  ]

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 max-w-[640px] mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <FadeUp>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-text-primary mb-4">Questions about shipment?</h2>
          <div className="font-mono text-xs text-text-secondary">Everything you need to know about automating your release workflow.</div>
        </FadeUp>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <FadeUp key={i} delay={i * 0.05}>
            <div className="border border-border rounded-xl bg-bg-surface overflow-hidden transition-all hover:border-border-hover">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors"
              >
                <span className="font-mono text-xs text-text-primary">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  className="text-text-muted"
                >
                  <Plus className="h-4 w-4" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-5 pb-5 font-mono text-xs text-text-secondary leading-relaxed border-t border-border/5 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
