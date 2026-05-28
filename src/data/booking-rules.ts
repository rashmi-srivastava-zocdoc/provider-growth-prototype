export type BookingRule = {
  id: string
  name: string
  active: boolean
  conditions: {
    patientType?: "new" | "existing"
    ageRange?: { min?: number; max?: number }
    insurance?: string[]
    visitType?: "in-person" | "telehealth"
    apptType?: string[]
    provider?: string[]
    location?: string[]
  }
  outputs: {
    forms?: { id: string; name: string }[]
    requirements?: string[]
    messages?: string[]
    instructions?: string[]
    overrides?: {
      leadTime?: string
      cancelWindow?: string
      bookingChannel?: string
    }
  }
}

export const bookingRules: BookingRule[] = [
  {
    id: "r1",
    name: "New patient intake",
    active: true,
    conditions: { patientType: "new" },
    outputs: {
      forms: [
        { id: "f1", name: "Registration form" },
        { id: "f2", name: "General Consent" },
        { id: "f3", name: "Medical History" },
        { id: "f4", name: "HIPAA Privacy Notice" },
      ],
    },
  },
  {
    id: "r2",
    name: "Medicaid visits",
    active: true,
    conditions: { insurance: ["Medicaid"] },
    outputs: {
      requirements: ["Require referral", "Require pre-authorization"],
      forms: [{ id: "f5", name: "Medicaid Eligibility form" }],
      messages: ["Bring referral letter"],
    },
  },
  {
    id: "r3",
    name: "Pediatric patients",
    active: true,
    conditions: { ageRange: { max: 18 } },
    outputs: {
      forms: [{ id: "f6", name: "Guardian Consent" }],
      requirements: ["Parent/guardian present"],
      messages: ["Send to parent email"],
    },
  },
  {
    id: "r4",
    name: "Video visits",
    active: true,
    conditions: { visitType: "telehealth" },
    outputs: {
      forms: [{ id: "f7", name: "Telehealth Consent" }],
      messages: ["Tech check link (24hr before)"],
      instructions: ["Download app instructions"],
    },
  },
  {
    id: "r5",
    name: "HMO specialist visits",
    active: true,
    conditions: { insurance: ["HMO"], apptType: ["Dermatology consultation"] },
    outputs: {
      requirements: ["Require referral"],
      overrides: { leadTime: "72 hours" },
    },
  },
]
