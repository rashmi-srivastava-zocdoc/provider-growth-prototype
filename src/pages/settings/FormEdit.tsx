import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, GripVertical, Plus, Trash2 } from "lucide-react"
import {
  SettingsFormShell,
  FormCard,
  FormRow,
} from "@/pages/products/shared-settings"
import { usePath } from "@/lib/router"
import { forms } from "@/data/forms"
import { bookingRules } from "@/data/booking-rules"

const fieldTypes = [
  { value: "text", label: "Short text" },
  { value: "long-text", label: "Long text" },
  { value: "date", label: "Date" },
  { value: "checkbox", label: "Checkbox" },
  { value: "select", label: "Dropdown" },
  { value: "signature", label: "Signature" },
  { value: "file", label: "File upload" },
]

const sampleFields: Record<string, { label: string; type: string; required: boolean }[]> = {
  f1: [
    { label: "Full name", type: "text", required: true },
    { label: "Date of birth", type: "date", required: true },
    { label: "Address", type: "text", required: true },
    { label: "Phone number", type: "text", required: true },
    { label: "Email", type: "text", required: true },
    { label: "Emergency contact", type: "text", required: true },
    { label: "Emergency contact phone", type: "text", required: true },
    { label: "Primary insurance", type: "text", required: false },
    { label: "Policy number", type: "text", required: false },
    { label: "Employer", type: "text", required: false },
    { label: "Preferred pharmacy", type: "text", required: false },
    { label: "How did you hear about us?", type: "select", required: false },
    { label: "Signature", type: "signature", required: true },
    { label: "Date signed", type: "date", required: true },
  ],
  f5: [
    { label: "Medicaid ID number", type: "text", required: true },
    { label: "Plan name", type: "text", required: true },
    { label: "Effective date", type: "date", required: true },
    { label: "PCP name", type: "text", required: true },
    { label: "PCP phone", type: "text", required: false },
    { label: "Referral number", type: "text", required: false },
    { label: "Upload Medicaid card (front)", type: "file", required: true },
    { label: "Upload Medicaid card (back)", type: "file", required: true },
  ],
}

function defaultFields(count: number) {
  const base = [
    { label: "Full name", type: "text", required: true },
    { label: "Date of birth", type: "date", required: true },
    { label: "Signature", type: "signature", required: true },
  ]
  while (base.length < count) {
    base.splice(base.length - 1, 0, { label: `Field ${base.length}`, type: "text", required: false })
  }
  return base.slice(0, count)
}

export function FormEditPage() {
  const path = usePath()
  const id = path.split("/").pop() ?? ""
  const form = forms.find((f) => f.id === id)

  if (!form) {
    return (
      <SettingsFormShell
        backHref="/dashboard/settings/forms"
        backLabel="Forms"
        title="Form not found"
      >
        <p className="text-sm text-muted-foreground">This form doesn't exist.</p>
      </SettingsFormShell>
    )
  }

  const rulesUsing = bookingRules.filter((r) =>
    r.outputs.forms?.some((f) => f.id === form.id)
  )
  const fields = sampleFields[form.id] ?? defaultFields(form.fieldCount)

  return (
    <SettingsFormShell
      backHref="/dashboard/settings/forms"
      backLabel="Forms"
      title={form.name}
      description={`${form.source === "upload" ? "PDF upload" : form.source === "template" ? "Template" : "Custom"} · ${form.fieldCount} fields · Edited ${form.lastEdited}`}
    >
      <FormCard title="Details">
        <FormRow label="Form name" inline>
          <Input defaultValue={form.name} className="w-64 h-8 text-sm" />
        </FormRow>
        <FormRow label="Source" inline>
          <Badge className={`text-xs border-0 ${form.source === "template" ? "bg-blue-500/10 text-blue-600" : form.source === "upload" ? "bg-amber-500/10 text-amber-600" : "bg-violet-500/10 text-violet-600"}`}>
            {form.source === "template" ? "Template" : form.source === "upload" ? "PDF upload" : "Custom"}
          </Badge>
        </FormRow>
      </FormCard>

      {form.source === "upload" ? (
        <FormCard title="PDF preview">
          <div className="rounded-lg border border-dashed border-muted-foreground/20 bg-muted/30 flex items-center justify-center py-16">
            <div className="text-center">
              <FileText className="size-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">PDF preview</p>
              <p className="text-xs text-muted-foreground/60 mt-1">{form.name}.pdf</p>
            </div>
          </div>
        </FormCard>
      ) : (
        <FormCard title="Fields">
          <div className="flex flex-col gap-0">
            {fields.map((field, i) => (
              <div key={i} className="flex items-center gap-2 py-2 group border-b border-border/50 last:border-b-0">
                <GripVertical className="size-3.5 text-muted-foreground/30 shrink-0 cursor-grab" />
                <Input defaultValue={field.label} className="h-7 text-sm flex-1" />
                <Select defaultValue={field.type}>
                  <SelectTrigger className="w-28 h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map((ft) => (
                      <SelectItem key={ft.value} value={ft.value}>{ft.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant={field.required ? "default" : "outline"} className="text-[10px] cursor-pointer shrink-0">
                  {field.required ? "Required" : "Optional"}
                </Badge>
                <button className="size-6 rounded-md flex items-center justify-center text-muted-foreground/0 group-hover:text-muted-foreground hover:!text-destructive hover:bg-muted transition-all bg-transparent border-none cursor-pointer shrink-0">
                  <Trash2 className="size-3" />
                </button>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer mt-1">
            <Plus className="size-3" />
            Add field
          </button>
        </FormCard>
      )}

      <FormCard title="Used in">
        {rulesUsing.length > 0 ? (
          <div className="flex flex-col gap-2">
            {rulesUsing.map((rule) => (
              <div key={rule.id} className="flex items-center gap-2 text-sm">
                <div className={`size-1.5 rounded-full ${rule.active ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                <span className="font-medium">{rule.name}</span>
                <span className="text-muted-foreground">booking rule</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Not used in any booking rules. Add this form to a rule to assign it to patients.</p>
        )}
      </FormCard>
    </SettingsFormShell>
  )
}
