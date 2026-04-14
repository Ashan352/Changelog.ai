import { Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full -z-10 animate-pulse" />
      
      <div className="space-y-6 flex flex-col items-center">
        <div className="opacity-50 grayscale scale-95 mb-4">
          <Logo hideTagline={true} />
        </div>
        
        <div className="relative">
          <Loader2 className="h-10 w-10 text-accent animate-spin stroke-[1.5px]" />
          <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[10px] text-accent uppercase tracking-[0.4em] animate-pulse">Initializing System</p>
          <p className="font-mono text-[9px] text-text-muted uppercase tracking-widest">Compiling release notes...</p>
        </div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] -z-20" />
    </div>
  );
}
