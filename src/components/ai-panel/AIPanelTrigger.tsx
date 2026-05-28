import { SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useAIChat } from "@/context/AIChatContext"
import { usePrototypeVariants } from "@/context/PrototypeVariantsContext"
import { cn } from "@/lib/utils"

export function AIPanelTrigger() {
  const { panelOpen, displayMode, aiPageOpen, togglePanel } = useAIChat()
  const { aiAssistantEnabled } = usePrototypeVariants()

  if (aiPageOpen || (panelOpen && displayMode === "sidebar") || !aiAssistantEnabled) return null

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              onClick={togglePanel}
              className={cn(
                "size-12 rounded-full shadow-lg transition-all",
                panelOpen && "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
              )}
            />
          }
        >
          <SparklesIcon className="size-5" />
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={8}>
          {panelOpen ? "Close AI assistant" : "Open AI assistant"}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
