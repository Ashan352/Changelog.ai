'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, AlertTriangle, XSquare } from "lucide-react";

export function CancelSubscriptionDialog() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [open, setOpen] = useState(false);

  const resetState = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setAgreed(false);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={resetState}>
      <DialogTrigger className="px-8 py-3 rounded-full bg-accent text-bg font-mono font-bold text-xs hover:bg-accent/90 transition-all hover:scale-[1.02]">
        Manage Subscription
      </DialogTrigger>
      
      <DialogContent className="max-w-md bg-bg-surface border-border p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif italic text-2xl text-text-primary">
            Cancel Subscription
          </DialogTitle>
          <DialogDescription className="font-mono text-xs text-text-muted">
            Step {step} of 3
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 min-h-[200px] flex flex-col justify-center">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="font-mono text-sm text-text-secondary">Why are you leaving?</h3>
              <textarea 
                className="w-full h-32 rounded-xl bg-bg border border-border p-4 text-sm font-mono text-text-primary focus:border-accent focus:outline-none transition-colors"
                placeholder="Tell us what we can do better..."
              />
              <div className="flex justify-end">
                <button 
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-bg border border-border text-text-primary hover:text-accent hover:border-accent transition-colors text-xs font-mono"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-4 rounded-xl border border-danger/30 bg-danger/5 flex gap-4">
                <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-mono text-sm text-danger">Important Notice</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    As per our terms of service, canceling your subscription takes effect strictly at the end of your current billing cycle. Mid-month cancellations are not eligible for a prorated refund.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-bg p-4 rounded-xl border border-border">
                <Checkbox 
                  id="terms" 
                  checked={agreed}
                  onCheckedChange={(c) => setAgreed(c as boolean)}
                  className="mt-1 data-[state=checked]:bg-accent data-[state=checked]:text-bg border-accent/50"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-xs font-medium leading-tight text-text-primary cursor-pointer select-none"
                  >
                    I agree to the cancellation terms
                  </label>
                  <p className="text-[10px] font-mono text-text-muted">
                    Your plan will downgrade to Free at the end of the term.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button 
                  onClick={() => setStep(1)}
                  className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors px-4 py-2"
                >
                  Back
                </button>
                <button 
                  disabled={!agreed}
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-bg border border-border text-text-primary hover:border-accent hover:text-accent disabled:opacity-50 disabled:pointer-events-none transition-all text-xs font-mono"
                >
                  Acknowledge <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-danger/10 flex items-center justify-center mb-2">
                <XSquare className="h-8 w-8 text-danger" />
              </div>
              <div>
                <h3 className="font-mono text-base text-text-primary mb-2">Final Confirmation</h3>
                <p className="text-xs text-text-muted max-w-[280px]">
                  You are about to cancel your Pro subscription. You will lose access to unlimited generations on your next billing date.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-xs pt-4">
                <button 
                  onClick={() => {
                    // Logic to hit API endpoint
                    resetState(false);
                  }}
                  className="w-full py-3 rounded-full bg-danger text-white font-mono font-bold text-xs hover:bg-danger/90 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                  Cancel Subscription
                </button>
                <button 
                  onClick={() => resetState(false)}
                  className="w-full py-3 rounded-full bg-bg-surface border border-border text-text-primary font-mono text-xs hover:bg-bg transition-colors"
                >
                  Keep my plan
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
