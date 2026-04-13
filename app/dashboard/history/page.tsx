export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Layers } from "lucide-react";
import { HistoryContent } from "./HistoryContent";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function HistoryData() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const history = await prisma.generation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-2xl bg-bg-surface/30">
        <Layers className="h-10 w-10 text-text-muted/20 mb-4" />
        <p className="font-mono text-sm text-text-secondary">No history found</p>
        <p className="font-mono text-[10px] text-text-muted mt-2">Start generating to see your history here.</p>
      </div>
    );
  }

  return <HistoryContent history={history} />;
}

function HistoryLoading() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[500px]">
      <div className="w-full lg:w-80 space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex-1 space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 h-full flex flex-col">
      <div className="shrink-0">
        <h1 className="text-3xl font-serif italic text-text-primary">Generation History</h1>
        <p className="font-mono text-xs text-text-muted mt-1 uppercase tracking-widest">
          View and export your previous changelogs
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <Suspense fallback={<HistoryLoading />}>
          <HistoryData />
        </Suspense>
      </div>
    </div>
  );
}
