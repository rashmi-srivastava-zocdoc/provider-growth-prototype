import { Skeleton } from "@/components/ui/skeleton"

export function InboxPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 flex-1 max-w-sm rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      <div className="rounded-xl border bg-card divide-y">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 p-4">
            <Skeleton className="size-9 rounded-full shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-16 shrink-0" />
              </div>
              <Skeleton className="h-3.5 w-56" />
              <Skeleton className="h-3 w-full max-w-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
