import { SettingsFormShell, FormCard, FormRow, SwitchRow } from "../shared-settings"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export function PageConfigurationPage() {
  return (
    <SettingsFormShell
      backHref="/dashboard/products/practice-solutions/settings/branded-booking"
      backLabel="Branded booking page"
      title="Page configuration"
      description="URL, name, and SEO for your directory"
    >
      <FormCard title="Directory page">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Active</Badge>
          <a href="#" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
            zocdoc.com/wl/midtown-dental
            <ExternalLink className="size-3" />
          </a>
        </div>
        <FormRow label="URL slug" description="Your directory will be available at zocdoc.com/wl/[slug]">
          <div className="flex items-center gap-0">
            <span className="text-sm text-muted-foreground bg-muted px-2.5 py-1.5 rounded-l-lg border border-r-0 border-input h-8 flex items-center">
              zocdoc.com/wl/
            </span>
            <Input defaultValue="midtown-dental" className="rounded-l-none" />
          </div>
        </FormRow>
        <FormRow label="Display name">
          <Input defaultValue="Midtown Dental Associates" />
        </FormRow>
        <SwitchRow
          label="Published"
          description="Make this directory publicly accessible"
          checked
        />
      </FormCard>

      <FormCard title="SEO">
        <FormRow label="Meta title" description="Appears in browser tabs and search results">
          <Input defaultValue="Midtown Dental Associates — Book appointments online" />
          <p className="text-xs text-muted-foreground mt-1">52 / 60 characters</p>
        </FormRow>
        <FormRow label="Meta description" description="Appears below the title in search results">
          <Textarea
            defaultValue="Find and book appointments with dentists at Midtown Dental Associates. Online scheduling, same-day availability, and accepted insurance plans."
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">142 / 160 characters</p>
        </FormRow>
      </FormCard>
    </SettingsFormShell>
  )
}
