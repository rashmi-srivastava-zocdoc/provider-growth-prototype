import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { MultiSelectPopover } from "@/components/ui/multi-select-popover"
import { AlertTriangleIcon, LinkIcon, XIcon } from "lucide-react"

// ── Editable Text (click-to-edit single line) ──────────────

interface EditableTextProps {
  value: string
  onSave: (value: string) => void
  placeholder?: string
  className?: string
}

export function EditableText({ value, onSave, placeholder, className }: EditableTextProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setDraft(value) }, [value])
  useEffect(() => { if (editing) inputRef.current?.focus() }, [editing])

  function commit() {
    setEditing(false)
    if (draft.trim() !== value) onSave(draft.trim())
  }

  if (editing) {
    return (
      <Input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit()
          if (e.key === "Escape") { setDraft(value); setEditing(false) }
        }}
        className="h-7 text-sm px-1.5 -mx-1.5"
      />
    )
  }

  return (
    <span
      className={`text-sm cursor-pointer rounded px-1.5 -mx-1.5 py-0.5 hover:bg-muted transition-colors ${className ?? ""}`}
      onClick={() => setEditing(true)}
    >
      {value || <span className="text-muted-foreground italic">{placeholder ?? "Click to add"}</span>}
    </span>
  )
}

// ── Editable Textarea (click-to-edit multiline) ────────────

interface EditableTextareaProps {
  value: string
  onSave: (value: string) => void
  placeholder?: string
}

export function EditableTextarea({ value, onSave, placeholder }: EditableTextareaProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { setDraft(value) }, [value])
  useEffect(() => { if (editing) ref.current?.focus() }, [editing])

  function commit() {
    setEditing(false)
    if (draft.trim() !== value) onSave(draft.trim())
  }

  if (editing) {
    return (
      <div className="space-y-1.5">
        <Textarea
          ref={ref}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") { setDraft(value); setEditing(false) }
          }}
          rows={3}
          className="text-sm"
        />
        <div className="flex gap-1.5">
          <Button size="sm" variant="default" onClick={commit} className="h-7 text-xs">Save</Button>
          <Button size="sm" variant="ghost" onClick={() => { setDraft(value); setEditing(false) }} className="h-7 text-xs border-0">Cancel</Button>
        </div>
      </div>
    )
  }

  return (
    <p
      className="text-sm leading-relaxed cursor-pointer rounded px-1.5 -mx-1.5 py-0.5 hover:bg-muted transition-colors"
      onClick={() => setEditing(true)}
    >
      {value || <span className="text-muted-foreground italic">{placeholder ?? "Click to add"}</span>}
    </p>
  )
}

// ── Editable Toggle (inline switch) ────────────────────────

interface EditableToggleProps {
  value: boolean
  onSave: (value: boolean) => void
}

export function EditableToggle({ value, onSave }: EditableToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch size="sm" checked={value} onCheckedChange={onSave} />
      <span className="text-sm">{value ? "Yes" : "No"}</span>
    </div>
  )
}

// ── Editable Tag List (popover multi-select) ───────────────

interface EditableTagListProps {
  values: string[]
  options: string[]
  onSave: (values: string[]) => void
  variant?: "outline" | "destructive" | "secondary"
  placeholder?: string
}

export function EditableTagList({ values, options, onSave, variant = "outline", placeholder }: EditableTagListProps) {
  function removeTag(tag: string) {
    onSave(values.filter((v) => v !== tag))
  }

  return (
    <MultiSelectPopover
      values={values}
      onValuesChange={onSave}
      options={options}
      width="w-64"
      trigger={
        <div className="flex flex-wrap gap-1 cursor-pointer rounded px-1.5 -mx-1.5 py-0.5 hover:bg-muted transition-colors min-h-[28px] items-center">
          {values.length > 0 ? values.map((v) => (
            <Badge key={v} variant={variant} className="text-xs font-normal gap-1">
              {v}
              <button
                type="button"
                className="hover:text-foreground"
                onClick={(e) => { e.stopPropagation(); removeTag(v) }}
              >
                <XIcon className="size-2.5" />
              </button>
            </Badge>
          )) : (
            <span className="text-sm text-muted-foreground italic">{placeholder ?? "Click to add"}</span>
          )}
        </div>
      }
    />
  )
}

