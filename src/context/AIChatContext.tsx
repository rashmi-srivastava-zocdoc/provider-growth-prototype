import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { usePractice } from "@/context/PracticeContext"
import type { PracticeData, Provider } from "@/types"
import {
  type ActionReviewData,
  type AIResponsePayload,
  tryBuildMutationResponse,
  buildMutationReview,
} from "@/context/aiMutationHelpers"

export type { ActionReviewData, ActionReviewItem, ActionChange } from "@/context/aiMutationHelpers"

export type DisplayMode = "floating" | "sidebar"
export type MessageRole = "user" | "ai"
export type MessageType = "text" | "action-review"

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  type?: MessageType
  actionReview?: ActionReviewData
}

export interface Chat {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  pageContext: string
}

export interface SelectedItemInfo {
  id: string
  name: string
  subtitle?: string
}

interface AIChatContextValue {
  chats: Chat[]
  activeChatId: string
  activeChat: Chat | undefined
  panelOpen: boolean
  displayMode: DisplayMode
  aiPageOpen: boolean
  activePage: string
  isTyping: boolean
  openPanel: () => void
  closePanel: () => void
  togglePanel: () => void
  setDisplayMode: (mode: DisplayMode) => void
  openAIPage: () => void
  closeAIPage: () => void
  sendMessage: (text: string) => void
  startNewChat: () => void
  switchChat: (id: string) => void
  openPanelWithAction: (prompt: string, selectedItems?: SelectedItemInfo[]) => void
  updateActionReviewStatus: (messageId: string, status: "applied" | "dismissed") => void
}

const AIChatContext = createContext<AIChatContextValue | null>(null)

function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}

function makeChat(pageContext: string): Chat {
  return { id: uid(), title: "New chat", messages: [], createdAt: new Date(), pageContext }
}

