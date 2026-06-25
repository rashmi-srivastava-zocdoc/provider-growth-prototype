import { useState, useEffect, useMemo } from "react"
import { Check, X } from "lucide-react"
import { useNavigate, asset } from "@/lib/router"

// Step 2 of the funnel: account creation only. We collect just enough to make
// an account, then use the email to look up the provider's practice on the
// next screen.

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

const passwordRules = [
  { key: "length", label: "8+ characters", test: (p: string) => p.length >= 8 },
  { key: "letters", label: "Letters", test: (p: string) => /[a-zA-Z]/.test(p) },
  { key: "numbers", label: "Numbers", test: (p: string) => /\d/.test(p) },
  { key: "special", label: "Special character", test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
]

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

export function AccountCreationPage() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mounted, setMounted] = useState(false)

  const ruleResults = useMemo(
    () => passwordRules.map((r) => ({ ...r, passed: r.test(password) })),
    [password],
  )

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const proceed = (withEmail: string) => {
    navigate(`/onboarding/confirm-practice?email=${encodeURIComponent(withEmail)}`)
  }

  const handleSocial = () => {
    // Social auth resolves to a known demo account so the lookup lands a match.
    proceed("andrea@riverdalemedical.com")
  }

  const canSubmit = fullName.trim() && email.includes("@") && password.length >= 8

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      <header className="shrink-0 bg-white z-10">
        <div className="flex items-center justify-between px-8 py-4">
          <button
            onClick={() => navigate("/zocdoc")}
            className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
          >
            <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="h-7" />
            <span className="text-lg font-bold text-[#1b2228] tracking-tight">Zocdoc</span>
          </button>
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
            style={{ width: mounted ? "33%" : "0%" }}
          />
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 basis-1/2 flex flex-col justify-center items-center px-12 py-12 overflow-y-auto">
          <div className="w-full max-w-[400px]">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-[#1b2228]">Create your account</h1>
              <p className="text-sm text-[rgba(51,51,51,0.6)] mt-1">
                Get started with Zocdoc for free. It takes about 5 minutes.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleSocial}
                className="flex items-center justify-center gap-3 w-full h-11 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm font-medium text-[#333] hover:bg-[#f8f8f8] transition-colors cursor-pointer"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button
                onClick={handleSocial}
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
                <p className="text-xs text-[rgba(51,51,51,0.45)] mt-1.5">
                  Use your practice email — we'll use it to find your practice details.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8+ characters"
                    className="w-full h-11 px-3.5 pr-10 rounded-lg border border-[rgba(47,40,28,0.2)] bg-white text-sm outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-colors"
                  />
                  {password && (
                    <button
                      type="button"
                      onClick={() => setPassword("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(51,51,51,0.4)] hover:text-[#333] bg-transparent border-none cursor-pointer p-0"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {ruleResults.map((rule) => (
                    <span
                      key={rule.key}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors ${
                        password && rule.passed
                          ? "bg-green-50 text-green-700"
                          : "bg-[#f0f0ef] text-[rgba(51,51,51,0.5)]"
                      }`}
                    >
                      {password && rule.passed && <Check className="size-3" />}
                      {rule.label}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => canSubmit && proceed(email)}
                disabled={!canSubmit}
                className={`w-full h-11 rounded-lg text-sm font-semibold border-none transition-colors mt-1 ${
                  canSubmit
                    ? "bg-[#1b2228] text-white cursor-pointer hover:bg-[#333]"
                    : "bg-[#e5e5e4] text-[rgba(51,51,51,0.4)] cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>

            <p className="text-xs text-[rgba(51,51,51,0.4)] mt-6 leading-relaxed">
              By continuing, you agree to Zocdoc's{" "}
              <button className="underline bg-transparent border-none cursor-pointer text-[rgba(51,51,51,0.4)] text-xs">Terms of Service</button>{" "}
              and{" "}
              <button className="underline bg-transparent border-none cursor-pointer text-[rgba(51,51,51,0.4)] text-xs">Privacy Policy</button>.
            </p>
          </div>
        </div>
        <div className="flex-1 basis-1/2">
          <RightPanel />
        </div>
      </div>
    </div>
  )
}
