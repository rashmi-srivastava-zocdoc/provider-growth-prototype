// ── Types ──────────────────────────────────────────────────────

export interface PrepItem {
  text: string
  hint?: string
  hintLink?: { label: string; url: string }
}

export interface PrepInfo {
  title: string
  description: string
  items: PrepItem[]
}

export interface SetupTaskMVP {
  id: string
  step: number
  label: string
  description: string
  dynamicDescription?: boolean
  requiredFor: string[]
  ctaLabel: string
  secondaryAction?: { label: string; external?: boolean }
  tertiaryAction?: { label: string; external?: boolean }
  prepInfo?: PrepInfo
  completeSummary?: { type: "provider-status" }
  complete: boolean
}

export interface SetupPhaseVision {
  id: string
  phase: number
  title: string
  status: "complete" | "in-progress" | "not-started"
  subtitle: string
  aiAnnotation?: string
  actionLabel?: string
}

export interface ProductCard {
  id: string
  productId: "bookable_presence" | "marketplace" | "practice_solutions"
  title: string
  description: string
  price: string
  priceDetail?: string
  status: "not-started" | "done" | "in-progress"
  actionLabel: string
  illustration: string
}

export interface PerformanceData {
  bookingsThisMonth: number
  bookingsLastMonth: number
  completionRate: number
  completionRateTrend: number
  spend: number
  spendStatus: "on-pace" | "over" | "under"
  alertCount: number
  newPatients: number
  newPatientPercent: number
  existingPatients: number
  existingPatientPercent: number
  totalReviews: number
}

export interface ProviderHealthItem {
  id: string
  name: string
  status: "active" | "no-availability" | "needs-review" | "new"
  metric?: string
  trend?: "up" | "down" | "stable"
}

export interface RecommendationCard {
  id: string
  variant: "mvp" | "vision"
  title: string
  description: string
  illustration: string
  actionLabel: string
  investment?: string
  impact?: string
}

export interface AlertItem {
  id: string
  severity: "error" | "warning" | "info"
  title: string
  description: string
  timestamp: string
  actionLabel: string
}

export interface InboxItem {
  id: string
  patientName: string
  visitType: string
  time: string
  status: "new" | "pending" | "dealt-with"
}

export interface ScheduleItem {
  id: string
  time: string
  patientName: string
  visitType: string
  providerName?: string
  status: "confirmed" | "pending" | "checked-in"
}

export interface TodoItem {
  id: string
  type: "action" | "setup"
  title: string
  description?: string
  actionLabel: string
}

export interface ProductExploreCard {
  id: string
  productId: "marketplace" | "practice_solutions"
  tag: string
  title: string
  hook: string
  actionLabel: string
}

export interface AIBriefing {
  summary: string
  suggestions: string[]
}


// ── Mock Data ──────────────────────────────────────────────────

// ── Setup Tasks (MVP) ──────────────────────────────────────────

export const setupTasksMVP: SetupTaskMVP[] = [
  {
    id: "task-1",
    step: 1,
    label: "Add providers",
    description: "Add your providers and locations to get started. Enter an NPI to pre-fill a profile automatically.",
    requiredFor: [],
    ctaLabel: "Add providers",
    secondaryAction: { label: "What you'll need" },
    prepInfo: {
      title: "Here's what you'll need to prepare",
      description: "To submit a provider profile for approval, here's the information you'll need to gather",
      items: [
        {
          text: "Their NPI number",
          hint: "if you don't have it handy, you can find it on the",
          hintLink: { label: "NPI registry", url: "https://npiregistry.cms.hhs.gov" },
        },
        { text: "At least one office address" },
        { text: "A headshot (JPG or PNG, max 5 MB)" },
        {
          text: "At least one specialty and professional suffix",
          hint: "if this information isn't pulled in automatically by providing their NPI number",
        },
        { text: "An administrative contact (name, email and phone number)" },
        {
          text: "The provider's education",
          hint: "if this information isn't pulled in automatically by providing their NPI number",
        },
        { text: "Patients the provider accepts (adult and/or pediatric)" },
      ],
    },
    completeSummary: { type: "provider-status" },
    complete: false,
  },
  {
    id: "task-2",
    step: 2,
    label: "Verify your identity",
    description: "Confirm you're authorized to manage this practice and its providers. This is a quick, secure check through Stripe that only takes a few minutes.",
    requiredFor: [],
    ctaLabel: "Start verification",
    secondaryAction: { label: "What you'll need" },
    prepInfo: {
      title: "Here's what you'll need",
      description: "To verify your identity, have the following ready",
      items: [
        { text: "Your full legal name" },
        { text: "Date of birth" },
        { text: "Social Security Number (last 4 digits)" },
        { text: "A government-issued photo ID" },
      ],
    },
    complete: false,
  },
  {
    id: "task-3",
    step: 3,
    label: "Enter your insurance information",
    description: "Add the insurance plans your providers accept so the right patients can find and book with you.",
    requiredFor: [],
    ctaLabel: "Add insurance plans",
    secondaryAction: { label: "What you'll need" },
    complete: false,
  },
  {
    id: "task-4",
    step: 4,
    label: "Set up your calendar",
    description: "Connect your EHR to sync availability automatically, or set your hours manually so patients always see up-to-date openings.",
    requiredFor: [],
    ctaLabel: "Set up your calendar",
    secondaryAction: { label: "What you'll need" },
    complete: false,
  },
  {
    id: "task-5",
    step: 5,
    label: "Launch your bookable online practice",
    dynamicDescription: true,
    description: "Launch your providers across 30+ channels. You can add more providers, update profiles, and adjust settings anytime after launch.",
    requiredFor: [],
    ctaLabel: "Launch your practice",
    secondaryAction: { label: "Preview profiles" },
    tertiaryAction: { label: "What to expect" },
    complete: false,
  },
]

