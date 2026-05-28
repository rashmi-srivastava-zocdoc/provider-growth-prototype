import { useState } from "react"
import { Copy, Check, Link2 } from "lucide-react"
import { usePractice } from "@/context/PracticeContext"
import { SetupHelpDialog } from "./SetupHelpDialog"

function CopyButton({
  url,
  variant,
}: {
  url: string
  variant: "button" | "text"
}) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(`https://${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (variant === "text") {
    return (
      <button
        onClick={handleCopy}
        className="text-xs font-medium text-primary hover:text-primary/80 cursor-pointer bg-transparent border-none"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    )
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border bg-white px-3 text-sm font-medium text-foreground transition-colors hover:bg-gray-50"
    >
      {copied ? (
        <>
          <Check className="size-4 text-emerald-600" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-4" />
          Copy
        </>
      )}
    </button>
  )
}

export function BookingLinkCard({
  variant,
}: {
  variant: "card" | "inline"
}) {
  const { practice } = usePractice()
  const bookingUrl = `zocdoc.com/book/${practice.slug}`

  if (variant === "card") {
    return (
      <div className="rounded-xl border bg-gray-50/70 overflow-hidden">
        <div className="p-5">
          <p className="text-sm font-medium text-muted-foreground">
            Your booking link
          </p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 rounded-lg border bg-white px-3 py-2 font-mono text-sm text-foreground">
              {bookingUrl}
            </code>
            <CopyButton url={bookingUrl} variant="button" />
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
            Share this link on your website, social media, or email signature.
            You can always find it in Bookable Presence settings.
          </p>
        </div>
        <SetupHelpDialog variant="footer" />
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-5 py-3.5">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Your booking URL</p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1.5 rounded-md font-mono">
            <Link2 className="size-3" />
            {bookingUrl}
          </div>
          <CopyButton url={bookingUrl} variant="text" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-3.5">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Add to your website</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Get help placing your Booking Link on your practice website
          </p>
        </div>
        <div className="shrink-0">
          <SetupHelpDialog variant="link" />
        </div>
      </div>
    </>
  )
}
