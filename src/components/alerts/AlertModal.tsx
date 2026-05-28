import type { IntegrationAlert } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { AlertBanner } from "./AlertBanner"

interface AlertModalProps {
  alerts: IntegrationAlert[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AlertModal({ alerts, open, onOpenChange }: AlertModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Items needing attention</DialogTitle>
          <DialogDescription>
            {alerts.length} {alerts.length === 1 ? "alert" : "alerts"} across
            your integrations
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] space-y-2 overflow-y-auto">
          {alerts.map((alert) => (
            <AlertBanner key={alert.id} alert={alert} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
