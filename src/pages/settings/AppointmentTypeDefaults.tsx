import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
  SettingsFormShell,
  FormCard,
  FormRow,
  SwitchRow,
  SectionHeading,
} from "@/pages/products/shared-settings"

export function AppointmentTypeDefaultsPage() {
  return (
    <SettingsFormShell
      backHref="/dashboard/settings/appointment-types"
      backLabel="Appointment types"
      title="Booking defaults"
      description="These values apply to all appointment types unless overridden"
    >
      <FormCard title="Booking timing">
        <FormRow label="Default duration" description="For new patients" inline>
          <div className="flex items-center gap-2">
            <Input defaultValue="30" type="number" className="w-20 h-8 text-sm" />
            <span className="text-sm text-muted-foreground">min</span>
          </div>
        </FormRow>
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

      <FormCard title="Booking mode">
        <FormRow label="Default booking mode" inline>
          <Select defaultValue="self-serve">
            <SelectTrigger className="w-48 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="self-serve">Self-serve</SelectItem>
              <SelectItem value="request">Request approval</SelectItem>
            </SelectContent>
          </Select>
        </FormRow>
        <SwitchRow label="Available to new patients" description="Allow new patients to book this type" checked />
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
    </SettingsFormShell>
  )
}
