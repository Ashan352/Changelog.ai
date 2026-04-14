import { Logo } from '@/components/ui/Logo'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-surface/30 pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="md:col-span-2 space-y-6">
            <Logo hideTagline={true} />
            <p className="font-mono text-sm text-white max-w-sm leading-relaxed">
              Founded to eliminate the busywork between shipping code and informing users. We build high-velocity developer tools designed for maximum efficiency.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[12px] font-mono text-white">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span>OAuth Secured</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] font-mono text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 col-span-1 md:col-span-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <h4 className="font-mono text-[12px] uppercase tracking-widest text-text-primary">Product</h4>
              <ul className="space-y-3">
                <li><Link href="#demo" className="font-mono text-sm text-white hover:text-accent transition-colors">Interactive Demo</Link></li>
                <li><Link href="#pricing" className="font-mono text-sm text-white hover:text-accent transition-colors">Pricing Options</Link></li>
                <li><Link href="/login" className="font-mono text-sm text-white hover:text-accent transition-colors">Early Access</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono text-[12px] uppercase tracking-widest text-text-primary">Legal & Identity</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="font-mono text-sm text-white hover:text-accent transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="font-mono text-sm text-white hover:text-accent transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="font-mono text-sm text-white hover:text-accent transition-colors">Sitemap</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-white/60">
            © {new Date().getFullYear()} Changelog.ai — Designed for velocity.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] text-white/50 italic">All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
