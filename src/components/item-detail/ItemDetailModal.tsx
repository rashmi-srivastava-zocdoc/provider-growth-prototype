import type { ReactNode } from "react"
import { Dialog } from "@base-ui/react/dialog"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  toolbar: ReactNode
  content: ReactNode
}

export function ItemDetailModal({ open, onOpenChange, toolbar, content }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-sm" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 flex flex-col w-[min(860px,85vw)] max-h-[88vh] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background shadow-2xl transition duration-150 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95">
          {toolbar}
          {content}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
