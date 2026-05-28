import { Lightbulb } from "lucide-react"
import { useHome } from "@/context/HomeContext"
import { performanceData } from "@/data/homeData"

export function PerformanceBridge() {
  const { postPhase } = useHome()
  const data = performanceData

  const message =
    postPhase === "just-launched" ? (
      <>
        Your providers are now discoverable by <span className="font-semibold">30M+ patients</span> on
        Zocdoc's free channels. Practices on Marketplace reach 3x more.
      </>
    ) : (
      <>
        <span className="font-semibold">{data.bookingsThisMonth} bookings this month</span> from
        Bookable Presence alone. Practices on Marketplace average 3x more.
      </>
    )

  return (
    <div className="flex items-start gap-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 px-5 py-4">
      <Lightbulb className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
      <p className="text-sm text-foreground leading-relaxed">{message}</p>
    </div>
  )
}
