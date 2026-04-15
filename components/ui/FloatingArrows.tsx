'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function FloatingArrow({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return

    // Create a smooth float for the entire SVG (magnetic levitation)
    gsap.to(containerRef.current, {
      y: "+=6",
      x: "+=2",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Subtly rotate for more life
    gsap.to(containerRef.current, {
      rotate: 1,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })

    // Morph the path over time to create a "liquid" or "wave" feel
    let frame = 0
    const animatePath = () => {
      frame += 0.015
      if (!pathRef.current) return
      
      const waveHeight = Math.sin(frame) * 8
      const midControl = 25 + waveHeight
      
      // Redraw the quadratic bezier curve
      pathRef.current.setAttribute('d', `M 0 25 Q 50 ${midControl} 100 25`)
    }

    gsap.ticker.add(animatePath)

    // Flowing dash effect for the light-stream
    gsap.to(pathRef.current, {
      strokeDashoffset: -40,
      duration: 2,
      repeat: -1,
      ease: "linear"
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
        <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
        </linearGradient>
        <filter id="arrow-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background static ghost line */}
      <path 
        d="M 0 25 Q 50 25 100 25" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeOpacity="0.05" 
        fill="none" 
      />

      {/* Primary animated path */}
      <path
        ref={pathRef}
        d="M 0 25 Q 50 25 100 25"
        stroke="url(#arrow-grad)"
        strokeWidth="1.5"
        strokeDasharray="4 8"
        filter="url(#arrow-glow)"
        strokeLinecap="round"
        className="text-accent"
      />

      {/* Arrow Head */}
      <path 
        d="M 97 22 L 100 25 L 97 28" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-accent opacity-80"
      />
    </svg>
  )
}
