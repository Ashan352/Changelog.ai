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
        <AccordionItem value="profile" className="border border-border rounded-2xl bg-bg-surface/50 overflow-hidden px-2">
          <AccordionTrigger className="hover:no-underline px-4 py-6 group">
            <div className="flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/40 transition-all">
                <User className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-mono font-bold text-text-primary">Profile Information</h3>
                <p className="text-xs font-mono text-text-muted mt-1">Update your name and avatar</p>
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
        <AccordionItem value="notifications" className="border border-border rounded-2xl bg-bg-surface/50 overflow-hidden px-2">
          <AccordionTrigger className="hover:no-underline px-4 py-6 group">
            <div className="flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/40 transition-all">
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-mono font-bold text-text-primary">Notification Preferences</h3>
                <p className="text-xs font-mono text-text-muted mt-1">Manage how you receive updates</p>
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
        <AccordionItem value="security" className="border border-border rounded-2xl bg-bg-surface/50 overflow-hidden px-2">
          <AccordionTrigger className="hover:no-underline px-4 py-6 group">
            <div className="flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/40 transition-all">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-mono font-bold text-text-primary">Security & Privacy</h3>
                <p className="text-xs font-mono text-text-muted mt-1">Configure dual-authentication and data</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 border-t border-border/50">
             <div className="space-y-6 max-w-md">
                <div className="p-4 rounded-xl border border-border bg-bg space-y-3">
                  <h4 className="font-mono text-sm text-text-primary">Data Telemetry</h4>
                  <p className="text-xs font-mono text-text-muted">
                    Your commit logs are never used to train our AI models. They are immediately dropped after processing.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    if (window.confirm("Are you SURE you want to delete your account? This action is permanent and will delete all your generation history.")) {
                      try {
                        const { deleteAccount } = await import("@/app/actions/user");
                        await deleteAccount();
                        window.location.href = "/";
                      } catch (err) {
                        toast.error("Failed to delete account");
                      }
                    }
                  }}
                  className="px-6 py-2.5 rounded-full bg-bg border border-danger/50 text-danger font-mono font-bold text-xs hover:bg-danger/10 transition-all active:scale-[0.98]"
                >
                  Delete Account
                </button>
             </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}
