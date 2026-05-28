import { useState, useMemo } from "react"
import { SettingsFormShell, SettingsSection, SettingsGroup, InlineRow, SwitchRow, NavigationRow } from "../products/shared-settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
  Plus, X, Building2, Search, Check, Info, ExternalLink,
} from "lucide-react"
import { useNavigate, usePath } from "@/lib/router"
import { usePractice } from "@/context/PracticeContext"
import type { Location, Provider, Group } from "@/types"

function LocationPicker({ onClose, onAdd, existingIds, allLocations }: {
  onClose: () => void
  onAdd: (ids: string[]) => void
  existingIds: string[]
  allLocations: Location[]
}) {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])

  const available = allLocations.filter((l) => !existingIds.includes(l.id))
  const filtered = available.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.address.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="rounded-lg border bg-card shadow-lg mt-2">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="h-8 text-sm pl-8"
            autoFocus
          />
        </div>
      </div>
      <div className="max-h-48 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground px-3 py-4 text-center">No locations available</p>
        ) : (
          filtered.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelected((s) => s.includes(loc.id) ? s.filter((id) => id !== loc.id) : [...s, loc.id])}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 text-left bg-transparent border-none cursor-pointer"
            >
              <div className={`size-4 rounded border flex items-center justify-center shrink-0 ${selected.includes(loc.id) ? "bg-primary border-primary" : "border-border"}`}>
                {selected.includes(loc.id) && <Check className="size-3 text-white" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{loc.name}</p>
                <p className="text-xs text-muted-foreground truncate">{loc.address}</p>
              </div>
            </button>
          ))
        )}
      </div>
      <div className="p-3 border-t flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
        <Button size="sm" disabled={selected.length === 0} onClick={() => { onAdd(selected); onClose() }}>
          Add ({selected.length})
        </Button>
      </div>
    </div>
  )
}

function ProviderPicker({ onClose, onAdd, existingIds, allProviders }: {
  onClose: () => void
  onAdd: (ids: string[]) => void
  existingIds: string[]
  allProviders: Provider[]
}) {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])

  const available = allProviders.filter((p) => !existingIds.includes(p.id))
  const filtered = available.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="rounded-lg border bg-card shadow-lg mt-2">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search providers..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="h-8 text-sm pl-8"
            autoFocus
          />
        </div>
      </div>
      <div className="max-h-48 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground px-3 py-4 text-center">No providers available</p>
        ) : (
          filtered.map((prov) => (
            <button
              key={prov.id}
              onClick={() => setSelected((s) => s.includes(prov.id) ? s.filter((id) => id !== prov.id) : [...s, prov.id])}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 text-left bg-transparent border-none cursor-pointer"
            >
              <div className={`size-4 rounded border flex items-center justify-center shrink-0 ${selected.includes(prov.id) ? "bg-primary border-primary" : "border-border"}`}>
                {selected.includes(prov.id) && <Check className="size-3 text-white" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">Dr. {prov.name}</p>
                <p className="text-xs text-muted-foreground truncate">{prov.specialties.join(", ")}</p>
              </div>
            </button>
          ))
        )}
      </div>
      <div className="p-3 border-t flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
        <Button size="sm" disabled={selected.length === 0} onClick={() => { onAdd(selected); onClose() }}>
          Add ({selected.length})
        </Button>
      </div>
    </div>
  )
}

