import { scheduleItems } from "@/data/homeData"
import type { ScheduleItem } from "@/data/homeData"
import { Badge } from "@/components/ui/badge"

const statusBadge: Record<
  ScheduleItem["status"],
  { label: string; className: string }
> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-100 text-emerald-700 border-transparent",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700 border-transparent",
  },
  "checked-in": {
    label: "Checked in",
    className: "bg-blue-100 text-blue-700 border-transparent",
  },
}

export function TodaysSchedule() {
  const items = scheduleItems

  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Today</h3>
        <span className="text-xs text-muted-foreground">
          {items.length} appointments
        </span>
      </div>

      {/* Schedule rows */}
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const badge = statusBadge[item.status]

          return (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-lg px-2 py-1.5"
            >
              <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">
                {item.time}
              </span>
              <span className="text-sm font-medium flex-1 min-w-0 truncate">
                {item.patientName}
              </span>
              <span className="text-sm text-muted-foreground truncate hidden sm:block">
                {item.visitType}
              </span>
              <Badge className={`shrink-0 ${badge.className}`}>
                {badge.label}
              </Badge>
            </div>
          )
        })}
      </div>
    </div>
  )
}
