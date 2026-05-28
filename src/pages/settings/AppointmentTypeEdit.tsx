import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, Plus, ChevronDown } from "lucide-react"
import { useState } from "react"
import {
  SettingsFormShell,
  FormCard,
  FormRow,
  SwitchRow,
} from "@/pages/products/shared-settings"
import { usePath, useNavigate } from "@/lib/router"
import { appointmentTypes } from "@/pages/settings/AppointmentTypes"
import { bookingRules } from "@/data/booking-rules"

function ResolvedExperiencePreview({ typeName }: { typeName: string }) {
  const matchingRules = bookingRules.filter((r) => r.active)
  const [showPreview, setShowPreview] = useState(true)
  const navigate = useNavigate()

  return (
    <div>
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="flex items-center gap-1.5 text-sm font-semibold cursor-pointer bg-transparent border-none p-0 mb-3"
      >
        <ChevronDown className={`size-3.5 transition-transform ${showPreview ? "" : "-rotate-90"}`} />
        Resolved experience preview
      </button>
      {showPreview && (
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="size-3.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              What a patient sees when booking <span className="font-medium text-foreground">{typeName}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-[10px]">New patient</Badge>
            <Badge variant="outline" className="text-[10px]">Medicaid</Badge>
            <Badge variant="outline" className="text-[10px]">Age 45</Badge>
            <Badge variant="outline" className="text-[10px]">In-person</Badge>
            <button className="text-[10px] text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer">
              Change scenario
            </button>
          </div>

          <div className="border-t pt-3">
            <div className="grid grid-cols-[100px_1fr_auto] gap-x-3 gap-y-1.5 text-xs">
              <span className="text-muted-foreground">Booking</span>
              <span>Direct book · 2hr lead time · 60-day horizon</span>
              <span className="text-muted-foreground/50">from this type</span>

              <span className="text-muted-foreground">Requirements</span>
              <span>Insurance, visit reason</span>
              <span className="text-muted-foreground/50">from this type</span>

              <span className="text-muted-foreground" />
              <span className="text-violet-600">+ Require referral, pre-authorization</span>
              <button
                onClick={() => navigate("/dashboard/settings/booking-rules/edit/r2")}
                className="text-amber-600 text-[11px] bg-transparent border-none cursor-pointer hover:underline p-0 text-right"
              >
                from rule: Medicaid visits
              </button>

              <span className="text-muted-foreground">Intake</span>
              <span>Insurance card photo</span>
              <span className="text-muted-foreground/50">from this type</span>

              <span className="text-muted-foreground" />
              <span className="text-blue-600">+ Registration, Consent, Medical History, HIPAA</span>
              <button
                onClick={() => navigate("/dashboard/settings/booking-rules/edit/r1")}
                className="text-amber-600 text-[11px] bg-transparent border-none cursor-pointer hover:underline p-0 text-right"
              >
                from rule: New patient intake
              </button>

              <span className="text-muted-foreground" />
              <span className="text-blue-600">+ Medicaid Eligibility form</span>
              <button
                onClick={() => navigate("/dashboard/settings/booking-rules/edit/r2")}
                className="text-amber-600 text-[11px] bg-transparent border-none cursor-pointer hover:underline p-0 text-right"
              >
                from rule: Medicaid visits
              </button>

              <span className="text-muted-foreground">Messages</span>
              <span>Confirmation, 48hr reminder</span>
              <span className="text-muted-foreground/50">from this type</span>

              <span className="text-muted-foreground" />
              <span className="text-emerald-600">+ "Bring referral letter" reminder</span>
              <button
                onClick={() => navigate("/dashboard/settings/booking-rules/edit/r2")}
                className="text-amber-600 text-[11px] bg-transparent border-none cursor-pointer hover:underline p-0 text-right"
              >
                from rule: Medicaid visits
              </button>
            </div>
          </div>

          <div className="border-t pt-3 text-center">
            <p className="text-[11px] text-muted-foreground">
              Base from <span className="font-medium text-foreground">{typeName}</span> + overrides from{" "}
              <span className="font-medium text-amber-600">2 booking rules</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export function AppointmentTypeEditPage() {
  const path = usePath()
  const navigate = useNavigate()
  const id = path.split("/").pop() ?? ""
  const type = appointmentTypes.find((t) => t.id === id)

  if (!type) {
    return (
      <SettingsFormShell
        backHref="/dashboard/settings/appointment-types"
        backLabel="Appointment types"
        title="Appointment type not found"
      >
        <p className="text-sm text-muted-foreground">This appointment type doesn't exist.</p>
      </SettingsFormShell>
    )
  }

  const durationNum = parseInt(type.duration)
  const isRequestApproval = type.bookingMode === "Request approval"

  return (
    <SettingsFormShell
      backHref="/dashboard/settings/appointment-types"
      backLabel="Appointment types"
      title={type.name}
      description="Settings that differ from booking defaults are marked as overrides"
    >
      <FormCard title="Details">
        <FormRow label="Name" inline>
          <Input defaultValue={type.name} className="w-64 h-8 text-sm" />
        </FormRow>
        <FormRow label="Duration" inline>
          <div className="flex items-center gap-2">
            <Input defaultValue={String(durationNum)} type="number" className="w-20 h-8 text-sm" />
            <span className="text-sm text-muted-foreground">min</span>
            {durationNum !== 30 && (
              <Badge variant="outline" className="text-[10px] text-muted-foreground ml-1">Override</Badge>
            )}
          </div>
        </FormRow>
        <FormRow label="Patient type" inline>
          <Select defaultValue={type.patientType.toLowerCase()}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All patients</SelectItem>
              <SelectItem value="new">New patients</SelectItem>
              <SelectItem value="existing">Existing patients</SelectItem>
            </SelectContent>
          </Select>
        </FormRow>
      </FormCard>

      <FormCard title="Booking">
        <FormRow label="Booking mode" inline>
          <div className="flex items-center gap-2">
            <Select defaultValue={isRequestApproval ? "request" : "self-serve"}>
              <SelectTrigger className="w-48 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self-serve">Self-serve</SelectItem>
                <SelectItem value="request">Request approval</SelectItem>
              </SelectContent>
            </Select>
            {isRequestApproval && (
              <Badge variant="outline" className="text-[10px] text-muted-foreground ml-1">Override</Badge>
            )}
          </div>
        </FormRow>
        <SwitchRow
          label="Available to new patients"
          description="Allow new patients to book this type"
          checked={type.patientType !== "Existing"}
        />
        <FormRow label="Lead time" description="Minimum notice before a booking" inline>
          <div className="flex items-center gap-2">
            <Input defaultValue="2" type="number" className="w-16 h-8 text-sm" />
            <Select defaultValue="hours">
              <SelectTrigger className="w-24 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hours">hours</SelectItem>
                <SelectItem value="days">days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </FormRow>
        <FormRow label="Booking horizon" description="How far in advance patients can book" inline>
          <div className="flex items-center gap-2">
            <Input defaultValue="60" type="number" className="w-20 h-8 text-sm" />
            <span className="text-sm text-muted-foreground">days</span>
          </div>
        </FormRow>
      </FormCard>

      <FormCard title="Requirements">
        <SwitchRow label="Require referral" description="Patient must have a referral to book" />
        <SwitchRow label="Require insurance card" description="Patient must provide insurance information" />
        <SwitchRow label="Require visit description" description="Patient must describe the reason for their visit" />
      </FormCard>

      <FormCard title="Intake">
        <SwitchRow label="Collect insurance photo" description="Ask patient to upload a photo of their insurance card" />
        <SwitchRow label="Collect photo ID" description="Ask patient to upload a government-issued photo ID" />
      </FormCard>

      <FormCard title="Self-pay & cancellation">
        <SwitchRow label="Allow self-pay" description="Let patients book without insurance" checked />
        <FormRow label="Self-pay message" description="Shown to self-pay patients before confirming">
          <Textarea
            defaultValue="We'll connect you with our billing team to discuss pricing before we confirm your appointment."
            rows={2}
            className="text-sm"
          />
        </FormRow>
        <SwitchRow label="Allow rescheduling" description="Patients can reschedule their own appointments" checked />
        <SwitchRow label="Allow cancellation" description="Patients can cancel their own appointments" checked />
        <FormRow label="Cancellation policy" description="Shown when a patient cancels">
          <Textarea
            defaultValue="Cancellations within 24 hours may be subject to a fee."
            rows={2}
            className="text-sm"
          />
        </FormRow>
      </FormCard>

      <FormCard title="Patient communications">
        <FormRow label="Pre-appointment instructions" description="Sent to patients before their visit">
          <Textarea
            defaultValue="Please have your insurance card ready when you arrive. If your insurance has changed, let us know before your appointment."
            rows={3}
            className="text-sm"
          />
        </FormRow>
        <FormRow label="Post-appointment instructions" description="Sent to patients after their visit">
          <Textarea
            defaultValue="Your next appointment details have been sent to your email. If you need to reschedule, use the link in your confirmation."
            rows={3}
            className="text-sm"
          />
        </FormRow>
      </FormCard>

      <FormCard title="Intake forms">
        <p className="text-xs text-muted-foreground -mt-1">
          Forms assigned to all patients booking this appointment type. Booking rules may add more forms based on patient context.
        </p>
        <div className="flex items-center gap-3 py-1.5">
          <div className="size-7 rounded bg-muted flex items-center justify-center shrink-0">
            <FileText className="size-3 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm">Insurance card photo</p>
            <p className="text-xs text-muted-foreground">Always collected for this type</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard/settings/forms")}
          className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer"
        >
          <Plus className="size-3" />
          Add form from library
        </button>
      </FormCard>

      <ResolvedExperiencePreview typeName={type.name} />
    </SettingsFormShell>
  )
}
