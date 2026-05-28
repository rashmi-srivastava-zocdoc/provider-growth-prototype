import { PlusIcon, RefreshCwIcon, ExternalLinkIcon, ListIcon, UploadIcon, AlertTriangleIcon } from "lucide-react"
import { usePractice } from "@/context/PracticeContext"
import type { DataSource } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SourceIcon, CapabilityBadge, SyncStatusDot, SyncStatusIndicator } from "@/components/sources"
import { usePageHeaderActions } from "@/context/HeaderActionsContext"

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function ItemCounts({ source }: { source: DataSource }) {
  const parts: string[] = []
  if (source.itemCounts.providers > 0) {
    parts.push(`${source.itemCounts.providers} provider${source.itemCounts.providers !== 1 ? "s" : ""}`)
  }
  if (source.itemCounts.locations > 0) {
    parts.push(`${source.itemCounts.locations} location${source.itemCounts.locations !== 1 ? "s" : ""}`)
  }
  if (source.itemCounts.appointmentTypes > 0) {
    parts.push(`${source.itemCounts.appointmentTypes} appointment type${source.itemCounts.appointmentTypes !== 1 ? "s" : ""}`)
  }
  if (parts.length === 0) return null
  return <span className="text-xs text-muted-foreground">{parts.join(" · ")}</span>
}

function SchedulingSourceCard({ source }: { source: DataSource }) {
  return (
    <Card className="border-l-4 border-l-violet-500">
      <CardContent className="space-y-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/40">
              <SourceIcon type={source.type} size="lg" />
            </div>
            <div className="min-w-0">
              <div className="font-medium text-sm">{source.name}</div>
              <SyncStatusIndicator status={source.status} lastSyncAt={source.lastSyncAt} compact />
            </div>
          </div>
        </div>

        {/* Capability badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {source.capabilities.map((cap) => (
            <CapabilityBadge key={cap} capability={cap} />
          ))}
        </div>

        {/* Issues */}
        {source.issues.length > 0 && (
          <div className="space-y-1.5">
            {source.issues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-start gap-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/30 dark:text-amber-300"
              >
                <AlertTriangleIcon className="size-3.5 shrink-0 mt-0.5" />
                <span>{issue.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Item counts */}
        <ItemCounts source={source} />

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Button variant="outline" size="sm">
            <RefreshCwIcon />
            Sync now
          </Button>
          <Button variant="ghost" size="sm" className="border-0">
            <ExternalLinkIcon />
            View mapping
          </Button>
          <Button variant="ghost" size="sm" className="border-0">
            <ListIcon />
            Sync log
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function RosterSourceCard({ source }: { source: DataSource }) {
  const isFile = source.type === "file"
  const isStale = source.status === "stale"

  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
            <SourceIcon type={source.type} size="md" />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm">{source.name}</div>
            <SyncStatusIndicator status={source.status} lastSyncAt={source.lastSyncAt} compact />
          </div>
        </div>
      </div>

      {/* Capability badges */}
      <div className="flex flex-wrap items-center gap-1.5">
        {source.capabilities.map((cap) => (
          <CapabilityBadge key={cap} capability={cap} />
        ))}
      </div>

      {/* Issues */}
      {source.issues.length > 0 && (
        <div className="space-y-1.5">
          {source.issues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-start gap-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/30 dark:text-amber-300"
            >
              <AlertTriangleIcon className="size-3.5 shrink-0 mt-0.5" />
              <span>{issue.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Item counts */}
      <ItemCounts source={source} />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isFile ? (
          <Button variant="outline" size="sm">
            <UploadIcon />
            Re-import
          </Button>
        ) : (
          <>
            <Button variant="outline" size="sm">
              <RefreshCwIcon />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" className="border-0">
              <ExternalLinkIcon />
              View changes
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export function SourcesPage() {
  const practiceData = usePractice()
  const dataSources = practiceData.dataSources ?? []
  const schedulingSources = dataSources.filter((s) => s.capabilities.includes("scheduling"))
  const rosterSources = dataSources.filter((s) => !s.capabilities.includes("scheduling"))

  usePageHeaderActions(
    <Button>
      <PlusIcon />
      Add source
    </Button>
  )

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      {/* Scheduling section */}
      {schedulingSources.length > 0 && (
        <section>
          <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Scheduling
          </h2>
          <div className="space-y-3">
            {schedulingSources.map((source) => (
              <SchedulingSourceCard key={source.id} source={source} />
            ))}
          </div>
        </section>
      )}

      {/* Roster Sources section */}
      {rosterSources.length > 0 && (
        <section>
          <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Roster Sources
          </h2>
          <Card>
            <div className="divide-y">
              {rosterSources.map((source) => (
                <RosterSourceCard key={source.id} source={source} />
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Bottom add source */}
      <div>
        <Button variant="outline">
          <PlusIcon />
          Add source
        </Button>
      </div>
    </div>
  )
}
