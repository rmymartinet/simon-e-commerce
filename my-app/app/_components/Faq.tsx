import { faqData } from "../data/faq";
import Accordion from "./Accordion";

const Faq = () => {
  return (
    <section className="relative self-center md:w-[70%]">
      <div className="mb-20 flex flex-col items-center justify-center gap-4">
        <h1 className="text-7xl">Faq</h1>
        <p className="text-slate-400">
          The most common questions we get asked.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        {faqData.map((item, index) => (
          <Accordion key={index} title={item.question} text={item.answer} />
        ))}
      </div>
    </section>
  );
};

export default Faq;
