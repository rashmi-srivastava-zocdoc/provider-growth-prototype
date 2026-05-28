import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  SettingsPageShell,
  SettingsPageHeader,
} from "../products/shared-settings"
import { useNavigate } from "@/lib/router"
import { usePractice } from "@/context/PracticeContext"
import { Plus, ChevronRight, ChevronDown, MapPin, Users, AlertCircle } from "lucide-react"
import type { Group } from "@/types"

type GroupTreeNode = Group & {
  locationCount: number
  providerCount: number
  children: GroupTreeNode[]
}

function useGroupTree() {
  const { groups = [], locations, providers } = usePractice()

  return useMemo(() => {
    const assignedLocationIds = new Set(groups.flatMap((g) => g.locationIds))
    const assignedProviderIds = new Set<string>()

    const nodes: GroupTreeNode[] = groups.map((g) => {
      const groupLocIds = new Set(g.locationIds)
      const providerIds = new Set(g.manualProviderIds)
      providers.forEach((p) => {
        if (p.locationIds.some((lid) => groupLocIds.has(lid))) providerIds.add(p.id)
      })
      providerIds.forEach((id) => assignedProviderIds.add(id))

      return {
        ...g,
        locationCount: g.locationIds.length,
        providerCount: providerIds.size,
        children: [],
      }
    })

    const byId = new Map(nodes.map((n) => [n.id, n]))
    const roots: GroupTreeNode[] = []
    nodes.forEach((n) => {
      if (n.parentId && byId.has(n.parentId)) {
        byId.get(n.parentId)!.children.push(n)
      } else {
        roots.push(n)
      }
    })

    function rollUp(node: GroupTreeNode): { locs: number; provs: number } {
      let locs = node.locationCount
      let provs = node.providerCount
      for (const child of node.children) {
        const sub = rollUp(child)
        locs += sub.locs
        provs += sub.provs
      }
      node.locationCount = locs
      node.providerCount = provs
      return { locs, provs }
    }
    roots.forEach(rollUp)

    const unassignedLocations = locations.filter((l) => !assignedLocationIds.has(l.id)).length
    const unassignedProviders = providers.filter((p) => !assignedProviderIds.has(p.id)).length

    return { roots, unassignedLocations, unassignedProviders }
  }, [groups, locations, providers])
}

function GroupRow({ group, depth = 0, isLast = false }: { group: GroupTreeNode; depth?: number; isLast?: boolean }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(true)
  const hasChildren = group.children.length > 0

  return (
    <>
      <div
        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors text-left cursor-pointer group"
        onClick={() => navigate(`/dashboard/settings/organization/groups/${group.id}`)}
      >
        {depth > 0 && (
          <div className="flex items-center" style={{ width: depth * 20 }}>
            <span className="text-muted-foreground/20 text-xs">
              {isLast ? "└" : "├"}
            </span>
          </div>
        )}

        {hasChildren && (
          <span
            role="button"
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
            className="size-5 flex items-center justify-center rounded hover:bg-muted cursor-pointer shrink-0 -ml-1"
          >
            {expanded ? (
              <ChevronDown className="size-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="size-3 text-muted-foreground" />
            )}
          </span>
        )}

        {!hasChildren && <div className="w-5 shrink-0 -ml-1" />}

        <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-sm font-medium truncate">{group.name}</span>
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
      </div>

      {hasChildren && expanded && group.children.map((child, i) => (
        <GroupRow
          key={child.id}
          group={child}
          depth={depth + 1}
          isLast={i === group.children.length - 1}
        />
      ))}
    </>
  )
}

export function OrganizationPage() {
  const navigate = useNavigate()
  const { roots, unassignedLocations, unassignedProviders } = useGroupTree()

  return (
    <SettingsPageShell>
      <div className="flex items-start justify-between gap-4">
        <SettingsPageHeader
          title="Groups"
          description="Organize locations and providers by brand, region, or division"
        />
        <Button variant="outline" size="sm" className="shrink-0 mt-0.5" onClick={() => navigate("/dashboard/settings/organization/groups/new")}>
          <Plus className="size-3.5" data-icon="inline-start" />
          New group
        </Button>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
          {roots.map((group, i) => (
            <div key={group.id}>
              {i > 0 && <div className="border-t" />}
              <GroupRow group={group} />
            </div>
          ))}

          {(unassignedLocations > 0 || unassignedProviders > 0) && (
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
                    {unassignedLocations}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="size-3" />
                    {unassignedProviders}
                  </span>
                </div>
              </div>
            </>
          )}
      </div>
    </SettingsPageShell>
  )
}
