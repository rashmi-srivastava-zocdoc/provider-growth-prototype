import { Info, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHome } from "@/context/HomeContext"
import { performanceData } from "@/data/homeData"

function EmptyState() {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-5">
      <h2 className="font-semibold">Performance overview</h2>

      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
          <BarChart3 className="size-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium">No bookings yet</p>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-[240px]">
          Bookings and performance data will appear here as patients start scheduling.
        </p>
      </div>
    </div>
  )
}

function ActiveState() {
  const data = performanceData

  return (
    <div className="rounded-xl border bg-card p-5 space-y-5">
      <h2 className="font-semibold">Performance overview</h2>

      <div>
        <div className="text-4xl font-bold tabular-nums">
          {data.bookingsThisMonth}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Total bookings this month
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Compared to {data.bookingsLastMonth} bookings this time last month
        </p>
      </div>

      <hr className="border-border" />

      <div>
        <p className="text-sm font-medium mb-3">Bookings by patient type</p>

        <div className="flex h-3 w-full overflow-hidden rounded-full">
          <div
            className="bg-amber-400"
            style={{ width: `${data.newPatientPercent}%` }}
          />
          <div
            className="bg-cyan-500"
            style={{ width: `${data.existingPatientPercent}%` }}
          />
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-2 rounded-full bg-amber-400" />
              New patients
              <Info className="size-3 text-muted-foreground" />
            </span>
            <span className="text-muted-foreground tabular-nums">
              {data.newPatients} ({data.newPatientPercent}%)
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-2 rounded-full bg-cyan-500" />
              Existing patients
              <Info className="size-3 text-muted-foreground" />
            </span>
            <span className="text-muted-foreground tabular-nums">
              {data.existingPatients} ({data.existingPatientPercent}%)
            </span>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full">
        View more performance details
      </Button>

      <hr className="border-border" />

      <div>
        <div className="text-4xl font-bold tabular-nums">
          {data.totalReviews}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">Total reviews</p>
      </div>

      <div className="flex gap-4">
        <button className="text-sm text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors">
          Request reviews
        </button>
        <button className="text-sm text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors">
          View all reviews
        </button>
      </div>
    </div>
  )
}

export function PerformanceSidebar() {
  const { postPhase } = useHome()

  return postPhase === "just-launched" ? <EmptyState /> : <ActiveState />
}
