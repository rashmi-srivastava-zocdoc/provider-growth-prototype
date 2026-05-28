import React, { useRef } from "react"
import { SendIcon, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getSuggestionsForPage } from "./pageContextSuggestions"
import { cn } from "@/lib/utils"

interface AIChatInputProps {
  activePage: string
  onSend: (text: string) => void
  disabled?: boolean
  showTopBorder?: boolean
}

export function AIChatInput({ activePage, onSend, disabled, showTopBorder = true }: AIChatInputProps) {
  const [text, setText] = React.useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const suggestions = getSuggestionsForPage(activePage)

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`
  }

  const handleSend = () => {
    if (!text.trim() || disabled) return
    onSend(text.trim())
    setText("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  return (
    <div className={cn("bg-background", showTopBorder && "border-t border-border")}>
      <div className="px-3 pt-2.5 pb-1 flex gap-1.5 flex-wrap">
        {suggestions.map(s => (
          <button
            key={s.label}
            onClick={() => { onSend(s.prompt); setText("") }}
            disabled={disabled}
            className="px-2.5 py-1 rounded-full text-xs border border-border bg-background hover:bg-muted transition-colors whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none"
          >
            {s.label}
          </button>
        ))}
      </div>

      <Separator className="mx-3" />

      <div className="px-3 pt-1.5 pb-1 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPinIcon className="size-3 shrink-0" />
        <span className="truncate">{activePage}</span>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/30 transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Ask anything..."
            value={text}
            onChange={e => { setText(e.target.value); autoResize(e.target) }}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            disabled={disabled}
            className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 leading-5"
          />
          <Button
            size="icon-sm"
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            className="shrink-0 self-end"
          >
            <SendIcon />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-1.5">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  )
}
