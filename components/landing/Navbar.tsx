'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/ui/Logo"
import { ArrowRight, ChevronDown, BookOpen, Terminal, Shield, Zap } from "lucide-react"

interface NavItem {
  label: string
  href: string
  items?: { label: string; href: string; icon: any; description: string }[]
}

const navItems: NavItem[] = [
  { label: "Process", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { 
    label: "Resources", 
    href: "#", 
    items: [
      { label: "Docs", href: "/docs", icon: Terminal, description: "Integration guides and API reference." },
      { label: "FAQ", href: "#faq", icon: BookOpen, description: "Common questions answered." },
      { label: "Privacy", href: "/privacy", icon: Shield, description: "How we handle your data." },
    ]
  },
  { label: "Pricing", href: "#pricing" },
]

export function Navbar({ session }: { session: any }) {
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navItems
        .filter(item => item.href.startsWith("#"))
        .map(item => item.href.substring(1))

      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId)
        if (element && element.getBoundingClientRect().top < 200) {
          setActiveSection(`#${sectionId}`)
          break
        }
      }
    }

    const handleResize = () => {
      if (window.innerWidth < 768) setActiveDropdown(null)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-[100] bg-transparent border-b border-transparent py-5"
      role="banner"
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Logo hideTagline={true} />
        </div>

        {/* Center: Navigation */}
        <nav 
          className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-bg-surface/40 rounded-full border border-border/40 p-1"
          aria-label="Main navigation"
        >
          {navItems.map((item: any) => (
            <div 
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
              onFocus={() => setActiveDropdown(item.label)}
              onBlur={() => setActiveDropdown(null)}
            >
              {item.items ? (
                <div className="relative">
                  <button 
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                    className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all ${
                    activeDropdown === item.label ? "text-accent" : "text-text-secondary hover:text-text-primary"
                  }`}>
                    {item.label}
                    <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 p-2 bg-bg-surface border border-border rounded-2xl shadow-2xl backdrop-blur-xl"
                      >
                        <div className="grid gap-1">
                          {item.items.map((subItem: any) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-bg-hover transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center border border-border group-hover:border-accent/30 transition-colors">
                                <subItem.icon className="h-4 w-4 text-text-muted group-hover:text-accent transition-colors" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-mono font-bold text-text-primary">{subItem.label}</span>
                                <span className="text-[10px] text-text-muted leading-tight mt-0.5">{subItem.description}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link 
                  href={item.href}
                  className={`px-5 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all relative block ${
                    activeSection === item.href ? "bg-bg-elevated text-accent" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4">
          {!session ? (
            <div className="flex items-center gap-6">
              <Link 
                href="/login" 
                className="hidden sm:block font-mono text-[11px] uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/login?signup=true" 
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-text-primary font-mono font-bold text-[11px] uppercase tracking-widest hover:bg-accent/90 transition-all hover:scale-[1.05] shadow-[0_8px_24px_rgba(155,177,94,0.3)]"
              >
                Sign up
                <ArrowRight className="h-3 w-3 shrink-0" />
              </Link>
            </div>
          ) : (
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-bg-surface text-text-primary font-mono font-bold text-[11px] uppercase tracking-widest hover:bg-bg-hover transition-all"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
