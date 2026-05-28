import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  UserPlusIcon,
  ChevronDownIcon,
  UploadIcon,
  DownloadIcon,
  SearchIcon,
  MoreHorizontalIcon,
  MailIcon,
  PencilIcon,
  ShieldOffIcon,
  MapPinIcon,
  FolderIcon,
} from "lucide-react"
import { usePageHeaderActions } from "@/context/HeaderActionsContext"
import { usePractice } from "@/context/PracticeContext"
import { useNavigate } from "@/lib/router"
import type { TeamMember, Role } from "@/types"

function useRoleMap() {
  const { roles = [] } = usePractice()
  return useMemo(() => {
    const map = new Map<string, Role>()
    roles.forEach((r) => map.set(r.id, r))
    return map
  }, [roles])
}

function scopeLabel(member: TeamMember, groups: { id: string; name: string }[], locations: { id: string; name: string }[]): string {
  if (member.scope.type === "all") return "All locations"
  const parts: string[] = []
  if (member.scope.groupIds) {
    member.scope.groupIds.forEach((gid) => {
      const g = groups.find((gr) => gr.id === gid)
      if (g) parts.push(g.name)
    })
  }
  if (member.scope.locationIds) {
    member.scope.locationIds.forEach((lid) => {
      const l = locations.find((lo) => lo.id === lid)
      if (l) parts.push(l.name)
    })
  }
  return parts.length > 0 ? parts.join(", ") : "No access"
}

function StatusBadge({ status }: { status: TeamMember["status"] }) {
  if (status === "active") return <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-xs">Active</Badge>
  if (status === "invited") return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-xs">Invited</Badge>
  return <Badge variant="outline" className="text-muted-foreground text-xs">Deactivated</Badge>
}

function timeAgo(isoDate: string | null): string {
  if (!isoDate) return "Never"
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  if (days < 30) return `${days}d ago`
  return new Date(isoDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function UsersPage() {
  const navigate = useNavigate()
  const { teamMembers, groups = [], locations } = usePractice()
  const roleMap = useRoleMap()
  const [search, setSearch] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  usePageHeaderActions(
    <ButtonGroup>
      <Button onClick={() => navigate("/dashboard/settings/users/new")}>
        <UserPlusIcon />
        Add user
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button aria-label="More options" />}>
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <UploadIcon />
            Bulk import
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DownloadIcon />
            Export users
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )

  const uniqueRoles = useMemo(() => {
    const ids = new Set(teamMembers.map((m) => m.roleId))
    return Array.from(ids).map((id) => roleMap.get(id)).filter(Boolean) as Role[]
  }, [teamMembers, roleMap])

  const filtered = useMemo(() => {
    return teamMembers.filter((m) => {
      if (search) {
        const q = search.toLowerCase()
        if (!m.name.toLowerCase().includes(q) && !m.email.toLowerCase().includes(q) && !(m.jobTitle || "").toLowerCase().includes(q)) return false
      }
      if (filterRole !== "all" && m.roleId !== filterRole) return false
      if (filterStatus !== "all" && m.status !== filterStatus) return false
      return true
    })
  }, [teamMembers, search, filterRole, filterStatus])

  const activeCount = teamMembers.filter((m) => m.status === "active").length
  const invitedCount = teamMembers.filter((m) => m.status === "invited").length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>{activeCount} active</span>
        {invitedCount > 0 && (
          <>
            <span className="text-border">·</span>
            <span>{invitedCount} pending</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
            {filterRole === "all" ? "All roles" : roleMap.get(filterRole)?.name ?? "Role"}
            <ChevronDownIcon className="size-3.5 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterRole("all")}>All roles</DropdownMenuItem>
            {uniqueRoles.map((r) => (
              <DropdownMenuItem key={r.id} onClick={() => setFilterRole(r.id)}>{r.name}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
            {filterStatus === "all" ? "All statuses" : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
            <ChevronDownIcon className="size-3.5 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus("all")}>All statuses</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("invited")}>Invited</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("deactivated")}>Deactivated</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="grid grid-cols-[1fr_140px_180px_80px_80px_36px] gap-4 px-4 py-2.5 border-b bg-muted/40 text-xs font-medium text-muted-foreground">
          <span>User</span>
          <span>Role</span>
          <span>Access</span>
          <span>Status</span>
          <span>Last active</span>
          <span />
        </div>

        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No users match your filters
          </div>
        )}

        {filtered.map((member) => {
          const role = roleMap.get(member.roleId)
          const scope = scopeLabel(member, groups, locations)
          const isGroup = member.scope.groupIds && member.scope.groupIds.length > 0

          return (
            <div
              key={member.id}
              className="grid grid-cols-[1fr_140px_180px_80px_80px_36px] gap-4 px-4 py-3 border-b last:border-b-0 hover:bg-muted/30 transition-colors items-center group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    {member.isCurrentUser && <Badge variant="outline" className="text-[10px] px-1.5 py-0">You</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-sm truncate">{role?.name ?? "Unknown"}</p>
                {role?.isViewOnly && <span className="text-[10px] text-muted-foreground">Read-only</span>}
              </div>

              <div className="flex items-center gap-1.5 min-w-0">
                {member.scope.type === "all" ? (
                  <span className="text-sm text-muted-foreground truncate">All locations</span>
                ) : (
                  <>
                    {isGroup ? <FolderIcon className="size-3 text-muted-foreground shrink-0" /> : <MapPinIcon className="size-3 text-muted-foreground shrink-0" />}
                    <span className="text-sm truncate">{scope}</span>
                  </>
                )}
              </div>

              <div>
                <StatusBadge status={member.status} />
              </div>

              <div className="text-xs text-muted-foreground">
                {timeAgo(member.lastActive)}
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <button className="size-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  }>
                    <MoreHorizontalIcon className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/dashboard/settings/users/edit/${member.id}`)}><PencilIcon /> Edit</DropdownMenuItem>
                    {member.status === "invited" && <DropdownMenuItem><MailIcon /> Resend invite</DropdownMenuItem>}
                    {!member.isCurrentUser && member.status !== "deactivated" && (
                      <DropdownMenuItem variant="destructive"><ShieldOffIcon /> Deactivate</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
