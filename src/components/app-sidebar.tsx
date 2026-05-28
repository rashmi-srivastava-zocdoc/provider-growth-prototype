import * as React from "react"
import {
  HomeIcon,
  InboxIcon,
  CalendarIcon,
  UsersIcon,
  BarChart2Icon,
  SettingsIcon,
  VideoIcon,
  SearchIcon,
  SparklesIcon,
  BellIcon,
  GlobeIcon,
  SearchCheckIcon,
  BuildingIcon,
  PlugIcon,
} from "lucide-react"
import { NavMain, type NavGroup } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { useIAMode } from "@/context/IAModeContext"
import { usePracticeSolutionsMode } from "@/context/ZoModeContext"
import { asset } from "@/lib/router"
import { useHome } from "@/context/HomeContext"

const data = {
  user: {
    name: "Sarah Kim",
    email: "sarah.kim@midtownmedical.com",
    initials: "SK",
  },
}

const sourcesPageNav: NavGroup[] = [
  {
    items: [
      { title: "Home", path: "/dashboard/home", icon: <HomeIcon /> },
      { title: "Inbox", path: "/dashboard/inbox", icon: <InboxIcon />, badge: 4 },
      { title: "Calendar", path: "/dashboard/calendar", icon: <CalendarIcon /> },
      { title: "Providers", path: "/dashboard/providers", icon: <UsersIcon /> },
      { title: "Sources", path: "/dashboard/sources", icon: <PlugIcon /> },
      { title: "Performance", path: "/dashboard/performance", icon: <BarChart2Icon /> },
      {
        title: "Settings",
        icon: <SettingsIcon />,
        isActive: true,
        items: [
          { title: "Users", path: "/dashboard/settings/users" },
          { title: "Locations", path: "/dashboard/settings/locations" },
          { title: "Appointment types", path: "/dashboard/settings/appointment-types" },
          { title: "Forms", path: "/dashboard/settings/forms" },
          { title: "Booking rules", path: "/dashboard/settings/booking-rules" },
          { title: "Billing", path: "/dashboard/settings/billing" },
          { title: "Groups", path: "/dashboard/settings/organization" },
          { title: "Practice details", path: "/dashboard/settings/practice-details" },
          { title: "Security", path: "/dashboard/settings/security" },
        ],
      },
    ],
  },
  {
    label: "Products",
    items: [
      {
        title: "Bookable Presence",
        icon: <GlobeIcon />,
        isActive: true,
        items: [
          { title: "Performance", path: "/dashboard/products/bookable-presence/performance" },
          { title: "Settings", path: "/dashboard/products/bookable-presence/settings" },
        ],
      },
      {
        title: "Marketplace",
        icon: <SearchCheckIcon />,
        items: [
          { title: "Performance", path: "/dashboard/products/marketplace/performance" },
          { title: "Sponsored", path: "/dashboard/products/marketplace/sponsored" },
          { title: "Settings", path: "/dashboard/products/marketplace/settings" },
        ],
      },
      {
        title: "Practice Solutions",
        icon: <BuildingIcon />,
        items: [
          { title: "Performance", path: "/dashboard/products/practice-solutions/performance" },
          { title: "Settings", path: "/dashboard/products/practice-solutions/settings" },
        ],
      },
    ],
  },
]

