import { Check, ArrowRight } from "lucide-react"
import { productExploreCards, type ProductExploreCard } from "@/data/homeData"
import { usePracticeSolutionsMode } from "@/context/ZoModeContext"
import { useNavigate } from "@/lib/router"

const productPaths: Record<string, string> = {
  marketplace: "/dashboard/products/marketplace",
  practice_solutions: "/dashboard/products/practice-solutions",
}

function ExploreCard({ card, onNavigate }: { card: ProductExploreCard; onNavigate: () => void }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <span className="inline-flex items-center rounded-full bg-amber-100/80 dark:bg-amber-900/30 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
        {card.tag}
      </span>

      <h3 className="mt-3 text-xl font-semibold">{card.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{card.hook}</p>

      <button
        onClick={onNavigate}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:text-muted-foreground transition-colors cursor-pointer"
      >
        {card.actionLabel}
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  )
}

export function ProductExploreCards() {
  const { practiceSolutionsEnabled } = usePracticeSolutionsMode()
  const navigate = useNavigate()
  const cards = practiceSolutionsEnabled ? productExploreCards : productExploreCards.filter((c) => c.productId !== "practice_solutions")

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold">Scale your growth with add-on products</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          You can add or remove these products at any time.
        </p>
      </div>
      <div className="space-y-4">
        {cards.map((card) => (
          <ExploreCard
            key={card.id}
            card={card}
            onNavigate={() => {
              const path = productPaths[card.productId]
              if (path) navigate(path)
            }}
          />
        ))}
      </div>
    </div>
  )
}