function buildResponse(msg: string, page: string, p: PracticeData): string {
  const m = msg.toLowerCase()
  const np = p.providers.length
  const nl = p.locations.length
  const locs = p.locations.map(l => l.name).join(" and ")
  const provs = p.providers.slice(0, 3).map(pr => pr.name).join(", ")
  const ehr = p.practice.ehrIntegration?.name ?? "your EHR"

  if (page === "Home") {
    if (m.includes("summar") || m.includes("today") || m.includes("activity")) {
      return `Here's a summary of today's activity at **${p.practice.name}**:\n\n- **${np} providers** active across ${nl} locations (${locs})\n- EHR sync with **${ehr}** ran today at 9:00 AM\n- 1 provider is missing an EHR mapping\n- 1 integration alert at Brooklyn Heights needs attention\n\nWould you like to dig into any specific area?`
    }
    if (m.includes("attention") || m.includes("need")) {
      return `Here are the items that need your attention:\n\n1. **EHR Mapping** — One provider is missing an ${ehr} mapping and won't sync\n2. **Integration Alert** — Template mismatch at Brooklyn Heights ("Follow-up" not found in EHR)\n\nWould you like help resolving either of these?`
    }
    if (m.includes("perform")) {
      return `Quick performance overview for **${p.practice.name}**:\n\n- **${np} providers** across ${nl} locations\n- ${provs} are among your most active\n- Two-way EHR sync keeps appointment data current\n\nHead to Performance for detailed booking rate analytics.`
    }
  }

  if (page === "Providers") {
    if (m.includes("credential") || m.includes("update")) {
      return `Reviewing credentials for your ${np} providers:\n\n- Most providers have active board certifications and DEA licenses\n- 1 provider has an incomplete EHR mapping that may affect syncing\n- Verify each provider's status under their profile\n\nWant help walking through credentialing for a specific provider?`
    }
    if (m.includes("inactive") || m.includes("paused")) {
      return `All ${np} providers are currently configured. Channel status varies by location:\n\n- Some providers may be paused at specific locations\n- Check the **Channels** page for a complete live/paused breakdown\n\nWant help adjusting a provider's channel settings?`
    }
    if (m.includes("add") || m.includes("new")) {
      return `To add a new provider to **${p.practice.name}**:\n\n1. Click **"Invite provider"** from the nav or Providers page\n2. Enter their name, NPI, and specialty\n3. Assign them to ${locs}\n4. Configure appointment types and availability\n5. Map them to ${ehr}\n\nWant a walkthrough of any step?`
    }
  }

  if (page === "Calendar") {
    if (m.includes("busy") || m.includes("busiest")) {
      return `Based on your scheduling configuration across ${nl} locations:\n\n- ${np} providers are seeing patients with varying availability windows\n- Mid-week days (Tue–Thu) typically see the highest volume\n- Slot density depends on appointment type duration and buffer settings\n\nWant tips on optimizing your schedule?`
    }
    if (m.includes("gap") || m.includes("scheduling")) {
      return `Scheduling gaps typically come from:\n\n1. **Buffer time** between appointments (adjust in Calendar Settings)\n2. **Limited provider hours** at certain locations\n3. **EHR template mismatches** blocking certain appointment types\n\nFor ${locs}, review per-provider availability. Want help adjusting buffer times?`
    }
    if (m.includes("optim") || m.includes("availability")) {
      return `To optimize availability across your ${np} providers:\n\n- **Reduce buffer time** where clinically safe\n- **Extend booking horizon** for more advance bookings\n- **Enable cascading availability** to show the soonest slot\n- **Sync all templates** with ${ehr}\n\nWant to walk through any of these settings?`
    }
  }

  if (page === "Performance") {
    if (m.includes("booking") || m.includes("rate") || m.includes("driving")) {
      return `Booking rate at **${p.practice.name}** is influenced by:\n\n1. **Slot availability** — more open times = higher conversion\n2. **Appointment variety** — patients book what fits their need\n3. **Channel visibility** — live vs. paused status matters\n4. **Lead time** — same-week vs. advance bookings\n\nEnsure all providers have active channels and templates mapped in ${ehr}.`
    }
    if (m.includes("compar") || m.includes("provider")) {
      return `For a provider comparison across **${p.practice.name}**:\n\n- Compare new vs. returning patient ratios per provider\n- Check cancellation and no-show rates\n- Review booking lead times across ${locs}\n- ${provs} are good starting points\n\nWant help setting up a structured review?`
    }
  }

  if (page === "Users") {
    if (m.includes("admin") || m.includes("access")) {
      return `Currently, **${p.currentUser.name}** (${p.currentUser.role}) has full admin access across all features and locations.\n\nFrom **Settings → Users** you can:\n- View all team members and their roles\n- Adjust permission scopes per location\n- Invite new team members\n\nWould you like help setting up role-based access?`
    }
    if (m.includes("invite") || m.includes("team")) {
      return `To invite a team member to **${p.practice.name}**:\n\n1. Go to **Settings → Users**\n2. Click **"Invite team member"**\n3. Enter their email and assign a role\n4. Choose their location access scope\n5. They'll receive an email invitation\n\nAvailable roles: Practice Administrator, Office Manager, Billing Coordinator. Which role are you adding?`
    }
  }

  if (m.includes("help") || m.includes("can you") || m.includes("what can")) {
    return `I can help you manage **${p.practice.name}** more effectively:\n\n- **Providers** — credentialing, availability, channel status\n- **Scheduling** — optimize slots, reduce gaps, manage appointment types\n- **EHR Integration** — troubleshoot ${ehr} sync\n- **Performance** — analyze booking rates and metrics\n- **Settings** — users, locations, billing, practice details\n\nWhat would you like to work on?`
  }

  return `Got it — you asked: *"${msg}"*\n\nI'm working with context from **${p.practice.name}** (${np} providers, ${nl} locations). Could you share a bit more detail? I can help with provider management, scheduling, EHR integration, and practice operations.`
}

