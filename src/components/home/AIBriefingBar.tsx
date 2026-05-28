import { Sparkles, Search } from "lucide-react"
import { aiBriefings } from "@/data/homeData"

interface AIBriefingBarProps {
  activationState: "pre" | "post"
}

export function AIBriefingBar({ activationState }: AIBriefingBarProps) {
  const briefing = aiBriefings[activationState]

  if (!briefing) return null

  return (
    <div className="rounded-xl border bg-gradient-to-r from-slate-50 to-blue-50/50 p-5">
      {/* AI label */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center size-6 rounded-full bg-muted">
          <Sparkles className="size-3.5 text-muted-foreground" />
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          AI
        </span>
      </div>

      {/* Briefing text */}
      <p className="text-[15px] leading-relaxed text-foreground">
        {briefing.summary}
      </p>

      {/* Search input */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
        <Search className="size-4 text-muted-foreground shrink-0" />
        <span className="text-sm text-muted-foreground">
          Ask about your practice...
        </span>
      </div>

      {/* Suggestion chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {briefing.suggestions.map((suggestion) => (
          <button
            key={suggestion}
            className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
