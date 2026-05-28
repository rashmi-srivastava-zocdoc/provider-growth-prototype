import React from "react"
import { cn } from "@/lib/utils"

export function ButtonGroup({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group"
      className={cn(
        "flex [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-px",
        className
      )}
      {...props}
    />
  )
}
