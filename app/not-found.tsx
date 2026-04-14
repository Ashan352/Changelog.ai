import { buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/ui/Logo"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden selection:bg-accent/30">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full -z-10 animate-pulse duration-[3000ms]" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_30%,transparent_100%)] -z-20 pointer-events-none" />

      <div className="w-full flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto z-10 pt-16">
        
        {/* Animated Rings instead of messy ghost */}
        <div className="relative flex items-center justify-center mb-10 w-[300px] h-[200px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border border-accent/10 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-dashed border-border/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          <h1 className="text-[130px] md:text-[180px] leading-none font-serif italic tracking-tighter drop-shadow-2xl select-none z-10 bg-gradient-to-b from-text-primary to-text-muted bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-700 ease-out">
            404
          </h1>
        </div>

        <div className="space-y-6 relative z-20">
          <h2 className="text-3xl md:text-4xl font-serif italic text-text-primary tracking-wide">Reality Not Found</h2>
          <p className="text-text-muted font-mono text-[13px] leading-relaxed max-w-md mx-auto">
            The changelog entry you're looking for was either skipped, reverted, or doesn't exist in this branch.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 w-full max-w-md mx-auto relative z-20">
          <Link 
             href="/" 
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-14 px-8 rounded-full font-mono text-[11px] uppercase tracking-widest border-border/50 hover:border-accent/40 bg-bg-surface/50 hover:bg-bg-hover transition-all w-full sm:w-auto flex items-center justify-center gap-2 backdrop-blur-md"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>
          <Link 
            href="/" 
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-14 px-8 rounded-full font-mono text-[11px] uppercase tracking-widest bg-accent text-bg hover:bg-accent/90 transition-all shadow-[0_0_32px_rgba(232,255,71,0.2)] hover:shadow-[0_0_48px_rgba(232,255,71,0.35)] w-full sm:w-auto flex items-center justify-center gap-2"
            )}
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </div>

        <div className="pt-24 relative z-20">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-bg-elevated/20 border border-border/30 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-danger shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-pulse" />
            <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.25em]">Error Code: 404_COMMIT_MISSING</p>
          </div>
        </div>
      </div>
      
      {/* Independent logo to avoid layout shifts */}
      <div className="absolute top-8 left-8 sm:top-12 sm:left-12 opacity-60 hover:opacity-100 transition-opacity z-50">
        <Logo hideTagline={true} />
      </div>
    </div>
  )
}
