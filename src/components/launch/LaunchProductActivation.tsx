import { ArrowRight, Sparkles, ImageIcon } from "lucide-react"

interface ProductActivationCardProps {
  tag: string
  title: string
  description: string
  pricing: string
  pricingDetail: string
  onActivate: () => void
  onLearnMore: () => void
}

function ProductActivationCard({
  tag,
  title,
  description,
  pricing,
  pricingDetail,
  onActivate,
  onLearnMore,
}: ProductActivationCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border bg-white shadow-sm overflow-hidden">
      {/* Placeholder image */}
      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
        <ImageIcon className="size-10 text-gray-300" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Value tag */}
        <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
          {tag}
        </span>

        <h3 className="mt-3 text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
          {description}
        </p>

        <div className="mt-4 rounded-lg bg-gray-50 px-3 py-2">
          <p className="text-sm font-semibold text-foreground">{pricing}</p>
          <p className="text-xs text-muted-foreground">{pricingDetail}</p>
        </div>

        <div className="mt-5 flex flex-col items-center gap-2">
          <button
            onClick={onActivate}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#FEED5A] text-sm font-semibold text-gray-900 transition-colors hover:bg-[#fde84a] cursor-pointer"
          >
            Activate {title}
            <ArrowRight className="size-4" />
          </button>
          <button
            onClick={onLearnMore}
            className="text-sm font-medium text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  )
}

export function LaunchProductActivation({
  onActivate,
  onSkip,
}: {
  onActivate: (productPath: string) => void
  onSkip: () => void
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Sparkles className="size-3" />
            Your practice is live
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
            What do you want to do next?
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            Your providers are bookable on 30+ channels. Add products to reach
            more patients and grow your practice.
          </p>
        </div>

        {/* Product cards */}
        <div className="mt-10 grid grid-cols-2 gap-5">
          <ProductActivationCard
            tag="Reach more patients"
            title="Marketplace"
            description="Get discovered by 30M+ patients actively searching for care on Zocdoc and premium partner sites like Yelp and Healthgrades."
            pricing="Pay per new patient booking"
            pricingDetail="Only pay when a new patient books with you"
            onActivate={() =>
              onActivate("/dashboard/products/marketplace/onboarding")
            }
            onLearnMore={() =>
              onActivate("/dashboard/products/marketplace")
            }
          />
          <ProductActivationCard
            tag="Increase website conversions"
            title="Practice Solutions"
            description="Branded booking on your website plus an AI phone assistant. Own your patient experience with your brand, your rules."
            pricing="Per provider, per month"
            pricingDetail="Flat monthly fee for each provider you include"
            onActivate={() =>
              onActivate("/dashboard/products/practice-solutions/onboarding")
            }
            onLearnMore={() =>
              onActivate("/dashboard/products/practice-solutions")
            }
          />
        </div>

        {/* Skip link */}
        <div className="mt-8 text-center">
          <button
            onClick={onSkip}
            className="text-sm font-medium text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
          >
            I'll do this later
          </button>
        </div>
      </div>
    </div>
  )
}
