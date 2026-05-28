import { ArrowRight } from "lucide-react"
import { providerHealthItems } from "@/data/homeData"
import { Button } from "@/components/ui/button"

export function ProviderHealth() {
  const items = providerHealthItems

  const activeCount = items.filter(
    (i) => i.status === "active"
  ).length
  const attentionCount = items.filter(
    (i) => i.status !== "active"
  ).length

  // Find callout providers
  const newProvider = items.find((i) => i.status === "new")
  const topPerformer = items
    .filter((i) => i.trend === "up")
    .sort((a, b) => {
      const aNum = parseInt(a.metric ?? "0")
      const bNum = parseInt(b.metric ?? "0")
      return bNum - aNum
    })[0]
  const decliningProvider = items.find((i) => i.trend === "down")

  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Provider health</h3>
        <Button variant="link" size="sm" className="text-xs px-0 h-auto">
          View all providers
          <ArrowRight className="size-3 ml-1" />
        </Button>
      </div>

      {/* Dot visualization */}
      <div className="flex items-center gap-1.5">
        {items.map((item) => {
          if (item.status === "active") {
            return (
              <div
                key={item.id}
                className="size-2.5 rounded-full bg-emerald-500"
                title={item.name}
              />
            )
          }
          if (item.status === "new") {
            return (
              <div
                key={item.id}
                className="size-2.5 rounded-full bg-blue-500"
                title={item.name}
              />
            )
          }
          return (
            <div
              key={item.id}
              className="size-2.5 rounded-full border-2 border-amber-400 bg-transparent"
              title={item.name}
            />
          )
        })}
      </div>

      {/* Summary text */}
      <p className="text-xs text-muted-foreground">
        {activeCount} active{" "}
        <span className="mx-1">&middot;</span>{" "}
        {attentionCount} need attention
      </p>

      {/* Provider callouts */}
      <div className="flex flex-col gap-2">
        {newProvider && (
          <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">&#9733;</span>
              <span className="text-sm font-medium">
                {newProvider.name.replace("Dr. ", "Dr. ")}{" "}
                <span className="text-blue-600 text-xs">(new)</span>
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Just added
            </span>
          </div>
        )}
        {topPerformer && (
          <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-emerald-600">&#9650;</span>
              <span className="text-sm font-medium">{topPerformer.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {topPerformer.metric}
            </span>
          </div>
        )}
        {decliningProvider && (
          <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-amber-600">&#9660;</span>
              <span className="text-sm font-medium">
                {decliningProvider.name}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {decliningProvider.metric}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
