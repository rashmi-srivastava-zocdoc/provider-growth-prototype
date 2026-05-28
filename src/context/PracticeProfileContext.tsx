import * as React from "react"

export type PracticeProfileId = "enterprise" | "solo" | "small-group"

export interface PracticeProfileOption {
  id: PracticeProfileId
  label: string
  description: string
}

export const practiceProfileOptions: PracticeProfileOption[] = [
  { id: "enterprise", label: "Enterprise", description: "5 providers, 2 locations, multi-source" },
  { id: "solo", label: "Solo", description: "1 provider, 1 location" },
  { id: "small-group", label: "Small group", description: "5 providers, 2 locations" },
]

interface PracticeProfileContextValue {
  profileId: PracticeProfileId
  setProfileId: (id: PracticeProfileId) => void
}

const PracticeProfileContext = React.createContext<PracticeProfileContextValue | null>(null)

export function PracticeProfileProvider({ children }: { children: React.ReactNode }) {
  const [profileId, setProfileId] = React.useState<PracticeProfileId>("enterprise")

  const value = React.useMemo(() => ({ profileId, setProfileId }), [profileId])

  return (
    <PracticeProfileContext.Provider value={value}>
      {children}
    </PracticeProfileContext.Provider>
  )
}

export function usePracticeProfile() {
  const ctx = React.useContext(PracticeProfileContext)
  if (!ctx) throw new Error("usePracticeProfile must be used within PracticeProfileProvider")
  return ctx
}
