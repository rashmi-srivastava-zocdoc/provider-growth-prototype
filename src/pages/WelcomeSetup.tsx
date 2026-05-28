import { useState } from "react"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import { useNavigate } from "@/lib/router"
import { specialtyGroups } from "@/data/mockData"
import { MultiSelectPopover, type OptionGroup } from "@/components/ui/multi-select-popover"

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
  { value: "1-5", label: "1-5" },
  { value: "6-10", label: "6-10" },
  { value: "11-49", label: "11-49" },
  { value: "50-199", label: "50-199" },
  { value: "200-999", label: "200-999" },
  { value: "1000+", label: "1000+" },
]

function SpecialtyDropdown({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (value: string[]) => void
}) {
  const toggle = (s: string) => onChange(selected.filter((v) => v !== s))

  return (
    <MultiSelectPopover
      values={selected}
      onValuesChange={onChange}
      groups={signupSpecialtyGroups}
      searchPlaceholder="Search specialties..."
      emptyMessage="No specialties match your search."
      selectableGroups
      size="default"
      width="w-[var(--popover-trigger-width)]"
      trigger={
        <button
          type="button"
          className="flex flex-wrap items-center gap-1.5 w-full min-h-[44px] px-3 py-2 rounded-lg border border-input bg-white text-sm text-left outline-none transition-colors cursor-pointer hover:border-muted-foreground/40 data-popup-open:border-foreground data-popup-open:ring-1 data-popup-open:ring-foreground"
        >
          {selected.length === 0 ? (
            <span className="text-muted-foreground/50 flex-1">Select specialties...</span>
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

export function WelcomeSetupModal() {
  const navigate = useNavigate()
  const onComplete = () => navigate("/dashboard/home")
  const [step, setStep] = useState<1 | 2>(1)
  const [practiceName, setPracticeName] = useState("")
  const [specialties, setSpecialties] = useState<string[]>([])
  const [practiceSize, setPracticeSize] = useState<string | null>(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-[520px] bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
        {/* Progress bar */}
        <div className="px-6 pt-5">
          <div className="flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full bg-primary" />
            <div className={`h-1 flex-1 rounded-full ${step === 2 ? "bg-primary" : "bg-muted"}`} />
          </div>
        </div>

        {step === 1 ? (
          <>
            <div className="px-6 pt-8 pb-2">
              <div className="flex items-center justify-center mb-6">
                <div className="size-14 rounded-full bg-[#FEED5A]/30 flex items-center justify-center">
                  <Sparkles className="size-6 text-[#1b2228]" />
                </div>
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-center">
                Welcome to Zocdoc
              </h1>
              <p className="text-sm text-muted-foreground mt-3 text-center leading-relaxed max-w-[380px] mx-auto">
                Your account is ready. Let's get your practice set up so patients can start finding and booking with you.
              </p>
            </div>

            <div className="px-6 pt-4 pb-6 flex justify-center">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 h-11 px-8 rounded-lg bg-[#1b2228] text-white text-sm font-semibold cursor-pointer border-none hover:bg-[#333] transition-colors"
              >
                Get started
                <ArrowRight className="size-4" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="px-6 pt-6 pb-2">
              <h1 className="text-xl font-semibold tracking-tight text-[#1b2228]">
                Tell us about your practice
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                This helps us set up your account and tailor your experience.
              </p>
            </div>

            <div className="px-6 py-5 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Practice name</label>
                <input
                  type="text"
                  value={practiceName}
                  onChange={(e) => setPracticeName(e.target.value)}
                  placeholder="e.g. Riverdale Medical Group"
                  className="w-full h-11 px-3.5 rounded-lg border border-input bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Primary specialties</label>
                <SpecialtyDropdown selected={specialties} onChange={setSpecialties} />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333]">Practice size</label>
                <span className="block text-xs text-muted-foreground mb-3">Number of providers including NPs, PAs, DHs, etc.</span>
                <div className="grid grid-cols-3 gap-2">
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
            </div>

            <div className="flex items-center justify-end border-t border-border/50 px-6 py-4">
              <button
                onClick={onComplete}
                className="flex items-center gap-2 h-10 px-5 rounded-lg bg-[#1b2228] text-white text-sm font-semibold cursor-pointer border-none hover:bg-[#333] transition-colors"
              >
                Continue
                <ArrowRight className="size-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
