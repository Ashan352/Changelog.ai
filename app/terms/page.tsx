import { auth } from "@/lib/auth"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { Logo } from "@/components/ui/Logo"
import { StaggeredMenu } from "@/components/ui/StaggeredMenu"
import Link from "next/link"
import { ArrowUp } from "lucide-react"

export default async function TermsPage() {
  let session = null
  try {
    session = await auth()
  } catch {}

  const tocItems = [
    { title: "Acceptance of Terms", id: "acceptance" },
    { title: "Description of Service", id: "description" },
    { title: "User Accounts", id: "accounts" },
    { title: "Subscription and Billing", id: "billing" },
    { title: "Intellectual Property Rights", id: "ip" },
    { title: "Prohibited Conduct", id: "prohibited" },
    { title: "Termination", id: "termination" },
    { title: "Limitation of Liability", id: "liability" },
    { title: "Governing Law", id: "law" },
    { title: "Changes to Terms", id: "changes" },
    { title: "Contact Information", id: "contact" },
  ]

  return (
    <div className="bg-bg min-h-screen selection:bg-accent/30 font-sans">
      {/* Desktop/Mobile Navbar */}
      <div className="hidden md:block">
        <Navbar session={session} />
      </div>

      <div className="md:hidden">
        <StaggeredMenu 
          isFixed={true}
          logo={<Logo hideTagline={true} className="text-white" />}
          items={[
            { label: 'Process', link: '/#how-it-works' },
            { label: 'Demo', link: '/#demo' },
            { label: 'Pricing', link: '/#pricing' },
            ...(session ? [
              { label: 'Dashboard', link: '/dashboard' }
            ] : [
              { label: 'Login', link: '/login' },
            ])
          ]}
          socialItems={[
            { label: 'Twitter', link: 'https://twitter.com' },
            { label: 'GitHub', link: 'https://github.com' },
          ]}
        />
      </div>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-serif italic text-text-primary mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="font-mono text-sm text-text-muted uppercase tracking-[0.2em]">
            Last Updated October 14th, 2024
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <section>
              <p className="text-xl md:text-2xl font-mono text-text-primary leading-relaxed mb-12">
                By using Changelog AI, you agree to these legal terms. Please read them carefully.
              </p>
              
              <div className="space-y-8 text-text-secondary leading-loose">
                <h2 className="text-2xl font-mono font-bold text-text-primary underline decoration-accent/50 underline-offset-8">Agreement</h2>
                <p>
                  These Terms of Service cover your use of and access to the services, client software and websites ("Services") provided by Changelog AI Inc. Our Privacy Policy explains how we collect and use your information.
                </p>
              </div>
            </section>

            <section id="acceptance" className="scroll-mt-24 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">1. Acceptance of Terms</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  By accessing or using our Services, you're agreeing to be bound by these Terms and our Privacy Policy. If you're using our Services for an organization, you're agreeing to these Terms on behalf of that organization.
                </p>
              </div>
            </section>

            <section id="billing" className="scroll-mt-24 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">4. Subscription and Billing</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We offer various subscription tiers. You'll be billed in advance on a recurring and periodic basis. At the end of each period, your subscription will automatically renew under the exact same conditions unless you cancel it.
                </p>
              </div>
            </section>

            <section id="contact" className="scroll-mt-24 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">11. Contact Information</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Questions about the Terms of Service should be sent to us at legal@changelog.ai.
                </p>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="border border-border rounded-2xl p-8 bg-bg-surface/30 backdrop-blur-sm">
              <h4 className="text-sm font-mono font-bold text-text-primary uppercase tracking-widest mb-6 border-b border-border pb-4">
                Table of contents
              </h4>
              <nav>
                <ul className="space-y-5">
                  {tocItems.map((item, index) => (
                    <li key={index} className="flex gap-3 text-sm leading-tight text-text-muted hover:text-accent transition-all group">
                      <span className="font-mono text-[11px] opacity-40 shrink-0">{String(index + 1).padStart(2, '0')}.</span>
                      <a href={`#${item.id}`} className="hover:text-accent transition-colors hover:translate-x-1">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 pt-8 border-t border-border/50">
                <a 
                  href="#"
                  className="flex items-center gap-2 text-xs font-mono text-text-muted hover:text-accent transition-all group w-full"
                >
                  <ArrowUp className="h-3.5 w-3.5 text-accent" />
                  Back to top
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
