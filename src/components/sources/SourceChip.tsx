import type { DataSource } from "@/types"
import { SourceIcon } from "./SourceIcon"
import { SyncStatusDot } from "./SyncStatusIndicator"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CapabilityBadge } from "./CapabilityBadge"
import { RefreshCwIcon, ExternalLinkIcon, UnplugIcon } from "lucide-react"

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

interface SourceChipProps {
  source: DataSource
  onNavigateToSources?: () => void
}

export function SourceChip({ source, onNavigateToSources }: SourceChipProps) {
  const timeStr = source.lastSyncAt ? formatRelativeTime(source.lastSyncAt) : null
  const hasIssues = source.issues.filter((i) => !i.dismissed).length > 0

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-muted ${
              hasIssues
                ? "border-amber-300 bg-amber-50/50 dark:border-amber-700 dark:bg-amber-950/20"
                : "border-border bg-background"
            }`}
          />
        }
      >
        <SourceIcon type={source.type} size="sm" />
        <span className="max-w-[140px] truncate">{source.name}</span>
        <span className="text-muted-foreground font-normal">
          ·
        </span>
        <SyncStatusDot status={source.status} />
        <span className="text-muted-foreground font-normal">
          {source.status === "connected" && timeStr
            ? `Synced ${timeStr}`
            : source.status === "stale"
              ? "Stale"
              : source.status === "error"
                ? "Error"
                : source.status === "syncing"
                  ? "Syncing…"
                  : "Disconnected"}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <SourceIcon type={source.type} size="md" />
            <span className="text-sm font-medium">{source.name}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {source.capabilities.map((cap) => (
              <CapabilityBadge key={cap} capability={cap} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md bg-muted/50 px-2 py-1.5">
              <div className="text-sm font-medium">{source.itemCounts.providers}</div>
              <div className="text-[10px] text-muted-foreground">Providers</div>
            </div>
            <div className="rounded-md bg-muted/50 px-2 py-1.5">
              <div className="text-sm font-medium">{source.itemCounts.locations}</div>
              <div className="text-[10px] text-muted-foreground">Locations</div>
            </div>
            <div className="rounded-md bg-muted/50 px-2 py-1.5">
              <div className="text-sm font-medium">{source.itemCounts.appointmentTypes}</div>
              <div className="text-[10px] text-muted-foreground">Appt types</div>
            </div>
          </div>

          {source.issues.filter((i) => !i.dismissed).length > 0 && (
            <div className="rounded-md bg-amber-50 dark:bg-amber-950/30 px-3 py-2">
              <p className="text-xs text-amber-800 dark:text-amber-200">
                {source.issues.filter((i) => !i.dismissed)[0].message}
              </p>
            </div>
          )}

          <div className="flex gap-1.5 pt-1">
            {source.syncMethod !== "manual" ? (
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                <RefreshCwIcon className="size-3" />
                Sync now
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                <RefreshCwIcon className="size-3" />
                Re-import
              </Button>
            )}
            {onNavigateToSources && (
              <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 border-0" onClick={onNavigateToSources}>
                <ExternalLinkIcon className="size-3" />
                Manage
              </Button>
            )}
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 border-0 text-muted-foreground ml-auto">
              <UnplugIcon className="size-3" />
              Disconnect
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
