import ProgramsOverview from "@/components/Programs/ProgramsDetails";
import TitleComponent from "@/components/TitleComponent";
import ProgramsComponents from "@/components/Programs/ProgramsComponents";
import Faq from "@/components/Faq/Faq";

export default function Programs() {
  return (
    <main className="relative mt-[20vh] flex min-h-screen w-screen flex-col items-center justify-center gap-20 px-4">
      <TitleComponent
        title="Programmes"
        titleIndication="programmes"
        subtitle="Découvrez nos programmes de coaching pour atteindre vos objectifs."
      />
      <ProgramsComponents />
      <ProgramsOverview />
      <Faq />
    </main>
  );
}
