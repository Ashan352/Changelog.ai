import { Logo } from '@/components/ui/Logo'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-surface/30 pt-16 pb-8 px-4 sm:px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="md:col-span-2 space-y-6">
            <p className="font-mono text-sm text-text-secondary max-w-sm leading-relaxed">
              Founded to eliminate the busywork between shipping code and informing users. We build high-velocity developer tools designed for maximum efficiency.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[12px] font-mono text-text-secondary">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>OAuth Secured</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] font-mono text-text-secondary">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>

          <nav className="grid grid-cols-2 lg:grid-cols-3 col-span-1 md:col-span-2 gap-8 md:gap-12" aria-label="Footer Navigation">
            <div className="space-y-4">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-bold">Product</h3>
              <ul className="space-y-3 list-none p-0">
                <li><Link href="#process" className="font-mono text-[13px] text-text-muted hover:text-accent transition-colors">Process</Link></li>
                <li><Link href="#demo" className="font-mono text-[13px] text-text-muted hover:text-accent transition-colors">Interactive Demo</Link></li>
                <li><Link href="#pricing" className="font-mono text-[13px] text-text-muted hover:text-accent transition-colors">Pricing</Link></li>
                <li><Link href="/login" className="font-mono text-[13px] text-text-muted hover:text-accent transition-colors">Login / Sign Up</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-bold">Resources</h3>
              <ul className="space-y-3 list-none p-0">
                <li><Link href="/docs" className="font-mono text-[13px] text-text-muted hover:text-accent transition-colors">Documentation</Link></li>
                <li><Link href="/faq" className="font-mono text-[13px] text-text-muted hover:text-accent transition-colors">FAQ</Link></li>
                <li><Link href="/support" className="font-mono text-[13px] text-text-muted hover:text-accent transition-colors">Support</Link></li>
              </ul>
            </div>

            <div className="space-y-4 hidden lg:block">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-bold">Legal</h3>
              <ul className="space-y-3 list-none p-0">
                <li><Link href="/privacy" className="font-mono text-[13px] text-text-muted hover:text-accent transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="font-mono text-[13px] text-text-muted hover:text-accent transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="font-mono text-[13px] text-text-muted hover:text-accent transition-colors">Security</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-text-muted/80">
            © {new Date().getFullYear()} Changelog.ai — Designed for velocity.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] text-text-muted/70 italic">All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
