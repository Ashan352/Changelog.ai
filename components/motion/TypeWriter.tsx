'use client'
import { useEffect, useState } from 'react'

export function TypeWriter({ text, speed = 50, delay = 0, className = '' }: { text: string, speed?: number, delay?: number, className?: string }) {
  const [displayedText, setDisplayedText] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    let currentText = ''
    
    const interval = setInterval(() => {
      if (i < text.length) {
        currentText += text.charAt(i)
        setDisplayedText(currentText)
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    
    return () => clearInterval(interval)
  }, [text, started, speed])

  return (
    <span className={className}>
      {displayedText}
      <span className="inline-block w-2 animate-cursor-blink border-r-2 border-text-primary ml-1 h-[1em] align-middle" />
    </span>
  )
}
