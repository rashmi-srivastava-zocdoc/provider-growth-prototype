import { ChevronLeft, ChevronDown } from "lucide-react"
import { useNavigate, asset } from "@/lib/router"

export function CareAccessActivationPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2">
            <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="h-9" />
            <span className="text-lg font-bold text-[#1b2228] tracking-tight">Zocdoc</span>
          </div>
          <nav className="flex items-center gap-8">
            <button className="text-sm font-medium text-[#1b2228] bg-transparent border-none cursor-pointer">Home</button>
            <button className="text-sm font-medium text-[#1b2228] bg-transparent border-none cursor-pointer">Calendar</button>
            <button className="text-sm font-medium text-[#1b2228] bg-transparent border-none cursor-pointer">Inbox</button>
            <button className="flex items-center gap-1 text-sm font-medium text-[#1b2228] bg-transparent border-none cursor-pointer">
              Performance
              <ChevronDown className="size-3.5" />
            </button>
            <button className="text-sm font-medium text-[#1b2228] bg-transparent border-none cursor-pointer">Providers</button>
            <button className="text-sm font-medium text-[#1b2228] bg-transparent border-none cursor-pointer">Sponsored</button>
          </nav>
          <button className="flex items-center gap-1 text-sm font-medium text-[rgba(51,51,51,0.6)] bg-transparent border-none cursor-pointer">
            Internal user
            <ChevronDown className="size-3.5" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-8 py-8">
        <button
          onClick={() => navigate("/dashboard/provider-growth-home?source=wellhive")}
          className="flex items-center gap-1 text-sm font-medium text-[#1b2228] bg-transparent border-none cursor-pointer mb-10"
        >
          <ChevronLeft className="size-4" />
          Back to Home
        </button>

        <div className="flex gap-16 items-start">
          {/* Left — Inbox preview card */}
          <div className="flex-1 bg-[rgba(47,40,28,0.03)] rounded-xl p-10 flex items-center justify-center min-h-[400px]">
            <div className="bg-white rounded-xl shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-6 w-[340px]">
              <h3 className="text-xl font-semibold text-[#1b2228] mb-1">Inbox</h3>
              <p className="text-sm text-[rgba(51,51,51,0.5)] mb-5">
                Easily confirm incoming bookings and view patient details
              </p>
              <div className="flex flex-col divide-y divide-[rgba(47,40,28,0.08)]">
                {[
                  { name: "Melanie Wilkerson", type: "Annual physical" },
                  { name: "Liam James", type: "Annual physical" },
                  { name: "Jennifer Smith", type: "Annual physical" },
                ].map((booking) => (
                  <div key={booking.name} className="flex items-center gap-4 py-3">
                    <span className="text-xs font-medium text-white bg-[#4ead7a] rounded px-2 py-0.5 shrink-0">
                      New booking
                    </span>
                    <span className="text-sm font-medium text-[#1b2228] flex-1">{booking.name}</span>
                    <span className="text-sm text-[rgba(51,51,51,0.45)]">{booking.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — description */}
          <div className="flex-1 flex flex-col gap-5 pt-8">
            <h1 className="text-[28px] font-semibold text-[#1b2228] leading-[36px]">
              Start receiving bookings from the partner network
            </h1>
            <p className="text-base text-[rgba(51,51,51,0.6)] leading-[26px]">
              You'll be able to manage your bookings and view patient details in Inbox
            </p>
            <div className="rounded-lg border-l-4 border-l-[rgba(47,40,28,0.15)] bg-[rgba(47,40,28,0.03)] px-5 py-4">
              <p className="text-sm text-[rgba(51,51,51,0.6)] leading-relaxed">
                Any providers that are pending approval won't receive bookings until they're approved. You can view all of your providers' statuses on the{" "}
                <button
                  onClick={() => navigate("/dashboard/providers")}
                  className="font-semibold text-[#1b2228] underline bg-transparent border-none cursor-pointer text-sm p-0"
                >
                  Providers page
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,0,0,0.06)] px-8 py-4 flex items-center justify-between">
        <button className="text-sm font-medium text-[#2563eb] bg-transparent border-none cursor-pointer">
          Need help?
        </button>
        <p className="text-sm text-[rgba(51,51,51,0.35)]">&copy; 2026 Zocdoc, Inc.</p>
        <button
          onClick={() => navigate("/dashboard/provider-growth-home?source=wellhive")}
          className="h-11 px-8 bg-[#FEED5A] rounded text-sm font-semibold text-[#1b2228] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
        >
          Activate
        </button>
      </footer>
    </div>
  )
}