export const providerSetupStatus = {
  total: 8,
  ready: 5,
  pendingReview: 1,
  needsInfo: 2,
  needsInfoDetails: [
    { name: "Dr. Anjali Patel", missing: "headshot" },
    { name: "Dr. Robert Klein", missing: "specialty" },
  ],
}

// ── Setup Phases (Vision) ──────────────────────────────────────

export const setupPhasesVision: SetupPhaseVision[] = [
  {
    id: "phase-1",
    phase: 1,
    title: "Connect your systems",
    status: "complete",
    subtitle: "Athena connected · Last sync 2 min ago",
  },
  {
    id: "phase-2",
    phase: 2,
    title: "Review your data",
    status: "in-progress",
    subtitle: "12 providers synced, 2 locations mapped",
    aiAnnotation:
      "We synced 12 providers and pre-filled profiles from NPPES. 2 need headshots, 1 location missing insurance.",
    actionLabel: "Review",
  },
  {
    id: "phase-3",
    phase: 3,
    title: "Activate products",
    status: "not-started",
    subtitle: "Choose your products and go live.",
  },
]

// ── Product Cards (Pre-Activation) ─────────────────────────────

export const productCards: ProductCard[] = [
  {
    id: "prod-mp",
    productId: "marketplace",
    title: "Activate your practice on the Zocdoc Marketplace",
    description: "Connect with millions of patients who are looking for care on Zocdoc",
    price: "PAID",
    status: "not-started",
    actionLabel: "Finish setup",
    illustration: "🤝",
  },
  {
    id: "prod-bp",
    productId: "bookable_presence",
    title: "Display your availability on Google and other search engines",
    description: "Let patients see your availability and book with you directly from Google and others",
    price: "FREE",
    status: "not-started",
    actionLabel: "Finish setup",
    illustration: "🔍",
  },
  {
    id: "prod-ps",
    productId: "practice_solutions",
    title: "Add branded booking and an AI phone assistant to your practice",
    description: "Own your patient experience with branded scheduling on your website and 24/7 phone coverage",
    price: "PAID",
    status: "not-started",
    actionLabel: "Finish setup",
    illustration: "💻",
  },
]

// ── Product Cards (Post-Activation) ────────────────────────────

export const productCardsPostActivation: ProductCard[] = [
  {
    id: "prod-bp",
    productId: "bookable_presence",
    title: "Bookable Presence",
    description: "Bookable provider profiles across 30+ channels",
    price: "FREE",
    status: "done",
    actionLabel: "Manage",
    illustration: "🌐",
  },
  {
    id: "prod-mp",
    productId: "marketplace",
    title: "Marketplace",
    description: "Get discovered by patients searching for care on Zocdoc and partners",
    price: "$40–60 / new patient booking",
    status: "done",
    actionLabel: "Manage",
    illustration: "🔍",
  },
  {
    id: "prod-ps",
    productId: "practice_solutions",
    title: "Practice Solutions",
    description: "Branded booking on your website, AI phone assistant, and advanced scheduling tools",
    price: "$350 / month per provider",
    status: "not-started",
    actionLabel: "Activate",
    illustration: "🏥",
  },
]

// ── Performance Data ───────────────────────────────────────────

export const performanceData: PerformanceData = {
  bookingsThisMonth: 27,
  bookingsLastMonth: 12,
  completionRate: 87,
  completionRateTrend: -2,
  spend: 3400,
  spendStatus: "on-pace",
  alertCount: 2,
  newPatients: 17,
  newPatientPercent: 63,
  existingPatients: 10,
  existingPatientPercent: 37,
  totalReviews: 350,
}

