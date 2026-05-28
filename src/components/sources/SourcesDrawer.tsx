import { AlertTriangleIcon, PlusIcon, SettingsIcon, RefreshCwIcon, UploadIcon } from "lucide-react"
import { useIAMode } from "@/context/IAModeContext"
import { usePractice, useIntegrationData } from "@/context/PracticeContext"
import type { DataSource, IntegrationAlert } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { SourceIcon } from "./SourceIcon"
import { SyncStatusDot } from "./SyncStatusIndicator"

// Data derived inside components via hooks

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
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function itemCountsLine(source: DataSource): string {
  const parts: string[] = []
  if (source.itemCounts.providers > 0)
    parts.push(`${source.itemCounts.providers} provider${source.itemCounts.providers !== 1 ? "s" : ""}`)
  if (source.itemCounts.locations > 0)
    parts.push(`${source.itemCounts.locations} location${source.itemCounts.locations !== 1 ? "s" : ""}`)
  if (source.itemCounts.appointmentTypes > 0)
    parts.push(`${source.itemCounts.appointmentTypes} type${source.itemCounts.appointmentTypes !== 1 ? "s" : ""}`)
  return parts.join(" · ")
}

function rosterFieldLine(source: DataSource): string {
  if (source.fieldCount && source.fieldCount > 0) return `${source.fieldCount} fields`
  return ""
}

function SchedulingSourceRow({ source, activeAlerts }: { source: DataSource; activeAlerts: IntegrationAlert[] }) {
  const alertCount = activeAlerts.filter((a) => a.source === source.name).length
  const syncLabel = source.lastSyncAt
    ? `Synced ${formatRelativeTime(source.lastSyncAt)}`
    : "Never synced"

  return (
    <div className="rounded-lg border bg-card p-3 space-y-2">
      <div className="flex items-center gap-2">
        <SyncStatusDot status={source.status} size="md" />
        <span className="text-sm font-medium flex-1 truncate">{source.name}</span>
        <span className="text-xs text-muted-foreground whitespace-nowrap">{syncLabel}</span>
      </div>

      <p className="text-xs text-muted-foreground pl-5">{itemCountsLine(source)}</p>

      {alertCount > 0 && (
        <div className="flex items-center gap-1.5 pl-5">
          <AlertTriangleIcon className="size-3 text-amber-600" />
          <span className="text-xs text-amber-700 dark:text-amber-400">
            {alertCount} item{alertCount !== 1 ? "s" : ""} need attention
          </span>
        </div>
      )}

      <div className="flex items-center gap-1.5 pl-5 pt-0.5">
        <Button variant="ghost" size="xs" className="border-0">View details</Button>
        <Button variant="ghost" size="xs" className="border-0">
          <RefreshCwIcon />
          Sync now
        </Button>
      </div>
    </div>
  )
}

function RosterSourceRow({ source }: { source: DataSource }) {
  const isFile = source.type === "file"
  const statusLabel = isFile
    ? source.lastSyncAt
      ? `Imported ${formatRelativeTime(source.lastSyncAt)}`
      : "Not imported"
    : source.lastSyncAt
      ? `Synced ${formatRelativeTime(source.lastSyncAt)}`
      : "Never synced"

  return (
    <div className="flex flex-col gap-1.5 px-3 py-2.5">
      <div className="flex items-center gap-2">
        <SyncStatusDot status={source.status} />
        <span className="text-sm font-medium flex-1 truncate">{source.name}</span>
        <span className="text-xs text-muted-foreground whitespace-nowrap">{statusLabel}</span>
      </div>
      <p className="text-xs text-muted-foreground pl-4.5">
        {isFile ? rosterFieldLine(source) : rosterFieldLine(source)}
      </p>
      {source.issues.filter((i) => !i.dismissed).length > 0 && (
        <div className="flex items-center gap-1.5 pl-4.5">
          <AlertTriangleIcon className="size-3 text-amber-600" />
          <span className="text-xs text-amber-700 dark:text-amber-400">
            {source.issues.filter((i) => !i.dismissed)[0].message}
          </span>
        </div>
      )}
      <div className="pl-4.5 pt-0.5">
        {isFile ? (
          <Button variant="ghost" size="xs" className="border-0">
            <UploadIcon />
            Re-import
          </Button>
        ) : (
          <Button variant="ghost" size="xs" className="border-0">
            <RefreshCwIcon />
            Refresh
          </Button>
        )}
      </div>
    </div>
  )
}

export function SourcesDrawer() {
  const { iaMode, isSourcesDrawerOpen, closeSourcesDrawer } = useIAMode()
  const practiceData = usePractice()
  const { alerts: integrationAlerts } = useIntegrationData()

  if (iaMode !== "sources-drawer") return null

  const dataSources = practiceData.dataSources ?? []
  const schedulingSources = dataSources.filter((s) => s.capabilities.includes("scheduling"))
  const rosterSources = dataSources.filter((s) => !s.capabilities.includes("scheduling"))
  const activeAlerts = integrationAlerts.filter((a) => !a.dismissed)

  return (
    <Sheet open={isSourcesDrawerOpen} onOpenChange={(open) => { if (!open) closeSourcesDrawer() }}>
      <SheetContent side="right" showCloseButton className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Data sources</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-4">
          {schedulingSources.length > 0 && (
            <section>
              <h3 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Scheduling
              </h3>
              <div className="space-y-2">
                {schedulingSources.map((source) => (
                  <SchedulingSourceRow key={source.id} source={source} activeAlerts={activeAlerts} />
                ))}
              </div>
            </section>
          )}

          {rosterSources.length > 0 && (
            <section>
              <h3 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Roster Sources
              </h3>
              <div className="rounded-lg border bg-card divide-y">
                {rosterSources.map((source) => (
                  <RosterSourceRow key={source.id} source={source} />
                ))}
              </div>
            </section>
          )}
        </div>

        <SheetFooter className="flex-row items-center gap-3 border-t">
          <Button variant="outline" size="sm">
            <PlusIcon />
            Import data
          </Button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <SettingsIcon className="size-3" />
            Integration settings
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
