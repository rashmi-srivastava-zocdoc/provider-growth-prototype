import React, { useState } from "react"
import { ChevronRight, ArrowLeft, Users, CreditCard, AlertTriangle } from "lucide-react"
import { useNavigate } from "@/lib/router"
import { Button } from "@/components/ui/button"

// ── LINEAR-STYLE SETTINGS PRIMITIVES ──

export function SettingsPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-8 w-full max-w-[680px] py-2">
        {children}
      </div>
    </div>
  )
}

export function SettingsPageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h1 className="text-[22px] font-semibold tracking-tight">{title}</h1>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </div>
  )
}

export function SettingsSection({ title, description, action, children }: { title?: string; description?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      {title && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}

export function SettingsGroup({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children).filter(Boolean)
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className="border-t border-border" />}
          {child}
        </React.Fragment>
      ))}
    </div>
  )
}

export function InlineRow({ label, description, children }: { label: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  )
}

export function NavigationRow({
  title,
  description,
  summary,
  onClick,
}: {
  title: string
  description?: string
  summary?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-muted/50 transition-colors text-left cursor-pointer bg-transparent border-none"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        {summary && <p className="text-xs text-muted-foreground/60 mt-0.5">{summary}</p>}
      </div>
      <ChevronRight className="size-4 text-muted-foreground/40 shrink-0" />
    </button>
  )
}

export function SwitchToggle({ defaultChecked, onCheckedChange }: { defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void }) {
  const [checked, setChecked] = useState(defaultChecked ?? false)
  const isOn = checked
  return (
    <button
      role="switch"
      aria-checked={isOn}
      onClick={() => { const next = !isOn; setChecked(next); onCheckedChange?.(next) }}
      className={`relative inline-flex h-[20px] w-[36px] shrink-0 items-center rounded-full transition-colors cursor-pointer border-none ${isOn ? "bg-primary" : "bg-input"}`}
    >
      <span className={`block size-4 rounded-full bg-background shadow-sm transition-transform ${isOn ? "translate-x-[16px]" : "translate-x-0.5"}`} />
    </button>
  )
}

// ── SUB-PAGE SHELL ──

