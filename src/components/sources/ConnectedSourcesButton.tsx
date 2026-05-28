import type { DataSource } from "@/types"
import { SourceIcon } from "./SourceIcon"
import { SyncStatusDot } from "./SyncStatusIndicator"
import { CapabilityBadge } from "./CapabilityBadge"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  RefreshCwIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  UnplugIcon,
  PlusIcon,
  PlugIcon,
} from "lucide-react"

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

function sourceStatusLine(source: DataSource): string {
  if (source.syncMethod === "manual") {
    const timeStr = source.lastSyncAt ? formatRelativeTime(source.lastSyncAt) : null
    if (source.importedBy && timeStr) return `Imported ${timeStr} by ${source.importedBy}`
    if (timeStr) return `Imported ${timeStr}`
    return "Not yet imported"
  }

  if (!source.lastSyncAt) return "Never synced"

  const timeStr = formatRelativeTime(source.lastSyncAt)
  if (source.status === "connected") return `Synced ${timeStr}`
  if (source.status === "stale") return `Stale · last synced ${timeStr}`
  if (source.status === "error") return `Sync error · last synced ${timeStr}`
  if (source.status === "syncing") return "Syncing…"
  return "Disconnected"
}

interface ConnectedSourcesButtonProps {
  sources: DataSource[]
  onAddSource?: () => void
  onNavigateToSources?: () => void
}

export function ConnectedSourcesButton({
  sources,
  onAddSource,
  onNavigateToSources,
}: ConnectedSourcesButtonProps) {
  const rosterSources = sources.filter((s) => s.type !== "ehr" && s.syncMethod !== "manual")
  const hasIssues = rosterSources.some((s) => s.issues.some((i) => !i.dismissed))

  if (rosterSources.length === 0) {
    return (
      <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={onAddSource}>
        <PlusIcon className="size-3.5" />
        Connect source
      </Button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-muted ${
              hasIssues
                ? "border-amber-300 bg-amber-50/50 dark:border-amber-700 dark:bg-amber-950/20"
                : "border-border bg-background"
            }`}
          />
        }
      >
        <PlugIcon className="size-3.5 text-muted-foreground" />
        <span>Connected sources</span>
        <span className="ml-0.5 inline-flex size-4.5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
          {rosterSources.length}
        </span>
        <ChevronDownIcon className="size-3 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="px-3 pt-3 pb-2">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Connected Sources
          </span>
        </div>
        <div className="divide-y">
          {rosterSources.map((source) => (
            <div key={source.id} className="px-3 py-2.5 space-y-1.5">
              <div className="flex items-center gap-2">
                <SourceIcon type={source.type} size="sm" />
                <span className="text-sm font-medium truncate">{source.name}</span>
                <SyncStatusDot status={source.status} />
                <MoreActionsButton source={source} />
              </div>
              <div className="text-xs text-muted-foreground ml-5.5">
                {sourceStatusLine(source)}
              </div>
              {source.capabilities.length > 0 && (
                <div className="flex gap-1 ml-5.5">
                  {source.capabilities.map((cap) => (
                    <CapabilityBadge key={cap} capability={cap} />
                  ))}
                </div>
              )}
              {source.issues.filter((i) => !i.dismissed).length > 0 && (
                <div className="ml-5.5 rounded bg-amber-50 dark:bg-amber-950/30 px-2 py-1">
                  <p className="text-[11px] text-amber-800 dark:text-amber-200">
                    {source.issues.filter((i) => !i.dismissed)[0].message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 border-t px-3 py-2">
          <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 border-0" onClick={onAddSource}>
            <PlusIcon className="size-3" />
            Add source
          </Button>
          {onNavigateToSources && (
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 border-0 ml-auto" onClick={onNavigateToSources}>
              <ExternalLinkIcon className="size-3" />
              Manage all
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MoreActionsButton({ source }: { source: DataSource }) {
  return (
    <div className="ml-auto flex gap-0.5">
      {source.syncMethod !== "manual" ? (
        <button type="button" className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Sync now">
          <RefreshCwIcon className="size-3" />
        </button>
      ) : (
        <button type="button" className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Re-import">
          <RefreshCwIcon className="size-3" />
        </button>
      )}
      <button type="button" className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Disconnect">
        <UnplugIcon className="size-3" />
      </button>
    </div>
  )
}
