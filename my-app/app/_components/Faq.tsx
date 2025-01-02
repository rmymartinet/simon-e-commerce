import Image from "next/image";
import { faqCoachingData, faqProgramData } from "../data/faqData";
import Accordion from "./Accordion";

const Faq = ({ filterName }: { filterName: string }) => {
  return (
    <section className="relative self-center lg:w-[70%]">
      <div className="absolute right-0 top-[20%] -z-10 h-[60%] w-[90%] translate-x-1/2">
        <Image
          src="/images/cube_mono.jpeg"
          alt=""
          width={2000}
          height={2000}
          className="h-max w-max object-contain"
        />
      </div>
      <div className="mb-20 flex flex-col items-center justify-center">
        <h1 className="text-7xl font-bold">Faq</h1>
        <p className="text-lg font-semibold text-textOpacity">
          Les questions les plus fréquemment posées.
        </p>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
        {filterName === "programmes"
          ? faqProgramData.map(
              (item: { question: string; answer: string }, index: number) => (
                <Accordion
                  key={index}
                  title={item.question}
                  text={item.answer}
                />
              ),
            )
          : faqCoachingData.map(
              (item: { question: string; answer: string }, index: number) => (
                <Accordion
                  key={index}
                  title={item.question}
                  text={item.answer}
                />
              ),
            )}
      </div>
    </section>
  );
};

export default Faq;
