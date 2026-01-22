"use client";

import { faqCoachingData, faqProgramData } from "@/app/data/faqData";
import { useRef, useEffect, useState, useCallback } from "react";
import TitleComponent from "../TitleComponent";
import Accordion from "../Accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  label: string;
  data: FaqItem[];
}

interface FaqQuestion extends FaqItem {
  sectionId: string;
  categoryId: string;
}

const faqCategories: FaqCategory[] = [
  { id: "coaching", label: "Coaching", data: faqCoachingData },
  { id: "programmes", label: "Programmes", data: faqProgramData },
  // Ajoute d'autres catégories si besoin
];

// Génère la liste des questions pour le scrollspy
const allQuestions: FaqQuestion[] = faqCategories.flatMap((cat) =>
  cat.data.map((q, idx) => ({
    ...q,
    sectionId: `${cat.id}-${idx}`,
    categoryId: cat.id,
  })),
);

export default function Faq() {
  const [activeCat, setActiveCat] = useState<string>(faqCategories[0].id);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const offsets = sectionRefs.current.map((ref) => {
      if (!ref) return Number.POSITIVE_INFINITY;
      const rect = ref.getBoundingClientRect();
      return Math.abs(rect.top - window.innerHeight * 0.22);
    });

    const minIndex = offsets.indexOf(Math.min(...offsets));
    if (allQuestions[minIndex]) {
      setActiveCat(allQuestions[minIndex].categoryId);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback(
    (catId: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      const firstSectionIdx = allQuestions.findIndex(
        (q) => q.categoryId === catId,
      );
      sectionRefs.current[firstSectionIdx]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveCat(catId);
    },
    [],
  );

  return (
    <section className="relative mx-auto mt-[20vh]">
      <div className="max-w-7xl px-4">
        <TitleComponent
          title="Questions fréquentes"
          subtitle="Voici les questions les plus fréquemment posées. Si vous avez d'autres questions, n'hésitez pas à nous contacter."
          titleIndication="Questions fréquentes"
        />
        <div className="mt-20 flex flex-col gap-8 md:flex-row">
          {/* Menu catégories - visible uniquement en desktop */}
          <nav className="z-10 mr-[10vw] hidden gap-2 self-start rounded-2xl p-10 md:sticky md:top-28 md:flex md:min-w-[160px] md:flex-col md:gap-8">
            {faqCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={scrollToSection(cat.id)}
                className={`text-lg font-bold transition-all duration-200 md:text-2xl ${
                  activeCat === cat.id
                    ? "rounded-full bg-black text-white shadow-md"
                    : "text-[] hover:text-gray-600"
                } `}
                style={{
                  opacity: activeCat === cat.id ? 1 : 0.5,
                  pointerEvents: activeCat === cat.id ? "none" : "auto",
                }}
              >
                {cat.label}
              </a>
            ))}
          </nav>

          {/* Questions FAQ */}
          <div className="flex flex-1 flex-col gap-6">
            {faqCategories.map((cat, catIndex) => (
              <div key={cat.id} className="flex flex-col gap-12">
                {/* Titre de catégorie - visible uniquement en mobile */}
                <h2 className="mb-4 text-center text-2xl font-bold md:hidden">
                  {cat.label}
                </h2>
                {cat.data.map((q, idx) => {
                  const sectionId = `${cat.id}-${idx}`;
                  const refIdx = allQuestions.findIndex(
                    (qq) => qq.sectionId === sectionId,
                  );
                  return (
                    <section
                      key={sectionId}
                      id={sectionId}
                      ref={(el) => {
                        sectionRefs.current[refIdx] = el;
                      }}
                      className="flex scroll-mt-32 items-center border-b border-gray-700"
                    >
                      <Accordion
                        index={idx}
                        title={q.question}
                        text={q.answer}
                        logoColor="text-white"
                      />
                    </section>
                  );
                })}
                {/* Ligne de séparation entre les catégories */}
                {catIndex < faqCategories.length - 1 && (
                  <div className="my-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
