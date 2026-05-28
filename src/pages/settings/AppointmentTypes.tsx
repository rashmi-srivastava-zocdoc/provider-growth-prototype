import { Calendar, Plus, MoreHorizontal, Pencil, Copy, Trash2, Settings2 } from "lucide-react"
import { useNavigate } from "@/lib/router"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  SettingsPageShell,
  SettingsPageHeader,
  SettingsGroup,
} from "@/pages/products/shared-settings"

interface AppointmentType {
  id: string
  name: string
  duration: string
  patientType: string
  bookingMode: string
  overrideCount?: number
}

export const appointmentTypes: AppointmentType[] = [
  { id: "2", name: "New patient visit", duration: "45 min", patientType: "New", bookingMode: "Self-serve", overrideCount: 2 },
  { id: "3", name: "Annual physical", duration: "45 min", patientType: "Existing", bookingMode: "Self-serve" },
  { id: "4", name: "Complex / multi-issue visit", duration: "60 min", patientType: "All", bookingMode: "Request approval", overrideCount: 1 },
  { id: "5", name: "Dermatology consultation", duration: "30 min", patientType: "New", bookingMode: "Self-serve" },
  { id: "6", name: "Follow-up visit", duration: "20 min", patientType: "Existing", bookingMode: "Self-serve" },
  { id: "7", name: "Post-operative visit", duration: "30 min", patientType: "Existing", bookingMode: "Request approval", overrideCount: 1 },
  { id: "8", name: "Sick visit", duration: "20 min", patientType: "All", bookingMode: "Self-serve" },
  { id: "9", name: "Telehealth consultation", duration: "30 min", patientType: "All", bookingMode: "Self-serve" },
  { id: "10", name: "Urgent care visit", duration: "20 min", patientType: "All", bookingMode: "Self-serve" },
]

export function AppointmentTypesPage() {
  const navigate = useNavigate()

  return (
    <SettingsPageShell>
      <SettingsPageHeader
        title="Appointment types"
        description="Booking defaults apply to all types unless overridden"
      />

      <SettingsGroup>
        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Settings2 className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Booking defaults</p>
                <p className="text-xs text-muted-foreground mt-0.5">Applied unless a type overrides them</p>
                <div className="flex flex-col gap-0.5 mt-2.5">
                  <p className="text-sm text-muted-foreground">30 min · 2-hour lead time · 60-day horizon</p>
                  <p className="text-sm text-muted-foreground">Self-serve booking · Self-pay allowed</p>
                  <p className="text-sm text-muted-foreground">Rescheduling allowed · Cancellation allowed</p>
                </div>
              </div>
            </div>
            <button
              className="text-xs font-medium text-primary hover:text-primary/80 cursor-pointer bg-transparent border-none shrink-0 mt-1"
              onClick={() => navigate("/dashboard/settings/appointment-types/defaults")}
            >
              Edit
            </button>
          </div>
        </div>
      </SettingsGroup>

      <SettingsGroup>
        <div className="flex items-center justify-between px-5 py-3.5">
          <p className="text-sm font-medium">{appointmentTypes.length} appointment types</p>
          <button className="flex items-center justify-center size-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors bg-transparent border-none cursor-pointer">
            <Plus className="size-4" />
          </button>
        </div>
        {appointmentTypes.map((type) => (
          <div
            key={type.id}
            className="flex items-center justify-between gap-4 px-5 py-3.5 group hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => navigate(`/dashboard/settings/appointment-types/edit/${type.id}`)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Calendar className="size-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{type.name}</p>
                  {type.bookingMode === "Request approval" && (
                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                      Request approval
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {type.duration}
                  {type.patientType !== "All" && ` · ${type.patientType} patients`}
                  {type.overrideCount && ` · ${type.overrideCount} override${type.overrideCount > 1 ? "s" : ""}`}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="size-7 rounded-md flex items-center justify-center text-muted-foreground/0 group-hover:text-muted-foreground hover:!text-foreground hover:bg-muted transition-all bg-transparent border-none cursor-pointer outline-none"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={6}>
                <DropdownMenuItem onClick={() => navigate(`/dashboard/settings/appointment-types/edit/${type.id}`)}>
                  <Pencil className="size-4 text-muted-foreground" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="size-4 text-muted-foreground" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </SettingsGroup>
    </SettingsPageShell>
  )
}
