import type { ReactNode } from "react"

export interface ChangelogEntry {
  id: string
  timestamp: string
  author: string
  fieldLabel: string
  previousValue?: string
  nextValue?: string
  description?: string
}

export interface ItemDetailViewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigatePrev?: () => void
  onNavigateNext?: () => void
  canNavigatePrev?: boolean
  canNavigateNext?: boolean
  actions?: ReactNode
  changelog?: ChangelogEntry[]
  storageKey?: string
  children: ReactNode
}
