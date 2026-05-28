import type { ReactNode } from "react"

interface Props {
  open: boolean
  toolbar: ReactNode
  content: ReactNode
}

export function ItemDetailFullPage({ open, toolbar, content }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-in fade-in-0 duration-150">
      {toolbar}
      {content}
    </div>
  )
}
