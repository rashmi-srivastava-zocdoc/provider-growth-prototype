import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  onSave: () => void
  onDismiss: () => void
}

export function ItemDetailDefaultPrompt({ onSave, onDismiss }: Props) {
  return (
    <div className="flex items-center gap-1.5 rounded-md bg-muted px-2 h-7 text-xs text-muted-foreground">
      <span>Save as default?</span>
      <button
        onClick={onSave}
        className="text-foreground font-medium hover:underline text-xs"
      >
        Save
      </button>
      <Button variant="ghost" size="icon-xs" onClick={onDismiss} className="-mr-0.5">
        <XIcon />
      </Button>
    </div>
  )
}
