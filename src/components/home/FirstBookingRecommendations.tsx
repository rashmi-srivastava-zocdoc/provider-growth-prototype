import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "@/lib/router"

interface Recommendation {
  id: string
  badge?: string
  badgeColor?: string
  title: string
  description: string
  actionLabel: string
  path?: string
}

const recommendations: Recommendation[] = [
  {
    id: "rec-share-link",
    badge: "Quick win",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800",
    title: "Share your booking link on your website and social media",
    description:
      "Patients who already know your practice can book directly. Add your link to your website, Instagram bio, or email signature.",
    actionLabel: "Copy booking link",
  },
  {
    id: "rec-marketplace",
    badge: "+ 30M patients",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800",
    title: "Get in front of patients actively searching for care",
    description:
      "Marketplace puts your providers on Zocdoc, Healthgrades, and Yelp — where 30M patients search each month. You only pay when a new patient books.",
    actionLabel: "Explore Marketplace",
    path: "/dashboard/products/marketplace",
  },
  {
    id: "rec-practice-solutions",
    badge: "2x conversion",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800",
    title: "Convert more visitors and calls with Practice Solutions",
    description:
      "Branded booking on your website plus an AI phone assistant. Patients see your brand, your rules — practices see up to 2x higher conversion.",
    actionLabel: "Explore Practice Solutions",
    path: "/dashboard/products/practice-solutions",
  },
  {
    id: "rec-reviews",
    badge: "3x more bookings",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
    title: "Boost your profiles with reviews",
    description:
      "Providers with 10+ reviews get 3x more bookings. Send review requests to recent patients.",
    actionLabel: "Request reviews",
  },
]

export function FirstBookingRecommendations() {
  const navigate = useNavigate()
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visible = recommendations.filter((r) => !dismissed.has(r.id))

  if (visible.length === 0) return null

  return (
    <div className="rounded-xl border bg-card">
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-lg font-semibold">Performance recommendations</h2>
      </div>

      <div className="divide-y">
        {visible.map((rec) => (
          <div key={rec.id} className="px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold flex items-center gap-2">
                  {rec.title}
                  {rec.badge && (
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${rec.badgeColor}`}
                    >
                      {rec.badge}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {rec.description}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() =>
                    setDismissed((prev) => new Set([...prev, rec.id]))
                  }
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  No thanks
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => rec.path && navigate(rec.path)}
                >
                  {rec.actionLabel}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
