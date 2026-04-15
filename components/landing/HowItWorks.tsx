'use client'
import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { Terminal, Cpu, Layers } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { User, Sparkles, FileText, Send, Share2 } from 'lucide-react'

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
    <section id="process" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-text-primary mb-4">One input. Infinite clarity.</h2>
            <div className="font-mono text-xs sm:text-sm text-text-secondary max-w-[600px] mx-auto">Our AI engine maps your engineering velocity to stakeholders in seconds.</div>
          </FadeUp>
        </div>

        {/* The Animated Network Flow Container */}
        <div className="relative w-full max-w-[950px] mx-auto mb-24 rounded-[3rem] sm:rounded-[4rem] border border-border/50 bg-bg-surface/40 backdrop-blur-[2px] overflow-hidden">
          {/* Subtle background texture/glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(145,201,107,0.08)_0%,transparent_70%)] pointer-events-none" />
          
          <div 
            ref={containerRef} 
            className="relative flex flex-col md:flex-row w-full items-center md:items-stretch justify-between min-h-[550px] md:min-h-[450px] p-8 sm:p-12 md:p-16 gap-16 md:gap-0"
          >
            {/* Column 1: Input (Step 1) */}
            <div className="flex flex-col justify-center z-10 w-full md:w-[120px]">
              <div ref={inputRef} className="relative group cursor-help mx-auto">
                 <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white border border-border flex items-center justify-center text-accent shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:border-accent/40 transition-all duration-500">
                    <User className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
                 </div>
                 <span className="absolute -bottom-8 sm:bottom-[-2.5rem] left-1/2 -translate-x-1/2 font-mono text-[9px] sm:text-[10px] text-text-muted uppercase tracking-widest whitespace-nowrap">Commits</span>
              </div>
            </div>

            {/* Column 2: The Hub (Step 2 - AI) */}
            <div className="flex flex-col justify-center z-10 w-full md:w-[180px]">
              <div ref={hubRef} className="relative group cursor-help mx-auto">
                 <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white border border-accent/20 flex items-center justify-center text-accent shadow-[0_20px_50px_rgba(145,201,107,0.15)] group-hover:border-accent/40 transition-all duration-500 relative">
                    {/* Inner pulse ring */}
                    <div className="absolute inset-0 rounded-full animate-ping bg-accent/5 opacity-20" />
                    <Sparkles className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true" />
                 </div>
                 <span className="absolute -bottom-10 sm:bottom-[-3rem] left-1/2 -translate-x-1/2 font-mono text-[10px] sm:text-[11px] text-text-primary font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">AI ENGINE</span>
              </div>
            </div>

            {/* Column 3: Outputs (Step 3) */}
            <div className="flex flex-row md:flex-col justify-center md:justify-between items-center gap-8 sm:gap-12 md:gap-8 z-10 w-full md:w-[120px] md:py-4">
              <div ref={output1Ref} className="relative group cursor-help">
                 <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white border border-border flex items-center justify-center text-text-secondary shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:border-accent/40 transition-all duration-500">
                    <FileText className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                 </div>
                 <span className="absolute -bottom-8 md:bottom-auto md:-right-28 md:top-1/2 md:-translate-y-1/2 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 font-mono text-[9px] sm:text-[10px] text-text-muted uppercase tracking-widest">Changelog</span>
              </div>

              <div ref={output2Ref} className="relative group cursor-help">
                 <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white border border-border flex items-center justify-center text-text-secondary shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:border-accent/40 transition-all duration-500">
                    <Send className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                 </div>
                 <span className="absolute -bottom-8 md:bottom-auto md:-right-28 md:top-1/2 md:-translate-y-1/2 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 font-mono text-[9px] sm:text-[10px] text-text-muted uppercase tracking-widest">Release</span>
              </div>

              <div ref={output3Ref} className="relative group cursor-help">
                 <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white border border-border flex items-center justify-center text-text-secondary shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:border-accent/40 transition-all duration-500">
                    <Share2 className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                 </div>
                 <span className="absolute -bottom-8 md:bottom-auto md:-right-28 md:top-1/2 md:-translate-y-1/2 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 font-mono text-[9px] sm:text-[10px] text-text-muted uppercase tracking-widest">Social</span>
              </div>
            </div>

            {/* Animated Beams */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={inputRef}
              toRef={hubRef}
              duration={3}
              curvature={0}
              pathColor="#00000015"
              gradientStartColor="#91c96b"
              gradientStopColor="#e8ff47"
              pathWidth={3}
            />

            <AnimatedBeam
              containerRef={containerRef}
              fromRef={hubRef}
              toRef={output1Ref}
              duration={3}
              curvature={-80}
              pathColor="#00000015"
              gradientStartColor="#91c96b"
              gradientStopColor="#e8ff47"
              pathWidth={3}
              delay={0.5}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={hubRef}
              toRef={output2Ref}
              duration={3}
              curvature={0}
              pathColor="#00000015"
              gradientStartColor="#91c96b"
              gradientStopColor="#e8ff47"
              pathWidth={3}
              delay={0.6}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={hubRef}
              toRef={output3Ref}
              duration={3}
              curvature={80}
              pathColor="#00000015"
              gradientStartColor="#91c96b"
              gradientStopColor="#e8ff47"
              pathWidth={3}
              delay={0.7}
            />
          </div>
        </div>

        {/* Tier 2: Step Descriptions (Text only) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-border/40">
          {stepsData.map((step: any, i: any) => (
            <div key={`info-${i}`} className="group">
              <FadeUp delay={i * 0.1}>
                <div className="space-y-4 text-left md:text-center px-4">
                  <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-[0.2em] leading-none px-3 py-1 bg-accent/10 border border-accent/20 rounded-full inline-block">Step {step.id}</span>
                  <h3 className="text-xl sm:text-2xl font-serif italic text-text-primary leading-tight">{step.title}</h3>
                  <p className="font-mono text-[12px] text-text-muted leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity mx-auto">{step.desc}</p>
                </div>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
