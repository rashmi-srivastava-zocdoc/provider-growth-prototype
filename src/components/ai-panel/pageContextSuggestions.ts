export interface PageSuggestion {
  label: string
  prompt: string
}

const SUGGESTIONS: Record<string, PageSuggestion[]> = {
  Home: [
    { label: "Summarize today's activity", prompt: "Give me a summary of today's activity across the practice." },
    { label: "What needs attention?", prompt: "What items need my attention right now?" },
    { label: "Provider performance", prompt: "Give me a quick overview of provider performance." },
  ],
  Providers: [
    { label: "Credential updates", prompt: "Which providers need credential updates?" },
    { label: "Inactive providers", prompt: "Which providers are currently inactive or paused?" },
    { label: "Add a new provider", prompt: "Walk me through adding a new provider." },
  ],
  Calendar: [
    { label: "Busiest day?", prompt: "What is the busiest day this week?" },
    { label: "Scheduling gaps", prompt: "Are there any scheduling gaps I should address?" },
    { label: "Optimize availability", prompt: "How can I optimize provider availability?" },
  ],
  Performance: [
    { label: "Booking rate drivers", prompt: "What factors are driving my booking rate?" },
    { label: "Compare providers", prompt: "Compare provider performance across the practice." },
  ],
  Inbox: [
    { label: "Unread messages", prompt: "What messages need my response?" },
    { label: "Priority items", prompt: "What are the highest priority inbox items?" },
  ],
  Channels: [
    { label: "Channel status", prompt: "What's the current status of all provider channels?" },
    { label: "Paused channels", prompt: "Which provider channels are currently paused?" },
  ],
  Users: [
    { label: "Who has admin access?", prompt: "Which team members have admin access?" },
    { label: "Invite team member", prompt: "How do I invite a new team member?" },
  ],
  Locations: [
    { label: "Location sync status", prompt: "What's the sync status of my locations?" },
    { label: "Add a location", prompt: "How do I add a new location?" },
  ],
  "Appointment types": [
    { label: "EHR sync status", prompt: "Which appointment types are synced with my EHR?" },
    { label: "Add appointment type", prompt: "How do I add a new appointment type?" },
  ],
  "EHR integration": [
    { label: "Current sync status", prompt: "What's the current EHR sync status?" },
    { label: "Fix sync errors", prompt: "How do I fix EHR sync errors?" },
  ],
  Billing: [
    { label: "Billing overview", prompt: "Give me an overview of my current billing status." },
  ],
  "Practice details": [
    { label: "What needs updating?", prompt: "What practice information needs to be updated?" },
  ],
  _default: [
    { label: "What can you help with?", prompt: "What can you help me with in this section?" },
    { label: "Practice overview", prompt: "Give me an overview of the practice." },
  ],
}

export function getSuggestionsForPage(page: string): PageSuggestion[] {
  return SUGGESTIONS[page] ?? SUGGESTIONS["_default"]
}
