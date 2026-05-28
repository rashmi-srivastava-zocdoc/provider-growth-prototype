// Tier
export type Tier = "Essential" | "Professional" | "Business" | "Enterprise"

// Practice
export interface Practice {
  id: string
  name: string
  slug: string
  logo: string | null
  description: string
  ehrIntegration: EHRIntegration | null
}

// EHR Integration
export type AvailabilitySource = "manual" | "ehr"

export interface EHRProviderMapping {
  providerId: string
  ehrProviderId: string | null // null = not mapped
  status: "mapped" | "missing"
}

export interface EHRProviderLocationSync {
  providerId: string
  locationId: string
  status: "synced" | "alert" | "not_connected"
  lastSynced: string | null // ISO datetime
  issues?: string[]
}

export interface EHRTemplate {
  id: string
  name: string
  duration: number // minutes
  newPatientsOnly?: boolean
  existingPatientsOnly?: boolean
}

export interface EHRIntegration {
  name: string // "Athena Health", "SimplePractice", etc.
  status: "connected" | "disconnected" | "alert"
  lastSync: string // ISO date
  alerts: string[]
  syncType: "one_way" | "two_way" | "true_way"
  providerMappings?: EHRProviderMapping[]
  providerLocationSync?: EHRProviderLocationSync[]
  availableTemplates?: EHRTemplate[]
}

// Current User
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  initials: string
  role: string
  permissions: {
    features: "all" | "limited"
    allowedFeatures?: ("practice_settings" | "appointments" | "billing" | "sponsored" | "user_management" | "performance" | "phone_assistant" | "live_calls")[]
    scope: "all" | "by_location" | "by_specialty" | "custom"
    scopeIds?: string[] // locationIds or providerIds
  }
}

// Provider credential / verification types
export type VerificationStatus = "verified" | "in_progress" | "unable_to_verify" | "not_verified"

export interface ProviderLicense {
  number: string
  state: string
  type: string // "MD", "DEA", "NP", etc.
  status: "active" | "expired" | "pending"
}

export interface ProviderCredentials {
  verificationStatus: VerificationStatus
  licenses: ProviderLicense[]
  supervisingPhysician?: string // required for NPs/PAs in supervised states
  isNewProfile?: boolean // if true, all credential fields are editable before first verification
}

// Insurance
export interface InsurancePlan {
  lineOfBusiness: string   // "Commercial", "ACA Marketplace", "Medicare", "Medicaid"
  networkTypes: string[]   // ["PPO", "HMO", "POS", "EPO"] or ["Medicare Advantage"]
}

export interface InsurancePayor {
  id: string
  name: string
  plans: InsurancePlan[]
}

// Provider
export type ProviderChannelStatus = "live" | "paused" | "incomplete"

export type ProductId = "marketplace" | "bookable_presence" | "practice_solutions"

export interface ProviderProduct {
  productId: ProductId
  status: ProviderChannelStatus
}

export interface ProviderAlert {
  id: string
  severity: "error" | "warning"
  message: string
  action?: { label: string }
}

export interface ProviderRecommendation {
  id: string
  message: string
  action?: { label: string }
}

export interface Provider {
  id: string
  name: string
  suffix: string // "MD", "PhD", "DO", "NP", "PA", etc.
  specialties: string[]
  headshotFile: string | null // maps to /public/avatars/providers/[file].png
  initials: string
  email?: string
  npi?: string
  nickname?: string
  pronunciation?: string
  credentials?: ProviderCredentials // omit to use default (verified) in UI
  locationIds: string[]
  videoVisitStates?: string[]
  acceptedPatients: {
    new: boolean
    existing: boolean
    agesMin?: number
    agesMax?: number
    genders?: ("all" | "male" | "female" | "nonbinary")[]
    excludedVisitReasons?: string[]
  }
  products?: ProviderProduct[]
  dataSourceId?: string // references a DataSource
  sourceRefId?: string // ID in the source system (EHR provider ID, spreadsheet row, etc.)
  appointmentTypeIds?: string[]
  alerts?: ProviderAlert[]
  recommendations?: ProviderRecommendation[]
  // Profile content
  professionalStatement?: string
  education?: { institution: string; degree: string; year?: number }[]
  hospitalAffiliations?: string[]
  accolades?: string[]         // awards, honors, recognitions
  acceptedInsurancesAndPayments: {
    insurances?: InsurancePayor[]
    acceptsInNetwork: boolean
    acceptsOutOfNetwork: boolean
    offersSliding?: boolean
    offersReimbursement?: boolean
    insuranceCount: number
  }
  upcomingSlotCount?: number  // slots available in the next 14 days
  rating: number | null
  reviewCount: number
}

