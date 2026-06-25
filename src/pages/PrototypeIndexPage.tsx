import { useNavigate, asset } from "@/lib/router"

export function PrototypeIndexPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] flex flex-col">
      <header className="bg-white border-b border-[rgba(47,40,28,0.1)]">
        <div className="max-w-[1200px] mx-auto flex items-center gap-3 px-10 py-5">
          <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="h-8" />
          <span className="text-lg font-bold text-[#1b2228] tracking-tight">
            Provider Growth Prototype
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-10 py-16">
        <div className="flex flex-col items-center gap-10 max-w-[1140px] w-full">
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-[#1b2228]">
              Choose a flow
            </h1>
            <p className="text-base text-[rgba(51,51,51,0.68)]">
              Select which signup experience to preview
            </p>
          </div>

          <div className="flex gap-8 w-full">
            <button
              onClick={() => navigate("/zocdoc")}
              className="flex-1 bg-white border-2 border-[#FEED5A] rounded-2xl p-8 flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-all text-left group relative"
            >
              <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-bold text-[#1b2228] bg-[#FEED5A] rounded-full px-2.5 py-1">
                New
              </span>
              <div className="size-12 rounded-xl bg-[#f8f8f8] flex items-center justify-center group-hover:bg-[#FEED5A] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#333]">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="M9 22V12h6v10" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-[#1b2228]">
                  Full Funnel (Zocdoc.com)
                </h2>
                <p className="text-sm text-[rgba(51,51,51,0.68)] leading-relaxed">
                  End-to-end: Zocdoc.com homepage &rarr; account creation &rarr; email-based practice lookup &rarr; details &rarr; onboarding
                </p>
              </div>
              <span className="text-sm font-semibold text-[#1b2228] underline mt-auto">
                Open &rarr;
              </span>
            </button>

            <button
              onClick={() => navigate("/join")}
              className="flex-1 bg-white border-2 border-[rgba(47,40,28,0.1)] rounded-2xl p-8 flex flex-col gap-4 cursor-pointer hover:border-[#FEED5A] hover:shadow-lg transition-all text-left group"
            >
              <div className="size-12 rounded-xl bg-[#f8f8f8] flex items-center justify-center group-hover:bg-[#FEED5A] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#333]">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-[#1b2228]">
                  Generic Landing Page
                </h2>
                <p className="text-sm text-[rgba(51,51,51,0.68)] leading-relaxed">
                  Default Zocdoc provider signup experience with email capture, product showcase, and pricing
                </p>
              </div>
              <span className="text-sm font-semibold text-[#1b2228] underline mt-auto">
                Open &rarr;
              </span>
            </button>

            <button
              onClick={() => navigate("/wellhive")}
              className="flex-1 bg-white border-2 border-[rgba(47,40,28,0.1)] rounded-2xl p-8 flex flex-col gap-4 cursor-pointer hover:border-[#FEED5A] hover:shadow-lg transition-all text-left group"
            >
              <div className="size-12 rounded-xl bg-[#f8f8f8] flex items-center justify-center group-hover:bg-[#FEED5A] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#333]">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-[#1b2228]">
                  WellHive Landing Page
                </h2>
                <p className="text-sm text-[rgba(51,51,51,0.68)] leading-relaxed">
                  Partner-specific landing page for WellHive with tailored messaging and co-branded experience
                </p>
              </div>
              <span className="text-sm font-semibold text-[#1b2228] underline mt-auto">
                Open &rarr;
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
