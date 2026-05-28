import { createContext, useContext, useState } from "react"

export type SignupVariant = "two-step" | "multi-step" | "in-product"

const SignupVariantContext = createContext<{
  variant: SignupVariant
  setVariant: (v: SignupVariant) => void
}>({ variant: "two-step", setVariant: () => {} })

export function SignupVariantProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<SignupVariant>("two-step")
  return (
    <SignupVariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </SignupVariantContext.Provider>
  )
}

export function useSignupVariant() {
  return useContext(SignupVariantContext)
}
