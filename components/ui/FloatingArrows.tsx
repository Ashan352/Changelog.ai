'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function FloatingArrow({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null)
  const ghostRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!pathRef.current || !containerRef.current || !ghostRef.current) return

    // REMOVED: Shaking / Floating of the container as requested
    // We only keep the internal path animations for a clean look

    // Liquid path morphing - made extremely subtle and slow
    let frame = 0
    const animatePath = () => {
      frame += 0.008 // Slower
      const w1 = Math.sin(frame) * 2 // Reduced
      const w2 = Math.cos(frame * 0.8) * 1.5 // Reduced
      
      const pathData = `M 0 25 L 42 25 C ${46+w1} ${14+w2}, ${54-w1} ${14-w2}, ${54} 25 C ${54+w2} ${36+w1}, ${46-w2} ${36-w1}, ${46} 25 L 100 25`
      
      if (pathRef.current) pathRef.current.setAttribute('d', pathData)
      if (ghostRef.current) ghostRef.current.setAttribute('d', pathData)
    }

    gsap.ticker.add(animatePath)

    // Flowing pulse effect through the lasso
    gsap.set(pathRef.current, { strokeDasharray: "40 160", strokeDashoffset: 200 })
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 3,
      repeat: -1,
      ease: "none"
    })

    return () => {
      gsap.ticker.remove(animatePath)
    }
  }, [])

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
        <linearGradient id="lasso-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
        <filter id="lasso-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Ghost Path */}
      <path 
        ref={ghostRef}
        d="M 0 25 L 42 25 C 46 12, 54 12, 54 25 C 54 38, 46 38, 46 25 L 100 25" 
        stroke="var(--color-accent)" 
        strokeWidth="1" 
        strokeOpacity="0.1" 
        fill="none" 
      />

      {/* Primary animated beam */}
      <path
        ref={pathRef}
        d="M 0 25 L 42 25 C 46 12, 54 12, 54 25 C 54 38, 46 38, 46 25 L 100 25"
        stroke="url(#lasso-grad)"
        strokeWidth="2"
        filter="url(#lasso-glow)"
        strokeLinecap="round"
      />
    </svg>
  )
}