// ── Provider Health Items ──────────────────────────────────────

export const providerHealthItems: ProviderHealthItem[] = [
  { id: "ph-1", name: "Dr. Rachel Nguyen", status: "active", metric: "18 bookings/wk", trend: "up" },
  { id: "ph-2", name: "Dr. Michael Torres", status: "active", metric: "15 bookings/wk", trend: "stable" },
  { id: "ph-3", name: "Dr. Emily Lawson", status: "active", metric: "14 bookings/wk", trend: "up" },
  { id: "ph-4", name: "Dr. James Okafor", status: "active", metric: "12 bookings/wk", trend: "stable" },
  { id: "ph-5", name: "Dr. Lisa Chang", status: "active", metric: "11 bookings/wk", trend: "stable" },
  { id: "ph-6", name: "Dr. David Reyes", status: "active", metric: "10 bookings/wk", trend: "up" },
  { id: "ph-7", name: "Dr. Amanda Foster", status: "active", metric: "9 bookings/wk", trend: "stable" },
  { id: "ph-8", name: "Dr. Robert Klein", status: "active", metric: "4 bookings/wk", trend: "down" },
  { id: "ph-9", name: "Dr. Priya Sharma", status: "active", metric: "8 bookings/wk", trend: "stable" },
  { id: "ph-10", name: "Dr. Kevin Matthews", status: "active", metric: "7 bookings/wk", trend: "stable" },
  { id: "ph-11", name: "Dr. Maria Gonzalez", status: "no-availability", metric: "0 bookings/wk" },
  { id: "ph-12", name: "Dr. Anjali Patel", status: "new" },
]

// ── Recommendations (MVP) ──────────────────────────────────────

export const recommendationsMVP: RecommendationCard[] = [
  {
    id: "rec-mvp-1",
    variant: "mvp",
    title: "Boost your profiles with reviews",
    description:
      "Providers with 10+ reviews get 3x more bookings. Send review requests to recent patients in a few clicks.",
    illustration: "⭐",
    actionLabel: "Request reviews",
  },
  {
    id: "rec-mvp-2",
    variant: "mvp",
    title: "Get dedicated 1:1 support from Zocdoc",
    description:
      "Our team can walk you through selecting the right products and setting up your account.",
    illustration: "🧑‍💻",
    actionLabel: "Schedule a call",
  },
]

// ── Recommendations (Vision) ───────────────────────────────────

export const recommendationsVision: RecommendationCard[] = [
  {
    id: "rec-vis-1",
    variant: "vision",
    title: "Boost your reviews",
    description:
      "5 providers have fewer than 20 reviews. Practices that respond see 12% more bookings.",
    illustration: "⭐",
    actionLabel: "Start",
    investment: "5 min",
    impact: "+12% bookings",
  },
  {
    id: "rec-vis-2",
    variant: "vision",
    title: "Add Branded Directory to Brooklyn",
    description:
      "Brooklyn has high web traffic but no Branded Directory. Similar practices convert 23% more visitors.",
    illustration: "📈",
    actionLabel: "Learn more",
    investment: "15 min",
    impact: "+23% conversions",
  },
]

// ── Alert Items ────────────────────────────────────────────────

export const alertItems: AlertItem[] = [
  {
    id: "alert-1",
    severity: "warning",
    title: "Sync error — Midtown",
    description: "Athena hasn’t synced in 12 hours. Provider availability may be stale.",
    timestamp: "2026-05-18T06:14:00Z",
    actionLabel: "Troubleshoot",
  },
  {
    id: "alert-2",
    severity: "info",
    title: "New provider detected in Athena",
    description: "Dr. Sarah Kim (NPI: •••4829) was added to your Athena roster.",
    timestamp: "2026-05-17T19:42:00Z",
    actionLabel: "Review",
  },
  {
    id: "alert-gbp",
    severity: "warning",
    title: "5 providers missing Google Business profiles",
    description: "Connect Google Business Profile to let patients book directly from Google Search and Maps.",
    timestamp: "2026-05-19T10:00:00Z",
    actionLabel: "Connect",
  },
]

// ── Todo Items ─────────────────────────────────────────────────

