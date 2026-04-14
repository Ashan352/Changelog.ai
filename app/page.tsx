import { Logo } from "@/components/ui/Logo"
import { auth } from "@/lib/auth"
import { Hero } from "@/components/landing/Hero"
import { Navbar } from "@/components/landing/Navbar"
import dynamic from "next/dynamic"

// Lazy Load Heavy Sections
const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks").then(m => m.HowItWorks), { ssr: true })
const ProductShowcase = dynamic(() => import("@/components/landing/ProductShowcase").then(m => m.ProductShowcase), { ssr: false })
const GallerySection = dynamic(() => import("@/components/landing/GallerySection").then(m => m.GallerySection), { ssr: false })
const Stats = dynamic(() => import("@/components/landing/Stats").then(m => m.Stats), { ssr: false })
const Pricing = dynamic(() => import("@/components/landing/Pricing").then(m => m.Pricing), { ssr: false })
const FAQ = dynamic(() => import("@/components/landing/FAQ").then(m => m.FAQ), { ssr: false })
const Footer = dynamic(() => import("@/components/landing/Footer").then(m => m.Footer), { ssr: true })
const LogoLoop = dynamic(() => import("@/components/ui/LogoLoop").then(m => m.LogoLoop), { ssr: false })
const StaggeredMenu = dynamic(() => import("@/components/ui/StaggeredMenu").then(m => m.StaggeredMenu), { ssr: false })

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
        <div id="faq"><FAQ /></div>
      </main>

      <Footer />
    </div>
  )
}
