import { createContext, useContext, useState, useCallback, useMemo } from "react"
import { setupTasksMVP } from "@/data/homeData"

export type ActivationState = "pre" | "post"
export type HomeVariant = "mvp" | "vision"
export type PostPhase = "just-launched" | "days-later"

const HomeContext = createContext<{
  activationState: ActivationState
  setActivationState: (s: ActivationState) => void
  homeVariant: HomeVariant
  setHomeVariant: (s: HomeVariant) => void
  postPhase: PostPhase
  setPostPhase: (s: PostPhase) => void
  completedTaskIds: Set<string>
  completeTask: (id: string) => void
  setupTotal: number
  hasLaunched: boolean
  setHasLaunched: (b: boolean) => void
  activatedProducts: Set<string>
  activateProduct: (id: string) => void
  toggleProduct: (id: string) => void
}>({
  activationState: "pre",
  setActivationState: () => {},
  homeVariant: "mvp",
  setHomeVariant: () => {},
  postPhase: "just-launched",
  setPostPhase: () => {},
  completedTaskIds: new Set(),
  completeTask: () => {},
  setupTotal: 0,
  hasLaunched: false,
  setHasLaunched: () => {},
  activatedProducts: new Set(),
  activateProduct: () => {},
  toggleProduct: () => {},
})

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [activationState, setActivationState] = useState<ActivationState>("pre")
  const [homeVariant, setHomeVariant] = useState<HomeVariant>("mvp")
  const [postPhase, setPostPhase] = useState<PostPhase>("just-launched")
  const [hasLaunched, setHasLaunched] = useState(false)
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(() => {
    return new Set(setupTasksMVP.filter((t) => t.complete).map((t) => t.id))
  })

  const completeTask = useCallback((id: string) => {
    setCompletedTaskIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const [activatedProductsSet, setActivatedProductsSet] = useState<Set<string>>(new Set())

  const activateProduct = useCallback((id: string) => {
    setActivatedProductsSet((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const toggleProduct = useCallback((id: string) => {
    setActivatedProductsSet((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const activatedProducts = useMemo(() => activatedProductsSet, [activatedProductsSet])

  return (
    <HomeContext.Provider
      value={{
        activationState,
        setActivationState,
        homeVariant,
        setHomeVariant,
        postPhase,
        setPostPhase,
        completedTaskIds,
        completeTask,
        setupTotal: setupTasksMVP.length,
        hasLaunched,
        setHasLaunched,
        activatedProducts,
        activateProduct,
        toggleProduct,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}

export function useHome() {
  return useContext(HomeContext)
}