export function SettingsFormShell({
  backHref,
  backLabel,
  title,
  description,
  children,
}: {
  backHref: string
  backLabel: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  const navigate = useNavigate()

  return (
    <SettingsPageShell>
      <button
        onClick={() => navigate(backHref)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none w-fit -mb-4"
      >
        <ArrowLeft className="size-3.5" />
        {backLabel}
      </button>
      <SettingsPageHeader title={title} description={description} />
      {children}
      <div className="flex items-center justify-end gap-2 pt-1">
        <Button variant="outline" onClick={() => navigate(backHref)}>Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </SettingsPageShell>
  )
}

// ── SHARED CARDS & ROWS (used in sub-pages) ──

export function FormCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      {title && <p className="text-sm font-semibold">{title}</p>}
      <div className="rounded-lg border bg-card p-5 flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}

export function SectionHeading({ children, description }: { children: React.ReactNode; description?: string }) {
  return (
    <div className="flex flex-col gap-0.5 pt-2">
      <p className="text-sm font-semibold">{children}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  )
}

export function FormRow({ label, description, children, inline }: { label: string; description?: string; children: React.ReactNode; inline?: boolean }) {
  if (inline) {
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <label className="text-sm font-medium">{label}</label>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
        <div className="shrink-0">{children}</div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">{label}</label>
      {description && <p className="text-xs text-muted-foreground -mt-1">{description}</p>}
      {children}
    </div>
  )
}

export function SwitchRow({ label, description, checked, onCheckedChange }: { label: string; description?: React.ReactNode; checked?: boolean; onCheckedChange?: (checked: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <SwitchToggle defaultChecked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

// ── PRODUCT SETTINGS SHARED COMPONENTS ──

export function ProvidersAndBillingCard({ product }: { product: "marketplace" | "practice-solutions" }) {
  const navigate = useNavigate()

  const config = {
    marketplace: {
      activeCount: 42,
      totalCount: 56,
      pricingLabel: "Per-booking pricing",
      costLabel: "$4,200 this month",
      seatBased: false,
      accent: "text-primary",
      accentHover: "hover:text-primary/80",
      accentBg: "bg-primary/10",
    },
    "practice-solutions": {
      activeCount: 232,
      totalCount: 240,
      pricingLabel: "$250/provider/mo",
      costLabel: "101–250 tier",
      seatBased: true,
      accent: "text-primary",
      accentHover: "hover:text-primary/80",
      accentBg: "bg-primary/10",
    },
  }[product]

  const available = config.totalCount - config.activeCount

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-5 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3">
            <div className={`size-9 rounded-lg ${config.accentBg} flex items-center justify-center`}>
              <Users className={`size-4 ${config.accent}`} />
            </div>
            <div>
              <p className="text-sm font-semibold">Providers & billing</p>
              <p className="text-xs text-muted-foreground">
                {config.seatBased
                  ? `${config.activeCount} of ${config.totalCount} seats · ${available} available`
                  : `${config.activeCount} of ${config.totalCount} providers active`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-12">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CreditCard className="size-3" />
              <span>{config.pricingLabel}</span>
              <span className="text-muted-foreground/50">·</span>
              <span>{config.costLabel}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 pt-1">
          <button
            onClick={() => navigate("/dashboard/providers")}
            className={`text-xs font-medium ${config.accent} ${config.accentHover} cursor-pointer bg-transparent border-none`}
          >
            Manage providers
          </button>
          <span className="text-muted-foreground/30">|</span>
          <button
            onClick={() => navigate("/dashboard/settings/billing")}
            className={`text-xs font-medium ${config.accent} ${config.accentHover} cursor-pointer bg-transparent border-none`}
          >
            View billing
          </button>
        </div>
      </div>
    </div>
  )
}

export function SettingsRow({
  icon,
  title,
  description,
  summary,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  summary?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition-colors text-left cursor-pointer bg-transparent border-none"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-muted-foreground/60 shrink-0">{icon}</span>
        <div className="min-w-0">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          {summary && (
            <p className="text-xs text-muted-foreground/60 mt-0.5">{summary}</p>
          )}
        </div>
      </div>
      <ChevronRight className="size-4 text-muted-foreground/40 shrink-0" />
    </button>
  )
}

export function ReferenceRow({
  icon,
  title,
  summary,
  muted = true,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  summary?: string
  muted?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/50 transition-colors text-left cursor-pointer bg-transparent border-none"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className={`shrink-0 ${muted ? "text-muted-foreground/40" : "text-muted-foreground"}`}>{icon}</span>
        <div className="min-w-0">
          <p className={`text-sm ${muted ? "text-muted-foreground" : "font-medium"}`}>{title}</p>
          {summary && (
            <p className={`text-xs mt-0.5 ${muted ? "text-muted-foreground/50" : "text-muted-foreground"}`}>{summary}</p>
          )}
        </div>
      </div>
      <ChevronRight className={`size-3.5 shrink-0 ${muted ? "text-muted-foreground/30" : "text-muted-foreground/40"}`} />
    </button>
  )
}

export function DeactivateZone({ productName, description }: { productName: string; description?: string }) {
  return (
    <div className="rounded-lg border border-destructive/20 bg-card">
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="size-4 text-destructive/60" />
          <div>
            <p className="text-sm font-medium text-destructive">Deactivate {productName}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {description ?? `Remove this practice from ${productName}. This pauses all providers.`}
            </p>
          </div>
        </div>
        <button className="text-xs font-medium text-destructive hover:text-destructive/80 cursor-pointer bg-transparent border-none">
          Deactivate
        </button>
      </div>
    </div>
  )
}
