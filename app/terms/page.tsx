import React from "react"
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
        <div className="flex flex-col items-center text-center mb-24 w-full">
          <h1 className="text-5xl md:text-7xl font-serif italic text-text-primary mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="font-mono text-sm text-text-muted uppercase tracking-[0.2em] text-center w-full">
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

            <section id="acceptance" className="scroll-mt-32 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">1. Acceptance of Terms</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  By accessing or using our Services, you're agreeing to be bound by these Terms and our Privacy Policy. If you're using our Services for an organization, you're agreeing to these Terms on behalf of that organization.
                </p>
              </div>
            </section>

            <section id="description" className="scroll-mt-32 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">2. Description of Service</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Changelog.ai provides an automated changelog and release notes generator using AI. We parse git commit data and transform it into formatted documentation endpoints.
                </p>
              </div>
            </section>

            <section id="accounts" className="scroll-mt-32 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">3. User Accounts</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  You must be 18 years or older to use this Service. You are responsible for safeguarding your account access and OAuth tokens. We cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
                </p>
              </div>
            </section>

            <section id="billing" className="scroll-mt-32 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">4. Subscription and Billing</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We offer various subscription tiers. You'll be billed in advance on a recurring and periodic basis. At the end of each period, your subscription will automatically renew under the exact same conditions unless you cancel it. All payments are non-refundable unless required by law.
                </p>
              </div>
            </section>
            
            <section id="ip" className="scroll-mt-32 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">5. Intellectual Property Rights</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  You retain all rights to your code and commit data. Changelog.ai does not claim ownership of any content you transmit to the Service. The outputs (changelogs) generated are owned by you. However, the Service itself, including algorithms, UI, and branding, are the exclusive property of Changelog AI Inc.
                </p>
              </div>
            </section>

            <section id="prohibited" className="scroll-mt-32 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">6. Prohibited Conduct</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  You agree not to use the Service to generate false or misleading documentation intentionally, attempt to bypass our usage rate limits, reverse engineer the AI generation pipelines, or use the platform for any illegal activities.
                </p>
              </div>
            </section>

            <section id="termination" className="scroll-mt-32 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">7. Termination</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
              </div>
            </section>

            <section id="liability" className="scroll-mt-32 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">8. Limitation of Liability</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  In no event shall Changelog AI Inc, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </div>
            </section>

            <section id="law" className="scroll-mt-32 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">9. Governing Law</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  These Terms shall be governed and construed in accordance with the laws of Delaware, United States, without regard to its conflict of law provisions.
                </p>
              </div>
            </section>

            <section id="changes" className="scroll-mt-32 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">10. Changes to Terms</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </div>
            </section>

            <section id="contact" className="scroll-mt-32 space-y-4">
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
