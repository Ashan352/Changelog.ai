'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Terminal, Cpu, Layers } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'

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

        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 list-none p-0" aria-label="Steps to automate your changelogs">
          {steps.map((step: any, i: any) => (
            <li key={i} className="relative group">
              {/* MOBILE ANIMATED ARROWS */}
              {i < steps.length - 1 && (
                <div className="absolute top-12 left-0 w-full h-[calc(100%-1rem)] md:hidden z-0 pointer-events-none" aria-hidden="true">
                  <svg 
                    className="w-full h-full overflow-visible text-border"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <motion.path 
                      d={i % 2 === 0 
                        ? "M 50 0 C 80 30, 80 70, 50 100" 
                        : "M 50 0 C 20 30, 20 70, 50 100"} 
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <motion.path 
                      d={i % 2 === 0 
                        ? "M 50 0 C 80 30, 80 70, 50 100" 
                        : "M 50 0 C 20 30, 20 70, 50 100"} 
                      vectorEffect="non-scaling-stroke"
                      stroke="#9bb15e" 
                      strokeWidth="2" 
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                      fill="none"
                      style={{ pathLength: scrollYProgress }}
                    />
                  </svg>
                </div>
              )}

              <FadeUp delay={i * 0.1}>
                {/* Header Row: Icon, Step, Title */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-bg-surface border border-border flex items-center justify-center text-accent shadow-sm shrink-0">
                    <step.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                    <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-widest leading-none px-2 py-1 bg-accent/5 border border-accent/10 rounded-md shrink-0 w-fit">Step {step.id}</span>
                    <h3 className="text-lg md:text-xl font-serif italic text-text-primary whitespace-nowrap">{step.title}</h3>
                  </div>
                </div>

                <div className="space-y-4 text-left relative z-10 rounded-2xl md:bg-transparent">
                  <p className="font-mono text-[11px] text-text-muted leading-relaxed max-w-[320px]">{step.desc}</p>
                </div>

                <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl bg-bg-surface border border-border group-hover:border-border-hover transition-colors shadow-sm relative z-10 overflow-hidden">
                  <div className="font-mono text-[11px] text-text-muted whitespace-pre-wrap leading-loose">
                    {step.content}
                  </div>
                </div>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
