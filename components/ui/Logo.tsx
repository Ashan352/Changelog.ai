'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { GitBranch } from 'lucide-react'

interface LogoProps {
  className?: string
  hideTagline?: boolean
}

export function Logo({ className, hideTagline = false }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 select-none group focus:outline-none", className)}>
      <div className="flex items-center gap-2">
        <GitBranch className="h-5 w-5 text-accent group-hover:rotate-12 transition-transform select-none pointer-events-none" />
        <div className="flex items-baseline">
          <span className="font-serif italic text-2xl font-medium tracking-tight text-text-primary">
            Changelog
          </span>
          <span className="font-serif italic text-2xl font-normal text-text-muted opacity-70 translate-x-[-1px]">
            .ai
          </span>
        </div>
      </div>
      
      {!hideTagline && (
        <>
          <div className="h-4 w-px bg-border/40 mx-1 hidden lg:block" />
          <span className="text-sm font-mono text-text-muted uppercase tracking-[0.2em] hidden lg:block whitespace-nowrap mt-1">
            Stop writing changelogs
          </span>
        </>
      )}
    </Link>
  )
}
