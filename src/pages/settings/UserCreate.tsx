import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  SettingsPageShell,
  SettingsPageHeader,
  FormCard,
  FormRow,
} from "../products/shared-settings"
import { useNavigate, usePath } from "@/lib/router"
import { usePractice } from "@/context/PracticeContext"
import { permissionAreas, permissionCategories } from "@/data/permissions"
import { ArrowLeft, ChevronDown, ChevronRight, Check, FolderIcon, MapPinIcon } from "lucide-react"
import type { PermissionAreaId, Role, Group, TeamMember } from "@/types"

type GroupTreeNode = Group & { children: GroupTreeNode[] }

function buildGroupTree(groups: Group[]): GroupTreeNode[] {
  const nodes: GroupTreeNode[] = groups.map((g) => ({ ...g, children: [] }))
  const byId = new Map(nodes.map((n) => [n.id, n]))
  const roots: GroupTreeNode[] = []
  nodes.forEach((n) => {
    if (n.parentId && byId.has(n.parentId)) {
      byId.get(n.parentId)!.children.push(n)
    } else {
      roots.push(n)
    }
  })
  return roots
}

function GroupTreePicker({
  groups,
  locations,
  selectedGroupIds,
  selectedLocationIds,
  onToggleGroup,
  onToggleLocation,
}: {
  groups: Group[]
  locations: { id: string; name: string }[]
  selectedGroupIds: Set<string>
  selectedLocationIds: Set<string>
  onToggleGroup: (id: string) => void
  onToggleLocation: (id: string) => void
}) {
  const roots = useMemo(() => buildGroupTree(groups), [groups])
  const [expanded, setExpanded] = useState<Set<string>>(new Set(groups.map((g) => g.id)))

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function renderNode(node: GroupTreeNode, depth: number) {
    const hasChildren = node.children.length > 0 || node.locationIds.length > 0
    const isExpanded = expanded.has(node.id)
    const isSelected = selectedGroupIds.has(node.id)
    const nodeLocations = locations.filter((l) => node.locationIds.includes(l.id))

    return (
      <div key={node.id}>
        <div
          className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-muted/50 cursor-pointer"
          style={{ paddingLeft: 8 + depth * 20 }}
        >
          {hasChildren ? (
            <button onClick={() => toggleExpand(node.id)} className="size-4 flex items-center justify-center shrink-0">
              {isExpanded ? <ChevronDown className="size-3 text-muted-foreground" /> : <ChevronRight className="size-3 text-muted-foreground" />}
            </button>
          ) : (
            <div className="size-4 shrink-0" />
          )}
          <Checkbox checked={isSelected} onCheckedChange={() => onToggleGroup(node.id)} />
          <FolderIcon className="size-3.5 text-muted-foreground shrink-0" />
          <span className="text-sm">{node.name}</span>
        </div>
        {isExpanded && (
          <>
            {node.children.map((child) => renderNode(child, depth + 1))}
            {nodeLocations.map((loc) => (
              <div
                key={loc.id}
                className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-muted/50 cursor-pointer"
                style={{ paddingLeft: 8 + (depth + 1) * 20 }}
              >
                <div className="size-4 shrink-0" />
                <Checkbox checked={selectedLocationIds.has(loc.id)} onCheckedChange={() => onToggleLocation(loc.id)} />
                <MapPinIcon className="size-3.5 text-muted-foreground shrink-0" />
                <span className="text-sm">{loc.name}</span>
              </div>
            ))}
          </>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card max-h-64 overflow-y-auto p-1">
      {roots.map((root) => renderNode(root, 0))}
    </div>
  )
}

function PermissionCheckboxes({
  selected,
  onToggle,
  isViewOnly,
}: {
  selected: Set<PermissionAreaId>
  onToggle: (id: PermissionAreaId) => void
  isViewOnly: boolean
}) {
  return (
    <div className="flex flex-col gap-5">
      {permissionCategories.map((cat) => {
        const areas = permissionAreas.filter((a) => a.category === cat.id)
        if (areas.length === 0) return null
        return (
          <div key={cat.id} className="flex flex-col gap-2.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{cat.label}</p>
            {areas.map((area) => (
              <label key={area.id} className="flex items-start gap-3 cursor-pointer group">
                <Checkbox
                  checked={selected.has(area.id)}
                  onCheckedChange={() => onToggle(area.id)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{area.label}</span>
                    {isViewOnly && selected.has(area.id) && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">View only</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{area.description}</p>
                </div>
              </label>
            ))}
          </div>
        )
      })}
    </div>
  )
}

function ReviewSummary({
  name,
  email,
  role,
  scopeType,
  selectedGroupIds,
  selectedLocationIds,
  selectedPermissions,
  groups,
  locations,
  isViewOnly,
}: {
  name: string
  email: string
  role: Role | null
  scopeType: "all" | "specific"
  selectedGroupIds: Set<string>
  selectedLocationIds: Set<string>
  selectedPermissions: Set<PermissionAreaId>
  groups: Group[]
  locations: { id: string; name: string }[]
  isViewOnly: boolean
}) {
  const scopeNames: string[] = []
  if (scopeType === "all") {
    scopeNames.push("All locations")
  } else {
    groups.filter((g) => selectedGroupIds.has(g.id)).forEach((g) => scopeNames.push(g.name))
    locations.filter((l) => selectedLocationIds.has(l.id)).forEach((l) => scopeNames.push(l.name))
  }

  const permNames = permissionAreas.filter((a) => selectedPermissions.has(a.id)).map((a) => a.label)

  return (
    <div className="rounded-lg border bg-muted/30 p-5 flex flex-col gap-4">
      <p className="text-sm font-semibold">Review</p>
      <div className="grid grid-cols-[100px_1fr] gap-y-3 gap-x-4 text-sm">
        <span className="text-muted-foreground">Name</span>
        <span className="font-medium">{name || "—"}</span>
        <span className="text-muted-foreground">Email</span>
        <span>{email || "—"}</span>
        <span className="text-muted-foreground">Role</span>
        <div className="flex items-center gap-2">
          <span>{role?.name ?? "Custom"}</span>
          {isViewOnly && <Badge variant="outline" className="text-[10px] px-1.5 py-0">View only</Badge>}
        </div>
        <span className="text-muted-foreground">Access</span>
        <span>{scopeNames.join(", ") || "—"}</span>
        <span className="text-muted-foreground">Permissions</span>
        <span>{permNames.length === permissionAreas.length ? "All permissions" : permNames.join(", ") || "None selected"}</span>
      </div>
    </div>
  )
}

function parseMember(member: TeamMember) {
  const parts = member.name.split(" ")
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  }
}

export function UserCreatePage() {
  const navigate = useNavigate()
  const path = usePath()
  const { roles = [], groups = [], locations, teamMembers } = usePractice()

  const editId = path.startsWith("/dashboard/settings/users/edit/")
    ? path.replace("/dashboard/settings/users/edit/", "")
    : null
  const editingMember = editId ? teamMembers.find((m) => m.id === editId) ?? null : null
  const isEdit = editingMember !== null

  const parsed = editingMember ? parseMember(editingMember) : null
  const editRole = editingMember ? roles.find((r) => r.id === editingMember.roleId) ?? null : null

  const [firstName, setFirstName] = useState(parsed?.firstName ?? "")
  const [lastName, setLastName] = useState(parsed?.lastName ?? "")
  const [email, setEmail] = useState(editingMember?.email ?? "")
  const [jobTitle, setJobTitle] = useState(editingMember?.jobTitle ?? "")

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(editingMember?.roleId ?? null)
  const [selectedPermissions, setSelectedPermissions] = useState<Set<PermissionAreaId>>(
    new Set(editRole?.permissions ?? [])
  )
  const [isCustom, setIsCustom] = useState(false)

  const [scopeType, setScopeType] = useState<"all" | "specific">(editingMember?.scope.type ?? "all")
  const [selectedGroupIds, setSelectedGroupIds] = useState<Set<string>>(
    new Set(editingMember?.scope.groupIds ?? [])
  )
  const [selectedLocationIds, setSelectedLocationIds] = useState<Set<string>>(
    new Set(editingMember?.scope.locationIds ?? [])
  )

  const selectedRole = roles.find((r) => r.id === selectedRoleId) ?? null
  const isViewOnly = selectedRole?.isViewOnly ?? false

  function selectRole(role: Role) {
    setSelectedRoleId(role.id)
    setSelectedPermissions(new Set(role.permissions))
    setIsCustom(false)
  }

  function togglePermission(id: PermissionAreaId) {
    setSelectedPermissions((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setIsCustom(true)
    setSelectedRoleId(null)
  }

  function toggleGroup(id: string) {
    setSelectedGroupIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleLocation(id: string) {
    setSelectedLocationIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const starterRoles = roles.filter((r) => r.isStarter)
  const customRoles = roles.filter((r) => !r.isStarter)
  const fullName = [firstName, lastName].filter(Boolean).join(" ")

  return (
    <SettingsPageShell>
      <button
        onClick={() => navigate("/dashboard/settings/users")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none w-fit -mb-4"
      >
        <ArrowLeft className="size-3.5" />
        Users
      </button>
      <SettingsPageHeader
        title={isEdit ? "Edit user" : "Add user"}
        description={isEdit ? `Update ${editingMember!.name}'s role, access, and permissions` : "Invite a new user to your Zocdoc account"}
      />

      {/* Basic information */}
      <FormCard title="Basic information">
        <div className="grid grid-cols-2 gap-4">
          <FormRow label="First name">
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-8 text-sm" placeholder="First name" />
          </FormRow>
          <FormRow label="Last name">
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-8 text-sm" placeholder="Last name" />
          </FormRow>
        </div>
        <FormRow label="Email address">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-8 text-sm" placeholder="name@practice.com" type="email" />
        </FormRow>
        <FormRow label="Job title" description="Helps identify this user's function">
          <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="h-8 text-sm" placeholder="e.g. Location Manager, Front Desk" />
        </FormRow>
      </FormCard>

      {/* Role */}
      <FormCard title="Role">
        <p className="text-xs text-muted-foreground -mt-1">Select a role template or customize permissions below</p>
        <div className="flex flex-wrap gap-2">
          {starterRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => selectRole(role)}
              className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${
                selectedRoleId === role.id
                  ? "border-primary bg-primary/5 text-primary font-medium"
                  : "border-border hover:border-foreground/20 text-foreground"
              }`}
            >
              {role.name}
            </button>
          ))}
          {customRoles.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <button className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${
                  isCustom || customRoles.some((r) => r.id === selectedRoleId)
                    ? "border-primary bg-primary/5 text-primary font-medium"
                    : "border-border hover:border-foreground/20 text-foreground"
                }`} />
              }>
                Custom
                <ChevronDown className="size-3 ml-1 inline" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {customRoles.map((role) => (
                  <DropdownMenuItem key={role.id} onClick={() => selectRole(role)}>
                    {role.name}
                    {role.id === selectedRoleId && <Check className="size-3.5 ml-auto" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {selectedRole && (
          <p className="text-xs text-muted-foreground">{selectedRole.description}</p>
        )}
      </FormCard>

      {/* Access */}
      <FormCard title="Organization access">
        <p className="text-xs text-muted-foreground -mt-1">Select which locations this user can view and manage</p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="scope"
              checked={scopeType === "all"}
              onChange={() => setScopeType("all")}
              className="accent-primary"
            />
            <span className="text-sm">All locations</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="scope"
              checked={scopeType === "specific"}
              onChange={() => setScopeType("specific")}
              className="accent-primary"
            />
            <span className="text-sm">Specific groups or locations</span>
          </label>
        </div>
        {scopeType === "specific" && (
          <GroupTreePicker
            groups={groups}
            locations={locations}
            selectedGroupIds={selectedGroupIds}
            selectedLocationIds={selectedLocationIds}
            onToggleGroup={toggleGroup}
            onToggleLocation={toggleLocation}
          />
        )}
      </FormCard>

      {/* Permissions */}
      <FormCard title="Permissions">
        <PermissionCheckboxes
          selected={selectedPermissions}
          onToggle={togglePermission}
          isViewOnly={isViewOnly}
        />
      </FormCard>

      {/* Review */}
      <ReviewSummary
        name={fullName}
        email={email}
        role={isCustom ? null : selectedRole}
        scopeType={scopeType}
        selectedGroupIds={selectedGroupIds}
        selectedLocationIds={selectedLocationIds}
        selectedPermissions={selectedPermissions}
        groups={groups}
        locations={locations}
        isViewOnly={isViewOnly}
      />

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-1">
        <Button variant="outline" onClick={() => navigate("/dashboard/settings/users")}>Cancel</Button>
        <Button>{isEdit ? "Save changes" : "Send invite"}</Button>
      </div>
    </SettingsPageShell>
  )
}
