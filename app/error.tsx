'use client'
import { useEffect } from 'react'
import { Button, buttonVariants } from "@/components/ui/button"
import { AlertTriangle, RotateCcw, Home } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Red Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-danger/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-md space-y-8">
        <div className="w-20 h-20 rounded-3xl bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="h-10 w-10 text-danger" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif italic text-text-primary">System Failure</h1>
          <p className="font-mono text-xs text-text-muted leading-relaxed">
            A critical error occurred while processing your request. Our team has been notified of the disturbance in the force.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-bg-surface border border-border rounded-xl text-left overflow-auto max-h-32">
              <p className="font-mono text-[10px] text-danger">{error.message}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            onClick={() => reset()}
            className="h-12 px-8 rounded-full font-mono text-xs uppercase tracking-widest bg-accent text-bg hover:bg-accent/90 transition-all w-full sm:w-auto"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart Process
          </Button>
          <Link 
            href="/" 
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 px-8 rounded-full font-mono text-xs uppercase tracking-widest border-border hover:bg-bg-hover transition-all w-full sm:w-auto flex items-center justify-center gap-2"
            )}
          >
            <Home className="h-4 w-4" />
            Emergency Exit
          </Link>
        </div>

        <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.3em] pt-12">Error ID: {error.digest || 'SIG_INTERRUPT'}</p>
      </div>

      {/* Warning Stripes */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--color-danger)_10px,var(--color-danger)_20px)] opacity-20" />
    </div>
  )
}
