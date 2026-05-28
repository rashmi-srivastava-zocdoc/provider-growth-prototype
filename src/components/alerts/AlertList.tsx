import { useState } from "react"
import type { IntegrationAlert } from "@/types"
import { AlertBanner } from "./AlertBanner"
import { Button } from "@/components/ui/button"
import { AlertModal } from "./AlertModal"

interface AlertListProps {
  alerts: IntegrationAlert[]
  pageContext: string
  variant?: "flat" | "collapsible"
}

const COLLAPSED_LIMIT = 3

export function AlertList({
  alerts,
  pageContext,
  variant = "collapsible",
}: AlertListProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = alerts.filter(
    (a) => a.relevantPages.includes(pageContext) && !a.dismissed
  )

  if (filtered.length === 0) return null

  const showOverflow = variant === "collapsible" && filtered.length > COLLAPSED_LIMIT
  const visible = showOverflow ? filtered.slice(0, COLLAPSED_LIMIT) : filtered
  const overflowCount = filtered.length - COLLAPSED_LIMIT

  return (
    <div className="space-y-2">
      {visible.map((alert) => (
        <AlertBanner key={alert.id} alert={alert} />
      ))}

      {showOverflow && (
        <>
          <Button
            variant="link"
            size="sm"
            className="px-0"
            onClick={() => setModalOpen(true)}
          >
            {overflowCount} more {overflowCount === 1 ? "item" : "items"}
          </Button>
          <AlertModal
            alerts={filtered}
            open={modalOpen}
            onOpenChange={setModalOpen}
          />
        </>
      )}
    </div>
  )
}
