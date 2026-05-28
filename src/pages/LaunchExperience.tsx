import { useState, useCallback, useRef } from "react"
import { useNavigate } from "@/lib/router"
import { useHome } from "@/context/HomeContext"
import { LaunchAnimation } from "@/components/launch/LaunchAnimation"
import { LaunchConfirmation } from "@/components/launch/LaunchConfirmation"
import { LaunchProductActivation } from "@/components/launch/LaunchProductActivation"

type Phase = "animating" | "confirmation" | "products"

export function LaunchExperiencePage() {
  const [phase, setPhase] = useState<Phase>("animating")
  const navigate = useNavigate()
  const { hasLaunched, setActivationState, setHasLaunched, completeTask, setPostPhase } =
    useHome()
  const exitingRef = useRef(false)

  const finishLaunch = useCallback(
    (destination: string) => {
      if (exitingRef.current) return
      exitingRef.current = true
      completeTask("task-5")
      setHasLaunched(true)
      setActivationState("post")
      setPostPhase("just-launched")
      navigate(destination, { replace: true })
    },
    [completeTask, setHasLaunched, setActivationState, setPostPhase, navigate]
  )

  const handleAnimationComplete = useCallback(() => {
    setPhase("confirmation")
  }, [])

  const handleContinueToProducts = useCallback(() => {
    setPhase("products")
  }, [])

  const handleDismiss = useCallback(() => {
    finishLaunch("/dashboard/home")
  }, [finishLaunch])

  const handleNavigate = useCallback(
    (path: string) => {
      finishLaunch(path)
    },
    [finishLaunch]
  )

  if (hasLaunched && !exitingRef.current) {
    navigate("/dashboard/home", { replace: true })
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {phase === "animating" ? (
        <div className="animate-fadeIn">
          <LaunchAnimation onComplete={handleAnimationComplete} />
        </div>
      ) : phase === "confirmation" ? (
        <div className="animate-fadeIn">
          <LaunchConfirmation
            onDismiss={handleDismiss}
            onNavigate={handleNavigate}
            onContinue={handleContinueToProducts}
          />
        </div>
      ) : (
        <div className="animate-fadeIn">
          <LaunchProductActivation
            onActivate={handleNavigate}
            onSkip={handleDismiss}
          />
        </div>
      )}
    </div>
  )
}
