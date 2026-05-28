import { useState, useRef } from "react"
import {
  ArrowLeft,
  X,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useNavigate } from "@/lib/router"
import { usePractice } from "@/context/PracticeContext"
import { SettingsPageShell, SettingsPageHeader } from "./shared-settings"

// ── Types ───────────────────────────────────────────────────

type GBPStatus = "connected" | "not-connected" | "verification-pending"

interface GBPProvider {
  id: string
  name: string
  suffix: string
  specialty: string
  initials: string
  address: string
  locationName: string
  status: GBPStatus
  googleMatches?: GoogleMatch[]
}

interface GoogleMatch {
  id: string
  name: string
  address: string
  phone: string
  mapsId: string
}

const GOOGLE_MATCHES: Record<string, GoogleMatch[]> = {
  "prov-2": [
    { id: "gm-2a", name: "Marcus Williams, MD", address: "2880 Broadway, New York, NY 10025", phone: "(212) 555-0101", mapsId: "ChIJ..." },
    { id: "gm-2b", name: "Dr. Marcus Williams Psychiatry", address: "2884 Broadway, Ste 4A, New York, NY 10025", phone: "(212) 555-0199", mapsId: "ChIK..." },
  ],
  "prov-8": [
    { id: "gm-8a", name: "Maria Vasquez DO", address: "28-15 Steinway St, Astoria, NY 11103", phone: "(718) 555-0505", mapsId: "ChIL..." },
  ],
}

// ── Modal step types ────────────────────────────────────────

type ModalStep =
  | { type: "select-profile"; provider: GBPProvider }
  | { type: "create-profile"; provider: GBPProvider }
  | { type: "verification-method"; provider: GBPProvider; profileName: string }
  | { type: "enter-code"; provider: GBPProvider; method: string; destination: string }
  | { type: "success"; provider: GBPProvider }

// ── Select profile modal ────────────────────────────────────

