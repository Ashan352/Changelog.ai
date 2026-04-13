'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function RevealText({ 
  text, 
  delay = 0, 
  className = '', 
  highlightWord = '', 
  highlightClassName = '' 
}: { 
  text: string, 
  delay?: number, 
  className?: string, 
  highlightWord?: string, 
  highlightClassName?: string 
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  
  const words = text.split(/(\s+)/) // Keep spaces

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => {
        // Find if word contains highlight, e.g., "changelogs." -> "changelogs" and "."
        const isHighlightMatch = highlightWord && word.includes(highlightWord)
        
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${isHighlightMatch ? highlightClassName : ''}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                delay: delay + (i * 0.06), // Stagger by 0.06s
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {word === ' ' ? '\u00A0' : word}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
