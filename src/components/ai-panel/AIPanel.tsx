import React from "react"
import { SparklesIcon, XIcon, PlusIcon, CheckIcon, MessageSquareIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useAIChat } from "@/context/AIChatContext"
import { AIChatMessages } from "./AIChatMessages"
import { AIChatInput } from "./AIChatInput"
import { ChatHistoryDropdown, ModeDropdown } from "./AIChatControls"
import { cn } from "@/lib/utils"

function PanelHeader() {
  const { closePanel, displayMode } = useAIChat()

  return (
    <div className={cn("flex items-center gap-1.5 px-3 h-12 shrink-0", displayMode !== "floating" && "border-b border-border")}>
      <div className="size-6 rounded-full bg-primary flex items-center justify-center shrink-0">
        <SparklesIcon className="size-3 text-primary-foreground" />
      </div>

      <ChatHistoryDropdown />

      <div className="ml-auto flex items-center gap-0.5">
        <ModeDropdown />
        <Separator orientation="vertical" className="mx-0.5 data-vertical:h-4" />
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon-sm" className="border-0" onClick={closePanel} />}>
            <XIcon />
          </TooltipTrigger>
          <TooltipContent side="bottom">Close</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export function AIPanel() {
  const { panelOpen, aiPageOpen, displayMode, activeChat, activePage, isTyping, sendMessage, updateActionReviewStatus } = useAIChat()

  if (!panelOpen || aiPageOpen) return null

  return (
    <div
      key={displayMode}
      className={cn(
        "flex flex-col overflow-hidden bg-popover",
        displayMode === "floating" &&
          "fixed bottom-[88px] right-6 z-[55] w-[400px] h-[min(640px,75vh)] rounded-2xl border border-border shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-200",
        displayMode === "sidebar" &&
          "fixed top-0 right-0 bottom-0 z-50 w-[400px] border-l border-border animate-in fade-in-0 slide-in-from-right-4 duration-200"
      )}
    >
      <PanelHeader />
      <AIChatMessages messages={activeChat?.messages ?? []} isTyping={isTyping} onActionReviewStatusChange={updateActionReviewStatus} />
      <AIChatInput activePage={activePage} onSend={sendMessage} disabled={isTyping} />
    </div>
  )
}
