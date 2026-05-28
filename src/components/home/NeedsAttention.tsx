import { AlertTriangle, Info } from "lucide-react"
import { alertItems } from "@/data/homeData"
import type { AlertItem } from "@/data/homeData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const severityConfig: Record<
  AlertItem["severity"],
  { icon: typeof AlertTriangle; iconColor: string }
> = {
  error: { icon: AlertTriangle, iconColor: "text-red-600" },
  warning: { icon: AlertTriangle, iconColor: "text-amber-500" },
  info: { icon: Info, iconColor: "text-blue-500" },
}

export function NeedsAttention() {
  const items = alertItems

  if (items.length === 0) return null

  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium">Needs attention</h3>
        <Badge variant="secondary">{items.length}</Badge>
      </div>

      {/* Alert list */}
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const config = severityConfig[item.severity]
          const Icon = config.icon

          return (
            <div
              key={item.id}
              className="flex items-start gap-3"
            >
              <Icon
                className={`size-4 mt-0.5 shrink-0 ${config.iconColor}`}
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium">{item.title}</span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.description}
                </p>
              </div>
              <Button variant="outline" size="xs" className="shrink-0">
                {item.actionLabel}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
