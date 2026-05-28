import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { CalendarPlusIcon, ChevronDownIcon, DownloadIcon } from "lucide-react"
import { usePageHeaderActions } from "@/context/HeaderActionsContext"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function CalendarPage() {
  usePageHeaderActions(
    <ButtonGroup>
      <Button>
        <CalendarPlusIcon />
        New appointment
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button aria-label="More options" />}>
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Block time</DropdownMenuItem>
          <DropdownMenuItem>Schedule recurring</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DownloadIcon />
            Export calendar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="grid grid-cols-7 border-b">
          {DAYS.map((d) => (
            <div key={d} className="p-3 flex justify-center">
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, row) => (
          <div key={row} className="grid grid-cols-7 border-b last:border-b-0">
            {Array.from({ length: 7 }).map((_, col) => (
              <div key={col} className="min-h-24 p-2 border-r last:border-r-0 flex flex-col gap-1.5">
                <Skeleton className="h-5 w-5 rounded-full self-end" />
                {Math.random() > 0.6 && <Skeleton className="h-5 w-full rounded" />}
                {Math.random() > 0.75 && <Skeleton className="h-5 w-3/4 rounded" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
