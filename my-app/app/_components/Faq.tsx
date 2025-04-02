import { faqCoachingData, faqProgramData } from "../data/faqData";
import Accordion from "./Accordion";
import TitleComponent from "./TitleComponent";

const Faq = ({ filterName }: { filterName: string }) => {
  return (
    <section className="relative self-center">
      <TitleComponent
        isTextSplitLines={false}
        title="Faq"
        subtitle="Les questions les plus fréquemment posées."
      />

      <div className="mt-20 flex flex-col gap-4 overflow-hidden">
        {filterName === "programmes"
          ? faqProgramData.map(
              (item: { question: string; answer: string }, index: number) => (
                <div key={index}>
                  <Accordion
                    index={index}
                    title={item.question}
                    text={item.answer}
                    logoColor="text-white"
                  />
                  <div className="h-[1px] w-full bg-muted"></div>
                </div>
              ),
            )
          : faqCoachingData.map(
              (item: { question: string; answer: string }, index: number) => (
                <div key={index}>
                  <Accordion
                    index={index}
                    title={item.question}
                    text={item.answer}
                    logoColor="text-white"
                  />
                  <div className="h-[1px] w-full bg-muted"></div>
                </div>
              ),
            )}
      </div>
    </section>
  );
};

export default Faq;
