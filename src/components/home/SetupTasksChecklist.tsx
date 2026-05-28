import { Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { todoItems } from "@/data/homeData"

export function SetupTasksChecklist() {
  const setupItems = todoItems.filter((t) => t.urgency === "setup")

  if (setupItems.length === 0) return null

  return (
    <div className="rounded-xl border bg-card">
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-sm font-semibold">Before your first booking</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {setupItems.length} remaining
        </p>
      </div>

      <div className="divide-y">
        {setupItems.map((item) => (
          <div key={item.id} className="flex items-start gap-3 px-5 py-4">
            <Circle className="size-4 text-muted-foreground/40 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{item.title}</p>
              {item.description && (
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              {item.actionLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
