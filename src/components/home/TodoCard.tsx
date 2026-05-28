import { useState } from "react"
import { ChevronDown, ChevronRight, ClipboardList, CalendarCheck, Eye, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { useHome } from "@/context/HomeContext"
import { useNavigate } from "@/lib/router"
import { todoItems } from "@/data/homeData"

const attentionIds = ["todo-gbp", "todo-profiles"]
const excludeFromSetup = ["todo-reviews"]

const setupIcons: Record<string, LucideIcon> = {
  "todo-intake": ClipboardList,
  "todo-visits": CalendarCheck,
  "todo-preview": Eye,
}

function AttentionItems() {
  const [open, setOpen] = useState(true)
  const items = todoItems.filter((t) => attentionIds.includes(t.id))

  if (items.length === 0) return null

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-xl border border-amber-200/60 bg-amber-50/30 dark:border-amber-900/30 dark:bg-amber-950/10 overflow-hidden">
        <CollapsibleTrigger className="flex w-full items-center gap-3 px-5 py-4 text-left cursor-pointer hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-colors">
          <span className="flex items-center justify-center size-5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-xs font-semibold text-amber-700 dark:text-amber-300">
            {items.length}
          </span>
          <span className="flex-1 text-sm font-semibold">
            {items.length === 1 ? "1 action needs attention" : `${items.length} actions need attention`}
          </span>
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="divide-y divide-amber-200/40 dark:divide-amber-900/20">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3.5 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.title}</p>
                  {item.description && (
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                <Button variant="outline" size="sm" className="shrink-0 bg-white dark:bg-background">
                  {item.actionLabel}
                </Button>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export function TodoCard() {
  const { postPhase } = useHome()
  const navigate = useNavigate()
  const isJustLaunched = postPhase === "just-launched"

  const setupItems = todoItems.filter(
    (t) =>
      !attentionIds.includes(t.id) &&
      !excludeFromSetup.includes(t.id) &&
      t.type !== "action"
  )

  const previewItem = isJustLaunched
    ? { id: "todo-preview", title: "Preview what happens when you get a booking" }
    : null

  const allItems = previewItem
    ? [...setupItems, previewItem]
    : setupItems

  return (
    <div className="flex flex-col gap-3">
      <AttentionItems />

      {isJustLaunched && allItems.length > 0 && (
        <div className="rounded-xl border bg-card">
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-lg font-semibold">Get ready for your first booking</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              These steps help you make the most of every patient interaction
            </p>
          </div>

          <div className="divide-y">
            {allItems.map((item) => {
              const Icon = setupIcons[item.id]
              return (
                <button
                  key={item.id}
                  onClick={item.id === "todo-preview" ? () => navigate("/inbox") : undefined}
                  className="flex w-full items-center gap-3.5 px-6 py-4 text-left cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {Icon && (
                    <div className="flex items-center justify-center size-9 rounded-lg bg-muted/60 shrink-0">
                      <Icon className="size-4.5 text-muted-foreground" />
                    </div>
                  )}
                  <span className="flex-1 text-sm font-semibold">{item.title}</span>
                  <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
