import { useState } from "react"
import { ArrowRight, Play, ChevronDown, Check, Phone } from "lucide-react"
import { useNavigate, asset } from "@/lib/router"
import { usePracticeSolutionsMode } from "@/context/ZoModeContext"

function BentoCard({
  title,
  description,
  linkText,
  badge,
  children,
  className,
}: {
  title: string
  description: string
  linkText?: string
  badge?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-white border-[1.5px] border-white rounded-[20px] overflow-hidden pt-10 relative ${className ?? ""}`}
    >
      <div className="px-10 relative z-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold text-[#333] leading-8">
            {title}
          </h3>
          <p className="text-base text-[#333] leading-[26px] max-w-[320px]">
            {description}
          </p>
          {linkText && (
            <button className="flex items-center gap-1 text-[#1b2228] text-base font-semibold underline mt-1 cursor-pointer bg-transparent border-none p-0">
              {linkText}
              <ArrowRight className="size-5" />
            </button>
          )}
        </div>
        {badge && (
          <div className="mt-6 inline-flex items-center h-8 px-5 rounded-full bg-[#fff0bb] text-sm font-semibold text-[#333] tracking-wide uppercase">
            {badge}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

function DarkBentoCard({
  title,
  children,
  className,
}: {
  title: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-[#f9f8f7] border-[1.5px] border-[rgba(73,95,110,0)] rounded-[20px] overflow-hidden py-8 flex flex-col gap-6 items-center ${className ?? ""}`}
    >
      <div className="px-8 w-full">
        <p className="text-xl font-semibold text-[#333] leading-7">{title}</p>
      </div>
      {children}
    </div>
  )
}

