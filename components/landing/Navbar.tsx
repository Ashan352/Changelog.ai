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
      { label: "Blog", href: "/blog", icon: BookOpen, description: "Tips and updates from the team." },
      { label: "Docs", href: "/docs", icon: Terminal, description: "Integration guides and API reference." },
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
      setScrolled(window.scrollY > 50)

      // Intersection Observer logic for scroll spy
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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 sm:px-6 py-4 md:flex justify-center pointer-events-none ${
        scrolled ? "md:py-3" : "md:py-6"
      }`}
    >
      <div className="max-w-7xl w-full flex items-center justify-between pointer-events-auto relative">
        <Logo />

        <nav className={`absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${
          scrolled 
            ? "border-border bg-bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
            : "border-transparent bg-transparent"
        }`}>
          {navItems.map((item) => (
            <div 
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.items ? (
                <button className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all duration-300 ${
                  activeDropdown === item.label ? "text-accent" : "text-text-secondary hover:text-text-primary"
                }`}>
                  {item.label}
                  <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link 
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all duration-300 relative group ${
                    activeSection === item.href ? "text-accent" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <motion.span 
                      layoutId="activeNav"
                      className="absolute inset-0 bg-accent/5 rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )}

              <AnimatePresence>
                {item.items && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 bg-bg-surface border border-border rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden"
                  >
                    <div className="grid gap-1">
                      {item.items.map((subItem) => (
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
                    <div className="mt-2 p-3 bg-bg-elevated/50 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] font-mono text-text-muted uppercase">New Updates</span>
                      <Zap className="h-3 w-3 text-accent animate-pulse" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto md:ml-0">
          {!session ? (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="hidden sm:flex items-center justify-center px-4 py-2 rounded-full text-text-secondary font-mono text-[11px] uppercase tracking-widest hover:text-text-primary transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/login?signup=true" 
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-bg font-mono font-bold text-[11px] uppercase tracking-widest hover:bg-accent/90 transition-all hover:scale-[1.05] shadow-[0_0_24px_rgba(232,255,71,0.2)]"
              >
                Sign up
                <ArrowRight className="h-3 w-3 shrink-0" />
              </Link>
            </div>
          ) : (
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-border bg-bg-surface text-text-primary font-mono font-bold text-[11px] uppercase tracking-widest hover:bg-bg-hover transition-all"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
