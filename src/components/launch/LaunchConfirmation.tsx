import { ArrowRight } from "lucide-react"
import { usePractice } from "@/context/PracticeContext"
import { CHANNEL_LOGOS, TOTAL_CHANNELS } from "./channelLogos"
import { BookingLinkCard } from "@/components/bookable-presence/BookingLinkCard"
import { GoogleConnectionAlert } from "@/components/bookable-presence/GoogleConnectionAlert"
import { ChannelListDialog } from "@/components/bookable-presence/ChannelListDialog"

// ── Avatar colors for provider initials ──────────────────────

const AVATAR_COLORS = [
  { bg: "bg-emerald-100", text: "text-emerald-800" },
  { bg: "bg-blue-100", text: "text-blue-800" },
  { bg: "bg-purple-100", text: "text-purple-800" },
  { bg: "bg-amber-100", text: "text-amber-800" },
  { bg: "bg-rose-100", text: "text-rose-800" },
]

// ── Provider Avatar Stack ───────────────────────────────────

function ProviderAvatarStack({
  providers,
}: {
  providers: { initials: string; name: string; suffix: string; specialties: string[] }[]
}) {
  const maxVisible = 5
  const visible = providers.slice(0, maxVisible)
  const remaining = providers.length - maxVisible

  return (
    <div className="flex items-center">
      <div className="flex -space-x-3">
        {visible.map((p, i) => {
          const color = AVATAR_COLORS[i % AVATAR_COLORS.length]
          return (
            <div
              key={p.name}
              className={`flex size-12 items-center justify-center rounded-full border-2 border-white text-sm font-semibold shadow-sm ${color.bg} ${color.text}`}
              title={`${p.name}, ${p.suffix}`}
            >
              {p.initials}
            </div>
          )
        })}
        {remaining > 0 && (
          <div className="flex size-12 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-sm font-semibold text-gray-600 shadow-sm">
            +{remaining}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Channel Logo Grid ───────────────────────────────────────

function ChannelLogoGrid() {
  const extraCount = TOTAL_CHANNELS - CHANNEL_LOGOS.length

  return (
    <div className="flex flex-wrap gap-2.5">
      {CHANNEL_LOGOS.map((logo) => (
        <div
          key={logo.name}
          className="flex size-11 items-center justify-center rounded-lg border bg-white shadow-sm overflow-hidden"
          title={logo.name}
        >
          <img
            src={logo.logoUrl}
            alt={logo.name}
            className="size-full object-contain p-1.5"
          />
        </div>
      ))}
      <div className="flex size-11 items-center justify-center rounded-lg border bg-gray-50 text-xs font-semibold text-gray-500">
        +{extraCount}
      </div>
    </div>
  )
}

// ── Next Step Card ──────────────────────────────────────────

function NextStepCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border p-4 transition-colors hover:bg-gray-50">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      </div>
    </div>
  )
}

// ── LaunchConfirmation (main export) ────────────────────────

export function LaunchConfirmation({
  onDismiss,
  onNavigate,
  onContinue,
}: {
  onDismiss: () => void
  onNavigate: (path: string) => void
  onContinue?: () => void
}) {
  const practiceData = usePractice()

  const { practice, providers } = practiceData

  return (
    <div className="h-screen w-full flex bg-white">
      {/* ── Left panel ──────────────────────────────────── */}
      <div className="flex-1 basis-1/2 flex flex-col justify-center items-center px-12 py-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Celebration header */}
          <div>
            <span className="text-4xl">🎉</span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              {practice.name} is{" "}
              <span className="text-emerald-600">live</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Your {providers.length} providers are now bookable on Google, Yelp,
              Healthgrades, and more.{" "}
              <ChannelListDialog variant="inline" />
            </p>
          </div>

          {/* Booking link card */}
          <BookingLinkCard variant="card" />

          {/* GBP connection alert */}
          <GoogleConnectionAlert
            variant="card"
            onConnect={() => onNavigate("/setup/google-business-profiles")}
          />

          {/* Continue / Dashboard CTAs */}
          <div className="flex items-center gap-4">
            {onContinue ? (
              <>
                <button
                  onClick={onContinue}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#FEED5A] px-5 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#fde84a]"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </button>
                <button
                  onClick={onDismiss}
                  className="text-sm font-medium text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  Skip to dashboard
                </button>
              </>
            ) : (
              <button
                onClick={onDismiss}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#FEED5A] px-5 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#fde84a]"
              >
                Go to your dashboard
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Right panel ─────────────────────────────────── */}
      <div className="flex-1 basis-1/2 bg-[#f5f5f4] flex flex-col items-center justify-center border-l border-[rgba(47,40,28,0.08)]">
        <div className="flex flex-col items-center space-y-6">
          {/* Provider avatar stack */}
          <ProviderAvatarStack
            providers={providers.map((p) => ({
              initials: p.initials,
              name: p.name,
              suffix: p.suffix,
              specialties: p.specialties,
            }))}
          />

          {/* Channel logo grid */}
          <ChannelLogoGrid />

          {/* Channel count label */}
          <p className="text-sm font-semibold text-emerald-600">
            Distributed across {TOTAL_CHANNELS}+ channels
          </p>

          {/* Channel eligibility note */}
          <p className="max-w-xs text-center text-xs leading-relaxed text-muted-foreground">
            Each channel reviews and approves providers based on their own
            criteria. Most go live within 24–48 hours.
          </p>
        </div>
      </div>
    </div>
  )
}
