'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function CountUp({ end, delay = 0, duration = 2, className = '', decimals = 0 }: { end: number, delay?: number, duration?: number, className?: string, decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    
    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      
      if (progress < delay * 1000) {
        animationFrame = window.requestAnimationFrame(step)
        return
      }

      const elapsed = progress - delay * 1000
      const percentage = Math.min(elapsed / (duration * 1000), 1)
      
      // easeOutExpo
      const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage)
      
      setCount(easeProgress * end)
      
      if (percentage < 1) {
        animationFrame = window.requestAnimationFrame(step)
      }
    }

    animationFrame = window.requestAnimationFrame(step)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [inView, end, delay, duration])

  return <span ref={ref} className={className}>{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>
}
