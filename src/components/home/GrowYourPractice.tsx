import { ArrowRight, ImageIcon } from "lucide-react"

export function GrowYourPractice() {
  return (
    <div className="mt-4">
      <div className="flex rounded-lg border bg-card overflow-hidden">
        <div className="flex-1 px-6 py-5">
          <p className="text-sm font-semibold">Grow your practice with Zocdoc</p>
          <p className="mt-1 text-sm text-muted-foreground">
            After you launch, explore products to reach more patients and save
            your team time.
          </p>
          <button className="mt-4 inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted/50 transition-colors cursor-pointer">
            See what's available
            <ArrowRight className="size-3.5" />
          </button>
        </div>
        <div className="w-[200px] shrink-0 bg-muted/30 border-l border-dashed border-muted-foreground/15 flex items-center justify-center">
          <ImageIcon className="size-10 text-muted-foreground/20" />
        </div>
      </div>
    </div>
  )
}
