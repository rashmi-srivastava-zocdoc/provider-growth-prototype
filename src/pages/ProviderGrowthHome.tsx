import { useState } from "react"
import { ArrowRight, Check, ImageIcon } from "lucide-react"
import { useNavigate } from "@/lib/router"

const setupSteps = [
  {
    step: 1,
    label: "Add your providers",
    description: "Add the providers in your practice so patients can find and book with them on Zocdoc.",
    cta: "Add providers",
  },
  {
    step: 2,
    label: "Verify your identity",
    description: "Confirm you're authorized to manage this practice and its providers. This is a quick, secure check through Stripe that only takes a few minutes.",
    cta: "Start verification",
  },
  {
    step: 3,
    label: "Enter your insurance information",
    description: "Let patients know which insurance plans your practice accepts so they can confirm coverage before booking.",
    cta: "Add insurance",
  },
  {
    step: 4,
    label: "Set up your calendar",
    description: "Connect your calendar so patients can see real-time availability and book appointments directly.",
    cta: "Set up calendar",
  },
  {
    step: 5,
    label: "Start receiving bookings through the Care Access Network",
    description: "Patients will be able to see your availability and book appointments",
    cta: "",
  },
]

export function ProviderGrowthHomePage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="flex flex-col gap-4 max-w-[870px] mx-auto w-full py-8">

      {/* Welcome header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-[#1b2228]">Welcome to Zocdoc</h1>
        <p className="text-sm text-[rgba(51,51,51,0.5)] mt-1">
          Let's get Riverdale Medical Group ready to receive bookings online
        </p>
      </div>

      {/* Setup steps */}
      <div className="flex flex-col gap-2">
        {setupSteps.map((task) => {
          const isComplete = task.step < currentStep
          const isActive = task.step === currentStep
          const isLocked = task.step > currentStep

          if (isComplete) {
            return (
              <div
                key={task.step}
                className="flex items-center justify-between rounded-lg border border-[rgba(47,40,28,0.08)] bg-white px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center size-7 rounded-full bg-[#16a34a]">
                    <Check className="size-4 text-white" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm font-medium text-[#1b2228]">{task.label}</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f0fdf4] text-xs font-medium text-[#16a34a]">
                  Complete
                </span>
              </div>
            )
          }

          if (isActive && task.step === 5) {
            return (
              <div
                key={task.step}
                className="rounded-xl border border-[rgba(47,40,28,0.08)] bg-white px-6 py-5 flex items-center gap-5"
              >
                <span className="text-4xl shrink-0">🚩</span>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[#1b2228]">{task.label}</h3>
                  <p className="text-sm text-[rgba(51,51,51,0.5)] mt-0.5">{task.description}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded text-xs font-medium text-[#4f6bed] bg-[#eef1fd] shrink-0">
                  Processing
                </span>
              </div>
            )
          }

          if (isActive) {
            return (
              <div
                key={task.step}
                className="rounded-xl border border-[rgba(47,40,28,0.08)] bg-white p-6 flex gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center size-7 rounded-full border-2 border-[#1b2228] text-xs font-semibold text-[#1b2228]">
                      {task.step}
                    </span>
                    <h3 className="text-lg font-semibold text-[#1b2228]">{task.label}</h3>
                  </div>
                  <p className="text-sm text-[rgba(51,51,51,0.6)] leading-relaxed mb-5 ml-10">
                    {task.description}
                  </p>
                  <div className="ml-10">
                    <button
                      onClick={() => {
                        setCurrentStep(currentStep + 1)
                      }}
                      className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-[#FEED5A] text-sm font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
                    >
                      {task.cta}
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
                <div className="w-[140px] h-[140px] rounded-lg bg-[rgba(47,40,28,0.04)] flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="size-10 text-[rgba(51,51,51,0.2)]" />
                </div>
              </div>
            )
          }

          return (
            <div
              key={task.step}
              className="flex items-center justify-between rounded-lg border border-[rgba(47,40,28,0.06)] bg-[rgba(47,40,28,0.02)] px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center size-7 rounded-full border border-[rgba(47,40,28,0.12)] text-xs font-medium text-[rgba(51,51,51,0.3)]">
                  {task.step}
                </span>
                <span className="text-sm font-medium text-[rgba(51,51,51,0.35)]">{task.label}</span>
              </div>
            </div>
          )
        })}
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
              onClick={() => navigate("/upsell")}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#FEED5A] text-xs font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
            >
              Learn more
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
              onClick={() => navigate("/upsell")}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#FEED5A] text-xs font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
            >
              Learn more
              <ArrowRight className="size-3" />
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
