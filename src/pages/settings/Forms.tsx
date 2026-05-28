import { FileText, Upload, Plus, MoreHorizontal, Pencil, Copy, Trash2, Sparkles, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "@/lib/router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  SettingsPageShell,
  SettingsPageHeader,
  SettingsGroup,
} from "@/pages/products/shared-settings"
import { forms } from "@/data/forms"

const sourceLabels: Record<string, string> = {
  template: "Template",
  upload: "PDF upload",
  custom: "Custom",
}

const sourceColors: Record<string, string> = {
  template: "bg-blue-500/10 text-blue-600",
  upload: "bg-amber-500/10 text-amber-600",
  custom: "bg-violet-500/10 text-violet-600",
}

export function FormsPage() {
  const navigate = useNavigate()
  const [showSuggestion, setShowSuggestion] = useState(true)

  return (
    <SettingsPageShell>
      <div className="flex items-start justify-between gap-4">
        <SettingsPageHeader
          title="Forms"
          description="Intake forms assigned to patients via appointment types or booking rules"
        />
        <div className="flex items-center gap-2 shrink-0 pt-1">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Upload className="size-3.5" />
            Upload PDF
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            Create form
          </Button>
        </div>
      </div>

      {showSuggestion && (
        <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 px-4 py-3 flex items-start gap-3">
          <Sparkles className="size-4 text-violet-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm">
              Based on your specialty <span className="font-medium">(dermatology)</span>, we recommend adding{" "}
              <span className="font-medium">Skin Health History</span> and{" "}
              <span className="font-medium">Photo Consent</span> forms.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 text-violet-600 border-violet-500/30 hover:bg-violet-500/10">
                <Sparkles className="size-3" />
                Add suggested
              </Button>
              <button
                onClick={() => setShowSuggestion(false)}
                className="text-xs text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowSuggestion(false)}
            className="text-muted-foreground/50 hover:text-muted-foreground bg-transparent border-none cursor-pointer shrink-0"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <SettingsGroup>
        <div className="flex items-center justify-between px-5 py-3.5">
          <p className="text-sm font-medium">{forms.length} forms</p>
        </div>
        {forms.map((form) => (
          <div
            key={form.id}
            className="flex items-center justify-between gap-4 px-5 py-3.5 group hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => navigate(`/dashboard/settings/forms/edit/${form.id}`)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <FileText className="size-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{form.name}</p>
                  <Badge className={`text-[10px] border-0 ${sourceColors[form.source]}`}>
                    {sourceLabels[form.source]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {form.fieldCount} fields · Edited {form.lastEdited}
                  {form.usedInRules.length > 0
                    ? ` · Used in ${form.usedInRules.length} rule${form.usedInRules.length > 1 ? "s" : ""}`
                    : " · Not used"}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="size-7 rounded-md flex items-center justify-center text-muted-foreground/0 group-hover:text-muted-foreground hover:!text-foreground hover:bg-muted transition-all bg-transparent border-none cursor-pointer outline-none"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={6}>
                <DropdownMenuItem onClick={() => navigate(`/dashboard/settings/forms/edit/${form.id}`)}>
                  <Pencil className="size-4 text-muted-foreground" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="size-4 text-muted-foreground" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </SettingsGroup>
    </SettingsPageShell>
  )
}
