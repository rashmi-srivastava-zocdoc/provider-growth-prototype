import { useNavigate, asset } from "@/lib/router"
import { ChevronDown } from "lucide-react"

export function WellHiveLandingPage() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-full overflow-y-auto bg-white">
      {/* Header — matches zocdoc.com/providers */}
      <header className="bg-white border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-[60px] py-4">
          <div className="flex items-center gap-2">
            <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="h-10" />
            <span className="text-xl text-[#1b2228]">
              <span className="font-bold">Zocdoc</span>
              {" "}
              <span className="font-normal">for Providers</span>
            </span>
          </div>
          <nav className="flex items-center gap-8">
            <button className="flex items-center gap-1 text-[15px] font-medium text-[#1b2228] bg-transparent border-none cursor-pointer">
              Products
              <ChevronDown className="size-4" />
            </button>
            <button className="flex items-center gap-1 text-[15px] font-medium text-[#1b2228] bg-transparent border-none cursor-pointer">
              Learn
              <ChevronDown className="size-4" />
            </button>
            <button className="text-[15px] font-medium text-[#1b2228] bg-transparent border-none cursor-pointer">
              Find care
            </button>
          </nav>
          <div className="flex items-center gap-6">
            <button className="text-[15px] font-medium text-[#1b2228] bg-transparent border-none cursor-pointer">
              Log in
            </button>
            <button
              onClick={() => navigate("/signup/combined")}
              className="h-10 px-5 bg-[#FEED5A] rounded text-[15px] font-semibold text-[#1b2228] cursor-pointer border border-[#1b2228] hover:bg-[#fde84a] transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section — light gray bg, text left, illustration right */}
      <section className="bg-[#f5f5f5]">
        <div className="max-w-[1440px] mx-auto flex items-center px-[60px] py-16 min-h-[500px]">
          <div className="flex flex-col gap-5 max-w-[500px] shrink-0">
            <h1 className="text-[42px] font-normal text-[#1b2228] leading-[52px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Join WellHive's preferred scheduling platform for free
            </h1>
            <p className="text-base text-[rgba(51,51,51,0.75)] leading-[26px]">
              Zocdoc lets WellHive book with you online, saving you and WellHive valuable time
            </p>
            <button
              onClick={() => navigate("/signup/combined")}
              className="self-start h-11 px-6 bg-[#FEED5A] rounded text-[15px] font-semibold text-[#1b2228] cursor-pointer border border-[#1b2228] hover:bg-[#fde84a] transition-colors mt-1"
            >
              Sign up
            </button>
          </div>

          <div className="flex-1 flex justify-end">
            <img src={asset("/landing-page/hero.svg")} alt="" className="w-[550px] h-auto" />
          </div>
        </div>
      </section>

      {/* Benefits Section — white bg */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[60px] py-16">
          <div className="flex items-start gap-16">
            <h2 className="text-[36px] font-normal text-[#1b2228] leading-[44px] max-w-[340px] shrink-0" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Benefits of joining Zocdoc's partner network
            </h2>

            <div className="grid grid-cols-2 gap-x-12 gap-y-10 flex-1">
              <div className="flex flex-col gap-2">
                <div className="size-12 mb-1">
                  <svg viewBox="0 0 48 48" fill="none" className="size-12">
                    <rect x="6" y="10" width="36" height="28" rx="3" stroke="#1b2228" strokeWidth="2" fill="none" />
                    <path d="M6 18h36" stroke="#1b2228" strokeWidth="2" />
                    <path d="M16 6v8M32 6v8" stroke="#1b2228" strokeWidth="2" strokeLinecap="round" />
                    <path d="M20 26l4 4 6-8" stroke="#E8A838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-[#1b2228]">
                  Streamline scheduling
                </h3>
                <p className="text-sm text-[rgba(51,51,51,0.68)] leading-[22px]">
                  Eliminate phone calls and waiting for callbacks. Patients book directly into your calendar, 24/7.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="size-12 mb-1">
                  <svg viewBox="0 0 48 48" fill="none" className="size-12">
                    <rect x="10" y="4" width="28" height="40" rx="3" stroke="#1b2228" strokeWidth="2" fill="none" />
                    <path d="M16 14h16M16 20h16M16 26h10" stroke="#1b2228" strokeWidth="2" strokeLinecap="round" />
                    <path d="M32 28l4 4 -4 4" stroke="#E8A838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-[#1b2228]">
                  Get essential information quickly
                </h3>
                <p className="text-sm text-[rgba(51,51,51,0.68)] leading-[22px]">
                  Receive authorization numbers, insurance details, and patient information before the appointment.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="size-12 mb-1">
                  <svg viewBox="0 0 48 48" fill="none" className="size-12">
                    <circle cx="24" cy="24" r="18" stroke="#1b2228" strokeWidth="2" fill="none" />
                    <path d="M24 12v12l8 6" stroke="#1b2228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="24" cy="24" r="2" fill="#E8A838" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-[#1b2228]">
                  Reduce no-shows
                </h3>
                <p className="text-sm text-[rgba(51,51,51,0.68)] leading-[22px]">
                  Automated reminders and easy rescheduling keep patients on track and your schedule full.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="size-12 mb-1">
                  <svg viewBox="0 0 48 48" fill="none" className="size-12">
                    <path d="M24 4l-18 14v22h36V18L24 4z" stroke="#1b2228" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <rect x="18" y="26" width="12" height="14" stroke="#1b2228" strokeWidth="2" fill="none" />
                    <circle cx="24" cy="20" r="4" stroke="#E8A838" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-[#1b2228]">
                  No cost to you
                </h3>
                <p className="text-sm text-[rgba(51,51,51,0.68)] leading-[22px]">
                  WellHive partner practices join Zocdoc at no charge. Start receiving bookings without any fees.
                </p>
              </div>
            </div>
          </div>
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
