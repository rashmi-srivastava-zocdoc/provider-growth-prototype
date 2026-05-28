import { ArrowRight, ImageIcon } from "lucide-react"
import { useNavigate } from "@/lib/router"

const products = [
  {
    tag: "Reach more patients",
    tagColor: "#16a34a",
    name: "Marketplace",
    description: "Get discovered by 30M+ patients actively searching for care on Zocdoc and premium partner sites like Yelp and Healthgrades.",
    pricingTitle: "Pay per new patient booking",
    pricingDesc: "Only pay when a new patient books with you",
    cta: "Activate Marketplace",
  },
  {
    tag: "Increase website conversions",
    tagColor: "#d97706",
    name: "Practice Solutions",
    description: "Branded booking on your website plus an AI phone assistant. Own your patient experience with your brand, your rules.",
    pricingTitle: "Per provider, per month",
    pricingDesc: "Flat monthly fee for each provider you include",
    cta: "Activate Practice Solutions",
  },
]

export function UpsellPage() {
  const navigate = useNavigate()
  const showLiveBanner = new URLSearchParams(window.location.search).has("live")

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-16">
      {showLiveBanner && (
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-sm">🎉</span>
          <span className="text-sm font-semibold text-[#16a34a]">Your practice is live</span>
        </div>
      )}

      <h1 className="text-3xl font-bold text-[#1b2228] mb-3 text-center">
        What do you want to do next?
      </h1>
      <p className="text-sm text-[rgba(51,51,51,0.5)] text-center max-w-[480px] mb-10">
        Your providers are bookable on 30+ channels. Add products to reach more patients and grow your practice.
      </p>

      <div className="flex gap-5 mb-10">
        {products.map((product) => (
          <div
            key={product.name}
            className="w-[320px] rounded-xl border border-[rgba(47,40,28,0.08)] bg-[rgba(47,40,28,0.015)] flex flex-col"
          >
            {/* Image placeholder */}
            <div className="h-[180px] rounded-t-xl bg-[rgba(47,40,28,0.04)] flex items-center justify-center">
              <ImageIcon className="size-10 text-[rgba(51,51,51,0.15)]" />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <span
                className="text-xs font-semibold mb-2 self-start"
                style={{ color: product.tagColor }}
              >
                {product.tag}
              </span>
              <h3 className="text-lg font-bold text-[#1b2228] mb-2">{product.name}</h3>
              <p className="text-sm text-[rgba(51,51,51,0.6)] leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Pricing */}
              <div className="rounded-lg bg-[rgba(47,40,28,0.03)] border border-[rgba(47,40,28,0.06)] px-4 py-3 mb-5">
                <p className="text-sm font-semibold text-[#1b2228]">{product.pricingTitle}</p>
                <p className="text-xs text-[rgba(51,51,51,0.5)]">{product.pricingDesc}</p>
              </div>

              <div className="mt-auto flex flex-col items-center gap-3">
                <button
                  onClick={() => {
                    if (product.name === "Marketplace") {
                      navigate("/marketplace-activate")
                    } else if (product.name === "Practice Solutions") {
                      navigate("/practice-solutions-activate")
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-full bg-[#FEED5A] text-sm font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
                >
                  {product.cta}
                  <ArrowRight className="size-3.5" />
                </button>
                <button className="text-sm font-medium text-[#1b2228] underline bg-transparent border-none cursor-pointer">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/dashboard/post-activation")}
        className="text-sm font-medium text-[rgba(51,51,51,0.6)] underline bg-transparent border-none cursor-pointer"
      >
        I'll do this later
      </button>
    </div>
  )
}
