import { ZapIcon, TableIcon, FileTextIcon, PenLineIcon } from "lucide-react"
import type { DataSource } from "@/types"

const iconMap: Record<DataSource["type"], { icon: typeof ZapIcon; className: string }> = {
  ehr: { icon: ZapIcon, className: "text-violet-500" },
  spreadsheet: { icon: TableIcon, className: "text-emerald-600" },
  file: { icon: FileTextIcon, className: "text-blue-500" },
  manual: { icon: PenLineIcon, className: "text-zinc-500" },
}

interface SourceIconProps {
  type: DataSource["type"]
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SourceIcon({ type, size = "sm", className }: SourceIconProps) {
  const config = iconMap[type]
  const Icon = config.icon
  const sizeClass = size === "sm" ? "size-3.5" : size === "md" ? "size-4" : "size-5"
  return <Icon className={`${sizeClass} ${config.className} shrink-0 ${className ?? ""}`} />
}
