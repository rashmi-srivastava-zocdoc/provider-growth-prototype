import { useState, useEffect } from "react"
import { ArrowRight, Check, Building2, MapPin, Stethoscope, Users, BadgeCheck, Sparkles, Pencil } from "lucide-react"
import { useNavigate, asset } from "@/lib/router"
import { enrichFromEmail, type EnrichmentResult } from "@/data/enrichment"

// Step 3 of the funnel — the "magic" moment. We take the email captured at
// signup, look up the provider's organization/practice, and present whatever
// we found (name, location, specialty, size) as an editable confirmation card.

const sizeOptions = ["1-10", "11-50", "51-200", "200+"]

function Field({
  icon,
  label,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ReactNode
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5 border-b border-[rgba(47,40,28,0.08)] last:border-b-0">
      <span className="text-[rgba(51,51,51,0.4)] mt-2 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <label className="block text-[11px] uppercase tracking-wide text-[rgba(51,51,51,0.45)] font-semibold mb-0.5">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[15px] text-[#1b2228] outline-none border-none p-0 placeholder:text-[rgba(51,51,51,0.35)]"
        />
      </div>
      <Pencil className="size-3.5 text-[rgba(51,51,51,0.25)] mt-2 shrink-0" />
    </div>
  )
}

export function ConfirmPracticePage() {
  const navigate = useNavigate()
  const [email] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get("email") || "you@yourpractice.com"
  })
  const [phase, setPhase] = useState<"searching" | "result">("searching")
  const [data, setData] = useState<EnrichmentResult | null>(null)

  // Editable fields
  const [orgName, setOrgName] = useState("")
  const [location, setLocation] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [size, setSize] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    const result = enrichFromEmail(email)
    const timer = setTimeout(() => {
      setData(result)
      setOrgName(result.organizationName)
      setLocation(result.location)
      setSpecialty(result.specialty)
      setSize(result.size)
      setPhase("result")
    }, 1900)
    return () => {
      cancelAnimationFrame(t)
      clearTimeout(timer)
    }
  }, [email])

  const proceed = () => {
    const params = new URLSearchParams({
      email,
      org: orgName,
      location,
      specialty,
      size,
    })
    navigate(`/onboarding/details?${params.toString()}`)
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <header className="shrink-0 bg-white z-10">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2">
            <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="h-7" />
            <span className="text-lg font-bold text-[#1b2228] tracking-tight">Zocdoc</span>
          </div>
          <span className="text-sm text-[rgba(51,51,51,0.5)]">Step 2 of 3</span>
        </div>
        <div className="h-1 bg-[rgba(47,40,28,0.08)]">
          <div
            className="h-full bg-[#1b2228] rounded-r-full transition-all duration-700 ease-out"
            style={{ width: mounted ? "66%" : "33%" }}
          />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {phase === "searching" ? (
          <div className="flex flex-col items-center text-center max-w-[440px]">
            <div className="size-16 rounded-full bg-[#f0f0ef] flex items-center justify-center mb-6 relative">
              <Sparkles className="size-7 text-[#1b2228]" />
              <span className="absolute inset-0 rounded-full border-2 border-[#1b2228]/15 border-t-[#1b2228] animate-spin" />
            </div>
            <h1 className="text-2xl font-semibold text-[#1b2228]">Looking up your practice…</h1>
            <p className="text-sm text-[rgba(51,51,51,0.6)] mt-3 leading-relaxed">
              We're searching public records and the NPI registry using{" "}
              <span className="font-medium text-[#333]">{email}</span> to pre-fill your details.
            </p>
          </div>
        ) : data ? (
          <div className="w-full max-w-[520px]">
            {/* Result header */}
            {data.matched ? (
              <div className="flex flex-col items-center text-center mb-6">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-4">
                  <BadgeCheck className="size-4" />
                  We found your {data.entityType}
                </div>
                <h1 className="text-2xl font-semibold text-[#1b2228]">Is this your practice?</h1>
                <p className="text-sm text-[rgba(51,51,51,0.6)] mt-2">
                  We pulled these details from your email. Review and edit anything that's off.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center mb-6">
                <h1 className="text-2xl font-semibold text-[#1b2228]">Tell us about your practice</h1>
                <p className="text-sm text-[rgba(51,51,51,0.6)] mt-2">
                  We couldn't find a confident match for <span className="font-medium text-[#333]">{email}</span>. Fill in your details to continue.
                </p>
              </div>
            )}

            {/* Editable confirmation card */}
            <div className="rounded-2xl border border-[rgba(47,40,28,0.12)] bg-white shadow-sm overflow-hidden">
              <Field
                icon={<Building2 className="size-4" />}
                label="Organization / Practice name"
                value={orgName}
                onChange={setOrgName}
                placeholder="e.g. Riverdale Medical Group"
              />
              <Field
                icon={<MapPin className="size-4" />}
                label="Location"
                value={location}
                onChange={setLocation}
                placeholder="City, State"
              />
              <Field
                icon={<Stethoscope className="size-4" />}
                label="Primary specialty"
                value={specialty}
                onChange={setSpecialty}
                placeholder="e.g. Primary Care"
              />
              <div className="flex items-start gap-3 px-4 py-3.5">
                <span className="text-[rgba(51,51,51,0.4)] mt-1 shrink-0"><Users className="size-4" /></span>
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] uppercase tracking-wide text-[rgba(51,51,51,0.45)] font-semibold mb-2">Practice size (providers)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {sizeOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSize(opt)}
                        className={`h-9 rounded-lg text-sm font-semibold transition-all cursor-pointer border-none ${
                          size === opt ? "bg-[#1b2228] text-white" : "bg-[#f0f0ef] text-[#333] hover:bg-[#e5e5e4]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* What else we found */}
            {data.matched && (
              <div className="mt-4 rounded-xl bg-[#fafaf9] border border-[rgba(47,40,28,0.08)] px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#1b2228]">
                    {data.providerCount} providers found under this organization
                  </p>
                  {data.npi && (
                    <span className="text-xs text-[rgba(51,51,51,0.5)]">NPI {data.npi}</span>
                  )}
                </div>
                {data.providers.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {data.providers.map((p) => (
                      <span key={p.npi} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[rgba(47,40,28,0.1)] text-xs text-[#333]">
                        <Check className="size-3 text-green-600" />
                        {p.name}
                      </span>
                    ))}
                    {data.providerCount > data.providers.length && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white border border-[rgba(47,40,28,0.1)] text-xs text-[rgba(51,51,51,0.55)]">
                        +{data.providerCount - data.providers.length} more
                      </span>
                    )}
                  </div>
                )}
                <p className="text-xs text-[rgba(51,51,51,0.45)] mt-2.5">
                  You'll be able to confirm and import these providers during setup.
                </p>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={proceed}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[#FEED5A] text-sm font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
              >
                {data.matched ? "Yes, this is my practice" : "Continue"}
                <ArrowRight className="size-4" />
              </button>
              {data.matched && (
                <button
                  onClick={() => {
                    setData({ ...data, matched: false })
                    setOrgName("")
                    setLocation("")
                    setSpecialty("")
                    setSize("")
                  }}
                  className="block mx-auto mt-3 text-sm text-[rgba(51,51,51,0.6)] underline bg-transparent border-none cursor-pointer hover:text-[#1b2228]"
                >
                  This isn't my practice
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
