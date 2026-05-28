import * as React from "react"

export type IAMode = "sources-page" | "sources-drawer"

interface IAModeContextValue {
  iaMode: IAMode
  setIAMode: (mode: IAMode) => void
  isSourcesDrawerOpen: boolean
  openSourcesDrawer: () => void
  closeSourcesDrawer: () => void
  toggleSourcesDrawer: () => void
}

const IAModeContext = React.createContext<IAModeContextValue | null>(null)

export function IAModeProvider({ children }: { children: React.ReactNode }) {
  const [iaMode, setIAMode] = React.useState<IAMode>("sources-page")
  const [isSourcesDrawerOpen, setIsSourcesDrawerOpen] = React.useState(false)

  React.useEffect(() => {
    if (iaMode === "sources-page") setIsSourcesDrawerOpen(false)
  }, [iaMode])

  const value = React.useMemo(
    () => ({
      iaMode,
      setIAMode,
      isSourcesDrawerOpen,
      openSourcesDrawer: () => setIsSourcesDrawerOpen(true),
      closeSourcesDrawer: () => setIsSourcesDrawerOpen(false),
      toggleSourcesDrawer: () => setIsSourcesDrawerOpen((v) => !v),
    }),
    [iaMode, isSourcesDrawerOpen],
  )

  return <IAModeContext.Provider value={value}>{children}</IAModeContext.Provider>
}

export function useIAMode() {
  const ctx = React.useContext(IAModeContext)
  if (!ctx) throw new Error("useIAMode must be used within IAModeProvider")
  return ctx
}