type SerializedState = {
  chats: Array<{
    id: string
    title: string
    messages: Array<{
      id: string
      role: MessageRole
      content: string
      timestamp: string
      type?: MessageType
      actionReview?: ActionReviewData
    }>
    createdAt: string
    pageContext: string
  }>
  activeChatId: string
  panelOpen: boolean
  displayMode: DisplayMode
}

function saveToStorage(state: SerializedState) {
  try { sessionStorage.setItem("zd-ai-chat", JSON.stringify(state)) } catch {}
}

function loadFromStorage(): SerializedState | null {
  try {
    const raw = sessionStorage.getItem("zd-ai-chat")
    return raw ? (JSON.parse(raw) as SerializedState) : null
  } catch { return null }
}

function hydrateChats(data: SerializedState["chats"]): Chat[] {
  return data.map(c => ({
    ...c,
    createdAt: new Date(c.createdAt),
    messages: c.messages.map(m => ({
      ...m,
      timestamp: new Date(m.timestamp),
    })),
  }))
}

export function AIChatProvider({
  children,
  activePage,
}: {
  children: React.ReactNode
  activePage: string
}) {
  const practice = usePractice()

  const stored = loadFromStorage()
  const initChats = stored?.chats?.length ? hydrateChats(stored.chats) : [makeChat(activePage)]
  const initActiveId =
    stored?.activeChatId && initChats.find(c => c.id === stored.activeChatId)
      ? stored.activeChatId
      : initChats[0].id

  const [chats, setChats] = useState<Chat[]>(initChats)
  const [activeChatId, setActiveChatId] = useState(initActiveId)
  const [panelOpen, setPanelOpen] = useState(stored?.panelOpen ?? false)
  const [displayMode, setDisplayModeState] = useState<DisplayMode>(stored?.displayMode ?? "floating")
  const [aiPageOpen, setAiPageOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const activePageRef = useRef(activePage)
  const activeChatIdRef = useRef(activeChatId)
  useEffect(() => { activePageRef.current = activePage }, [activePage])
  useEffect(() => { activeChatIdRef.current = activeChatId }, [activeChatId])

  useEffect(() => {
    saveToStorage({
      chats: chats.map(c => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
        messages: c.messages.map(m => ({
          ...m,
          timestamp: m.timestamp.toISOString(),
        })),
      })),
      activeChatId,
      panelOpen,
      displayMode,
    })
  }, [chats, activeChatId, panelOpen, displayMode])

  const activeChat = chats.find(c => c.id === activeChatId)

  const openPanel = () => setPanelOpen(true)
  const closePanel = () => setPanelOpen(false)
  const togglePanel = () => setPanelOpen(p => !p)
  const setDisplayMode = (mode: DisplayMode) => setDisplayModeState(mode)
  const openAIPage = () => setAiPageOpen(true)
  const closeAIPage = () => setAiPageOpen(false)
  const startNewChat = () => {
    const chat = makeChat(activePageRef.current)
    setChats(prev => [chat, ...prev])
    setActiveChatId(chat.id)
  }
  const switchChat = (id: string) => setActiveChatId(id)

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return
    const chatId = activeChatIdRef.current
    const userMsg: ChatMessage = { id: uid(), role: "user", content: text.trim(), timestamp: new Date() }

    setChats(prev =>
      prev.map(c => {
        if (c.id !== chatId) return c
        return {
          ...c,
          title: c.messages.length === 0 ? text.trim().slice(0, 45) : c.title,
          messages: [...c.messages, userMsg],
        }
      })
    )
    setIsTyping(true)

    setTimeout(() => {
      const mutation = tryBuildMutationResponse(text, activePageRef.current, practice)
      const aiMsg: ChatMessage = mutation
        ? {
            id: uid(),
            role: "ai",
            content: mutation.content,
            timestamp: new Date(),
            type: "action-review",
            actionReview: mutation.actionReview,
          }
        : {
            id: uid(),
            role: "ai",
            content: buildResponse(text, activePageRef.current, practice),
            timestamp: new Date(),
          }
      setChats(prev =>
        prev.map(c => (c.id !== chatId ? c : { ...c, messages: [...c.messages, aiMsg] }))
      )
      setIsTyping(false)
    }, 700 + Math.random() * 600)
  }

  const openPanelWithAction = (prompt: string, selectedItems?: SelectedItemInfo[]) => {
    setPanelOpen(true)

    const chat = makeChat(activePageRef.current)
    const chatId = chat.id
    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      content: prompt.trim(),
      timestamp: new Date(),
    }
    chat.title = prompt.trim().slice(0, 45)
    chat.messages = [userMsg]

    setChats(prev => [chat, ...prev])
    setActiveChatId(chatId)
    setIsTyping(true)

    setTimeout(() => {
      let payload: AIResponsePayload

      if (selectedItems && selectedItems.length > 0) {
        const providers = selectedItems
          .map(item => practice.providers.find(pr => pr.id === item.id))
          .filter((pr): pr is Provider => !!pr)

        payload = providers.length > 0
          ? buildMutationReview(prompt, providers, practice)
          : { content: buildResponse(prompt, activePageRef.current, practice) }
      } else {
        const mutation = tryBuildMutationResponse(prompt, activePageRef.current, practice)
        payload = mutation ?? { content: buildResponse(prompt, activePageRef.current, practice) }
      }

      const aiMsg: ChatMessage = {
        id: uid(),
        role: "ai",
        content: payload.content,
        timestamp: new Date(),
        ...(payload.actionReview && {
          type: "action-review" as MessageType,
          actionReview: payload.actionReview,
        }),
      }

      setChats(prev =>
        prev.map(c => (c.id !== chatId ? c : { ...c, messages: [...c.messages, aiMsg] }))
      )
      setIsTyping(false)
    }, 700 + Math.random() * 600)
  }

  const updateActionReviewStatus = (messageId: string, status: "applied" | "dismissed") => {
    const chatId = activeChatIdRef.current
    setChats(prev =>
      prev.map(c => {
        if (c.id !== chatId) return c
        return {
          ...c,
          messages: c.messages.map(m => {
            if (m.id !== messageId || !m.actionReview) return m
            return { ...m, actionReview: { ...m.actionReview, status } }
          }),
        }
      })
    )

    if (status === "applied") {
      setIsTyping(true)
      setTimeout(() => {
        const count = chats
          .find(c => c.id === chatId)
          ?.messages.find(m => m.id === messageId)
          ?.actionReview?.items.length ?? 0
        const followUp: ChatMessage = {
          id: uid(),
          role: "ai",
          content: `Done — changes applied to **${count} item${count !== 1 ? "s" : ""}**. Is there anything else you'd like to update?`,
          timestamp: new Date(),
        }
        setChats(prev =>
          prev.map(c => (c.id !== chatId ? c : { ...c, messages: [...c.messages, followUp] }))
        )
        setIsTyping(false)
      }, 500 + Math.random() * 300)
    }
  }

  return (
    <AIChatContext.Provider
      value={{
        chats,
        activeChatId,
        activeChat,
        panelOpen,
        displayMode,
        aiPageOpen,
        activePage,
        isTyping,
        openPanel,
        closePanel,
        togglePanel,
        setDisplayMode,
        openAIPage,
        closeAIPage,
        sendMessage,
        startNewChat,
        switchChat,
        openPanelWithAction,
        updateActionReviewStatus,
      }}
    >
      {children}
    </AIChatContext.Provider>
  )
}

export function useAIChat(): AIChatContextValue {
  const ctx = useContext(AIChatContext)
  if (!ctx) throw new Error("useAIChat must be used within AIChatProvider")
  return ctx
}
