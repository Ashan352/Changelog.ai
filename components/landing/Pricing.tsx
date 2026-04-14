'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import Link from 'next/link'
import { TiltedCard } from '@/components/motion/TiltedCard'

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: 'Free',
      badge: 'Get started',
      price: '0',
      period: ' forever',
      features: [
        '5 total generations',
        '24-hour output history',
        'Standard AI model',
        'No public hosted page',
      ],
      cta: 'Start free',
      featured: false
    },
    {
      name: 'Pro',
      badge: 'Most popular',
      price: isAnnual ? '6' : '8',
      period: '/month',
      features: [
        'Unlimited generations',
        'Permanent history',
        'Priority AI model',
        'Custom hosted page',
        'GitHub README badge',
      ],
      cta: 'Start 7-day free trial',
      featured: true,
      save: isAnnual ? 'Billed $72 annually' : null
    }
  ]

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <FadeUp>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-text-primary mb-4">Fair pricing for high-velocity teams</h2>
          <div className="font-mono text-xs sm:text-sm text-text-secondary max-w-[600px] px-2">Focus on building. We&apos;ll handle the documentation. Save 5+ hours every sprint.</div>
        </FadeUp>

        {/* Toggle */}
        <div className="flex items-center gap-4 bg-bg-surface border border-border p-1 rounded-full mb-8 sm:mb-12 mt-6">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2.5 rounded-full font-mono text-sm transition-colors ${!isAnnual ? 'bg-bg text-text-primary border border-border' : 'text-text-muted hover:text-text-secondary'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2.5 rounded-full font-mono text-sm transition-colors truncate relative ${isAnnual ? 'bg-bg text-text-primary border border-border' : 'text-text-muted hover:text-text-secondary'}`}
          >
            Yearly
            {isAnnual && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-4 -right-4 px-2 py-0.5 rounded bg-accent text-bg font-bold text-[9px]"
              >
                -25%
              </motion.span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto items-stretch">
        {plans.map((plan, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <TiltedCard>
              <div className={`h-full relative flex flex-col rounded-[2.5rem] overflow-hidden border transition-all duration-500 ${plan.featured
                  ? 'bg-bg-surface border-accent/30 shadow-[0_0_80px_rgba(232,255,71,0.08)] md:scale-105 z-10'
                  : 'bg-bg-surface/50 border-border/50 backdrop-blur-sm'
                }`}>

                {/* Ticket Header (Stub) */}
                <div className={`relative p-8 pb-6 flex flex-col items-center text-center overflow-hidden ${plan.featured ? 'bg-accent/5' : 'bg-bg-elevated/10'
                  }`}>
                  {/* Subtle Wave Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
                    <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full text-text-primary">
                      <path d="M0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M0 15 Q 12.5 5 25 15 T 50 15 T 75 15 T 100 15" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                  </div>

                  <span className={`px-4 py-0.5 rounded-full text-[12px] font-mono uppercase tracking-[0.2em] mb-4 ${plan.featured ? 'bg-accent text-bg font-bold' : 'bg-bg-elevated text-text-muted'
                    }`}>
                    {plan.badge}
                  </span>

                  <h3 className="text-xl font-serif italic text-text-primary mb-2">{plan.name}</h3>

                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-serif italic text-text-muted">$</span>
                    <motion.span
                      key={plan.price}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl font-serif italic text-text-primary leading-none"
                    >
                      {plan.price}
                    </motion.span>
                    <span className="text-sm font-mono text-text-muted">.00</span>
                  </div>

                  {plan.period && (
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest mt-2">per {isAnnual ? 'year' : 'month'}</span>
                  )}

                  {plan.save && (
                    <div className="font-mono text-[9px] text-accent mt-3 bg-accent/10 px-2 py-0.5 rounded-full">{plan.save}</div>
                  )}
                </div>

                {/* Perforated Divider */}
                <div className="relative h-6 flex items-center justify-center pointer-events-none">
                  {/* Left Notch */}
                  <div className="absolute -left-3 h-6 w-6 rounded-full bg-bg border-r border-border/50" />
                  {/* Right Notch */}
                  <div className="absolute -right-3 h-6 w-6 rounded-full bg-bg border-l border-border/50" />
                  {/* Dotted Line */}
                  <div className="w-[calc(100%-1.5rem)] h-[1px] border-t-2 border-dotted border-border/40" />
                </div>

                {/* Ticket Body */}
                <div className="flex-1 p-8 pt-4 flex flex-col items-center text-center">
                  <ul className="flex-1 space-y-4 mb-10 w-full max-w-[240px]">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 justify-center">
                        <Check className={`h-4 w-4 shrink-0 ${plan.featured ? 'text-accent' : 'text-text-muted'}`} />
                        <span className="font-mono text-sm text-text-secondary leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={`/login?callbackUrl=/dashboard/pricing&signup=true`}
                    className={`group w-full flex items-center justify-center gap-2 h-14 rounded-full font-mono font-bold text-sm transition-all active:scale-[0.98] ${
                    plan.featured ? 'bg-accent text-bg hover:brightness-110 shadow-[0_4px_24px_rgba(232,255,71,0.2)]' : 'bg-bg border border-border text-text-primary hover:bg-bg-hover'
                  }`}>
                    {plan.featured ? "Get Premium Access" : plan.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </TiltedCard>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