// ── Guarded Editable Tag List (popover with warning + confirm) ──

export type { OptionGroup } from "@/components/ui/multi-select-popover"

interface GuardedEditableTagListProps {
  values: string[]
  options?: string[]
  groups?: OptionGroup[]
  onSave: (values: string[]) => void
  warning: string
  saveLabel?: string
  variant?: "outline" | "destructive" | "secondary"
  placeholder?: string
  displayLabel?: (value: string) => string
  tagLabel?: (value: string) => string
  showBulkActions?: boolean
  onAddNew?: (value: string) => void
  addNewLabel?: string
}

export function GuardedEditableTagList({
  values,
  options,
  groups,
  onSave,
  warning,
  saveLabel = "Save & Re-verify",
  variant = "outline",
  placeholder,
  displayLabel,
  tagLabel,
  showBulkActions,
  onAddNew,
  addNewLabel,
}: GuardedEditableTagListProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<string[]>(values)

  useEffect(() => { setDraft(values) }, [values])

  function commit() {
    onSave(draft)
    setOpen(false)
  }

  function cancel() {
    setDraft(values)
    setOpen(false)
  }

  const hasChanges = JSON.stringify(draft.slice().sort()) !== JSON.stringify(values.slice().sort())

  return (
    <MultiSelectPopover
      open={open}
      onOpenChange={(o) => {
        if (o) setDraft(values)
        setOpen(o)
      }}
      values={draft}
      onValuesChange={setDraft}
      options={options}
      groups={groups}
      displayLabel={displayLabel}
      showBulkActions={showBulkActions}
      onAddNew={onAddNew}
      addNewLabel={addNewLabel}
      trigger={
        <div className="flex flex-wrap gap-1 cursor-pointer rounded px-1.5 -mx-1.5 py-0.5 hover:bg-muted transition-colors min-h-[28px] items-center">
          {values.length > 0 ? values.map((v) => (
            <Badge key={v} variant={variant} className="text-xs font-normal">
              {tagLabel ? tagLabel(v) : v}
            </Badge>
          )) : (
            <span className="text-sm text-muted-foreground italic">{placeholder ?? "Click to add"}</span>
          )}
        </div>
      }
      footer={
        <>
          {hasChanges && (
            <div className="flex items-start gap-2 rounded-md bg-amber-50 dark:bg-amber-950/30 px-3 py-2 mb-2">
              <AlertTriangleIcon className="size-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">{warning}</p>
            </div>
          )}
          <div className="flex gap-1.5">
            <Button size="sm" onClick={commit} disabled={!hasChanges} className="h-7 text-xs">{saveLabel}</Button>
            <Button size="sm" variant="ghost" onClick={cancel} className="h-7 text-xs border-0">Cancel</Button>
          </div>
        </>
      }
    />
  )
}

// ── Editable Field Popover (click text → popover with structured fields) ──

export interface FieldDef {
  key: string
  label: string
  value: string
  placeholder?: string
  options?: string[]
}

interface EditableFieldPopoverProps {
  displayValue: string
  fields: FieldDef[]
  onSave: (values: Record<string, string>) => void
  placeholder?: string
}

