import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon, LockIcon } from "lucide-react"
import { usePath, useNavigate } from "@/lib/router"

type SubItem = {
  title: string
  path: string
  dot?: boolean
  locked?: boolean
}

type NavItem = {
  title: string
  path?: string
  icon: React.ReactNode
  badge?: number
  statusBadge?: string
  activateBadge?: boolean
  isActive?: boolean
  items?: SubItem[]
}

export type NavGroup = {
  label?: string
  items: NavItem[]
}

export function NavMain({ groups }: { groups: NavGroup[] }) {
  const currentPath = usePath()
  const navigate = useNavigate()

  return (
    <>
      {groups.map((group, gi) => (
        <SidebarGroup key={gi}>
          {group.label && (
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) =>
                item.items && !item.activateBadge ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen={item.items?.some((sub) => currentPath === sub.path)}
                    className="group/collapsible"
                    render={<SidebarMenuItem />}
                  >
                    <CollapsibleTrigger
                      render={<SidebarMenuButton tooltip={item.title} />}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      <span className="relative ml-auto flex min-h-4 min-w-4 items-center justify-center">
                        {item.statusBadge && (
                          <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-emerald-600 transition-opacity duration-200 group-hover/collapsible:opacity-0 group-data-open/collapsible:opacity-0">
                            {item.statusBadge}
                          </span>
                        )}
                        <ChevronRightIcon className="absolute opacity-0 transition-[opacity,transform] duration-200 group-hover/collapsible:opacity-100 group-data-open/collapsible:opacity-100 group-data-open/collapsible:rotate-90" />
                      </span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((sub) => (
                          <SidebarMenuSubItem key={sub.path}>
                            <SidebarMenuSubButton
                              isActive={currentPath === sub.path}
                              onClick={() => !sub.locked && navigate(sub.path)}
                              className={sub.locked ? "opacity-50 cursor-not-allowed" : ""}
                            >
                              <span>{sub.title}</span>
                              {sub.dot && (
                                <span className="ml-auto size-2 rounded-full bg-destructive" />
                              )}
                              {sub.locked && (
                                <LockIcon className="ml-auto size-3.5 text-sidebar-foreground/40" />
                              )}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={currentPath === item.path}
                      onClick={() => item.path && navigate(item.path)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge != null && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                    {item.activateBadge && (
                      <SidebarMenuBadge>
                        <span className="text-[11px] font-medium text-sidebar-foreground/50 underline underline-offset-2">
                          Add
                        </span>
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
