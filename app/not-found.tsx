import { Button, buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/ui/Logo"
import { ArrowLeft, Home, Ghost } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      
      <div className="space-y-8 max-w-lg">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="relative">
          <Ghost className="h-24 w-24 text-accent/20 mx-auto animate-bounce" />
          <h1 className="text-8xl md:text-9xl font-serif italic text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none">404</h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl">Page Not Found</h2>
          <p className="text-text-muted font-mono text-sm leading-relaxed">
            The version of reality you're looking for doesn't exist yet, or perhaps it was deprecated in a previous release.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/" 
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 px-8 rounded-full font-mono text-xs uppercase tracking-widest border-border hover:bg-bg-hover transition-all w-full sm:w-auto flex items-center justify-center gap-2"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>
          <Link 
            href="/" 
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 px-8 rounded-full font-mono text-xs uppercase tracking-widest bg-accent text-bg hover:bg-accent/90 transition-all shadow-[0_0_24px_rgba(232,255,71,0.2)] w-full sm:w-auto flex items-center justify-center gap-2"
            )}
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </div>

        <div className="pt-16">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.3em]">Error Code: COMMIT_NOT_FOUND</p>
        </div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />
    </div>
  )
}
