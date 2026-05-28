import { ArrowRight, Check, ImageIcon } from "lucide-react"

interface ProductSellPageProps {
  title: string
  tagline: string
  description: string
  valueProps: string[]
  pricing: string
  pricingDetail: string
  ctaLabel: string
  onActivate: () => void
}

export function ProductSellPage({
  title,
  tagline,
  description,
  valueProps,
  pricing,
  pricingDetail,
  ctaLabel,
  onActivate,
}: ProductSellPageProps) {
  return (
    <div className="mx-auto max-w-2xl py-12">
      {/* Hero placeholder image */}
      <div className="h-48 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border flex items-center justify-center mb-10">
        <ImageIcon className="size-12 text-gray-300" />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 mb-3">
            {tagline}
          </span>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Value props */}
        <ul className="space-y-3 py-2">
          {valueProps.map((prop) => (
            <li key={prop} className="flex items-start gap-3">
              <Check className="size-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-base">{prop}</span>
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className="rounded-xl border bg-gray-50 px-5 py-4">
          <p className="text-lg font-semibold">{pricing}</p>
          <p className="text-sm text-muted-foreground">{pricingDetail}</p>
        </div>

        {/* CTA */}
        <button
          onClick={onActivate}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#FEED5A] px-8 text-base font-semibold text-gray-900 transition-colors hover:bg-[#fde84a] cursor-pointer"
        >
          {ctaLabel}
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
