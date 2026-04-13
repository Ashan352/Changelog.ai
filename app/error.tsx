'use client'
import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-serif italic text-text-primary mb-4">Something went wrong</h2>
      <p className="font-mono text-xs text-text-secondary max-w-[400px] mb-8">
        We encountered an unexpected error. This has been logged and we're looking into it.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 rounded-lg bg-accent text-bg font-mono font-bold text-xs hover:scale-105 transition-transform"
      >
        Try again
      </button>
    </div>
  )
}
