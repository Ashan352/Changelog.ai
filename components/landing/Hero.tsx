'use client'
import { motion } from 'framer-motion'
import { PlayCircle, ChevronDown, GitBranch, ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import { RevealText } from '@/components/motion/RevealText'
import { Magnetic } from '@/components/motion/Magnetic'
import { ShinyText } from '@/components/ui/ShinyText'
import { BlurText } from '@/components/motion/BlurText'
import Aurora from '@/components/ui/Aurora'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getLiveStats } from '@/app/actions/stats'

export function Hero({ isLoggedIn }: { isLoggedIn?: boolean }) {
  const [userCount, setUserCount] = useState<number | null>(null)

  useEffect(() => {
    getLiveStats().then(data => setUserCount(data.userCount))
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Aurora Ambient Background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none flex items-center justify-center">
        <Aurora 
          colorStops={['#e8ff47', '#3a4a0a', '#101010']} 
          blend={0.6}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      {/* Background grid */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-dim border border-accent/20 mb-8"
        >
          <GitBranch className="h-3 w-3 text-accent" />
          <span className="font-mono text-[12px] text-accent uppercase tracking-widest leading-none">For developers who ship</span>
        </motion.div>

        {/* Headline */}
        <h1 className="flex flex-col items-center mb-8 gap-2">
            <style>{`
               .blur-text-container span { font-size: clamp(2rem, 8vw, 6rem); line-height: 1.1; font-family: var(--font-serif); font-style: italic; color: var(--color-text-primary); }
            `}</style>
            <div className="blur-text-container text-center">
               <BlurText text="Stop wasting hours on release notes" delay={0.1} />
            </div>
        </h1>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-[95%] sm:max-w-[700px] font-mono text-sm sm:text-base md:text-lg text-text-secondary mb-10 sm:mb-12 leading-relaxed text-center px-2"
        >
          Paste your Git commits. Get a <ShinyText text="polished changelog" />, GitHub release, and tweet thread in under 4 seconds. Focus on Shipping.
        </motion.div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full sm:w-auto px-4 sm:px-0">
          <FadeUp delay={0.55}>
            <Magnetic>
              <Link href={isLoggedIn ? "/dashboard" : "/login?signup=true"} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 sm:px-10 h-12 sm:h-14 rounded-full bg-accent text-bg font-mono font-bold text-sm sm:text-base hover:bg-accent/90 transition-all hover:scale-[1.02] shadow-[0_0_32px_rgba(232,255,71,0.25)] active:scale-[0.98]">
                <span>{isLoggedIn ? "Go to Dashboard" : "Start shipping efficiently"}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </Magnetic>
          </FadeUp>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-3 px-4"
        >
          <div className="relative h-2 w-2">
            <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-40" />
            <div className="relative h-full w-full bg-accent rounded-full" />
          </div>
          <span className="font-mono text-[12px] text-text-muted uppercase tracking-widest underline decoration-border decoration-dashed underline-offset-4">
            Join {userCount || '...'} developers shipping with speed
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-text-muted"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  )
}
