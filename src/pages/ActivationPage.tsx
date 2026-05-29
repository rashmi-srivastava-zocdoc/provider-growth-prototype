import { useState } from "react"
import { ArrowRight, Check, Search, Globe, TrendingUp, CreditCard, ChevronRight, Copy, Link2, AlertCircle } from "lucide-react"
import { useNavigate } from "@/lib/router"

const features = [
  {
    icon: Search,
    title: "Get found on Google",
    description: "Your providers appear in Google Search and Maps results so patients can book directly from their search.",
  },
  {
    icon: Globe,
    title: "Show up across 30+ channels",
    description: "Your availability is distributed to insurance directories, partner platforms, and health sites automatically.",
  },
  {
    icon: TrendingUp,
    title: "Track your performance",
    description: "See how many bookings you're getting from each channel and how your online presence is growing.",
  },
]

const activationTasks = [
  { id: 1, label: "Verify your provider information", description: "Confirm your providers' details are accurate across all channels." },
  { id: 2, label: "Review and accept terms", description: "Review the bookable presence terms and confirm you agree." },
]

function BookingLinkCard() {
  const [copied, setCopied] = useState(false)
  const bookingUrl = "zocdoc.com/book/riverdale-medical-group"

  function handleCopy() {
    navigator.clipboard.writeText(`https://${bookingUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-[rgba(47,40,28,0.08)] bg-[rgba(47,40,28,0.015)] p-5">
      <p className="text-sm font-semibold text-[#1b2228] mb-1">Your booking link</p>
      <div className="flex items-center gap-2 mt-2">
        <code className="flex-1 flex items-center gap-2 rounded-lg border border-[rgba(47,40,28,0.1)] bg-white px-3 py-2 font-mono text-sm text-[#1b2228]">
          <Link2 className="size-3.5 text-[rgba(51,51,51,0.4)] shrink-0" />
          {bookingUrl}
        </code>
        <button
          onClick={handleCopy}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[rgba(47,40,28,0.12)] bg-white px-3 text-sm font-medium text-[#1b2228] cursor-pointer hover:bg-[rgba(47,40,28,0.03)] transition-colors"
        >
          {copied ? (
            <>
              <Check className="size-4 text-[#16a34a]" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <p className="mt-2.5 text-xs text-[rgba(51,51,51,0.5)] leading-relaxed">
        Share this link on your website, social media, or email signature. You can always find it in Bookable Presence settings.
      </p>
    </div>
  )
}

function GoogleConnectionCard({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] p-5">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-[#d97706]" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#1b2228]">
            3 providers need to be connected to Google
          </p>
          <p className="mt-1 text-sm text-[rgba(51,51,51,0.6)] leading-relaxed">
            Dr. Sarah Chen, Dr. Alex Park, and Dr. James Torres need to be manually linked to their Google Business Profile so patients can book from Search and Maps.
          </p>
          <button
            onClick={onConnect}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#92400e] hover:text-[#78350f] cursor-pointer bg-transparent border-none p-0 transition-colors"
          >
            Connect now
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function ActivationPage() {
  const navigate = useNavigate()
  const [completedTasks, setCompletedTasks] = useState<number[]>([])

  const allDone = completedTasks.length === activationTasks.length

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold text-[#1b2228] mb-2">
        Activate Bookable Presence
      </h1>
      <p className="text-sm text-[rgba(51,51,51,0.6)] mb-10">
        Make it easier for patients to book with your practice on Google and 30+ channels.
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
          Bookable Presence is free. Your availability is distributed across Google and 30+ channels at no cost. All bookings made through your business profile are free.
        </p>
      </div>

      {/* Activation tasks */}
      <h2 className="text-lg font-semibold text-[#1b2228] mb-4">Complete to activate</h2>
      <div className="flex flex-col gap-3 mb-10">
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

      {/* Booking link + Google connection */}
      <h2 className="text-lg font-semibold text-[#1b2228] mb-4">After you activate</h2>
      <div className="flex flex-col gap-4 mb-10">
        <BookingLinkCard />
        <GoogleConnectionCard onConnect={() => navigate("/setup/google-business-profiles")} />
      </div>

      {/* Activate button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/upsell?live")}
          disabled={!allDone}
          className={`inline-flex items-center gap-1.5 h-10 px-5 rounded-full text-sm font-semibold cursor-pointer border-none transition-colors ${
            allDone
              ? "bg-[#FEED5A] text-[#333] hover:bg-[#fde84a]"
              : "bg-[rgba(47,40,28,0.08)] text-[rgba(51,51,51,0.35)] cursor-not-allowed"
          }`}
        >
          Activate Bookable Presence
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
