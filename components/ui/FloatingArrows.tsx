'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function FloatingArrow({ className, delay = 0 }: { className?: string, delay?: number }) {
  const pathRef = useRef<SVGPathElement>(null)
  const ghostRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!pathRef.current || !containerRef.current || !ghostRef.current) return

    // Path morphing - organic "breathing" loop
    let frame = 0
    const animatePath = () => {
      frame += 0.01
      const w1 = Math.sin(frame + delay) * 2
      const w2 = Math.cos((frame + delay) * 0.8) * 1
      
      const pathData = `M 0 25 L 42 25 C ${46+w1} ${15+w2}, ${54-w1} ${15-w2}, ${54} 25 C ${54+w2} ${35+w1}, ${46-w2} ${35-w1}, ${46} 25 L 100 25`
      
      if (pathRef.current) pathRef.current.setAttribute('d', pathData)
      if (ghostRef.current) ghostRef.current.setAttribute('d', pathData)
    }

    gsap.ticker.add(animatePath)

    // Flowing pulse effect - high frequency, very smooth
    gsap.set(pathRef.current, { strokeDasharray: "25 175", strokeDashoffset: 200 })
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      repeat: -1,
      delay: delay,
      ease: "none"
    })

    return () => {
      gsap.ticker.remove(animatePath)
    }
  }, [delay])

  return (
    <svg 
      ref={containerRef}
      viewBox="0 0 100 50" 
      fill="none" 
      preserveAspectRatio="none"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`lasso-grad-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
          <stop offset="30%" stopColor="var(--color-accent)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="1" />
          <stop offset="70%" stopColor="var(--color-accent)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
        <filter id={`glow-${delay}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Underlying Track (very subtle) */}
      <path 
        ref={ghostRef}
        d="M 0 25 L 42 25 C 46 15, 54 15, 54 25 C 54 35, 46 35, 46 25 L 100 25" 
        stroke="var(--color-accent)" 
        strokeWidth="1" 
        strokeOpacity="0.05" 
        fill="none" 
      />

      {/* Animated Stream */}
      <path
        ref={pathRef}
        d="M 0 25 L 42 25 C 46 15, 54 15, 54 25 C 54 35, 46 35, 46 25 L 100 25"
        stroke={`url(#lasso-grad-${delay})`}
        strokeWidth="2"
        filter={`url(#glow-${delay})`}
        strokeLinecap="round"
      />
    </svg>
  )
}
