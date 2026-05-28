import { Skeleton } from "@/components/ui/skeleton"
import { ProductSellPage } from "@/components/products/ProductSellPage"
import { useHome } from "@/context/HomeContext"
import { useNavigate } from "@/lib/router"

export function MarketplacePage() {
  const { activatedProducts } = useHome()
  const navigate = useNavigate()
  const isActivated = activatedProducts.has("marketplace")

  if (!isActivated) {
    return (
      <ProductSellPage
        title="Marketplace"
        tagline="Reach more patients"
        description="Get discovered by 30M+ patients actively searching for care on Zocdoc and premium partner sites like Yelp and Healthgrades."
        valueProps={[
          "Appear on Zocdoc, Yelp, Healthgrades, and premium partner sites",
          "Only pay when a new patient books — no subscription fees",
          "Boost visibility with Sponsored Results for same/next-day openings",
          "30M+ monthly patients actively searching for care",
        ]}
        pricing="Pay per new patient booking"
        pricingDetail="No monthly fee — you're only charged when a new patient books through Marketplace. Rates vary by specialty and market."
        ctaLabel="Activate Marketplace"
        onActivate={() => {
          navigate("/dashboard/products/marketplace/onboarding")
        }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-56 rounded-md" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-lg" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3.5 w-48" />
              </div>
            </div>
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
