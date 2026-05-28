import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { usePageHeaderActions } from "@/context/HeaderActionsContext"

export function PerformancePage() {
  usePageHeaderActions(
    <Button variant="outline">
      <DownloadIcon />
      Export report
    </Button>
  )
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-36 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 flex flex-col gap-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-20" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
          <div className="flex items-end gap-1 h-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className="flex-1 rounded-sm"
                style={{ height: `${30 + Math.floor(Math.sin(i) * 40 + 50)}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
              <Skeleton key={m} className="h-3 w-4" />
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
          <div className="relative h-40 flex items-end">
            <Skeleton className="absolute inset-x-0 top-1/3 h-px" />
            <Skeleton className="absolute inset-x-0 top-2/3 h-px" />
            <Skeleton className="w-full h-24 rounded-md opacity-40" />
          </div>
          <div className="flex justify-between">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
              <Skeleton key={m} className="h-3 w-6" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
