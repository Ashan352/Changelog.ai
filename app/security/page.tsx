import { auth } from "@/lib/auth"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { Logo } from "@/components/ui/Logo"
import { StaggeredMenu } from "@/components/ui/StaggeredMenu"
import Link from "next/link"
import { ArrowUp, ShieldCheck, Lock, Globe, Server } from "lucide-react"

export default async function SecurityPage() {
  let session = null
  try {
    session = await auth()
  } catch {}

  const securityFeatures = [
    { 
      title: "Data Encryption", 
      icon: <Lock className="h-5 w-5" />, 
      content: "All data sent to or from Changelog AI is encrypted in transit using 256-bit encryption. Our API and application endpoints are TLS/SSL only and score an 'A+' rating on SSLLabs tests." 
    },
    { 
      title: "Data Privacy", 
      icon: <ShieldCheck className="h-5 w-5" />, 
      content: "We do not store your git commit logs after processing. They are processed in memory and discarded immediately once your changelog is generated. We never train AI models on your data." 
    },
    { 
      title: "Cloud Infrastructure", 
      icon: <Server className="h-5 w-5" />, 
      content: "Our infrastructure is hosted on Vercel and AWS. These providers maintain multiple certifications, including SOC 2 Type II, ISO 27001, and PCI-DSS Level 1." 
    },
    { 
      title: "Global Security", 
      icon: <Globe className="h-5 w-5" />, 
      content: "We use Cloudflare for DDoS protection and a Web Application Firewall (WAF) to detect and block malicious traffic before it reaches our servers." 
    },
  ]

  return (
    <div className="bg-bg min-h-screen selection:bg-accent/30 font-sans text-text-secondary">
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
            Security & Trust
          </h1>
          <p className="font-mono text-sm text-text-muted uppercase tracking-[0.2em]">
            How we protect your code and data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {securityFeatures.map((feature, i) => (
            <div key={i} className="border border-border p-8 rounded-2xl bg-bg-surface/30 backdrop-blur-sm group hover:border-accent/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-bg border border-border flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-mono font-bold text-text-primary mb-4">{feature.title}</h3>
              <p className="leading-relaxed">{feature.content}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
            <section className="space-y-6">
                <h2 className="text-3xl font-serif italic text-text-primary">Vulnerability Reporting</h2>
                <p className="leading-loose">
                    Security is a continuous effort. If you believe you have found a security vulnerability in Changelog AI, please contact us immediately at <a href="mailto:security@changelog.ai" className="text-accent underline decoration-dashed">security@changelog.ai</a>. We investigate all reports and do our best to fix verified issues promptly.
                </p>
            </section>
        </div>

        <div className="mt-24 text-center">
            <a 
              href="#"
              className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-accent transition-all group"
            >
              <ArrowUp className="h-3.5 w-3.5 text-accent" />
              Back to top
            </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