// Location
export type LocationChannelStatus = "live" | "paused" | "not_set_up"
export type LocationIntegrationStatus = "synced" | "alert" | "not_connected"

export interface Location {
  id: string
  name: string
  nickname?: string
  address: string
  phone: string
  email?: string
  providerIds: string[]
  integrationStatus: LocationIntegrationStatus
  integrationAlerts?: string[]
  photos: number
  photoUrls?: string[] // actual photo URLs for display
}

export interface PayorDirectory {
  id: string
  name: string
  status: "enrolled" | "not_enrolled" | "pending"
}

// Visit Reason Rules
export type BookingMode = "self_serve" | "request_approval" | "contact_office"
export type StaffPreference = "any" | "pa_np" | "physician"

// ── Scheduling Defaults ────────────────────────────────────
export type StartAlignment = "on_hour" | "on_half" | "any"
export type LeadTimeUnit = "hours" | "days"

// ── Appointment Types ───────────────────────────────────────

export type AppointmentTypeSource = "manual" | "ehr"
export type AppointmentTypePatientType = "new" | "existing" | "both"

export interface AppointmentType {
  id: string
  source: AppointmentTypeSource
  name: string
  ehrTemplateName?: string       // original EHR template name

  clinicalScope: {
    buckets: string[]            // BucketId[] — references clinical-buckets.ts taxonomy
    bucketAnswers?: Record<string, Record<string, string[]>> // qualifier answers per bucket
    patientType: AppointmentTypePatientType
  }

  settings: {
    // Booking timing — null = inherit from practice default
    durationNew: number | null   // minutes
    durationExisting: number | null
    leadTime: { amount: number; unit: "hours" | "days" } | null
    bookingHorizon: number | null // days

    // What the patient must provide
    bookingRequirements: {
      requireReferral: boolean
      requireInsuranceCard: boolean
      requireVisitDescription: boolean
      customRequirements: string[]
    } | null

    // Pre-visit intake
    intake: {
      collectInsurancePhoto: boolean
      collectPhotoId: boolean
    } | null

    // Patient communications
    instructions: {
      preAppointment: string
      postAppointment: string
    } | null

    // Availability constraints — null = inherit from practice default
    doubleBooking: boolean | null
    maxPerDay: number | null
  }
}

// ── Insurance Plan Config ───────────────────────────────────

export interface InsurancePlanConfig {
  id: string
  payorId: string
  lineOfBusiness: string
  networkType: string

  requirements: {
    requiresReferral: boolean
    referralPatientNote?: string
    requiresPreAuth: boolean
    preAuthPatientNote?: string
    additionalLeadTimeHours?: number
    bookingModeOverride?: "request_approval" | "contact_office"
  }

  // Business/Enterprise only — null = applies to all specialties
  applicableSpecialties?: string[]
}

// ── Roles & Permissions ────────────────────────────────────

export type PermissionAreaId =
  | "appointments"
  | "practice_settings"
  | "provider_profiles"
  | "user_management"
  | "billing"
  | "performance"
  | "sponsored"
  | "phone_assistant"
  | "live_calls"

export interface PermissionArea {
  id: PermissionAreaId
  label: string
  description: string
  category: "scheduling" | "operations" | "finance" | "marketing" | "practice_solutions"
  productGated?: ProductId
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: PermissionAreaId[]
  isStarter: boolean
  isViewOnly?: boolean
}

