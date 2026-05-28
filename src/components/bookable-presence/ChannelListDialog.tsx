import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const CHANNELS = [
  { name: "Google Search & Maps", category: "Search engines & maps" },
  { name: "Bing Places", category: "Search engines & maps" },
  { name: "Apple Maps", category: "Search engines & maps" },
  { name: "Yelp", category: "Marketplace partners" },
  { name: "Healthgrades", category: "Marketplace partners" },
  { name: "Vitals", category: "Marketplace partners" },
  { name: "WebMD", category: "Marketplace partners" },
  { name: "CareDash", category: "Marketplace partners" },
  { name: "Facebook", category: "Marketplace partners" },
  { name: "Amazon Health", category: "Marketplace partners" },
  { name: "Solv", category: "Marketplace partners" },
  { name: "Sesame Care", category: "Marketplace partners" },
  { name: "Wellness.com", category: "Insurance directories" },
  { name: "Zocdoc Insurance Network", category: "Insurance directories" },
  { name: "Plan-specific directories", category: "Insurance directories" },
]

const CHANNEL_CATEGORIES = [...new Set(CHANNELS.map((c) => c.category))]

export function ChannelListDialog({
  variant = "link",
}: {
  variant?: "link" | "inline"
}) {
  return (
    <Dialog>
      <DialogTrigger
        className={
          variant === "inline"
            ? "text-sm font-medium text-primary hover:text-primary/80 cursor-pointer bg-transparent border-none underline-offset-2 hover:underline"
            : "text-xs font-medium text-primary hover:text-primary/80 cursor-pointer bg-transparent border-none shrink-0"
        }
      >
        View all partners
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Channel partners</DialogTitle>
          <DialogDescription>
            Your profiles are automatically synced to these channels. New partners are added regularly.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 max-h-[360px] overflow-y-auto -mx-1 px-1">
          {CHANNEL_CATEGORIES.map((category) => (
            <div key={category}>
              <p className="text-xs font-medium text-muted-foreground mb-2">{category}</p>
              <div className="flex flex-col gap-0.5">
                {CHANNELS.filter((c) => c.category === category).map((channel) => (
                  <div key={channel.name} className="py-1.5 px-2 rounded-md">
                    <span className="text-sm">{channel.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Each channel reviews and approves providers based on their own criteria. Most go live within 24–48 hours.
        </p>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
