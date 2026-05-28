import { useState } from "react"
import { SlidersHorizontal, Globe, Monitor, Building2, User, Users, LogIn, AppWindow, ListOrdered, Minimize2, Megaphone, Power, Sparkles, ClipboardList, Rocket, CalendarDays, UserX, UserCheck, Shield, ShieldOff, ChevronDown, SearchCheck, ToggleLeft, ToggleRight } from "lucide-react"
import { usePracticeProfile, practiceProfileOptions, type PracticeProfileId } from "@/context/PracticeProfileContext"
import { usePrototypeVariants } from "@/context/PrototypeVariantsContext"
import { useHome } from "@/context/HomeContext"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { usePath, useNavigate } from "@/lib/router"
import { useSignupVariant, type SignupVariant } from "@/context/SignupVariantContext"

const profileIcons: Record<PracticeProfileId, React.ReactNode> = {
  enterprise: <Building2 className="h-3.5 w-3.5" />,
  solo: <User className="h-3.5 w-3.5" />,
  "small-group": <Users className="h-3.5 w-3.5" />,
}

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer border-none ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  )
}

function SettingGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-1">{label}</span>
      <div className="flex items-center gap-0.5 rounded-lg bg-muted/50 p-0.5">
        {children}
      </div>
    </div>
  )
}

type ViewMode = "join" | "dashboard"

function getViewMode(path: string): ViewMode {
  if (path === "/join" || path.startsWith("/signup")) return "join"
  return "dashboard"
}

function getSignupVariant(path: string): "two-step" | "multi-step" | "in-product" | null {
  if (path === "/signup") return "two-step"
  if (path === "/signup/multi-step") return "multi-step"
  if (path === "/signup/auth") return "in-product"
  return null
}

function MoreOptions({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-1"
      >
        More options
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="flex flex-col gap-3">{children}</div>}
    </div>
  )
}

