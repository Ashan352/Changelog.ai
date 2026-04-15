'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function FloatingArrow({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null)
  const ghostRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!pathRef.current || !containerRef.current || !ghostRef.current) return

    // Magnetic levitation floating
    gsap.to(containerRef.current, {
      y: "+=6",
      x: "+=2",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Subtly rotate for more life
    gsap.to(containerRef.current, {
      rotate: 0.8,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })

    // Lasso Loop Path Data
    // We'll slightly wiggle the control points of the loop to make it feel alive
    let frame = 0
    const animatePath = () => {
      frame += 0.015
      const w1 = Math.sin(frame) * 3
      const w2 = Math.cos(frame * 0.8) * 2
      
      // M 0 25 L 35 25 
      // C 42 10, 58 10, 58 25 (Top of loop)
      // C 58 40, 42 40, 42 25 (Bottom of loop)
      // L 100 25
      
      const pathData = `M 0 25 L 42 25 C ${46+w1} ${12+w2}, ${54-w1} ${12-w2}, ${54} 25 C ${54+w2} ${38+w1}, ${46-w2} ${38-w1}, ${46} 25 L 100 25`
      
      if (pathRef.current) pathRef.current.setAttribute('d', pathData)
      if (ghostRef.current) ghostRef.current.setAttribute('d', pathData)
    }

    gsap.ticker.add(animatePath)

    // Flowing pulse effect (the "Ship" light passing through the loop)
    gsap.set(pathRef.current, { strokeDasharray: "30 170", strokeDashoffset: 200 })
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2.5,
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
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Ghost Path (faint underlying lasso) */}
      <path 
        ref={ghostRef}
        d="M 0 25 L 42 25 C 46 12, 54 12, 54 25 C 54 38, 46 38, 46 25 L 100 25" 
        stroke="var(--color-accent)" 
        strokeWidth="0.75" 
        strokeOpacity="0.08" 
        fill="none" 
      />

      {/* Primary animated beam through the lasso */}
      <path
        ref={pathRef}
        d="M 0 25 L 42 25 C 46 12, 54 12, 54 25 C 54 38, 46 38, 46 25 L 100 25"
        stroke="url(#lasso-grad)"
        strokeWidth="2"
        filter="url(#lasso-glow)"
        strokeLinecap="round"
      />

      {/* Subtle Arrow Head */}
      <path 
        d="M 98 23 L 100 25 L 98 27" 
        stroke="var(--color-accent)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="opacity-40"
      />
    </svg>
  )
}
