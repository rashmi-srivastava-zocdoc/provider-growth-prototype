import React, { useEffect, useRef, useState } from "react"
import { SparklesIcon, CopyIcon, CheckIcon, ThumbsUpIcon, ThumbsDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/context/AIChatContext"
import { AIActionReviewCard } from "./AIActionReviewCard"

function formatInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>
  )
}

function MessageContent({ content }: { content: string }) {
  const paragraphs = content.split(/\n\n/)
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {paragraphs.map((para, i) => {
        const lines = para.split("\n").filter(Boolean)
        const isNumbered = /^\d+\./.test(lines[0] ?? "")
        const isBulleted = lines.every(l => l.startsWith("- "))

        if (isBulleted) {
          return (
            <ul key={i} className="space-y-1">
              {lines.map((line, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-muted-foreground mt-0.5 shrink-0">•</span>
                  <span>{formatInline(line.replace(/^-\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          )
        }

        if (isNumbered) {
          return (
            <ol key={i} className="space-y-1">
              {lines.map((line, j) => {
                const match = line.match(/^(\d+)\.\s+(.*)/)
                return (
                  <li key={j} className="flex gap-2">
                    <span className="text-muted-foreground shrink-0 tabular-nums min-w-[1.2rem]">{match?.[1]}.</span>
                    <span>{formatInline(match?.[2] ?? line)}</span>
                  </li>
                )
              })}
            </ol>
          )
        }

        return <p key={i}>{formatInline(para)}</p>
      })}
    </div>
  )
}

function AIMessageActions({ message }: { message: ChatMessage }) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [thumbs, setThumbs] = useState<"up" | "down" | null>(null)

  const copy = () => {
    navigator.clipboard.writeText(message.content)
    setCopiedId(message.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex items-center gap-0.5 mt-1.5 -ml-1">
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon-xs" onClick={copy} />}>
          {copiedId === message.id ? <CheckIcon className="size-3 text-green-600" /> : <CopyIcon />}
        </TooltipTrigger>
        <TooltipContent side="bottom">Copy</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setThumbs(t => (t === "up" ? null : "up"))}
              className={cn(thumbs === "up" && "text-green-600")}
            />
          }
        >
          <ThumbsUpIcon />
        </TooltipTrigger>
        <TooltipContent side="bottom">Good response</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setThumbs(t => (t === "down" ? null : "down"))}
              className={cn(thumbs === "down" && "text-destructive")}
            />
          }
        >
          <ThumbsDownIcon />
        </TooltipTrigger>
        <TooltipContent side="bottom">Poor response</TooltipContent>
      </Tooltip>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 items-start px-1">
      <div className="size-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
        <SparklesIcon className="size-3 text-primary-foreground" />
      </div>
      <div className="flex items-center gap-1 h-6">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="size-1.5 rounded-full bg-muted-foreground animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

interface AIChatMessagesProps {
  messages: ChatMessage[]
  isTyping: boolean
  onActionReviewStatusChange?: (messageId: string, status: "applied" | "dismissed") => void
}

export function AIChatMessages({ messages, isTyping, onActionReviewStatusChange }: AIChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="size-10 rounded-full bg-muted flex items-center justify-center">
          <SparklesIcon className="size-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium">How can I help?</p>
          <p className="text-xs text-muted-foreground mt-1">Ask me anything about your practice</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
      {messages.map(msg => (
        <div key={msg.id}>
          {msg.role === "user" ? (
            <div className="flex justify-end">
              <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-muted px-3 py-2 text-sm">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex gap-2.5 items-start">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                <SparklesIcon className="size-3 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <MessageContent content={msg.content} />
                {msg.type === "action-review" && msg.actionReview && onActionReviewStatusChange && (
                  <AIActionReviewCard
                    review={msg.actionReview}
                    onStatusChange={(status) => onActionReviewStatusChange(msg.id, status)}
                  />
                )}
                <AIMessageActions message={msg} />
              </div>
            </div>
          )}
        </div>
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
