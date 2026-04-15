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
          <div className="hidden md:flex items-center w-full mb-12 relative">
            <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center w-full gap-0">
              {/* Step 1 */}
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-bg-surface border border-border flex items-center justify-center text-accent shadow-[0_4px_12px_rgba(0,0,0,0.05)] bg-bg">
                  <Terminal className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="h-12 flex items-center px-0">
                <FloatingArrow className="w-full h-24" />
              </div>

              {/* Step 2 */}
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-bg-surface border border-border flex items-center justify-center text-accent shadow-[0_4px_12px_rgba(0,0,0,0.05)] bg-bg">
                  <Cpu className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="h-12 flex items-center px-0">
                <FloatingArrow className="w-full h-24" />
              </div>

              {/* Step 3 */}
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-bg-surface border border-border flex items-center justify-center text-accent shadow-[0_4px_12px_rgba(0,0,0,0.05)] bg-bg">
                  <Layers className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Tier 2: Headers (Badge, Title, Desc) */}
          <div className="hidden md:flex items-center w-full mb-16 relative">
            <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center w-full gap-0">
              {/* Step 1 Icon */}
              <div className="relative group cursor-help">
                <div className="h-14 w-14 rounded-2xl bg-bg-surface border border-border flex items-center justify-center text-accent shadow-sm group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-500">
                  <Terminal className="h-6 w-6" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="h-14 flex items-center px-0">
                <FloatingArrow className="w-full h-32" delay={0} />
              </div>

              {/* Step 2 Icon */}
              <div className="relative group cursor-help">
                <div className="h-14 w-14 rounded-2xl bg-bg-surface border border-border flex items-center justify-center text-accent shadow-sm group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-500">
                  <Cpu className="h-6 w-6" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="h-14 flex items-center px-0">
                <FloatingArrow className="w-full h-32" delay={1} />
              </div>

              {/* Step 3 Icon */}
              <div className="relative group cursor-help">
                <div className="h-14 w-14 rounded-2xl bg-bg-surface border border-border flex items-center justify-center text-accent shadow-sm group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-500">
                  <Layers className="h-6 w-6" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                </div>
              </div>
            </div>
          </div>

          {/* Tier 2: Headers (Badge, Title, Desc) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-12">
            {steps.map((step: any, i: any) => (
              <div key={`header-${i}`} className="relative group">
                <FadeUp delay={i * 0.1}>
                  <div className="space-y-4 text-left p-6 rounded-2xl border border-transparent hover:border-border hover:bg-bg-surface/30 transition-all">
                    <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-[0.2em] leading-none px-2.5 py-1.5 bg-accent/10 border border-accent/20 rounded-lg inline-block transition-colors group-hover:bg-accent group-hover:text-bg">Step {step.id}</span>
                    <h3 className="text-2xl font-serif italic text-text-primary">{step.title}</h3>
                    <p className="font-mono text-[12px] text-text-muted leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                  </div>
                </FadeUp>
              </div>
            ))}
          </div>

          {/* Tier 3: Artifact Previews (Desktop Only) */}
          <div className="hidden md:grid grid-cols-3 gap-12">
            {steps.map((step: any, i: any) => (
              <FadeUp key={`preview-${i}`} delay={i * 0.15}>
                <div className="relative overflow-hidden p-8 rounded-[2rem] bg-bg-surface border border-border/60 hover:border-accent/30 transition-all group shadow-sm min-h-[160px] flex items-center">
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="font-mono text-[11px] text-text-muted whitespace-pre-wrap leading-relaxed group-hover:text-text-primary transition-colors">
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
