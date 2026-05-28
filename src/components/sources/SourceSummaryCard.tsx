import type { DataSource } from "@/types"
import { SourceIcon } from "./SourceIcon"
import { SyncStatusDot } from "./SyncStatusIndicator"
import { CapabilityBadge } from "./CapabilityBadge"
import { ArrowRightIcon } from "lucide-react"

function formatRelativeTime(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffMin < 1) return "just now"
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString()
}

export interface SourceReference {
  sourceId: string
  refLabel: string
  refValue: string
}

interface SourceSummaryCardProps {
  sources: DataSource[]
  references?: SourceReference[]
  onNavigateToSources?: () => void
}

export function SourceSummaryCard({
  sources,
  references = [],
  onNavigateToSources,
}: SourceSummaryCardProps) {
  if (sources.length === 0) return null

  const refMap = new Map(references.map((r) => [r.sourceId, r]))

  return (
    <div className="rounded-lg border bg-muted/20 px-4 py-3 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          Connected Sources
        </span>
        {onNavigateToSources && (
          <button
            type="button"
            className="text-[11px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-0.5"
            onClick={onNavigateToSources}
          >
            Manage
            <ArrowRightIcon className="size-3" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {sources.map((source) => {
          const ref = refMap.get(source.id)
          return (
            <div key={source.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm">
                <SourceIcon type={source.type} size="sm" />
                <span className="font-medium truncate">{source.name}</span>
                <SyncStatusDot status={source.status} />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {source.lastSyncAt ? formatRelativeTime(source.lastSyncAt) : "—"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 ml-5.5">
                {source.capabilities.map((cap) => (
                  <CapabilityBadge key={cap} capability={cap} />
                ))}
              </div>
              {ref && (
                <div className="ml-5.5 text-xs text-muted-foreground">
                  {ref.refLabel}: <span className="font-mono text-foreground/70">{ref.refValue}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
