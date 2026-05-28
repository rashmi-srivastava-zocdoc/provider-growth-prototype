import { Clock, Users, CreditCard } from "lucide-react"
import { useNavigate } from "@/lib/router"
import { Input } from "@/components/ui/input"
import {
  SettingsPageShell,
  SettingsPageHeader,
  SettingsSection,
  SettingsGroup,
  InlineRow,
  NavigationRow,
  SwitchToggle,
  ReferenceRow,
  DeactivateZone,
} from "./shared-settings"

export function MarketplaceSettingsPage() {
  const navigate = useNavigate()

  return (
    <SettingsPageShell>
      <SettingsPageHeader
        title="Marketplace"
        description="Configure spend limits, budgets, and account groups for Marketplace"
      />

      <SettingsSection title="Spend management">
        <SettingsGroup>
          <InlineRow label="Monthly budget cap">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-muted-foreground">$</span>
              <Input defaultValue="8,500" className="w-24 h-8 text-sm" />
            </div>
          </InlineRow>
          <InlineRow label="Daily spend limit">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-muted-foreground">$</span>
              <Input defaultValue="400" className="w-20 h-8 text-sm" />
            </div>
          </InlineRow>
          <InlineRow
            label="Auto-pause at cap"
            description="Pause all providers when monthly budget is reached"
          >
            <SwitchToggle defaultChecked />
          </InlineRow>
          <InlineRow
            label="Carry over unused budget"
            description="Roll unused monthly budget into the next month"
          >
            <SwitchToggle />
          </InlineRow>
        </SettingsGroup>

        <SettingsGroup>
          <NavigationRow
            title="Account groups"
            description="Organize providers into groups for budgets and targeting"
            summary="3 groups · $8,500/mo total"
            onClick={() => navigate("/dashboard/products/marketplace/settings/account-groups")}
          />
        </SettingsGroup>
      </SettingsSection>

      <SettingsSection title="Notifications">
        <SettingsGroup>
          <InlineRow
            label="Budget alert threshold"
            description="Get notified when spend reaches this percentage"
          >
            <div className="flex items-center gap-1.5">
              <Input defaultValue="80" type="number" className="w-16 h-8 text-sm" />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </InlineRow>
          <InlineRow
            label="Weekly spend digest"
            description="Email summary of Marketplace spend every Monday"
          >
            <SwitchToggle defaultChecked />
          </InlineRow>
        </SettingsGroup>
      </SettingsSection>

      <SettingsGroup>
        <ReferenceRow
          icon={<Users className="size-3.5" />}
          title="Providers"
          summary="42 of 56 providers active"
          muted={false}
          onClick={() => navigate("/dashboard/providers")}
        />
        <ReferenceRow
          icon={<CreditCard className="size-3.5" />}
          title="Billing"
          summary="Per new patient booking · $4,200 this month"
          muted={false}
          onClick={() => navigate("/dashboard/settings/billing")}
        />
        <ReferenceRow
          icon={<Clock className="size-3.5" />}
          title="Change log"
          summary="Last change 4h ago by Sarah Kim"
        />
      </SettingsGroup>

      <DeactivateZone
        productName="Marketplace"
        description="Remove this practice from Marketplace. This pauses all providers and spending."
      />
    </SettingsPageShell>
  )
}
