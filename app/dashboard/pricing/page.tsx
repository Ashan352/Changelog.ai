import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { CancelSubscriptionDialog } from "@/components/dashboard/CancelSubscriptionDialog";

export default async function PricingDetailsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const plan = session.user.plan || "free";

  const features = [
    { name: "Generations per month", free: "5", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "Smart Tag Parsing", free: true, pro: true, enterprise: true },
    { name: "Prioritized Models", free: false, pro: true, enterprise: true },
    { name: "SLA Support", free: false, pro: false, enterprise: true },
    { name: "Custom System Prompts", free: false, pro: false, enterprise: true },
    { name: "API Access", free: false, pro: false, enterprise: true },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div>
        <Link href="/dashboard/billing" className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent font-bold transition-colors mb-4">
          <ArrowRight className="h-4 w-4 rotate-180" /> Back to Billing
        </Link>
        <h1 className="text-3xl font-serif italic text-text-primary">Simple, transparent pricing</h1>
        <p className="font-mono text-xs text-text-muted mt-2 uppercase tracking-widest">
          Start for free to test the waters, upgrade for limitless workflow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className="p-8 rounded-3xl border border-border bg-bg-surface/50 w-full relative">
          {plan === "free" && <div className="absolute top-4 right-4 text-[10px] uppercase font-mono text-text-muted border border-border px-2 py-1 rounded-full">Current Plan</div>}
          <h3 className="font-mono font-bold text-lg text-text-primary">Free</h3>
          <div className="mt-4 mb-2 flex items-baseline gap-2">
            <span className="text-4xl font-serif italic text-text-primary">$0</span>
            <span className="text-xs font-mono text-text-muted uppercase">/mo</span>
          </div>
          <p className="font-mono text-[10px] text-text-muted mb-8 h-8">Perfect for individuals checking out the product.</p>
          
          <button disabled className="w-full py-3 rounded-full bg-bg border border-border text-text-primary font-mono text-xs disabled:opacity-50 transition-all cursor-default">
            {plan === "free" ? "Active" : "Downgrade"}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="p-8 rounded-3xl border border-accent/30 bg-bg-surface w-full relative shadow-[0_0_40px_rgba(232,255,71,0.05)] transform md:-translate-y-2">
          {plan === "pro" && <div className="absolute top-4 right-4 text-[10px] uppercase font-mono bg-accent text-bg px-2 py-1 rounded-full font-bold">Current Plan</div>}
          <h3 className="font-mono font-bold text-lg text-accent">Pro</h3>
          <div className="mt-4 mb-2 flex items-baseline gap-2">
            <span className="text-4xl font-serif italic text-text-primary">$5</span>
            <span className="text-xs font-mono text-text-muted uppercase">/mo</span>
          </div>
          <p className="font-mono text-[10px] text-text-muted mb-8 h-8">Unlimited generations and prioritized AI compute.</p>

          {plan === "pro" ? (
            <div className="w-full flex justify-center mt-2">
              <CancelSubscriptionDialog />
            </div>
          ) : (
            <CheckoutButton plan="pro" />
          )}
        </div>

        {/* Enterprise */}
        <div className="p-8 rounded-3xl border border-border bg-bg-surface/50 w-full relative">
          <h3 className="font-mono font-bold text-lg text-text-primary">Custom</h3>
          <div className="mt-4 mb-2 flex items-baseline gap-2">
            <span className="text-4xl font-serif italic text-text-primary">Custom</span>
          </div>
          <p className="font-mono text-[10px] text-text-muted mb-8 h-8">Custom API limits and advanced integrations.</p>

          <button className="w-full py-3 rounded-full bg-bg border border-border text-text-primary font-mono text-xs hover:border-accent hover:text-accent transition-all">
            Contact Sales
          </button>
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="pt-8">
        <h2 className="text-xl font-serif italic text-text-primary mb-6">Feature comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="py-4 font-mono text-[10px] text-text-muted uppercase tracking-widest font-normal w-2/5">Feature</th>
                <th className="py-4 font-mono text-[10px] text-text-muted uppercase tracking-widest font-normal text-center w-1/5">Free</th>
                <th className="py-4 font-mono text-[10px] text-accent uppercase tracking-widest font-bold text-center w-1/5">Pro</th>
                <th className="py-4 font-mono text-[10px] text-text-muted uppercase tracking-widest font-normal text-center w-1/5">Custom</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-bg-surface/20 transition-colors">
                  <td className="py-4 font-mono text-xs text-text-primary">{f.name}</td>
                  <td className="py-4 text-center">
                    {typeof f.free === "boolean" ? (
                      f.free ? <Check className="mx-auto h-4 w-4 text-text-muted" /> : <X className="mx-auto h-4 w-4 text-text-muted/30" />
                    ) : (
                      <span className="font-mono text-xs text-text-muted">{f.free}</span>
                    )}
                  </td>
                  <td className="py-4 text-center">
                    {typeof f.pro === "boolean" ? (
                      f.pro ? <Check className="mx-auto h-4 w-4 text-accent" /> : <X className="mx-auto h-4 w-4 text-text-muted/30" />
                    ) : (
                      <span className="font-mono text-xs text-accent font-bold">{f.pro}</span>
                    )}
                  </td>
                  <td className="py-4 text-center">
                    {typeof f.enterprise === "boolean" ? (
                      f.enterprise ? <Check className="mx-auto h-4 w-4 text-text-primary" /> : <X className="mx-auto h-4 w-4 text-text-muted/30" />
                    ) : (
                      <span className="font-mono text-xs text-text-primary">{f.enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
