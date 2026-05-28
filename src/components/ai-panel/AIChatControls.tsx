import React from "react"
import {
  PlusIcon,
  CheckIcon,
  MessageSquareIcon,
  PanelBottomIcon,
  PanelRightIcon,
  Maximize2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useAIChat, type DisplayMode } from "@/context/AIChatContext"
import { cn } from "@/lib/utils"

export const MODE_ICONS: Record<DisplayMode, React.ReactNode> = {
  floating: <PanelBottomIcon />,
  sidebar: <PanelRightIcon />,
}

export function ChatHistoryDropdown({ className }: { className?: string }) {
  const { chats, activeChatId, activeChat, startNewChat, switchChat } = useAIChat()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1 rounded-md px-1.5 py-1 text-sm font-medium hover:bg-muted transition-colors cursor-pointer outline-none max-w-[200px]",
          className
        )}
      >
        <span className="truncate">{activeChat?.title ?? "New chat"}</span>
        <svg className="size-3 shrink-0 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuItem onClick={startNewChat}>
          <PlusIcon />
          New chat
        </DropdownMenuItem>
        {chats.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Recent chats</DropdownMenuLabel>
            {chats.map(chat => (
              <DropdownMenuItem key={chat.id} onClick={() => switchChat(chat.id)}>
                <MessageSquareIcon />
                <span className="truncate flex-1">{chat.title}</span>
                {chat.id === activeChatId && <CheckIcon className="size-3.5 shrink-0 ml-auto" />}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ModeDropdown() {
  const { displayMode, setDisplayMode, openAIPage } = useAIChat()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="border-0" />}>
        {MODE_ICONS[displayMode]}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setDisplayMode("floating")}>
          <PanelBottomIcon />
          Floating
          {displayMode === "floating" && <CheckIcon className="ml-auto size-3.5" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDisplayMode("sidebar")}>
          <PanelRightIcon />
          Sidebar
          {displayMode === "sidebar" && <CheckIcon className="ml-auto size-3.5" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={openAIPage}>
          <Maximize2Icon />
          Open full page
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
