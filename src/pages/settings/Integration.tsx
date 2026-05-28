import { useState } from "react"
import { usePageHeaderActions } from "@/context/HeaderActionsContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ConnectionCard,
  SeverityAlertGroup,
  MappingsTable,
  IntegrationSettingsModal,
} from "@/components/integration"
import { useIntegrationData } from "@/context/PracticeContext"
import type { AlertSeverity, IntegrationAlert } from "@/types"
import {
  RefreshCwIcon,
  SettingsIcon,
  CheckIcon,
  ArrowRightIcon,
} from "lucide-react"

function groupAlertsBySeverity(allAlerts: IntegrationAlert[]) {
  const order: AlertSeverity[] = ["error", "warning", "info"]
  const grouped = new Map<AlertSeverity, IntegrationAlert[]>()
  for (const sev of order) grouped.set(sev, [])
  for (const alert of allAlerts) {
    if (!alert.dismissed) grouped.get(alert.severity)!.push(alert)
  }
  return order.map((sev) => ({ severity: sev, alerts: grouped.get(sev)! })).filter((g) => g.alerts.length > 0)
}

export function IntegrationPage() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { alerts: integrationAlerts, summary, mappings } = useIntegrationData()
  const alertGroups = groupAlertsBySeverity(integrationAlerts)
  const activeAlertCount = integrationAlerts.filter((a) => !a.dismissed).length

  usePageHeaderActions(
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Last sync: 2 min ago</span>
      <Button variant="outline" size="sm">
        <RefreshCwIcon />
        Sync now
      </Button>
      <Button variant="outline" size="icon-sm" className="border-0" onClick={() => setSettingsOpen(true)}>
        <SettingsIcon />
      </Button>
    </div>,
    [settingsOpen],
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Connection */}
        <ConnectionCard
          health={summary.connection.health}
          statusLine={summary.connection.statusLine}
          detail={summary.connection.detail}
        />

        {/* Availability Sync */}
        <Card size="sm">
          <CardContent className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Availability Sync
            </span>
            <p className="text-2xl font-semibold tabular-nums">
              {summary.availabilitySync.openSlots.toLocaleString()}{" "}
              <span className="text-sm font-normal text-muted-foreground">open slots</span>
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">Updated 2 min ago</p>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <span>
                With live schedules{" "}
                <span className="font-medium text-foreground">
                  {summary.availabilitySync.liveSchedules[0]}/{summary.availabilitySync.liveSchedules[1]}
                </span>
              </span>
              <span>
                No slots{" "}
                <span className="font-medium text-foreground">({summary.availabilitySync.noSlots})</span>
              </span>
              <span>Next sync ~{summary.availabilitySync.nextSyncMin} min</span>
            </div>
          </CardContent>
        </Card>

        {/* Write-back */}
        <Card size="sm">
          <CardContent className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Write-back
            </span>
            <p className="text-2xl font-semibold tabular-nums">
              {summary.writeBack.totalBookings - summary.writeBack.failedWrites}
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                /{summary.writeBack.totalBookings} bookings
              </span>
            </p>
            {summary.writeBack.failedWrites > 0 && (
              <Badge variant="destructive" className="w-fit">
                {summary.writeBack.failedWrites} failed writes
              </Badge>
            )}
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              {summary.writeBack.capabilities.cancellations && (
                <span className="flex items-center gap-1">
                  <CheckIcon className="size-3 text-emerald-600" /> Cancellations
                </span>
              )}
              {summary.writeBack.capabilities.intakeForms && (
                <span className="flex items-center gap-1">
                  <CheckIcon className="size-3 text-emerald-600" /> Intake forms
                </span>
              )}
              {summary.writeBack.capabilities.statusUpdates && (
                <span className="flex items-center gap-1">
                  <CheckIcon className="size-3 text-emerald-600" /> Status updates
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mappings summary */}
        <Card size="sm">
          <CardContent className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Mappings
            </span>
            <p className="text-2xl font-semibold tabular-nums">
              {summary.mappings.linked}
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                /{summary.mappings.total} linked
              </span>
            </p>
            {summary.mappings.needMapping > 0 && (
              <p className="text-xs font-medium text-red-600 dark:text-red-400">
                {summary.mappings.needMapping} need mapping
              </p>
            )}
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                Providers{" "}
                <span className="font-medium text-foreground">{summary.mappings.providers[0]}</span>
                <CheckIcon className="size-3 text-emerald-600" />
                {summary.mappings.providers[1] > 0 && (
                  <>
                    <span className="font-medium text-red-600 dark:text-red-400">{summary.mappings.providers[1]}</span>
                    <span className="text-red-600 dark:text-red-400">&#10005;</span>
                  </>
                )}
              </span>
              <span className="flex items-center gap-1">
                Locations{" "}
                <span className="font-medium text-foreground">{summary.mappings.locations[0]}</span>
                <CheckIcon className="size-3 text-emerald-600" />
                {summary.mappings.locations[1] > 0 && (
                  <>
                    <span className="font-medium text-red-600 dark:text-red-400">{summary.mappings.locations[1]}</span>
                    <span className="text-red-600 dark:text-red-400">&#10005;</span>
                  </>
                )}
              </span>
              <span className="flex items-center gap-1">
                Appt types{" "}
                <span className="font-medium text-foreground">{summary.mappings.appointmentTypes[0]}</span>
                <CheckIcon className="size-3 text-emerald-600" />
                {summary.mappings.appointmentTypes[1] > 0 && (
                  <>
                    <span className="font-medium text-red-600 dark:text-red-400">{summary.mappings.appointmentTypes[1]}</span>
                    <span className="text-red-600 dark:text-red-400">&#10005;</span>
                  </>
                )}
              </span>
            </div>
            <button className="mt-1 flex w-fit items-center gap-1 text-xs font-medium text-primary hover:underline">
              Review all <ArrowRightIcon className="size-3" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-medium">Alerts</h2>
            <Badge variant="secondary">{activeAlertCount} active</Badge>
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground">
            Dismiss all
          </button>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <div className="flex flex-col gap-1">
            {alertGroups.map((group) => (
              <SeverityAlertGroup
                key={group.severity}
                severity={group.severity}
                alerts={group.alerts}
                defaultOpen={group.severity !== "info"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mappings table */}
      <MappingsTable mappings={mappings} />

      {/* Settings modal */}
      <IntegrationSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  )
}
