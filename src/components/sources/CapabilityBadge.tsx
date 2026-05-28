import { CalendarIcon, UsersIcon, RefreshCwIcon } from "lucide-react"
import type { SourceCapability } from "@/types"

const capConfig: Record<SourceCapability, { label: string; icon: typeof CalendarIcon; className: string }> = {
  scheduling: {
    label: "Scheduling",
    icon: CalendarIcon,
    className: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
  },
  roster: {
    label: "Roster",
    icon: UsersIcon,
    className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  "live-sync": {
    label: "Live sync",
    icon: RefreshCwIcon,
    className: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
}

interface CapabilityBadgeProps {
  capability: SourceCapability
}

export function CapabilityBadge({ capability }: CapabilityBadgeProps) {
  const config = capConfig[capability]
  const Icon = config.icon
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${config.className}`}>
      <Icon className="size-3" />
      {config.label}
    </span>
  )
}
