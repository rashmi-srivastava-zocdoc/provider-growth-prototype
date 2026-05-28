import React, { useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/app-sidebar"
import { PageLayout } from "@/components/PageLayout"
import { AppointmentTypesPage } from "@/pages/settings/AppointmentTypes"
import { AppointmentTypeDefaultsPage } from "@/pages/settings/AppointmentTypeDefaults"
import { PracticeProvider } from "@/context/PracticeContext"
import { PracticeProfileProvider } from "@/context/PracticeProfileContext"
import { IAModeProvider } from "@/context/IAModeContext"
import { SourcesDrawer } from "@/components/sources/SourcesDrawer"
import { AIChatProvider, useAIChat } from "@/context/AIChatContext"
import { HeaderActionsProvider } from "@/context/HeaderActionsContext"
import { AIPanelTrigger } from "@/components/ai-panel/AIPanelTrigger"
import { AIPanel } from "@/components/ai-panel/AIPanel"
import { AIAssistantPage } from "@/components/ai-panel/AIAssistantPage"
import { JoinPage } from "@/pages/JoinPage"
import { SignUpFlow } from "@/pages/SignUpFlow"
import { CombinedSignUpFlow } from "@/pages/CombinedSignUpFlow"
import { ProviderGrowthHomePage } from "@/pages/ProviderGrowthHome"
import { WelcomeSetupModal } from "@/pages/WelcomeSetup"
import { LaunchExperiencePage } from "@/pages/LaunchExperience"
import { ActivationPage } from "@/pages/ActivationPage"
import { UpsellPage } from "@/pages/UpsellPage"
import { MarketplaceActivation } from "@/pages/MarketplaceActivation"
import { PracticeSolutionsActivation } from "@/pages/PracticeSolutionsActivation"
import { PostActivationDashboard } from "@/pages/PostActivationDashboard"
import { HomePage } from "@/pages/Home"
import { InboxPage } from "@/pages/Inbox"
import { CalendarPage } from "@/pages/Calendar"
import { ProvidersPage } from "@/pages/Providers"
import { SourcesPage } from "@/pages/Sources"
import { PerformancePage } from "@/pages/Performance"
import { BookablePresencePerformancePage } from "@/pages/products/BookablePresencePerformance"
import { BookablePresenceProvidersPage } from "@/pages/products/BookablePresenceProviders"
import { BookablePresenceSettingsPage } from "@/pages/products/BookablePresenceSettings"
import { GoogleBusinessProfilesPage, GoogleBusinessProfilesOnboardingPage } from "@/pages/products/GoogleBusinessProfiles"
import { MarketplacePage } from "@/pages/products/Marketplace"
import { MarketplacePerformancePage } from "@/pages/products/MarketplacePerformance"
import { MarketplaceSponsoredPage } from "@/pages/products/MarketplaceSponsored"
import { MarketplaceSettingsPage } from "@/pages/products/MarketplaceSettings"
import { BrandedDirectoryPage } from "@/pages/products/BrandedDirectory"
import { MarketplaceOnboardingPage } from "@/pages/products/MarketplaceOnboarding"
import { PracticeSolutionsOnboardingPage } from "@/pages/products/PracticeSolutionsOnboarding"
import { BrandedDirectoryPerformancePage } from "@/pages/products/BrandedDirectoryPerformance"
import { BrandedDirectorySettingsPage } from "@/pages/products/BrandedDirectorySettings"
import { PracticeSolutionsSettingsPage } from "@/pages/products/PracticeSolutionsSettings"
import { ZoSettingsPage } from "@/pages/products/ZoSettings"
import { AccountGroupsPage } from "@/pages/products/settings/AccountGroups"
import { HighlightedProvidersPage } from "@/pages/products/settings/HighlightedProviders"
import { PhoneLinesPage } from "@/pages/products/settings/PhoneLines"
import { PageConfigurationPage } from "@/pages/products/settings/PageConfiguration"
import { BrandSettingsPage } from "@/pages/products/settings/BrandSettings"
import { SearchDefaultsPage } from "@/pages/products/settings/SearchDefaults"
import { UsersPage } from "@/pages/settings/Users"
import { UserCreatePage } from "@/pages/settings/UserCreate"
import { LocationsPage } from "@/pages/settings/Locations"
import { EHRIntegrationPage } from "@/pages/settings/EHRIntegration"
import { IntegrationPage } from "@/pages/settings/Integration"
import { BillingPage } from "@/pages/settings/Billing"
import { PracticeDetailsPage } from "@/pages/settings/PracticeDetails"
import { SecurityPage } from "@/pages/settings/Security"
import { SamlConfigPage } from "@/pages/settings/SamlConfig"
import { AppointmentTypeEditPage } from "@/pages/settings/AppointmentTypeEdit"
import { FormsPage } from "@/pages/settings/Forms"
import { FormEditPage } from "@/pages/settings/FormEdit"
import { BookingRulesPage } from "@/pages/settings/BookingRules"
import { BookingRuleEditPage } from "@/pages/settings/BookingRuleEdit"
import { OrganizationPage } from "@/pages/settings/Organization"
import { GroupDetailPage } from "@/pages/settings/GroupDetail"
import { Router, usePath, useNavigate } from "@/lib/router"
import { PracticeSolutionsModeProvider } from "@/context/ZoModeContext"
import { SignupVariantProvider } from "@/context/SignupVariantContext"
import { PrototypeVariantsProvider } from "@/context/PrototypeVariantsContext"
import { HomeProvider } from "@/context/HomeContext"
import { PreviewModeToggle } from "@/components/PreviewModeToggle"
import "./index.css"

type Crumb = { label: string; href?: string }
type RouteConfig = {
  title: string
  breadcrumbs: Crumb[]
  component: React.ComponentType
}

export const dashboardRoutes: Record<string, RouteConfig> = {
  "/dashboard/home": { title: "Home", breadcrumbs: [{ label: "Home" }], component: HomePage },
  "/dashboard/provider-growth-home": { title: "Home", breadcrumbs: [{ label: "Home" }], component: ProviderGrowthHomePage },
  "/dashboard/post-activation": { title: "Home", breadcrumbs: [{ label: "Home" }], component: PostActivationDashboard },
  "/dashboard/inbox": { title: "Inbox", breadcrumbs: [{ label: "Inbox" }], component: InboxPage },
  "/dashboard/calendar": { title: "Calendar", breadcrumbs: [{ label: "Calendar" }], component: CalendarPage },
  "/dashboard/providers": { title: "Providers", breadcrumbs: [{ label: "Providers" }], component: ProvidersPage },
  "/dashboard/sources": { title: "Sources", breadcrumbs: [{ label: "Sources" }], component: SourcesPage },
  "/dashboard/performance": { title: "Performance", breadcrumbs: [{ label: "Performance" }], component: PerformancePage },
  "/dashboard/products/bookable-presence/performance": {
    title: "BP Performance",
    breadcrumbs: [{ label: "Bookable Presence", href: "#" }, { label: "Performance" }],
    component: BookablePresencePerformancePage,
  },
  "/dashboard/products/bookable-presence/providers": {
    title: "BP Providers",
    breadcrumbs: [{ label: "Bookable Presence", href: "#" }, { label: "Providers" }],
    component: BookablePresenceProvidersPage,
  },
  "/dashboard/products/bookable-presence/settings": {
    title: "BP Settings",
    breadcrumbs: [{ label: "Bookable Presence", href: "#" }, { label: "Settings" }],
    component: BookablePresenceSettingsPage,
  },
  "/dashboard/products/bookable-presence/google": {
    title: "Google Business Profiles",
    breadcrumbs: [{ label: "Bookable Presence", href: "/dashboard/products/bookable-presence/settings" }, { label: "Google Business Profiles" }],
    component: GoogleBusinessProfilesPage,
  },
  "/dashboard/products/marketplace": {
    title: "Marketplace",
    breadcrumbs: [{ label: "Marketplace" }],
    component: MarketplacePage,
  },
  "/dashboard/products/marketplace/onboarding": {
    title: "Marketplace setup",
    breadcrumbs: [{ label: "Marketplace", href: "/dashboard/products/marketplace" }, { label: "Setup" }],
    component: MarketplaceOnboardingPage,
  },
  "/dashboard/products/marketplace/performance": {
    title: "MP Performance",
    breadcrumbs: [{ label: "Marketplace", href: "#" }, { label: "Performance" }],
    component: MarketplacePerformancePage,
  },
  "/dashboard/products/marketplace/sponsored": {
    title: "MP Sponsored",
    breadcrumbs: [{ label: "Marketplace", href: "#" }, { label: "Sponsored" }],
    component: MarketplaceSponsoredPage,
  },
  "/dashboard/products/marketplace/settings": {
    title: "MP Settings",
    breadcrumbs: [{ label: "Marketplace", href: "#" }, { label: "Settings" }],
    component: MarketplaceSettingsPage,
  },
  "/dashboard/products/marketplace/settings/account-groups": {
    title: "Account groups",
    breadcrumbs: [{ label: "Marketplace", href: "/dashboard/products/marketplace" }, { label: "Settings", href: "/dashboard/products/marketplace/settings" }, { label: "Account groups" }],
    component: AccountGroupsPage,
  },
  "/dashboard/products/practice-solutions": {
    title: "Practice Solutions",
    breadcrumbs: [{ label: "Practice Solutions" }],
    component: BrandedDirectoryPage,
  },
  "/dashboard/products/practice-solutions/onboarding": {
    title: "Practice Solutions setup",
    breadcrumbs: [{ label: "Practice Solutions", href: "/dashboard/products/practice-solutions" }, { label: "Setup" }],
    component: PracticeSolutionsOnboardingPage,
  },
  "/dashboard/products/practice-solutions/performance": {
    title: "PS Performance",
    breadcrumbs: [{ label: "Practice Solutions", href: "#" }, { label: "Performance" }],
    component: BrandedDirectoryPerformancePage,
  },
  "/dashboard/products/practice-solutions/settings": {
    title: "PS Settings",
    breadcrumbs: [{ label: "Practice Solutions", href: "#" }, { label: "Settings" }],
    component: PracticeSolutionsSettingsPage,
  },
  "/dashboard/products/practice-solutions/settings/branded-booking": {
    title: "Branded booking page",
    breadcrumbs: [{ label: "Practice Solutions", href: "/dashboard/products/practice-solutions" }, { label: "Settings", href: "/dashboard/products/practice-solutions/settings" }, { label: "Branded booking page" }],
    component: BrandedDirectorySettingsPage,
  },
  "/dashboard/products/practice-solutions/settings/page-seo": {
    title: "Page & SEO",
    breadcrumbs: [{ label: "Practice Solutions", href: "/dashboard/products/practice-solutions" }, { label: "Settings", href: "/dashboard/products/practice-solutions/settings" }, { label: "Page & SEO" }],
    component: PageConfigurationPage,
  },
  "/dashboard/products/practice-solutions/settings/brand": {
    title: "Brand",
    breadcrumbs: [{ label: "Practice Solutions", href: "/dashboard/products/practice-solutions" }, { label: "Settings", href: "/dashboard/products/practice-solutions/settings" }, { label: "Brand" }],
    component: BrandSettingsPage,
  },
  "/dashboard/products/practice-solutions/settings/search-defaults": {
    title: "Search defaults",
    breadcrumbs: [{ label: "Practice Solutions", href: "/dashboard/products/practice-solutions" }, { label: "Settings", href: "/dashboard/products/practice-solutions/settings" }, { label: "Search defaults" }],
    component: SearchDefaultsPage,
  },
  "/dashboard/products/practice-solutions/settings/highlighted-providers": {
    title: "Highlighted providers",
    breadcrumbs: [{ label: "Practice Solutions", href: "/dashboard/products/practice-solutions" }, { label: "Settings", href: "/dashboard/products/practice-solutions/settings" }, { label: "Highlighted providers" }],
    component: HighlightedProvidersPage,
  },
  "/dashboard/products/practice-solutions/settings/phone-assistant": {
    title: "AI phone assistant",
    breadcrumbs: [{ label: "Practice Solutions", href: "/dashboard/products/practice-solutions" }, { label: "Settings", href: "/dashboard/products/practice-solutions/settings" }, { label: "AI phone assistant" }],
    component: ZoSettingsPage,
  },
  "/dashboard/products/practice-solutions/settings/phone-lines": {
    title: "Phone lines",
    breadcrumbs: [{ label: "Practice Solutions", href: "/dashboard/products/practice-solutions" }, { label: "Settings", href: "/dashboard/products/practice-solutions/settings" }, { label: "Phone lines" }],
    component: PhoneLinesPage,
  },
  "/dashboard/settings/users": {
    title: "Users",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Users" }],
    component: UsersPage,
  },
  "/dashboard/settings/users/new": {
    title: "Add user",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Users", href: "/dashboard/settings/users" }, { label: "Add user" }],
    component: UserCreatePage,
  },
  "/dashboard/settings/locations": {
    title: "Locations",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Locations" }],
    component: LocationsPage,
  },
  "/dashboard/settings/appointment-types": {
    title: "Appointment types",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Appointment types" }],
    component: AppointmentTypesPage,
  },
  "/dashboard/settings/appointment-types/defaults": {
    title: "Booking defaults",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Appointment types", href: "/dashboard/settings/appointment-types" }, { label: "Booking defaults" }],
    component: AppointmentTypeDefaultsPage,
  },
  "/dashboard/settings/forms": {
    title: "Forms",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Forms" }],
    component: FormsPage,
  },
  "/dashboard/settings/booking-rules": {
    title: "Booking rules",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Booking rules" }],
    component: BookingRulesPage,
  },
  "/dashboard/settings/ehr-integration": {
    title: "EHR integration",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "EHR integration" }],
    component: EHRIntegrationPage,
  },
  "/dashboard/settings/integration": {
    title: "Integration",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Integration" }],
    component: IntegrationPage,
  },
  "/dashboard/settings/billing": {
    title: "Billing",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Billing" }],
    component: BillingPage,
  },
  "/dashboard/settings/practice-details": {
    title: "Practice details",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Practice details" }],
    component: PracticeDetailsPage,
  },
  "/dashboard/settings/security": {
    title: "Security",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Security" }],
    component: SecurityPage,
  },
  "/dashboard/settings/security/saml": {
    title: "SAML single sign-on",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Security", href: "/dashboard/settings/security" }, { label: "SAML single sign-on" }],
    component: SamlConfigPage,
  },
  "/dashboard/settings/organization": {
    title: "Groups",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Groups" }],
    component: OrganizationPage,
  },
  "/dashboard/settings/organization/groups/new": {
    title: "New group",
    breadcrumbs: [{ label: "Settings", href: "#" }, { label: "Groups", href: "/dashboard/settings/organization" }, { label: "New group" }],
    component: GroupDetailPage,
  },
}

