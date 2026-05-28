import { useState } from "react"
import type { AlertSeverity, IntegrationAlert } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDownIcon, XIcon } from "lucide-react"

const severityConfig: Record<AlertSeverity, { dot: string; label: string; badgeCls: string }> = {
  error: { dot: "bg-red-500", label: "Errors", badgeCls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  warning: { dot: "bg-amber-400", label: "Warnings", badgeCls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  info: { dot: "bg-blue-400", label: "Info", badgeCls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
}

function relativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  return `${days} days ago`
}

interface SeverityAlertGroupProps {
  severity: AlertSeverity
  alerts: IntegrationAlert[]
  defaultOpen?: boolean
}

export function SeverityAlertGroup({ severity, alerts, defaultOpen = true }: SeverityAlertGroupProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const config = severityConfig[severity]
  const visible = alerts.filter((a) => !dismissed.has(a.id))

  if (visible.length === 0) return null

  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="flex w-full items-center gap-2 py-2 text-sm font-medium hover:text-foreground group/trigger">
        <span className={`size-2 rounded-full ${config.dot}`} />
        <span>{config.label}</span>
        <Badge variant="secondary" className={config.badgeCls}>
          {visible.length}
        </Badge>
        <ChevronDownIcon className="ml-auto size-4 text-muted-foreground transition-transform group-data-[open]/trigger:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col divide-y">
          {visible.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 py-3 first:pt-1"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="text-sm font-medium">{alert.title}</p>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground/60">{relativeTime(alert.timestamp)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <Button size="xs">{alert.primaryAction.label}</Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="border-0 text-muted-foreground"
                  onClick={() => setDismissed((prev) => new Set(prev).add(alert.id))}
                >
                  <XIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
