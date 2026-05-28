import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { FormCard, FormRow, SwitchRow } from "../products/shared-settings"
import { SettingsFormShell } from "../products/shared-settings"

export function SamlConfigPage() {
  return (
    <SettingsFormShell
      backHref="/dashboard/settings/security"
      backLabel="Security"
      title="SAML single sign-on"
      description="Connect your identity provider to enable SAML-based authentication"
    >
      <FormCard title="Identity provider">
        <FormRow label="Metadata URL" description="Your IdP's SAML metadata endpoint">
          <Input placeholder="https://your-idp.com/saml/metadata" className="h-8 text-sm" />
        </FormRow>
        <FormRow label="Entity ID" description="Also called Issuer URL — provided by your IdP">
          <Input placeholder="https://your-idp.com/entity-id" className="h-8 text-sm" />
        </FormRow>
        <FormRow label="Sign-in URL" description="The IdP endpoint where users are redirected to authenticate">
          <Input placeholder="https://your-idp.com/saml/sso" className="h-8 text-sm" />
        </FormRow>
        <FormRow label="Certificate" description="X.509 certificate from your identity provider, base64-encoded">
          <textarea
            placeholder="Paste your certificate here..."
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none font-mono"
          />
        </FormRow>
      </FormCard>

      <FormCard title="Service provider">
        <p className="text-xs text-muted-foreground -mt-2">
          Enter these values in your identity provider's SAML application configuration.
        </p>
        <FormRow label="ACS URL" description="Assertion Consumer Service URL">
          <div className="flex items-center gap-2">
            <Input
              defaultValue="https://auth.zocdoc.com/saml/acs/midtown-dental"
              readOnly
              className="h-8 text-sm font-mono bg-muted/50 cursor-default"
            />
            <button className="text-xs font-medium text-primary hover:text-primary/80 cursor-pointer bg-transparent border-none whitespace-nowrap shrink-0">
              Copy
            </button>
          </div>
        </FormRow>
        <FormRow label="Entity ID">
          <div className="flex items-center gap-2">
            <Input
              defaultValue="https://auth.zocdoc.com/saml/midtown-dental"
              readOnly
              className="h-8 text-sm font-mono bg-muted/50 cursor-default"
            />
            <button className="text-xs font-medium text-primary hover:text-primary/80 cursor-pointer bg-transparent border-none whitespace-nowrap shrink-0">
              Copy
            </button>
          </div>
        </FormRow>
      </FormCard>

      <FormCard title="Settings">
        <SwitchRow
          label="Auto-provision users"
          description="Automatically create accounts for new users who authenticate through your IdP"
        />
        <FormRow label="Default role for provisioned users" inline>
          <Select defaultValue="member">
            <SelectTrigger className="w-28 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </FormRow>
      </FormCard>

      <div className="rounded-lg border bg-muted/30 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-full bg-amber-400" />
          <div>
            <p className="text-sm font-medium">Not connected</p>
            <p className="text-xs text-muted-foreground">Enter your IdP details and save to test the connection</p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">Inactive</Badge>
      </div>
    </SettingsFormShell>
  )
}
