import { SettingsFormShell, FormCard, FormRow, SwitchRow } from "../shared-settings"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const groups = [
  { name: "General dentists", providers: 18, budget: "$3,500", spent: "$2,180", pct: 62 },
  { name: "Specialists", providers: 12, budget: "$3,000", spent: "$1,450", pct: 48 },
  { name: "New providers", providers: 6, budget: "$2,000", spent: "$870", pct: 44 },
]

export function SpendManagementPage() {
  return (
    <SettingsFormShell
      backHref="/dashboard/products/marketplace/settings"
      backLabel="Marketplace settings"
      title="Spend management"
      description="Set budgets and caps for providers on Marketplace"
    >
      <FormCard title="Global limits">
        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Monthly budget cap">
            <Input defaultValue="8500" type="number" />
          </FormRow>
          <FormRow label="Daily spend limit">
            <Input defaultValue="400" type="number" />
          </FormRow>
        </div>
        <SwitchRow
          label="Auto-pause at cap"
          description="Automatically pause all Marketplace providers when monthly budget is reached"
          checked
        />
        <SwitchRow
          label="Carry over unused budget"
          description="Roll unused monthly budget into the next month"
        />
      </FormCard>

      <FormCard title="Group budgets">
        <p className="text-xs text-muted-foreground -mt-2">
          Budget allocation by account group. Groups are managed in Account groups settings.
        </p>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left font-medium text-muted-foreground px-3 py-2">Group</th>
                <th className="text-left font-medium text-muted-foreground px-3 py-2">Providers</th>
                <th className="text-left font-medium text-muted-foreground px-3 py-2">Budget</th>
                <th className="text-left font-medium text-muted-foreground px-3 py-2">Spent</th>
                <th className="text-left font-medium text-muted-foreground px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.name} className="border-b last:border-0">
                  <td className="px-3 py-2.5 font-medium">{g.name}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{g.providers}</td>
                  <td className="px-3 py-2.5">{g.budget}/mo</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{g.spent}</span>
                      <Badge variant="outline" className="text-xs">{g.pct}%</Badge>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <button className="text-xs text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FormCard>

      <FormCard title="Alerts">
        <FormRow label="Budget alert threshold" description="Get notified when spend reaches this percentage of monthly cap" inline>
          <div className="flex items-center gap-2">
            <Input defaultValue="80" type="number" className="w-20" />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
        </FormRow>
        <SwitchRow
          label="Weekly spend digest"
          description="Email summary of Marketplace spend every Monday"
          checked
        />
      </FormCard>
    </SettingsFormShell>
  )
}
