import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreditCard, Zap, Check } from "lucide-react";
import { CancelSubscriptionDialog } from "@/components/dashboard/CancelSubscriptionDialog";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const plan = session.user.plan || "free";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-serif italic text-text-primary">Billing & Subscription</h1>
        <p className="font-mono text-xs text-text-muted mt-1 uppercase tracking-widest">
          Manage your subscription and usage limits
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-accent/20 bg-bg-surface shadow-[0_0_64px_rgba(232,255,71,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CreditCard className="h-24 w-24" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 rounded-full bg-accent text-bg font-mono font-bold text-[10px] uppercase tracking-widest">
              {plan === "pro" ? "Priority Sub" : "Free Plan"}
            </div>
            {plan === "pro" && (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-accent">
                <Zap className="h-3 w-3 fill-current" />
                Active
              </div>
            )}
          </div>

          <p className="font-mono text-xs text-text-secondary max-w-sm mb-8">
            {plan === "pro" 
              ? "You are currently on the Pro plan with unlimited generations and priority support."
              : "You are currently on the Free plan. Upgrade to unlock unlimited generations and 24/7 priority support."}
          </p>

          <div className="flex items-center gap-4">
            {plan === "pro" && <CancelSubscriptionDialog />}
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <a 
          href="/dashboard/pricing" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bg-surface border border-border font-mono text-xs text-text-primary hover:border-accent hover:text-accent transition-colors shadow-sm"
        >
          View all pricing & details
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
      </div>
    </div>
  );
}
