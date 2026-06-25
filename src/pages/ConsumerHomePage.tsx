import { Search, MapPin, Calendar, Shield, ArrowRight, Star } from "lucide-react"
import { useNavigate, asset } from "@/lib/router"

// Consumer-facing Zocdoc.com homepage — the true entry point of the funnel.
// A patient lands here; a provider arrives via the "List your practice" CTA,
// which kicks off account creation.

function SearchField({
  icon,
  label,
  placeholder,
  border = true,
}: {
  icon: React.ReactNode
  label: string
  placeholder: string
  border?: boolean
}) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 flex-1 min-w-0 ${border ? "md:border-r border-[rgba(47,40,28,0.12)]" : ""}`}>
      <span className="text-[#1b2228] shrink-0">{icon}</span>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-[11px] uppercase tracking-wide text-[rgba(51,51,51,0.45)] font-semibold">{label}</p>
        <p className="text-sm text-[rgba(51,51,51,0.55)] truncate">{placeholder}</p>
      </div>
    </div>
  )
}

export function ConsumerHomePage() {
  const navigate = useNavigate()
  const goToProviderSignup = () => navigate("/signup/account")

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Top nav */}
      <header className="border-b border-[rgba(47,40,28,0.08)]">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="h-7" />
            <span className="text-lg font-bold text-[#1b2228] tracking-tight">Zocdoc</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <button
              onClick={goToProviderSignup}
              className="hidden sm:inline text-[rgba(51,51,51,0.7)] hover:text-[#1b2228] bg-transparent border-none cursor-pointer font-medium"
            >
              Are you a top doctor? List your practice
            </button>
            <button className="text-[#1b2228] font-medium bg-transparent border-none cursor-pointer hover:underline">
              Log in
            </button>
            <button className="h-9 px-4 rounded-full bg-[#1b2228] text-white text-sm font-semibold border-none cursor-pointer hover:bg-[#333] transition-colors">
              Sign up
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#fafaf9]">
        <div className="max-w-[1180px] mx-auto px-6 pt-16 pb-20">
          <div className="max-w-[620px]">
            <h1 className="text-[44px] leading-[1.08] font-bold text-[#1b2228] tracking-tight">
              Find the right doctor,<br />right now
            </h1>
            <p className="text-lg text-[rgba(51,51,51,0.65)] mt-4">
              Book appointments with top-rated doctors and specialists near you — and read real reviews from verified patients.
            </p>
          </div>

          {/* Search widget */}
          <div className="mt-8 max-w-[920px]">
            <div className="flex flex-col md:flex-row items-stretch bg-white rounded-2xl border border-[rgba(47,40,28,0.12)] shadow-sm overflow-hidden">
              <SearchField
                icon={<Search className="size-5" />}
                label="Condition, procedure, doctor"
                placeholder="e.g. Primary care, Dermatologist"
              />
              <SearchField
                icon={<Shield className="size-5" />}
                label="Insurance"
                placeholder="Choose insurance"
              />
              <SearchField
                icon={<MapPin className="size-5" />}
                label="Location"
                placeholder="New York, NY"
              />
              <SearchField
                icon={<Calendar className="size-5" />}
                label="Date"
                placeholder="Any time"
                border={false}
              />
              <div className="p-2 flex items-center">
                <button className="w-full md:w-auto h-12 px-7 rounded-xl bg-[#1b2228] text-white text-sm font-semibold border-none cursor-pointer hover:bg-[#333] transition-colors flex items-center justify-center gap-2">
                  <Search className="size-4" />
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-sm text-[rgba(51,51,51,0.6)]">
              <span className="font-medium text-[rgba(51,51,51,0.5)]">Popular:</span>
              {["Primary Care", "Dentist", "Dermatologist", "OB-GYN", "Psychiatrist"].map((s) => (
                <button key={s} className="hover:text-[#1b2228] underline-offset-2 hover:underline bg-transparent border-none cursor-pointer p-0">
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-10 text-sm text-[rgba(51,51,51,0.6)]">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-[#FEED5A] text-[#FEED5A]" />
              ))}
            </div>
            Trusted by millions of patients to book care every year
          </div>
        </div>
      </section>

      {/* Provider entry point — this is the funnel's front door for providers */}
      <section className="bg-[#1b2228]">
        <div className="max-w-[1180px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-[640px]">
            <p className="text-xs uppercase tracking-wider font-semibold text-[#FEED5A]">For healthcare providers</p>
            <h2 className="text-2xl md:text-[28px] font-bold text-white mt-2 leading-tight">
              Are you a top doctor? Grow your practice with Zocdoc.
            </h2>
            <p className="text-[rgba(255,255,255,0.7)] mt-2">
              Reach new patients, fill your calendar, and manage your online presence — all from one place. Get set up in minutes.
            </p>
          </div>
          <button
            onClick={goToProviderSignup}
            className="shrink-0 flex items-center gap-2 h-12 px-7 rounded-full bg-[#FEED5A] text-[#1b2228] text-base font-semibold border-none cursor-pointer hover:bg-[#fde84a] transition-colors"
          >
            List your practice
            <ArrowRight className="size-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(47,40,28,0.08)] mt-auto">
        <div className="max-w-[1180px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[rgba(51,51,51,0.5)]">
          <span>© Zocdoc — prototype</span>
          <div className="flex items-center gap-6">
            <button className="bg-transparent border-none cursor-pointer text-[rgba(51,51,51,0.5)] hover:text-[#1b2228]">Privacy</button>
            <button className="bg-transparent border-none cursor-pointer text-[rgba(51,51,51,0.5)] hover:text-[#1b2228]">Terms</button>
            <button
              onClick={goToProviderSignup}
              className="bg-transparent border-none cursor-pointer text-[#1b2228] font-medium hover:underline"
            >
              List your practice
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
