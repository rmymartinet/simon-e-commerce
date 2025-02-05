import { faqCoachingData, faqProgramData } from "../data/faqData";
import Accordion from "./Accordion";

const Faq = ({ filterName }: { filterName: string }) => {
  return (
    <section className="relative self-center">
      <div className="mb-20 flex flex-col justify-center lg:items-center">
        <h1 className="text-3xl md:text-4xl lg:text-7xl">Faq</h1>
        <p className="font-medium text-muted md:text-xl">
          Les questions les plus fréquemment posées.
        </p>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
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
