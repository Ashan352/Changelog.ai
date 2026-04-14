'use client'

import { buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/ui/Logo"
import { ArrowLeft, ServerCrash, AlertTriangle, Sparkle, RotateCcw } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

export default function Error({
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
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden selection:bg-accent/30">
      
      {/* Complete Layout Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[85vh] bg-bg rounded-[2.5rem] border border-border shadow-2xl overflow-hidden relative z-10">
        
        {/* Left Side: Content */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden z-10">
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#12161005_1px,transparent_1px),linear-gradient(to_bottom,#12161005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />
          
          <div className="mb-12 lg:mb-20">
            <Logo hideTagline={true} />
          </div>

          <div className="space-y-6 max-w-md relative z-20">
            <p className="font-mono text-[11px] text-accent uppercase tracking-[0.2em] font-bold">
              Error 500
            </p>
            
            <h1 className="text-5xl md:text-6xl font-serif text-text-primary tracking-tight leading-[1.1]">
              Oops. <span className="block mt-2">Something broke</span> <span className="block italic text-text-secondary">on our end.</span>
            </h1>
            
            <p className="text-text-muted font-mono text-sm leading-relaxed pb-6 pt-2">
              A critical process failed unexpectedly. Our systems have been notified. You can try restarting the process or return to the homepage.
              {error?.digest && (
                <span className="block mt-2 text-text-muted/50 text-xs">Digest: {error.digest}</span>
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <button
                onClick={reset}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-14 px-8 rounded-full font-mono text-[12px] uppercase tracking-widest bg-accent text-bg hover:bg-accent/90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 w-fit shadow-xl"
                )}
              >
                <RotateCcw className="h-4 w-4" />
                Restart Process
              </button>
              <Link 
                href="/" 
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-14 px-8 rounded-full font-mono text-[12px] uppercase tracking-widest bg-bg-surface border border-border text-text-primary hover:bg-bg-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 w-fit shadow-xl"
                )}
              >
                <ArrowLeft className="h-4 w-4" />
                Emergency Exit
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Graphic/Visuals */}
        <div className="flex-1 bg-bg-surface border-t lg:border-t-0 lg:border-l border-border/50 relative overflow-hidden min-h-[500px] lg:min-h-auto flex items-center justify-center p-8 md:p-16">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[600px] max-h-[600px] bg-danger/5 blur-[120px] rounded-full animate-pulse z-0 pointer-events-none" />

          {/* Large 500 Graphic */}
          <div className="relative z-10 flex items-center justify-center w-full h-full max-w-[500px]">
            <h2 className="text-[160px] md:text-[220px] lg:text-[280px] font-serif italic text-accent/90 leading-none drop-shadow-2xl select-none">
              500
            </h2>
            
            {/* Floating: Server Crash Pill */}
            <div className="absolute -left-4 md:-left-8 top-[20%] bg-bg border border-border rounded-[2rem] p-5 shadow-2xl flex flex-col items-center gap-3 transform -rotate-[8deg] animate-[bounce_6s_ease-in-out_infinite]">
              <ServerCrash className="h-8 w-8 text-accent" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-secondary font-bold">Server Error</span>
            </div>

            {/* Floating: Error Pill */}
            <div className="absolute right-0 md:-right-8 top-[10%] bg-bg-elevated border border-border rounded-full px-5 py-2.5 shadow-xl flex items-center gap-2.5 transform rotate-[6deg] animate-[bounce_5s_ease-in-out_infinite_0.5s]">
              <AlertTriangle className="h-3.5 w-3.5 text-danger animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-primary font-bold">Critical</span>
            </div>

            {/* Sparkle Decoration */}
            <div className="absolute right-[10%] -bottom-4 text-accent animate-[spin_12s_linear_infinite]">
              <Sparkle className="h-16 w-16 fill-accent opacity-80" />
            </div>
            
            <div className="absolute left-[40%] bottom-[15%] text-accent/50 animate-[spin_8s_linear_infinite_reverse]">
              <Sparkle className="h-6 w-6 fill-accent/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
