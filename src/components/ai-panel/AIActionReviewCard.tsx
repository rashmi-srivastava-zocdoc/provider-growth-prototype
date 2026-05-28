import React, { useState } from "react"
import {
  ZapIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ActionReviewData } from "@/context/aiMutationHelpers"

interface AIActionReviewCardProps {
  review: ActionReviewData
  onStatusChange: (status: "applied" | "dismissed") => void
}

export function AIActionReviewCard({ review, onStatusChange }: AIActionReviewCardProps) {
  const [expanded, setExpanded] = useState(review.items.length <= 3)
  const count = review.items.length
  const s = count !== 1 ? "s" : ""

  if (review.status === "applied") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/30 p-3 mt-2">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2Icon className="size-4 text-green-600 dark:text-green-400 shrink-0" />
          <span className="font-medium text-green-800 dark:text-green-300">
            {review.description}
          </span>
        </div>
        <p className="text-xs text-green-700/70 dark:text-green-400/60 mt-1 ml-6">
          Applied to {count} item{s}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-green-700/60 dark:text-green-400/50 hover:text-green-800 dark:hover:text-green-300 mt-1.5 ml-6 flex items-center gap-1 transition-colors"
        >
          {expanded ? "Hide" : "View"} details
          <ChevronDownIcon className={cn("size-3 transition-transform", !expanded && "-rotate-90")} />
        </button>
        {expanded && (
          <div className="mt-2 ml-6 space-y-1">
            {review.items.map(item => (
              <div key={item.id} className="text-xs text-green-700/80 dark:text-green-400/60">
                <span className="font-medium">{item.label}</span>
                {item.changes.map((c, i) => (
                  <span key={i} className="ml-1">
                    · {c.field}: {c.from} &rarr; {c.to}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (review.status === "dismissed") {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-3 mt-2">
        <div className="flex items-center gap-2 text-sm">
          <XCircleIcon className="size-4 text-muted-foreground shrink-0" />
          <span className="font-medium text-muted-foreground line-through">
            {review.description}
          </span>
        </div>
        <p className="text-xs text-muted-foreground/70 mt-1 ml-6">
          Dismissed · {count} item{s}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-background shadow-sm overflow-hidden mt-2">
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="size-5 rounded bg-primary/10 flex items-center justify-center shrink-0">
            <ZapIcon className="size-3 text-primary" />
          </div>
          <span className="text-sm font-medium">{review.description}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 ml-7">
          {count} item{s} will be updated
        </p>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-3 py-1.5 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        <ChevronRightIcon
          className={cn("size-3 transition-transform", expanded && "rotate-90")}
        />
        {expanded ? "Hide details" : `Show ${count} item${s}`}
      </button>

      {expanded && (
        <div className="border-t border-border divide-y divide-border max-h-[280px] overflow-y-auto">
          {review.items.map(item => (
            <div key={item.id} className="px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-[10px] font-medium">
                  {item.initials ?? item.label.split(/[\s,]+/).filter(w => w && !w.endsWith(".")).map(w => w[0]).slice(0, 2).join("").toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{item.label}</p>
                  {item.subtitle && (
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  )}
                </div>
              </div>
              <div className="mt-1.5 ml-8 space-y-0.5">
                {item.changes.map((change, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs flex-wrap">
                    <span className="text-muted-foreground">{change.field}:</span>
                    <span className="text-muted-foreground">{change.from}</span>
                    <ArrowRightIcon className="size-2.5 text-muted-foreground/50 shrink-0" />
                    <span className="font-medium">{change.to}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="px-3 py-2.5 border-t border-border bg-muted/30 flex items-center gap-2">
        <Button size="sm" onClick={() => onStatusChange("applied")}>
          Apply changes
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onStatusChange("dismissed")}>
          Dismiss
        </Button>
      </div>
    </div>
  )
}
