import { createContext, useContext, useState } from "react"

export type UpsellStyle = "minimal" | "marketing"

const PrototypeVariantsContext = createContext<{
  upsellStyle: UpsellStyle
  setUpsellStyle: (s: UpsellStyle) => void
  socialLogin: boolean
  setSocialLogin: (v: boolean) => void
  rolesEnabled: boolean
  setRolesEnabled: (v: boolean) => void
  aiAssistantEnabled: boolean
  setAiAssistantEnabled: (v: boolean) => void
}>({ upsellStyle: "minimal", setUpsellStyle: () => {}, socialLogin: true, setSocialLogin: () => {}, rolesEnabled: false, setRolesEnabled: () => {}, aiAssistantEnabled: false, setAiAssistantEnabled: () => {} })

export function PrototypeVariantsProvider({ children }: { children: React.ReactNode }) {
  const [upsellStyle, setUpsellStyle] = useState<UpsellStyle>("minimal")
  const [socialLogin, setSocialLogin] = useState(true)
  const [rolesEnabled, setRolesEnabled] = useState(false)
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(false)
  return (
    <PrototypeVariantsContext.Provider value={{ upsellStyle, setUpsellStyle, socialLogin, setSocialLogin, rolesEnabled, setRolesEnabled, aiAssistantEnabled, setAiAssistantEnabled }}>
      {children}
    </PrototypeVariantsContext.Provider>
  )
}

export function usePrototypeVariants() {
  return useContext(PrototypeVariantsContext)
}
