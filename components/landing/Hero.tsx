'use client'
import { motion } from 'framer-motion'
import { ChevronDown, GitBranch, ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import { Magnetic } from '@/components/motion/Magnetic'
import { ShinyText } from '@/components/ui/ShinyText'
import { BlurText } from '@/components/motion/BlurText'
import Aurora from '@/components/ui/Aurora'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { getLiveStats } from '@/app/actions/stats'

export function Hero({ isLoggedIn }: { isLoggedIn?: boolean }) {
  const [userCount, setUserCount] = useState<number | null>(null)
  const [mouse, setMouse] = useState({ x: 50, y: 50 }) // percentage
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    getLiveStats().then(data => setUserCount(data.userCount))
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <header
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient drifting circuit grid */}
      <div className="ambient-grid absolute inset-0 z-0 pointer-events-none" />

      {/* Aurora Ambient Background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none flex items-center justify-center">
        <Aurora 
          colorStops={['#e8ff47', '#91c96b', '#e8ff47']} 
          blend={0.5}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      {/* Cursor-tracked spotlight */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-75"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(26,51,0,0.12), transparent 60%)`,
        }}
      />

      {/* Background grid overlay */}
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
          style={{ willChange: 'transform, opacity', contain: 'content' }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-dim border border-accent/20 mb-8"
        >
          <GitBranch className="h-3 w-3 text-accent" />
          <span className="font-mono text-[12px] text-accent uppercase tracking-widest leading-none">Built for the ones who actually ship</span>
        </motion.div>

        {/* Headline */}
        <div className="flex flex-col items-center mb-8 gap-2">
            <style>{`
               .blur-text-container span { font-size: clamp(2rem, 8vw, 6rem); line-height: 1.1; font-family: var(--font-serif); font-style: italic; color: var(--color-text-primary); }
            `}</style>
            <h1 className="blur-text-container text-center m-0 p-0 font-normal">
               <BlurText text="The AI Changelog Generator for Developers" delay={0.1} />
            </h1>
        </div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ willChange: 'opacity', contain: 'content' }}
          className="max-w-[95%] sm:max-w-[700px] font-mono text-sm sm:text-base md:text-lg text-text-secondary mb-10 sm:mb-12 leading-relaxed text-center px-2"
        >
          Changelog AI transforms your raw Git commits into <ShinyText text="polished changelogs" />, GitHub release notes, and Twitter announcements in seconds. No more manual writing — just paste your commits and ship.
        </motion.div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full sm:w-auto px-4 sm:px-0">
          <FadeUp delay={0.55}>
            <Magnetic>
              <Link
                href={isLoggedIn ? "/dashboard" : "/login?signup=true"}
                className="cta-pulse w-full sm:w-auto flex items-center justify-center gap-2 px-8 sm:px-10 h-12 sm:h-14 rounded-full bg-accent text-bg font-mono font-bold text-sm sm:text-base hover:bg-accent/90 transition-all hover:scale-[1.02] shadow-[0_0_32px_rgba(232,255,71,0.25)] active:scale-[0.98]"
              >
                <span>{isLoggedIn ? "Go to Dashboard" : "Ship faster now"}</span>
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
          style={{ willChange: 'opacity', contain: 'content' }}
          className="flex items-center gap-3 px-4 min-h-[24px]"
        >
          <div className="relative h-2 w-2" aria-hidden="true">
            <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-40" />
            <div className="relative h-full w-full bg-accent rounded-full" />
          </div>
          <span className="font-mono text-[12px] text-text-secondary uppercase tracking-widest underline decoration-border decoration-dashed underline-offset-4 pointer-events-auto">
            Join {userCount !== null ? userCount : '12,492'} {userCount === 1 ? 'dev' : 'devs'} shipping every single day
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: 'transform' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-text-muted"
        aria-hidden="true"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </header>
  )
}

