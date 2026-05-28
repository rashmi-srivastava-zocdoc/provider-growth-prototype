import { ArrowRight } from "lucide-react"
import { useNavigate } from "@/lib/router"

const providerAvatars = [
  { initials: "SC", color: "#0d9488" },
  { initials: "MW", color: "#6366f1" },
  { initials: "AP", color: "#16a34a" },
  { initials: "JT", color: "#dc2626" },
  { initials: "ER", color: "#ea580c" },
]

const channelLogos = [
  "Google", "Yelp", "Facebook", "Vitals", "Wellness",
  "WebMD", "Amazon", "Solv", "Apple", "Bing",
]

export function ActivationPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side */}
      <div className="flex-1 flex flex-col justify-start px-16 py-12 max-w-[720px] overflow-y-auto">
        <h1 className="text-3xl font-bold text-[#1b2228] leading-tight mb-3">
          Make it easier for patients to book with your practice on Google
        </h1>
        <p className="text-base text-[rgba(51,51,51,0.7)] mb-6">
          You're almost there! Here's what will happen once you activate your practice:
        </p>

        {/* Info banner */}
        <div className="rounded-lg border-l-4 border-l-[rgba(47,40,28,0.2)] bg-[rgba(47,40,28,0.03)] px-5 py-4 mb-8">
          <p className="text-sm text-[rgba(51,51,51,0.7)] leading-relaxed">
            You have providers that are pending approval, or need to provide additional information. By clicking 'Confirm' below, you agree to activate these providers once they're approved. View all of your providers' statuses on the{" "}
            <button className="font-semibold text-[#1b2228] underline bg-transparent border-none cursor-pointer text-sm p-0">
              Providers page
            </button>
          </p>
        </div>

        {/* Google search mockup + description */}
        <div className="flex gap-8 mb-8">
          {/* Google card mockup */}
          <div className="w-[280px] flex-shrink-0 rounded-lg border border-[rgba(47,40,28,0.1)] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium" style={{ color: "#4285F4" }}>G</span>
              <span className="text-sm font-medium" style={{ color: "#EA4335" }}>o</span>
              <span className="text-sm font-medium" style={{ color: "#FBBC05" }}>o</span>
              <span className="text-sm font-medium" style={{ color: "#4285F4" }}>g</span>
              <span className="text-sm font-medium" style={{ color: "#34A853" }}>l</span>
              <span className="text-sm font-medium" style={{ color: "#EA4335" }}>e</span>
              <div className="flex-1 ml-2 rounded-full border border-[rgba(47,40,28,0.1)] px-3 py-1 text-xs text-[rgba(51,51,51,0.4)]">
                Primary care doctor near me
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-2.5 rounded bg-[rgba(47,40,28,0.06)] w-3/4" />
              <div className="h-2.5 rounded bg-[rgba(47,40,28,0.06)] w-full" />
              <div className="h-2.5 rounded bg-[rgba(47,40,28,0.06)] w-2/3" />
            </div>
            <div className="rounded-lg border border-[rgba(47,40,28,0.08)] p-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-full bg-[rgba(47,40,28,0.08)] flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#1b2228]">Dr. Eva Brooks, MD</p>
                  <p className="text-xs text-[rgba(51,51,51,0.5)]">Primary Care Doctor</p>
                  <p className="text-xs text-[rgba(51,51,51,0.5)]">New York City, NY</p>
                </div>
              </div>
              <p className="text-xs text-[#f59e0b] mb-2">4.98 ★</p>
              <div className="rounded-md bg-[#4285F4] text-white text-xs font-medium text-center py-2 mb-3">
                Book Online
              </div>
              <div className="space-y-1.5 text-xs text-[rgba(51,51,51,0.6)]">
                <p><span className="font-medium text-[#1b2228]">Address:</span> 568 Broadway, New York, NY</p>
                <p><span className="font-medium text-[#1b2228]">Hours:</span> <span className="text-[#16a34a]">Open</span> - Closes 6:30 PM</p>
                <p><span className="font-medium text-[#1b2228]">Phone:</span> (866) 962-3621</p>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-2.5 rounded bg-[rgba(47,40,28,0.06)] w-full" />
              <div className="h-2.5 rounded bg-[rgba(47,40,28,0.06)] w-4/5" />
            </div>
          </div>

          {/* Description */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#1b2228] leading-snug mb-4">
              We'll connect your availability to your business profile on the top search engines
            </h3>
            <p className="text-sm text-[rgba(51,51,51,0.6)] leading-relaxed mb-4">
              This will help you fill openings in your calendar by making it easy for patients to book directly from Google and other search engines, 24/7.
            </p>
            <p className="text-sm text-[rgba(51,51,51,0.6)] leading-relaxed mb-4">
              All bookings made through your Google Business Profile are <span className="font-bold text-[#1b2228]">free</span>. It may take our partners 2–5 business days to show your availability.
            </p>
            <button className="font-semibold text-[#1b2228] underline bg-transparent border-none cursor-pointer text-sm p-0">
              Learn more about Book from Google
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => navigate("/upsell?live")}
            className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-[#1b2228] text-sm font-semibold text-white cursor-pointer border-none hover:bg-[#2d3740] transition-colors"
          >
            Confirm
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 bg-[rgba(47,40,28,0.02)] flex flex-col items-center justify-center px-12">
        {/* Provider avatars */}
        <div className="flex items-center mb-8">
          {providerAvatars.map((p) => (
            <div
              key={p.initials}
              className="size-12 rounded-full flex items-center justify-center text-white text-sm font-semibold -ml-2 first:ml-0 border-2 border-white"
              style={{ backgroundColor: p.color }}
            >
              {p.initials}
            </div>
          ))}
          <div className="size-12 rounded-full flex items-center justify-center text-xs font-medium text-[rgba(51,51,51,0.5)] bg-[rgba(47,40,28,0.06)] -ml-2 border-2 border-white">
            +11
          </div>
        </div>

        {/* Channel logos */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4 max-w-[400px]">
          {channelLogos.map((name) => (
            <div
              key={name}
              className="size-11 rounded-full bg-white border border-[rgba(47,40,28,0.08)] flex items-center justify-center"
            >
              <span className="text-[10px] font-medium text-[rgba(51,51,51,0.4)]">{name.slice(0, 2)}</span>
            </div>
          ))}
          <div className="size-11 rounded-full bg-white border border-[rgba(47,40,28,0.08)] flex items-center justify-center">
            <span className="text-[10px] font-medium text-[rgba(51,51,51,0.4)]">+18</span>
          </div>
        </div>

        <p className="text-sm font-semibold text-[#16a34a] mb-1">Distributed across 30+ channels</p>
        <p className="text-xs text-[rgba(51,51,51,0.5)] text-center max-w-[320px]">
          Each channel reviews and approves providers based on their own criteria. Most go live within 24–48 hours.
        </p>
      </div>
    </div>
  )
}
