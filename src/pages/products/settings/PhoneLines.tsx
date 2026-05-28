import { SettingsFormShell, FormCard } from "../shared-settings"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Phone, TestTube } from "lucide-react"

const lines = [
  { number: "(212) 555-0100", label: "Main line", type: "production" as const, status: "active" as const, calls: "142 calls this week" },
  { number: "(212) 555-0101", label: "After hours", type: "production" as const, status: "active" as const, calls: "38 calls this week" },
  { number: "(212) 555-0102", label: "Spanish line", type: "production" as const, status: "active" as const, calls: "24 calls this week" },
  { number: "(212) 555-0103", label: "Overflow", type: "production" as const, status: "active" as const, calls: "9 calls this week" },
  { number: "(212) 555-9901", label: "QA testing", type: "test" as const, status: "active" as const, calls: "Test line" },
  { number: "(212) 555-9902", label: "Demo line", type: "test" as const, status: "active" as const, calls: "Test line" },
]

export function PhoneLinesPage() {
  return (
    <SettingsFormShell
      backHref="/dashboard/products/practice-solutions/settings/phone-assistant"
      backLabel="AI phone assistant"
      title="Phone lines"
      description="Manage phone numbers and test lines"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">{lines.filter(l => l.type === "production").length} lines active</p>
          <span className="text-muted-foreground/30">·</span>
          <p className="text-sm text-muted-foreground">{lines.filter(l => l.type === "test").length} test numbers</p>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="size-3.5" data-icon="inline-start" />
          Add line
        </Button>
      </div>

      <FormCard title="Production lines">
        <div className="flex flex-col divide-y -mx-5 -mb-4">
          {lines.filter(l => l.type === "production").map((line) => (
            <div key={line.number} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Phone className="size-3.5 text-violet-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium font-mono">{line.number}</p>
                    <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-200">
                      Active
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{line.label} · {line.calls}</p>
                </div>
              </div>
              <button className="text-xs text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer">
                Configure
              </button>
            </div>
          ))}
        </div>
      </FormCard>

      <FormCard title="Test lines">
        <p className="text-xs text-muted-foreground -mt-2">
          Test lines let you try the phone assistant without affecting real patients. Calls are not recorded or billed.
        </p>
        <div className="flex flex-col divide-y -mx-5 -mb-4">
          {lines.filter(l => l.type === "test").map((line) => (
            <div key={line.number} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <TestTube className="size-3.5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium font-mono">{line.number}</p>
                  <p className="text-xs text-muted-foreground">{line.label}</p>
                </div>
              </div>
              <button className="text-xs text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer">
                Configure
              </button>
            </div>
          ))}
        </div>
      </FormCard>
    </SettingsFormShell>
  )
}
