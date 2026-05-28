import { BarChart3, Star } from "lucide-react"
import { recommendationsVision } from "@/data/homeData"
import { Button } from "@/components/ui/button"

const iconMap: Record<string, typeof BarChart3> = {
  "⭐": Star,
  "📈": BarChart3,
}

export function RecommendationsVision() {
  const items = recommendationsVision

  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium">Recommended for you</h3>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const Icon = iconMap[item.illustration] ?? BarChart3

          return (
            <div
              key={item.id}
              className="rounded-xl border bg-muted/30 p-4 flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-muted shrink-0">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">{item.title}</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                {/* Investment + Impact pills */}
                <div className="flex items-center gap-2">
                  {item.investment && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                      &#9200; {item.investment}
                    </span>
                  )}
                  {item.impact && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                      &#128200; {item.impact}
                    </span>
                  )}
                </div>

                <Button
                  size="sm"
                  className="rounded-full bg-[#FEED5A] text-black hover:bg-[#FEED5A]/80 border-0"
                >
                  {item.actionLabel}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
