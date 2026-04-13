import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 text-accent animate-spin" />
        <span className="font-mono text-xs text-text-muted uppercase tracking-widest">Loading Changelog.ai</span>
      </div>
    </div>
  );
}
