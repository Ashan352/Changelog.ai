import React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "skeleton-shimmer rounded-xl bg-bg-elevated/50 border border-white/[0.03]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
