'use client'
import { Logo } from "@/components/ui/Logo"
import { Hero } from "@/components/landing/Hero"
import { Navbar } from "@/components/landing/Navbar"
import dynamic from "next/dynamic"

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiGithub,
  SiStripe,
  SiSupabase,
  SiPostgresql,
  SiVercel,
  SiPrisma,
  SiFramer
} from "react-icons/si"

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

export function LandingContent({ session }: { session: any }) {
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
            { label: 'Docs', link: '/docs' },
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
            { label: 'GitHub', link: 'https://github.com/itxashancode' },
          ]}
        />
      </div>

      <main>
        <Hero isLoggedIn={!!session} />
        
        <section className="border-y border-border bg-bg-surface/30 py-4 flex items-center overflow-hidden">
          <LogoLoop 
            fadeOut={true}
            scaleOnHover={true}
            speed={100}
            gap={60}
            logoHeight={32}
            logos={[
              { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev", ariaLabel: "React" },
              { node: <SiNextdotjs className="text-text-primary" />, title: "Next.js", href: "https://nextjs.org", ariaLabel: "Next.js" },
              { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org", ariaLabel: "TypeScript" },
              { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com", ariaLabel: "Tailwind CSS" },
              { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev", ariaLabel: "React" },
              { node: <SiNextdotjs className="text-text-primary" />, title: "Next.js", href: "https://nextjs.org", ariaLabel: "Next.js" },
              { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org", ariaLabel: "TypeScript" },
              { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com", ariaLabel: "Tailwind CSS" },
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
