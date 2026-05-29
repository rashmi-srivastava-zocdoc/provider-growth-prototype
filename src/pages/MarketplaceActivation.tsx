import { useState } from "react"
import { ArrowRight, Check, Search, Users, TrendingUp, CreditCard, ChevronRight } from "lucide-react"
import { useNavigate } from "@/lib/router"

const features = [
  {
    icon: Search,
    title: "Get found by patients",
    description: "Your providers appear in search results when 30M+ patients search for care on Zocdoc and premium partner sites like Yelp and Healthgrades.",
  },
  {
    icon: Users,
    title: "Attract new patients",
    description: "Only pay when a new patient books with you. Existing patients book for free — no booking fees, no subscription costs.",
  },
  {
    icon: TrendingUp,
    title: "Track your performance",
    description: "See how many bookings you're getting, which providers are most popular, and how your practice is growing.",
  },
]

const activationTasks = [
  { id: 1, label: "Set up billing information", description: "Add a payment method so you can be charged when new patients book." },
  { id: 2, label: "Review and accept pricing terms", description: "Review our one-time booking fee policy and confirm you agree." },
]

export function MarketplaceActivation() {
  const navigate = useNavigate()
  const [completedTasks, setCompletedTasks] = useState<number[]>([])

  const allDone = completedTasks.length === activationTasks.length

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold text-[#1b2228] mb-2">
          Activate Zocdoc Marketplace
        </h1>
        <p className="text-sm text-[rgba(51,51,51,0.6)] mb-10">
          Get discovered by millions of patients actively searching for care.
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
            There are no upfront fees or subscription costs. You're only charged a one-time booking fee when a new patient books an appointment with you. Existing patient bookings are always free.
          </p>
        </div>

        {/* Activation tasks */}
        <h2 className="text-lg font-semibold text-[#1b2228] mb-4">Complete to activate</h2>
        <div className="flex flex-col gap-3 mb-8">
          {activationTasks.map((task) => {
            const isDone = completedTasks.includes(task.id)
            return (
              <button
                key={task.id}
                onClick={() => {
                  if (!isDone) {
                    setCompletedTasks([...completedTasks, task.id])
                  }
                }}
                className="flex items-center justify-between rounded-xl border border-[rgba(47,40,28,0.08)] bg-white px-6 py-5 cursor-pointer text-left hover:bg-[rgba(47,40,28,0.02)] transition-colors"
              >
                <div className="flex items-center gap-4">
                  {isDone ? (
                    <span className="flex items-center justify-center size-8 rounded-full bg-[#16a34a]">
                      <Check className="size-4 text-white" strokeWidth={2.5} />
                    </span>
                  ) : (
                    <span className="flex items-center justify-center size-8 rounded-full bg-[rgba(47,40,28,0.04)]">
                      <CreditCard className="size-4 text-[rgba(51,51,51,0.4)]" />
                    </span>
                  )}
                  <div>
                    <p className={`text-sm font-semibold ${isDone ? "text-[rgba(51,51,51,0.4)]" : "text-[#1b2228]"}`}>
                      {task.label}
                    </p>
                    <p className="text-xs text-[rgba(51,51,51,0.5)] mt-0.5">{task.description}</p>
                  </div>
                </div>
                {isDone ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#f0fdf4] text-xs font-medium text-[#16a34a]">
                    Complete
                  </span>
                ) : (
                  <ChevronRight className="size-4 text-[rgba(51,51,51,0.3)]" />
                )}
              </button>
            )
          })}
        </div>

        {/* Activate button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/post-activation")}
            disabled={!allDone}
            className={`inline-flex items-center gap-1.5 h-10 px-5 rounded-full text-sm font-semibold cursor-pointer border-none transition-colors ${
              allDone
                ? "bg-[#FEED5A] text-[#333] hover:bg-[#fde84a]"
                : "bg-[rgba(47,40,28,0.08)] text-[rgba(51,51,51,0.35)] cursor-not-allowed"
            }`}
          >
            Activate Marketplace
            <ArrowRight className="size-3.5" />
          </button>
          <button
            onClick={() => navigate("/dashboard/post-activation")}
            className="text-sm font-medium text-[rgba(51,51,51,0.6)] bg-transparent border-none cursor-pointer underline"
          >
            Back to dashboard
          </button>
        </div>

    </div>
  )
}
