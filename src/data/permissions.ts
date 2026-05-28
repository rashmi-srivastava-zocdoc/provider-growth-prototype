import type { PermissionArea } from "@/types"

export const permissionAreas: PermissionArea[] = [
  { id: "appointments", label: "Appointments", description: "Manage appointments, provider schedules, patient information, and submitted forms", category: "scheduling" },
  { id: "practice_settings", label: "Practice settings", description: "Manage locations, appointment types, booking rules, and forms", category: "operations" },
  { id: "provider_profiles", label: "Provider profiles", description: "Edit provider details, photos, specialties, and insurance acceptance", category: "operations" },
  { id: "user_management", label: "User management", description: "Add and remove users, assign roles and access", category: "operations" },
  { id: "billing", label: "Billing", description: "View and manage invoices, payment methods, and budget", category: "finance" },
  { id: "performance", label: "Performance", description: "View reports and analytics across all products", category: "marketing" },
  { id: "sponsored", label: "Sponsored Results", description: "Manage Sponsored campaigns, budgets, and performance", category: "marketing", productGated: "marketplace" },
  { id: "phone_assistant", label: "AI phone assistant", description: "Manage phone assistant settings and view call performance and transcripts", category: "practice_solutions", productGated: "practice_solutions" },
  { id: "live_calls", label: "Live calls", description: "Handle live calls forwarded by the AI phone assistant", category: "practice_solutions", productGated: "practice_solutions" },
]

export const permissionCategories = [
  { id: "scheduling", label: "Scheduling" },
  { id: "operations", label: "Operations" },
  { id: "finance", label: "Finance" },
  { id: "marketing", label: "Marketing" },
  { id: "practice_solutions", label: "Practice Solutions" },
] as const
