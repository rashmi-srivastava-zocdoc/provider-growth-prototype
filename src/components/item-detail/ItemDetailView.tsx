import { useState, useEffect, useRef } from "react"
import { useItemDetailPreference } from "@/hooks/useItemDetailPreference"
import type { ItemDetailViewMode } from "@/hooks/useItemDetailPreference"
import { useSidebar } from "@/components/ui/sidebar"
import { ItemDetailToolbar } from "./ItemDetailToolbar"
import { ItemDetailChangelog } from "./ItemDetailChangelog"
import { ItemDetailShell } from "./ItemDetailShell"
import { ItemDetailModal } from "./ItemDetailModal"
import { ItemDetailFullPage } from "./ItemDetailFullPage"
import type { ItemDetailViewProps } from "./types"

export function ItemDetailView({
  open,
  onOpenChange,
  onNavigatePrev,
  onNavigateNext,
  canNavigatePrev = false,
  canNavigateNext = false,
  actions,
  changelog,
  storageKey,
  children,
}: ItemDetailViewProps) {
  const pref = useItemDetailPreference(storageKey)
  const [changelogOpen, setChangelogOpen] = useState(false)
  const { setOpen: setSidebarOpen } = useSidebar()
  const prevModeRef = useRef<ItemDetailViewMode>("sheet")

  // Reset to saved default each time the panel opens
  useEffect(() => {
    if (open) {
      pref.resetToDefault()
      setChangelogOpen(false)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // Collapse sidebar when changelog opens
  useEffect(() => {
    if (changelogOpen) setSidebarOpen(false)
  }, [changelogOpen, setSidebarOpen])

  function handleViewModeChange(mode: ItemDetailViewMode) {
    if (mode === "newtab") {
      window.open(window.location.href, "_blank")
      // Stay on current mode — newtab is an action, not a persistent state
    } else {
      prevModeRef.current = mode
      pref.setViewMode(mode)
    }
  }

  const toolbar = (
    <ItemDetailToolbar
      viewMode={pref.viewMode}
      onViewModeChange={handleViewModeChange}
      canNavigatePrev={canNavigatePrev}
      canNavigateNext={canNavigateNext}
      onNavigatePrev={onNavigatePrev}
      onNavigateNext={onNavigateNext}
      changelogOpen={changelogOpen}
      hasChangelog={!!changelog?.length}
      onChangelogToggle={() => setChangelogOpen((o) => !o)}
      onClose={() => onOpenChange(false)}
      pendingSavePrompt={pref.pendingSavePrompt}
      onSaveAsDefault={pref.saveAsDefault}
      onDismissSavePrompt={pref.dismissSavePrompt}
      actions={actions}
    />
  )

  const contentInner = (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <ItemDetailChangelog
        open={changelogOpen}
        entries={changelog ?? []}
      />
    </div>
  )

  if (pref.viewMode === "fullpage") {
    return (
      <ItemDetailFullPage
        open={open}
        toolbar={toolbar}
        content={contentInner}
      />
    )
  }

  if (pref.viewMode === "modal") {
    return (
      <ItemDetailModal
        open={open}
        onOpenChange={onOpenChange}
        toolbar={toolbar}
        content={contentInner}
      />
    )
  }

  return (
    <ItemDetailShell
      open={open}
      onOpenChange={onOpenChange}
      changelogOpen={changelogOpen}
      toolbar={toolbar}
      content={contentInner}
    />
  )
}
