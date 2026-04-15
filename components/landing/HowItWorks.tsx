'use client'
import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { Terminal, Cpu, Layers } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import { AnimatedBeam } from '@/components/ui/animated-beam'

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

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
          
          {/* Tier 1: Icons and Beams */}
          <div className="hidden md:flex items-center w-full mb-16 relative h-20">
            <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center w-full">
              {/* Step 1 Icon */}
              <div ref={step1Ref} className="relative z-10 group cursor-help">
                <div className="h-16 w-16 rounded-[1.5rem] bg-bg-surface border border-border flex items-center justify-center text-accent shadow-sm group-hover:border-accent/40 transition-all duration-500">
                  <Terminal className="h-7 w-7" aria-hidden="true" />
                </div>
              </div>

              {/* Spacer 1 */}
              <div className="h-px bg-border/20 w-full" />

              {/* Step 2 Icon */}
              <div ref={step2Ref} className="relative z-10 group cursor-help">
                <div className="h-16 w-16 rounded-[1.5rem] bg-bg-surface border border-border flex items-center justify-center text-accent shadow-sm group-hover:border-accent/40 transition-all duration-500">
                  <Cpu className="h-7 w-7" aria-hidden="true" />
                </div>
              </div>

              {/* Spacer 2 */}
              <div className="h-px bg-border/20 w-full" />

              {/* Step 3 Icon */}
              <div ref={step3Ref} className="relative z-10 group cursor-help">
                <div className="h-16 w-16 rounded-[1.5rem] bg-bg-surface border border-border flex items-center justify-center text-accent shadow-sm group-hover:border-accent/40 transition-all duration-500">
                  <Layers className="h-7 w-7" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* MagicUI Animated Beams */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step1Ref}
              toRef={step2Ref}
              curvature={-20}
              duration={3}
              pathColor="#ffffff10"
              gradientStartColor="#e8ff47"
              gradientStopColor="#e8ff47"
              pathWidth={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step2Ref}
              toRef={step3Ref}
              curvature={20}
              duration={3}
              delay={1}
              pathColor="#ffffff10"
              gradientStartColor="#e8ff47"
              gradientStopColor="#e8ff47"
              pathWidth={3}
            />
          </div>

          {/* Tier 2: Headers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-12">
            {steps.map((step: any, i: any) => (
              <div key={`header-${i}`} className="relative group">
                <FadeUp delay={i * 0.1}>
                  <div className="space-y-5 text-left p-6 sm:p-8 rounded-[2rem] border border-transparent hover:border-border hover:bg-bg-surface/20 transition-all duration-500">
                    <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-[0.2em] leading-none px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-xl inline-block">Step {step.id}</span>
                    <h3 className="text-2xl sm:text-3xl font-serif italic text-text-primary tracking-tight">{step.title}</h3>
                    <p className="font-mono text-[13px] text-text-muted leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                  </div>
                </FadeUp>
              </div>
            ))}
          </div>

          {/* Tier 3: Artifact Previews */}
          <div className="hidden md:grid grid-cols-3 gap-12">
            {steps.map((step: any, i: any) => (
              <FadeUp key={`preview-${i}`} delay={i * 0.15}>
                <div className="relative overflow-hidden p-8 sm:p-10 rounded-[2.5rem] bg-bg-surface border border-border/40 hover:border-accent/20 transition-all duration-700 group shadow-[0_8px_32px_rgba(0,0,0,0.02)] min-h-[180px] flex items-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="font-mono text-[11px] sm:text-[12px] text-text-muted whitespace-pre-wrap leading-relaxed group-hover:text-text-primary transition-colors relative z-10">
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
