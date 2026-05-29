import { useNavigate, asset } from "@/lib/router"
import { ChevronDown, CalendarCheck, ClipboardList, Clock, Shield } from "lucide-react"

export function WellHiveLandingPage() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-full overflow-y-auto bg-white">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-[60px] py-5">
          <div className="flex items-center gap-3">
            <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="h-10" />
            <span className="text-xl font-bold text-[#1b2228] tracking-tight">
              Zocdoc
            </span>
            <span className="text-base text-[rgba(51,51,51,0.68)] ml-1">
              for Providers
            </span>
          </div>
          <nav className="flex items-center gap-10">
            <button className="flex items-center gap-1.5 text-base font-semibold text-[#1b2228] bg-transparent border-none cursor-pointer">
              Products
              <ChevronDown className="size-4" />
            </button>
            <button className="flex items-center gap-1.5 text-base font-semibold text-[#1b2228] bg-transparent border-none cursor-pointer">
              Learn
              <ChevronDown className="size-4" />
            </button>
            <button className="text-base font-semibold text-[#1b2228] bg-transparent border-none cursor-pointer">
              Find care
            </button>
          </nav>
          <div className="flex items-center gap-6">
            <button className="text-base font-semibold text-[#1b2228] bg-transparent border-none cursor-pointer">
              Log in
            </button>
            <button
              onClick={() => navigate("/signup/combined")}
              className="h-12 px-6 bg-[#FEED5A] rounded text-base font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="h-[3px] bg-[#FEED5A]" />
      </header>

      {/* Hero Section */}
      <section className="bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-[60px] py-16 gap-12">
          <div className="flex flex-col gap-6 max-w-[550px]">
            <h1 className="text-[48px] font-semibold text-[#1b2228] leading-[56px]">
              Join WellHive's preferred scheduling platform for free
            </h1>
            <p className="text-lg text-[rgba(51,51,51,0.80)] leading-[30px]">
              Zocdoc lets WellHive connect patients with your practice online, saving you and your patients valuable time
            </p>
            <button
              onClick={() => navigate("/signup/combined")}
              className="self-start h-14 px-8 bg-[#FEED5A] rounded text-base font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors mt-2"
            >
              Sign up
            </button>
          </div>

          {/* Hero illustration */}
          <div className="shrink-0 w-[500px] h-[400px] flex items-center justify-center">
            <svg viewBox="0 0 500 400" fill="none" className="w-full h-full">
              {/* Left laptop */}
              <rect x="30" y="180" width="180" height="120" rx="8" fill="#1b2228" />
              <rect x="40" y="188" width="160" height="95" rx="4" fill="#333" />
              <rect x="0" y="300" width="240" height="8" rx="4" fill="#1b2228" />

              {/* Right laptop */}
              <rect x="290" y="180" width="180" height="120" rx="8" fill="#1b2228" />
              <rect x="300" y="188" width="160" height="95" rx="4" fill="#333" />
              <rect x="260" y="300" width="240" height="8" rx="4" fill="#1b2228" />

              {/* Left person */}
              <circle cx="150" cy="120" r="30" fill="#e8d5c4" />
              <path d="M130 90 Q150 70 170 90" fill="#1b2228" />
              <rect x="125" y="148" width="50" height="60" rx="6" fill="white" stroke="#e0e0e0" strokeWidth="1" />
              {/* Left arm reaching right */}
              <path d="M175 170 Q220 160 250 190" stroke="#e8d5c4" strokeWidth="12" strokeLinecap="round" fill="none" />

              {/* Right person */}
              <circle cx="350" cy="120" r="30" fill="#d4c4b0" />
              <path d="M330 85 Q350 65 370 85 Q375 100 365 95 Q350 80 335 95 Q325 100 330 85" fill="#333" />
              <rect x="325" y="148" width="50" height="60" rx="6" fill="white" stroke="#e0e0e0" strokeWidth="1" />
              {/* Right arm reaching left */}
              <path d="M325 170 Q280 160 250 190" stroke="#d4c4b0" strokeWidth="12" strokeLinecap="round" fill="none" />

              {/* Handshake */}
              <circle cx="250" cy="190" r="15" fill="#FEED5A" opacity="0.3" />

              {/* Connection sparks */}
              <line x1="235" y1="165" x2="230" y2="155" stroke="#FEED5A" strokeWidth="2" strokeLinecap="round" />
              <line x1="250" y1="160" x2="250" y2="148" stroke="#FEED5A" strokeWidth="2" strokeLinecap="round" />
              <line x1="265" y1="165" x2="270" y2="155" stroke="#FEED5A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[60px] py-16">
          <div className="flex items-start gap-16">
            <h2 className="text-[40px] font-semibold text-[#1b2228] leading-[48px] max-w-[380px] shrink-0">
              Benefits of joining Zocdoc's partner network
            </h2>

            <div className="grid grid-cols-2 gap-x-12 gap-y-10 flex-1">
              <div className="flex flex-col gap-3">
                <div className="size-12 rounded-lg bg-[#FFF8E1] flex items-center justify-center">
                  <CalendarCheck className="size-6 text-[#333]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1b2228]">
                  Streamline scheduling
                </h3>
                <p className="text-base text-[rgba(51,51,51,0.68)] leading-[26px]">
                  Eliminate phone calls and waiting for callbacks. Patients book directly into your calendar, 24/7.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="size-12 rounded-lg bg-[#FFF8E1] flex items-center justify-center">
                  <ClipboardList className="size-6 text-[#333]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1b2228]">
                  Get essential information quickly
                </h3>
                <p className="text-base text-[rgba(51,51,51,0.68)] leading-[26px]">
                  Receive authorization numbers, insurance details, and patient information before the appointment.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="size-12 rounded-lg bg-[#FFF8E1] flex items-center justify-center">
                  <Clock className="size-6 text-[#333]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1b2228]">
                  Reduce no-shows
                </h3>
                <p className="text-base text-[rgba(51,51,51,0.68)] leading-[26px]">
                  Automated reminders and easy rescheduling keep patients on track and your schedule full.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="size-12 rounded-lg bg-[#FFF8E1] flex items-center justify-center">
                  <Shield className="size-6 text-[#333]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1b2228]">
                  No cost to you
                </h3>
                <p className="text-base text-[rgba(51,51,51,0.68)] leading-[26px]">
                  WellHive partner practices join Zocdoc at no charge. Start receiving bookings without any fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto px-[60px] py-16">
          <h2 className="text-[36px] font-semibold text-[#1b2228] leading-[44px] text-center mb-12">
            How it works
          </h2>
          <div className="flex gap-8 max-w-[900px] mx-auto">
            {[
              { num: 1, title: "Sign up", desc: "Create your free Zocdoc account as a WellHive partner practice" },
              { num: 2, title: "Set your availability", desc: "Connect your calendar and configure your appointment preferences" },
              { num: 3, title: "Start receiving bookings", desc: "WellHive patients can find and book with you online immediately" },
            ].map((step) => (
              <div key={step.num} className="flex-1 flex flex-col gap-4">
                <div className="size-11 rounded-full bg-[#FEED5A] flex items-center justify-center text-lg font-semibold text-[#333]">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-[#1b2228]">{step.title}</h3>
                <p className="text-base text-[rgba(51,51,51,0.68)] leading-[26px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1b2228]">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-6 px-[60px] py-20">
          <h2 className="text-[36px] font-semibold text-white leading-[44px] text-center">
            Ready to join the WellHive network?
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.7)] leading-[26px] text-center max-w-[500px]">
            Sign up today and start receiving bookings from WellHive patients — completely free.
          </p>
          <button
            onClick={() => navigate("/signup/combined")}
            className="h-14 px-8 bg-[#FEED5A] rounded text-base font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors mt-2"
          >
            Sign up for free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1b2228] border-t border-[rgba(255,255,255,0.1)]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-[60px] py-10">
          <div className="flex items-center gap-2">
            <img
              src={asset("/logo/zee_rgb.svg")}
              alt="Zocdoc"
              className="h-8 brightness-0 invert"
            />
            <span className="text-lg font-bold text-white tracking-tight">
              Zocdoc
            </span>
          </div>
          <p className="text-sm text-[rgba(255,255,255,0.5)]">
            &copy; 2026 Zocdoc, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
