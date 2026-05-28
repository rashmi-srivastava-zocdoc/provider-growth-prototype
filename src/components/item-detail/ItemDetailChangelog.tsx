import { cn } from "@/lib/utils"
import type { ChangelogEntry } from "./types"

interface Props {
  open: boolean
  entries: ChangelogEntry[]
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
}

export function ItemDetailChangelog({ open, entries }: Props) {
  return (
    <div
      className={cn(
        "shrink-0 bg-background overflow-hidden",
        "transition-[width] duration-200 ease-in-out",
        open ? "w-72 border-l border-border" : "w-0"
      )}
    >
      <div className="w-72 h-full flex flex-col">
        <div className="flex items-center px-4 py-3 border-b shrink-0">
          <span className="text-sm font-medium">Change history</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {entries.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">No changes recorded.</p>
          ) : (
            <div className="divide-y divide-border">
              {entries.map((entry) => (
                <div key={entry.id} className="px-4 py-3 space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-medium text-foreground truncate">
                      {entry.fieldLabel}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs text-muted-foreground">{entry.author}</span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatTime(entry.timestamp)}
                    </span>
                  </div>
                  {entry.previousValue !== undefined && (
                    <div className="mt-1.5 space-y-0.5">
                      <div className="text-xs line-through text-muted-foreground/70">
                        {entry.previousValue || "—"}
                      </div>
                      <div className="text-xs text-foreground">
                        {entry.nextValue || "—"}
                      </div>
                    </div>
                  )}
                  {entry.description && !entry.previousValue && (
                    <p className="text-xs text-muted-foreground mt-1">{entry.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
