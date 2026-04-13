'use client'
import { useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

export function Spotlight() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const background = useTransform(
    [x, y],
    ([latestX, latestY]) => `radial-gradient(800px circle at ${latestX}px ${latestY}px, rgba(232,255,71,0.06), transparent 80%)`
  )

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ background }}
    />
  )
}
