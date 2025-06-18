import Link from "next/link"
import { Button } from "./ui/button"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { animateBlockRevealOnScroll } from "@/utils/Animation"

const CoachingsProgramsButtons = ({variant = "purpleBg"}: {variant?: "purpleBg" | "whiteBg" | "whitetopurple"}) => {

  const coachingsProgramsButtonsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (coachingsProgramsButtonsRef.current) {
      animateBlockRevealOnScroll({current: coachingsProgramsButtonsRef.current}, 0.5)
    }
  }, [])


    return (
        <div ref={coachingsProgramsButtonsRef} className="flex gap-4">
  <Button asChild variant={variant} >
    <Link href="/coachings">
      Coachings
    </Link>
  </Button>
  <Button asChild variant={variant} >
    <Link href="/programs">
      Programmes
    </Link>
  </Button>
</div>
    )
}

export default CoachingsProgramsButtons;