import { useState, useEffect } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpDownIcon,
  MapPinIcon,
  PauseIcon,
  PlayIcon,
  TrashIcon,
  UserPlusIcon,
  ChevronDownIcon,
  UploadIcon,
  SearchIcon,
  PenLineIcon,
  StarIcon,
  BadgeCheckIcon,
  GraduationCapIcon,
  CreditCardIcon,
  LockIcon,
  VideoIcon,
  LinkIcon,
  CalendarIcon,
  AlertTriangleIcon,
  SparklesIcon,
  UsersIcon,
  DatabaseIcon,
} from "lucide-react"
import { usePractice, useIntegrationData } from "@/context/PracticeContext"
import { AlertList } from "@/components/alerts"
import type { Provider, ProductId, IntegrationAlert } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  EditableText,
  EditableTextarea,
  EditableToggle,
  EditableTagList,
  GuardedEditableTagList,
  GuardedEditableText,
  EditableFieldPopover,
  SyncedField,
} from "@/components/inline-edit"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { ConnectedSourcesButton, LastImportTag, SourceSummaryCard, FieldProvenanceTooltip, type SourceReference } from "@/components/sources"
import { SourceIcon } from "@/components/sources/SourceIcon"
import { SyncStatusDot } from "@/components/sources/SyncStatusIndicator"
import { usePageHeaderActions } from "@/context/HeaderActionsContext"
import { useAIChat } from "@/context/AIChatContext"
import { DataTable } from "@/components/ui/data-table"
import { ItemDetailView } from "@/components/item-detail"
import type { ChangelogEntry } from "@/components/item-detail"

// Maps are computed inside components via usePractice() hook

const PRODUCT_LABELS: Record<ProductId, string> = {
  marketplace: "MKT",
  bookable_presence: "BP",
  practice_solutions: "PS",
}

const PRODUCT_ORDER: ProductId[] = ["marketplace", "bookable_presence", "practice_solutions"]

const mockProviderChangelog: Record<string, ChangelogEntry[]> = {
  "prov-1": [
    { id: "pc1", timestamp: "2026-05-08T16:20:00Z", author: "EHR Sync", fieldLabel: "Locations", previousValue: "Brooklyn Heights", nextValue: "Brooklyn Heights, Park Slope", description: "New location detected from Athena Health" },
    { id: "pc2", timestamp: "2026-04-29T11:05:00Z", author: "Veronica Borges", fieldLabel: "Video visit states", previousValue: "NY", nextValue: "NY, NJ, CT" },
    { id: "pc3", timestamp: "2026-04-15T09:30:00Z", author: "Admin", fieldLabel: "Verification status", nextValue: "Verified", description: "Credential verification completed" },
    { id: "pc4", timestamp: "2026-03-01T14:00:00Z", author: "Admin", fieldLabel: "Created", description: "Provider profile created" },
  ],
  "prov-2": [
    { id: "pc5", timestamp: "2026-05-02T10:45:00Z", author: "Veronica Borges", fieldLabel: "Specialties", previousValue: "Dentistry", nextValue: "Dentistry, Cosmetic Dentistry" },
    { id: "pc6", timestamp: "2026-04-20T08:00:00Z", author: "EHR Sync", fieldLabel: "Appointment types", description: "2 new appointment types imported from Athena Health" },
  ],
}

function getAvailabilityHealth(slotCount: number | undefined) {
  if (slotCount == null || slotCount === 0) return { color: "text-red-500", bg: "bg-red-500", label: "None" }
  if (slotCount <= 7) return { color: "text-amber-500", bg: "bg-amber-500", label: "Low" }
  return { color: "text-emerald-500", bg: "bg-emerald-500", label: "Healthy" }
}

// ── Table Columns ──────────────────────────────────────────

