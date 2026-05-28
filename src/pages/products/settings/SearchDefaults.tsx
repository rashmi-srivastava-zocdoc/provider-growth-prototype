import { SettingsFormShell, FormCard, FormRow } from "../shared-settings"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const specialties = [
  "Dentist",
  "Orthodontist",
  "Periodontist",
  "Endodontist",
  "Oral Surgeon",
  "Pediatric Dentist",
  "Prosthodontist",
]

const radiusOptions = ["5", "10", "15", "25", "50"]

export function SearchDefaultsPage() {
  return (
    <SettingsFormShell
      backHref="/dashboard/products/practice-solutions/settings/branded-booking"
      backLabel="Branded booking page"
      title="Search defaults"
      description="Default zip code and specialty for the directory landing page"
    >
      <FormCard title="Landing page defaults">
        <p className="text-xs text-muted-foreground -mt-2">
          These values pre-fill the search form when a patient first visits your directory. Patients can change them.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Default zip code">
            <Input defaultValue="10016" />
          </FormRow>
          <FormRow label="Search radius">
            <Select defaultValue="10">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {radiusOptions.map((r) => (
                  <SelectItem key={r} value={r}>{r} miles</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormRow>
        </div>
        <FormRow label="Default specialty">
          <Select defaultValue="Dentist">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormRow>
      </FormCard>

      <FormCard title="Filters">
        <p className="text-xs text-muted-foreground -mt-2">
          Restrict results to specific insurance plans or availability windows.
        </p>
        <FormRow label="Default insurance filter" description="Leave blank to show all insurance plans">
          <Input placeholder="e.g., Aetna PPO" />
        </FormRow>
        <FormRow label="Availability window" description="Only show providers with openings within this window">
          <Select defaultValue="any">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any availability</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="3days">Next 3 days</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="2weeks">Next 2 weeks</SelectItem>
            </SelectContent>
          </Select>
        </FormRow>
      </FormCard>
    </SettingsFormShell>
  )
}