const sourcesDrawerNav: NavGroup[] = [
  {
    items: [
      { title: "Home", path: "/dashboard/home", icon: <HomeIcon /> },
      { title: "Inbox", path: "/dashboard/inbox", icon: <InboxIcon />, badge: 4 },
      { title: "Calendar", path: "/dashboard/calendar", icon: <CalendarIcon /> },
      { title: "Providers", path: "/dashboard/providers", icon: <UsersIcon /> },
      { title: "Performance", path: "/dashboard/performance", icon: <BarChart2Icon /> },
      {
        title: "Settings",
        icon: <SettingsIcon />,
        isActive: true,
        items: [
          { title: "Users", path: "/dashboard/settings/users" },
          { title: "Locations", path: "/dashboard/settings/locations" },
          { title: "Appointment types", path: "/dashboard/settings/appointment-types" },
          { title: "Integration", path: "/dashboard/settings/integration", dot: true },
          { title: "Forms", path: "/dashboard/settings/forms" },
          { title: "Booking rules", path: "/dashboard/settings/booking-rules" },
          { title: "Billing", path: "/dashboard/settings/billing" },
          { title: "Groups", path: "/dashboard/settings/organization" },
          { title: "Practice details", path: "/dashboard/settings/practice-details" },
          { title: "Security", path: "/dashboard/settings/security" },
        ],
      },
    ],
  },
  {
    label: "Products",
    items: [
      {
        title: "Bookable Presence",
        icon: <GlobeIcon />,
        isActive: true,
        items: [
          { title: "Performance", path: "/dashboard/products/bookable-presence/performance" },
          { title: "Settings", path: "/dashboard/products/bookable-presence/settings" },
        ],
      },
      {
        title: "Marketplace",
        icon: <SearchCheckIcon />,
        items: [
          { title: "Performance", path: "/dashboard/products/marketplace/performance" },
          { title: "Sponsored", path: "/dashboard/products/marketplace/sponsored" },
          { title: "Settings", path: "/dashboard/products/marketplace/settings" },
        ],
      },
      {
        title: "Practice Solutions",
        icon: <BuildingIcon />,
        items: [
          { title: "Performance", path: "/dashboard/products/practice-solutions/performance" },
          { title: "Settings", path: "/dashboard/products/practice-solutions/settings" },
        ],
      },
    ],
  },
]

function ZocdocLogo({ onAIClick }: { onAIClick: () => void }) {
  const { toggleSidebar } = useSidebar()
  const { iaMode, toggleSourcesDrawer } = useIAMode()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" onClick={toggleSidebar}>
          <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="size-8 shrink-0" />
        </SidebarMenuButton>

        <div className="absolute inset-y-0 right-1 flex items-center gap-0.5 group-data-[collapsible=icon]:hidden">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="border-0 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                />
              }
            >
              <SearchIcon />
            </TooltipTrigger>
            <TooltipContent side="bottom">Search</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onAIClick}
                  className="border-0 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                />
              }
            >
              <SparklesIcon />
            </TooltipTrigger>
            <TooltipContent side="bottom">Ask AI</TooltipContent>
          </Tooltip>

          {iaMode === "sources-drawer" && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={toggleSourcesDrawer}
                    className="border-0 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  />
                }
              >
                <PlugIcon />
              </TooltipTrigger>
              <TooltipContent side="bottom">Data sources</TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="border-0 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                />
              }
            >
              <BellIcon />
            </TooltipTrigger>
            <TooltipContent side="bottom">Notifications</TooltipContent>
          </Tooltip>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  onAIClick: () => void
}

function removePracticeSolutions(groups: NavGroup[]): NavGroup[] {
  return groups.map((group) => {
    if (group.label === "Products") {
      return { ...group, items: group.items.filter((item) => item.title !== "Practice Solutions") }
    }
    return group
  })
}

function addLiveBadge(groups: NavGroup[], activatedProducts: Set<string>): NavGroup[] {
  return groups.map((group) => {
    if (group.label === "Products") {
      return {
        ...group,
        items: group.items.map((item) => {
          if (item.title === "Bookable Presence") {
            return { ...item, statusBadge: "Live" }
          }
          if (item.title === "Marketplace") {
            if (activatedProducts.has("marketplace")) {
              return { ...item, statusBadge: "Live" }
            }
            return { ...item, activateBadge: true, path: "/dashboard/products/marketplace" }
          }
          if (item.title === "Practice Solutions") {
            if (activatedProducts.has("practice-solutions")) {
              return { ...item, statusBadge: "Live" }
            }
            return { ...item, activateBadge: true, path: "/dashboard/products/practice-solutions" }
          }
          return item
        }),
      }
    }
    return group
  })
}

export function AppSidebar({ onAIClick, ...props }: AppSidebarProps) {
  const { iaMode } = useIAMode()
  const { practiceSolutionsEnabled } = usePracticeSolutionsMode()
  const { hasLaunched, activatedProducts } = useHome()
  let navGroups = iaMode === "sources-page" ? sourcesPageNav : sourcesDrawerNav
  if (!practiceSolutionsEnabled) navGroups = removePracticeSolutions(navGroups)
  if (hasLaunched) navGroups = addLiveBadge(navGroups, activatedProducts)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ZocdocLogo onAIClick={onAIClick} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain groups={navGroups} />
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 border-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <VideoIcon className="shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden">Join video visits</span>
        </Button>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
