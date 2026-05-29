import { useNavigate, asset } from "@/lib/router"

export function WellHiveLandingPage() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-full overflow-y-auto bg-white">
      <div className="relative w-full">
        <img
          src={asset("/landing-page/wellhive.png")}
          alt="WellHive Landing Page"
          className="w-full h-auto block"
        />
        {/* Clickable overlay on hero "Sign up" button */}
        <button
          onClick={() => navigate("/signup/combined?source=wellhive")}
          className="absolute cursor-pointer bg-transparent border-none"
          style={{ top: "44.5%", left: "26%", width: "5.5%", height: "5%" }}
          aria-label="Sign up"
        />
        {/* Clickable overlay on header "Sign up" button */}
        <button
          onClick={() => navigate("/signup/combined?source=wellhive")}
          className="absolute cursor-pointer bg-transparent border-none"
          style={{ top: "2.5%", left: "84%", width: "5.5%", height: "4.5%" }}
          aria-label="Sign up"
        />
      </div>
    </div>
  )
}
