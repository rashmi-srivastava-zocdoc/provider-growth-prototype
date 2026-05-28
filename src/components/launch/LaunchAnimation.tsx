import { useState, useEffect } from "react"
import { Check, Loader2 } from "lucide-react"
import { usePractice } from "@/context/PracticeContext"
import { CHANNEL_LOGOS, TOTAL_CHANNELS } from "./channelLogos"

// ── Types ────────────────────────────────────────────────────

type ItemState = "pending" | "active" | "complete"

interface ChecklistItem {
  label: string
  subText?: string
}

// ── State helpers ────────────────────────────────────────────

function getItemState(itemIndex: number, beat: number): ItemState {
  if (itemIndex < beat) return "complete"
  if (itemIndex === beat) return "active"
  return "pending"
}

// ── ChecklistItemRow ─────────────────────────────────────────

function ChecklistItemRow({
  item,
  state,
}: {
  item: ChecklistItem
  state: ItemState
}) {
  return (
    <div
      className={`flex items-start gap-4 transition-opacity duration-300 ${
        state === "pending" ? "opacity-40" : "opacity-100"
      }`}
    >
      {/* Icon */}
      <div className="mt-1 flex size-7 shrink-0 items-center justify-center">
        {state === "complete" && (
          <div className="flex size-7 items-center justify-center rounded-full bg-green-600 text-white animate-fadeIn">
            <Check className="size-4" strokeWidth={3} />
          </div>
        )}
        {state === "active" && (
          <Loader2 className="size-7 animate-spin text-green-600" />
        )}
        {state === "pending" && (
          <div className="size-2.5 rounded-full bg-muted-foreground/30" />
        )}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p
          className={`text-lg font-semibold leading-tight ${
            state === "complete" ? "text-foreground" : state === "active" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {item.label}
        </p>
        {item.subText && state !== "pending" && (
          <p className="mt-1 text-sm text-muted-foreground truncate animate-fadeIn">
            {item.subText}
          </p>
        )}
      </div>
    </div>
  )
}

// ── SkeletonCard ─────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="w-72 rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="size-16 rounded-full bg-muted animate-shimmer" />
        <div className="mt-3 h-4 w-40 rounded bg-muted animate-shimmer" />
        <div className="mt-2 h-3 w-24 rounded bg-muted animate-shimmer" />
        <div className="mt-1.5 h-3 w-44 rounded bg-muted animate-shimmer" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="h-9 rounded-lg bg-muted animate-shimmer" />
        <div className="h-9 rounded-lg bg-muted animate-shimmer" />
        <div className="h-9 rounded-lg bg-muted animate-shimmer" />
        <div className="h-9 rounded-lg bg-muted animate-shimmer" />
        <div className="h-9 rounded-lg bg-muted animate-shimmer" />
      </div>
    </div>
  )
}

// ── ProviderCard ─────────────────────────────────────────────

function ProviderCard({
  name,
  suffix,
  specialty,
  address,
  initials,
}: {
  name: string
  suffix: string
  specialty: string
  address: string
  initials: string
}) {
  const timeSlots = ["9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "4:30 PM"]

  return (
    <div className="w-72 rounded-2xl border-2 border-[#FEED5A] bg-card p-5 shadow-sm animate-fadeIn">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-800">
          {initials}
        </div>
        <p className="mt-3 text-base font-bold leading-tight">
          {name}, {suffix}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{specialty}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{address}</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {timeSlots.map((t) => (
          <button
            key={t}
            className="rounded-lg border px-2 py-1.5 text-sm font-medium text-green-700 hover:bg-green-50"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── CardStack ────────────────────────────────────────────────

function CardStack({
  showReal,
  shrink,
  name,
  suffix,
  specialty,
  address,
  initials,
}: {
  showReal: boolean
  shrink: boolean
  name: string
  suffix: string
  specialty: string
  address: string
  initials: string
}) {
  return (
    <div
      className={`relative transition-transform duration-500 ease-out ${
        shrink ? "scale-[0.65]" : "scale-100"
      }`}
    >
      {/* Stack hints behind */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border bg-card/30 opacity-30" />
      <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border bg-card/60 opacity-60" />

      {/* Main card */}
      <div className="relative">
        {showReal ? (
          <ProviderCard
            name={name}
            suffix={suffix}
            specialty={specialty}
            address={address}
            initials={initials}
          />
        ) : (
          <SkeletonCard />
        )}
      </div>
    </div>
  )
}

// ── RadialLogos ──────────────────────────────────────────────

function RadialLogos() {
  const cx = 160
  const cy = 160
  const radius = 120
  const logos = CHANNEL_LOGOS

  return (
    <div className="relative size-80 animate-fadeIn">
      {/* SVG connection lines */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 320 320">
        {logos.map((_, i) => {
          const angle = (2 * Math.PI * i) / logos.length - Math.PI / 2
          const x2 = cx + radius * Math.cos(angle)
          const y2 = cy + radius * Math.sin(angle)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="#16a34a"
              strokeWidth={1}
              strokeDasharray="5 4"
              opacity={0.3}
              className="animate-dashPulse"
            />
          )
        })}
      </svg>

      {/* Logo badges */}
      {logos.map((logo, i) => {
        const angle = (2 * Math.PI * i) / logos.length - Math.PI / 2
        const x = cx + radius * Math.cos(angle) - 18
        const y = cy + radius * Math.sin(angle) - 18
        return (
          <div
            key={logo.name}
            className="absolute size-9 rounded-lg border bg-white shadow-sm overflow-hidden"
            style={{
              left: x,
              top: y,
              animation: `popIn 0.3s ease-out ${i * 0.05}s both`,
            }}
            title={logo.name}
          >
            <img
              src={logo.logoUrl}
              alt={logo.name}
              className="size-full object-contain p-1"
            />
          </div>
        )
      })}

      {/* Center count badge */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex size-14 items-center justify-center rounded-full bg-green-600 text-white font-bold text-sm shadow-md"
        style={{ animation: "popIn 0.3s ease-out 0.6s both" }}
      >
        {TOTAL_CHANNELS}+
      </div>
    </div>
  )
}

// ── LaunchAnimation (main export) ────────────────────────────

export function LaunchAnimation({ onComplete }: { onComplete: () => void }) {
  const [beat, setBeat] = useState(-1)
  const practiceData = usePractice()

  const provider = practiceData.providers[0]
  const firstLocationId = provider?.locationIds[0]
  const location = practiceData.locations.find((l) => l.id === firstLocationId)

  const bookingUrl = `zocdoc.com/book/${practiceData.practice.slug}`

  const checklist: ChecklistItem[] = [
    { label: "Setting up bookable profiles..." },
    { label: "Generating your booking link", subText: bookingUrl },
    {
      label: "Connecting to channels",
      subText: "Google, Zocdoc Marketplace, premium partners + more",
    },
    {
      label: `Distributing across ${TOTAL_CHANNELS}+ channels`,
      subText: "Insurance directories, AI chat, and more",
    },
  ]

  useEffect(() => {
    const t0 = setTimeout(() => setBeat(0), 100)
    const t1 = setTimeout(() => setBeat(1), 2200)
    const t2 = setTimeout(() => setBeat(2), 4400)
    const t3 = setTimeout(() => setBeat(3), 6600)
    const tDone = setTimeout(() => onComplete(), 9000)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(tDone)
    }
  }, [onComplete])

  const showRealCard = beat >= 1
  const shrinkCard = beat >= 2

  return (
    <div className="h-screen w-full flex bg-white">
      {/* Left panel — checklist */}
      <div className="flex-1 basis-1/2 flex flex-col justify-center items-center px-12 py-12">
        <div className="w-full max-w-md space-y-6">
          {checklist.map((item, i) => (
            <ChecklistItemRow
              key={i}
              item={item}
              state={getItemState(i, beat)}
            />
          ))}
        </div>
      </div>

      {/* Right panel — visual */}
      <div className="flex-1 basis-1/2 bg-[#f5f5f4] flex items-center justify-center border-l border-[rgba(47,40,28,0.08)]">
        {beat < 2 ? (
          <CardStack
            showReal={showRealCard}
            shrink={shrinkCard}
            name={provider?.name ?? "Provider"}
            suffix={provider?.suffix ?? "MD"}
            specialty={provider?.specialties[0] ?? "Medicine"}
            address={location?.address ?? ""}
            initials={provider?.initials ?? "P"}
          />
        ) : (
          <div className="relative flex items-center justify-center">
            <div className="absolute z-10">
              <CardStack
                showReal
                shrink
                name={provider?.name ?? "Provider"}
                suffix={provider?.suffix ?? "MD"}
                specialty={provider?.specialties[0] ?? "Medicine"}
                address={location?.address ?? ""}
                initials={provider?.initials ?? "P"}
              />
            </div>
            <RadialLogos />
          </div>
        )}
      </div>
    </div>
  )
}
