import { ArrowRight } from "lucide-react"
import { inboxItems } from "@/data/homeData"
import type { InboxItem } from "@/data/homeData"
import { Button } from "@/components/ui/button"

const statusDotColor: Record<InboxItem["status"], string> = {
  new: "bg-red-500",
  pending: "bg-amber-400",
  "dealt-with": "bg-emerald-500",
}

export function InboxPreview() {
  const items = inboxItems

  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Inbox</h3>
        <Button variant="link" size="sm" className="text-xs px-0 h-auto">
          View all
          <ArrowRight className="size-3 ml-1" />
        </Button>
      </div>

      {/* Inbox rows */}
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-muted/50 transition-colors"
          >
            <div
              className={`size-2 rounded-full shrink-0 ${statusDotColor[item.status]}`}
            />
            <span className="text-sm font-medium flex-1 min-w-0 truncate">
              {item.patientName}
            </span>
            <span className="text-sm text-muted-foreground truncate">
              {item.visitType}
            </span>
            <span className="text-xs text-muted-foreground shrink-0 ml-2">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
