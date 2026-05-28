import React from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useAIChat } from "@/context/AIChatContext"
import { useHeaderActionsSlot } from "@/context/HeaderActionsContext"

type BreadcrumbSegment =
  | { label: string; href: string }
  | { label: string; href?: undefined }

type PageLayoutProps = {
  breadcrumbs: BreadcrumbSegment[]
  children: React.ReactNode
}

export function PageLayout({ breadcrumbs, children }: PageLayoutProps) {
  const { panelOpen, displayMode } = useAIChat()
  const headerActions = useHeaderActionsSlot()
  const aiSidebarOpen = panelOpen && displayMode === "sidebar"

  return (
    <SidebarInset
      style={{
        marginRight: aiSidebarOpen ? "400px" : "0px",
        transition: "margin-right 200ms ease-in-out",
      }}
    >
      <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex flex-1 items-center gap-2">
          <SidebarTrigger className="-ml-1 border-none" />
          <Separator orientation="vertical" className="mr-2 data-vertical:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1
                return (
                  <React.Fragment key={crumb.label}>
                    <BreadcrumbItem className={isLast ? undefined : "hidden md:block"}>
                      {isLast ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href ?? "#"}>
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                  </React.Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {headerActions && (
          <div className="flex items-center gap-2 shrink-0">
            {headerActions}
          </div>
        )}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {children}
      </div>
    </SidebarInset>
  )
}
