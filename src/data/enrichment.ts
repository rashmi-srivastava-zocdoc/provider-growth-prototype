// Email-based practice/organization enrichment.
//
// Prototype only: given a signup email, we "look up" the provider's
// organization or practice and pre-fill whatever we can find —
// organization/practice name, location, specialty, and size. In production
// this would be backed by the NPI registry + Zocdoc's provider graph; here we
// key off the email domain and fall back to a best-effort guess.

export type EnrichedProvider = {
  name: string
  specialty: string
  npi: string
}

export type EnrichmentResult = {
  // Whether we recognized the organization with high confidence.
  matched: boolean
  // What kind of entity we resolved the email to.
  entityType: "organization" | "practice" | "provider"
  organizationName: string
  location: string
  specialty: string
  // Practice size bucket (provider count range).
  size: string
  providerCount: number
  npi: string
  website: string
  phone: string
  // A few representative providers we found under the org.
  providers: EnrichedProvider[]
}

// Known organizations keyed by email domain. These read as real enrichment
// hits — the kind we'd get back from the NPI registry + provider graph.
const KNOWN: Record<string, EnrichmentResult> = {
  "riverdalemedical.com": {
    matched: true,
    entityType: "organization",
    organizationName: "Riverdale Medical Group",
    location: "New York, NY",
    specialty: "Primary Care",
    size: "51-200",
    providerCount: 64,
    npi: "1659384720",
    website: "www.riverdalemedical.com",
    phone: "(212) 555-0101",
    providers: [
      { name: "Andrea Rodriguez, MD", specialty: "Internal Medicine", npi: "1093847561" },
      { name: "Marcus Lee, MD", specialty: "Family Medicine", npi: "1730495862" },
      { name: "Priya Nair, NP", specialty: "Primary Care", npi: "1582930147" },
    ],
  },
  "summitortho.com": {
    matched: true,
    entityType: "organization",
    organizationName: "Summit Orthopedics",
    location: "Denver, CO",
    specialty: "Orthopedic Surgery",
    size: "11-50",
    providerCount: 22,
    npi: "1447382910",
    website: "www.summitortho.com",
    phone: "(303) 555-0148",
    providers: [
      { name: "David Chen, MD", specialty: "Orthopedic Surgery", npi: "1209384756" },
      { name: "Sarah Kim, MD", specialty: "Sports Medicine", npi: "1384756291" },
    ],
  },
  "brightsmilesdental.com": {
    matched: true,
    entityType: "practice",
    organizationName: "Bright Smiles Dental",
    location: "Austin, TX",
    specialty: "Dentistry",
    size: "1-10",
    providerCount: 4,
    npi: "1768493021",
    website: "www.brightsmilesdental.com",
    phone: "(512) 555-0192",
    providers: [
      { name: "Emily Torres, DDS", specialty: "General Dentistry", npi: "1657483920" },
    ],
  },
}

// Generic email providers we should never treat as an org domain.
const PUBLIC_DOMAINS = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
  "icloud.com", "aol.com", "proton.me", "protonmail.com",
])

function domainOf(email: string): string {
  const at = email.lastIndexOf("@")
  return at === -1 ? "" : email.slice(at + 1).trim().toLowerCase()
}

// Turn "riverdalemedical" into "Riverdale Medical".
function prettifyDomain(domain: string): string {
  const root = domain.split(".")[0]
  return root
    .replace(/[-_]/g, " ")
    .replace(/(medical|med|health|care|clinic|dental|ortho|group|associates)/gi, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export function enrichFromEmail(email: string): EnrichmentResult {
  const domain = domainOf(email)
  if (domain && KNOWN[domain]) {
    return KNOWN[domain]
  }

  // Public/unknown domain — we couldn't confidently match an organization, so
  // we offer a best-effort guess the provider can correct.
  const isPublic = !domain || PUBLIC_DOMAINS.has(domain)
  const guessedName = isPublic ? "" : `${prettifyDomain(domain)} Group`

  return {
    matched: false,
    entityType: "practice",
    organizationName: guessedName,
    location: "",
    specialty: "",
    size: "",
    providerCount: 0,
    npi: "",
    website: isPublic ? "" : `www.${domain}`,
    phone: "",
    providers: [],
  }
}
