import ProgramsOverview from "@/components/Programs/ProgramsDetails";
import TitleComponent from "@/components/TitleComponent";
import Faq from "@/components/Faq/Faq";
import ProgramsCard from "@/components/Programs/ProgramsCard";
import ChooseProgram from "@/components/Programs/ChooseProgram";

export default function Programs() {
  return (
    <>
      <TitleComponent
        title="Programmes"
        titleIndication="programmes"
        subtitle="Découvrez nos programmes de coaching pour atteindre vos objectifs."
      />
      <ProgramsCard isProgramPage={true} />
      <ChooseProgram />
      <ProgramsOverview />
      <Faq />
    </>
  );
}
