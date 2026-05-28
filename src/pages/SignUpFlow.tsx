import { useState, useRef, useEffect, useMemo } from "react"
import { ArrowRight, Search, Check, Mail, ChevronDown } from "lucide-react"
import { specialtyGroups } from "@/data/mockData"
import { MultiSelectPopover, type OptionGroup } from "@/components/ui/multi-select-popover"
import { useNavigate, asset } from "@/lib/router"
import { usePrototypeVariants } from "@/context/PrototypeVariantsContext"

const allSpecialties = specialtyGroups.flatMap((g) => g.specialties)

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
  { value: "1", label: "1" },
  { value: "2-10", label: "2-10" },
  { value: "11-49", label: "11-49" },
  { value: "50-199", label: "50-199" },
  { value: "200-999", label: "200-999" },
  { value: "1000+", label: "1000+" },
]

// ---------------------------------------------------------------------------
// Shared small components
// ---------------------------------------------------------------------------

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.26c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect width="8.5" height="8.5" fill="#F25022" />
      <rect x="9.5" width="8.5" height="8.5" fill="#7FBA00" />
      <rect y="9.5" width="8.5" height="8.5" fill="#00A4EF" />
      <rect x="9.5" y="9.5" width="8.5" height="8.5" fill="#FFB900" />
    </svg>
  )
}

