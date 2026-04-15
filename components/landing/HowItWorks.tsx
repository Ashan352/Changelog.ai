'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Terminal, Cpu, Layers } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import { FloatingArrow } from '@/components/ui/FloatingArrows'

export function HowItWorks() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // progress bar width
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const steps = [
    {
      id: '01',
      title: 'Paste your commits',
      desc: 'Git log, diff, or shortlog — we handle all formats.',
      icon: Terminal,
      content: 'git log --oneline\n7f2a1b Add OAuth\n3c4d5e Fix typo'
    },
    {
      id: '02',
      title: 'AI parses and groups',
      desc: 'Breaking changes, features, fixes — automatically categorized.',
      icon: Cpu,
      content: 'Grouping...\n[Features]: 1\n[Fixes]: 1'
    },
    {
      id: '03',
      title: 'Three artifacts, ready to ship',
      desc: 'Changelog, release body, tweet — copy with one click.',
      icon: Layers,
      content: 'CHANGELOG.md\nRELEASE_NOTES\nTWEET_THREAD'
    }
  ]

  return (
    <section ref={containerRef} id="process" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-text-primary mb-4">Stop manual mapping. Start shipping</h2>
            <div className="font-mono text-xs sm:text-sm text-text-secondary max-w-[600px] mx-auto">From messy git logs to polished marketing artifacts in under 4 seconds.</div>
          </FadeUp>
        </div>

        {/* Tiered Layout: Rows instead of Columns */}
        <div className="space-y-4 md:space-y-12">
          
          {/* Tier 1: Icons */}
          <div className="hidden md:grid grid-cols-3 gap-12 relative w-full mb-12">
            
            {/* Animated Connector Arrows spanning from icon to icon */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex z-0 pointer-events-none w-full">
              {/* Arrow 1 to 2 */}
              <div className="w-[33%] ml-12 mr-2 flex items-center flex-1">
                 <FloatingArrow className="w-full h-12" />
              </div>
              
              {/* Arrow 2 to 3 */}
              <div className="w-[33%] ml-12 mr-2 flex items-center flex-1">
                 <FloatingArrow className="w-full h-12" />
              </div>
            </div>

            {steps.map((step: any, i: any) => (
              <div key={`icon-${i}`} className="flex justify-start relative z-10 w-full">
                <div className="relative h-12 w-12 rounded-xl bg-bg-surface border border-border flex items-center justify-center text-accent shadow-[0_4px_12px_rgba(0,0,0,0.05)] bg-bg">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>

          {/* Tier 2: Headers (Badge, Title, Desc) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step: any, i: any) => (
              <div key={`header-${i}`} className="relative">
                {/* Mobile Icon (shows only on mobile) */}
                <div className="md:hidden mb-4">
                  <div className="h-10 w-10 rounded-xl bg-bg-surface border border-border flex items-center justify-center text-accent">
                    <step.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>

                <FadeUp delay={i * 0.1}>
                  <div className="space-y-4 text-left">
                    <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-widest leading-none px-2 py-1 bg-accent/5 border border-accent/10 rounded-md inline-block">Step {step.id}</span>
                    <h3 className="text-xl font-serif italic text-text-primary h-auto md:h-8">{step.title}</h3>
                    <p className="font-mono text-[11px] text-text-muted leading-relaxed min-h-[40px]">{step.desc}</p>
                  </div>
                </FadeUp>

                {/* Mobile Preview (shows only on mobile) */}
                <div className="md:hidden mt-6 p-4 rounded-xl bg-bg-surface border border-border">
                  <div className="font-mono text-[11px] text-text-muted whitespace-pre-wrap leading-loose">
                    {step.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tier 3: Code Previews (Desktop Only) */}
          <div className="hidden md:grid grid-cols-3 gap-12">
            {steps.map((step: any, i: any) => (
              <FadeUp key={`preview-${i}`} delay={i * 0.15}>
                <div className="p-6 rounded-xl bg-bg-surface border border-border hover:border-border-hover transition-colors shadow-sm min-h-[140px]">
                  <div className="font-mono text-[11px] text-text-muted whitespace-pre-wrap leading-loose">
                    {step.content}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
