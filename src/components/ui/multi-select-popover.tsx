import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

export interface OptionGroup {
  label: string
  options: string[]
}

interface MultiSelectPopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  values: string[]
  onValuesChange: (values: string[]) => void
  options?: string[]
  groups?: OptionGroup[]
  displayLabel?: (value: string) => string
  searchPlaceholder?: string
  emptyMessage?: string
  trigger: React.ReactElement
  footer?: React.ReactNode
  width?: string
  align?: "start" | "center" | "end"
  collisionPadding?: number
  collisionAvoidance?: Record<string, string>
  showBulkActions?: boolean
  onAddNew?: (value: string) => void
  addNewLabel?: string
  size?: "compact" | "default"
  selectableGroups?: boolean
}

export function MultiSelectPopover({
  open,
  onOpenChange,
  values,
  onValuesChange,
  options,
  groups,
  displayLabel,
  searchPlaceholder = "Search...",
  emptyMessage = "No options found",
  trigger,
  footer,
  width = "w-80",
  align = "start",
  collisionPadding,
  collisionAvoidance,
  showBulkActions = false,
  onAddNew,
  addNewLabel = "Add",
  size = "compact",
  selectableGroups = false,
}: MultiSelectPopoverProps) {
  const [search, setSearch] = useState("")
  const isDefault = size === "default"

  const allOptions = groups ? groups.flatMap((g) => g.options) : (options ?? [])

  function filterOptions(opts: string[]) {
    if (!search) return opts
    const q = search.toLowerCase()
    return opts.filter((o) => {
      const label = displayLabel ? displayLabel(o) : o
      return label.toLowerCase().includes(q)
    })
  }

  function toggle(option: string) {
    if (values.includes(option)) {
      onValuesChange(values.filter((v) => v !== option))
    } else {
      onValuesChange([...values, option])
    }
  }

  function toggleGroup(groupOptions: string[]) {
    const allSelected = groupOptions.every((o) => values.includes(o))
    if (allSelected) {
      onValuesChange(values.filter((v) => !groupOptions.includes(v)))
    } else {
      onValuesChange([...new Set([...values, ...groupOptions])])
    }
  }

  function selectAll() {
    onValuesChange([...new Set([...values, ...allOptions])])
  }

  function clearAll() {
    onValuesChange(values.filter((v) => !allOptions.includes(v)))
  }

  function renderOption(option: string) {
    return (
      <label
        key={option}
        className={`flex items-center gap-2 rounded hover:bg-muted cursor-pointer ${
          isDefault ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-sm"
        }`}
      >
        <Checkbox
          checked={values.includes(option)}
          onCheckedChange={() => toggle(option)}
        />
        {displayLabel ? displayLabel(option) : option}
      </label>
    )
  }

  const filteredAll = filterOptions(allOptions)
  const hasResults = groups
    ? groups.some((g) => filterOptions(g.options).length > 0)
    : filteredAll.length > 0

  const searchTrimmed = search.trim()
  const showCreateOption = onAddNew && searchTrimmed && !allOptions.some((o) => {
    const label = displayLabel ? displayLabel(o) : o
    return label.toLowerCase() === searchTrimmed.toLowerCase()
  })

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        if (!o) setSearch("")
        onOpenChange?.(o)
      }}
    >
      <PopoverTrigger render={trigger} />
      <PopoverContent align={align} collisionPadding={collisionPadding} collisionAvoidance={collisionAvoidance} className={`${width} ${isDefault ? "p-3" : "p-2"}`}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className={isDefault ? "h-9 text-sm mb-2" : "h-7 text-xs mb-2"}
        />
        <div className={`overflow-y-auto mb-2 ${isDefault ? "max-h-[min(260px,calc(var(--available-height,400px)-140px))]" : "max-h-52"}`}>
          {showBulkActions && !search && (
            <label
              className={`flex items-center gap-2 rounded hover:bg-muted cursor-pointer border-b mb-1 pb-2 ${
                isDefault ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-sm"
              }`}
            >
              <Checkbox
                checked={allOptions.length > 0 && allOptions.every((o) => values.includes(o))}
                indeterminate={allOptions.some((o) => values.includes(o)) && !allOptions.every((o) => values.includes(o))}
                onCheckedChange={(checked) => { if (checked) selectAll(); else clearAll() }}
              />
              <span className="text-muted-foreground">Select all</span>
            </label>
          )}
          {groups ? (
            groups.map((group) => {
              const filtered = filterOptions(group.options)
              if (filtered.length === 0) return null
              const allGroupSelected = filtered.every((o) => values.includes(o))
              const someGroupSelected = filtered.some((o) => values.includes(o))
              return (
                <div key={group.label}>
                  {selectableGroups ? (
                    <label
                      className={`flex items-center gap-2 font-semibold cursor-pointer rounded hover:bg-muted ${
                        isDefault ? "px-3 pt-3 pb-1 text-sm" : "px-2 py-1.5 text-sm"
                      }`}
                    >
                      <Checkbox
                        checked={allGroupSelected}
                        indeterminate={!allGroupSelected && someGroupSelected}
                        onCheckedChange={() => toggleGroup(filtered)}
                      />
                      {group.label}
                    </label>
                  ) : (
                    <div className={`font-semibold uppercase tracking-wider text-muted-foreground ${
                      isDefault ? "px-3 pt-3 pb-1 text-[11px]" : "px-2 py-1.5 text-[10px]"
                    }`}>
                      {group.label}
                    </div>
                  )}
                  <div className={selectableGroups ? "space-y-0.5 pl-4" : "space-y-0.5"}>
                    {filtered.map(renderOption)}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="space-y-0.5">
              {filterOptions(allOptions).map(renderOption)}
            </div>
          )}
          {showCreateOption && (
            <button
              type="button"
              className="flex items-center gap-2 w-full px-2 py-1.5 rounded text-sm text-foreground hover:bg-muted cursor-pointer mt-0.5"
              onClick={() => {
                onAddNew!(searchTrimmed)
                setSearch("")
              }}
            >
              <PlusIcon className="size-3.5 text-muted-foreground" />
              {addNewLabel} "{searchTrimmed}"
            </button>
          )}
          {!hasResults && !showCreateOption && (
            <div className="text-xs text-muted-foreground px-2 py-1.5">{emptyMessage}</div>
          )}
        </div>
        {footer}
      </PopoverContent>
    </Popover>
  )
}
