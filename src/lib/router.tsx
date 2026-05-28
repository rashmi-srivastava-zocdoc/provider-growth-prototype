import { createContext, useContext, useState, useEffect, useCallback, useSyncExternalStore } from "react"

interface RouterContextValue {
  path: string
  navigate: (to: string, options?: { replace?: boolean }) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "")

let listeners: (() => void)[] = []
function subscribe(cb: () => void) {
  listeners.push(cb)
  return () => { listeners = listeners.filter((l) => l !== cb) }
}
function getSnapshot() {
  const raw = window.location.pathname
  return BASE ? raw.replace(BASE, "") || "/" : raw
}

export function Router({ children }: { children: React.ReactNode }) {
  const path = useSyncExternalStore(subscribe, getSnapshot)

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const [pathname, search] = to.split("?")
    const fullPath = BASE + pathname
    const fullUrl = search ? `${fullPath}?${search}` : fullPath
    if (fullPath === window.location.pathname && (!search || window.location.search === `?${search}`)) return
    if (options?.replace) {
      window.history.replaceState(null, "", fullUrl)
    } else {
      window.history.pushState(null, "", fullUrl)
    }
    listeners.forEach((l) => l())
  }, [])

  useEffect(() => {
    const onPop = () => listeners.forEach((l) => l())
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error("useRouter must be used within <Router>")
  return ctx
}

export function useNavigate() {
  return useRouter().navigate
}

export function usePath() {
  return useRouter().path
}

export function asset(path: string) {
  return BASE + path
}
