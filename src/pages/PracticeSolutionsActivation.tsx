import { ArrowRight, ImageIcon, Phone, Globe, Bot, BarChart3 } from "lucide-react"
import { useNavigate } from "@/lib/router"

const features = [
  {
    icon: Globe,
    title: "Branded booking page",
    description: "A custom booking page on your own website that matches your brand and lets patients book 24/7.",
  },
  {
    icon: Bot,
    title: "AI phone assistant",
    description: "An AI-powered phone assistant that answers calls, schedules appointments, and handles patient inquiries.",
  },
  {
    icon: BarChart3,
    title: "Performance analytics",
    description: "Track website conversions, call volume, and booking trends to understand what's working.",
  },
]

export function PracticeSolutionsActivation() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold text-[#1b2228] mb-2">
          Activate Practice Solutions
        </h1>
        <p className="text-sm text-[rgba(51,51,51,0.6)] mb-10">
          Own your patient experience with branded booking and an AI phone assistant.
        </p>

        {/* What's included */}
        <h2 className="text-lg font-semibold text-[#1b2228] mb-4">What's included</h2>
        <div className="flex gap-4 mb-10">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex-1 rounded-xl border border-[rgba(47,40,28,0.08)] bg-white p-5"
              >
                <span className="flex items-center justify-center size-10 rounded-lg bg-[rgba(47,40,28,0.04)] mb-3">
                  <Icon className="size-5 text-[rgba(51,51,51,0.5)]" />
                </span>
                <h3 className="text-sm font-semibold text-[#1b2228] mb-1">{feature.title}</h3>
                <p className="text-xs text-[rgba(51,51,51,0.5)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Pricing */}
        <div className="rounded-xl border border-[rgba(47,40,28,0.08)] bg-[rgba(47,40,28,0.015)] p-6 mb-10">
          <h2 className="text-lg font-semibold text-[#1b2228] mb-1">Pricing</h2>
          <p className="text-sm text-[rgba(51,51,51,0.6)] leading-relaxed">
            Practice Solutions is billed as a flat monthly fee per provider you include. Your dedicated account manager will walk you through pricing options tailored to your practice size and needs.
          </p>
        </div>

        {/* Schedule a call card */}
        <div className="rounded-xl border border-[rgba(47,40,28,0.08)] bg-[rgba(47,40,28,0.015)] p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📞</span>
            <h2 className="text-lg font-semibold text-[#1b2228]">
              Get dedicated 1:1 support from Zocdoc
            </h2>
          </div>
          <p className="text-sm text-[rgba(51,51,51,0.6)] leading-relaxed mb-6 max-w-[520px]">
            Our helpful team will walk you through selecting the right products for your practice, setting up your account, and answer any questions you may have.
          </p>
          <button className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full border border-[rgba(47,40,28,0.2)] bg-white text-sm font-semibold text-[#1b2228] cursor-pointer hover:bg-[rgba(47,40,28,0.03)] transition-colors">
            Schedule a call
          </button>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/dashboard/post-activation")}
            className="text-sm font-medium text-[rgba(51,51,51,0.6)] underline bg-transparent border-none cursor-pointer"
          >
            Back to dashboard
          </button>
        </div>

    </div>
  )
}
