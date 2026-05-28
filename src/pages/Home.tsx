import { useHome } from "@/context/HomeContext"
import { GreetingHeader } from "@/components/home/GreetingHeader"
import { AIBriefingBar } from "@/components/home/AIBriefingBar"
import { SetupChecklist } from "@/components/home/SetupChecklist"
import { GrowYourPractice } from "@/components/home/GrowYourPractice"
import { ProductActivationCards } from "@/components/home/ProductActivationCards"
import { FirstBookingRecommendations } from "@/components/home/FirstBookingRecommendations"
import { TodoCard } from "@/components/home/TodoCard"
import { RecommendationsMVP } from "@/components/home/RecommendationsMVP"
import { PerformanceSidebar } from "@/components/home/PerformanceSidebar"
import { PerformanceSummary } from "@/components/home/PerformanceSummary"
import { ProviderHealth } from "@/components/home/ProviderHealth"
import { NeedsAttention } from "@/components/home/NeedsAttention"
import { RecommendationsVision } from "@/components/home/RecommendationsVision"

function MVPPreActivation() {
  return (
    <div className="flex flex-col gap-8 max-w-[870px] mx-auto w-full py-8">
      <GreetingHeader />
      <SetupChecklist variant="mvp" />
      <GrowYourPractice />
    </div>
  )
}

function MVPPostActivation() {
  const { postPhase } = useHome()

  return (
    <div className="flex flex-col gap-6">
      <GreetingHeader />
      <div className="flex gap-6">
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <TodoCard />
          <FirstBookingRecommendations />
        </div>
        <div className="w-[340px] shrink-0">
          <PerformanceSidebar />
        </div>
      </div>
    </div>
  )
}

function VisionPreActivation() {
  return (
    <div className="flex flex-col gap-6">
      <AIBriefingBar activationState="pre" />
      <SetupChecklist variant="vision" />
      <ProductActivationCards />
    </div>
  )
}

function VisionPostActivation() {
  return (
    <div className="flex flex-col gap-6">
      <AIBriefingBar activationState="post" />
      <PerformanceSummary />
      <div className="grid grid-cols-2 gap-6">
        <NeedsAttention />
        <ProviderHealth />
      </div>
      <RecommendationsVision />
    </div>
  )
}

export function HomePage() {
  const { activationState, homeVariant } = useHome()

  if (homeVariant === "mvp") {
    return activationState === "pre" ? <MVPPreActivation /> : <MVPPostActivation />
  }

  return activationState === "pre" ? <VisionPreActivation /> : <VisionPostActivation />
}
