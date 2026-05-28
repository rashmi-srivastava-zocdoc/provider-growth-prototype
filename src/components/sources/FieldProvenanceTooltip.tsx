import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { SourceIcon } from "./SourceIcon"
import type { DataSource } from "@/types"

function formatRelativeTime(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffMin < 1) return "just now"
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString()
}

export interface FieldProvenance {
  sourceName: string
  sourceType: DataSource["type"]
  lastUpdated: string | null
}

interface FieldProvenanceTooltipProps {
  provenance: FieldProvenance
  children: React.ReactNode
}

export function FieldProvenanceTooltip({ provenance, children }: FieldProvenanceTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<span className="cursor-default" />}>
          {children}
        </TooltipTrigger>
        <TooltipContent side="top" className="flex items-center gap-1.5 text-xs">
          <SourceIcon type={provenance.sourceType} size="sm" />
          <span>from {provenance.sourceName}</span>
          {provenance.lastUpdated && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{formatRelativeTime(provenance.lastUpdated)}</span>
            </>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
