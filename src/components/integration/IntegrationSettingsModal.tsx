import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangleIcon } from "lucide-react"

interface IntegrationSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function SkeletonTab() {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

export function IntegrationSettingsModal({ open, onOpenChange }: IntegrationSettingsModalProps) {
  const [tab, setTab] = useState("credentials")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Athena Integration Settings</DialogTitle>
          <DialogDescription>Practice ID 195900</DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList variant="line">
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="sync">Sync</TabsTrigger>
            <TabsTrigger value="writeback">Write-back</TabsTrigger>
            <TabsTrigger value="datasources">Data sources</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="credentials">
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-start gap-2 rounded-lg border border-amber-300/50 bg-amber-50 p-3 text-sm dark:border-amber-500/30 dark:bg-amber-950/30">
                <AlertTriangleIcon className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span className="text-amber-800 dark:text-amber-200">
                  API credentials expired. Re-authenticate to restore write-back.
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Client ID</label>
                <Input readOnly value="ath_cid_7f3a9b2e" className="bg-muted/50" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Practice ID</label>
                <Input readOnly value="195900" className="bg-muted/50" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Environment</label>
                <Input readOnly value="Production" className="bg-muted/50" />
              </div>

              <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                Re-authenticate with Athena
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sync"><SkeletonTab /></TabsContent>
          <TabsContent value="writeback"><SkeletonTab /></TabsContent>
          <TabsContent value="datasources"><SkeletonTab /></TabsContent>
          <TabsContent value="advanced"><SkeletonTab /></TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