const defaultRoute = "/signup/combined"

function matchDynamicRoute(path: string): RouteConfig | null {
  if (path.startsWith("/dashboard/settings/appointment-types/edit/")) {
    return {
      title: "Edit appointment type",
      breadcrumbs: [
        { label: "Settings", href: "#" },
        { label: "Appointment types", href: "/dashboard/settings/appointment-types" },
        { label: "Edit" },
      ],
      component: AppointmentTypeEditPage,
    }
  }
  if (path.startsWith("/dashboard/settings/forms/edit/")) {
    return {
      title: "Edit form",
      breadcrumbs: [
        { label: "Settings", href: "#" },
        { label: "Forms", href: "/dashboard/settings/forms" },
        { label: "Edit" },
      ],
      component: FormEditPage,
    }
  }
  if (path.startsWith("/dashboard/settings/booking-rules/edit/")) {
    return {
      title: "Edit booking rule",
      breadcrumbs: [
        { label: "Settings", href: "#" },
        { label: "Booking rules", href: "/dashboard/settings/booking-rules" },
        { label: "Edit" },
      ],
      component: BookingRuleEditPage,
    }
  }
  if (path.startsWith("/dashboard/settings/users/edit/")) {
    return {
      title: "Edit user",
      breadcrumbs: [
        { label: "Settings", href: "#" },
        { label: "Users", href: "/dashboard/settings/users" },
        { label: "Edit" },
      ],
      component: UserCreatePage,
    }
  }
  if (path.startsWith("/dashboard/settings/organization/groups/")) {
    return {
      title: "Group detail",
      breadcrumbs: [
        { label: "Settings", href: "#" },
        { label: "Groups", href: "/dashboard/settings/organization" },
        { label: "Detail" },
      ],
      component: GroupDetailPage,
    }
  }
  return null
}

