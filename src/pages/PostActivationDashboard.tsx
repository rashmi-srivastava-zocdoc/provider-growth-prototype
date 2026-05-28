import { useState } from "react"
import { ArrowRight, ChevronUp, ChevronDown, ImageIcon, ChevronRight, ClipboardList, CalendarDays, Eye, Info } from "lucide-react"
import { useNavigate } from "@/lib/router"

const attentionTasks = [
  {
    id: 1,
    label: "2 provider profiles are incomplete",
    cta: "Complete profiles",
  },
  {
    id: 2,
    label: "5 providers need to be connected to Google",
    cta: "Connect now",
  },
]

const firstBookingTasks = [
  { id: 1, label: "Set up patient intake forms", icon: ClipboardList },
  { id: 2, label: "Customize the visits you accept", icon: CalendarDays },
  { id: 3, label: "Preview what happens when you get a booking", icon: Eye },
]

export function PostActivationDashboard() {
  const navigate = useNavigate()
  const [attentionOpen, setAttentionOpen] = useState(true)

  return (
    <div className="max-w-[1100px] mx-auto w-full py-8 px-4">

      {/* Welcome back header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1b2228]">Riverdale Medical Group</h1>
        <p className="text-sm text-[rgba(51,51,51,0.5)] mt-1">
          Your practice is live on 30+ channels. Here's what needs your attention.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">

          {/* Actions need attention */}
          <div className="rounded-xl border border-[rgba(47,40,28,0.1)] bg-white">
            <button
              onClick={() => setAttentionOpen(!attentionOpen)}
              className="flex items-center justify-between w-full px-6 py-5 bg-transparent border-none cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center size-7 rounded-full bg-[#ea580c] text-xs font-semibold text-white">
                  {attentionTasks.length}
                </span>
                <span className="text-base font-semibold text-[#1b2228]">
                  {attentionTasks.length} actions need attention
                </span>
              </div>
              {attentionOpen ? (
                <ChevronUp className="size-5 text-[rgba(51,51,51,0.4)]" />
              ) : (
                <ChevronDown className="size-5 text-[rgba(51,51,51,0.4)]" />
              )}
            </button>

            {attentionOpen && (
              <div className="flex flex-col">
                {attentionTasks.map((task) => (
                  <button
                    key={task.id}
                    className="flex items-center justify-between px-6 py-4 border-t border-[rgba(47,40,28,0.08)] bg-transparent cursor-pointer text-left hover:bg-[rgba(47,40,28,0.02)] transition-colors"
                  >
                    <span className="text-sm text-[#1b2228]">{task.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#1b2228]">{task.cta}</span>
                      <ChevronRight className="size-4 text-[rgba(51,51,51,0.3)]" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Get ready for your first booking */}
          <div className="rounded-xl border border-[rgba(47,40,28,0.1)] bg-white">
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-base font-semibold text-[#1b2228]">Get ready for your first booking</h2>
              <p className="text-sm text-[rgba(51,51,51,0.5)] mt-0.5">
                These steps help you make the most of every patient interaction
              </p>
            </div>
            <div className="flex flex-col">
              {firstBookingTasks.map((task) => {
                const Icon = task.icon
                return (
                  <button
                    key={task.id}
                    className="flex items-center justify-between px-6 py-4 border-t border-[rgba(47,40,28,0.08)] bg-transparent cursor-pointer text-left hover:bg-[rgba(47,40,28,0.02)] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center size-10 rounded-lg bg-[rgba(47,40,28,0.04)]">
                        <Icon className="size-5 text-[rgba(51,51,51,0.4)]" />
                      </span>
                      <span className="text-sm font-medium text-[#1b2228]">{task.label}</span>
                    </div>
                    <ChevronRight className="size-4 text-[rgba(51,51,51,0.3)]" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Grow your practice */}
          <div className="rounded-xl border border-[rgba(47,40,28,0.1)] bg-white">
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-base font-semibold text-[#1b2228]">Grow your practice with Zocdoc</h2>
              <p className="text-sm text-[rgba(51,51,51,0.5)] mt-0.5">
                After you launch, explore products to reach more patients and save your team time.
              </p>
            </div>
            <div className="flex gap-4 px-6 pb-6">
              <div className="flex-1 rounded-lg border border-[rgba(47,40,28,0.08)] p-5">
                <span className="text-xs font-semibold text-[#16a34a]">Reach more patients</span>
                <h3 className="text-base font-semibold text-[#1b2228] mt-1 mb-1">Marketplace</h3>
                <p className="text-xs text-[rgba(51,51,51,0.5)] leading-relaxed mb-4">
                  Get discovered by 30M+ patients on Zocdoc and premium partner sites.
                </p>
                <button
                  onClick={() => navigate("/marketplace-activate")}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#FEED5A] text-xs font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
                >
                  Activate
                  <ArrowRight className="size-3" />
                </button>
              </div>
              <div className="flex-1 rounded-lg border border-[rgba(47,40,28,0.08)] p-5">
                <span className="text-xs font-semibold text-[#d97706]">Increase website conversions</span>
                <h3 className="text-base font-semibold text-[#1b2228] mt-1 mb-1">Practice Solutions</h3>
                <p className="text-xs text-[rgba(51,51,51,0.5)] leading-relaxed mb-4">
                  Branded booking on your website plus an AI phone assistant.
                </p>
                <button
                  onClick={() => navigate("/practice-solutions-activate")}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#FEED5A] text-xs font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
                >
                  Activate
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right column — Performance */}
        <div className="w-[340px] flex-shrink-0">
          <div className="rounded-xl border border-[rgba(47,40,28,0.1)] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1b2228] mb-5">Performance overview</h2>

            {/* Total bookings */}
            <p className="text-5xl font-bold text-[#1b2228] leading-none mb-1">734</p>
            <p className="text-sm font-medium text-[#1b2228]">Total bookings this month</p>
            <p className="text-xs text-[rgba(51,51,51,0.5)] mt-0.5 mb-6">
              Compared to <span className="font-semibold text-[#1b2228]">895 bookings</span> this time last month
            </p>

            {/* Bookings by patient type */}
            <h3 className="text-base font-semibold text-[#1b2228] mb-3">Bookings by patient type</h3>
            <div className="h-3 rounded-full overflow-hidden flex mb-4">
              <div className="h-full bg-[#FEED5A]" style={{ width: "60%" }} />
              <div className="h-full bg-[#60bfe8]" style={{ width: "40%" }} />
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#FEED5A]" />
                <span className="text-sm text-[#1b2228]">New patients</span>
                <Info className="size-3.5 text-[rgba(51,51,51,0.3)]" />
              </div>
              <span className="text-sm">
                <span className="font-semibold text-[#1b2228]">443</span>
                <span className="text-[rgba(51,51,51,0.5)]"> (60%)</span>
              </span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#60bfe8]" />
                <span className="text-sm text-[#1b2228]">Existing patients</span>
                <Info className="size-3.5 text-[rgba(51,51,51,0.3)]" />
              </div>
              <span className="text-sm">
                <span className="font-semibold text-[#1b2228]">291</span>
                <span className="text-[rgba(51,51,51,0.5)]"> (40%)</span>
              </span>
            </div>

            <button className="w-full h-10 rounded-full border border-[rgba(47,40,28,0.15)] bg-white text-sm font-medium text-[#1b2228] cursor-pointer hover:bg-[rgba(47,40,28,0.03)] transition-colors">
              View more performance details
            </button>

            {/* Divider */}
            <div className="border-t border-[rgba(47,40,28,0.08)] my-6" />

            {/* Total reviews */}
            <p className="text-4xl font-bold text-[#1b2228] leading-none mb-1">6317</p>
            <p className="text-sm font-medium text-[#1b2228] mb-3">Total reviews</p>
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium text-[#1b2228] underline bg-transparent border-none cursor-pointer p-0">
                Request reviews
              </button>
              <span className="text-[rgba(51,51,51,0.2)]">|</span>
              <button className="text-sm font-medium text-[#1b2228] underline bg-transparent border-none cursor-pointer p-0">
                View all reviews
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
