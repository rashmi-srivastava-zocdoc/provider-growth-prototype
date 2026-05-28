import { useState } from "react"
import { SettingsFormShell, SettingsSection, SettingsGroup, InlineRow } from "../products/shared-settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus, X, Building2, Search, Check } from "lucide-react"
import { useNavigate } from "@/lib/router"

const availableLocations = [
  { id: "l1", name: "5th Avenue Office", address: "123 5th Ave, New York, NY" },
  { id: "l2", name: "Broadway Clinic", address: "456 Broadway, New York, NY" },
  { id: "l3", name: "Park Slope Office", address: "789 7th Ave, Brooklyn, NY" },
  { id: "l4", name: "Court Street Office", address: "321 Court St, Brooklyn, NY" },
  { id: "l5", name: "Miami Beach Office", address: "100 Ocean Dr, Miami Beach, FL" },
  { id: "l6", name: "Coral Gables Office", address: "200 Miracle Mile, Coral Gables, FL" },
  { id: "l7", name: "Brickell Clinic", address: "300 Brickell Ave, Miami, FL" },
  { id: "l8", name: "Doral Clinic", address: "400 NW 87th Ave, Doral, FL" },
]

const availableProviders = [
  { id: "p1", name: "Dr. Sarah Chen", specialty: "General Dentistry" },
  { id: "p2", name: "Dr. Michael Park", specialty: "Orthodontics" },
  { id: "p3", name: "Dr. Lisa Wang", specialty: "Pediatric Dentistry" },
  { id: "p12", name: "Dr. Tom Harris", specialty: "Prosthodontics" },
  { id: "p30", name: "Dr. Emma Wilson", specialty: "General Dentistry" },
  { id: "p31", name: "Dr. Robert Tanaka", specialty: "Orthodontics" },
]

function LocationPicker({ onClose, onAdd, selectedIds }: { onClose: () => void; onAdd: (ids: string[]) => void; selectedIds: string[] }) {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])

  const available = availableLocations.filter((l) => !selectedIds.includes(l.id))
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

function ProviderPicker({ onClose, onAdd, selectedIds }: { onClose: () => void; onAdd: (ids: string[]) => void; selectedIds: string[] }) {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])

  const available = availableProviders.filter((p) => !selectedIds.includes(p.id))
  const filtered = available.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.specialty.toLowerCase().includes(search.toLowerCase())
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
                <p className="text-sm font-medium truncate">{prov.name}</p>
                <p className="text-xs text-muted-foreground truncate">{prov.specialty}</p>
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

export function GroupCreatePage() {
  const navigate = useNavigate()
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [showProviderPicker, setShowProviderPicker] = useState(false)
  const [addedLocationIds, setAddedLocationIds] = useState<string[]>([])
  const [addedProviderIds, setAddedProviderIds] = useState<string[]>([])

  const addedLocations = availableLocations.filter((l) => addedLocationIds.includes(l.id))
  const addedProvs = availableProviders.filter((p) => addedProviderIds.includes(p.id))

  return (
    <SettingsFormShell
      backHref="/dashboard/settings/organization"
      backLabel="Organization"
      title="New group"
      description="Create a group to organize locations and providers"
    >
      {/* Details */}
      <SettingsSection title="Details">
        <SettingsGroup>
          <InlineRow label="Name">
            <Input placeholder="e.g., Northeast Region" className="w-48 h-8 text-sm" autoFocus />
          </InlineRow>
          <InlineRow label="Parent group">
            <Select defaultValue="none">
              <SelectTrigger className="w-48 h-8 text-sm">
                <SelectValue>
                  {(value: string) => ({ none: "None (top-level)", northeast: "Northeast Region", southeast: "Southeast Region" }[value] ?? value)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (top-level)</SelectItem>
                <SelectItem value="northeast">Northeast Region</SelectItem>
                <SelectItem value="southeast">Southeast Region</SelectItem>
              </SelectContent>
            </Select>
          </InlineRow>
        </SettingsGroup>
      </SettingsSection>

      {/* Locations */}
      <SettingsSection
        title="Locations"
        description="Assign locations to this group"
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
            selectedIds={addedLocationIds}
          />
        )}
        {addedLocations.length > 0 ? (
          <SettingsGroup>
            {addedLocations.map((loc) => (
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
                <button
                  onClick={() => setAddedLocationIds((prev) => prev.filter((id) => id !== loc.id))}
                  className="size-6 rounded flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted bg-transparent border-none cursor-pointer shrink-0"
                >
                  <X className="size-3.5" />
                </button>
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
        description="Providers at assigned locations are added automatically. You can also add providers manually."
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
            onAdd={(ids) => setAddedProviderIds((prev) => [...prev, ...ids])}
            selectedIds={addedProviderIds}
          />
        )}
        {addedProvs.length > 0 ? (
          <SettingsGroup>
            {addedProvs.map((prov) => (
              <div key={prov.id} className="flex items-center justify-between gap-4 px-5 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-muted-foreground">
                      {prov.name.split(" ").slice(1).map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{prov.name}</p>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-[18px]">manual</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{prov.specialty}</p>
                  </div>
                </div>
                <button
                  onClick={() => setAddedProviderIds((prev) => prev.filter((id) => id !== prov.id))}
                  className="size-6 rounded flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted bg-transparent border-none cursor-pointer shrink-0"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </SettingsGroup>
        ) : (
          <div className="rounded-lg border border-dashed bg-muted/20 px-5 py-8 text-center">
            <p className="text-sm text-muted-foreground">No providers added manually</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Providers at assigned locations will be associated automatically</p>
          </div>
        )}
      </SettingsSection>
    </SettingsFormShell>
  )
}