export function GroupDetailPage() {
  const path = usePath()
  const navigate = useNavigate()
  const practiceData = usePractice()
  const groupId = path.split("/").pop() || ""
  const isNew = groupId === "new"
  const groups = practiceData.groups ?? []
  const group = !isNew ? groups.find((g) => g.id === groupId) : undefined

  const [patientFacingEnabled, setPatientFacingEnabled] = useState(
    group?.patientFacing?.enabled ?? false
  )
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [showProviderPicker, setShowProviderPicker] = useState(false)
  const [addedLocationIds, setAddedLocationIds] = useState<string[]>(
    group ? [...group.locationIds] : []
  )
  const [addedManualProviderIds, setAddedManualProviderIds] = useState<string[]>(
    group ? [...group.manualProviderIds] : []
  )

  const locations = practiceData.locations.filter((l) => addedLocationIds.includes(l.id))
  const locationIdSet = new Set(addedLocationIds)

  const autoProviders = useMemo(
    () => practiceData.providers.filter((p) => p.locationIds.some((lid) => locationIdSet.has(lid))),
    [practiceData.providers, addedLocationIds]
  )
  const manualProviders = practiceData.providers.filter((p) => addedManualProviderIds.includes(p.id))
  const allGroupProviders = useMemo(() => {
    const seen = new Set<string>()
    const result: (Provider & { source: "auto" | "manual" })[] = []
    autoProviders.forEach((p) => { seen.add(p.id); result.push({ ...p, source: "auto" }) })
    manualProviders.forEach((p) => { if (!seen.has(p.id)) result.push({ ...p, source: "manual" }) })
    return result
  }, [autoProviders, manualProviders])

  const children = groups.filter((g) => g.parentId === group?.id)
  const parentGroup = group?.parentId ? groups.find((g) => g.id === group.parentId) : undefined
  const topLevelGroups = groups.filter((g) => !g.parentId && g.id !== group?.id)

  const bdCount = allGroupProviders.filter((p) => p.products?.some((pr) => pr.productId === "practice_solutions" && pr.status === "live")).length
  const mktCount = allGroupProviders.filter((p) => p.products?.some((pr) => pr.productId === "marketplace" && pr.status === "live")).length

  return (
    <SettingsFormShell
      backHref="/dashboard/settings/organization"
      backLabel="Organization"
      title={isNew ? "New group" : (group?.name ?? "")}
      description={isNew
        ? "Create a group to organize locations and providers"
        : (parentGroup ? `Part of ${parentGroup.name}` : "Top-level group")
      }
    >
      {/* Details */}
      <SettingsSection title="Details">
        <SettingsGroup>
          <InlineRow label="Name">
            <Input
              defaultValue={group?.name ?? ""}
              placeholder={isNew ? "e.g., Manhattan" : undefined}
              className="w-48 h-8 text-sm"
              autoFocus={isNew}
            />
          </InlineRow>
          <InlineRow label="Parent group">
            <Select defaultValue={group?.parentId || "none"}>
              <SelectTrigger className="w-48 h-8 text-sm">
                <SelectValue>
                  {(value: string) => {
                    if (value === "none") return "None (top-level)"
                    const g = groups.find((gr) => gr.id === value)
                    return g?.name ?? value
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (top-level)</SelectItem>
                {topLevelGroups.map((g) => (
                  <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InlineRow>
        </SettingsGroup>
      </SettingsSection>

      {/* Patient-facing brand */}
      <SettingsSection title="Patient-facing brand">
        <SettingsGroup>
          <SwitchRow
            label="Enable patient-facing brand"
            description={<>Patients discover and book with this group as its own practice on Zocdoc, not under the parent organization. <a href="#" className="text-primary hover:underline" onClick={(e) => e.stopPropagation()}>Learn more</a></>}
            checked={patientFacingEnabled}
            onCheckedChange={setPatientFacingEnabled}
          />
          {patientFacingEnabled && (
            <InlineRow label="Logo" description="Shown on the practice profile, provider pages, and search results">
              <div className="size-10 rounded-lg border-2 border-dashed border-border flex items-center justify-center shrink-0 bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors">
                <Plus className="size-3.5 text-muted-foreground/50" />
              </div>
            </InlineRow>
          )}
          {patientFacingEnabled && (
            <InlineRow label="Brand name" description="How patients find this practice on Zocdoc">
              <Input
                defaultValue={group?.patientFacing?.brandName ?? ""}
                placeholder="e.g., Riverdale Medical — Manhattan"
                className="w-64 h-8 text-sm"
              />
            </InlineRow>
          )}
          {patientFacingEnabled && (
            <InlineRow label="Phone">
              <Input
                defaultValue={group?.patientFacing?.phone ?? ""}
                placeholder="(555) 555-0000"
                className="w-48 h-8 text-sm"
              />
            </InlineRow>
          )}
          {patientFacingEnabled && (
            <InlineRow label="Website">
              <Input
                defaultValue={group?.patientFacing?.website ?? ""}
                placeholder="www.example.com"
                className="w-64 h-8 text-sm"
              />
            </InlineRow>
          )}
          {patientFacingEnabled && (
            <InlineRow label="Description" description="Shown on your Zocdoc practice profile">
              <Textarea
                defaultValue={group?.patientFacing?.description ?? ""}
                placeholder="Tell patients about this practice..."
                className="text-sm min-h-[72px] w-64"
              />
            </InlineRow>
          )}
        </SettingsGroup>
        {patientFacingEnabled && (
          <div className="flex justify-end px-1 pt-1.5">
            <a href="#" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              Preview profile<ExternalLink className="size-3" />
            </a>
          </div>
        )}
      </SettingsSection>

      {/* Locations */}
      <SettingsSection
        title="Locations"
        description={isNew ? "Assign locations to this group" : undefined}
        action={
          <Button variant="outline" size="sm" onClick={() => setShowLocationPicker(!showLocationPicker)}>
            <Plus className="size-3.5" data-icon="inline-start" />
            Add locations
          </Button>
        }
      >
        {showLocationPicker && (
          <LocationPicker
            onClose={() => setShowLocationPicker(false)}
            onAdd={(ids) => setAddedLocationIds((prev) => [...prev, ...ids])}
            existingIds={addedLocationIds}
            allLocations={practiceData.locations}
          />
        )}
        {locations.length > 0 ? (
          <SettingsGroup>
            {locations.map((loc) => (
              <div key={loc.id} className="flex items-center justify-between gap-4 px-5 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Building2 className="size-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{loc.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{loc.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {loc.providerIds.length > 0 && (
                    <span className="text-xs text-muted-foreground">{loc.providerIds.length} providers</span>
                  )}
                  <button
                    onClick={() => setAddedLocationIds((prev) => prev.filter((id) => id !== loc.id))}
                    className="size-6 rounded flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted bg-transparent border-none cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </SettingsGroup>
        ) : (
          <div className="rounded-lg border border-dashed bg-muted/20 px-5 py-8 text-center">
            <p className="text-sm text-muted-foreground">No locations added yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Add locations to associate their providers with this group</p>
          </div>
        )}
      </SettingsSection>

      {/* Providers */}
      <SettingsSection
        title="Providers"
        description={allGroupProviders.length > 0
          ? `${autoProviders.length} from locations · ${manualProviders.length} manually added`
          : "Providers at assigned locations are added automatically. You can also add providers manually."
        }
        action={
          <Button variant="outline" size="sm" onClick={() => setShowProviderPicker(!showProviderPicker)}>
            <Plus className="size-3.5" data-icon="inline-start" />
            Add providers
          </Button>
        }
      >
        {showProviderPicker && (
          <ProviderPicker
            onClose={() => setShowProviderPicker(false)}
            onAdd={(ids) => setAddedManualProviderIds((prev) => [...prev, ...ids])}
            existingIds={allGroupProviders.map((p) => p.id)}
            allProviders={practiceData.providers}
          />
        )}

        {allGroupProviders.length > 0 ? (
          <SettingsGroup>
            {allGroupProviders.slice(0, 6).map((prov) => {
              const locNames = practiceData.locations
                .filter((l) => prov.locationIds.includes(l.id) && addedLocationIds.includes(l.id))
                .map((l) => l.name)

              return (
                <div key={prov.id} className="flex items-center justify-between gap-4 px-5 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-muted-foreground">{prov.initials}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">Dr. {prov.name}</p>
                        {prov.source === "manual" && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-[18px]">manual</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {prov.specialties.join(", ")}{locNames.length > 0 ? ` · ${locNames.join(", ")}` : ""}
                      </p>
                    </div>
                  </div>
                  {prov.source === "manual" && (
                    <button
                      onClick={() => setAddedManualProviderIds((prev) => prev.filter((id) => id !== prov.id))}
                      className="size-6 rounded flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted bg-transparent border-none cursor-pointer shrink-0"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>
              )
            })}
            {allGroupProviders.length > 6 && (
              <button className="w-full px-5 py-2.5 text-xs text-primary hover:bg-muted/50 bg-transparent border-none cursor-pointer text-center">
                Show all {allGroupProviders.length} providers
              </button>
            )}
          </SettingsGroup>
        ) : (
          <div className="rounded-lg border border-dashed bg-muted/20 px-5 py-8 text-center">
            <p className="text-sm text-muted-foreground">No providers added manually</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Providers at assigned locations will be associated automatically</p>
          </div>
        )}
      </SettingsSection>

      {/* Sub-groups — only in edit mode */}
      {!isNew && children.length > 0 && (
        <SettingsSection title="Sub-groups">
          <SettingsGroup>
            {children.map((child) => {
              const childLocCount = child.locationIds.length
              const childLocIds = new Set(child.locationIds)
              const childProvCount = practiceData.providers.filter((p) =>
                p.locationIds.some((lid) => childLocIds.has(lid))
              ).length

              return (
                <NavigationRow
                  key={child.id}
                  title={child.name}
                  description={`${childLocCount} locations · ${childProvCount} providers`}
                  onClick={() => navigate(`/dashboard/settings/organization/groups/${child.id}`)}
                />
              )
            })}
          </SettingsGroup>
        </SettingsSection>
      )}

      {/* Billing summary — only in edit mode with providers */}
      {!isNew && allGroupProviders.length > 0 && (
        <SettingsSection title="Billing summary">
          <SettingsGroup>
            <div className="px-5 py-3 flex items-center gap-2">
              <Info className="size-3.5 text-muted-foreground/50 shrink-0" />
              <p className="text-xs text-muted-foreground">
                Based on providers homed to this group
              </p>
            </div>
            <InlineRow label="Practice Solutions" description={`${bdCount} providers enrolled`}>
              <span className="text-sm font-medium">${(bdCount * 250).toLocaleString()}/mo</span>
            </InlineRow>
            <InlineRow label="Marketplace" description={`${mktCount} providers active`}>
              <span className="text-sm text-muted-foreground">Per booking</span>
            </InlineRow>
          </SettingsGroup>
        </SettingsSection>
      )}
    </SettingsFormShell>
  )
}
