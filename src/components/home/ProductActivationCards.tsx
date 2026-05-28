import { useState } from "react"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  productCards,
  productCardsPostActivation,
  type ProductCard,
} from "@/data/homeData"

interface ProductActivationCardsProps {
  postActivation?: boolean
}

function PriceBadge({ price }: { price: string }) {
  const isPaid = price === "PAID"
  return (
    <Badge
      variant="secondary"
      className={
        isPaid
          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-0 text-[10px] font-semibold"
          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-0 text-[10px] font-semibold"
      }
    >
      {price}
    </Badge>
  )
}

function DoneBadge() {
  return (
    <Badge
      variant="secondary"
      className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-0"
    >
      <Check className="size-3" />
      Done
    </Badge>
  )
}

function ProductIllustration({ emoji }: { emoji: string }) {
  return (
    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/20 text-2xl">
      {emoji}
    </div>
  )
}

export function ProductActivationCards({
  postActivation = false,
}: ProductActivationCardsProps) {
  const cards = postActivation ? productCardsPostActivation : productCards
  const subtitle = postActivation
    ? "Manage your active products or add new ones at any time."
    : "Complete the account setup tasks above to activate your practice on Zocdoc."

  const [sectionOpen, setSectionOpen] = useState(!postActivation)

  return (
    <div className="rounded-xl border bg-card/50">
      <button
        onClick={() => setSectionOpen(!sectionOpen)}
        className="flex w-full items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <div>
          <h2 className="font-semibold">
            {postActivation ? "Your products" : "Start seeing patients"}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
        {sectionOpen ? (
          <ChevronUp className="size-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {sectionOpen && (
        <div className="px-5 pb-5 space-y-3">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="flex items-start gap-4 rounded-xl border bg-card p-4"
            >
              <ProductIllustration emoji={card.illustration} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{card.title}</span>
                  <PriceBadge price={card.price} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  {card.status === "done" ? (
                    <DoneBadge />
                  ) : (
                    <button className="inline-flex items-center gap-1.5 rounded-full bg-[#FEED5A] px-4 py-2 text-sm font-medium text-black hover:bg-[#FDE84A] transition-colors">
                      {card.actionLabel}
                      <span className="text-xs">&rsaquo;</span>
                    </button>
                  )}
                  {card.productId === "practice_solutions" &&
                    card.status !== "done" && (
                      <button className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
                        Mark as complete
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
