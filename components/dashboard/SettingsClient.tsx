'use client';
import { useState } from "react";
import { Settings as SettingsIcon, Shield, User, Bell, Loader2 } from "lucide-react";
import { updateProfile } from "@/app/actions/user";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export function SettingsClient({ 
  user 
}: { 
  user: { name: string; email: string; image: string } 
}) {
  const [name, setName] = useState(user.name || "");
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateProfile({ name });
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-4">
      <Accordion className="w-full space-y-4">
        
        {/* Profile Information */}
        <AccordionItem value="profile" className="border border-border rounded-xl bg-bg-surface/50 overflow-hidden px-1">
          <AccordionTrigger className="hover:no-underline px-4 py-4 group">
            <div className="flex items-center gap-4 text-left">
              <div className="w-9 h-9 rounded-lg bg-bg border border-border flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/40 transition-all">
                <User className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] font-mono font-bold text-text-primary">Profile Information</h3>
                <p className="text-sm font-mono text-text-muted mt-0.5">Update your name and avatar</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 border-t border-border/50">
            <div className="grid gap-6 max-w-sm">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono text-xs text-text-secondary">Email Address (Read Only)</Label>
                <Input id="email" value={user.email || ""} disabled className="bg-bg/50 font-mono text-xs text-text-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="font-mono text-xs text-text-secondary">Display Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="bg-bg font-mono text-xs focus-visible:ring-accent" 
                />
              </div>
              <button
                onClick={handleSaveProfile}
                disabled={isSaving || name === user.name}
                className="px-6 py-2.5 rounded-full bg-accent text-bg font-mono font-bold text-xs hover:bg-accent/90 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 w-fit"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Notification Preferences */}
        <AccordionItem value="notifications" className="border border-border rounded-xl bg-bg-surface/50 overflow-hidden px-1">
          <AccordionTrigger className="hover:no-underline px-4 py-4 group">
            <div className="flex items-center gap-4 text-left">
              <div className="w-9 h-9 rounded-lg bg-bg border border-border flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/40 transition-all">
                <Bell className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] font-mono font-bold text-text-primary">Notification Preferences</h3>
                <p className="text-sm font-mono text-text-muted mt-0.5">Manage how you receive updates</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 border-t border-border/50">
            <div className="space-y-6 max-w-md">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-mono text-text-primary">Marketing Emails</Label>
                  <p className="text-xs text-text-muted font-mono max-w-[250px]">Receive emails about new features, AI models, and updates.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-mono text-text-primary">Usage Alerts</Label>
                  <p className="text-xs text-text-muted font-mono max-w-[250px]">Get notified when you reach 80% of your free generation limits.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Security & Privacy */}
        <AccordionItem value="security" className="border border-border rounded-xl bg-bg-surface/50 overflow-hidden px-1">
          <AccordionTrigger className="hover:no-underline px-4 py-4 group">
            <div className="flex items-center gap-4 text-left">
              <div className="w-9 h-9 rounded-lg bg-bg border border-border flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/40 transition-all">
                <Shield className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] font-mono font-bold text-text-primary">Security & Privacy</h3>
                <p className="text-sm font-mono text-text-muted mt-0.5">Configure dual-authentication and data</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 border-t border-border/50">
              <div className="space-y-6 max-w-md">
                <div className="p-4 rounded-xl border border-border bg-bg space-y-3">
                  <h4 className="font-mono text-sm text-text-primary">Data Telemetry</h4>
                  <p className="text-xs font-mono text-text-muted leading-relaxed">
                    Your commit logs are never used to train our AI models. They are immediately dropped after processing.
                  </p>
                </div>
                
                <DeleteAccountButton />
             </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}

function DeleteAccountButton() {
  const [step, setStep] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { signOut } = require("next-auth/react");

  const handleDelete = async () => {
    if (step < 2) {
      setStep(s => s + 1);
      return;
    }

    setIsDeleting(true);
    try {
      const { deleteAccount } = await import("@/app/actions/user");
      await deleteAccount();
      toast.success("Account deleted successfully");
      // Critical: Sign out to clear cookies and redirect
      await signOut({ callbackUrl: "/", redirect: true });
    } catch (err) {
      toast.error("Failed to delete account");
      setStep(0);
    } finally {
      setIsDeleting(false);
    }
  };

  const steps = [
    { label: "Delete Account", color: "text-danger border-danger/20 hover:bg-danger/5" },
    { label: "Are you sure? (Click again)", color: "text-danger bg-danger/10 border-danger/40 animate-pulse" },
    { label: "Final Warning: THIS IS PERMANENT", color: "text-bg bg-danger border-danger" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 h-1.5 w-full max-w-[200px]">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-full transition-all duration-300 ${i <= step - 1 ? 'bg-danger shadow-[0_0_8px_rgba(217,93,57,0.4)]' : 'bg-border'}`} 
          />
        ))}
      </div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`px-6 py-2.5 rounded-full font-mono font-bold text-xs transition-all active:scale-[0.98] border flex items-center gap-2 ${steps[step].color}`}
      >
        {isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : steps[step].label}
      </button>
      {step > 0 && !isDeleting && (
        <button 
          onClick={() => setStep(0)}
          className="text-[10px] font-mono text-text-muted hover:text-text-primary underline ml-2"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
