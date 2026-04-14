import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, ArrowRight, TableOfContents } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Changelog.ai',
  description: 'How we handle your personal data, developer information, and proprietary code.',
}

export default function PrivacyPolicy() {
  const sections = [
    { id: 'data-collection', title: '1. Information We Collect' },
    { id: 'usage', title: '2. How We Use Data' },
    { id: 'processing', title: '3. Processing & AI' },
    { id: 'storage', title: '4. Security & Storage' },
    { id: 'rights', title: '5. Your Legal Rights' },
    { id: 'contact', title: '6. Support & Contact' },
  ]

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 selection:text-text-primary">
      {/* Header / Breadcrumb Area */}
      <div className="fixed top-0 inset-x-0 h-32 bg-bg/80 backdrop-blur-md z-40 border-b border-border/50 flex items-end pb-6 px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors font-mono text-[10px] uppercase tracking-widest group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="hidden md:flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted/60">
            <span>Home</span>
            <div className="h-px w-4 bg-border" />
            <span className="text-accent">Legal & Privacy</span>
          </div>
        </div>
      </div>

      <main className="pt-48 pb-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative">
        {/* Left Sidebar Table of Contents */}
        <aside className="lg:w-72 lg:shrink-0 hidden lg:block">
          <div className="sticky top-48">
            <div className="flex items-center gap-2 mb-8 px-4">
              <TableOfContents className="h-4 w-4 text-accent" />
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary font-bold">Contents</h3>
            </div>
            <nav className="space-y-1">
              {sections.map(section => (
                <Link 
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-4 py-2.5 rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-surface border border-transparent hover:border-border transition-all font-mono text-xs group flex items-center justify-between"
                >
                  {section.title}
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                </Link>
              ))}
            </nav>

            {/* Quick Stats / Info Widget */}
            <div className="mt-12 p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
               <div className="flex items-center gap-2 text-accent">
                 <Shield className="h-4 w-4" />
                 <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Privacy First</span>
               </div>
               <p className="text-[11px] font-mono text-text-muted leading-relaxed">
                 We do not train our public models on your proprietary code inputs. Your data belongs to you.
               </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <article className="flex-1 max-w-2xl">
          <div className="mb-16">
            <h1 className="text-5xl sm:text-7xl font-serif italic text-text-primary mb-8 leading-[1.1]">Privacy Policy</h1>
            <div className="flex flex-wrap items-center gap-4 text-text-muted font-mono text-xs">
              <div className="px-3 py-1 rounded-full border border-border bg-bg-surface">Last Modified: April 15, 2026</div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>Regulatory Compliant</span>
              </div>
            </div>
          </div>

          <p className="text-xl font-mono text-text-secondary leading-relaxed mb-20 first-letter:text-5xl first-letter:font-serif first-letter:italic first-letter:float-left first-letter:mr-3 first-letter:text-accent">
            At Changelog.ai, we value your privacy as much as your code quality. This policy describes our commitment to transparency and our methods for protecting the data you entrust to our automated documentation pipeline.
          </p>
          
          <div className="space-y-24">
            <section id="data-collection" className="scroll-mt-48 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-border group-hover:bg-accent/30 transition-colors" />
                <h2 className="text-3xl font-serif italic text-text-primary whitespace-nowrap">1. Information We Collect</h2>
              </div>
              <div className="space-y-6 text-text-secondary">
                <p className="leading-relaxed">
                  To provide a high-velocity documentation experience, we collect specific data points during your session:
                </p>
                <div className="grid gap-4">
                  {[
                    { icon: Lock, title: 'Account Metadata', desc: 'Secure OAuth tokens, GitHub email, and profile handle.' },
                    { icon: Eye, title: 'Session Analytics', desc: 'Usage patterns, feature adoption, and performance logs.' },
                    { icon: Shield, title: 'Input Data', desc: 'Commit messages and code diffs provided for analysis.' },
                  ].map((item, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-bg-surface border border-border hover:border-accent/40 transition-all flex items-start gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-bg border border-border flex items-center justify-center text-accent">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-mono text-xs text-text-primary font-bold mb-1 uppercase tracking-widest">{item.title}</h4>
                        <p className="text-sm font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="usage" className="scroll-mt-48 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-border group-hover:bg-accent/30 transition-colors" />
                <h2 className="text-3xl font-serif italic text-text-primary whitespace-nowrap">2. How We Use Data</h2>
              </div>
              <div className="space-y-6 text-text-secondary font-mono text-sm leading-relaxed">
                <p>We leverage your data strictly to refine the delivery of our services:</p>
                <ul className="space-y-4 list-none p-0">
                  <li className="flex gap-4">
                    <span className="text-accent underline">01</span>
                    <span>To generate accurate, context-aware release notes using our ML pipeline.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-accent underline">02</span>
                    <span>To facilitate direct publishing to GitHub and external distribution channels.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-accent underline">03</span>
                    <span>To prevent fraudulent activity and optimize our global infrastructure.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="processing" className="scroll-mt-48 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-border group-hover:bg-accent/30 transition-colors" />
                <h2 className="text-3xl font-serif italic text-text-primary whitespace-nowrap">3. Processing & AI</h2>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-accent/5 border border-accent/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Zap className="h-32 w-32 text-accent" />
                </div>
                <p className="text-text-primary font-mono text-sm leading-relaxed relative z-10">
                  Data processing is performed by proprietary models and vetted AI partners. By using the platform, you acknowledge that your inputs are temporarily processed via encrypted external APIs. <br /><br />
                  <strong className="text-accent uppercase tracking-widest text-[10px]">Critical Guarantee:</strong> We do not allow third-party providers to use your data for training public foundation models.
                </p>
              </div>
            </section>

            <section id="storage" className="scroll-mt-48 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-border group-hover:bg-accent/30 transition-colors" />
                <h2 className="text-3xl font-serif italic text-text-primary whitespace-nowrap">4. Security</h2>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6 font-mono text-sm">
                Security is our default configuration. We utilize enterprise-grade encryption for all data at rest and in transit. Proprietary code diffs are ephemeral and purged immediately after session completion unless historical tracking is explicitly enabled in your settings.
              </p>
            </section>

            <section id="rights" className="scroll-mt-48 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-border group-hover:bg-accent/30 transition-colors" />
                <h2 className="text-3xl font-serif italic text-text-primary whitespace-nowrap">5. Your Rights</h2>
              </div>
              <p className="text-text-secondary leading-relaxed font-mono text-sm">
                Under modern privacy frameworks (GDPR, CCPA), you retain full sovereignty over your data. You may request full account extraction, modification, or permanent erasure via our dashboard. Revocation of GitHub permissions can be managed directly through your GitHub settings profile.
              </p>
            </section>

            <section id="contact" className="scroll-mt-48 pt-16 border-t border-border group text-center">
              <div className="max-w-md mx-auto space-y-6">
                <h2 className="text-3xl font-serif italic text-text-primary">Questions?</h2>
                <p className="text-sm font-mono text-text-muted">
                  If you need clarification on our data handling or specific compliance certifications, please reach out to our legal team.
                </p>
                <Link 
                  href="mailto:privacy@changelog.ai" 
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-bg border border-border text-text-primary font-mono text-xs font-bold hover:bg-bg-surface hover:border-accent transition-all active:scale-95"
                >
                  Contact Privacy Team
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>

      {/* Decorative Ornaments */}
      <div className="fixed -bottom-12 -right-12 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed -top-12 -left-12 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none -z-10" />
    </div>
  )
}

function Zap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.71 12 2l1.6 6.4L20 9.29 12 22l-1.6-6.4L4 14.71z" />
    </svg>
  )
}

