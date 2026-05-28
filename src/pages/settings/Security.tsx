import { useState } from "react"
import { useNavigate } from "@/lib/router"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { X } from "lucide-react"
import {
  SettingsPageShell,
  SettingsPageHeader,
  SettingsSection,
  SettingsGroup,
  InlineRow,
  NavigationRow,
  SwitchToggle,
} from "../products/shared-settings"

const initialDomains = [
  { id: 1, domain: "midtowndental.com", verified: true },
  { id: 2, domain: "midtowndentalgroup.com", verified: true },
]

function DomainRow({ domain, verified, onRemove }: { domain: string; verified: boolean; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-sm font-medium font-mono">{domain}</span>
        {verified ? (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 text-emerald-600 border-emerald-200 bg-emerald-50">Verified</Badge>
        ) : (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">Pending</Badge>
        )}
      </div>
      <button
        onClick={onRemove}
        className="size-6 rounded flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground bg-transparent border-none cursor-pointer shrink-0"
      >
        <X className="size-3" />
      </button>
    </div>
  )
}

export function SecurityPage() {
  const navigate = useNavigate()
  const [domains, setDomains] = useState(initialDomains)
  const [samlConfigured] = useState(false)

  return (
    <SettingsPageShell>
      <SettingsPageHeader
        title="Security"
        description="Manage how your team signs in and what's enforced across the organization"
      />

      {/* Sign-in methods */}
      <SettingsSection title="Sign-in methods" description="Control which authentication options are available to users">
        <SettingsGroup>
          <InlineRow label="Google" description="Allow users to sign in with their Google account">
            <SwitchToggle defaultChecked />
          </InlineRow>
          <InlineRow label="Microsoft" description="Allow users to sign in with their Microsoft account">
            <SwitchToggle defaultChecked />
          </InlineRow>
          <InlineRow label="Email and password" description="Allow users to sign in with email and password">
            <SwitchToggle defaultChecked />
          </InlineRow>
        </SettingsGroup>
        <SettingsGroup>
          <NavigationRow
            title="SAML single sign-on"
            description="Connect your identity provider for enterprise authentication"
            summary={samlConfigured ? "Connected · Okta" : "Not configured"}
            onClick={() => navigate("/dashboard/settings/security/saml")}
          />
        </SettingsGroup>
      </SettingsSection>

      {/* Security policies */}
      <SettingsSection title="Security policies" description="Enforce authentication requirements for all users">
        <SettingsGroup>
          <InlineRow label="Require two-factor authentication" description="All users must set up 2FA on their next sign-in">
            <SwitchToggle />
          </InlineRow>
          <InlineRow label="Enforce SSO" description={samlConfigured ? "Require all users to sign in through your identity provider" : "Configure SAML to enable SSO enforcement"}>
            <SwitchToggle defaultChecked={false} />
          </InlineRow>
          <InlineRow label="Session timeout" description="How long before inactive users are signed out">
            <Select defaultValue="24 hours">
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 hour">1 hour</SelectItem>
                <SelectItem value="8 hours">8 hours</SelectItem>
                <SelectItem value="24 hours">24 hours</SelectItem>
                <SelectItem value="7 days">7 days</SelectItem>
                <SelectItem value="30 days">30 days</SelectItem>
              </SelectContent>
            </Select>
          </InlineRow>
        </SettingsGroup>
      </SettingsSection>

      {/* Allowed email domains */}
      <SettingsSection
        title="Allowed email domains"
        description="Users with these domains can join the organization without an invitation"
        action={
          <button className="text-xs font-medium text-primary hover:text-primary/80 cursor-pointer bg-transparent border-none">
            Add domain
          </button>
        }
      >
        <SettingsGroup>
          {domains.map((d) => (
            <DomainRow
              key={d.id}
              domain={d.domain}
              verified={d.verified}
              onRemove={() => setDomains(domains.filter((x) => x.id !== d.id))}
            />
          ))}
        </SettingsGroup>
      </SettingsSection>
    </SettingsPageShell>
  )
}
