import { SettingsFormShell, FormCard, SwitchRow } from "../shared-settings"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, GripVertical, X } from "lucide-react"

const highlighted = [
  { name: "Dr. Sarah Chen", specialty: "Cosmetic Dentistry", location: "Midtown East", avatar: "SC" },
  { name: "Dr. Michael Torres", specialty: "General Dentistry", location: "Midtown West", avatar: "MT" },
]

export function HighlightedProvidersPage() {
  return (
    <SettingsFormShell
      backHref="/dashboard/products/practice-solutions/settings/branded-booking"
      backLabel="Branded booking page"
      title="Highlighted providers"
      description="Pin specific providers at the top of search results"
    >
      <FormCard>
        <SwitchRow
          label="Show highlighted providers"
          description="Display pinned providers in a featured section at the top of search results"
          checked
        />
      </FormCard>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{highlighted.length} providers highlighted</p>
        <Button variant="outline" size="sm">
          <Plus className="size-3.5" data-icon="inline-start" />
          Add provider
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {highlighted.map((p, i) => (
          <FormCard key={p.name}>
            <div className="flex items-center gap-3">
              <GripVertical className="size-4 text-muted-foreground/30 cursor-grab shrink-0" />
              <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-primary">{p.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{p.name}</p>
                  <Badge variant="outline" className="text-xs">#{i + 1}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {p.specialty} · {p.location}
                </p>
              </div>
              <button className="size-7 rounded-md flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted transition-colors bg-transparent border-none cursor-pointer">
                <X className="size-3.5" />
              </button>
            </div>
          </FormCard>
        ))}
      </div>

      <FormCard title="Display options">
        <SwitchRow
          label="Show availability badges"
          description="Display 'Available today' or 'Next available' badges on highlighted provider cards"
          checked
        />
        <SwitchRow
          label="Show ratings"
          description="Display patient ratings on highlighted provider cards"
          checked
        />
      </FormCard>
    </SettingsFormShell>
  )
}
