import { Skeleton } from "@/components/ui/skeleton"

export function BookablePresenceProvidersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-56 rounded-md" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 flex items-center gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-col gap-1.5 flex-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3.5 w-56" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
