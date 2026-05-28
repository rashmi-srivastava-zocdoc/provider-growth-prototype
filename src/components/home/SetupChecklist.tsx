import React, { useState } from "react"
import {
  CheckCircle2,
  ArrowRight,
  Circle,
  Sparkles,
  ChevronDown,
  Lock,
  ExternalLink,
  ImageIcon,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { useHome } from "@/context/HomeContext"
import { useNavigate } from "@/lib/router"
import {
  setupTasksMVP,
  setupPhasesVision,
  providerSetupStatus,
  type SetupTaskMVP,
  type SetupPhaseVision,
} from "@/data/homeData"

interface SetupChecklistProps {
  variant: "mvp" | "vision"
}

// ── MVP Variant ──────────────────────────────────────────────

function TaskAccordionItem({
  task,
  isOpen,
  isLocked,
  isComplete,
  onToggle,
  onComplete,
}: {
  task: SetupTaskMVP
  isOpen: boolean
  isLocked: boolean
  isComplete: boolean
  onToggle: () => void
  onComplete: () => void
}) {
  if (isLocked) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-[#f9f8f7] dark:bg-muted/30 px-6 py-6">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-xs text-foreground/20">
          {task.step}
        </span>
        <span className="flex-1 text-lg font-semibold text-foreground/20">
          {task.label}
        </span>
        <Lock className="size-5 text-foreground/15" />
      </div>
    )
  }

  if (isComplete) {
    if (task.completeSummary?.type === "provider-status") {
      const { ready, pendingReview, needsInfo } = providerSetupStatus
      return (
        <div className="flex items-center gap-3 rounded-lg border bg-card px-6 py-6">
          <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
          <span className="flex-1 text-lg font-semibold">{task.label}</span>
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="font-medium">{ready} ready</span>
            </span>
            {pendingReview > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <span className="inline-flex items-center gap-1.5 cursor-default" />
                    }
                  >
                    <span className="size-2 rounded-full bg-blue-500" />
                    <span className="font-medium">{pendingReview} pending</span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[240px]">
                    Providers pending review are typically verified within 1–2 business days.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {needsInfo > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-amber-500" />
                <span className="font-medium">{needsInfo} missing info</span>
              </span>
            )}
            <span className="text-border">·</span>
            <button className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
              Manage providers
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-3 rounded-lg border bg-card px-6 py-6">
        <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
        <span className="flex-1 text-lg font-semibold">{task.label}</span>
        <span className="text-sm font-medium text-emerald-600">Complete</span>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card flex overflow-hidden">
      <div className="flex-1 min-w-0">
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-3 px-6 py-4 text-left cursor-pointer"
        >
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-foreground/30 text-xs font-medium">
            {task.step}
          </span>
          <span className="flex-1 text-lg font-semibold">{task.label}</span>
        </button>

        {isOpen && (
          <div className="px-6 pb-6 pl-[3.25rem]">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {task.dynamicDescription ? (
                <>
                  <span className="font-medium text-foreground">{providerSetupStatus.ready} of {providerSetupStatus.total} providers</span> are ready to go live.{" "}
                  {task.description}
                </>
              ) : (
                task.description
              )}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={onComplete}
                className="inline-flex items-center gap-2 rounded-full bg-[#FEED5A] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#FDE84A] transition-colors cursor-pointer"
              >
                {task.ctaLabel}
                <span>&rsaquo;</span>
              </button>
              {task.secondaryAction && task.prepInfo ? (
                <Dialog>
                  <DialogTrigger
                    render={
                      <button className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors cursor-pointer" />
                    }
                  >
                    {task.secondaryAction.label}
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold">
                        {task.prepInfo.title}
                      </DialogTitle>
                      <DialogDescription>
                        {task.prepInfo.description}
                      </DialogDescription>
                    </DialogHeader>
                    <ul className="space-y-3 py-2">
                      {task.prepInfo.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">
                            {item.text}
                            {item.hint && (
                              <span className="text-muted-foreground">
                                {" "}({item.hint}
                                {item.hintLink && (
                                  <>
                                    {" "}
                                    <a
                                      href={item.hintLink.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="underline underline-offset-2 hover:text-foreground transition-colors"
                                    >
                                      {item.hintLink.label}
                                    </a>
                                  </>
                                )}
                                )
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <DialogFooter>
                      <DialogClose render={<Button variant="default" />}>
                        Got it
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : task.secondaryAction ? (
                <button className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors">
                  {task.secondaryAction.label}
                  {task.secondaryAction.external && (
                    <ExternalLink className="size-3" />
                  )}
                </button>
              ) : null}
              {task.tertiaryAction && (
                <button className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors">
                  {task.tertiaryAction.label}
                  {task.tertiaryAction.external && (
                    <ExternalLink className="size-3" />
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="w-[200px] shrink-0 bg-muted/30 border-l border-dashed border-muted-foreground/15 flex items-center justify-center">
          <ImageIcon className="size-10 text-muted-foreground/20" />
        </div>
      )}
    </div>
  )
}

function MVPChecklist() {
  const { completedTaskIds, completeTask } = useHome()
  const navigate = useNavigate()

  const firstIncomplete = setupTasksMVP.find((t) => !completedTaskIds.has(t.id))
  const [expandedTask, setExpandedTask] = useState<string | null>(
    firstIncomplete?.id ?? null
  )

  const handleComplete = (taskId: string) => {
    if (taskId === "task-5") {
      navigate("/launch")
      return
    }
    completeTask(taskId)
    const next = new Set(completedTaskIds)
    next.add(taskId)
    const nextIncomplete = setupTasksMVP.find((t) => !next.has(t.id))
    setExpandedTask(nextIncomplete?.id ?? null)
  }

  return (
    <div className="space-y-2">
      {setupTasksMVP.map((task, index) => {
        const isComplete = completedTaskIds.has(task.id)
        const isLocked =
          !isComplete &&
          firstIncomplete !== undefined &&
          task.id !== firstIncomplete.id &&
          index > setupTasksMVP.indexOf(firstIncomplete)

        return (
          <React.Fragment key={task.id}>
            <TaskAccordionItem
              task={task}
              isOpen={expandedTask === task.id}
              isLocked={isLocked}
              isComplete={isComplete}
            onToggle={() =>
              setExpandedTask(
                expandedTask === task.id ? null : task.id
              )
            }
            onComplete={() => handleComplete(task.id)}
          />
          </React.Fragment>
        )
      })}
    </div>
  )
}

// ── Vision Variant ───────────────────────────────────────────

function PhaseStatusIcon({ status }: { status: SetupPhaseVision["status"] }) {
  switch (status) {
    case "complete":
      return <CheckCircle2 className="size-5 text-emerald-500" />
    case "in-progress":
      return <ArrowRight className="size-5 text-blue-500" />
    case "not-started":
      return <Circle className="size-5 text-muted-foreground" />
  }
}

function VisionChecklist() {
  const completedCount = setupPhasesVision.filter(
    (p) => p.status === "complete"
  ).length
  const totalCount = setupPhasesVision.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  const [openPhase, setOpenPhase] = useState<string | null>("phase-2")

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Setup your practice</h2>
        <span className="text-sm text-muted-foreground">
          {completedCount} of {totalCount}
        </span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-4 space-y-1">
        {setupPhasesVision.map((phase) => {
          const isOpen = openPhase === phase.id
          return (
            <Collapsible
              key={phase.id}
              open={isOpen}
              onOpenChange={(open) =>
                setOpenPhase(open ? phase.id : null)
              }
            >
              <CollapsibleTrigger className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-muted/50 transition-colors">
                <PhaseStatusIcon status={phase.status} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">
                    Phase {phase.phase}: {phase.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {phase.subtitle}
                  </div>
                </div>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pl-11 pr-3 pb-2">
                  {phase.aiAnnotation && (
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 mt-1">
                      <div className="flex items-start gap-2">
                        <Sparkles className="size-4 text-blue-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {phase.aiAnnotation}
                        </p>
                      </div>
                    </div>
                  )}
                  {phase.actionLabel && (
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        {phase.actionLabel}
                      </Button>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </div>
    </div>
  )
}

// ── Export ────────────────────────────────────────────────────

export function SetupChecklist({ variant }: SetupChecklistProps) {
  return variant === "mvp" ? <MVPChecklist /> : <VisionChecklist />
}
