import Link from "next/link"
import { Button } from "./ui/button"

const CoachingsProgramsButtons = () => {
    return (
        <div className="flex gap-4">
  <Button asChild className="bg-violet-400 text-white">
    <Link href="/coachings">
      Coachings
    </Link>
  </Button>
  <Button asChild className="bg-violet-400 text-white">
    <Link href="/programs">
      Programmes
    </Link>
  </Button>
</div>
    )
}

export default CoachingsProgramsButtons;