function SelectProfileStep({
  provider,
  onSelect,
  onCreate,
  onClose,
}: {
  provider: GBPProvider
  onSelect: (match: GoogleMatch) => void
  onCreate: () => void
  onClose: () => void
}) {
  const [selected, setSelected] = useState<string | null>(
    provider.googleMatches?.[0]?.id ?? null
  )
  const matches = provider.googleMatches ?? []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <DialogTitle className="text-lg font-semibold">
          Select the profile you want to claim
        </DialogTitle>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="size-5" />
        </button>
      </div>
      <DialogDescription className="text-sm text-muted-foreground -mt-2">
        We found Google profiles that could be yours. If you see a match, select it to claim.
      </DialogDescription>

      {matches.length > 0 ? (
        <div className="space-y-2">
          {matches.map((match) => (
            <button
              key={match.id}
              onClick={() => setSelected(match.id)}
              className={`w-full text-left rounded-lg border p-3 transition-colors cursor-pointer ${
                selected === match.id
                  ? "border-green-600 bg-green-50/50 ring-1 ring-green-600"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <p className="text-sm font-medium">{match.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{match.address}</p>
              <p className="text-xs text-muted-foreground">
                Phone: {match.phone}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-4 text-center">
          <p className="text-sm text-muted-foreground">
            No existing Google Business Profiles found for this provider.
          </p>
        </div>
      )}

      <button
        onClick={onCreate}
        className="text-sm font-medium text-primary hover:text-primary/80 text-left"
      >
        {matches.length > 0 ? "I don't see a match" : "Create a new profile"}
      </button>

      {matches.length > 0 && (
        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              const match = matches.find((m) => m.id === selected)
              if (match) onSelect(match)
            }}
            disabled={!selected}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  )
}

// ── Create profile modal ────────────────────────────────────

function CreateProfileStep({
  provider,
  onContinue,
  onBack,
  onClose,
}: {
  provider: GBPProvider
  onContinue: (profileName: string) => void
  onBack: () => void
  onClose: () => void
}) {
  const [phone, setPhone] = useState("(212) 555-0100")
  const [website, setWebsite] = useState("riverdalemedical.com")
  const [category, setCategory] = useState("")
  const profileName = `Dr. ${provider.name} — ${provider.specialty}`

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-5" />
          </button>
          <DialogTitle className="text-lg font-semibold">
            Create and claim your Google Business Profile
          </DialogTitle>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="size-5" />
        </button>
      </div>
      <DialogDescription className="text-sm text-muted-foreground -mt-2">
        We can help you create a Google Business Profile using your Zocdoc account information.
      </DialogDescription>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Phone number</label>
          <p className="text-xs text-muted-foreground mb-1">Must match the one associated with your Zocdoc account</p>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm bg-muted/30"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Address</label>
          <p className="text-xs text-muted-foreground mb-1">Must match the one associated with your Zocdoc account</p>
          <input
            value={provider.address}
            readOnly
            className="w-full rounded-lg border px-3 py-2 text-sm bg-muted/50 text-muted-foreground"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Website</label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Primary business category</label>
          <p className="text-xs text-muted-foreground mb-1">
            Choose a category that describes your business overall, and be specific.
          </p>
          <input
            placeholder="Type to search categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Profile name</label>
          <input
            value={profileName}
            readOnly
            className="w-full rounded-lg border px-3 py-2 text-sm bg-muted/50 text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
          Learn more
        </a>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onContinue(profileName)}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

// ── Verification method modal ───────────────────────────────

const VERIFICATION_METHODS = [
  { id: "email", label: "Email", description: "Google will email a code to practice@gmail.com", recommended: true },
  { id: "phone", label: "Phone call", description: "Get your code by automated call at (212) 555-0100" },
  { id: "text", label: "Text message", description: "Get your code via SMS to (212) 555-0100" },
  { id: "postcard", label: "Postcard by mail", description: "Google will mail a code to your business address" },
]

function VerificationMethodStep({
  onVerify,
  onSkip,
  onBack,
  onClose,
}: {
  onVerify: (method: string, destination: string) => void
  onSkip: () => void
  onBack: () => void
  onClose: () => void
}) {
  const [selected, setSelected] = useState("email")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-5" />
          </button>
          <DialogTitle className="text-lg font-semibold">
            Choose a verification method
          </DialogTitle>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="size-5" />
        </button>
      </div>
      <DialogDescription className="text-sm text-muted-foreground -mt-2">
        Google needs to verify that you manage this business.{" "}
        <a href="#" className="underline underline-offset-2 hover:text-foreground">
          Learn more about verification.
        </a>
      </DialogDescription>

      <div className="space-y-2">
        {VERIFICATION_METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={`w-full text-left rounded-lg border p-3 transition-colors cursor-pointer ${
              selected === method.id
                ? "border-green-600 bg-green-50/50 ring-1 ring-green-600"
                : "border-border hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{method.label}</p>
                  {method.recommended && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 text-[10px]">
                      Recommended
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
              </div>
              <div className={`size-4 rounded-full border-2 flex items-center justify-center ${
                selected === method.id ? "border-green-600" : "border-muted-foreground/30"
              }`}>
                {selected === method.id && <div className="size-2 rounded-full bg-green-600" />}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <button
          onClick={onSkip}
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          I'll verify later
        </button>
        <Button
          onClick={() => {
            const method = VERIFICATION_METHODS.find((m) => m.id === selected)
            onVerify(selected, method?.description ?? "")
          }}
        >
          Verify
        </Button>
      </div>
    </div>
  )
}

// ── Enter code modal ────────────────────────────────────────

function EnterCodeStep({
  method,
  destination,
  onVerify,
  onBack,
  onClose,
}: {
  method: string
  destination: string
  onVerify: () => void
  onBack: () => void
  onClose: () => void
}) {
  const [code, setCode] = useState("")
  const [verifying, setVerifying] = useState(false)

  function handleVerify() {
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      onVerify()
    }, 1200)
  }

  const methodLabel = method === "email" ? "emailed" : method === "phone" ? "called" : method === "text" ? "texted" : "mailed"

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-5" />
          </button>
          <DialogTitle className="text-lg font-semibold">
            Enter your verification code
          </DialogTitle>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="size-5" />
        </button>
      </div>
      <DialogDescription className="text-sm text-muted-foreground -mt-2">
        Google {methodLabel} your 6-digit code to practice@gmail.com.
        It may take a few minutes for the code to arrive.
      </DialogDescription>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="------"
        maxLength={6}
        className="w-full rounded-lg border px-3 py-3 text-center text-lg font-mono tracking-widest"
      />

      <div className="flex items-center justify-between pt-2 border-t">
        <button className="text-sm font-medium text-primary hover:text-primary/80">
          Resend my code
        </button>
        <Button onClick={handleVerify} disabled={verifying}>
          {verifying ? (
            <>
              <Loader2 className="size-4 animate-spin mr-1.5" />
              Verifying
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </div>
    </div>
  )
}

// ── Success modal ───────────────────────────────────────────

function SuccessStep({
  provider,
  onClose,
}: {
  provider: GBPProvider
  onClose: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="size-5" />
        </button>
      </div>
      <div className="-mt-2">
        <DialogTitle className="text-lg font-semibold">
          Your profile has been created!
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground mt-2">
          It may take Google 2–5 business days to add the Zocdoc booking button to this profile.
          You can create and claim additional profiles in your Google Business Profiles settings.
        </DialogDescription>
      </div>
      <div className="flex justify-end pt-2 border-t">
        <Button onClick={onClose}>Got it</Button>
      </div>
    </div>
  )
}

// ── Provider card (needs-attention list) ────────────────────

function ProviderCard({
  provider,
  onSetUp,
}: {
  provider: GBPProvider
  onSetUp: () => void
}) {
  const s = STATUS_CONFIG[provider.status]
  const StatusIcon = s.icon

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {provider.initials}
          </div>
          <div>
            <p className="text-sm font-semibold">
              Dr. {provider.name}, {provider.suffix}
            </p>
            <p className="text-xs text-muted-foreground">{provider.specialty}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {provider.locationName}{provider.address ? ` · ${provider.address}` : ""}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Badge variant="outline" className={`text-[11px] ${s.color}`}>
            <StatusIcon className="size-3 mr-1" />
            {s.label}
          </Badge>
          {provider.status === "not-connected" && (
            <Button size="sm" variant="outline" onClick={onSetUp}>
              Set up profile
            </Button>
          )}
          {provider.status === "verification-pending" && (
            <span className="text-xs text-muted-foreground">Waiting on Google</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Status config (shared) ──────────────────────────────────

const STATUS_CONFIG = {
  "not-connected": { label: "Not connected", color: "text-red-600 bg-red-50 border-red-200", icon: AlertCircle },
  "verification-pending": { label: "Verification pending", color: "text-amber-600 bg-amber-50 border-amber-200", icon: Clock },
  connected: { label: "Connected", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
}

// ── All providers table ─────────────────────────────────────

interface AllProviderRow {
  id: string
  name: string
  suffix: string
  initials: string
  specialty: string
  locationName: string
  status: GBPStatus
}

function AllProvidersTable({
  rows,
  unconnectedIds,
  onSetUp,
}: {
  rows: AllProviderRow[]
  unconnectedIds: Set<string>
  onSetUp: (id: string) => void
}) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="text-left font-medium text-muted-foreground px-4 py-2.5">Provider</th>
            <th className="text-left font-medium text-muted-foreground px-4 py-2.5">Location</th>
            <th className="text-left font-medium text-muted-foreground px-4 py-2.5">Status</th>
            <th className="px-4 py-2.5 w-[1%]" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const s = STATUS_CONFIG[row.status]
            const StatusIcon = s.icon
            return (
              <tr key={row.id} className="border-b last:border-b-0 hover:bg-muted/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold shrink-0">
                      {row.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {row.name}, {row.suffix}
                      </p>
                      <p className="text-xs text-muted-foreground">{row.specialty}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{row.locationName}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={`text-[11px] ${s.color}`}>
                    <StatusIcon className="size-3 mr-1" />
                    {s.label}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {unconnectedIds.has(row.id) && row.status === "not-connected" && (
                    <Button size="sm" variant="outline" onClick={() => onSetUp(row.id)}>
                      Set up
                    </Button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ── Build helpers ───────────────────────────────────────────

function buildGBPProviders(practiceData: ReturnType<typeof usePractice>): GBPProvider[] {
  const { providers, locations } = practiceData
  const locationMap = new Map(locations.map((l) => [l.id, l]))

  return providers
    .filter((p) => p.products?.some((pr) => pr.productId === "bookable_presence" && pr.status === "incomplete"))
    .map((p) => {
      const loc = locationMap.get(p.locationIds[0])
      return {
        id: p.id,
        name: p.name,
        suffix: p.suffix,
        specialty: p.specialties[0] ?? "",
        initials: p.initials,
        address: loc?.address ?? "",
        locationName: loc?.name ?? "",
        status: "not-connected" as GBPStatus,
        googleMatches: GOOGLE_MATCHES[p.id],
      }
    })
}

function buildAllProviderRows(practiceData: ReturnType<typeof usePractice>, unconnectedProviders: GBPProvider[]): AllProviderRow[] {
  const { providers, locations } = practiceData
  const locationMap = new Map(locations.map((l) => [l.id, l]))
  const unconnectedMap = new Map(unconnectedProviders.map((p) => [p.id, p.status]))

  return providers.map((p) => {
    const loc = locationMap.get(p.locationIds[0])
    return {
      id: p.id,
      name: p.name,
      suffix: p.suffix,
      initials: p.initials,
      specialty: p.specialties[0] ?? "",
      locationName: loc?.name ?? "",
      status: unconnectedMap.get(p.id) ?? ("connected" as GBPStatus),
    }
  })
}

// ── GBP content (shared between settings + onboarding) ──────

function GoogleBusinessProfilesContent({
  mode,
}: {
  mode: "settings" | "onboarding"
}) {
  const navigate = useNavigate()
  const practiceData = usePractice()
  const totalProviders = practiceData.providers.length
  const tableRef = useRef<HTMLDivElement>(null)

  const [providers, setProviders] = useState<GBPProvider[]>(() => buildGBPProviders(practiceData))
  const [modalStep, setModalStep] = useState<ModalStep | null>(null)
  const [showTable, setShowTable] = useState(false)

  const connectedCount = totalProviders - providers.filter((p) => p.status === "not-connected").length
  const unconnected = providers.filter((p) => p.status !== "connected")
  const allRows = buildAllProviderRows(practiceData, providers)
  const unconnectedIds = new Set(providers.map((p) => p.id))

  function openClaimFlow(provider: GBPProvider) {
    setModalStep({ type: "select-profile", provider })
  }

  function openClaimFlowById(id: string) {
    const provider = providers.find((p) => p.id === id)
    if (provider) openClaimFlow(provider)
  }

  function updateProviderStatus(id: string, status: GBPStatus) {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    )
  }

  function handleModalClose() {
    setModalStep(null)
  }

  function handleViewAll() {
    setShowTable(true)
    setTimeout(() => tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
  }

  return (
    <>
      {/* Success summary */}
      <div className="rounded-xl border bg-emerald-50/50 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <CheckCircle2 className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                {connectedCount} of {totalProviders} providers connected to Google
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                We automatically matched most of your providers to their existing Google Business Profiles.
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleViewAll}>
            View all
            {showTable ? <ChevronUp className="size-3 ml-1" /> : <ChevronDown className="size-3 ml-1" />}
          </Button>
        </div>
      </div>

      {/* Unconnected providers */}
      {unconnected.length > 0 && (
        <div className="space-y-3">
          <div>
            <h2 className="text-base font-semibold">Needs attention</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {providers.filter((p) => p.status === "not-connected").length > 0
                ? "We couldn't find a Google Business Profile match for these providers."
                : "These providers are waiting on Google verification."
              }
            </p>
          </div>
          <div className="space-y-2">
            {unconnected.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onSetUp={() => openClaimFlow(provider)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All done state */}
      {unconnected.length === 0 && (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <CheckCircle2 className="size-8 text-emerald-500 mx-auto" />
          <p className="mt-3 text-sm font-semibold">All providers connected</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {mode === "onboarding"
              ? "You're all set. Head to your dashboard to explore your new tools."
              : <>You can manage your Google Business Profiles in{" "}
                  <button
                    onClick={() => navigate("/dashboard/products/bookable-presence/settings")}
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Bookable Presence settings
                  </button>.</>
            }
          </p>
        </div>
      )}

      {/* All providers table */}
      {showTable && (
        <div ref={tableRef} className="space-y-3">
          <h2 className="text-base font-semibold">All providers</h2>
          <AllProvidersTable
            rows={allRows}
            unconnectedIds={unconnectedIds}
            onSetUp={openClaimFlowById}
          />
        </div>
      )}

      {/* ── Claim modal flow ──────────────────────────────── */}
      <Dialog
        open={modalStep !== null}
        onOpenChange={(open) => { if (!open) handleModalClose() }}
      >
        <DialogContent className="sm:max-w-md" showCloseButton={false}>
          {modalStep?.type === "select-profile" && (
            <SelectProfileStep
              provider={modalStep.provider}
              onSelect={(match) =>
                setModalStep({
                  type: "verification-method",
                  provider: modalStep.provider,
                  profileName: match.name,
                })
              }
              onCreate={() =>
                setModalStep({
                  type: "create-profile",
                  provider: modalStep.provider,
                })
              }
              onClose={handleModalClose}
            />
          )}

          {modalStep?.type === "create-profile" && (
            <CreateProfileStep
              provider={modalStep.provider}
              onContinue={(profileName) =>
                setModalStep({
                  type: "verification-method",
                  provider: modalStep.provider,
                  profileName,
                })
              }
              onBack={() =>
                setModalStep({
                  type: "select-profile",
                  provider: modalStep.provider,
                })
              }
              onClose={handleModalClose}
            />
          )}

          {modalStep?.type === "verification-method" && (
            <VerificationMethodStep
              onVerify={(method, destination) =>
                setModalStep({
                  type: "enter-code",
                  provider: modalStep.provider,
                  method,
                  destination,
                })
              }
              onSkip={() => {
                updateProviderStatus(modalStep.provider.id, "verification-pending")
                handleModalClose()
              }}
              onBack={() =>
                setModalStep({
                  type: "select-profile",
                  provider: modalStep.provider,
                })
              }
              onClose={handleModalClose}
            />
          )}

          {modalStep?.type === "enter-code" && (
            <EnterCodeStep
              method={modalStep.method}
              destination={modalStep.destination}
              onVerify={() =>
                setModalStep({
                  type: "success",
                  provider: modalStep.provider,
                })
              }
              onBack={() =>
                setModalStep({
                  type: "verification-method",
                  provider: modalStep.provider,
                  profileName: "",
                })
              }
              onClose={handleModalClose}
            />
          )}

          {modalStep?.type === "success" && (
            <SuccessStep
              provider={modalStep.provider}
              onClose={() => {
                updateProviderStatus(modalStep.provider.id, "connected")
                handleModalClose()
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

// ── Settings page (inside dashboard with sidebar) ───────────

export function GoogleBusinessProfilesPage() {
  return (
    <SettingsPageShell>
      <SettingsPageHeader
        title="Google Business Profiles"
        description="Connect your providers to Google so patients can book directly from Search and Maps."
      />
      <GoogleBusinessProfilesContent mode="settings" />
    </SettingsPageShell>
  )
}

// ── Onboarding page (focused, no sidebar) ───────────────────

export function GoogleBusinessProfilesOnboardingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="border-b px-6 py-3 flex items-center justify-between shrink-0">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/dashboard/home")}
        >
          Go to dashboard
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-10 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Connect remaining providers to Google</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Finish connecting your Google Business Profiles so all your providers are bookable on Search and Maps.
            </p>
          </div>
          <GoogleBusinessProfilesContent mode="onboarding" />
        </div>
      </div>
    </div>
  )
}
