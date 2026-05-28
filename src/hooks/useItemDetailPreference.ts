import { useState, useEffect } from "react"

export type ItemDetailViewMode = "sheet" | "modal" | "fullpage" | "newtab"

export function useItemDetailPreference(storageKey = "zd-item-detail-view-mode") {
  const [savedDefault, setSavedDefault] = useState<ItemDetailViewMode>(() => {
    try {
      return (localStorage.getItem(storageKey) as ItemDetailViewMode) ?? "sheet"
    } catch {
      return "sheet"
    }
  })

  const [viewMode, setViewModeState] = useState<ItemDetailViewMode>(savedDefault)
  const [promptDismissed, setPromptDismissed] = useState(false)

  const pendingSavePrompt =
    viewMode !== savedDefault &&
    viewMode !== "newtab" &&
    !promptDismissed

  useEffect(() => {
    setPromptDismissed(false)
  }, [viewMode])

  function setViewMode(mode: ItemDetailViewMode) {
    setViewModeState(mode)
  }

  function saveAsDefault() {
    if (viewMode === "newtab") return
    try {
      localStorage.setItem(storageKey, viewMode)
    } catch { /* ignore */ }
    setSavedDefault(viewMode)
    setPromptDismissed(true)
  }

  function dismissSavePrompt() {
    setPromptDismissed(true)
  }

  function resetToDefault() {
    setViewModeState(savedDefault)
    setPromptDismissed(false)
  }

  return {
    viewMode,
    setViewMode,
    savedDefault,
    pendingSavePrompt,
    saveAsDefault,
    dismissSavePrompt,
    resetToDefault,
  }
}
