import { SettingsFormShell, FormCard } from "../shared-settings"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Users, Zap } from "lucide-react"

const groups = [
  { name: "General dentists", type: "static" as const, providers: 18, budget: "$3,500/mo", rules: null },
  { name: "Specialists", type: "static" as const, providers: 12, budget: "$3,000/mo", rules: null },
  { name: "New providers", type: "dynamic" as const, providers: 6, budget: "$2,000/mo", rules: "Added in last 90 days" },
  { name: "High performers", type: "dynamic" as const, providers: 8, budget: "No cap", rules: "Conversion rate > 60%" },
  { name: "Low activity", type: "static" as const, providers: 4, budget: "$500/mo", rules: null },
]

export function AccountGroupsPage() {
  return (
    <SettingsFormShell
      backHref="/dashboard/products/marketplace/settings"
      backLabel="Marketplace settings"
      title="Account groups"
      description="Organize providers into groups for budgets and targeting"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{groups.length} groups</p>
        <Button variant="outline" size="sm">
          <Plus className="size-3.5" data-icon="inline-start" />
          Add group
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {groups.map((g) => (
          <FormCard key={g.name}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
                  {g.type === "dynamic" ? (
                    <Zap className="size-3.5 text-amber-500" />
                  ) : (
                    <Users className="size-3.5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{g.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant={g.type === "dynamic" ? "secondary" : "outline"} className="text-xs">
                      {g.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{g.providers} providers</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-xs text-muted-foreground">{g.budget}</span>
                  </div>
                  {g.rules && (
                    <p className="text-xs text-muted-foreground/60 mt-1">Rule: {g.rules}</p>
                  )}
                </div>
              </div>
              <button className="text-xs text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer mt-0.5">
                Edit
              </button>
            </div>
          </FormCard>
        ))}
      </div>
    </SettingsFormShell>
  )
}
