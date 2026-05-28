import { SparklesIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { useAIChat } from "@/context/AIChatContext"
import { AIChatMessages } from "./AIChatMessages"
import { AIChatInput } from "./AIChatInput"
import { ChatHistoryDropdown, ModeDropdown } from "./AIChatControls"

export function AIAssistantPage() {
  const { activeChat, activePage, isTyping, sendMessage, startNewChat, updateActionReviewStatus } = useAIChat()

  return (
    <SidebarInset className="overflow-hidden">
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 border-none" />
          <Separator orientation="vertical" className="mr-2 data-vertical:h-4" />
          <div className="flex items-center gap-2">
            <SparklesIcon className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">AI Assistant</span>
          </div>
        </div>
        <div className="flex items-center gap-1 px-3">
          <ChatHistoryDropdown />
          <Button variant="ghost" size="sm" onClick={startNewChat} className="gap-1.5">
            <PlusIcon className="size-3.5" />
            New chat
          </Button>
          <Separator orientation="vertical" className="mx-0.5 data-vertical:h-4" />
          <ModeDropdown />
        </div>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden items-center">
        <div className="w-full max-w-3xl flex flex-col flex-1 overflow-hidden">
          <AIChatMessages messages={activeChat?.messages ?? []} isTyping={isTyping} onActionReviewStatusChange={updateActionReviewStatus} />
          <div className="shrink-0">
            <AIChatInput
              activePage={activePage}
              onSend={sendMessage}
              disabled={isTyping}
              showTopBorder={false}
            />
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
