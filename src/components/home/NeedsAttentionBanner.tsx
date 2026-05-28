import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHome } from "@/context/HomeContext"
import { todoItems } from "@/data/homeData"

export function NeedsAttentionBanner() {
  const { postPhase } = useHome()

  const items =
    postPhase === "just-launched"
      ? todoItems.filter((t) => t.id === "todo-gbp")
      : todoItems.filter((t) => t.urgency === "attention")

  if (items.length === 0) return null

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20 px-5 py-4"
        >
          <AlertCircle className="size-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{item.title}</p>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-0.5">
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
  )
}
