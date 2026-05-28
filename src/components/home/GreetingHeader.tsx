import { usePractice } from "@/context/PracticeContext"
import { useHome } from "@/context/HomeContext"
import { useNavigate } from "@/lib/router"
import { providerHealthItems, providerSetupStatus } from "@/data/homeData"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"

function ProgressRing({
  completed,
  total,
}: {
  completed: number
  total: number
}) {
  const size = 64
  const strokeWidth = 4
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = total > 0 ? completed / total : 0
  const dashOffset = circumference * (1 - progress)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/60"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="text-emerald-500 transition-all duration-500"
        />
      </svg>
      <span className="absolute text-sm font-semibold">
        {completed}/{total}
      </span>
    </div>
  )
}

export function GreetingHeader() {
  const practiceData = usePractice()
  const { activationState, postPhase, completedTaskIds, setupTotal } = useHome()
  const practiceName = practiceData.practice.name
  const isPre = activationState === "pre"
  const isPost = activationState === "post"
  const isJustLaunched = isPost && postPhase === "just-launched"

  if (isPre) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Zocdoc
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Let's get {practiceName} ready to receive bookings online
          </p>
        </div>
        <ProgressRing completed={completedTaskIds.size} total={setupTotal} />
      </div>
    )
  }

  const navigate = useNavigate()
  const liveCount = providerHealthItems.filter((p) => p.status === "active").length
  const needsAttentionCount = providerHealthItems.filter(
    (p) => p.status === "no-availability" || p.status === "needs-review"
  ).length
  const newCount = providerHealthItems.filter((p) => p.status === "new").length

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">
        {practiceName} is live on Zocdoc
      </h1>
      <div className="flex items-center gap-3 rounded-full border bg-muted/30 px-4 py-1.5 text-sm">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">{liveCount}</span> providers live
          </span>
        </span>
        {needsAttentionCount > 0 && (
          <>
            <span className="text-border">·</span>
            <button
              onClick={() => navigate("/providers?status=needs-attention")}
              className="inline-flex items-center gap-1.5 hover:underline underline-offset-2 cursor-pointer"
            >
              <span className="size-2 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{needsAttentionCount}</span> needs attention
              </span>
            </button>
          </>
        )}
        {newCount > 0 && (
          <>
            <span className="text-border">·</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      onClick={() => navigate("/providers?status=pending-review")}
                      className="inline-flex items-center gap-1.5 hover:underline underline-offset-2 cursor-pointer"
                    />
                  }
                >
                  <span className="size-2 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">{newCount}</span> pending review
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[240px]">
                  Providers pending review are typically verified within 1–2 business days.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
    </div>
  )
}
