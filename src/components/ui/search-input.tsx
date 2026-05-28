import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

function SearchInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        className={cn("pl-8", className)}
        {...props}
      />
    </div>
  )
}

export { SearchInput }