// Team Member / User Account
export type UserAccountStatus = "active" | "invited" | "deactivated"

export interface TeamMember {
  id: string
  name: string
  email: string
  phone?: string
  jobTitle?: string
  initials: string
  roleId: string
  scope: {
    type: "all" | "specific"
    groupIds?: string[]
    locationIds?: string[]
  }
  status: UserAccountStatus
  lastActive: string | null
  isCurrentUser: boolean
}

// Calendar Settings
export interface CalendarSettings {
  bookingHorizon: number       // days
  startAlignment: StartAlignment
  bufferTime: number           // minutes
}

// Groups
export interface Group {
  id: string
  name: string
  parentId: string | null
  locationIds: string[]
  manualProviderIds: string[]
  patientFacing?: {
    enabled: boolean
    brandName?: string
    phone?: string
    website?: string
    description?: string
  }
}

// Full Practice Data (what the context provides)
export interface PracticeData {
  practice: Practice
  currentUser: User
  locations: Location[]
  videoVisitStates: string[]
  providers: Provider[]
  teamMembers: TeamMember[]
  calendarSettings: CalendarSettings
  appointmentTypes: AppointmentType[]
  insurancePlanConfigs: InsurancePlanConfig[]
  dataSources?: DataSource[]
  groups?: Group[]
  roles?: Role[]
}

// ── Specialty ────────────────────────────────────────────

export interface SpecialtyGroup {
  name: string
  specialties: string[]
}

// ── Integration Alerts ────────────────────────────────────

export type IntegrationAlertType =
  | "new-providers"
  | "mapping-broken"
  | "sync-failed"
  | "import-stale"
  | "unmapped-location"
  | "unmapped-provider"

export type AlertSeverity = "error" | "warning" | "info"

export interface IntegrationAlert {
  id: string
  type: IntegrationAlertType
  severity: AlertSeverity
  source: string
  title: string
  description: string
  timestamp: string
  primaryAction: { label: string }
  secondaryAction?: { label: string }
  count?: number
  relevantPages: string[]
  providerIds?: string[]
  locationIds?: string[]
  dismissed: boolean
}

// ── Integration Dashboard ─────────────────────────────────

export type ConnectionHealth = "healthy" | "degraded" | "disconnected"

export interface IntegrationSummary {
  connection: {
    health: ConnectionHealth
    statusLine: string
    detail: string
  }
  availabilitySync: {
    openSlots: number
    liveSchedules: [number, number]
    noSlots: number
    nextSyncMin: number
    lastUpdated: string
  }
  writeBack: {
    totalBookings: number
    failedWrites: number
    capabilities: { cancellations: boolean; intakeForms: boolean; statusUpdates: boolean }
  }
  mappings: {
    linked: number
    total: number
    needMapping: number
    providers: [number, number]
    locations: [number, number]
    appointmentTypes: [number, number]
  }
}

export interface IntegrationMapping {
  id: string
  entityType: "provider" | "location" | "appointment"
  name: string
  ehrId: string | null
  ehrLabel: string | null
  status: "mapped" | "unmapped"
}

// ── Data Source & Sync ────────────────────────────────────

export type SyncMethod = "realtime" | "periodic" | "manual"
export type SyncStatus = "connected" | "syncing" | "error" | "stale" | "disconnected"

export interface SyncIssue {
  id: string
  severity: "error" | "warning" | "info"
  message: string
  category: "providers" | "locations" | "scheduling" | "insurance"
  timestamp: string
  dismissed: boolean
}

export type SourceCapability = "scheduling" | "roster" | "live-sync"

export interface DataSource {
  id: string
  name: string
  type: "ehr" | "spreadsheet" | "file" | "manual"
  capabilities: SourceCapability[]
  syncMethod: SyncMethod
  status: SyncStatus
  lastSyncAt: string | null
  nextSyncAt: string | null
  issues: SyncIssue[]
  itemCounts: { providers: number; locations: number; appointmentTypes: number }
  fieldCount?: number
  importedBy?: string
}

