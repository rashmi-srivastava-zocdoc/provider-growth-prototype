import { Clock, Users, CreditCard } from "lucide-react"
import { useNavigate } from "@/lib/router"
import {
  SettingsPageShell,
  SettingsPageHeader,
  SettingsGroup,
  NavigationRow,
  ReferenceRow,
  DeactivateZone,
} from "./shared-settings"

export function PracticeSolutionsSettingsPage() {
  const navigate = useNavigate()

  return (
    <SettingsPageShell>
      <SettingsPageHeader
        title="Practice Solutions"
        description="Manage your branded booking page, AI phone assistant, and advanced scheduling tools"
      />

      <SettingsGroup>
        <NavigationRow
          title="Branded booking page"
          description="Directory, SEO, brand, search defaults, and highlighted providers"
          summary="Active"
          onClick={() => navigate("/dashboard/products/practice-solutions/settings/branded-booking")}
        />
        <NavigationRow
          title="AI phone assistant"
          description="Voice, call routing, transfer rules, and phone lines"
          summary="4 lines active"
          onClick={() => navigate("/dashboard/products/practice-solutions/settings/phone-assistant")}
        />
      </SettingsGroup>

      <SettingsGroup>
        <ReferenceRow
          icon={<Users className="size-3.5" />}
          title="Providers"
          summary="232 of 240 seats · 8 available"
          muted={false}
          onClick={() => navigate("/dashboard/providers")}
        />
        <ReferenceRow
          icon={<CreditCard className="size-3.5" />}
          title="Billing"
          summary="$250/provider/mo · 101–250 tier"
          muted={false}
          onClick={() => navigate("/dashboard/settings/billing")}
        />
        <ReferenceRow
          icon={<Clock className="size-3.5" />}
          title="Change log"
          summary="Last change 2d ago by Sarah Kim"
        />
      </SettingsGroup>

      <DeactivateZone productName="Practice Solutions" />
    </SettingsPageShell>
  )
}
