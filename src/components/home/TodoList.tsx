import { Button } from "@/components/ui/button"
import { todoItems } from "@/data/homeData"

export function TodoList() {
  return (
    <div className="rounded-xl border bg-card divide-y">
      {todoItems.map((item) => (
        <div key={item.id} className="flex items-start gap-4 p-5">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{item.title}</p>
            {item.description && (
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
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