function PrimaryCTA({
  onClick,
  label,
}: {
  onClick: () => void
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[#FEED5A] text-sm font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
    >
      {label}
      <ArrowRight className="size-4" />
    </button>
  )
}

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

function SpecialtyPills({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (value: string[]) => void
}) {
  const [showOther, setShowOther] = useState(false)
  const [query, setQuery] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  const otherFiltered = useMemo(() => {
    if (!query.trim()) return allSpecialties.filter((s) => !popularSpecialties.includes(s)).slice(0, 12)
    const q = query.toLowerCase()
    return allSpecialties.filter((s) => !popularSpecialties.includes(s) && s.toLowerCase().includes(q))
  }, [query])

  const toggle = (specialty: string) => {
    onChange(
      selected.includes(specialty)
        ? selected.filter((s) => s !== specialty)
        : [...selected, specialty],
    )
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowOther(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref}>
      <div className="flex flex-wrap gap-2">
        {popularSpecialties.map((specialty) => {
          const isSelected = selected.includes(specialty)
          return (
            <button
              key={specialty}
              type="button"
              onClick={() => toggle(specialty)}
              className={`h-11 px-4 rounded-lg text-sm font-semibold transition-all cursor-pointer border-none ${
                isSelected
                  ? "bg-[#1b2228] text-white"
                  : "bg-[#f0f0ef] text-[#333] hover:bg-[#e5e5e4]"
              }`}
            >
              {specialty}
            </button>
          )
        })}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowOther(!showOther)}
            className={`h-11 px-4 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              showOther || selected.some((s) => !popularSpecialties.includes(s))
                ? "bg-[#1b2228] text-white border-none"
                : "bg-white text-[rgba(51,51,51,0.5)] border border-dashed border-[rgba(47,40,28,0.25)] hover:border-[rgba(47,40,28,0.4)] hover:text-[#333]"
            }`}
          >
            Other...
          </button>
          {showOther && (
            <div className="absolute z-50 top-full left-0 mt-2 w-[280px] bg-white border border-[rgba(47,40,28,0.15)] rounded-lg shadow-lg overflow-hidden">
              <div className="p-2 border-b border-[rgba(47,40,28,0.08)]">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[rgba(51,51,51,0.4)]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search specialties..."
                    autoFocus
                    className="w-full h-9 pl-8 pr-3 rounded-md border border-[rgba(47,40,28,0.12)] bg-white text-sm outline-none focus:border-[#333] transition-colors"
                  />
                </div>
              </div>
              <div className="max-h-[200px] overflow-y-auto py-1">
                {otherFiltered.map((specialty) => {
                  const isSelected = selected.includes(specialty)
                  return (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => toggle(specialty)}
                      className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                        isSelected ? "bg-[#f8f8f8] font-medium" : "hover:bg-[#f8f8f8]"
                      }`}
                    >
                      <div className={`size-4 rounded border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#1b2228] border-[#1b2228]"
                          : "border-[rgba(47,40,28,0.25)] bg-white"
                      }`}>
                        {isSelected && <Check className="size-3 text-white" />}
                      </div>
                      {specialty}
                    </button>
                  )
                })}
                {otherFiltered.length === 0 && (
                  <p className="py-4 text-center text-sm text-[rgba(51,51,51,0.4)]">
                    No specialties match.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {selected.some((s) => !popularSpecialties.includes(s)) && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {selected.filter((s) => !popularSpecialties.includes(s)).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f0f0ef] text-xs font-medium text-[#333] hover:bg-[#e5e5e4] transition-colors cursor-pointer border-none"
            >
              {s}
              <span className="text-[rgba(51,51,51,0.4)] ml-0.5">&times;</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step components
// ---------------------------------------------------------------------------

function CreateAccountStep({
  email,
  setEmail,
  fullName,
  setFullName,
  password,
  setPassword,
  onSocialAuth,
  onEmailContinue,
  showSocialLogin,
}: {
  email: string
  setEmail: (v: string) => void
  fullName: string
  setFullName: (v: string) => void
  password: string
  setPassword: (v: string) => void
  onSocialAuth: (provider: "google" | "microsoft") => void
  onEmailContinue: () => void
  showSocialLogin: boolean
}) {
  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1b2228]">Create your account</h1>
        <p className="text-sm text-[rgba(51,51,51,0.6)] mt-1">Get started with Zocdoc for free</p>
      </div>

      {showSocialLogin && (
        <>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onSocialAuth("google")}
              className="flex items-center justify-center gap-3 w-full h-11 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm font-medium text-[#333] hover:bg-[#f8f8f8] transition-colors cursor-pointer"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              onClick={() => onSocialAuth("microsoft")}
              className="flex items-center justify-center gap-3 w-full h-11 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm font-medium text-[#333] hover:bg-[#f8f8f8] transition-colors cursor-pointer"
            >
              <MicrosoftIcon />
              Continue with Microsoft
            </button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[rgba(47,40,28,0.12)]" />
            <span className="text-xs text-[rgba(51,51,51,0.4)] uppercase tracking-wider font-medium">or</span>
            <div className="flex-1 h-px bg-[rgba(47,40,28,0.12)]" />
          </div>
        </>
      )}

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-[#333] mb-1.5">Full name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Andrea Rodriguez"
            className="w-full h-11 px-3.5 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#333] mb-1.5">Work email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourpractice.com"
            className="w-full h-11 px-3.5 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#333] mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8+ characters"
            className="w-full h-11 px-3.5 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
          />
        </div>
        <button
          onClick={onEmailContinue}
          className="w-full h-11 rounded-lg bg-[#1b2228] text-white text-sm font-semibold cursor-pointer border-none hover:bg-[#333] transition-colors mt-1"
        >
          Continue
        </button>
      </div>

      <p className="text-xs text-[rgba(51,51,51,0.4)] mt-6 leading-relaxed">
        By continuing, you agree to Zocdoc's <button className="underline bg-transparent border-none cursor-pointer text-[rgba(51,51,51,0.4)] text-xs">Terms of Service</button> and <button className="underline bg-transparent border-none cursor-pointer text-[rgba(51,51,51,0.4)] text-xs">Privacy Policy</button>.
      </p>
    </div>
  )
}

function PracticeInfoStep({
  practiceName,
  setPracticeName,
  specialties,
  setSpecialties,
  practiceSize,
  setPracticeSize,
  showSpecialties,
  onNext,
  buttonLabel,
}: {
  practiceName: string
  setPracticeName: (v: string) => void
  specialties: string[]
  setSpecialties: (v: string[]) => void
  practiceSize: string | null
  setPracticeSize: (v: string) => void
  showSpecialties: boolean
  onNext: () => void
  buttonLabel: string
}) {
  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1b2228]">Tell us about your practice</h1>
        <p className="text-sm text-[rgba(51,51,51,0.6)] mt-1">
          This helps us set up your account and tailor your experience.
        </p>
      </div>

      <div className="flex flex-col gap-5">
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

        {showSpecialties && (
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1.5">Primary specialties</label>
            <SpecialtyDropdown selected={specialties} onChange={setSpecialties} />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#333]">Practice size</label>
          <span className="block text-xs text-[rgba(51,51,51,0.5)] mb-3">Number of providers including NPs, PAs, DHs, etc.</span>
          <div className="grid grid-cols-2 gap-2">
            {practiceSizeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPracticeSize(opt.value)}
                className={`h-11 rounded-lg text-sm font-semibold transition-all cursor-pointer border-none ${
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

        <div className="mt-2">
          <PrimaryCTA onClick={onNext} label={buttonLabel} />
        </div>
      </div>
    </div>
  )
}

function SpecialtiesStep({
  specialties,
  setSpecialties,
  onNext,
  buttonLabel,
}: {
  specialties: string[]
  setSpecialties: (v: string[]) => void
  onNext: () => void
  buttonLabel: string
}) {
  return (
    <div className="w-full max-w-[440px]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1b2228]">What are your primary specialties?</h1>
        <p className="text-sm text-[rgba(51,51,51,0.6)] mt-1">
          Select the specialties your practice offers.
        </p>
      </div>

      <SpecialtyPills selected={specialties} onChange={setSpecialties} />

      <div className="mt-8">
        <PrimaryCTA onClick={onNext} label={buttonLabel} />
      </div>
    </div>
  )
}

function VerifyEmailStep({
  email,
  onAction,
}: {
  email: string
  onAction: () => void
}) {
  return (
    <div className="w-full max-w-[400px] text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="size-16 rounded-full bg-[#f0f0ef] flex items-center justify-center">
          <Mail className="size-7 text-[#333]" />
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-[#1b2228]">Your account is ready!<br />Verify your email to get started.</h1>
      <p className="text-sm text-[rgba(51,51,51,0.6)] mt-6 leading-relaxed">
        We sent a verification link to <span className="font-medium text-[#333]">{email}</span>.
        {" "}Didn't get it?{" "}
        <button className="font-medium text-[#1b2228] underline bg-transparent border-none cursor-pointer text-sm">
          Resend
        </button>
      </p>
      <div className="mt-6">
        <PrimaryCTA onClick={onAction} label="Open email" />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Main flow
// ---------------------------------------------------------------------------

export function SignUpFlow({
  variant = "two-step",
  authOnly = false,
}: {
  variant?: "two-step" | "multi-step"
  authOnly?: boolean
}) {
  const navigate = useNavigate()
  const { socialLogin } = usePrototypeVariants()
  const onComplete = () => navigate(authOnly ? "/welcome" : "/dashboard/home")
  const [step, setStep] = useState<number>(1)
  const [authMethod, setAuthMethod] = useState<"google" | "microsoft" | "email" | null>(null)
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [practiceName, setPracticeName] = useState("")
  const [specialties, setSpecialties] = useState<string[]>([])
  const [practiceSize, setPracticeSize] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const isEmailRoute = authMethod === "email"
  const isMultiStep = variant === "multi-step" && !authOnly
  const contentSteps = authOnly ? 1 : isMultiStep ? 3 : 2
  const totalSteps = isEmailRoute ? contentSteps + 1 : contentSteps

  const handleSocialAuth = (provider: "google" | "microsoft") => {
    setAuthMethod(provider)
    setFullName("Andrea Rodriguez")
    setEmail("andrea@riverdalemedical.com")
    if (authOnly) {
      onComplete()
    } else {
      setStep(2)
    }
  }

  const handleEmailContinue = () => {
    if (email && fullName && password) {
      setAuthMethod("email")
      setStep(2)
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const isLastStep = step === totalSteps && !isEmailRoute
  const ctaLabel = isLastStep ? "Get started" : "Continue"

  const getProgressWidth = () => {
    if (!mounted) return "0%"
    return `${Math.round((step / totalSteps) * 100)}%`
  }

  const renderStep = () => {
    if (step === 1) {
      return (
        <CreateAccountStep
          email={email}
          setEmail={setEmail}
          fullName={fullName}
          setFullName={setFullName}
          password={password}
          setPassword={setPassword}
          onSocialAuth={handleSocialAuth}
          onEmailContinue={handleEmailContinue}
          showSocialLogin={socialLogin}
        />
      )
    }

    if (step === 2 && authOnly) {
      return <VerifyEmailStep email={email} onAction={onComplete} />
    }

    if (step === 2) {
      return (
        <PracticeInfoStep
          practiceName={practiceName}
          setPracticeName={setPracticeName}
          specialties={specialties}
          setSpecialties={setSpecialties}
          practiceSize={practiceSize}
          setPracticeSize={setPracticeSize}
          showSpecialties={!isMultiStep}
          onNext={handleNext}
          buttonLabel={ctaLabel}
        />
      )
    }

    if (isMultiStep && step === 3) {
      return (
        <SpecialtiesStep
          specialties={specialties}
          setSpecialties={setSpecialties}
          onNext={handleNext}
          buttonLabel={ctaLabel}
        />
      )
    }

    return <VerifyEmailStep email={email} onAction={onComplete} />
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
            style={{ width: getProgressWidth() }}
          />
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 basis-1/2 flex flex-col justify-center items-center px-12 py-12 overflow-y-auto">
          {renderStep()}
        </div>
        <div className="flex-1 basis-1/2">
          <RightPanel />
        </div>
      </div>
    </div>
  )
}
