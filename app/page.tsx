import { Logo } from "@/components/ui/Logo"
import { auth } from "@/lib/auth"
import { Hero } from "@/components/landing/Hero"
import { ProductShowcase } from "@/components/landing/ProductShowcase"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Stats } from "@/components/landing/Stats"
import { Pricing } from "@/components/landing/Pricing"
import { FAQ } from "@/components/landing/FAQ"
import { Footer } from "@/components/landing/Footer"
import { LogoLoop } from "@/components/ui/LogoLoop"
import { GitBranch, ArrowRight } from "lucide-react"
import Link from "next/link"

import { StaggeredMenu } from "@/components/ui/StaggeredMenu"
import { GallerySection } from "@/components/landing/GallerySection"

export default async function LandingPage() {
  // Graceful fallback: old JWT cookies from previous auth strategy (database)
  // will throw JWEInvalid / JWTSessionError. On a public landing page,
  // a stale/invalid session is OK — treat the user as logged-out.
  let session = null
  try {
    session = await auth()
  } catch {
    // Stale cookie — will be overwritten on next successful login.
  }

  return (
    <div className="bg-bg min-h-screen selection:bg-accent/30">
      {/* Mobile Staggered Menu */}
      <div className="md:hidden">
        <StaggeredMenu 
          isFixed={true}
          logo={<Logo hideTagline={true} className="text-white" />}
          items={[
            { label: 'Demo', link: '#demo' },
            { label: 'Process', link: '#how-it-works' },
            { label: 'Impact', link: '#stats' },
            { label: 'Pricing', link: '#pricing' },
            { label: 'FAQ', link: '#faq' },
            ...(session ? [
              { label: 'Dashboard', link: '/dashboard' }
            ] : [
              { label: 'Login', link: '/login' },
              { label: 'Sign Up', link: '/login?signup=true' }
            ])
          ]}
          socialItems={[
            { label: 'Twitter', link: 'https://twitter.com' },
            { label: 'GitHub', link: 'https://github.com' },
          ]}
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-[100] p-4 sm:p-6 hidden md:flex justify-center pointer-events-none">
          <div className="max-w-7xl w-full flex items-center justify-between pointer-events-auto relative">
            
            <Logo />
            
            <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 px-6 py-2 rounded-full border border-border bg-bg-surface/50 backdrop-blur-md">
               <Link href="#demo" className="text-[11px] font-mono text-text-secondary hover:text-accent transition-colors uppercase tracking-widest">Demo</Link>
               <Link href="#how-it-works" className="text-[11px] font-mono text-text-secondary hover:text-accent transition-colors uppercase tracking-widest">Process</Link>
               <Link href="#pricing" className="text-[11px] font-mono text-text-secondary hover:text-accent transition-colors uppercase tracking-widest">Pricing</Link>
            </nav>

            <div className="flex items-center gap-4 ml-auto md:ml-0">
               {!session && (
                  <div className="flex items-center gap-3">
                    <Link 
                      href="/login" 
                      className="hidden sm:flex items-center justify-center px-4 py-2.5 rounded-full text-text-secondary font-mono text-xs hover:text-text-primary transition-colors"
                    >
                      Login
                    </Link>
                    <Link 
                      href="/login?signup=true" 
                      className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-bg font-mono font-bold text-xs hover:bg-accent/90 transition-all hover:scale-[1.02] shadow-[0_0_24px_rgba(232,255,71,0.2)]"
                    >
                      Sign up
                      <ArrowRight className="h-3 w-3 shrink-0" />
                    </Link>
                  </div>
               )}
            </div>
         </div>
      </header>

      <main>
        <Hero isLoggedIn={!!session} />
        
        {/* Integrating official LogoLoop for ecosystem proof */}
        <section className="border-y border-border bg-bg-surface/30">
          <LogoLoop 
            fadeOut={true}
            scaleOnHover={true}
            speed={60}
            logos={[
              { node: <span className="font-serif italic text-xl px-4">GitHub</span> },
              { node: <span className="font-serif italic text-xl px-4">Vercel</span> },
              { node: <span className="font-serif italic text-xl px-4">Stripe</span> },
              { node: <span className="font-serif italic text-xl px-4">Slack</span> },
              { node: <span className="font-serif italic text-xl px-4">Discord</span> },
              { node: <span className="font-serif italic text-xl px-4">Prisma</span> },
              { node: <span className="font-serif italic text-xl px-4">Supabase</span> },
            ]} 
          />
        </section>

        <div id="how-it-works"><HowItWorks /></div>
        <div id="demo"><ProductShowcase /></div>

        <GallerySection />

        <div id="stats"><Stats /></div>
        <div id="pricing"><Pricing /></div>
        <div id="faq"><FAQ /></div>
      </main>

      <Footer />
    </div>
  )
}
