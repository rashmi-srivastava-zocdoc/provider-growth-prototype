import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet'

interface AppointmentTypeItem {
  name: string
  tags?: string[]
}

const initialAppointmentTypes: AppointmentTypeItem[] = [
  { name: 'Default', tags: ['Fallback'] },
  { name: 'Annual physical' },
  { name: 'Complex / multi-issue visit' },
  { name: 'Dermatology consultation' },
  { name: 'Follow-up visit' },
  { name: 'New patient visit' },
  { name: 'Post-operative visit' },
  { name: 'Sick visit' },
  { name: 'Telehealth consultation' },
  { name: 'Urgent care visit' },
]

export function AppointmentTypes() {
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentTypeItem[]>(initialAppointmentTypes)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [nameError, setNameError] = useState('')

  function handleOpenChange(open: boolean) {
    setSheetOpen(open)
    if (!open) {
      setNameValue('')
      setNameError('')
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = nameValue.trim()
    if (!trimmed) {
      setNameError('Name is required')
      return
    }
    setAppointmentTypes(prev => [...prev, { name: trimmed }])
    setNameValue('')
    setSheetOpen(false)
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={handleOpenChange}>
      <div className="flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Appointment types</h1>
            <p className="text-sm text-muted-foreground mt-1">{appointmentTypes.length} appointment types</p>
          </div>
          <Button size="sm" onClick={() => setSheetOpen(true)}>
            <Plus className="size-4" />
            New appointment type
          </Button>
        </div>

        <div className="px-6 py-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search appointment types..." className="pl-9" />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {appointmentTypes.map((type) => (
                <tr key={type.name} className="border-b hover:bg-muted/50 cursor-pointer transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{type.name}</span>
                      {type.tags?.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>New appointment type</SheetTitle>
          <SheetDescription>Add a new type to your list.</SheetDescription>
        </SheetHeader>

        <form
          id="new-appt-type-form"
          onSubmit={handleSubmit}
          className="flex-1 px-4 py-2"
        >
          <Field>
            <FieldLabel htmlFor="appt-type-name">Name</FieldLabel>
            <Input
              id="appt-type-name"
              placeholder="e.g. Annual physical"
              value={nameValue}
              onChange={(e) => { setNameValue(e.target.value); setNameError('') }}
              autoFocus
            />
            <FieldError>{nameError}</FieldError>
          </Field>
        </form>

        <SheetFooter className="flex-row justify-end gap-2">
          <SheetClose render={<Button variant="outline" size="sm" />}>
            Cancel
          </SheetClose>
          <Button type="submit" form="new-appt-type-form" size="sm">
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
