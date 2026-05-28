import { useState } from "react"
import { SettingsFormShell } from "../products/shared-settings"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ChevronRight, ChevronDown, MapPin, Users, AlertCircle } from "lucide-react"
import { useNavigate } from "@/lib/router"

type Group = {
  id: string
  name: string
  type: "brand" | "region" | "division" | "custom"
  parentId: string | null
  locationCount: number
  providerCount: number
  children?: Group[]
}

const groupsData: Group[] = [
  {
    id: "northeast",
    name: "Northeast Region",
    type: "region",
    parentId: null,
    locationCount: 4,
    providerCount: 12,
    children: [
      { id: "manhattan", name: "Manhattan Dental", type: "brand", parentId: "northeast", locationCount: 2, providerCount: 6 },
      { id: "brooklyn", name: "Brooklyn Dental", type: "brand", parentId: "northeast", locationCount: 2, providerCount: 6 },
    ],
  },
  {
    id: "southeast",
    name: "Southeast Region",
    type: "region",
    parentId: null,
    locationCount: 3,
    providerCount: 8,
    children: [
      { id: "miami", name: "Miami Dental", type: "brand", parentId: "southeast", locationCount: 3, providerCount: 8 },
    ],
  },
]

const unassigned = { locations: 1, providers: 2 }

const typeColors: Record<string, string> = {
  brand: "bg-violet-100 text-violet-700",
  region: "bg-blue-100 text-blue-700",
  division: "bg-amber-100 text-amber-700",
  custom: "bg-gray-100 text-gray-700",
}

function GroupRow({ group, depth = 0, isLast = false }: { group: Group; depth?: number; isLast?: boolean }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(true)
  const hasChildren = group.children && group.children.length > 0

  return (
    <>
      <button
        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors text-left cursor-pointer bg-transparent border-none group"
        onClick={() => navigate(`/dashboard/settings/organization/groups/${group.id}`)}
      >
        {depth > 0 && (
          <div className="flex items-center" style={{ width: depth * 20 }}>
            <div className="flex items-center gap-0">
              <span className="text-muted-foreground/20 text-xs">
                {isLast ? "└" : "├"}
              </span>
            </div>
          </div>
        )}

        {hasChildren && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
            className="size-5 flex items-center justify-center rounded hover:bg-muted bg-transparent border-none cursor-pointer shrink-0 -ml-1"
          >
            {expanded ? (
              <ChevronDown className="size-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="size-3 text-muted-foreground" />
            )}
          </button>
        )}

        {!hasChildren && depth === 0 && <div className="w-5 shrink-0 -ml-1" />}

        <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-sm font-medium truncate">{group.name}</span>
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-[18px] border-0 ${typeColors[group.type]}`}>
              {group.type}
            </Badge>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {group.locationCount}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="size-3" />
              {group.providerCount}
            </span>
            <ChevronRight className="size-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </button>

      {hasChildren && expanded && group.children!.map((child, i) => (
        <GroupRow
          key={child.id}
          group={child}
          depth={depth + 1}
          isLast={i === group.children!.length - 1}
        />
      ))}
    </>
  )
}

export function GroupsPage() {
  const navigate = useNavigate()

  return (
    <SettingsFormShell
      backHref="/dashboard/settings/organization"
      backLabel="Organization"
      title="Groups"
      description="Organize locations and providers by brand, region, or division"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {groupsData.length + groupsData.reduce((acc, g) => acc + (g.children?.length ?? 0), 0)} groups · 2 levels
        </p>
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/settings/organization/groups/new")}>
          <Plus className="size-3.5" data-icon="inline-start" />
          New group
        </Button>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        {groupsData.map((group) => (
          <div key={group.id}>
            {group !== groupsData[0] && <div className="border-t" />}
            <GroupRow group={group} />
          </div>
        ))}

        {(unassigned.locations > 0 || unassigned.providers > 0) && (
          <>
            <div className="border-t" />
            <div className="px-5 py-3 flex items-center justify-between bg-amber-50/50">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="size-3.5 text-amber-500" />
                <span className="text-sm text-muted-foreground">Unassigned</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  {unassigned.locations}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="size-3" />
                  {unassigned.providers}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </SettingsFormShell>
  )
}
