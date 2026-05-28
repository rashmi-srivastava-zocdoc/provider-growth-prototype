import { useState, useEffect, useMemo } from "react"
import { ArrowRight, ChevronDown, X, Check, Mail } from "lucide-react"
import { specialtyGroups } from "@/data/mockData"
import { MultiSelectPopover, type OptionGroup } from "@/components/ui/multi-select-popover"
import { useNavigate, asset } from "@/lib/router"

const popularSpecialties = [
  "Primary Care", "Dentistry", "Dermatology", "OB-GYN",
  "Mental Health", "Orthopedic Surgery", "ENT",
  "Optometry / Ophthalmology", "Urgent Care",
]

const hiddenFromGroups = new Set([
  ...popularSpecialties,
  "Family Medicine", "Internal Medicine", "Pediatrics",
  "Psychiatry", "ENT (Otolaryngology)", "Ophthalmology",
])

const signupSpecialtyGroups: OptionGroup[] = [
  { label: "Popular", options: popularSpecialties },
  ...specialtyGroups.map((g) => ({
    label: g.name,
    options: g.specialties.filter((s) => !hiddenFromGroups.has(s)),
  })).filter((g) => g.options.length > 0),
]

const practiceSizeOptions = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "200+", label: "200+" },
]

function SpecialtyDropdown({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (value: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const toggle = (s: string) => onChange(selected.filter((v) => v !== s))

  return (
    <MultiSelectPopover
      open={open}
      onOpenChange={setOpen}
      values={selected}
      onValuesChange={onChange}
      groups={signupSpecialtyGroups}
      searchPlaceholder="Search specialties..."
      emptyMessage="No specialties match your search."
      size="default"
      width="w-[var(--anchor-width)]"
      collisionPadding={16}
      collisionAvoidance={{ side: "flip", fallbackAxisSide: "none" }}
      footer={
        <div className="border-t border-[rgba(47,40,28,0.08)] pt-2.5 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="h-8 px-4 rounded-md bg-[#1b2228] text-white text-sm font-medium cursor-pointer border-none hover:bg-[#333] transition-colors"
          >
            Done
          </button>
        </div>
      }
      trigger={
        <button
          type="button"
          className="flex flex-wrap items-center gap-1.5 w-full min-h-[44px] px-3 py-2 rounded-lg border border-input bg-white text-sm text-left outline-none transition-colors cursor-pointer hover:border-muted-foreground/40 data-popup-open:border-foreground data-popup-open:ring-1 data-popup-open:ring-foreground"
        >
          {selected.length === 0 ? (
            <span className="text-[rgba(47,40,28,0.35)] flex-1">Select specialties...</span>
          ) : (
            selected.map((s) => (
              <span
                key={s}
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggle(s) }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); e.preventDefault(); toggle(s) } }}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
              >
                {s}
                <span className="text-muted-foreground ml-0.5">&times;</span>
              </span>
            ))
          )}
          <ChevronDown className="size-4 text-muted-foreground/50 ml-auto shrink-0" />
        </button>
      }
    />
  )
}

function RightPanel() {
  return (
    <div className="h-full bg-[#f5f5f4] flex flex-col items-center justify-center p-12 relative overflow-hidden border-l border-[rgba(47,40,28,0.08)]">
      <img
        src={asset("/landing-page/hero.svg")}
        alt=""
        className="w-[90%] max-w-[500px] h-auto drop-shadow-lg"
      />
      <p className="mt-8 text-sm text-[rgba(51,51,51,0.5)] uppercase tracking-wider font-medium">
        The Zocdoc provider platform
      </p>
    </div>
  )
}

