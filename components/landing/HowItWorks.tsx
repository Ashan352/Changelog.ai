'use client'
import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { Terminal, Cpu, Layers } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { User, Sparkles, FileText, Send, Twitter } from 'lucide-react'

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Input Ref
  const inputRef = useRef<HTMLDivElement>(null)
  // Hub Ref
  const hubRef = useRef<HTMLDivElement>(null)
  // Output Refs
  const output1Ref = useRef<HTMLDivElement>(null)
  const output2Ref = useRef<HTMLDivElement>(null)
  const output3Ref = useRef<HTMLDivElement>(null)
  
  const stepsData = [
    {
      id: '01',
      title: 'Paste your commits',
      desc: 'Git log, diff, or shortlog — we handle all formats.',
      content: 'git log --oneline\n7f2a1b Add OAuth\n3c4d5e Fix typo'
    },
    {
      id: '02',
      title: 'AI parses and groups',
      desc: 'Breaking changes, features, fixes — automatically categorized.',
      content: 'Grouping...\n[Features]: 1\n[Fixes]: 1'
    },
    {
      id: '03',
      title: 'Three artifacts, ready to ship',
      desc: 'Changelog, release body, tweet — copy with one click.',
      content: 'CHANGELOG.md\nRELEASE_NOTES\nTWEET_THREAD'
    }
  ]

  return (
    <section ref={containerRef} id="process" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-text-primary mb-4">One input. Infinite clarity.</h2>
            <div className="font-mono text-xs sm:text-sm text-text-secondary max-w-[600px] mx-auto">Our AI engine maps your engineering velocity to stakeholders in seconds.</div>
          </FadeUp>
        </div>

        {/* The Animated Network Flow */}
        <div className="relative flex w-full max-w-[800px] mx-auto items-center justify-between h-[300px] mb-24">
          
          {/* Column 1: Input (Step 1) */}
          <div className="flex flex-col items-center gap-12 z-10">
            <div ref={inputRef} className="relative group cursor-help">
               <div className="h-16 w-16 rounded-full bg-bg-surface border border-border flex items-center justify-center text-accent shadow-sm group-hover:border-accent/40 transition-all duration-500">
                  <User className="h-7 w-7" aria-hidden="true" />
               </div>
               <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-text-muted uppercase tracking-widest whitespace-nowrap">Commits</span>
            </div>
          </div>

          {/* Column 2: The Hub (Step 2 - AI) */}
          <div className="flex flex-col items-center z-10">
            <div ref={hubRef} className="relative group cursor-help">
               <div className="h-24 w-24 rounded-full bg-bg-surface border border-accent/20 flex items-center justify-center text-accent shadow-[0_0_40px_rgba(145,201,107,0.1)] group-hover:border-accent/40 transition-all duration-500 bg-gradient-to-br from-accent/5 to-transparent">
                  <Sparkles className="h-10 w-10 animate-pulse" aria-hidden="true" />
               </div>
               <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-text-primary font-bold uppercase tracking-widest whitespace-nowrap">AI ENGINE</span>
            </div>
          </div>

          {/* Column 3: Outputs (Step 3) */}
          <div className="flex flex-col items-center gap-6 z-10">
            <div ref={output1Ref} className="relative group cursor-help">
               <div className="h-14 w-14 rounded-full bg-bg-surface border border-border flex items-center justify-center text-text-secondary shadow-sm group-hover:border-accent/40 transition-all duration-500">
                  <FileText className="h-6 w-6" aria-hidden="true" />
               </div>
               <span className="absolute -right-24 top-1/2 -translate-y-1/2 font-mono text-[9px] text-text-muted uppercase tracking-widest hidden lg:block">Changelog</span>
            </div>

            <div ref={output2Ref} className="relative group cursor-help">
               <div className="h-14 w-14 rounded-full bg-bg-surface border border-border flex items-center justify-center text-text-secondary shadow-sm group-hover:border-accent/40 transition-all duration-500">
                  <Send className="h-6 w-6" aria-hidden="true" />
               </div>
               <span className="absolute -right-24 top-1/2 -translate-y-1/2 font-mono text-[9px] text-text-muted uppercase tracking-widest hidden lg:block">Release</span>
            </div>

            <div ref={output3Ref} className="relative group cursor-help">
               <div className="h-14 w-14 rounded-full bg-bg-surface border border-border flex items-center justify-center text-text-secondary shadow-sm group-hover:border-accent/40 transition-all duration-500">
                  <Twitter className="h-6 w-6" aria-hidden="true" />
               </div>
               <span className="absolute -right-24 top-1/2 -translate-y-1/2 font-mono text-[9px] text-text-muted uppercase tracking-widest hidden lg:block">Social</span>
            </div>
          </div>

          {/* Animated Beams */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={inputRef}
            toRef={hubRef}
            duration={3}
            curvature={0} // Straight line for input
            pathColor="#00000005"
            gradientStartColor="#91c96b"
            gradientStopColor="#e8ff47"
            pathWidth={3}
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={hubRef}
            toRef={output1Ref}
            duration={3}
            curvature={-40}
            pathColor="#00000005"
            gradientStartColor="#91c96b"
            gradientStopColor="#e8ff47"
            pathWidth={2}
            delay={0.5}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={hubRef}
            toRef={output2Ref}
            duration={3}
            curvature={0}
            pathColor="#00000005"
            gradientStartColor="#91c96b"
            gradientStopColor="#e8ff47"
            pathWidth={2}
            delay={0.6}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={hubRef}
            toRef={output3Ref}
            duration={3}
            curvature={40}
            pathColor="#00000005"
            gradientStartColor="#91c96b"
            gradientStopColor="#e8ff47"
            pathWidth={2}
            delay={0.7}
          />
        </div>

        {/* Tier 2: Step Descriptions (Text only) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-border/40">
          {stepsData.map((step: any, i: any) => (
            <div key={`info-${i}`} className="group">
              <FadeUp delay={i * 0.1}>
                <div className="space-y-4">
                  <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-[0.2em] leading-none px-3 py-1 bg-accent/10 border border-accent/20 rounded-full inline-block">Step {step.id}</span>
                  <h3 className="text-xl sm:text-2xl font-serif italic text-text-primary leading-tight">{step.title}</h3>
                  <p className="font-mono text-[12px] text-text-muted leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                </div>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
