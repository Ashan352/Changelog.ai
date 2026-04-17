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

import { Shield, Clock, BarChart3, Sparkles } from 'lucide-react'

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
        
        <section className="py-24 px-4 sm:px-6 bg-bg-surface/10 border-t border-border">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-5xl font-serif italic text-text-primary mb-6">Build fast. Update faster.</h2>
              <p className="font-mono text-sm sm:text-lg text-text-secondary leading-relaxed">
                Writing updates takes time. Developers want to build. 
                Our AI reads your code history. It writes notes that people like. 
                No hard words. Just clear and simple updates for all users.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-bg-surface/30 border border-border/50 hover:bg-bg-surface/50 hover:border-accent/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-text-primary font-mono uppercase tracking-wider mb-4">Help Users Trust You</h3>
                <p className="text-text-muted leading-relaxed font-mono text-sm">
                  Users want to see you work. New updates show your site is active. 
                  When you ship a feature, say it. Our tool makes this easy. 
                  Clear notes build trust. This helps you get more users.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-bg-surface/30 border border-border/50 hover:border-accent/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-text-primary font-mono uppercase tracking-wider mb-4">Save Your Team Time</h3>
                <p className="text-text-muted leading-relaxed font-mono text-sm">
                  Teams should code more. Writing notes is a distraction. 
                  The AI does the hard work. It formats notes for Twitter. 
                  It works for GitHub too. This saves you hours every month.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-bg-surface/30 border border-border/50 hover:bg-bg-surface/50 hover:border-accent/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-text-primary font-mono uppercase tracking-wider mb-4">Grow Your Site</h3>
                <p className="text-text-muted leading-relaxed font-mono text-sm">
                  Good content helps search sites. Easy notes help AI models too. 
                  This leads to more people finding you. Growth becomes easier. 
                  Better reach means a bigger business for you.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-bg-surface/30 border border-border/50 hover:bg-bg-surface/50 hover:border-accent/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-text-primary font-mono uppercase tracking-wider mb-4">Stay Professional</h3>
                <p className="text-text-muted leading-relaxed font-mono text-sm">
                  Quality matters for your brand. Every update should look good. 
                  Our generator keeps your style the same. No more typos. 
                  No more messy lists. Just perfect notes every time.
                </p>
              </div>
            </div>

            {/* Comparison Section for Word Count */}
            <div className="pt-24 border-t border-border/50">
              <h3 className="text-2xl font-serif italic text-text-primary mb-8 text-center">Why use AI for your changelogs?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                <div className="p-8 rounded-2xl bg-bg-surface/40 border border-border flex flex-col items-center text-center">
                  <h4 className="font-bold mb-4 uppercase tracking-widest text-text-secondary">Manual Writing (The Old Way)</h4>
                  <ul className="space-y-3 list-none p-0 text-text-muted">
                    <li>Takes 15-30 minutes per update</li>
                    <li>Hard to remember all changes</li>
                    <li>Often full of typos and errors</li>
                    <li>Different styles every time</li>
                    <li>Feels like a chore coworkers hate</li>
                  </ul>
                </div>
                <div className="p-8 rounded-2xl bg-accent/5 border border-accent/20 flex flex-col items-center text-center">
                  <h4 className="font-bold mb-4 uppercase tracking-widest text-accent">Changelog AI (The New Way)</h4>
                  <ul className="space-y-3 list-none p-0 text-text-secondary">
                    <li>Takes less than 10 seconds</li>
                    <li>Reads every commit correctly</li>
                    <li>Perfect grammar and style</li>
                    <li>Follows your brand theme</li>
                    <li>Fun and simple to use</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-12 text-center flex flex-col items-center">
              <p className="text-text-muted italic font-mono text-xs max-w-2xl mx-auto">
                Changelog AI is the standard tool for modern teams. 
                Focus on the logic. We handle the story. 
                Start your free trial today and ship better code.
              </p>
            </div>
          </div>
        </section>

        <div id="pricing"><Pricing /></div>
        <div id="faq"><FAQ /></div>
      </main>

      <Footer />
    </div>
  )
}
