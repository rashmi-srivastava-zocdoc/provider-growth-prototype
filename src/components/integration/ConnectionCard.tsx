import type { ConnectionHealth } from "@/types"
import { Button } from "@/components/ui/button"

const healthDotColor: Record<ConnectionHealth, string> = {
  healthy: "bg-emerald-400",
  degraded: "bg-amber-400",
  disconnected: "bg-red-500",
}

interface ConnectionCardProps {
  health: ConnectionHealth
  statusLine: string
  detail: string
}

export function ConnectionCard({ health, statusLine, detail }: ConnectionCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-zinc-900 p-4 text-white ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          Connection
        </span>
        <span className={`size-2.5 rounded-full ${healthDotColor[health]}`} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{statusLine}</p>
        <p className="text-xs text-zinc-400">{detail}</p>
      </div>
      {health === "degraded" && (
        <Button
          size="sm"
          className="w-fit bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border-amber-500/30"
        >
          Fix credentials
        </Button>
      )}
      {health === "disconnected" && (
        <Button
          size="sm"
          className="w-fit bg-red-500/20 text-red-300 hover:bg-red-500/30 border-red-500/30"
        >
          Reconnect
        </Button>
      )}
    </div>
  )
}
