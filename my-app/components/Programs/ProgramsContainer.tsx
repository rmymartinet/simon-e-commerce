import TitleComponent from "../TitleComponent";
import ProgramsCard from "./ProgramsCard";

export function ProgramsContainer() {
  return (
    <div className="relative mt-[20vh] grid w-full place-content-center">
      <TitleComponent
        title="Des programmes sur mesure selon ton niveau"
        titleIndication="programmes"
        subtitle="Que tu sois débutant, intermédiaire ou avancé, tu peux progresser à ton rythme avec un plan adapté à ton niveau, à ta disponibilité, et à ton objectif."
        isTextSplitLines={false}
      />
      <ProgramsCard />
    </div>
  );
}

export default ProgramsContainer;