export function EditableFieldPopover({ displayValue, fields, onSave, placeholder }: EditableFieldPopoverProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.key, f.value]))
  )

  useEffect(() => {
    setDraft(Object.fromEntries(fields.map((f) => [f.key, f.value])))
  }, [fields.map((f) => f.value).join("|")])

  function commit() {
    onSave(draft)
    setOpen(false)
  }

  function cancel() {
    setDraft(Object.fromEntries(fields.map((f) => [f.key, f.value])))
    setOpen(false)
  }

  const hasChanges = fields.some((f) => (draft[f.key] ?? "").trim() !== f.value)

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        if (o) setDraft(Object.fromEntries(fields.map((f) => [f.key, f.value])))
        setOpen(o)
      }}
    >
      <PopoverTrigger
        render={
          <span className="text-sm cursor-pointer rounded px-1.5 -mx-1.5 py-0.5 hover:bg-muted transition-colors" />
        }
      >
        {displayValue || <span className="text-muted-foreground italic">{placeholder ?? "Click to add"}</span>}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 p-3">
        <div className="space-y-2.5 mb-3">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1 block">
                {field.label}
              </label>
              {field.options ? (
                <Select
                  value={draft[field.key] ?? ""}
                  onValueChange={(v) => setDraft((prev) => ({ ...prev, [field.key]: v as string }))}
                >
                  <SelectTrigger size="sm" className="w-full">
                    <SelectValue placeholder={field.placeholder ?? field.label} />
                  </SelectTrigger>
                  <SelectContent align="start" alignItemWithTrigger={false}>
                    {field.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={draft[field.key] ?? ""}
                  onChange={(e) => setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder ?? field.label}
                  className="h-8 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commit()
                    if (e.key === "Escape") cancel()
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <Button size="sm" onClick={commit} disabled={!hasChanges} className="h-7 text-xs">Save</Button>
          <Button size="sm" variant="ghost" onClick={cancel} className="h-7 text-xs border-0">Cancel</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ── Guarded Editable Text (popover with warning) ───────────

interface GuardedEditableTextProps {
  value: string
  onSave: (value: string) => void
  warning: string
  saveLabel?: string
}

export function GuardedEditableText({ value, onSave, warning, saveLabel = "Save & Re-verify" }: GuardedEditableTextProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(value)

  useEffect(() => { setDraft(value) }, [value])

  function commit() {
    if (draft.trim() !== value) onSave(draft.trim())
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <span className="cursor-pointer border-b border-dashed border-muted-foreground/40 hover:border-foreground/60 transition-colors" />
        }
      >
        {value}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 p-3">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="h-8 text-sm mb-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") commit()
            if (e.key === "Escape") { setDraft(value); setOpen(false) }
          }}
        />
        <div className="flex items-start gap-2 rounded-md bg-amber-50 dark:bg-amber-950/30 px-3 py-2 mb-3">
          <AlertTriangleIcon className="size-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">{warning}</p>
        </div>
        <div className="flex gap-1.5">
          <Button size="sm" onClick={commit} className="h-7 text-xs">{saveLabel}</Button>
          <Button size="sm" variant="ghost" onClick={() => { setDraft(value); setOpen(false) }} className="h-7 text-xs border-0">Cancel</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ── Synced Field (read-only with source popover) ───────────

interface SyncedFieldProps {
  value: string | React.ReactNode
  sourceName: string
  lastSynced?: string
}

export function SyncedField({ value, sourceName, lastSynced }: SyncedFieldProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <span className="text-sm cursor-pointer inline-flex items-center gap-1.5 rounded px-1.5 -mx-1.5 py-0.5 hover:bg-muted transition-colors" />
        }
      >
        {value}
        <LinkIcon className="size-3 text-muted-foreground/60 shrink-0" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LinkIcon className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Managed by {sourceName}</span>
          </div>
          {lastSynced && (
            <p className="text-xs text-muted-foreground">Last synced {new Date(lastSynced).toLocaleDateString()}</p>
          )}
          <p className="text-xs text-muted-foreground leading-relaxed">
            To update this field, edit the value in {sourceName} and it will sync automatically.
          </p>
          <div className="flex gap-1.5 pt-1">
            <Button size="sm" variant="outline" className="h-7 text-xs">Go to source</Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs border-0">Override manually</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
