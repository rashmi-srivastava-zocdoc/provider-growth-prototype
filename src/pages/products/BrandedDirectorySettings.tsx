import { ExternalLink, Pencil, X, Eye } from "lucide-react"
import { useNavigate } from "@/lib/router"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  SettingsFormShell,
  SettingsSection,
  SettingsGroup,
  InlineRow,
  NavigationRow,
  SwitchToggle,
} from "./shared-settings"

function ImageSettingRow({
  label,
  changeLabel,
  removeLabel,
  children,
}: {
  label: string
  changeLabel?: string
  removeLabel?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <p className="text-sm font-medium">{label}</p>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer rounded-lg outline-none transition-opacity hover:opacity-80">
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={6} className="min-w-40">
          <DropdownMenuItem>
            <Pencil className="size-4 text-muted-foreground" />
            {changeLabel ?? "Change image"}
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <X className="size-4" />
            {removeLabel ?? "Remove image"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function BrandedDirectorySettingsPage() {
  const navigate = useNavigate()

  return (
    <SettingsFormShell
      backHref="/dashboard/products/practice-solutions/settings"
      backLabel="Practice Solutions settings"
      title="Branded booking page"
      description="Manage your practice's branded booking page"
    >
      <SettingsSection title="Directory">
        <SettingsGroup>
          <InlineRow
            label="Published"
            description="Make this directory publicly accessible"
          >
            <SwitchToggle defaultChecked />
          </InlineRow>
          <InlineRow label="Display name">
            <Input defaultValue="Midtown Dental Associates" className="w-56 h-8 text-sm" />
          </InlineRow>
          <InlineRow label="URL slug">
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1.5 rounded-l border border-r-0 border-input h-8 flex items-center">
                zocdoc.com/wl/
              </span>
              <Input defaultValue="midtown-dental" className="w-36 h-8 text-sm rounded-l-none" />
            </div>
          </InlineRow>
          <InlineRow label="Live URL">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-xs">
                Active
              </Badge>
              <a href="#" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                zocdoc.com/wl/midtown-dental
                <ExternalLink className="size-3" />
              </a>
            </div>
          </InlineRow>
        </SettingsGroup>
      </SettingsSection>

      <SettingsSection title="SEO">
        <SettingsGroup>
          <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Meta title</label>
              <p className="text-xs text-muted-foreground -mt-1">Appears in browser tabs and search results</p>
              <Input defaultValue="Midtown Dental Associates — Book appointments online" className="text-sm" />
              <p className="text-xs text-muted-foreground">52 / 60 characters</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Meta description</label>
              <p className="text-xs text-muted-foreground -mt-1">Appears below the title in search results</p>
              <Textarea
                defaultValue="Find and book appointments with dentists at Midtown Dental Associates. Online scheduling, same-day availability, and accepted insurance plans."
                rows={2}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground">142 / 160 characters</p>
            </div>
          </div>
        </SettingsGroup>
      </SettingsSection>

      <SettingsSection
        title="Brand"
        action={
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Eye className="size-3.5" />
            Preview
          </a>
        }
      >
        <SettingsGroup>
          <InlineRow label="Primary color">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded border" style={{ backgroundColor: "#2563EB" }} />
              <span className="text-sm text-muted-foreground font-mono">#2563EB</span>
            </div>
          </InlineRow>
          <ImageSettingRow label="Header logo" changeLabel="Change logo" removeLabel="Remove logo">
            <div className="h-8 px-3 rounded bg-[#2563EB] flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-white tracking-tight">M</span>
              <span className="text-[9px] font-medium text-white/90">Midtown Dental</span>
            </div>
          </ImageSettingRow>
          <ImageSettingRow label="Logo mark" changeLabel="Change mark" removeLabel="Remove mark">
            <div className="size-9 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <span className="text-sm font-bold text-white">M</span>
            </div>
          </ImageSettingRow>
          <ImageSettingRow label="Favicon" changeLabel="Change favicon" removeLabel="Remove favicon">
            <div className="size-6 rounded bg-[#2563EB] flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">M</span>
            </div>
          </ImageSettingRow>
        </SettingsGroup>
      </SettingsSection>

      <SettingsSection title="Search & discovery">
        <SettingsGroup>
          <NavigationRow
            title="Search defaults"
            description="Default zip code, specialty, and filters"
            onClick={() => navigate("/dashboard/products/practice-solutions/settings/search-defaults")}
          />
          <NavigationRow
            title="Highlighted providers"
            description="Pin specific providers at the top of search results"
            summary="2 providers highlighted"
            onClick={() => navigate("/dashboard/products/practice-solutions/settings/highlighted-providers")}
          />
        </SettingsGroup>
      </SettingsSection>
    </SettingsFormShell>
  )
}
