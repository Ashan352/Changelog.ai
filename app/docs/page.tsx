import { buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/ui/Logo"
import { ArrowLeft, Terminal, Hammer, Sparkle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Changelog AI documentation is coming soon.',
}

export default function DocsComingSoon() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden selection:bg-accent/30">
      
      {/* Complete Layout Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[85vh] bg-bg rounded-[2.5rem] border border-border shadow-2xl overflow-hidden relative z-10">
        
        {/* Left Side: Content */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden z-10">
          {/* Subtle Grid on Left */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#12161005_1px,transparent_1px),linear-gradient(to_bottom,#12161005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />
          
          <div className="mb-12 lg:mb-20">
            <Logo hideTagline={true} />
          </div>

          <div className="space-y-6 max-w-md relative z-20">
            <p className="font-mono text-[11px] text-accent uppercase tracking-[0.2em] font-bold">
              Engineering in progress
            </p>
            
            <h1 className="text-5xl md:text-6xl font-serif text-text-primary tracking-tight leading-[1.1]">
              Docs. <span className="block mt-2">Coming</span> <span className="block italic text-text-secondary">very soon!</span>
            </h1>
            
            <p className="text-text-muted font-mono text-sm leading-relaxed pb-6 pt-2">
              We are finalizing the developer guides, integration references, and API documentation for Changelog AI. Stay tuned for the official launch.
            </p>

            <Link 
              href="/" 
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-14 px-8 rounded-full font-mono text-[12px] uppercase tracking-widest bg-bg-surface border border-border text-text-primary hover:bg-bg-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 w-fit shadow-xl"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Homepage
            </Link>
          </div>
        </div>

        {/* Right Side: Graphic/Visuals */}
        <div className="flex-1 bg-bg-surface border-t lg:border-t-0 lg:border-l border-border/50 relative overflow-hidden min-h-[500px] lg:min-h-auto flex items-center justify-center p-8 md:p-16">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[600px] max-h-[600px] bg-accent/5 blur-[120px] rounded-full animate-pulse z-0 pointer-events-none" />

          {/* Large Graphic Container */}
          <div className="relative z-10 flex items-center justify-center w-full h-full max-w-[500px]">
            <h2 className="text-[140px] md:text-[200px] lg:text-[240px] font-serif italic text-accent/90 leading-none drop-shadow-2xl select-none">
              WIP
            </h2>
            
            {/* Floating Element: Terminal Pill (Top Left) */}
            <div className="absolute -left-4 md:-left-8 top-[20%] bg-bg border border-border rounded-[2rem] p-5 shadow-2xl flex flex-col items-center gap-3 transform -rotate-[8deg] animate-[bounce_6s_ease-in-out_infinite]">
              <Terminal className="h-8 w-8 text-accent" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-secondary font-bold">API Refs</span>
            </div>

            {/* Floating Element: Building Pill (Top Right) */}
            <div className="absolute right-0 md:-right-8 top-[10%] bg-bg-elevated border border-border rounded-full px-5 py-2.5 shadow-xl flex items-center gap-2.5 transform rotate-[6deg] animate-[bounce_5s_ease-in-out_infinite_0.5s]">
              <Hammer className="h-3.5 w-3.5 text-text-secondary animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-primary font-bold">Building</span>
            </div>

            {/* Sparkle Decoration (Bottom Right) */}
            <div className="absolute right-[10%] -bottom-4 text-accent animate-[spin_12s_linear_infinite]">
              <Sparkle className="h-16 w-16 fill-accent opacity-80" />
            </div>
            
            {/* Small Sparkle (Center Bottom) */}
            <div className="absolute left-[40%] bottom-[15%] text-accent/50 animate-[spin_8s_linear_infinite_reverse]">
              <Sparkle className="h-6 w-6 fill-accent/50" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
