import { Skeleton } from "@/components/ui/skeleton"

export function ChannelsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-56 rounded-md" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-3/4" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
