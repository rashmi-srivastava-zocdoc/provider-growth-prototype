import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X, ChevronDown, Eye } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  SettingsFormShell,
  FormCard,
  FormRow,
  SwitchRow,
} from "@/pages/products/shared-settings"
import { usePath } from "@/lib/router"
import { bookingRules } from "@/data/booking-rules"
import { forms } from "@/data/forms"

function ConditionPill({ children, onRemove }: { children: React.ReactNode; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
      {children}
      {onRemove && (
        <button onClick={onRemove} className="hover:text-primary/70 bg-transparent border-none cursor-pointer p-0">
          <X className="size-3" />
        </button>
      )}
    </span>
  )
}

function PreviewPanel({ rule }: { rule: (typeof bookingRules)[0] }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="size-3.5 text-muted-foreground" />
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resolved patient experience</p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground/60">Simulating:</span>
          {rule.conditions.patientType && (
            <Badge variant="outline" className="text-[10px]">{rule.conditions.patientType} patient</Badge>
          )}
          {rule.conditions.insurance?.map((i) => (
            <Badge key={i} variant="outline" className="text-[10px]">{i}</Badge>
          ))}
          {rule.conditions.ageRange?.max && (
            <Badge variant="outline" className="text-[10px]">Age &lt; {rule.conditions.ageRange.max}</Badge>
          )}
          {rule.conditions.visitType && (
            <Badge variant="outline" className="text-[10px]">{rule.conditions.visitType}</Badge>
          )}
          {rule.conditions.apptType?.map((a) => (
            <Badge key={a} variant="outline" className="text-[10px]">{a}</Badge>
          ))}
        </div>

        <div className="border-t pt-3 space-y-2">
          <div className="grid grid-cols-[100px_1fr_auto] gap-x-3 gap-y-1.5 text-xs">
            <span className="text-muted-foreground">Booking</span>
            <span>Direct book · 2hr lead time</span>
            <span className="text-muted-foreground/50">from appt type</span>

            {rule.outputs.overrides?.leadTime && (
              <>
                <span className="text-muted-foreground" />
                <span className="text-amber-600">→ {rule.outputs.overrides.leadTime} lead time</span>
                <span className="text-amber-600/60">from this rule</span>
              </>
            )}

            {rule.outputs.requirements && rule.outputs.requirements.length > 0 && (
              <>
                <span className="text-muted-foreground">Requirements</span>
                <span>Basic info, insurance, visit reason</span>
                <span className="text-muted-foreground/50">from appt type</span>
                <span className="text-muted-foreground" />
                <span className="text-violet-600">+ {rule.outputs.requirements.join(", ")}</span>
                <span className="text-violet-600/60">from this rule</span>
              </>
            )}

            {rule.outputs.forms && rule.outputs.forms.length > 0 && (
              <>
                <span className="text-muted-foreground">Forms</span>
                <span>Insurance card photo</span>
                <span className="text-muted-foreground/50">from appt type</span>
                <span className="text-muted-foreground" />
                <span className="text-blue-600">+ {rule.outputs.forms.map((f) => f.name).join(", ")}</span>
                <span className="text-blue-600/60">from this rule</span>
              </>
            )}

            {rule.outputs.messages && rule.outputs.messages.length > 0 && (
              <>
                <span className="text-muted-foreground">Messages</span>
                <span>Confirmation, 48hr reminder</span>
                <span className="text-muted-foreground/50">from appt type</span>
                <span className="text-muted-foreground" />
                <span className="text-emerald-600">+ {rule.outputs.messages.join(", ")}</span>
                <span className="text-emerald-600/60">from this rule</span>
              </>
            )}

            {rule.outputs.instructions && rule.outputs.instructions.length > 0 && (
              <>
                <span className="text-muted-foreground">Instructions</span>
                <span>Arrive 15 min early</span>
                <span className="text-muted-foreground/50">from appt type</span>
                <span className="text-muted-foreground" />
                <span className="text-cyan-600">+ {rule.outputs.instructions.join(", ")}</span>
                <span className="text-cyan-600/60">from this rule</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function BookingRuleEditPage() {
  const path = usePath()
  const id = path.split("/").pop() ?? ""
  const rule = bookingRules.find((r) => r.id === id)
  const [showPreview, setShowPreview] = useState(true)

  if (!rule) {
    return (
      <SettingsFormShell
        backHref="/dashboard/settings/booking-rules"
        backLabel="Booking rules"
        title="Rule not found"
      >
        <p className="text-sm text-muted-foreground">This booking rule doesn't exist.</p>
      </SettingsFormShell>
    )
  }

  return (
    <SettingsFormShell
      backHref="/dashboard/settings/booking-rules"
      backLabel="Booking rules"
      title={rule.name}
      description="Define when this rule applies and what it adds to the patient experience"
    >
      <FormCard title="Rule details">
        <FormRow label="Name" inline>
          <Input defaultValue={rule.name} className="w-64 h-8 text-sm" />
        </FormRow>
        <SwitchRow label="Active" description="Rule applies to matching bookings" checked={rule.active} />
      </FormCard>

      <FormCard title="Conditions">
        <p className="text-xs text-muted-foreground -mt-1">
          This rule applies when all of these conditions are met
        </p>

        <div className="flex flex-wrap gap-2">
          {rule.conditions.patientType && (
            <ConditionPill>Patient is {rule.conditions.patientType}</ConditionPill>
          )}
          {rule.conditions.ageRange?.max && (
            <ConditionPill>Age under {rule.conditions.ageRange.max}</ConditionPill>
          )}
          {rule.conditions.ageRange?.min && (
            <ConditionPill>Age over {rule.conditions.ageRange.min}</ConditionPill>
          )}
          {rule.conditions.insurance?.map((ins) => (
            <ConditionPill key={ins}>Insurance is {ins}</ConditionPill>
          ))}
          {rule.conditions.visitType && (
            <ConditionPill>Visit type is {rule.conditions.visitType}</ConditionPill>
          )}
          {rule.conditions.apptType?.map((at) => (
            <ConditionPill key={at}>Appointment is {at}</ConditionPill>
          ))}
        </div>

        <Select>
          <SelectTrigger className="w-48 h-8 text-sm">
            <div className="flex items-center gap-1.5">
              <Plus className="size-3" />
              <span className="text-muted-foreground">Add condition</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="patient-type">Patient type</SelectItem>
            <SelectItem value="age">Age range</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
            <SelectItem value="visit-type">Visit type</SelectItem>
            <SelectItem value="appt-type">Appointment type</SelectItem>
            <SelectItem value="provider">Provider</SelectItem>
            <SelectItem value="location">Location</SelectItem>
          </SelectContent>
        </Select>
      </FormCard>

      <FormCard title="Outputs">
        <p className="text-xs text-muted-foreground -mt-1">
          What this rule adds to or overrides on the appointment type defaults
        </p>

        {rule.outputs.forms && rule.outputs.forms.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-blue-600">Forms</p>
            <div className="flex flex-wrap gap-1.5">
              {rule.outputs.forms.map((f) => (
                <span key={f.id} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/10 text-blue-600 rounded-md text-xs">
                  📄 {f.name}
                  <X className="size-3 cursor-pointer hover:text-blue-400" />
                </span>
              ))}
            </div>
          </div>
        )}

        {rule.outputs.requirements && rule.outputs.requirements.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-violet-600">Requirements</p>
            <div className="flex flex-wrap gap-1.5">
              {rule.outputs.requirements.map((r) => (
                <span key={r} className="inline-flex items-center gap-1 px-2 py-1 bg-violet-500/10 text-violet-600 rounded-md text-xs">
                  ⚠️ {r}
                  <X className="size-3 cursor-pointer hover:text-violet-400" />
                </span>
              ))}
            </div>
          </div>
        )}

        {rule.outputs.messages && rule.outputs.messages.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-emerald-600">Messages</p>
            <div className="flex flex-wrap gap-1.5">
              {rule.outputs.messages.map((m) => (
                <span key={m} className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-600 rounded-md text-xs">
                  ✉️ {m}
                  <X className="size-3 cursor-pointer hover:text-emerald-400" />
                </span>
              ))}
            </div>
          </div>
        )}

        {rule.outputs.instructions && rule.outputs.instructions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-cyan-600">Instructions</p>
            <div className="flex flex-wrap gap-1.5">
              {rule.outputs.instructions.map((inst) => (
                <span key={inst} className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-500/10 text-cyan-600 rounded-md text-xs">
                  📖 {inst}
                  <X className="size-3 cursor-pointer hover:text-cyan-400" />
                </span>
              ))}
            </div>
          </div>
        )}

        {rule.outputs.overrides && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-amber-600">Overrides</p>
            <div className="flex flex-wrap gap-1.5">
              {rule.outputs.overrides.leadTime && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-600 rounded-md text-xs">
                  🕓 Lead time: {rule.outputs.overrides.leadTime}
                  <X className="size-3 cursor-pointer hover:text-amber-400" />
                </span>
              )}
              {rule.outputs.overrides.cancelWindow && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-600 rounded-md text-xs">
                  🕓 Cancel window: {rule.outputs.overrides.cancelWindow}
                  <X className="size-3 cursor-pointer hover:text-amber-400" />
                </span>
              )}
              {rule.outputs.overrides.bookingChannel && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-600 rounded-md text-xs">
                  🕓 Booking: {rule.outputs.overrides.bookingChannel}
                  <X className="size-3 cursor-pointer hover:text-amber-400" />
                </span>
              )}
            </div>
          </div>
        )}

        <Select>
          <SelectTrigger className="w-48 h-8 text-sm">
            <div className="flex items-center gap-1.5">
              <Plus className="size-3" />
              <span className="text-muted-foreground">Add output</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="form">Form from library</SelectItem>
            <SelectItem value="requirement">Requirement</SelectItem>
            <SelectItem value="message">Message</SelectItem>
            <SelectItem value="instruction">Instruction</SelectItem>
            <SelectItem value="override">Override</SelectItem>
          </SelectContent>
        </Select>
      </FormCard>

      <div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer mb-3"
        >
          <ChevronDown className={`size-3.5 transition-transform ${showPreview ? "" : "-rotate-90"}`} />
          Preview resolved experience
        </button>
        {showPreview && <PreviewPanel rule={rule} />}
      </div>
    </SettingsFormShell>
  )
}
