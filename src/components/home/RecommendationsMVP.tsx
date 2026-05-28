import { ArrowRight } from "lucide-react"
import { productExploreCards } from "@/data/homeData"
import { usePracticeSolutionsMode } from "@/context/ZoModeContext"
import { useNavigate } from "@/lib/router"

const productPaths: Record<string, string> = {
  marketplace: "/dashboard/products/marketplace",
  practice_solutions: "/dashboard/products/practice-solutions",
}

export function RecommendationsMVP() {
  const { practiceSolutionsEnabled } = usePracticeSolutionsMode()
  const navigate = useNavigate()
  const cards = practiceSolutionsEnabled ? productExploreCards : productExploreCards.filter((c) => c.productId !== "practice_solutions")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold">Ways to grow</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Add products to reach more patients and save your team time
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-xl border bg-card p-5 flex flex-col"
          >
            <span className="inline-flex self-start rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {card.tag}
            </span>
            <h3 className="mt-1.5 text-sm font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
              {card.hook}
            </p>
            <button
              onClick={() => {
                const path = productPaths[card.productId]
                if (path) navigate(path)
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:text-muted-foreground transition-colors self-start cursor-pointer"
            >
              {card.actionLabel}
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
