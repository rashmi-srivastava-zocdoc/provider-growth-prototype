import type { ReactNode } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { useAIChat } from "@/context/AIChatContext"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  changelogOpen: boolean
  toolbar: ReactNode
  content: ReactNode
}

const SHEET_BASE_WIDTH = 780
const CHANGELOG_WIDTH = 288  // w-72 = 18rem = 288px
const AI_SIDEBAR_WIDTH = 400

export function ItemDetailShell({ open, onOpenChange, changelogOpen, toolbar, content }: Props) {
  const { panelOpen, displayMode } = useAIChat()
  const aiSidebarOpen = panelOpen && displayMode === "sidebar"

  const width = changelogOpen
    ? `min(${SHEET_BASE_WIDTH + CHANGELOG_WIDTH}px, 85vw)`
    : `min(${SHEET_BASE_WIDTH}px, 55vw)`

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Popup
          className="fixed inset-y-0 z-50 flex flex-col border-l bg-background shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.1)] data-starting-style:translate-x-[2.5rem] data-starting-style:opacity-0 data-ending-style:translate-x-[2.5rem] data-ending-style:opacity-0"
          style={{
            right: aiSidebarOpen ? AI_SIDEBAR_WIDTH : 0,
            width,
            transition: "right 200ms ease-in-out, width 200ms ease-in-out, transform 200ms ease-in-out, opacity 200ms ease-in-out",
          }}
        >
          {toolbar}
          {content}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