export function PreviewModeToggle() {
  const path = usePath()
  const navigate = useNavigate()
  const { profileId, setProfileId } = usePracticeProfile()
  const { variant: selectedVariant, setVariant } = useSignupVariant()
  const { upsellStyle, setUpsellStyle, socialLogin, setSocialLogin, rolesEnabled, setRolesEnabled, aiAssistantEnabled, setAiAssistantEnabled } = usePrototypeVariants()
  const { activationState, setActivationState, homeVariant, setHomeVariant, postPhase, setPostPhase, activatedProducts, toggleProduct, hasLaunched } = useHome()
  const viewMode = getViewMode(path)
  const signupVariantFromPath = getSignupVariant(path)
  const isJoinOrSignup = viewMode === "join" || signupVariantFromPath !== null
  const isDashboard = viewMode === "dashboard"
  const isHomePage = path === "/dashboard/home"
  const isProductSettingsPage = path.includes("/products/") && path.includes("/settings")
  const isUsersPage = path.includes("/dashboard/settings/users")

  const activeVariant = signupVariantFromPath ?? (viewMode === "join" ? selectedVariant : null)

  const signupPaths: Record<SignupVariant, string> = {
    "two-step": "/signup",
    "multi-step": "/signup/multi-step",
    "in-product": "/signup/auth",
  }

  const handleVariantClick = (v: SignupVariant) => {
    setVariant(v)
    navigate(signupPaths[v])
  }

  return (
    <div className="fixed bottom-4 left-4 z-[60]">
      <Popover>
        <PopoverTrigger
          className="flex items-center justify-center size-9 rounded-full border border-border/60 bg-background/90 shadow-lg backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-background transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          sideOffset={8}
          className="w-auto min-w-[200px] p-3 flex flex-col gap-3"
        >
          <SettingGroup label="View">
            <OptionButton active={isJoinOrSignup} onClick={() => navigate("/join")}>
              <Globe className="h-3.5 w-3.5" />
              Landing
            </OptionButton>
            <OptionButton active={isDashboard} onClick={() => navigate("/dashboard/home")}>
              <Monitor className="h-3.5 w-3.5" />
              Dashboard
            </OptionButton>
          </SettingGroup>

          {isHomePage && (
            <>
              <SettingGroup label="Home state">
                <OptionButton
                  active={activationState === "pre"}
                  onClick={() => setActivationState("pre")}
                >
                  <ClipboardList className="h-3.5 w-3.5" />
                  Pre-activation
                </OptionButton>
                <OptionButton
                  active={activationState === "post"}
                  onClick={() => setActivationState("post")}
                >
                  <Power className="h-3.5 w-3.5" />
                  Post-activation
                </OptionButton>
              </SettingGroup>

              {activationState === "post" && (
                <SettingGroup label="Post phase">
                  <OptionButton
                    active={postPhase === "just-launched"}
                    onClick={() => setPostPhase("just-launched")}
                  >
                    <Rocket className="h-3.5 w-3.5" />
                    Just launched
                  </OptionButton>
                  <OptionButton
                    active={postPhase === "days-later"}
                    onClick={() => setPostPhase("days-later")}
                  >
                    <CalendarDays className="h-3.5 w-3.5" />
                    Days later
                  </OptionButton>
                </SettingGroup>
              )}
            </>
          )}

          {isUsersPage && (
            <SettingGroup label="Roles">
              <OptionButton active={rolesEnabled} onClick={() => setRolesEnabled(true)}>
                <Shield className="h-3.5 w-3.5" />
                On
              </OptionButton>
              <OptionButton active={!rolesEnabled} onClick={() => setRolesEnabled(false)}>
                <ShieldOff className="h-3.5 w-3.5" />
                Off
              </OptionButton>
            </SettingGroup>
          )}

          {isDashboard && hasLaunched && (
            <>
              <SettingGroup label="Marketplace">
                <OptionButton
                  active={activatedProducts.has("marketplace")}
                  onClick={() => toggleProduct("marketplace")}
                >
                  <SearchCheck className="h-3.5 w-3.5" />
                  On
                </OptionButton>
                <OptionButton
                  active={!activatedProducts.has("marketplace")}
                  onClick={() => toggleProduct("marketplace")}
                >
                  <SearchCheck className="h-3.5 w-3.5 opacity-40" />
                  Off
                </OptionButton>
              </SettingGroup>

              <SettingGroup label="Practice Solutions">
                <OptionButton
                  active={activatedProducts.has("practice-solutions")}
                  onClick={() => toggleProduct("practice-solutions")}
                >
                  <Building2 className="h-3.5 w-3.5" />
                  On
                </OptionButton>
                <OptionButton
                  active={!activatedProducts.has("practice-solutions")}
                  onClick={() => toggleProduct("practice-solutions")}
                >
                  <Building2 className="h-3.5 w-3.5 opacity-40" />
                  Off
                </OptionButton>
              </SettingGroup>
            </>
          )}

          {isProductSettingsPage && (
            <SettingGroup label="Upsell style">
              <OptionButton
                active={upsellStyle === "minimal"}
                onClick={() => setUpsellStyle("minimal")}
              >
                <Minimize2 className="h-3.5 w-3.5" />
                Minimal
              </OptionButton>
              <OptionButton
                active={upsellStyle === "marketing"}
                onClick={() => setUpsellStyle("marketing")}
              >
                <Megaphone className="h-3.5 w-3.5" />
                Marketing
              </OptionButton>
            </SettingGroup>
          )}

          <MoreOptions>
            {isJoinOrSignup && (
              <>
                <SettingGroup label="Sign up">
                  <OptionButton active={activeVariant === "two-step"} onClick={() => handleVariantClick("two-step")}>
                    <LogIn className="h-3.5 w-3.5" />
                    Two-step
                  </OptionButton>
                  <OptionButton active={activeVariant === "multi-step"} onClick={() => handleVariantClick("multi-step")}>
                    <ListOrdered className="h-3.5 w-3.5" />
                    Multi-step
                  </OptionButton>
                  <OptionButton active={activeVariant === "in-product"} onClick={() => handleVariantClick("in-product")}>
                    <AppWindow className="h-3.5 w-3.5" />
                    In-product
                  </OptionButton>
                </SettingGroup>

                <SettingGroup label="Social login">
                  <OptionButton active={socialLogin} onClick={() => setSocialLogin(true)}>
                    <UserCheck className="h-3.5 w-3.5" />
                    On
                  </OptionButton>
                  <OptionButton active={!socialLogin} onClick={() => setSocialLogin(false)}>
                    <UserX className="h-3.5 w-3.5" />
                    Off
                  </OptionButton>
                </SettingGroup>
              </>
            )}

            {isDashboard && (
              <>
                <SettingGroup label="AI assistant">
                  <OptionButton active={aiAssistantEnabled} onClick={() => setAiAssistantEnabled(true)}>
                    <Sparkles className="h-3.5 w-3.5" />
                    On
                  </OptionButton>
                  <OptionButton active={!aiAssistantEnabled} onClick={() => setAiAssistantEnabled(false)}>
                    <Sparkles className="h-3.5 w-3.5 opacity-40" />
                    Off
                  </OptionButton>
                </SettingGroup>

                <SettingGroup label="Practice">
                  {practiceProfileOptions.map((opt) => (
                    <OptionButton
                      key={opt.id}
                      active={profileId === opt.id}
                      onClick={() => setProfileId(opt.id)}
                    >
                      {profileIcons[opt.id]}
                      {opt.label}
                    </OptionButton>
                  ))}
                </SettingGroup>
              </>
            )}

            {isHomePage && (
              <SettingGroup label="Home variant">
                <OptionButton
                  active={homeVariant === "mvp"}
                  onClick={() => setHomeVariant("mvp")}
                >
                  <ClipboardList className="h-3.5 w-3.5" />
                  MVP
                </OptionButton>
                <OptionButton
                  active={homeVariant === "vision"}
                  onClick={() => setHomeVariant("vision")}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Vision
                </OptionButton>
              </SettingGroup>
            )}
          </MoreOptions>
        </PopoverContent>
      </Popover>
    </div>
  )
}
