import type { ReactNode } from "react"
import {
  XIcon,
  PanelRightIcon,
  AppWindowIcon,
  Maximize2Icon,
  ExternalLinkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ClockIcon,
  EllipsisIcon,
  CheckIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { ItemDetailViewMode } from "@/hooks/useItemDetailPreference"
import { ItemDetailDefaultPrompt } from "./ItemDetailDefaultPrompt"

interface Props {
  viewMode: ItemDetailViewMode
  onViewModeChange: (mode: ItemDetailViewMode) => void
  canNavigatePrev?: boolean
  canNavigateNext?: boolean
  onNavigatePrev?: () => void
  onNavigateNext?: () => void
  changelogOpen: boolean
  hasChangelog: boolean
  onChangelogToggle: () => void
  onClose: () => void
  pendingSavePrompt: boolean
  onSaveAsDefault: () => void
  onDismissSavePrompt: () => void
  actions?: ReactNode
}

const DROPDOWN_MODE_ICONS: Record<"sheet" | "modal", ReactNode> = {
  sheet: <PanelRightIcon />,
  modal: <AppWindowIcon />,
}

function getModeDropdownIcon(viewMode: ItemDetailViewMode): ReactNode {
  if (viewMode === "sheet" || viewMode === "modal") return DROPDOWN_MODE_ICONS[viewMode]
  return DROPDOWN_MODE_ICONS["sheet"]
}

export function ItemDetailToolbar({
  viewMode,
  onViewModeChange,
  canNavigatePrev,
  canNavigateNext,
  onNavigatePrev,
  onNavigateNext,
  changelogOpen,
  hasChangelog,
  onChangelogToggle,
  onClose,
  pendingSavePrompt,
  onSaveAsDefault,
  onDismissSavePrompt,
  actions,
}: Props) {
  return (
    <div className={cn("flex items-center h-12 shrink-0 px-3 gap-1", viewMode !== "sheet" && "border-b")}>
      {/* View mode dropdown (sheet / modal / new tab) */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon-sm" className="border-0" aria-label="View mode" />}
        >
          {getModeDropdownIcon(viewMode)}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-44">
          <DropdownMenuItem onClick={() => onViewModeChange("sheet")}>
            <PanelRightIcon />
            Side panel
            {viewMode === "sheet" && <CheckIcon className="ml-auto size-3.5" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onViewModeChange("modal")}>
            <AppWindowIcon />
            Modal
            {viewMode === "modal" && <CheckIcon className="ml-auto size-3.5" />}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onViewModeChange("newtab")}>
            <ExternalLinkIcon />
            Open in new tab
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Full page — standalone icon */}
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Expand to full page"
        onClick={() => onViewModeChange(viewMode === "fullpage" ? "sheet" : "fullpage")}
        className={cn("border-0", viewMode === "fullpage" && "bg-muted text-foreground")}
      >
        <Maximize2Icon />
      </Button>

      <Separator orientation="vertical" className="mx-0.5 data-vertical:h-4" />

      {/* Navigation */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="border-0"
        aria-label="Previous item"
        disabled={!canNavigatePrev}
        onClick={onNavigatePrev}
      >
        <ChevronUpIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="border-0"
        aria-label="Next item"
        disabled={!canNavigateNext}
        onClick={onNavigateNext}
      >
        <ChevronDownIcon />
      </Button>

      {/* Save-as-default prompt */}
      {pendingSavePrompt && (
        <>
          <Separator orientation="vertical" className="mx-0.5 data-vertical:h-4" />
          <ItemDetailDefaultPrompt
            onSave={onSaveAsDefault}
            onDismiss={onDismissSavePrompt}
          />
        </>
      )}

      {/* Right side */}
      <div className="ml-auto flex items-center gap-1">
        {actions && (
          <>
            {actions}
            <Separator orientation="vertical" className="mx-0.5 data-vertical:h-4" />
          </>
        )}

        {hasChangelog && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Change history"
            onClick={onChangelogToggle}
            className={cn("border-0", changelogOpen && "bg-muted text-foreground")}
          >
            <ClockIcon />
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon-sm" className="border-0" aria-label="More options" />}
          >
            <EllipsisIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-0.5 data-vertical:h-4" />

        {/* Close — rightmost action */}
        <Button variant="ghost" size="icon-sm" className="border-0" aria-label="Close" onClick={onClose}>
          <XIcon />
        </Button>
      </div>
    </div>
  )
}
