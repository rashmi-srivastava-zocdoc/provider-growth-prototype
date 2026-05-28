import { SettingsFormShell, FormCard, FormRow } from "../shared-settings"
import { Input } from "@/components/ui/input"
import { Upload, Image, FileImage } from "lucide-react"

function UploadArea({ label, current, dimensions }: { label: string; current?: string; dimensions: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">{label}</label>
      <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 flex items-center gap-4 hover:border-muted-foreground/30 transition-colors">
        {current ? (
          <div className="size-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Image className="size-5 text-muted-foreground" />
          </div>
        ) : (
          <div className="size-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Upload className="size-5 text-muted-foreground/50" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {current ? (
            <>
              <p className="text-sm font-medium truncate">{current}</p>
              <p className="text-xs text-muted-foreground">{dimensions}</p>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">Drop file here or click to upload</p>
              <p className="text-xs text-muted-foreground/60">{dimensions}</p>
            </>
          )}
        </div>
        <button className="text-xs text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer shrink-0">
          {current ? "Replace" : "Upload"}
        </button>
      </div>
    </div>
  )
}

export function BrandSettingsPage() {
  return (
    <SettingsFormShell
      backHref="/dashboard/products/practice-solutions/settings/branded-booking"
      backLabel="Branded booking page"
      title="Brand"
      description="Theme color, logos, and favicon"
    >
      <FormCard title="Colors">
        <FormRow label="Primary color" description="Used for buttons, links, and accents throughout the directory" inline>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg border" style={{ backgroundColor: "#2563EB" }} />
            <Input defaultValue="#2563EB" className="w-32 font-mono" />
          </div>
        </FormRow>
      </FormCard>

      <FormCard title="Logo">
        <UploadArea
          label="Header logo"
          current="midtown-dental-logo.svg"
          dimensions="SVG or PNG · Max 200 x 48px"
        />
        <UploadArea
          label="Logo mark"
          current="midtown-dental-mark.png"
          dimensions="Square, SVG or PNG · 64 x 64px recommended"
        />
      </FormCard>

      <FormCard title="Favicon">
        <UploadArea
          label="Favicon"
          current="favicon.ico"
          dimensions="ICO or PNG · 32 x 32px"
        />
      </FormCard>

      <FormCard title="Preview">
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="h-12 flex items-center px-4 border-b" style={{ backgroundColor: "#2563EB" }}>
            <div className="flex items-center gap-2">
              <FileImage className="size-4 text-white/80" />
              <span className="text-sm font-medium text-white">Midtown Dental Associates</span>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="h-3 w-48 bg-muted rounded" />
            <div className="h-3 w-32 bg-muted rounded" />
            <div className="mt-2 h-8 w-28 rounded-lg flex items-center justify-center text-xs text-white font-medium" style={{ backgroundColor: "#2563EB" }}>
              Book now
            </div>
          </div>
        </div>
      </FormCard>
    </SettingsFormShell>
  )
}
