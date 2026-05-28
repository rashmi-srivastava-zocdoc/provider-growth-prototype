import { Monitor, Lightbulb, Send, Users, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const SETUP_HELP_OPTIONS = [
  {
    icon: Monitor,
    title: "Website editor setup",
    description: "Instructions for adding your Booking Link to your practice website",
  },
  {
    icon: Lightbulb,
    title: "Design best practices",
    description: "Tips to help you place your Booking Link where patients are most likely to book",
  },
  {
    icon: Send,
    title: "Send to your developer",
    description: "Email setup instructions to a developer or website manager",
  },
  {
    icon: Users,
    title: "Have Zocdoc add your Booking Link",
    description: "Our team can help set up your Booking Link on your practice website",
  },
]

export function SetupHelpDialog({
  variant = "link",
}: {
  variant?: "link" | "footer"
}) {
  return (
    <Dialog>
      <DialogTrigger
        className={
          variant === "footer"
            ? "flex w-full items-center gap-1.5 border-t border-dashed px-5 py-3 text-sm font-medium text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors cursor-pointer bg-transparent border-x-0 border-b-0"
            : "text-xs font-medium text-primary hover:text-primary/80 cursor-pointer bg-transparent border-none underline underline-offset-2"
        }
      >
        Need help with set up?
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Need help with your Booking Link?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1 -mx-1">
          {SETUP_HELP_OPTIONS.map((opt) => (
            <button
              key={opt.title}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-muted/50 cursor-pointer bg-transparent border-none"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#FEED5A]/30">
                <opt.icon className="size-4 text-amber-700" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{opt.title}</p>
                <p className="text-xs text-muted-foreground">{opt.description}</p>
              </div>
              <ChevronRight className="size-3.5 text-muted-foreground/40 shrink-0" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
