import { Skeleton } from "@/components/ui/skeleton"
import { ProductSellPage } from "@/components/products/ProductSellPage"
import { useHome } from "@/context/HomeContext"
import { useNavigate } from "@/lib/router"

export function BrandedDirectoryPage() {
  const { activatedProducts } = useHome()
  const navigate = useNavigate()
  const isActivated = activatedProducts.has("practice-solutions")

  if (!isActivated) {
    return (
      <ProductSellPage
        title="Practice Solutions"
        tagline="Increase website conversions"
        description="Branded booking on your website plus an AI phone assistant. Own your patient experience with your brand, your rules."
        valueProps={[
          "Embed Zocdoc scheduling on your website with your branding",
          "AI phone assistant answers calls 24/7 — booking, rescheduling, and FAQs",
          "Advanced scheduling rules and patient targeting",
          "Practices see up to 2x higher conversion from website visitors",
        ]}
        pricing="Per provider, per month"
        pricingDetail="Flat monthly fee for each provider you include. Includes branded booking page, AI phone assistant, and advanced scheduling."
        ctaLabel="Activate Practice Solutions"
        onActivate={() => {
          navigate("/dashboard/products/practice-solutions/onboarding")
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
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 flex flex-col gap-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}
