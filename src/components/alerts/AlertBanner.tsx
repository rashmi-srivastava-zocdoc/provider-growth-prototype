import type { IntegrationAlert } from "@/types"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon, InfoIcon, XIcon } from "lucide-react"

const severityConfig = {
  error: {
    icon: AlertTriangleIcon,
    iconColor: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
  },
  warning: {
    icon: AlertTriangleIcon,
    iconColor: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
  },
  info: {
    icon: InfoIcon,
    iconColor: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
}

interface AlertBannerProps {
  alert: IntegrationAlert
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  onDismiss?: () => void
}

export function AlertBanner({
  alert,
  onPrimaryAction,
  onSecondaryAction,
  onDismiss,
}: AlertBannerProps) {
  const config = severityConfig[alert.severity]
  const Icon = config.icon

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 ${config.bg} ${config.border}`}
    >
      <Icon className={`mt-0.5 size-4 shrink-0 ${config.iconColor}`} />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{alert.title}</p>
        <p className="text-xs text-muted-foreground">{alert.description}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button size="xs" variant="outline" onClick={onPrimaryAction}>
          {alert.primaryAction.label}
        </Button>
        {alert.secondaryAction && (
          <Button size="xs" variant="ghost" onClick={onSecondaryAction}>
            {alert.secondaryAction.label}
          </Button>
        )}
        {onDismiss && (
          <Button
            size="icon-xs"
            variant="ghost"
            className="border-0"
            onClick={onDismiss}
          >
            <XIcon />
            <span className="sr-only">Dismiss</span>
          </Button>
        )}
      </div>
    </div>
  )
}