const passwordRules = [
  { key: "length", label: "Use at least 8 characters", test: (p: string) => p.length >= 8 },
  { key: "letters", label: "Use letters", test: (p: string) => /[a-zA-Z]/.test(p) },
  { key: "numbers", label: "Use numbers", test: (p: string) => /\d/.test(p) },
  { key: "special", label: "Use special characters, like @#$%&*", test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
]

export function CombinedSignUpFlow() {
  const navigate = useNavigate()
  const [step, setStep] = useState<"form" | "verify">("form")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("andrea.rodriguez@riverdalemedical.com")
  const [editingEmail, setEditingEmail] = useState(false)
  const [password, setPassword] = useState("")
  const [practiceName, setPracticeName] = useState("")
  const [specialties, setSpecialties] = useState<string[]>([])
  const [practiceSize, setPracticeSize] = useState<string | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [mounted, setMounted] = useState(false)

  const ruleResults = useMemo(() =>
    passwordRules.map((r) => ({ ...r, passed: r.test(password) })),
    [password],
  )

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const handleContinue = () => {
    setStep("verify")
  }

  const handleOpenEmail = () => {
    navigate("/dashboard/provider-growth-home")
  }

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      <header className="shrink-0 bg-white z-10">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2">
            <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="h-7" />
            <span className="text-lg font-bold text-[#1b2228] tracking-tight">Zocdoc</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[rgba(51,51,51,0.6)]">Already have an account?</span>
            <button className="font-semibold text-[#1b2228] underline bg-transparent border-none cursor-pointer">
              Log in
            </button>
          </div>
        </div>
        <div className="h-1 bg-[rgba(47,40,28,0.08)]">
          <div
            className="h-full bg-[#1b2228] rounded-r-full transition-all duration-700 ease-out"
            style={{ width: mounted ? "100%" : "0%" }}
          />
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 basis-1/2 flex flex-col items-center px-12 py-10 overflow-y-auto">

          {step === "verify" ? (
            <div className="w-full max-w-[420px] flex flex-col items-center justify-center flex-1 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="size-16 rounded-full bg-[#f0f0ef] flex items-center justify-center">
                  <Mail className="size-7 text-[#333]" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-[#1b2228]">
                Your account is ready!<br />Verify your email to get started.
              </h1>
              <p className="text-sm text-[rgba(51,51,51,0.6)] mt-6 leading-relaxed">
                We sent a verification link to <span className="font-medium text-[#333]">{email}</span>.
                {" "}Didn't get it?{" "}
                <button className="font-medium text-[#1b2228] underline bg-transparent border-none cursor-pointer text-sm">
                  Resend
                </button>
              </p>
              <div className="mt-6 w-full max-w-[320px]">
                <button
                  onClick={handleOpenEmail}
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[#FEED5A] text-sm font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
                >
                  Open email
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          ) : (

          <div className="w-full max-w-[420px]">

            {/* Section 1: About your practice */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-[#1b2228]">Tell us about your practice</h1>
              <p className="text-sm text-[rgba(51,51,51,0.6)] mt-1">
                This helps us set up your account and tailor your experience.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Practice name</label>
                <input
                  type="text"
                  value={practiceName}
                  onChange={(e) => setPracticeName(e.target.value)}
                  placeholder="e.g. Riverdale Medical Group"
                  className="w-full h-11 px-3.5 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Primary specialties</label>
                <SpecialtyDropdown selected={specialties} onChange={setSpecialties} />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333]">Practice size</label>
                <span className="block text-xs text-[rgba(51,51,51,0.5)] mb-3">Number of providers including NPs, PAs, DHs, etc.</span>
                <div className="grid grid-cols-4 gap-2">
                  {practiceSizeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setPracticeSize(opt.value)}
                      className={`h-10 rounded-lg text-sm font-semibold transition-all cursor-pointer border-none ${
                        practiceSize === opt.value
                          ? "bg-[#1b2228] text-white"
                          : "bg-[#f0f0ef] text-[#333] hover:bg-[#e5e5e4]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-7">
              <div className="h-px bg-[rgba(47,40,28,0.1)]" />
            </div>

            {/* Section 2: Create your account */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#1b2228]">Create your account</h2>
              <p className="text-sm text-[rgba(51,51,51,0.6)] mt-1">
                Get started with Zocdoc for free
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Pre-populated email card */}
              <div className="flex items-center justify-between rounded-lg bg-[#f5f5f4] px-4 py-3">
                {editingEmail ? (
                  <div className="flex-1 mr-3">
                    <label className="block text-xs text-[rgba(51,51,51,0.5)] mb-0.5">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                      onBlur={() => setEditingEmail(false)}
                      onKeyDown={(e) => { if (e.key === "Enter") setEditingEmail(false) }}
                      className="w-full bg-transparent text-sm text-[#1b2228] outline-none border-none p-0"
                    />
                  </div>
                ) : (
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[rgba(51,51,51,0.5)]">Email address</p>
                    <p className="text-sm text-[#1b2228] truncate">{email}</p>
                  </div>
                )}
                <button
                  onClick={() => setEditingEmail(!editingEmail)}
                  className="text-sm font-medium text-[#1b2228] underline bg-transparent border-none cursor-pointer shrink-0 ml-3"
                >
                  {editingEmail ? "Done" : "Change"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1.5">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Andrea"
                    className="w-full h-11 px-3.5 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1.5">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Rodriguez"
                    className="w-full h-11 px-3.5 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8+ characters"
                    className="w-full h-11 px-3.5 pr-10 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
                  />
                  {password && (
                    <button
                      type="button"
                      onClick={() => setPassword("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(51,51,51,0.4)] hover:text-[#333] bg-transparent border-none cursor-pointer p-0"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
                {/* Condensed password rules — inline chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {ruleResults.map((rule) => (
                    <span
                      key={rule.key}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors ${
                        password
                          ? rule.passed
                            ? "bg-green-50 text-green-700"
                            : "bg-[#f0f0ef] text-[rgba(51,51,51,0.5)]"
                          : "bg-[#f0f0ef] text-[rgba(51,51,51,0.5)]"
                      }`}
                    >
                      {password && rule.passed && <Check className="size-3" />}
                      {rule.label.replace("Use ", "").replace(", like @#$%&*", "")}
                    </span>
                  ))}
                </div>
              </div>
            </div>

              {/* Terms checkboxes */}
              <div className="flex flex-col gap-3 mt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-[rgba(47,40,28,0.3)] accent-[#1b2228] cursor-pointer"
                  />
                  <span className="text-sm text-[#333] leading-snug">
                    I have read and agree to the terms of the Zocdoc{" "}
                    <button className="text-[#2563eb] underline bg-transparent border-none cursor-pointer text-sm p-0 font-medium">
                      User Agreement
                    </button>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-[rgba(47,40,28,0.3)] accent-[#1b2228] cursor-pointer"
                  />
                  <span className="text-sm text-[#333] leading-snug">
                    I accept the terms of Zocdoc's{" "}
                    <button className="text-[#2563eb] underline bg-transparent border-none cursor-pointer text-sm p-0 font-medium">
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleContinue}
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[#FEED5A] text-sm font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
                >
                  Get started
                  <ArrowRight className="size-4" />
                </button>
              </div>

          </div>
          )}
        </div>
        <div className="flex-1 basis-1/2">
          <RightPanel />
        </div>
      </div>
    </div>
  )
}
