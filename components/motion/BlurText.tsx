'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export function BlurText({ text, delay = 0 }: { text: string, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  const words = text.split(" ")

  return (
    <div ref={ref} className="flex flex-wrap justify-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 10 }}
          animate={isInView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
