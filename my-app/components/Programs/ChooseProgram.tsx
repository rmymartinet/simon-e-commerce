import React from "react";

export default function ChooseProgram() {
  return (
    <section className="mt-[20vh] flex flex-col items-center gap-8">
      <div className="mb-20 flex flex-col items-center gap-6">
        <h1 className="mb-2 text-center text-4xl font-bold leading-tight md:text-5xl">
          Comment choisir ton programme ?
        </h1>
        <p className="text-center md:max-w-[70vw]">
          Nos programmes sont organisés par{" "}
          <strong>niveau d&apos;expérience en musculation</strong>, pas par
          objectif (prise de masse, sèche, recomposition). Pourquoi ? Parce que
          la technique, le volume d&apos;entraînement et la progression doivent
          être adaptés à ton vécu sportif, pas à ce que tu veux atteindre.
        </p>
      </div>
      <h3 className="self-start text-xl font-semibold">
        Choisis selon ton expérience :
      </h3>
      <div className="flex w-full flex-col">
        <div className="grid grid-cols-2 py-4">
          <span className="font-bold">Débutant</span>{" "}
          <p>
            Tu débutes ou reprends après une longue pause (moins de 6 mois de
            pratique régulière).
          </p>
        </div>
        <div className="grid grid-cols-2 border-t border-gray-700 py-4">
          <span className="font-bold">Intermédiaire</span>{" "}
          <p>
            Tu t&apos;entraînes régulièrement depuis 1 à 3 ans et maîtrises les
            mouvements de base. Avancé
          </p>
        </div>
        <div className="grid grid-cols-2 border-t border-gray-700 py-4">
          <span className="font-bold">Avancé</span>{" "}
          <p>
            Tu pratiques depuis plus de 3 ans avec une technique solide et des
            performances établies.
          </p>
        </div>
      </div>
    </section>
  );
}