export const todoItems: TodoItem[] = [
  {
    id: "todo-1",
    type: "action",
    title: "You have 6 bookings that require action",
    actionLabel: "View bookings",
  },
  {
    id: "todo-profiles",
    type: "action",
    title: "2 provider profiles are incomplete",
    description:
      "Dr. Anjali Patel is missing a headshot. Dr. Robert Klein is missing a specialty.",
    actionLabel: "Complete profiles",
  },
  {
    id: "todo-gbp",
    type: "setup",
    title: "5 providers couldn't be auto-connected to Google",
    description:
      "Dr. Marcus Williams, Emma Rodriguez, Dr. Maria Vasquez, Sophia Reyes, Dr. Robert Stein need to be manually linked to their Google Business Profile so patients can book from Search and Maps.",
    actionLabel: "Connect now",
  },
  {
    id: "todo-intake",
    type: "setup",
    title: "Set up patient intake forms",
    description:
      "Choose which forms and questions patients fill out before their visit.",
    actionLabel: "Set up intake",
  },
  {
    id: "todo-visits",
    type: "setup",
    title: "Customize the visits you accept",
    description:
      "Define which services patients can book so the right patients come to you.",
    actionLabel: "Edit visit types",
  },
  {
    id: "todo-reviews",
    type: "setup",
    title: "Boost your profiles with reviews",
    description:
      "Providers with 10+ reviews get 3x more bookings. Send review requests to recent patients.",
    actionLabel: "Request reviews",
  },
]

// ── Product Explore Cards (Post-Activation Upsell) ────────────

export const productExploreCards: ProductExploreCard[] = [
  {
    id: "explore-mp",
    productId: "marketplace",
    tag: "Reach new patients",
    title: "Marketplace",
    hook: "You're bookable on 30+ channels. Marketplace puts you in front of patients actively searching for care on Zocdoc, Healthgrades, and Yelp.",
    actionLabel: "Learn more",
  },
  {
    id: "explore-ps",
    productId: "practice_solutions",
    tag: "Own your patient experience",
    title: "Practice Solutions",
    hook: "Branded booking on your website, an AI phone assistant that handles calls 24/7, and advanced scheduling tools for your practice.",
    actionLabel: "Learn more",
  },
]

// ── Inbox Items ────────────────────────────────────────────────

export const inboxItems: InboxItem[] = [
  {
    id: "inbox-1",
    patientName: "Marcus Johnson",
    visitType: "New Patient Visit",
    time: "Today, 10:30 AM",
    status: "new",
  },
  {
    id: "inbox-2",
    patientName: "Elena Vasquez",
    visitType: "Sick Visit",
    time: "Today, 11:00 AM",
    status: "new",
  },
  {
    id: "inbox-3",
    patientName: "David Park",
    visitType: "Follow-Up Visit",
    time: "Today, 1:15 PM",
    status: "pending",
  },
  {
    id: "inbox-4",
    patientName: "Amara Osei",
    visitType: "Annual Physical",
    time: "Yesterday, 3:00 PM",
    status: "dealt-with",
  },
]

// ── Schedule Items ─────────────────────────────────────────────

export const scheduleItems: ScheduleItem[] = [
  {
    id: "sched-1",
    time: "9:00 AM",
    patientName: "Linda Morales",
    visitType: "New Patient Visit",
    providerName: "Dr. Rachel Nguyen",
    status: "checked-in",
  },
  {
    id: "sched-2",
    time: "9:30 AM",
    patientName: "James Wu",
    visitType: "Follow-Up Visit",
    providerName: "Dr. Michael Torres",
    status: "confirmed",
  },
  {
    id: "sched-3",
    time: "10:30 AM",
    patientName: "Marcus Johnson",
    visitType: "New Patient Visit",
    providerName: "Dr. Emily Lawson",
    status: "pending",
  },
  {
    id: "sched-4",
    time: "11:15 AM",
    patientName: "Catherine Brooks",
    visitType: "Sick Visit",
    providerName: "Dr. Rachel Nguyen",
    status: "confirmed",
  },
  {
    id: "sched-5",
    time: "1:30 PM",
    patientName: "Robert Chen",
    visitType: "Telehealth Consultation",
    providerName: "Dr. James Okafor",
    status: "confirmed",
  },
  {
    id: "sched-6",
    time: "3:00 PM",
    patientName: "Nina Petrova",
    visitType: "Annual Physical",
    providerName: "Dr. Lisa Chang",
    status: "pending",
  },
]

// ── AI Briefings ───────────────────────────────────────────────

export const aiBriefings: Record<string, AIBriefing> = {
  pre: {
    summary:
      "Your EHR sync completed this morning. 12 providers and 3 locations were imported from Athena. Two provider profiles are missing headshots and one location needs insurance info before you can activate.",
    suggestions: [
      "Review synced providers",
      "Check location insurance",
      "Upload missing headshots",
    ],
  },
  post: {
    summary:
      "27 bookings so far this month, up 125% from last month. Cancellation rate ticked up to 13% — mostly at the Midtown location. There’s also a sync issue with Athena that’s been open for 12 hours.",
    suggestions: [
      "Why is cancellation rate up?",
      "Show underperforming locations",
      "Troubleshoot Athena sync",
    ],
  },
}

