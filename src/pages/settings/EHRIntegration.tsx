import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { LinkIcon } from "lucide-react"
import { usePageHeaderActions } from "@/context/HeaderActionsContext"

export function EHRIntegrationPage() {
  usePageHeaderActions(
    <Button>
      <LinkIcon />
      Connect EHR
    </Button>
  )
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border bg-card p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-5 w-36" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-2 rounded-full" />
              <Skeleton className="h-3.5 w-28" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-36" />
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="flex items-center gap-4 px-4 py-3 border-b bg-muted/40">
            {["Provider", "EHR Provider ID", "Sync status", "Last synced", ""].map((_, i) => (
              <Skeleton key={i} className="h-3.5 w-24" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 border-b last:border-b-0">
              <Skeleton className="size-8 rounded-full shrink-0" />
              <Skeleton className="h-4 w-36 flex-1" />
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-32" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
