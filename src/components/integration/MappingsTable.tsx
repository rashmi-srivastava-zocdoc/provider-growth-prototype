import { useState } from "react"
import type { IntegrationMapping } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { ArrowRightIcon } from "lucide-react"

type FilterTab = "all" | "provider" | "location" | "appointment"

const entityBadgeLabel: Record<string, string> = {
  provider: "Provider",
  location: "Location",
  appointment: "Appt",
}

interface MappingsTableProps {
  mappings: IntegrationMapping[]
}

export function MappingsTable({ mappings }: MappingsTableProps) {
  const [tab, setTab] = useState<FilterTab>("all")

  const filtered = tab === "all" ? mappings : mappings.filter((m) => m.entityType === tab)
  const unmappedCount = mappings.filter((m) => m.status === "unmapped").length

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-medium">Mappings</h2>
          {unmappedCount > 0 && (
            <Badge variant="destructive">{unmappedCount} unmapped</Badge>
          )}
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as FilterTab)}>
        <TabsList variant="line">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="provider">Providers</TabsTrigger>
          <TabsTrigger value="location">Locations</TabsTrigger>
          <TabsTrigger value="appointment">Appts</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          <div className="rounded-xl border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="w-24">Type</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>EHR mapping</TableHead>
                  <TableHead className="w-20 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((mapping) => (
                  <TableRow key={mapping.id}>
                    <TableCell>
                      <Badge variant="secondary">{entityBadgeLabel[mapping.entityType]}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{mapping.name}</TableCell>
                    <TableCell>
                      {mapping.status === "mapped" ? (
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          <ArrowRightIcon className="size-3 text-muted-foreground" />
                          <Badge variant="outline" className="font-mono text-xs">
                            {mapping.ehrLabel} &middot; {mapping.ehrId}
                          </Badge>
                        </span>
                      ) : (
                        <span className="text-sm text-red-600 dark:text-red-400">Not mapped</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={mapping.status === "unmapped" ? "default" : "ghost"}
                        size="xs"
                        className={mapping.status === "mapped" ? "border-0" : ""}
                      >
                        {mapping.status === "mapped" ? "Edit" : "Fix"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
