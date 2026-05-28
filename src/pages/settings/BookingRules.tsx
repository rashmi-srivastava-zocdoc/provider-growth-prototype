import { useState } from "react"
import { Sparkles, Plus, MoreHorizontal, Pencil, ToggleLeft, Trash2, X } from "lucide-react"
import { useNavigate } from "@/lib/router"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { SettingsPageShell, SettingsPageHeader } from "@/pages/products/shared-settings"
import { bookingRules } from "@/data/booking-rules"

function conditionSentence(rule: (typeof bookingRules)[0]): React.ReactNode {
  const { conditions } = rule
  const pills: { label: string }[] = []

  if (conditions.patientType === "new") pills.push({ label: "new patient" })
  if (conditions.patientType === "existing") pills.push({ label: "existing patient" })
  if (conditions.ageRange?.max) pills.push({ label: `under ${conditions.ageRange.max}` })
  if (conditions.ageRange?.min) pills.push({ label: `over ${conditions.ageRange.min}` })
  if (conditions.insurance) conditions.insurance.forEach((i) => pills.push({ label: i }))
  if (conditions.visitType) pills.push({ label: conditions.visitType === "telehealth" ? "telehealth" : "in-person" })
  if (conditions.apptType) conditions.apptType.forEach((a) => pills.push({ label: a.toLowerCase() }))

  if (pills.length === 0) return <span className="text-muted-foreground text-sm">Always applies</span>

  const parts: React.ReactNode[] = []
  pills.forEach((pill, i) => {
    if (i === 0) {
      parts.push(<span key={`pre-${i}`}>When </span>)
    } else {
      parts.push(<span key={`and-${i}`}> and </span>)
    }
    parts.push(
      <span key={`pill-${i}`} className="inline-flex px-1.5 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">
        {pill.label}
      </span>
    )
  })

  return <span className="text-sm text-muted-foreground">{parts}</span>
}

type PillProps = { children: React.ReactNode; variant: "form" | "requirement" | "message" | "instruction" | "override" }

function OutputPill({ children, variant }: PillProps) {
  const styles = {
    form: "bg-blue-500/10 text-blue-600",
    requirement: "bg-violet-500/10 text-violet-600",
    message: "bg-emerald-500/10 text-emerald-600",
    instruction: "bg-cyan-500/10 text-cyan-600",
    override: "bg-amber-500/10 text-amber-600",
  }
  const icons = {
    form: "\u{1F4C4}",
    requirement: "⚠️",
    message: "✉️",
    instruction: "\u{1F4D6}",
    override: "\u{1F553}",
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${styles[variant]}`}>
      <span className="text-[10px]">{icons[variant]}</span>
      {children}
    </span>
  )
}

export function BookingRulesPage() {
  const navigate = useNavigate()
  const [showInsight, setShowInsight] = useState(true)
  const activeCount = bookingRules.filter((r) => r.active).length

  return (
    <SettingsPageShell>
      <div className="flex items-start justify-between gap-4">
        <SettingsPageHeader
          title="Booking rules"
          description="Conditional overrides that layer on top of appointment type settings based on patient context"
        />
        <div className="flex items-center gap-2 shrink-0 pt-1">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Sparkles className="size-3.5" />
            Describe a workflow
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            Add rule
          </Button>
        </div>
      </div>

      {showInsight && (
        <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 px-4 py-3 flex items-start gap-3">
          <Sparkles className="size-4 text-violet-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm">
              <span className="font-medium">15% of Medicaid patients</span> are missing referrals at check-in.
              Consider adding a referral requirement for Medicaid visits.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 text-violet-600 border-violet-500/30 hover:bg-violet-500/10">
                Create rule
              </Button>
              <button
                onClick={() => setShowInsight(false)}
                className="text-xs text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowInsight(false)}
            className="text-muted-foreground/50 hover:text-muted-foreground bg-transparent border-none cursor-pointer shrink-0"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          {activeCount} active rule{activeCount !== 1 ? "s" : ""}
        </p>
        <div className="flex flex-col gap-2.5">
          {bookingRules.map((rule) => (
            <div
              key={rule.id}
              className="rounded-lg border bg-card p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
              onClick={() => navigate(`/dashboard/settings/booking-rules/edit/${rule.id}`)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`size-1.5 rounded-full shrink-0 ${rule.active ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                    <p className="text-sm font-semibold">{rule.name}</p>
                  </div>
                  <div className="mb-3 ml-3.5">{conditionSentence(rule)}</div>
                  <div className="flex flex-wrap gap-1.5 ml-3.5">
                    {rule.outputs.forms?.map((f) => (
                      <OutputPill key={f.id} variant="form">{f.name}</OutputPill>
                    ))}
                    {rule.outputs.requirements?.map((r) => (
                      <OutputPill key={r} variant="requirement">{r}</OutputPill>
                    ))}
                    {rule.outputs.messages?.map((m) => (
                      <OutputPill key={m} variant="message">{m}</OutputPill>
                    ))}
                    {rule.outputs.instructions?.map((inst) => (
                      <OutputPill key={inst} variant="instruction">{inst}</OutputPill>
                    ))}
                    {rule.outputs.overrides?.leadTime && (
                      <OutputPill variant="override">{rule.outputs.overrides.leadTime} lead time</OutputPill>
                    )}
                    {rule.outputs.overrides?.cancelWindow && (
                      <OutputPill variant="override">{rule.outputs.overrides.cancelWindow} cancel window</OutputPill>
                    )}
                    {rule.outputs.overrides?.bookingChannel && (
                      <OutputPill variant="override">{rule.outputs.overrides.bookingChannel}</OutputPill>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="size-7 rounded-md flex items-center justify-center text-muted-foreground/0 group-hover:text-muted-foreground hover:!text-foreground hover:bg-muted transition-all bg-transparent border-none cursor-pointer outline-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={6}>
                    <DropdownMenuItem onClick={() => navigate(`/dashboard/settings/booking-rules/edit/${rule.id}`)}>
                      <Pencil className="size-4 text-muted-foreground" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ToggleLeft className="size-4 text-muted-foreground" />
                      {rule.active ? "Disable" : "Enable"}
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SettingsPageShell>
  )
}
