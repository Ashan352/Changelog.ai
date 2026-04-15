'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const faqs = [
    { q: "Which Git formats do you support?", a: "Honestly, almost all of them. Standard git log, shortlog, and even raw diffs—if you can copy it from your terminal, we can probably make sense of it." },
    { q: "Do you store my code or commits?", a: "No way. We only process the text you paste in. We don't touch your repositories directly unless you decide to use our GitHub Action later on." },
    { q: "Which AI model do you use?", a: "We use Mistral models that we've tuned specifically for dev workflows. If you're on Pro, you get access to models with way more 'brain power' for those massive commit logs." },
    { q: "What happens when I hit the free limit?", a: "You'll just see a prompt to upgrade to Pro. We keep it at 5 generations for free accounts just so we can keep the lights on and cover the API costs." },
    { q: "Can I cancel anytime?", a: "Yeah, of course. Everything is handled via Stripe, so you can cancel with one click from your billing page whenever you want." },
    { q: "Is there a GitHub Action?", a: "It's in beta for our Pro users right now. You'll be able to automate the whole release process on every tag push pretty soon." },
  ]

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 max-w-[640px] mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <FadeUp>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-text-primary mb-4">Got questions? We&apos;ve got answers.</h2>
          <p className="font-mono text-xs text-text-muted">Everything you might want to know about automating your releases.</p>
        </FadeUp>
      </div>
      
      <div className="space-y-4" role="list">
        {faqs.map((faq, i) => (
          <FadeUp key={i} delay={i * 0.05}>
            <div 
              className="border border-border rounded-xl bg-bg-surface overflow-hidden transition-all hover:border-border-hover"
              role="listitem"
            >
              <button
                aria-expanded={openIdx === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors"
              >
                <span className="font-mono text-xs text-text-primary font-bold">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  className="text-text-muted"
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    role="region"
                  >
                    <div className="px-5 pb-5 font-mono text-xs text-text-muted leading-relaxed border-t border-border/5 pt-3">
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
