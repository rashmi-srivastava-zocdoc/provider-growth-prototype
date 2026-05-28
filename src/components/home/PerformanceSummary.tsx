import { ArrowUpRight, ArrowDownRight, AlertTriangle, ChevronDown } from "lucide-react"
import { performanceData } from "@/data/homeData"
import { Button } from "@/components/ui/button"

export function PerformanceSummary() {
  const data = performanceData

  const bookingsTrend =
    data.bookingsLastMonth > 0
      ? Math.round(
          ((data.bookingsThisMonth - data.bookingsLastMonth) /
            data.bookingsLastMonth) *
            100
        )
      : 0
  const bookingsUp = bookingsTrend >= 0

  const completionUp = data.completionRateTrend >= 0

  const spendFormatted =
    data.spend >= 1000
      ? `$${(data.spend / 1000).toFixed(1)}k`
      : `$${data.spend}`

  return (
    <div>
      {/* Optional location filter */}
      <div className="flex items-center justify-end mb-3">
        <Button variant="ghost" size="sm" className="border-0 text-muted-foreground">
          All locations
          <ChevronDown className="size-3.5 ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Bookings */}
        <div className="rounded-xl border bg-card p-4 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Bookings
          </span>
          <span className="text-2xl font-semibold leading-tight">
            {data.bookingsThisMonth}
          </span>
          <div className="flex items-center gap-1">
            {bookingsUp ? (
              <ArrowUpRight className="size-3 text-emerald-600" />
            ) : (
              <ArrowDownRight className="size-3 text-red-600" />
            )}
            <span
              className={`text-xs ${bookingsUp ? "text-emerald-600" : "text-red-600"}`}
            >
              {bookingsUp ? "+" : ""}
              {bookingsTrend}%
            </span>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-xl border bg-card p-4 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Completed
          </span>
          <span className="text-2xl font-semibold leading-tight">
            {data.completionRate}%
          </span>
          <div className="flex items-center gap-1">
            {completionUp ? (
              <ArrowUpRight className="size-3 text-emerald-600" />
            ) : (
              <ArrowDownRight className="size-3 text-red-600" />
            )}
            <span
              className={`text-xs ${completionUp ? "text-emerald-600" : "text-red-600"}`}
            >
              {data.completionRateTrend > 0 ? "+" : ""}
              {data.completionRateTrend}%
            </span>
          </div>
        </div>

        {/* Spend */}
        <div className="rounded-xl border bg-card p-4 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Spend
          </span>
          <span className="text-2xl font-semibold leading-tight">
            {spendFormatted}
          </span>
          <span className="text-xs text-muted-foreground">on pace</span>
        </div>

        {/* Alerts */}
        <div className="rounded-xl border bg-card p-4 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Alerts
          </span>
          <div className="flex items-center gap-2">
            {data.alertCount > 0 && (
              <AlertTriangle className="size-5 text-amber-500" />
            )}
            <span
              className={`text-2xl font-semibold leading-tight ${
                data.alertCount > 0
                  ? "text-amber-600 dark:text-amber-400"
                  : ""
              }`}
            >
              {data.alertCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
