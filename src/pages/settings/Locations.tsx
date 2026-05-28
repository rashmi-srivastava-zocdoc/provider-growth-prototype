import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { MapPinPlusIcon } from "lucide-react"
import { usePageHeaderActions } from "@/context/HeaderActionsContext"
import { useIntegrationData } from "@/context/PracticeContext"
import { AlertList } from "@/components/alerts"

export function LocationsPage() {
  const { alerts: integrationAlerts } = useIntegrationData()
  usePageHeaderActions(
    <Button>
      <MapPinPlusIcon />
      Add location
    </Button>
  )
  return (
    <div className="flex flex-col gap-4">
      <AlertList alerts={integrationAlerts} pageContext="locations" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-56 rounded-md" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3.5 w-52" />
                <Skeleton className="h-3.5 w-36" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-px w-full" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