function pathToActivePage(path: string): string {
  if (path === "/join" || path.startsWith("/signup")) return "landing"
  const route = dashboardRoutes[path] ?? matchDynamicRoute(path)
  if (route) return route.title
  return "Home"
}

function DashboardContent() {
  const path = usePath()
  const navigate = useNavigate()
  const { aiPageOpen, closeAIPage, openAIPage } = useAIChat()
  const route = dashboardRoutes[path] ?? matchDynamicRoute(path) ?? dashboardRoutes[defaultRoute]
  const PageComponent = route.component

  const handleAIClick = React.useCallback(() => {
    openAIPage()
  }, [openAIPage])

  return (
    <SidebarProvider>
      <AppSidebar
        onAIClick={handleAIClick}
      />
      {aiPageOpen ? (
        <AIAssistantPage />
      ) : (
        <HeaderActionsProvider>
          <PageLayout breadcrumbs={route.breadcrumbs}>
            <PageComponent />
          </PageLayout>
          <AIPanelTrigger />
          <AIPanel />
        </HeaderActionsProvider>
      )}
    </SidebarProvider>
  )
}

function AppRoutes() {
  const path = usePath()
  const navigate = useNavigate()

  useEffect(() => {
    if (path === "/") navigate(defaultRoute, { replace: true })
  }, [path, navigate])

  const activePage = pathToActivePage(path)
  const isDashboard = path.startsWith("/dashboard") || path === "/welcome"

  return (
    <PracticeSolutionsModeProvider>
      <SignupVariantProvider>
        <PrototypeVariantsProvider>
          <HomeProvider>
          <PracticeProfileProvider>
            <PracticeProvider>
              <AIChatProvider activePage={activePage}>
                <IAModeProvider>
                  <TooltipProvider>
                    {path === "/join" ? (
                      <JoinPage />
                    ) : path === "/signup/combined" ? (
                      <CombinedSignUpFlow />
                    ) : path === "/signup/multi-step" ? (
                      <SignUpFlow key="multi-step" variant="multi-step" />
                    ) : path === "/signup/auth" ? (
                      <SignUpFlow key="auth" variant="two-step" authOnly />
                    ) : path.startsWith("/signup") ? (
                      <SignUpFlow key="two-step" variant="two-step" />
                    ) : path === "/practice-solutions-activate" ? (
                      <PracticeSolutionsActivation />
                    ) : path === "/marketplace-activate" ? (
                      <MarketplaceActivation />
                    ) : path === "/upsell" ? (
                      <UpsellPage />
                    ) : path === "/activate" ? (
                      <ActivationPage />
                    ) : path === "/launch" ? (
                      <LaunchExperiencePage />
                    ) : path === "/setup/google-business-profiles" ? (
                      <GoogleBusinessProfilesOnboardingPage />
                    ) : isDashboard ? (
                      <>
                        <DashboardContent />
                        <SourcesDrawer />
                        {path === "/welcome" && <WelcomeSetupModal />}
                      </>
                    ) : null}
                    <PreviewModeToggle />
                  </TooltipProvider>
                </IAModeProvider>
              </AIChatProvider>
            </PracticeProvider>
          </PracticeProfileProvider>
          </HomeProvider>
        </PrototypeVariantsProvider>
      </SignupVariantProvider>
    </PracticeSolutionsModeProvider>
  )
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}
