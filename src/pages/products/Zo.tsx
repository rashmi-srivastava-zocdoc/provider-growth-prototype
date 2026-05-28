import { Phone, PhoneIncoming, PhoneOff, Clock, Calendar, Bot, TrendingUp, Settings2 } from "lucide-react"
import { useNavigate } from "@/lib/router"

function StatCard({ label, value, sub, icon }: { label: string; value: string; sub?: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-muted-foreground/60">{icon}</span>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export function ZoPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      {/* Hero banner */}
      <div className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white flex items-center justify-between">
        <div className="flex flex-col gap-2 max-w-lg">
          <div className="flex items-center gap-2">
            <Bot className="size-5" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">Zo Phone Assistant</span>
          </div>
          <h2 className="text-2xl font-semibold">Your AI-powered phone line</h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Zo answers calls, routes patients, books and reschedules appointments, and handles common questions — 24/7. Save operational time and never miss a call.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => navigate("/dashboard/products/zo/performance")}
              className="h-9 px-4 bg-white text-violet-700 rounded-md text-sm font-medium cursor-pointer border-none hover:bg-white/90 transition-colors"
            >
              View performance
            </button>
            <button
              onClick={() => navigate("/dashboard/products/zo/settings")}
              className="h-9 px-4 bg-white/15 text-white rounded-md text-sm font-medium cursor-pointer border border-white/20 hover:bg-white/25 transition-colors"
            >
              Settings
            </button>
          </div>
        </div>
        <div className="size-24 rounded-full bg-white/10 flex items-center justify-center shrink-0">
          <Phone className="size-10 text-white/80" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Calls handled today" value="47" sub="+12% vs last week" icon={<PhoneIncoming className="size-4" />} />
        <StatCard label="Appointments booked" value="18" sub="via Zo this week" icon={<Calendar className="size-4" />} />
        <StatCard label="Avg. handle time" value="1m 42s" sub="down from 2m 10s" icon={<Clock className="size-4" />} />
        <StatCard label="Missed calls" value="2" sub="99.2% answer rate" icon={<PhoneOff className="size-4" />} />
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border bg-card">
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="font-semibold">Recent calls</h3>
          <button className="text-sm text-primary font-medium cursor-pointer bg-transparent border-none">View all</button>
        </div>
        <div className="divide-y">
          {[
            { caller: "Patient — New", action: "Booked appointment", time: "2 min ago", provider: "Dr. Sarah Chen", type: "New patient visit" },
            { caller: "Patient — Returning", action: "Rescheduled", time: "8 min ago", provider: "Dr. James Liu", type: "Follow-up" },
            { caller: "Patient — Returning", action: "Answered FAQ", time: "15 min ago", provider: "—", type: "Insurance question" },
            { caller: "Patient — New", action: "Booked appointment", time: "22 min ago", provider: "Dr. Maria Santos", type: "Annual physical" },
            { caller: "Unknown", action: "Routed to front desk", time: "31 min ago", provider: "—", type: "Complex request" },
          ].map((call, i) => (
            <div key={i} className="px-5 py-3.5 flex items-center gap-4 text-sm">
              <div className="size-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                <Phone className="size-3.5 text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{call.caller}</p>
                <p className="text-muted-foreground text-xs">{call.type}</p>
              </div>
              <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">{call.action}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap w-20 text-right">{call.time}</span>
              {call.provider !== "—" && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">{call.provider}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
