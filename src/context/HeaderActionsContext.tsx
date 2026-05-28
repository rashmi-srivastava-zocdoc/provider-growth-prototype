import { createContext, useContext, useState, useLayoutEffect, type ReactNode } from 'react'

interface HeaderActionsContextValue {
  actions: ReactNode
  setActions: (actions: ReactNode) => void
}

const HeaderActionsContext = createContext<HeaderActionsContextValue>({
  actions: null,
  setActions: () => {},
})

export function HeaderActionsProvider({ children }: { children: ReactNode }) {
  const [actions, setActions] = useState<ReactNode>(null)
  return (
    <HeaderActionsContext.Provider value={{ actions, setActions }}>
      {children}
    </HeaderActionsContext.Provider>
  )
}

// Call at the top of a page component to declare what renders in the page header's action slot.
// Use stable references (e.g. useState setters) in the JSX so the actions stay correct
// after the initial mount. Pass deps to re-register when values the actions depend on change.
export function usePageHeaderActions(actions: ReactNode, deps: readonly unknown[] = []) {
  const { setActions } = useContext(HeaderActionsContext)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    setActions(actions)
    return () => setActions(null)
  }, deps as unknown[])
}

export function useHeaderActionsSlot(): ReactNode {
  return useContext(HeaderActionsContext).actions
}
