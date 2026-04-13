'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode, Children, isValidElement } from 'react'

export function Stagger({ children, delay = 0, staggerDelay = 0.06, className = '' }: { children: ReactNode, delay?: number, staggerDelay?: number, className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay
      }
    }
  }

  const item: any = {
    hidden: { opacity: 0, y: 24 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return <motion.div variants={item}>{child}</motion.div>;
        }
        return child;
      })}
    </motion.div>
  )
}
