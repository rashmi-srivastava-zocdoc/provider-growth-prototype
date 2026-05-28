import { useState } from "react"
import { Clock, Users, CreditCard, Eye, ChevronRight, Paintbrush, ArrowUpRight } from "lucide-react"
import { useNavigate } from "@/lib/router"
import { usePractice } from "@/context/PracticeContext"
import { usePrototypeVariants } from "@/context/PrototypeVariantsContext"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  SettingsPageShell,
  SettingsPageHeader,
  SettingsSection,
  SettingsGroup,
  InlineRow,
  SwitchToggle,
  ReferenceRow,
  DeactivateZone,
} from "./shared-settings"
import { BookingLinkCard } from "@/components/bookable-presence/BookingLinkCard"
import { GoogleConnectionAlert } from "@/components/bookable-presence/GoogleConnectionAlert"
import { ChannelListDialog } from "@/components/bookable-presence/ChannelListDialog"

export function BookablePresenceSettingsPage() {
  const navigate = useNavigate()
  const practiceData = usePractice()
  const [bookingLinkEnabled, setBookingLinkEnabled] = useState(true)
  const { upsellStyle } = usePrototypeVariants()

  const bpIncompleteCount = practiceData.providers.filter(
    (p) => p.products?.some((pr) => pr.productId === "bookable_presence" && pr.status === "incomplete")
  ).length
  const bpLiveCount = practiceData.providers.length - bpIncompleteCount

  return (
    <SettingsPageShell>
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-semibold tracking-tight">Bookable Presence</h1>
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-[10px]"
          >
            Live
          </Badge>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <p className="text-sm text-muted-foreground">
            {bpLiveCount} providers bookable on Google, Yelp, Healthgrades, and more
          </p>
          <span className="text-muted-foreground/30">·</span>
          <ChannelListDialog />
        </div>
      </div>

      {/* Booking link — unified card */}
      <SettingsSection
        title="Booking link"
        action={
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Eye className="size-3.5" />
            Preview
          </a>
        }
      >
        <SettingsGroup>
          <InlineRow
            label="Enable booking link"
            description="Add a direct booking URL to your profiles across channels"
          >
            <SwitchToggle defaultChecked={bookingLinkEnabled} onCheckedChange={setBookingLinkEnabled} />
          </InlineRow>
          {bookingLinkEnabled && (
            <BookingLinkCard variant="inline" />
          )}

          {/* Upsell: minimal (ghost row) */}
          {upsellStyle === "minimal" && (
            <button
              onClick={() => navigate("/dashboard/products/practice-solutions")}
              className="w-full flex items-center justify-between gap-4 px-5 py-3.5 bg-muted/30 text-left cursor-pointer border-none hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Paintbrush className="size-3.5 text-muted-foreground/50 shrink-0" />
                <p className="text-sm text-muted-foreground">Custom branding, booking rules, and AI phone assistant</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground/60">Practice Solutions</span>
                <ChevronRight className="size-3.5 text-muted-foreground/30" />
              </div>
            </button>
          )}
        </SettingsGroup>

        {/* Upsell: marketing (Notion-style banner) */}
        {upsellStyle === "marketing" && (
          <div className="rounded-lg border bg-gradient-to-br from-card to-muted/40 overflow-hidden">
            <div className="px-5 py-5 flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">Make it yours with Practice Solutions</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Your logo, your domain, your booking rules, and an AI phone assistant. Own the full patient experience.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Button
                    size="sm"
                    onClick={() => navigate("/dashboard/products/practice-solutions")}
                  >
                    Add Practice Solutions
                  </Button>
                  <a
                    href="#"
                    className="text-xs font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
                  >
                    Learn more
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
              <div className="shrink-0 hidden sm:flex items-center justify-center size-20 rounded-xl bg-primary/[0.06]">
                <Paintbrush className="size-8 text-primary/30" />
              </div>
            </div>
          </div>
        )}

      </SettingsSection>

      {/* Book from Google */}
      <SettingsSection title="Needs attention">
        <SettingsGroup>
          <GoogleConnectionAlert
            variant="row"
            onConnect={() => navigate("/dashboard/products/bookable-presence/google")}
          />
        </SettingsGroup>
      </SettingsSection>

      {/* References */}
      <SettingsGroup>
        <ReferenceRow
          icon={<Users className="size-3.5" />}
          title="Providers"
          summary={`${bpLiveCount} providers with Bookable Presence`}
          muted={false}
          onClick={() => navigate("/dashboard/providers")}
        />
        <ReferenceRow
          icon={<CreditCard className="size-3.5" />}
          title="Billing"
          summary="Free — included with your plan"
          muted={false}
          onClick={() => navigate("/dashboard/settings/billing")}
        />
        <ReferenceRow
          icon={<Clock className="size-3.5" />}
          title="Change log"
          summary="Last change 1d ago by Sarah Kim"
        />
      </SettingsGroup>

      <DeactivateZone
        productName="Bookable Presence"
        description="Remove your profiles from all partner channels. This cannot be undone without re-enrollment."
      />
    </SettingsPageShell>
  )
}
