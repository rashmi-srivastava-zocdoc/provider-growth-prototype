import { createContext, useContext, useState, type ReactNode } from "react"

type PracticeSolutionsModeContextType = {
  practiceSolutionsEnabled: boolean
  setPracticeSolutionsEnabled: (enabled: boolean) => void
}

const PracticeSolutionsModeContext = createContext<PracticeSolutionsModeContextType | null>(null)

export function PracticeSolutionsModeProvider({ children }: { children: ReactNode }) {
  const [practiceSolutionsEnabled, setPracticeSolutionsEnabled] = useState(true)

  return (
    <PracticeSolutionsModeContext.Provider value={{ practiceSolutionsEnabled, setPracticeSolutionsEnabled }}>
      {children}
    </PracticeSolutionsModeContext.Provider>
  )
}

export function usePracticeSolutionsMode() {
  const ctx = useContext(PracticeSolutionsModeContext)
  if (!ctx) throw new Error("usePracticeSolutionsMode must be used within PracticeSolutionsModeProvider")
  return ctx
}
