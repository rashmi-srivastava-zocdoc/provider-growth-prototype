import type { PracticeData, Provider } from "@/types"

export interface ActionChange {
  field: string
  from: string
  to: string
}

export interface ActionReviewItem {
  id: string
  label: string
  subtitle?: string
  initials?: string
  changes: ActionChange[]
}

export interface ActionReviewData {
  description: string
  items: ActionReviewItem[]
  status: "pending" | "applied" | "dismissed"
}

export interface AIResponsePayload {
  content: string
  actionReview?: ActionReviewData
}

const MUTATION_VERBS = [
  "update",
  "change",
  "set",
  "modify",
  "pause",
  "resume",
  "unpause",
  "deactivate",
  "activate",
  "add insurance",
  "remove insurance",
  "reassign",
  "move to",
]

export function detectMutationIntent(msg: string): boolean {
  const m = msg.toLowerCase()
  return MUTATION_VERBS.some(v => m.includes(v))
}

export function resolveProviders(msg: string, p: PracticeData): Provider[] {
  const m = msg.toLowerCase()

  if (m.includes("all provider") || m.includes("every provider") || m.includes("everyone")) {
    return p.providers
  }

  const byName = p.providers.filter(pr => {
    const last = pr.name.split(" ").pop()?.toLowerCase() ?? ""
    return last.length > 2 && m.includes(last)
  })
  if (byName.length > 0) return byName

  for (const loc of p.locations) {
    if (m.includes(loc.name.toLowerCase())) {
      return p.providers.filter(pr => pr.locationIds.includes(loc.id))
    }
  }

  const bySpec = p.providers.filter(pr => pr.specialties.some(s => m.includes(s.toLowerCase())))
  if (bySpec.length > 0) return bySpec

  return p.providers
}

function makeItems(
  providers: Provider[],
  changeFn: (pr: Provider) => ActionChange[],
): ActionReviewItem[] {
  return providers.map(pr => ({
    id: pr.id,
    label: `${pr.name}, ${pr.suffix}`,
    subtitle: pr.specialties[0],
    initials: pr.initials,
    changes: changeFn(pr),
  }))
}

export function buildMutationReview(
  msg: string,
  providers: Provider[],
  p: PracticeData,
): AIResponsePayload {
  const m = msg.toLowerCase()
  const count = providers.length
  const s = count !== 1 ? "s" : ""

  if (m.includes("lead time")) {
    const match = msg.match(/(\d+)\s*(hour|day)/i)
    const newVal = match ? `${match[1]} ${match[2]}s` : "48 hours"
    return {
      content: `I'll update the lead time for **${count} provider${s}**. Please review the changes:`,
      actionReview: {
        description: `Update lead time to ${newVal}`,
        status: "pending",
        items: makeItems(providers, () => [
          { field: "Lead time", from: "24 hours", to: newVal },
        ]),
      },
    }
  }

  if (m.includes("pause") || m.includes("inactive") || m.includes("deactivate")) {
    return {
      content: `I'll pause channels for **${count} provider${s}**. Please review:`,
      actionReview: {
        description: "Pause provider channels",
        status: "pending",
        items: makeItems(providers, () => [
          { field: "Channel status", from: "Live", to: "Paused" },
        ]),
      },
    }
  }

  if (m.includes("resume") || m.includes("unpause") || (m.includes("activate") && !m.includes("deactivate"))) {
    return {
      content: `I'll resume channels for **${count} provider${s}**. Please review:`,
      actionReview: {
        description: "Resume provider channels",
        status: "pending",
        items: makeItems(providers, () => [
          { field: "Channel status", from: "Paused", to: "Live" },
        ]),
      },
    }
  }

  if (m.includes("location") || m.includes("reassign") || m.includes("move to")) {
    const loc = p.locations.find(l => m.includes(l.name.toLowerCase()))
    const toName = loc?.name ?? p.locations[0]?.name ?? "New location"
    return {
      content: `I'll update the location for **${count} provider${s}**. Please review:`,
      actionReview: {
        description: `Reassign to ${toName}`,
        status: "pending",
        items: makeItems(providers, pr => {
          const from =
            pr.locationIds
              .map(id => p.locations.find(l => l.id === id)?.name)
              .filter(Boolean)
              .join(", ") || "None"
          return [{ field: "Location", from, to: toName }]
        }),
      },
    }
  }

  if (m.includes("insurance")) {
    const name = m.includes("aetna")
      ? "Aetna"
      : m.includes("cigna")
        ? "Cigna"
        : m.includes("united")
          ? "UnitedHealthcare"
          : "New plan"
    return {
      content: `I'll add **${name}** coverage for **${count} provider${s}**. Please review:`,
      actionReview: {
        description: `Add ${name} coverage`,
        status: "pending",
        items: makeItems(providers, pr => [
          {
            field: "Insurance",
            from: `${pr.acceptedInsurancesAndPayments.insuranceCount} plans`,
            to: `${pr.acceptedInsurancesAndPayments.insuranceCount + 1} plans (+${name})`,
          },
        ]),
      },
    }
  }

  return {
    content: `I'll make changes to **${count} provider${s}**. Please review:`,
    actionReview: {
      description: msg.length > 80 ? msg.slice(0, 77) + "..." : msg,
      status: "pending",
      items: makeItems(providers, () => [
        { field: "Update", from: "Current", to: "Updated" },
      ]),
    },
  }
}

export function tryBuildMutationResponse(
  msg: string,
  page: string,
  p: PracticeData,
): AIResponsePayload | null {
  if (page === "Providers" && detectMutationIntent(msg)) {
    const targets = resolveProviders(msg, p)
    if (targets.length > 0) return buildMutationReview(msg, targets, p)
  }
  return null
}
