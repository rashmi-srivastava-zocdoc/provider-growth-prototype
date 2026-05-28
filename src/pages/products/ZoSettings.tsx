import { Play, Phone, Plus, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "@/lib/router"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  SettingsFormShell,
  SettingsSection,
  SettingsGroup,
  InlineRow,
  NavigationRow,
  SwitchToggle,
} from "./shared-settings"

const callMessages = [
  { label: "Recording disclaimer", message: "This call may be recorded for monitoring purposes." },
  { label: "Emergency disclaimer", message: "If this is an emergency, please hang up and dial 911." },
  { label: "Spanish instruction", message: "Para español, diga español.", scope: "Custom phone lines" },
]

const customMessages = [
  { label: "Manhattan UES only", message: "The practice will be closed on Fridays from Memorial day to Labor day.", scope: "Custom phone lines" },
]

const locationOverrides = [
  { location: "Midtown East", number: "(212) 555-0200" },
  { location: "Midtown West", number: "(212) 555-0300" },
  { location: "Upper East Side", number: "(212) 555-0400" },
]

export function ZoSettingsPage() {
  const navigate = useNavigate()

  return (
    <SettingsFormShell
      backHref="/dashboard/products/practice-solutions/settings"
      backLabel="Practice Solutions settings"
      title="AI phone assistant"
      description="Configure voice, phone lines, and call routing"
    >

      <SettingsSection
        title="Voice"
        action={
          <button className="flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-500 transition-colors cursor-pointer bg-transparent border-none">
            <Play className="size-3" />
            Listen to sample
          </button>
        }
      >
        <SettingsGroup>
          <InlineRow label="Voice">
            <Select defaultValue="male-1">
              <SelectTrigger className="w-36 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male-1">Male — Calm</SelectItem>
                <SelectItem value="male-2">Male — Warm</SelectItem>
                <SelectItem value="female-1">Female — Calm</SelectItem>
                <SelectItem value="female-2">Female — Warm</SelectItem>
              </SelectContent>
            </Select>
          </InlineRow>
          <InlineRow label="Speaking speed">
            <Select defaultValue="normal">
              <SelectTrigger className="w-28 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
              </SelectContent>
            </Select>
          </InlineRow>
        </SettingsGroup>

        <SettingsGroup>
          <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Greeting</label>
              <p className="text-xs text-muted-foreground -mt-1">Said when answering a call</p>
              <Textarea
                defaultValue="Thank you for calling Midtown Dental Associates. How can I help you today?"
                rows={2}
                className="text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Closing</label>
              <p className="text-xs text-muted-foreground -mt-1">Said when after completing a request</p>
              <Textarea
                defaultValue="Is there anything else I can help you with today?"
                rows={2}
                className="text-sm"
              />
            </div>
          </div>
        </SettingsGroup>
      </SettingsSection>

      <SettingsSection
        title="Call messages"
        description="Said at the start of each call"
        action={
          <Button variant="outline" size="sm">
            <Plus className="size-3.5" data-icon="inline-start" />
            Add message
          </Button>
        }
      >
        <SettingsGroup>
          {callMessages.map((m) => (
            <div key={m.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{m.label}</p>
                <p className="text-sm text-muted-foreground mt-1">"{m.message}"</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {m.scope && (
                  <Badge variant="outline" className="text-[10px] text-muted-foreground">
                    {m.scope}
                  </Badge>
                )}
                <button className="text-xs text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </SettingsGroup>
        {customMessages.length > 0 && (
          <SettingsGroup>
            {customMessages.map((m) => (
              <div key={m.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3 text-muted-foreground" />
                    <p className="text-sm font-medium">{m.label}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 pl-5">"{m.message}"</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {m.scope && (
                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                      {m.scope}
                    </Badge>
                  )}
                  <button className="text-xs text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </SettingsGroup>
        )}
      </SettingsSection>

      <SettingsGroup>
        <NavigationRow
          title="Phone lines"
          description="Manage phone numbers and test lines"
          summary="4 lines active · 2 test numbers"
          onClick={() => navigate("/dashboard/products/practice-solutions/settings/phone-lines")}
        />
      </SettingsGroup>

      <SettingsSection title="Transfer & routing">
        <SettingsGroup>
          <InlineRow label="Default transfer number" description="When the assistant can't help, transfer here">
            <Input defaultValue="(212) 555-0100" className="w-36 h-8 text-sm font-mono" />
          </InlineRow>
          <InlineRow label="Transfer behavior">
            <Select defaultValue="warm">
              <SelectTrigger className="w-40 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warm">Warm transfer</SelectItem>
                <SelectItem value="cold">Cold transfer</SelectItem>
                <SelectItem value="voicemail">Voicemail</SelectItem>
              </SelectContent>
            </Select>
          </InlineRow>
          <InlineRow label="Max bookings per call">
            <Input defaultValue="2" type="number" className="w-16 h-8 text-sm" />
          </InlineRow>
        </SettingsGroup>

        <SettingsGroup>
          <InlineRow label="Billing questions" description="Transfer calls about bills, payments, or account balances">
            <SwitchToggle defaultChecked />
          </InlineRow>
          <InlineRow label="Prescription refills" description="Transfer calls requesting prescription refills">
            <SwitchToggle defaultChecked />
          </InlineRow>
          <InlineRow label="Medical emergencies" description="Immediately transfer if caller describes an emergency">
            <SwitchToggle defaultChecked />
          </InlineRow>
          <InlineRow label="Caller requests staff" description="Transfer when caller explicitly asks to speak with a person">
            <SwitchToggle defaultChecked />
          </InlineRow>
          <InlineRow label="Repeated misunderstanding" description="Transfer after 2 failed attempts to understand the caller">
            <SwitchToggle defaultChecked />
          </InlineRow>
          <InlineRow label="Self-pay callers" description="Transfer self-pay callers to staff before confirming a booking">
            <SwitchToggle defaultChecked />
          </InlineRow>
        </SettingsGroup>
      </SettingsSection>

      <SettingsSection
        title="Location overrides"
        description="Override the default transfer number for specific locations"
        action={
          <Button variant="outline" size="sm">
            <Plus className="size-3.5" data-icon="inline-start" />
            Add override
          </Button>
        }
      >
        <SettingsGroup>
          {locationOverrides.map((o) => (
            <div key={o.location} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
                  <Phone className="size-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{o.location}</p>
                  <p className="text-xs text-muted-foreground font-mono">{o.number}</p>
                </div>
              </div>
              <button className="text-xs text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer">
                Edit
              </button>
            </div>
          ))}
        </SettingsGroup>
      </SettingsSection>

      <SettingsSection title="After hours">
        <SettingsGroup>
          <InlineRow
            label="After-hours routing"
            description="Route transfers to a different number outside business hours"
          >
            <SwitchToggle defaultChecked />
          </InlineRow>
          <InlineRow label="After-hours number">
            <Input defaultValue="(212) 555-0199" className="w-36 h-8 text-sm font-mono" />
          </InlineRow>
          <InlineRow label="Business hours">
            <div className="flex items-center gap-2">
              <Select defaultValue="8:00">
                <SelectTrigger className="w-24 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["7:00", "7:30", "8:00", "8:30", "9:00"].map((t) => (
                    <SelectItem key={t} value={t}>{t} AM</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground">to</span>
              <Select defaultValue="18:00">
                <SelectTrigger className="w-24 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["17:00", "17:30", "18:00", "18:30", "19:00", "20:00"].map((t) => (
                    <SelectItem key={t} value={t}>
                      {parseInt(t) > 12 ? `${parseInt(t) - 12}:${t.split(":")[1]} PM` : `${t} AM`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </InlineRow>
        </SettingsGroup>
      </SettingsSection>

    </SettingsFormShell>
  )
}
