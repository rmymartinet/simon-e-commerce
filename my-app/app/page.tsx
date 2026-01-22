import BeforeAfterPhoto from "@/components/BeforeAfterPhoto";
import CoachingContainer from "@/components/coaching/CoachingContainer";
import Header from "@/components/Header/Header";
import ProgramsContainer from "@/components/Programs/ProgramsContainer";
// import Youtube from "@/components/Programs/Youtube";

export default function Home() {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex flex-col items-center px-4">
      <Header />
      {/* <CalendlyContainer /> */}
      {/* <CalendlyCallModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <ProgramsContainer />
      <CoachingContainer />
      {/* <Youtube /> */}
      <BeforeAfterPhoto />
    </section>
  );
}
