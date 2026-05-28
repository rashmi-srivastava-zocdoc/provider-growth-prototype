import * as React from "react"
import { SparklesIcon, ChevronDownIcon, XIcon, SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface BulkAction {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: "default" | "destructive"
}

interface BulkActionToolbarProps {
  selectedCount: number
  totalCount: number
  primaryActions: BulkAction[]
  overflowActions?: BulkAction[]
  onClearSelection: () => void
  onAIAction?: (prompt: string) => void
  aiSuggestions?: string[]
  className?: string
}

export function BulkActionToolbar({
  selectedCount,
  totalCount,
  primaryActions,
  overflowActions,
  onClearSelection,
  onAIAction,
  aiSuggestions = [],
  className,
}: BulkActionToolbarProps) {
  const [aiText, setAIText] = React.useState("")
  const [aiOpen, setAIOpen] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  if (selectedCount === 0) return null

  const handleAISend = () => {
    if (!aiText.trim() || !onAIAction) return
    onAIAction(aiText.trim())
    setAIText("")
    setAIOpen(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (!onAIAction) return
    onAIAction(suggestion)
    setAIText("")
    setAIOpen(false)
  }

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`
  }

  return (
    <div
      data-slot="bulk-action-toolbar"
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow-lg ring-1 ring-foreground/5 animate-in fade-in-0 slide-in-from-bottom-4 duration-200",
        className
      )}
    >
      <div className="flex items-center gap-2 pr-2 border-r border-border">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onClearSelection}
          className="border-0"
        >
          <XIcon />
        </Button>
        <span className="text-sm font-medium whitespace-nowrap">
          {selectedCount} of {totalCount} selected
        </span>
      </div>

      <ButtonGroup>
        {primaryActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            onClick={action.onClick}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </ButtonGroup>

      {overflowActions && overflowActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" size="sm" />}
          >
            More
            <ChevronDownIcon data-icon="inline-end" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" sideOffset={8} className="w-auto whitespace-nowrap">
            {overflowActions.map((action) => (
              <DropdownMenuItem
                key={action.label}
                onClick={action.onClick}
                variant={action.variant}
              >
                {action.icon}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {onAIAction && (
        <div className="pl-2 border-l border-border">
          <Popover open={aiOpen} onOpenChange={setAIOpen}>
            <PopoverTrigger
              render={
                <Button variant="outline" size="sm" />
              }
            >
              <SparklesIcon data-icon="inline-start" />
              AI Edit
            </PopoverTrigger>
            <PopoverContent
              side="top"
              sideOffset={12}
              align="end"
              className="w-80"
            >
              <PopoverHeader>
                <PopoverTitle>
                  Edit {selectedCount} item{selectedCount !== 1 ? "s" : ""} with AI
                </PopoverTitle>
                <PopoverDescription>
                  Describe what you'd like to change in natural language.
                </PopoverDescription>
              </PopoverHeader>
              <div className="flex items-end gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/30 transition-all">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder="I need to..."
                  value={aiText}
                  onChange={(e) => {
                    setAIText(e.target.value)
                    autoResize(e.target)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleAISend()
                    }
                  }}
                  className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground leading-5"
                />
                <Button
                  size="icon-xs"
                  onClick={handleAISend}
                  disabled={!aiText.trim()}
                  className="shrink-0"
                >
                  <SendIcon />
                </Button>
              </div>
              {aiSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {aiSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-2.5 py-1 rounded-full text-xs border border-border bg-background hover:bg-muted transition-colors whitespace-nowrap"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground">
                AI will open a review before applying changes.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  )
}
