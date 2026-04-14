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
import { Navbar } from "@/components/landing/Navbar"
import { ResourceSection } from "@/components/landing/ResourceSection"
import {
  SiNextdotjs,
  SiReact,
  SiGithub,
  SiStripe,
  SiSupabase,
  SiPostgresql,
  SiVercel,
  SiPrisma,
  SiFramer
} from "react-icons/si"

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
      {/* Desktop/Mobile Navbar */}
      <div className="hidden md:block">
        <Navbar session={session} />
      </div>

      <div className="md:hidden">
        <StaggeredMenu 
          isFixed={true}
          logo={<Logo hideTagline={true} className="text-text-primary" />}
          items={[
            { label: 'Process', link: '#how-it-works' },
            { label: 'Demo', link: '#demo' },
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

      <main>
        <Hero isLoggedIn={!!session} />
        
        <section className="border-y border-border bg-bg-surface/30 py-3 flex items-center h-14">
          <LogoLoop 
            fadeOut={true}
            scaleOnHover={true}
            speed={40}
            gap={64}
            logoHeight={24}
            logos={[
              { node: <SiNextdotjs className="text-text-primary" />, ariaLabel: "Next.js" },
              { node: <SiReact className="text-[#61DAFB]" />, ariaLabel: "React" },
              { node: <SiGithub className="text-text-primary" />, ariaLabel: "GitHub" },
              { node: <SiStripe className="text-[#008CDD]" />, ariaLabel: "Stripe" },
              { node: <SiSupabase className="text-[#3ECF8E]" />, ariaLabel: "Supabase" },
              { node: <SiPostgresql className="text-[#4169E1]" />, ariaLabel: "PostgreSQL" },
              { node: <SiVercel className="text-text-primary" />, ariaLabel: "Vercel" },
              { node: <SiPrisma className="text-text-primary" />, ariaLabel: "Prisma" },
              { node: <SiFramer className="text-text-primary" />, ariaLabel: "Framer" },
              { node: <SiNextdotjs className="text-text-primary" />, ariaLabel: "Next.js" },
              { node: <SiReact className="text-[#61DAFB]" />, ariaLabel: "React" },
              { node: <SiGithub className="text-text-primary" />, ariaLabel: "GitHub" },
              { node: <SiStripe className="text-[#008CDD]" />, ariaLabel: "Stripe" },
              { node: <SiSupabase className="text-[#3ECF8E]" />, ariaLabel: "Supabase" },
              { node: <SiPostgresql className="text-[#4169E1]" />, ariaLabel: "PostgreSQL" },
              { node: <SiVercel className="text-text-primary" />, ariaLabel: "Vercel" },
              { node: <SiPrisma className="text-text-primary" />, ariaLabel: "Prisma" },
              { node: <SiFramer className="text-text-primary" />, ariaLabel: "Framer" },
            ]} 
          />
        </section>

        <div id="how-it-works"><HowItWorks /></div>
        <div id="demo"><ProductShowcase /></div>

        <GallerySection />

        <div id="stats"><Stats /></div>
        <div id="pricing"><Pricing /></div>
        <div id="resources"><ResourceSection /></div>
        <div id="faq"><FAQ /></div>
      </main>

      <Footer />
    </div>
  )
}
