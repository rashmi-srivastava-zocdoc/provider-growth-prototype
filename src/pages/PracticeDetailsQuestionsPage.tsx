import { useState, useEffect } from "react"
import { ArrowRight, Globe, Phone, MapPin, Check } from "lucide-react"
import { useNavigate, asset } from "@/lib/router"
import { enrichFromEmail } from "@/data/enrichment"

// Step 4 of the funnel: a few remaining questions we couldn't infer from the
// email — website, phone, address, and goals — before handing off to onboarding.

const goalOptions = [
  "Get found by new patients",
  "Let patients book online",
  "Manage my online reputation",
  "Reduce no-shows",
  "Fill last-minute openings",
  "Move off phone-only scheduling",
]

export function PracticeDetailsQuestionsPage() {
  const navigate = useNavigate()
  const params = new URLSearchParams(window.location.search)
  const email = params.get("email") || ""
  const orgName = params.get("org") || "your practice"

  const [website, setWebsite] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [goals, setGoals] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    // Pre-fill anything else we found from the email lookup.
    const enriched = enrichFromEmail(email)
    if (enriched.website) setWebsite(enriched.website)
    if (enriched.phone) setPhone(enriched.phone)
    return () => cancelAnimationFrame(t)
  }, [email])

  const toggleGoal = (g: string) =>
    setGoals((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]))

  const finish = () => navigate("/dashboard/provider-growth-home")

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <header className="shrink-0 bg-white z-10">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2">
            <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="h-7" />
            <span className="text-lg font-bold text-[#1b2228] tracking-tight">Zocdoc</span>
          </div>
          <span className="text-sm text-[rgba(51,51,51,0.5)]">Step 3 of 3</span>
        </div>
        <div className="h-1 bg-[rgba(47,40,28,0.08)]">
          <div
            className="h-full bg-[#1b2228] rounded-r-full transition-all duration-700 ease-out"
            style={{ width: mounted ? "100%" : "66%" }}
          />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[460px]">
          <div className="mb-7">
            <h1 className="text-2xl font-semibold text-[#1b2228]">A few last details</h1>
            <p className="text-sm text-[rgba(51,51,51,0.6)] mt-1">
              Just a couple more things to finish setting up {orgName}.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">Practice website</label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[rgba(51,51,51,0.4)]" />
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="www.yourpractice.com"
                  className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
                />
              </div>
              <p className="text-xs text-[rgba(51,51,51,0.45)] mt-1.5">
                We'll use this to match your branding and import practice photos.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">Primary location</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[rgba(51,51,51,0.4)]" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, City, State, ZIP"
                  className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">Practice phone</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[rgba(51,51,51,0.4)]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 555-5555"
                  className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333] mb-2.5">What brings you to Zocdoc?</label>
              <div className="flex flex-wrap gap-2">
                {goalOptions.map((g) => {
                  const selected = goals.includes(g)
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGoal(g)}
                      className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                        selected
                          ? "bg-[#1b2228] text-white border-none"
                          : "bg-white text-[#333] border border-[rgba(47,40,28,0.2)] hover:border-[rgba(47,40,28,0.4)]"
                      }`}
                    >
                      {selected && <Check className="size-3.5" />}
                      {g}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={finish}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[#FEED5A] text-sm font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
            >
              Finish setup
              <ArrowRight className="size-4" />
            </button>
            <button
              onClick={finish}
              className="block mx-auto mt-3 text-sm text-[rgba(51,51,51,0.6)] underline bg-transparent border-none cursor-pointer hover:text-[#1b2228]"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
