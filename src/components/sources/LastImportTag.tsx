import type { DataSource } from "@/types"
import { UploadIcon } from "lucide-react"

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
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

interface LastImportTagProps {
  sources: DataSource[]
}

export function LastImportTag({ sources }: LastImportTagProps) {
  const imports = sources
    .filter((s) => s.syncMethod === "manual" && s.lastSyncAt)
    .sort((a, b) => new Date(b.lastSyncAt!).getTime() - new Date(a.lastSyncAt!).getTime())

  if (imports.length === 0) return null

  const latest = imports[0]
  const parts = [
    latest.name,
    latest.importedBy,
    latest.lastSyncAt ? formatRelativeTime(latest.lastSyncAt) : null,
  ].filter(Boolean)

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <UploadIcon className="size-3" />
      {parts.join(" · ")}
    </span>
  )
}
