import { createContext, useContext, useMemo } from "react"
import type { PracticeData, IntegrationAlert, IntegrationSummary, IntegrationMapping } from "@/types"
import { getProfileData } from "@/data/mockData"
import { usePracticeProfile } from "@/context/PracticeProfileContext"

interface PracticeContextValue {
  practiceData: PracticeData
  integrationAlerts: IntegrationAlert[]
  integrationSummary: IntegrationSummary
  integrationMappings: IntegrationMapping[]
}

const PracticeContext = createContext<PracticeContextValue | null>(null)

export function PracticeProvider({ children }: { children: React.ReactNode }) {
  const { profileId } = usePracticeProfile()

  const value = useMemo(() => {
    const profile = getProfileData(profileId)
    return {
      practiceData: profile.data,
      integrationAlerts: profile.integrationAlerts,
      integrationSummary: profile.integrationSummary,
      integrationMappings: profile.integrationMappings,
    }
  }, [profileId])

  return (
    <PracticeContext.Provider value={value}>
      {children}
    </PracticeContext.Provider>
  )
}

export function usePractice(): PracticeData {
  const ctx = useContext(PracticeContext)
  if (!ctx) throw new Error("usePractice must be used within a PracticeProvider")
  return ctx.practiceData
}

export function useIntegrationData() {
  const ctx = useContext(PracticeContext)
  if (!ctx) throw new Error("useIntegrationData must be used within a PracticeProvider")
  return {
    alerts: ctx.integrationAlerts,
    summary: ctx.integrationSummary,
    mappings: ctx.integrationMappings,
  }
}
