import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, GripVertical, Pencil, ChevronDown, ChevronUp, Play, Volume2 } from "lucide-react"
import { FormCard, FormRow, SectionHeading } from "../products/shared-settings"

const faqs = [
  { id: 1, question: "Do you accept my insurance?", answer: "We accept most major dental insurance plans including Aetna, Cigna, Delta Dental, MetLife, and United Healthcare. Contact us to verify your specific plan.", active: true },
  { id: 2, question: "What if I need to cancel?", answer: "We ask for at least 24 hours notice for cancellations. You can cancel or reschedule through the link in your confirmation text, or call us directly.", active: true },
  { id: 3, question: "Do you offer emergency appointments?", answer: "Yes, we reserve time each day for dental emergencies. If you're experiencing severe pain, swelling, or trauma, call us and we'll fit you in as soon as possible.", active: true },
  { id: 4, question: "What are your hours?", answer: "Our Midtown East office is open Monday through Friday 8am to 6pm and Saturday 9am to 2pm. Midtown West is open Monday through Thursday 9am to 7pm.", active: true },
  { id: 5, question: "Do you see children?", answer: "Yes, we welcome patients of all ages. Dr. Park specializes in pediatric dentistry and is great with kids.", active: true },
  { id: 6, question: "What COVID precautions do you take?", answer: "We follow all CDC and ADA guidelines including enhanced air filtration, PPE, and sanitization between patients.", active: false },
  { id: 7, question: "How much does a cleaning cost without insurance?", answer: "A routine cleaning and exam starts at $150 for self-pay patients. We also offer a membership plan — ask about our Dental Savings Program.", active: true },
  { id: 8, question: "Do you offer payment plans?", answer: "Yes, we offer CareCredit financing for treatments over $500. We can discuss payment options during your visit.", active: true },
]

function FaqRow({ faq }: { faq: typeof faqs[0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b last:border-0">
      <div className="flex items-center gap-3 px-5 py-3">
        <GripVertical className="size-3.5 text-muted-foreground/30 cursor-grab shrink-0" />
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 flex items-center justify-between text-left bg-transparent border-none cursor-pointer p-0"
        >
          <div className="flex items-center gap-2 min-w-0">
            <p className="text-sm font-medium truncate">{faq.question}</p>
            {!faq.active && <Badge variant="outline" className="text-xs shrink-0">Inactive</Badge>}
          </div>
          {expanded ? (
            <ChevronUp className="size-3.5 text-muted-foreground/40 shrink-0" />
          ) : (
            <ChevronDown className="size-3.5 text-muted-foreground/40 shrink-0" />
          )}
        </button>
        <button className="size-6 rounded flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground bg-transparent border-none cursor-pointer shrink-0">
          <Pencil className="size-3" />
        </button>
      </div>
      {expanded && (
        <div className="px-5 pb-3 pl-12">
          <p className="text-sm text-muted-foreground">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

export function PracticeDetailsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Practice information */}
      <div className="flex flex-col gap-4">
        <SectionHeading>PRACTICE INFORMATION</SectionHeading>
        <FormRow label="Practice name">
          <Input defaultValue="Midtown Dental Associates" />
        </FormRow>
        <FormRow label="Phone">
          <Input defaultValue="(212) 555-0100" />
        </FormRow>
        <FormRow label="Email">
          <Input defaultValue="info@midtowndental.com" />
        </FormRow>
        <FormRow label="Website">
          <Input defaultValue="www.midtowndental.com" />
        </FormRow>
        <FormRow label="NPI (Organization)">
          <Input defaultValue="1234567890" />
        </FormRow>
      </div>

      {/* Practice name pronunciation */}
      <div className="flex flex-col gap-4">
        <SectionHeading>PRONUNCIATION</SectionHeading>
        <FormRow label="Practice name" description="How voice channels pronounce your practice name">
          <Input defaultValue="Midtown Dental Associates" />
        </FormRow>
        <FormRow label="Phonetic override" description="Leave blank to use default pronunciation">
          <Input placeholder="e.g., MID-town DEN-tul" />
        </FormRow>
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
          <button className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 cursor-pointer border-none shrink-0">
            <Play className="size-3 ml-0.5" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground truncate">
              "Thank you for calling <span className="font-medium text-foreground">Midtown Dental Associates</span>, how can I help you today?"
            </p>
          </div>
          <Volume2 className="size-4 text-muted-foreground/40 shrink-0" />
        </div>
      </div>

      {/* Practice knowledge base */}
      <FormCard title="Practice knowledge base">
        <p className="text-xs text-muted-foreground -mt-2">
          Common questions and answers about your practice. Used by AI phone assistant, chatbots, and other channels to answer patient questions.
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {faqs.filter(f => f.active).length} active, {faqs.filter(f => !f.active).length} inactive
          </p>
          <Button variant="outline" size="sm">
            <Plus className="size-3.5" data-icon="inline-start" />
            Add FAQ
          </Button>
        </div>
        <div className="rounded-lg border overflow-hidden -mx-5 -mb-4">
          {faqs.map((faq) => (
            <FaqRow key={faq.id} faq={faq} />
          ))}
        </div>
        <div className="flex items-center gap-1.5 pt-3 -mb-1">
          <span className="text-xs text-muted-foreground">Used by</span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">Practice Solutions</Badge>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">Branded Directory</Badge>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">Chatbot</Badge>
        </div>
      </FormCard>

    </div>
  )
}
