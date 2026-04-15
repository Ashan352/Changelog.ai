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
      y: "+=4",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Subtly rotate for more life
    gsap.to(containerRef.current, {
      rotate: 0.5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })

    // Liquid path morphing
    let frame = 0
    const animatePath = () => {
      frame += 0.012
      const waveHeight = Math.sin(frame) * 4 // Reduced for subtlety
      const midControl = 25 + waveHeight
      
      const pathData = `M 0 25 Q 50 ${midControl} 100 25`
      if (pathRef.current) pathRef.current.setAttribute('d', pathData)
      if (ghostRef.current) ghostRef.current.setAttribute('d', pathData)
    }

    gsap.ticker.add(animatePath)

    // Flowing pulse effect (the "Ship" light)
    // We animate dashOffset to move a single long gradient segment
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
        <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
        <filter id="beam-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Ghost Path (faint underlying connector) */}
      <path 
        ref={ghostRef}
        d="M 0 25 Q 50 25 100 25" 
        stroke="var(--color-accent)" 
        strokeWidth="0.5" 
        strokeOpacity="0.1" 
        fill="none" 
      />

      {/* Primary animated beam */}
      <path
        ref={pathRef}
        d="M 0 25 Q 50 25 100 25"
        stroke="url(#beam-grad)"
        strokeWidth="1.5"
        filter="url(#beam-glow)"
        strokeLinecap="round"
      />

      {/* Subtle Arrow Head at the end */}
      <path 
        d="M 98 23 L 100 25 L 98 27" 
        stroke="var(--color-accent)" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="opacity-40"
      />
    </svg>
  )
}
