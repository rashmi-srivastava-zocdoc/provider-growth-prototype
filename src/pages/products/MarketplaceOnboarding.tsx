import { ArrowRight } from "lucide-react"
import { useHome } from "@/context/HomeContext"
import { useNavigate } from "@/lib/router"

export function MarketplaceOnboardingPage() {
  const { activateProduct } = useHome()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12">
          <p className="text-lg font-semibold text-muted-foreground">
            Here goes Marketplace onboarding flow
          </p>
          <p className="mt-2 text-sm text-muted-foreground/70">
            Pricing selection, account setup, payment info, etc.
          </p>
        </div>

        <button
          onClick={() => {
            activateProduct("marketplace")
            navigate("/dashboard/products/marketplace/performance")
          }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#FEED5A] px-8 text-base font-semibold text-gray-900 transition-colors hover:bg-[#fde84a] cursor-pointer"
        >
          Activate Marketplace
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