function NumberedFeature({
  number,
  title,
  description,
  active,
}: {
  number: number
  title: string
  description?: string
  active?: boolean
}) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className={`shrink-0 size-[34px] rounded-full flex items-center justify-center text-lg font-semibold ${
          active
            ? "bg-[#c9cdd0] text-white"
            : "bg-[#f9f8f7] text-[rgba(51,51,51,0.68)]"
        }`}
      >
        {number}
      </div>
      <div className="flex flex-col gap-1">
        <p
          className={`text-2xl font-semibold leading-8 ${
            active ? "text-[#333]" : "text-[rgba(51,51,51,0.68)]"
          }`}
        >
          {title}
        </p>
        {description && (
          <p className="text-base text-[#333] leading-[26px] max-w-[515px]">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

function StatBlock({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-5xl font-semibold text-[#333]">{value}</p>
      <p className="text-sm text-[rgba(51,51,51,0.68)] leading-[22px]">
        {label}
      </p>
    </div>
  )
}

function HowItWorksStep({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className="size-10 rounded-full bg-[#FEED5A] flex items-center justify-center text-lg font-semibold text-[#333]">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-[#333]">{title}</h3>
      <p className="text-base text-[rgba(51,51,51,0.68)] leading-[26px]">
        {description}
      </p>
    </div>
  )
}

export function JoinPage() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const { practiceSolutionsEnabled } = usePracticeSolutionsMode()
  const onGetStarted = () => navigate(email ? `/signup/combined?email=${encodeURIComponent(email)}` : "/signup/combined")

  return (
    <div className="h-screen w-full overflow-y-auto bg-white">
      {/* Header */}
      <header className="relative bg-white">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-[60px] py-5">
          <div className="flex items-center gap-13">
            <div className="flex items-center gap-2">
              <img src={asset("/logo/zee_rgb.svg")} alt="Zocdoc" className="h-10" />
              <span className="text-xl font-bold text-[#1b2228] tracking-tight">
                Zocdoc
              </span>
            </div>
            <nav className="flex items-center gap-10">
              <button className="flex items-center gap-1.5 text-base font-semibold text-[#1b2228] bg-transparent border-none cursor-pointer">
                Solutions
                <ChevronDown className="size-4" />
              </button>
              <button className="flex items-center gap-1.5 text-base font-semibold text-[#1b2228] bg-transparent border-none cursor-pointer">
                Resources
                <ChevronDown className="size-4" />
              </button>
              <button className="text-base font-semibold text-[#1b2228] bg-transparent border-none cursor-pointer">
                Pricing
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-10">
            <button className="text-base font-semibold text-[#1b2228] bg-transparent border-none cursor-pointer">
              Log in
            </button>
            <div className="h-8 w-px bg-[rgba(47,40,28,0.2)]" />
            <button className="text-base font-semibold text-[#1b2228] bg-transparent border-none cursor-pointer">
              Talk with Sales
            </button>
            <button
              onClick={onGetStarted}
              className="h-12 px-5 bg-[#FEED5A] rounded text-base font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
            >
              Get started
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(47,40,28,0.1)]" />
      </header>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto flex gap-13 items-start justify-center pt-24 pb-10 px-12">
        <div className="flex flex-col gap-4 w-[491px] shrink-0">
          <h1 className="text-[67px] font-semibold text-[#1b2228] leading-[70px]">
            Patient growth, everywhere.
          </h1>
          <p className="text-base text-[#1b2228] leading-[26px]">
            More than just Marketplace. Reach patients across Google, insurance
            directories, AI chatbots, your website, and Zocdoc's 30M+ monthly
            patients. Connect once, stay in sync everywhere.
          </p>

          {/* Email input CTA */}
          <div className="flex items-center border border-[rgba(47,40,28,0.2)] rounded-full pl-6 pr-1.5 py-2 mt-2">
            <input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-base bg-transparent border-none outline-none placeholder:text-[rgba(51,51,51,0.68)]"
            />
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 h-12 px-5 bg-[#FEED5A] rounded-full text-base font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors shrink-0"
            >
              Get started for free
              <ArrowRight className="size-5" />
            </button>
          </div>

          {/* Video link */}
          <button className="flex items-center gap-2 mt-1 bg-transparent border-none cursor-pointer p-0">
            <div className="size-6 rounded-full bg-[#333] flex items-center justify-center">
              <Play className="size-3 text-white fill-white" />
            </div>
            <span className="text-base font-semibold text-[#1b2228] underline">
              See Zocdoc in action
            </span>
          </button>
        </div>

        <img src={asset("/landing-page/hero.svg")} alt="" className="w-[600px] h-auto shrink-0 mt-[-20px]" />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-3 items-center justify-center px-12 py-10">
          <p className="text-base font-semibold text-[rgba(51,51,51,0.68)] text-center">
            Trusted by 50,000+ practices to help grow their business
          </p>
          <div className="flex items-center justify-between w-full h-[60px]">
            {[
              "Intermount Health",
              "One Medical",
              "CityMD",
              "Tufts Medicine",
              "NYU Langone",
              "Mount Sinai",
            ].map((name) => (
              <div
                key={name}
                className="h-[50px] px-6 flex items-center justify-center"
              >
                <div className="h-6 w-32 rounded bg-[rgba(27,34,40,0.08)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet patients where they are */}
      <section className="bg-[#f8f8f8]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-13 items-center justify-center px-12 py-16">
        <div className="flex flex-col gap-1 items-center text-center max-w-[916px]">
          <h2 className="text-[44px] font-semibold text-[#1b2228] leading-[60px]">
            Meet patients where they are
          </h2>
          <p className="text-base text-[#1b2228] leading-[26px]">
            Zocdoc connects you to the largest audience of patients, at the
            moment they're ready to book care. Receive direct bookings from
            Zocdoc, search engines, insurance directories, third-party
            platforms, and your practice website.
          </p>
        </div>

        <div className="flex flex-col gap-8 w-full">
          {/* Row 1: Marketplace (wide) + Google (narrow) */}
          <div className="flex gap-8">
            <BentoCard
              title="Zocdoc Marketplace"
              description="The #1 patient healthcare marketplace in the US. Reach millions of patients searching for care each month."
              linkText="Explore marketplace solution"
              className="w-[60%] h-[496px]"
            >
              <img src={asset("/landing-page/marketplace.svg")} alt="" className="absolute right-0 top-[38px] w-[55%] h-auto" />
            </BentoCard>
            <BentoCard
              title="Google & other search engines"
              description="Let patients book directly from Google Search and Maps, right when they find you."
              className="flex-1 h-[496px]"
            >
              <img src={asset("/landing-page/google.svg")} alt="" className="absolute left-0 bottom-0 w-full h-auto" />
            </BentoCard>
          </div>

          {/* Row 2: Partners (narrow) + Insurance (wide) */}
          <div className="flex gap-8">
            <BentoCard
              title="Premium marketplace partners"
              description="Patients browsing Yelp, Healthgrades, and other partner platforms can book with you in just a few clicks."
              linkText="Explore marketplace solution"
              className="flex-1 h-[496px]"
            >
              <img src={asset("/landing-page/premium.svg")} alt="" className="absolute left-0 bottom-0 w-[85%] h-auto mx-auto right-0" />
            </BentoCard>
            <BentoCard
              title="Insurance directories and more"
              description="Show real-time availability in the insurance directories patients already check."
              className="w-[60%] h-[496px]"
            >
              <img src={asset("/landing-page/insuranceDirectories.svg")} alt="" className="absolute right-0 top-[38px] w-[55%] h-auto" />
            </BentoCard>
          </div>

          {/* Full width: Practice Solutions */}
          <BentoCard
            title="Your website and phone line"
            description="Branded booking on your website plus an AI phone assistant that handles calls 24/7. Own your patient experience across every channel."
            linkText="Explore Practice Solutions"
            badge="Practice Solutions"
            className="w-full h-[496px]"
          >
            <img src={asset("/landing-page/practiceSolutions.svg")} alt="" className="absolute right-0 top-[40px] h-[85%] w-auto" />
          </BentoCard>

          {/* AI chat card */}
          <BentoCard
            title="AI chat"
            description="Patients are already asking AI for care recommendations. Zocdoc makes sure your practice shows up in the answers."
            className="w-full h-[496px] !border-2 !border-purple-500"
          >
            <img src={asset("/landing-page/AiChat.svg")} alt="" className="absolute right-0 top-0 h-full w-auto" />
          </BentoCard>
        </div>
        </div>
      </section>

      {/* Patient Experience Section */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-13 items-center px-12 py-16">
        <div className="flex flex-col gap-1 items-center text-center max-w-[1046px]">
          <h2 className="text-[44px] font-semibold text-[#1b2228] leading-[60px]">
            Deliver a patient experience that drives loyalty
          </h2>
          <p className="text-base text-[#1b2228] leading-[26px] max-w-[769px]">
            70% of patients prefer booking online. Zocdoc gives them the
            fastest way to do it, and a reason to come back.
          </p>
        </div>

        <div className="flex items-center justify-between w-full gap-8">
          <div className="flex flex-col gap-8 w-[639px] pl-6">
            <NumberedFeature
              number={1}
              title="Easy online scheduling"
              description="A secure, 60-second booking experience. Mobile-friendly, built for every screen."
              active
            />
            <NumberedFeature
              number={2}
              title="Integrated appointment reminders"
            />
            <NumberedFeature
              number={3}
              title="Streamlined intake experience"
            />
            <NumberedFeature number={4} title="Access to video visits" />
            <NumberedFeature
              number={5}
              title="Feedback that fuels better care"
            />
            <NumberedFeature number={6} title="Quick rebookings" />
          </div>

          <div className="bg-[#f8f8f8] border-[1.5px] border-[rgba(73,95,110,0)] rounded-[20px] w-[650px] h-[597px] relative overflow-hidden shrink-0 flex items-center justify-center">
            <img src={asset("/landing-page/patientExp.svg")} alt="" className="h-full w-auto object-contain" />
          </div>
        </div>

        {/* Practice Solutions CTA */}
        <div className="bg-[#eceef0] rounded-2xl p-10 w-full flex items-center justify-between">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center h-8 px-5 rounded-full bg-[#fff0bb] text-sm font-semibold text-[#333] tracking-wide uppercase">
              Practice Solutions
            </div>
            <p className="text-2xl font-semibold text-black mt-3 max-w-[576px] leading-normal">
              Branded booking on your website, an AI phone assistant, and
              advanced scheduling tools for your practice
            </p>
          </div>
          <button className="flex items-center gap-1 text-[#1b2228] text-base font-semibold underline cursor-pointer bg-transparent border-none">
            Explore Practice Solutions
            <ArrowRight className="size-5" />
          </button>
        </div>

        </div>
      </section>

      {/* Dark Section - Growth Toolbox */}
      <section className="bg-[#333]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-13 items-center px-12 py-16">
        <div className="flex flex-col gap-1 items-center text-center max-w-[916px]">
          <h2 className="text-[44px] font-semibold text-white leading-[60px]">
            More than bookings — a whole growth toolbox
          </h2>
          <p className="text-base text-white leading-[26px] max-w-[769px]">
            Manage operations, target the right patients, and scale your
            practice. All from one platform.
          </p>
        </div>

        <div className="flex flex-col gap-8 w-full">
          <div className="flex gap-8">
            <DarkBentoCard
              title="Connect your EHR and keep your data in sync across every channel"
              className="w-[34%] h-[459px]"
            >
              <img src={asset("/landing-page/growthToolbox.svg")} alt="" className="w-[90%] h-auto object-contain" />
            </DarkBentoCard>
            <DarkBentoCard
              title="Set targeting and scheduling rules that fit your practice"
              className="flex-1 h-[459px]"
            >
              <img src={asset("/landing-page/growthToolbox.svg")} alt="" className="w-[90%] h-auto object-contain" />
            </DarkBentoCard>
            <DarkBentoCard
              title="Control spend by provider, location, or channel"
              className="flex-1 h-[459px]"
            >
              <img src={asset("/landing-page/growthToolbox.svg")} alt="" className="w-[90%] h-auto object-contain" />
            </DarkBentoCard>
          </div>

          {/* AI Analytics full-width card */}
          <div className="bg-[#f9f8f7] rounded-[20px] overflow-hidden flex flex-col">
            <div className="flex flex-col gap-2 p-10 pb-0">
              <h3 className="text-2xl font-semibold text-[#333] leading-8">
                Make smart business decisions, quickly, with AI market insights
              </h3>
              <p className="text-base text-[#333] leading-[26px]">
                We give you unique market insights so you understand your appointment volume and trends, how you're performing compared to your peer practices and recommendations on how to boost your performance.
              </p>
              <button className="flex items-center gap-1 text-[#1b2228] text-base font-semibold underline cursor-pointer bg-transparent border-none p-0 mt-2">
                Explore Zocdoc Analytics
                <ArrowRight className="size-5" />
              </button>
            </div>
            <div className="relative h-[400px] overflow-hidden mt-4 mx-10">
              <img src={asset("/landing-page/analytics.svg")} alt="" className="w-full h-auto" />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-13 items-center px-12 py-16">
        <div className="flex flex-col gap-4 items-center text-center max-w-[916px]">
          <h2 className="text-[44px] font-semibold text-[#1b2228] leading-[60px]">
            Start for free. Upgrade to maximize growth.
          </h2>
          <p className="text-base text-[rgba(51,51,51,0.68)] leading-[26px] max-w-[700px]">
            Get a bookable profile across 30+ channels for free. Add
            Marketplace or Practice Solutions anytime.
          </p>
          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 h-12 px-6 bg-[#FEED5A] rounded text-base font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors mt-2"
          >
            Get started for free
            <ArrowRight className="size-5" />
          </button>
        </div>

        <div className="flex gap-8 w-full max-w-[1100px] justify-center">
          {/* Marketplace Card */}
          <div className="flex-1 border border-[rgba(47,40,28,0.15)] rounded-2xl p-8 flex flex-col gap-6">
            <div>
              <p className="text-sm text-[rgba(51,51,51,0.68)] font-medium uppercase tracking-wide">
                Add-on — Per new patient booked fee
              </p>
              <h3 className="text-2xl font-semibold text-[#333] mt-2">
                Marketplace
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {[
                "Reach patients actively searching for care on Zocdoc and premium partner marketplaces",
                "Boost visibility with Sponsored Results",
                "Fill last-minute openings with patients looking for same- or next-day care",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="size-5 text-[#333] shrink-0 mt-0.5" />
                  <p className="text-base text-[#333] leading-[26px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Solutions Card */}
          <div className="flex-1 border border-[rgba(47,40,28,0.15)] rounded-2xl p-8 flex flex-col gap-6">
            <div>
              <p className="text-sm text-[rgba(51,51,51,0.68)] font-medium uppercase tracking-wide">
                Add-on — Per provider monthly fee
              </p>
              <h3 className="text-2xl font-semibold text-[#333] mt-2">
                Practice Solutions
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {[
                "Branded booking on your website to turn more visitors into patients",
                "AI phone assistant that handles calls, books, and reschedules 24/7",
                "Advanced scheduling rules and targeting to match how your front office operates",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="size-5 text-[#333] shrink-0 mt-0.5" />
                  <p className="text-base text-[#333] leading-[26px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Enterprise callout */}
          <div className="flex items-center justify-center gap-3 rounded-full bg-[#f5f5f5] shadow-[0_2px_12px_rgba(0,0,0,0.08)] px-8 py-4">
            <p className="text-base text-[rgba(51,51,51,0.68)]">
              Enterprise? Get custom pricing and white-glove support.
            </p>
            <a
              href="/enterprise"
              className="flex items-center gap-1 text-[#1b2228] text-base font-semibold underline cursor-pointer"
            >
              Contact Sales
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Smart tools for every stage */}
      <section className="bg-[#f8f8f8]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-13 items-center px-12 py-16">
        <h2 className="text-[44px] font-semibold text-[#1b2228] leading-[60px] text-center">
          Smart tools for every stage
        </h2>

        <div className="flex gap-8 w-full max-w-[1100px]">
          {[
            {
              title: "New practices",
              description:
                "Get your practice discovered, attract your first patients, and start building your reputation with reviews.",
              cta: "Explore Marketplace",
            },
            {
              title: "Mid-size practices",
              description:
                "Manage bookings and operations across channels. See where patient demand is heading so you can capture it.",
              cta: "See the tools",
            },
            {
              title: "Enterprises",
              description:
                "Manage your roster and spend across providers and locations. See what's performing and where to invest next.",
              cta: "Talk to our team",
            },
          ].map((stage) => (
            <div
              key={stage.title}
              className="flex-1 bg-white rounded-2xl p-8 flex flex-col gap-4 border border-[rgba(47,40,28,0.08)] overflow-hidden"
            >
              <h3 className="text-xl font-semibold text-[#333]">
                {stage.title}
              </h3>
              <p className="text-base text-[#333] leading-[26px]">
                {stage.description}
              </p>
              <button className="flex items-center gap-1 text-[#1b2228] text-base font-semibold underline cursor-pointer bg-transparent border-none p-0 mt-auto">
                {stage.cta}
                <ArrowRight className="size-5" />
              </button>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="bg-[#f9f8f7]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-13 items-center px-12 py-16">
        <div className="flex flex-col gap-1 items-center text-center max-w-[916px]">
          <h2 className="text-[44px] font-semibold text-[#1b2228] leading-[60px]">
            We're in the business of growing businesses
          </h2>
          <p className="text-base text-[rgba(51,51,51,0.68)] leading-[26px]">
            Don't take our word for it. Hear from our practices.
          </p>
        </div>

        <div className="flex gap-12 w-full max-w-[1100px]">
          {/* Stats column */}
          <div className="flex flex-col gap-6 w-[320px] shrink-0">
            <StatBlock
              value="87%"
              label="of practices say Zocdoc helps them bring in new patients"
            />
            <StatBlock
              value="40"
              label="average number of bookings per provider across channels"
            />
            <StatBlock value="30M+" label="monthly patients across all channels" />
          </div>

          {/* Video testimonial placeholder */}
          <div className="flex-1 min-h-[450px] bg-[#1b2228] rounded-2xl flex items-center justify-center">
            <div className="size-16 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <Play className="size-7 text-white fill-white" />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-13 items-center px-12 py-16">
        <div className="flex flex-col gap-1 items-center text-center max-w-[916px]">
          <h2 className="text-[44px] font-semibold text-[#1b2228] leading-[60px]">
            Get started in minutes
          </h2>
          <p className="text-base text-[rgba(51,51,51,0.68)] leading-[26px] max-w-[600px]">
            Connect your EHR, set your preferences, and start seeing patients
            from every channel — no engineering required.
          </p>
        </div>

        <div className="flex gap-12 w-full max-w-[1100px]">
          <HowItWorksStep
            number={1}
            title="Connect your EHR"
            description="Link your practice management system in a few clicks. We support athenahealth, DrChrono, Elation, and more."
          />
          <HowItWorksStep
            number={2}
            title="Review your setup"
            description="We auto-detect your providers, locations, and appointment types. Review and adjust as needed."
          />
          <HowItWorksStep
            number={3}
            title="Go live on every channel"
            description="Activate Marketplace, Google, insurance directories, and your own website — all from one dashboard."
          />
        </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1b2228]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6 items-center px-12 py-20">
        <h2 className="text-[44px] font-semibold text-white leading-[60px] text-center">
          Ready to grow your practice?
        </h2>
        <p className="text-base text-[rgba(255,255,255,0.7)] leading-[26px] text-center max-w-[600px]">
          Join 50,000+ practices using Zocdoc to reach patients across every
          channel.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 h-14 px-8 bg-[#FEED5A] rounded text-base font-semibold text-[#333] cursor-pointer border-none hover:bg-[#fde84a] transition-colors"
          >
            Get started for free
            <ArrowRight className="size-5" />
          </button>
          <button className="h-14 px-8 rounded border border-[rgba(255,255,255,0.3)] text-base font-semibold text-white cursor-pointer bg-transparent hover:bg-[rgba(255,255,255,0.05)] transition-colors">
            Talk with Sales
          </button>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1b2228] border-t border-[rgba(255,255,255,0.1)]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-15 py-10">
          <div className="flex items-center gap-2">
            <img
              src={asset("/logo/zee_rgb.svg")}
              alt="Zocdoc"
              className="h-8 brightness-0 invert"
            />
            <span className="text-lg font-bold text-white tracking-tight">
              Zocdoc
            </span>
          </div>
          <p className="text-sm text-[rgba(255,255,255,0.5)]">
            &copy; 2026 Zocdoc, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
