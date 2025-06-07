"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const slidesData = [
  {
    title: "Plans d'entraînements",
    img: "/images/coachings/goldgym.jpeg",
  },
  {
    title: "Nutritions avancés",
    img: "/images/coachings/simon.png",
  },
  {
    title: "Évaluation trimestrielle complète",
    img: "/images/coachings/nutrition.jpg",
  },
  {
    title: "Séances en visio (hebdo)",
    img: "/images/virtualgym_app/stat_app.jpeg",
  },
];

export default function PremiumCoachingsSlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const firstSlideRef = useRef<HTMLDivElement | null>(null);
  const [slideWidth, setSlideWidth] = useState<number>(0);

  // Au montage, on mesure la largeur d'un "slide" (incluant son margin-right = space-x-4)
  useEffect(() => {
    try {
      if (firstSlideRef.current) {
        const w = firstSlideRef.current.getBoundingClientRect().width;
        setSlideWidth(w + 16);
      }
    } catch (error) {
      console.error("Erreur lors du calcul de la largeur du slide:", error);
    }
  }, []);

  const handlePrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col gap-20 bg-black py-12 pl-20 text-white">
      {/* ── Bandeau supérieur (Titre + Description + Boutons) ── */}
      <div className="mx-auto grid grid-cols-2">
        {/* Titre à gauche */}
        <div className="mb-8">
          <h2 className="text-6xl font-bold uppercase md:text-6xl">
            Suivi <br /> <span className="font-bold">Premium</span>
          </h2>
        </div>

        {/* Texte descriptif + boutons à droite */}
        <div className="pr-20">
          <p className="text-base leading-relaxed md:text-lg">
            Un accompagnement complet et personnalisé pour atteindre tes
            objectifs. Du plan d&apos;entraînement sur-mesure à
            l&apos;évaluation régulière, je t&apos;accompagne pas à pas avec des
            outils pro, des conseils adaptés et un suivi régulier pour garantir
            des résultats durables.
          </p>

          <div className="mt-6 flex space-x-4">
            <button className="rounded-md border border-[#ceff65] px-4 py-1 text-[#ceff65] transition hover:bg-[#ceff65] hover:text-black">
              Disponibilité 7j/7
            </button>
            <button className="rounded-md border border-[#ceff65] px-4 py-1 text-[#ceff65] transition hover:bg-[#ceff65] hover:text-black">
              Outils pro inclus
            </button>
          </div>
        </div>
      </div>

      {/* ── Slider horizontal ── */}
      <div className="relative mt-12 pb-20">
        {/* Conteneur scrollable */}
        <div
          ref={sliderRef}
          className="-ms-overflow-style:none scrollbar-width:none flex space-x-8 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
        >
          {slidesData.map((slide, idx) => (
            <div
              key={idx}
              ref={idx === 0 ? firstSlideRef : null}
              className="relative aspect-[4/5] h-[30rem] w-64 flex-shrink-0 snap-center overflow-hidden rounded-xl bg-gray-800 sm:w-72 md:w-[22rem]"
            >
              {/* Image de fond */}
              <Image
                src={slide.img}
                alt={slide.title}
                className="h-full w-full object-cover"
                width={700}
                height={700}
                quality={100}
              />
              {/* Overlay texte en bas à gauche */}
              <div className="absolute bottom-4 left-4">
                <span className="text-lg font-semibold text-white drop-shadow-md sm:text-xl">
                  {slide.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute -bottom-10 right-20 flex gap-4">
          {/* Flèche « Précédent » */}
          <button
            onClick={handlePrev}
            className="rounded-full border border-[#ceff65] p-2 text-[#ceff65] transition hover:bg-[#ceff65] hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Flèche « Suivant » */}
          <button
            onClick={handleNext}
            className="rounded-full border border-[#ceff65] p-2 text-[#ceff65] transition hover:bg-[#ceff65] hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}