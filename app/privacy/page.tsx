import { auth } from "@/lib/auth"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { Logo } from "@/components/ui/Logo"
import { StaggeredMenu } from "@/components/ui/StaggeredMenu"
import Link from "next/link"
import { ArrowUp } from "lucide-react"

export default async function PrivacyPage() {
  let session = null
  try {
    session = await auth()
  } catch {}

  const tocItems = [
    { title: "What Personal Information we collect", id: "collect" },
    { title: "What we do with the Personal Information we collect", id: "usage" },
    { title: "When we Disclose Personal Information", id: "disclose" },
    { title: "How we use cookies and collect information using technology", id: "cookies" },
    { title: "Security", id: "security" },
    { title: "We may Transfer Personal Information to Other Countries", id: "transfer" },
    { title: "Links to other websites", id: "links" },
    { title: "Your Choices", id: "choices" },
    { title: "Accessing and Correcting your Personal Information", id: "access" },
    { title: "Children", id: "children" },
    { title: "Contact Us", id: "contact" },
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
        {/* Header Section */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-serif italic text-text-primary mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="font-mono text-sm text-text-muted uppercase tracking-[0.2em]">
            Last Updated October 14th, 2024
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-16">
            <section>
              <p className="text-xl md:text-2xl font-mono text-text-primary leading-relaxed mb-12">
                This Privacy Policy will help you better understand how we collect, use, and share your personal information.
              </p>
              
              <div className="space-y-8 text-text-secondary leading-loose">
                <h2 className="text-2xl font-mono font-bold text-text-primary underline decoration-accent/50 underline-offset-8">General Terms</h2>
                <p>
                  This privacy policy sets out how Changelog AI Inc. (“Changelog AI”, “we”, “us”, or “our”) collects, uses, and discloses any personal information that you give us or that we collect when you use our website or Services.
                </p>
                <p>
                  By using our website or Services, or by choosing to give us personal information, you consent to this Privacy Policy and the processing of your Personal Information it describes. If you do not agree with any terms of this Privacy Policy, please exercise the choices we describe in this Policy, or do not use the Services and do not give us any personal information.
                </p>
              </div>
            </section>

            <section id="collect" className="scroll-mt-24 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">1. What Personal Information we collect</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  To register for our Services, you provide your GitHub account details. If you make a purchase, we collect information about your transaction, such as public wallet address, date and time, value, and transaction history.
                </p>
                <p>
                  We may also collect technical data such as IP address, browser type, and operating system collected via cookies and tracking pixels.
                </p>
              </div>
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">2. What we do with the Personal Information we collect</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We use your information to provide the AI-powered changelog generation service, process transitions, and communicate with you about your account.
                </p>
                <p>
                  Importantly, your git commit logs are used solely for the immediate task of generating your release notes and are not used to train our underlying AI models.
                </p>
              </div>
            </section>

             <section id="cookies" className="scroll-mt-24 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">4. Cookies and Technology</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We use essential cookies for session management and authentication. We also use analytics cookies to understand how users interact with our platform to improve the user experience.
                </p>
              </div>
            </section>

            <section id="security" className="scroll-mt-24 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">5. Security</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We implement industry-standard security measures to protect your data. All communication is encrypted via TLS/SSL, and sensitive data is stored using secure hashing algorithms.
                </p>
              </div>
            </section>

            <section id="contact" className="scroll-mt-24 space-y-4">
              <h3 className="text-xl font-mono font-bold text-accent">11. Contact Us</h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  If you have questions about this privacy policy, please contact us at support@changelog.ai.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar / TOC Column */}
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
                      <a href={`#${item.id}`} className="hover:text-accent transition-colors hover:translate-x-1 decoration-accent/30 decoration-dashed">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 pt-8 border-t border-border/50">
                <Link 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 text-xs font-mono text-text-muted hover:text-accent transition-all group"
                >
                  <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform text-accent" />
                  Back to top
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
