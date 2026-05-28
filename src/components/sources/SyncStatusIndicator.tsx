import type { SyncStatus } from "@/types"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

const statusConfig: Record<SyncStatus, { color: string; pulseColor?: string; label: string }> = {
  connected: { color: "bg-emerald-500", label: "Connected" },
  syncing: { color: "bg-blue-500", pulseColor: "animate-pulse", label: "Syncing" },
  error: { color: "bg-red-500", label: "Error" },
  stale: { color: "bg-amber-500", label: "Stale" },
  disconnected: { color: "bg-zinc-400", label: "Disconnected" },
}

interface SyncStatusDotProps {
  status: SyncStatus
  size?: "sm" | "md"
}

export function SyncStatusDot({ status, size = "sm" }: SyncStatusDotProps) {
  const config = statusConfig[status]
  const sizeClass = size === "sm" ? "size-2" : "size-2.5"
  return (
    <span className={`${sizeClass} rounded-full shrink-0 ${config.color} ${config.pulseColor ?? ""}`} />
  )
}

interface SyncStatusIndicatorProps {
  status: SyncStatus
  lastSyncAt: string | null
  compact?: boolean
}

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

export function SyncStatusIndicator({ status, lastSyncAt, compact }: SyncStatusIndicatorProps) {
  const config = statusConfig[status]
  const timeStr = lastSyncAt ? formatRelativeTime(lastSyncAt) : null

  if (compact) {
    return (
      <Tooltip>
        <TooltipTrigger render={<span className="inline-flex items-center gap-1.5" />}>
          <SyncStatusDot status={status} />
          <span className="text-xs text-muted-foreground">
            {status === "connected" && timeStr ? `Synced ${timeStr}` : config.label}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          {config.label}{timeStr ? ` · Last synced ${timeStr}` : ""}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <SyncStatusDot status={status} />
      <span className="text-sm text-muted-foreground">
        {status === "connected" && timeStr ? `Synced ${timeStr}` : config.label}
      </span>
    </span>
  )
}
