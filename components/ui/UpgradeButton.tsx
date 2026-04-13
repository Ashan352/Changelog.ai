'use client'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function UpgradeButton() {
  return (
    <Link 
      href="/dashboard/pricing"
      className="flex items-center gap-2 px-3 h-8 rounded-lg bg-accent text-bg font-mono text-[11px] font-bold transition-all shadow-[0_0_12px_rgba(232,255,71,0.2)] hover:bg-accent/90 active:scale-95 inline-flex w-fit"
    >
      Upgrade
      <ChevronRight className="h-3 w-3" />
    </Link>
  )
}
