export type Form = {
  id: string
  name: string
  source: "template" | "upload" | "custom"
  fieldCount: number
  lastEdited: string
  usedInRules: string[]
}

export const forms: Form[] = [
  {
    id: "f1",
    name: "Patient Registration",
    source: "template",
    fieldCount: 14,
    lastEdited: "2 days ago",
    usedInRules: ["r1"],
  },
  {
    id: "f2",
    name: "General Consent",
    source: "template",
    fieldCount: 6,
    lastEdited: "1 week ago",
    usedInRules: ["r1"],
  },
  {
    id: "f3",
    name: "Medical History",
    source: "template",
    fieldCount: 22,
    lastEdited: "1 week ago",
    usedInRules: ["r1"],
  },
  {
    id: "f4",
    name: "HIPAA Privacy Notice",
    source: "template",
    fieldCount: 4,
    lastEdited: "2 weeks ago",
    usedInRules: ["r1"],
  },
  {
    id: "f5",
    name: "Medicaid Eligibility",
    source: "custom",
    fieldCount: 8,
    lastEdited: "3 days ago",
    usedInRules: ["r2"],
  },
  {
    id: "f6",
    name: "Guardian Consent",
    source: "template",
    fieldCount: 5,
    lastEdited: "1 week ago",
    usedInRules: ["r3"],
  },
  {
    id: "f7",
    name: "Telehealth Consent",
    source: "template",
    fieldCount: 7,
    lastEdited: "5 days ago",
    usedInRules: ["r4"],
  },
  {
    id: "f8",
    name: "Skin Health History",
    source: "upload",
    fieldCount: 18,
    lastEdited: "1 day ago",
    usedInRules: [],
  },
  {
    id: "f9",
    name: "Photo Consent",
    source: "upload",
    fieldCount: 3,
    lastEdited: "4 days ago",
    usedInRules: [],
  },
]
