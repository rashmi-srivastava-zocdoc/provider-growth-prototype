import { useState } from "react"
import { ArrowRight, X } from "lucide-react"
import { useNavigate } from "@/lib/router"

export function FirstBookingBanner() {
  const [dismissed, setDismissed] = useState(false)
  const navigate = useNavigate()

  if (dismissed) return null

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card px-5 py-4">
      <button
        onClick={() => navigate("/inbox")}
        className="flex flex-1 items-center gap-3 text-left cursor-pointer"
      >
        <span className="text-sm font-medium">
          Preview what happens when you get your first booking
        </span>
        <ArrowRight className="size-4 text-muted-foreground shrink-0" />
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="flex items-center justify-center size-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