function getColumns(locationMap: Record<string, string>, allIntegrationAlerts: IntegrationAlert[]): ColumnDef<Provider, unknown>[] {
  return [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="border-0 -ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Provider
        <ArrowUpDownIcon data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => {
      const provider = row.original
      const specialtyDisplay = provider.specialties.length > 2
        ? `${provider.specialties[0]} +${provider.specialties.length - 1}`
        : provider.specialties.join(", ")

      return (
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
            {provider.initials}
          </div>
          <div className="min-w-0">
            <div className="font-medium flex items-center gap-1.5">
              {provider.name}, {provider.suffix}
              <BadgeCheckIcon className={`size-3.5 shrink-0 ${
                (provider.credentials?.verificationStatus ?? "verified") === "verified"
                  ? "text-emerald-500"
                  : (provider.credentials?.verificationStatus) === "in_progress"
                    ? "text-amber-500"
                    : "text-red-500"
              }`} />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="truncate">{specialtyDisplay}</span>
              {provider.rating != null && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-0.5 shrink-0">
                    <StarIcon className="size-3 fill-current" />
                    {provider.rating}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: "locations",
    header: "Locations",
    cell: ({ row }) => {
      const names = row.original.locationIds
        .map((id) => locationMap[id])
        .filter(Boolean)
      const hasVideo = (row.original.videoVisitStates?.length ?? 0) > 0
      const display = names.length > 2
        ? `${names.slice(0, 2).join(", ")} +${names.length - 2}`
        : names.join(", ")

      return (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPinIcon className="size-3.5 shrink-0" />
          <span className="truncate">{display}</span>
          {hasVideo && (
            <VideoIcon className="size-3.5 shrink-0 text-muted-foreground/60" title={`Video visits: ${row.original.videoVisitStates!.join(", ")}`} />
          )}
        </div>
      )
    },
  },
  {
    id: "products",
    header: "Products",
    cell: ({ row }) => {
      const products = row.original.products ?? []
      const productMap = Object.fromEntries(products.map((p) => [p.productId, p.status]))

      return (
        <div className="flex items-center gap-1">
          {PRODUCT_ORDER.map((pid) => {
            const status = productMap[pid]
            const isLive = status === "live"
            return (
              <span
                key={pid}
                className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none ${
                  isLive
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground/50"
                }`}
                title={`${PRODUCT_LABELS[pid]}: ${status ?? "not set up"}`}
              >
                {PRODUCT_LABELS[pid]}
              </span>
            )
          })}
        </div>
      )
    },
  },
  {
    id: "availability",
    header: "Availability",
    cell: ({ row }) => {
      const count = row.original.upcomingSlotCount
      const health = getAvailabilityHealth(count)
      return (
        <div className="flex items-center gap-2 text-sm">
          <span className={`size-2 rounded-full ${health.bg}`} />
          <span className="tabular-nums">{count ?? 0} slots</span>
        </div>
      )
    },
  },
  {
    id: "alerts",
    header: "Alerts",
    cell: ({ row }) => {
      const providerAlertCount = row.original.alerts?.length ?? 0
      const integrationAlertCount = allIntegrationAlerts.filter(
        (a) => !a.dismissed && a.providerIds?.includes(row.original.id)
      ).length
      const alertCount = providerAlertCount + integrationAlertCount
      const recCount = row.original.recommendations?.length ?? 0

      if (alertCount === 0 && recCount === 0) return null

      return (
        <div className="flex items-center gap-1.5">
          {alertCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
              <AlertTriangleIcon className="size-3" />
              {alertCount} {alertCount === 1 ? "Alert" : "Alerts"}
            </span>
          )}
          {recCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
              <SparklesIcon className="size-3" />
              {recCount} {recCount === 1 ? "Tip" : "Tips"}
            </span>
          )}
        </div>
      )
    },
  },
  ]
}

// ── Detail View Helpers ────────────────────────────────────

function DetailRow({ label, value }: { label: string; value?: string | boolean | null }) {
  if (value === undefined || value === null || value === false || value === "") return null
  return (
    <div className="grid grid-cols-[180px_1fr] items-start py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm">{value === true ? "Yes" : value}</span>
    </div>
  )
}

function SectionHeader({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-6 pb-2 mt-2 border-t border-border/40 first:border-t-0 first:mt-0">
      <Icon className="size-4 text-muted-foreground" />
      <h3 className="text-sm font-semibold">{children}</h3>
    </div>
  )
}

// ── Provider Detail ────────────────────────────────────────

// ALL_LOCATION_NAMES computed inside ProviderDetail via hook

const US_STATES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia",
}

function stateDisplayLabel(abbr: string) {
  return US_STATES[abbr] ? `${US_STATES[abbr]} (${abbr})` : abbr
}

function stateTagLabel(abbr: string) {
  return abbr
}

function getVideoStateGroups(currentProvider: Provider, allProviders: Provider[]) {
  const otherProviders = allProviders.filter((p) => p.id !== currentProvider.id)
  const usedByOthers = new Set<string>()
  for (const p of otherProviders) {
    for (const s of p.videoVisitStates ?? []) {
      usedByOthers.add(s)
    }
  }

  const usedStates = Object.keys(US_STATES).filter((s) => usedByOthers.has(s))
  const remainingStates = Object.keys(US_STATES).filter((s) => !usedByOthers.has(s))

  const groups = []
  if (usedStates.length > 0) {
    groups.push({ label: "Used across practice", options: usedStates })
  }
  groups.push({ label: "All states", options: remainingStates })
  return groups
}

const COMMON_EXCLUSIONS = [
  "Couples therapy", "Child & adolescent psychiatry", "Bipolar disorder",
  "Substance abuse", "Eating disorders", "Gender-affirming care",
  "Workers' compensation", "Forensic evaluations",
]

function ProviderDetail({ provider }: { provider: Provider }) {
  const practiceData = usePractice()
  const { alerts: allIntegrationAlerts } = useIntegrationData()
  const locMap = Object.fromEntries(practiceData.locations.map((l) => [l.id, l.name]))
  const dsMap = Object.fromEntries((practiceData.dataSources ?? []).map((ds) => [ds.id, ds]))
  const atMap = Object.fromEntries(practiceData.appointmentTypes.map((at) => [at.id, at]))
  const allLocationNames = practiceData.locations.map((l) => l.name)

  const [name, setName] = useState(provider.name)
  const [suffix, setSuffix] = useState(provider.suffix)
  const [specialties, setSpecialties] = useState(provider.specialties)
  const [acceptsNew, setAcceptsNew] = useState(provider.acceptedPatients.new)
  const [acceptsExisting, setAcceptsExisting] = useState(provider.acceptedPatients.existing)
  const [ageMin, setAgeMin] = useState(String(provider.acceptedPatients.agesMin ?? ""))
  const [excludedReasons, setExcludedReasons] = useState(provider.acceptedPatients.excludedVisitReasons ?? [])
  const [locationNames, setLocationNames] = useState(
    provider.locationIds.map((id) => locMap[id]).filter(Boolean)
  )
  const [videoStates, setVideoStates] = useState(provider.videoVisitStates ?? [])
  const [acceptsInNetwork, setAcceptsInNetwork] = useState(provider.acceptedInsurancesAndPayments.acceptsInNetwork)
  const [acceptsOutOfNetwork, setAcceptsOutOfNetwork] = useState(provider.acceptedInsurancesAndPayments.acceptsOutOfNetwork)
  const [offersReimbursement, setOffersReimbursement] = useState(provider.acceptedInsurancesAndPayments.offersReimbursement ?? false)
  const [offersSliding, setOffersSliding] = useState(provider.acceptedInsurancesAndPayments.offersSliding ?? false)
  const [statement, setStatement] = useState(provider.professionalStatement ?? "")
  const [education, setEducation] = useState(provider.education ?? [])
  const [affiliations, setAffiliations] = useState(provider.hospitalAffiliations ?? [])
  const [accolades, setAccolades] = useState(provider.accolades ?? [])

  // Reset local state when provider changes (navigating between providers)
  useEffect(() => {
    setName(provider.name)
    setSuffix(provider.suffix)
    setSpecialties(provider.specialties)
    setAcceptsNew(provider.acceptedPatients.new)
    setAcceptsExisting(provider.acceptedPatients.existing)
    setAgeMin(String(provider.acceptedPatients.agesMin ?? ""))
    setExcludedReasons(provider.acceptedPatients.excludedVisitReasons ?? [])
    setLocationNames(provider.locationIds.map((id) => locMap[id]).filter(Boolean))
    setVideoStates(provider.videoVisitStates ?? [])
    setAcceptsInNetwork(provider.acceptedInsurancesAndPayments.acceptsInNetwork)
    setAcceptsOutOfNetwork(provider.acceptedInsurancesAndPayments.acceptsOutOfNetwork)
    setOffersReimbursement(provider.acceptedInsurancesAndPayments.offersReimbursement ?? false)
    setOffersSliding(provider.acceptedInsurancesAndPayments.offersSliding ?? false)
    setStatement(provider.professionalStatement ?? "")
    setEducation(provider.education ?? [])
    setAffiliations(provider.hospitalAffiliations ?? [])
    setAccolades(provider.accolades ?? [])
  }, [provider.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const credStatus = provider.credentials?.verificationStatus ?? "verified"
  const dataSource = provider.dataSourceId ? dsMap[provider.dataSourceId] : null
  const isSynced = !!dataSource
  const apptTypes = (provider.appointmentTypeIds ?? [])
    .map((id) => atMap[id])
    .filter(Boolean)
  const health = getAvailabilityHealth(provider.upcomingSlotCount)
  const providerAlerts = provider.alerts ?? []
  const integrationAlerts = allIntegrationAlerts.filter(
    (a) => !a.dismissed && a.providerIds?.includes(provider.id)
  )
  const alerts = [
    ...integrationAlerts.map((a) => ({
      id: a.id,
      severity: a.severity as "error" | "warning",
      message: `${a.title} — ${a.description}`,
      action: a.primaryAction,
    })),
    ...providerAlerts,
  ]
  const recommendations = provider.recommendations ?? []
  const hasAlerts = alerts.length > 0 || recommendations.length > 0
  const totalItems = alerts.length + recommendations.length

  const ehrSync = practiceData.practice.ehrIntegration
  const providerSync = ehrSync?.providerLocationSync?.filter(
    (s) => s.providerId === provider.id
  ) ?? []

  // Source summary for this provider
  const allSources = practiceData.dataSources ?? []
  const ehrSource = isSynced ? allSources.find((s) => s.type === "ehr") : null
  const rosterSources = allSources.filter((s) => s.type !== "ehr")

  const ehrMapping = practiceData.practice.ehrIntegration?.providerMappings?.find(
    (m) => m.providerId === provider.id
  )

  const rosterReferences: SourceReference[] = rosterSources.map((source) => {
    if (source.id === provider.dataSourceId && provider.sourceRefId) {
      const label = source.type === "spreadsheet" ? "Row" : "File ref"
      return { sourceId: source.id, refLabel: label, refValue: provider.sourceRefId! }
    }
    if (source.type === "spreadsheet") {
      return { sourceId: source.id, refLabel: "Matched by", refValue: `Name: ${provider.name}` }
    }
    if (source.type === "file") {
      return { sourceId: source.id, refLabel: "Matched by", refValue: `NPI ${provider.npi ?? "—"}` }
    }
    return null
  }).filter((r): r is SourceReference => r !== null)

  return (
    <div className="px-8 py-8 max-w-2xl">
      {/* ── Identity Header ── */}
      <div className="flex items-center gap-4 mb-1">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
          {provider.initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              <GuardedEditableText
                value={name}
                onSave={setName}
                warning="Changing the provider's name triggers credential re-verification. This typically takes 3–5 business days."
              />
              {", "}
              <GuardedEditableText
                value={suffix}
                onSave={setSuffix}
                warning="Changing the suffix triggers credential re-verification. This typically takes 3–5 business days."
              />
            </h2>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium shrink-0 ${
                credStatus === "verified"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : credStatus === "in_progress"
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                    : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
              }`}
            >
              <BadgeCheckIcon className="size-3" />
              {credStatus === "verified" ? "Verified" : credStatus === "in_progress" ? "Verifying" : "Action Needed"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {isSynced ? (
              <SyncedField
                value={specialties.join(", ")}
                sourceName={dataSource!.name}
                lastSynced={dataSource!.lastSyncAt ?? undefined}
              />
            ) : (
              <EditableText
                value={specialties.join(", ")}
                onSave={(v) => setSpecialties(v.split(",").map((s) => s.trim()).filter(Boolean))}
                placeholder="Add specialty"
              />
            )}
            {provider.rating != null && (
              <>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <StarIcon className="size-3 fill-current" />
                  {provider.rating}
                  {provider.reviewCount != null && (
                    <span className="text-muted-foreground/70">({provider.reviewCount})</span>
                  )}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product channel pills */}
      <div className="flex flex-wrap items-center gap-1.5 mt-3 ml-16">
        {provider.products && provider.products.length > 0 && PRODUCT_ORDER.map((pid) => {
          const product = provider.products?.find((p) => p.productId === pid)
          const isLive = product?.status === "live"
          return (
            <span
              key={pid}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                isLive
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground/50"
              }`}
            >
              <span className={`size-1.5 rounded-full ${isLive ? "bg-emerald-400" : "bg-current opacity-40"}`} />
              {pid === "marketplace" ? "Marketplace" : pid === "bookable_presence" ? "Bookable Presence" : "Practice Solutions"}
            </span>
          )
        })}
      </div>

      {/* ── Alerts & Insights ── */}
      {hasAlerts && (
        <div className="mt-5 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/30 px-4 py-3">
          <div className="space-y-2.5">
            {alerts.slice(0, totalItems > 2 ? 1 : 2).map((alert) => (
              <div key={alert.id} className="flex items-start gap-2.5">
                <AlertTriangleIcon className={`size-4 shrink-0 mt-0.5 ${alert.severity === "error" ? "text-red-500" : "text-amber-500"}`} />
                <div className="flex-1 text-sm">
                  <span>{alert.message}</span>
                  {alert.action && (
                    <button type="button" className="ml-2 text-foreground underline underline-offset-2 hover:text-foreground/80 font-medium">
                      {alert.action.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {totalItems <= 2 && recommendations.slice(0, 2 - Math.min(alerts.length, 2)).map((rec) => (
              <div key={rec.id} className="flex items-start gap-2.5">
                <SparklesIcon className="size-4 shrink-0 mt-0.5 text-blue-500" />
                <div className="flex-1 text-sm">
                  <span>{rec.message}</span>
                  {rec.action && (
                    <button type="button" className="ml-2 text-foreground underline underline-offset-2 hover:text-foreground/80 font-medium">
                      {rec.action.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {totalItems > 2 && (
              <div className="text-xs text-muted-foreground pt-0.5">
                {alerts.length > 1 && <span>+{alerts.length - 1} more alert{alerts.length - 1 > 1 ? "s" : ""}</span>}
                {alerts.length > 1 && recommendations.length > 0 && <span> · </span>}
                {recommendations.length > 0 && (
                  <span>{recommendations.length} recommendation{recommendations.length > 1 ? "s" : ""}</span>
                )}
                <button type="button" className="ml-2 text-foreground underline underline-offset-2 hover:text-foreground/80 font-medium">
                  View all
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-2 space-y-0">
        {/* ── Locations ── */}
        <SectionHeader icon={MapPinIcon}>Locations</SectionHeader>
        <div className="grid grid-cols-[180px_1fr] items-start py-2">
          <span className="text-sm text-muted-foreground">Locations</span>
          <GuardedEditableTagList
            values={locationNames}
            options={allLocationNames}
            onSave={setLocationNames}
            warning="Changing locations triggers credential re-verification and requires syncing the calendar in the EHR for this provider at the affected location."
            saveLabel="Save & sync"
            placeholder="Add locations"
            showBulkActions
            onAddNew={() => {}}
            addNewLabel="Add location"
          />
        </div>
        <div className="grid grid-cols-[180px_1fr] items-start py-2">
          <span className="text-sm text-muted-foreground">Video visit states</span>
          <GuardedEditableTagList
            values={videoStates}
            groups={getVideoStateGroups(provider, practiceData.providers)}
            onSave={setVideoStates}
            warning="Changing video visit states triggers credential re-verification for the affected states."
            saveLabel="Save & re-verify"
            placeholder="Add video visit states"
            displayLabel={stateDisplayLabel}
            tagLabel={stateTagLabel}
            showBulkActions
          />
        </div>

        {/* ── Scheduling & Availability ── */}
        <SectionHeader icon={CalendarIcon}>Scheduling & Availability</SectionHeader>

        {ehrSource && (
          <div className="grid grid-cols-[180px_1fr] items-center py-2">
            <span className="text-sm text-muted-foreground">EHR connection</span>
            <div className="flex items-center gap-2 text-sm">
              <SourceIcon type="ehr" size="sm" />
              <span className="font-medium">{ehrSource.name}</span>
              <SyncStatusDot status={ehrSource.status} />
              {ehrMapping?.ehrProviderId && (
                <span className="text-xs text-muted-foreground font-mono">{ehrMapping.ehrProviderId}</span>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-[180px_1fr] items-start py-2">
          <span className="text-sm text-muted-foreground">Appointment types</span>
          {apptTypes.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {apptTypes.slice(0, 6).map((at) => (
                <Badge key={at.id} variant="outline" className="text-xs font-normal">
                  {at.name}
                  {at.settings.durationExisting || at.settings.durationNew
                    ? ` (${at.settings.durationExisting ?? at.settings.durationNew}m)`
                    : ""}
                </Badge>
              ))}
              {apptTypes.length > 6 && (
                <Popover>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted transition-colors"
                      />
                    }
                  >
                    +{apptTypes.length - 6} more
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-72 p-3">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      All appointment types
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {apptTypes.map((at) => (
                        <Badge key={at.id} variant="outline" className="text-xs font-normal">
                          {at.name}
                          {at.settings.durationExisting || at.settings.durationNew
                            ? ` (${at.settings.durationExisting ?? at.settings.durationNew}m)`
                            : ""}
                        </Badge>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground italic">No appointment types assigned</span>
          )}
        </div>

        <div className="grid grid-cols-[180px_1fr] items-start py-2">
          <span className="text-sm text-muted-foreground">Open slots</span>
          <div className="flex items-center gap-2 text-sm">
            <span className={`size-2 rounded-full ${health.bg}`} />
            <span>{provider.upcomingSlotCount ?? 0} in next 14 days</span>
          </div>
        </div>

        {/* ── Profile & Background ── */}
        <SectionHeader icon={GraduationCapIcon}>Profile & Background</SectionHeader>
        {provider.npi && (
          <div className="grid grid-cols-[180px_1fr] items-start py-2">
            <span className="text-sm text-muted-foreground">NPI</span>
            <span className="text-sm font-mono">{provider.npi}</span>
          </div>
        )}
        <div className="grid grid-cols-[180px_1fr] items-start py-2">
          <span className="text-sm text-muted-foreground">Professional statement</span>
          <FieldProvenanceTooltip provenance={{ sourceName: "Provider Roster (Google Sheets)", sourceType: "spreadsheet", lastUpdated: "2026-05-09T14:30:00Z" }}>
            <EditableTextarea
              value={statement}
              onSave={setStatement}
              placeholder="Add a professional statement"
            />
          </FieldProvenanceTooltip>
        </div>
        {education.map((edu, i) => {
          const display = [
            edu.degree,
            edu.institution ? `from ${edu.institution}` : "",
            edu.year ? `· ${edu.year}` : "",
          ].filter(Boolean).join(" ")

          return (
            <div key={i} className="grid grid-cols-[180px_1fr] items-start py-2">
              <span className="text-sm text-muted-foreground">{i === 0 ? "Education" : ""}</span>
              <EditableFieldPopover
                displayValue={display}
                placeholder="Add education"
                fields={[
                  { key: "degree", label: "Degree", value: edu.degree, options: ["MD", "DO", "DDS", "DMD", "DPM", "OD", "PhD", "PsyD", "PA", "NP", "RN", "LCSW", "LPC", "LMFT", "RD", "PT", "OT", "DC", "PharmD", "BS", "MS", "MPH", "MBA"] },
                  { key: "institution", label: "Institution", value: edu.institution, placeholder: "e.g. Columbia University" },
                  { key: "year", label: "Year", value: edu.year != null ? String(edu.year) : "", placeholder: "e.g. 2012" },
                ]}
                onSave={(vals) => {
                  const next = [...education]
                  next[i] = {
                    degree: vals.degree?.trim() ?? "",
                    institution: vals.institution?.trim() ?? "",
                    year: vals.year ? parseInt(vals.year) || undefined : undefined,
                  }
                  setEducation(next)
                }}
              />
            </div>
          )
        })}
        {affiliations.map((aff, i) => (
          <div key={i} className="grid grid-cols-[180px_1fr] items-start py-2">
            <span className="text-sm text-muted-foreground">{i === 0 ? "Hospital affiliations" : ""}</span>
            <EditableText value={aff} onSave={(v) => { const next = [...affiliations]; next[i] = v; setAffiliations(next) }} />
          </div>
        ))}
        {accolades.map((acc, i) => (
          <div key={i} className="grid grid-cols-[180px_1fr] items-start py-2">
            <span className="text-sm text-muted-foreground">{i === 0 ? "Accolades" : ""}</span>
            <EditableText value={acc} onSave={(v) => { const next = [...accolades]; next[i] = v; setAccolades(next) }} />
          </div>
        ))}

        {/* Credentials (compact locked container within Profile) */}
        <div className="rounded-lg border border-dashed border-muted-foreground/25 bg-muted/30 px-4 py-3 mt-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <LockIcon className="size-3" />
              <span>Credentials</span>
            </div>
            <button
              type="button"
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
              onClick={() => {}}
            >
              Request a change
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {provider.npi && (
              <span className="inline-flex items-center rounded-md bg-background px-2 py-1 text-xs text-muted-foreground ring-1 ring-inset ring-border">
                NPI: <span className="font-mono ml-1">{provider.npi}</span>
              </span>
            )}
            {provider.credentials?.licenses?.map((lic) => (
              <span
                key={lic.number}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ring-1 ring-inset ${
                  lic.status === "active"
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-800"
                    : "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-800"
                }`}
              >
                {lic.state}
                <span className="opacity-40">·</span>
                <span className="font-mono">{lic.number}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Patient Scope ── */}
        <SectionHeader icon={UsersIcon}>Patient Scope</SectionHeader>
        <div className="grid grid-cols-[180px_1fr] items-center py-2">
          <span className="text-sm text-muted-foreground">Accepts new patients</span>
          <EditableToggle value={acceptsNew} onSave={setAcceptsNew} />
        </div>
        <div className="grid grid-cols-[180px_1fr] items-center py-2">
          <span className="text-sm text-muted-foreground">Accepts existing</span>
          <EditableToggle value={acceptsExisting} onSave={setAcceptsExisting} />
        </div>
        <div className="grid grid-cols-[180px_1fr] items-center py-2">
          <span className="text-sm text-muted-foreground">Gender</span>
          <EditableText
            value={
              (provider.acceptedPatients.genders ?? []).includes("all")
                ? "All genders"
                : (provider.acceptedPatients.genders ?? []).join(", ")
            }
            onSave={() => {}}
            placeholder="Set gender"
          />
        </div>
        <div className="grid grid-cols-[180px_1fr] items-center py-2">
          <span className="text-sm text-muted-foreground">Age range</span>
          <EditableText value={ageMin ? `${ageMin}+` : ""} onSave={(v) => setAgeMin(v.replace("+", ""))} placeholder="Set age range" />
        </div>
        <div className="grid grid-cols-[180px_1fr] items-start py-2">
          <span className="text-sm text-muted-foreground">Doesn't treat</span>
          <EditableTagList
            values={excludedReasons}
            options={COMMON_EXCLUSIONS}
            onSave={setExcludedReasons}
            variant="destructive"
            placeholder="None — click to add exclusions"
          />
        </div>

        {/* ── Insurance ── */}
        <SectionHeader icon={CreditCardIcon}>Insurance</SectionHeader>
        <DetailRow
          label="Total accepted"
          value={`${provider.acceptedInsurancesAndPayments.insuranceCount} plans`}
        />
        <div className="grid grid-cols-[180px_1fr] items-center py-2">
          <span className="text-sm text-muted-foreground">In-network</span>
          <EditableToggle value={acceptsInNetwork} onSave={setAcceptsInNetwork} />
        </div>
        <div className="grid grid-cols-[180px_1fr] items-center py-2">
          <span className="text-sm text-muted-foreground">Out-of-network</span>
          <EditableToggle value={acceptsOutOfNetwork} onSave={setAcceptsOutOfNetwork} />
        </div>
        <div className="grid grid-cols-[180px_1fr] items-center py-2">
          <span className="text-sm text-muted-foreground">OON reimbursement</span>
          <EditableToggle value={offersReimbursement} onSave={setOffersReimbursement} />
        </div>
        <div className="grid grid-cols-[180px_1fr] items-center py-2">
          <span className="text-sm text-muted-foreground">Sliding scale</span>
          <EditableToggle value={offersSliding} onSave={setOffersSliding} />
        </div>
        {provider.acceptedInsurancesAndPayments.insurances?.map((ins) => (
          <DetailRow
            key={ins.id}
            label={ins.name}
            value={ins.plans.map((p) => `${p.lineOfBusiness} (${p.networkTypes.join(", ")})`).join("; ")}
          />
        ))}

        {/* ── Roster Sources ── */}
        {rosterSources.length > 0 && (
          <>
            <SectionHeader icon={DatabaseIcon}>Roster Sources</SectionHeader>
            <SourceSummaryCard
              sources={rosterSources}
              references={rosterReferences}
            />
          </>
        )}
      </div>
    </div>
  )
}

// ── Page Component ─────────────────────────────────────────

export function ProvidersPage() {
  const practiceData = usePractice()
  const { alerts: integrationAlerts } = useIntegrationData()
  const { openPanelWithAction } = useAIChat()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const providers = practiceData.providers
  const dataSources = practiceData.dataSources ?? []
  const locationMap = Object.fromEntries(practiceData.locations.map((l) => [l.id, l.name]))
  const columns = getColumns(locationMap, integrationAlerts)

  function openDetail(_row: Provider, index: number) {
    setSelectedIndex(index)
    setDetailOpen(true)
  }

  function navigatePrev() {
    if (selectedIndex === null || selectedIndex <= 0) return
    setSelectedIndex(selectedIndex - 1)
  }

  function navigateNext() {
    if (selectedIndex === null || selectedIndex >= providers.length - 1) return
    setSelectedIndex(selectedIndex + 1)
  }

  const selected = selectedIndex !== null ? providers[selectedIndex] : null

  usePageHeaderActions(
    <>
      <LastImportTag sources={dataSources} />
      <ConnectedSourcesButton sources={dataSources} />
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button />}>
          <UserPlusIcon />
          Add provider
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <LinkIcon />
            Add data source
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UploadIcon />
            Import CSV / spreadsheet
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PenLineIcon />
            Add manually
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )

  return (
    <div className="flex flex-col gap-2">
      <AlertList alerts={integrationAlerts} pageContext="providers" />
      <DataTable
        columns={columns}
        data={providers}
        filterColumn="name"
        filterPlaceholder="Search providers..."
        onRowClick={openDetail}
        bulkEdit={{
          primaryActions: [
            {
              label: "Pause",
              icon: <PauseIcon />,
              onClick: () => {},
            },
            {
              label: "Resume",
              icon: <PlayIcon />,
              onClick: () => {},
            },
          ],
          overflowActions: [
            {
              label: "Export selected",
              onClick: () => {},
            },
            {
              label: "Reassign location",
              onClick: () => {},
            },
            {
              label: "Remove from practice",
              icon: <TrashIcon />,
              onClick: () => {},
              variant: "destructive",
            },
          ],
          onAIAction: (prompt, rows) => {
            const items = (rows as Provider[]).map(r => ({
              id: r.id,
              name: `${r.name}, ${r.suffix}`,
              subtitle: r.specialties[0],
            }))
            openPanelWithAction(prompt, items)
          },
          aiSuggestions: [
            "Update lead times",
            "Add insurance",
            "Change locations",
          ],
        }}
      />

      {selected && (
        <ItemDetailView
          open={detailOpen}
          onOpenChange={setDetailOpen}
          onNavigatePrev={navigatePrev}
          onNavigateNext={navigateNext}
          canNavigatePrev={selectedIndex !== null && selectedIndex > 0}
          canNavigateNext={selectedIndex !== null && selectedIndex < providers.length - 1}
          changelog={mockProviderChangelog[selected.id] ?? []}
          storageKey="zd-provider-detail-view-mode"
        >
          <ProviderDetail provider={selected} />
        </ItemDetailView>
      )}
    </div>
  )
}
