import React, { useState } from "react";
import Button from "./Button";

function OffersOverview() {
  const [filter, setFilter] = useState("program");

  const programData = [
    {
      title: "Débutant",
      description:
        "Faites vos premiers pas en toute confiance. Découvrez un programme conçu pour vous guider et vous motiver dès le départ.",
    },
    {
      title: "Intermédiaire",
      description:
        "Passez au niveau supérieur ! Affinez votre technique et maximisez vos résultats avec un accompagnement adapté à vos progrès.",
    },
    {
      title: "Avancé",
      description:
        "Concentrez-vous sur la performance ! Accédez à des programmes spécialisés conçus pour les athlètes déterminés à se dépasser.",
    },
  ];

  const coachingData = [
    {
      title: "3 mois",
      description:
        "Initiez votre transformation dès aujourd’hui. Adoptez des habitudes saines et posez les bases d’un changement durable. Parfait pour débuter en toute confiance et voir les premiers résultats.",
    },
    {
      title: "6 mois",
      description:
        "Consolidez vos acquis et dépassez vos limites. Le juste équilibre entre efficacité et durée pour faire passer votre progression au niveau supérieur.",
    },
    {
      title: "9 mois",
      description:
        "Atteignez l’excellence avec un suivi intensif et sur mesure. L’engagement ultime pour une transformation profonde, durable et à la hauteur de vos ambitions",
    },
  ];

  return (
    <div className="mt-[20vh] flex h-screen w-full flex-col items-center gap-8 lg:mt-[30vh]">
      <h1 className="mb-20 ml-4 self-start text-4xl lg:text-7xl">
        Des plans pensés pour vous
      </h1>
      <div className="grid grid-cols-2 text-xl">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setFilter("program")}
            className={`${filter === "program" ? "text-white" : "text-muted"} transition-all duration-200 ease-linear`}
          >
            Programmes
          </button>
          <div
            className={`h-[1px] w-full ${filter === "program" ? "bg-white" : "bg-muted"} transition-all duration-200 ease-linear`}
          ></div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setFilter("coaching")}
            className={`${filter === "coaching" ? "text-white" : "text-muted"} transition-all duration-200 ease-linear`}
          >
            Coaching
          </button>
          <div
            className={`h-[1px] w-full ${filter === "coaching" ? "bg-white" : "bg-muted"} transition-all duration-200 ease-linear`}
          ></div>
        </div>
      </div>
      <div className="w-full justify-items-center lg:grid lg:grid-cols-3">
        {filter === "program" &&
          programData.map((data, index) => (
            <div
              key={index}
              className={`grid h-[40vh] w-full grid-rows-3 items-center justify-items-center gap-10 border-b border-t border-muted p-10 lg:items-start ${index === 1 ? "lg:border-l lg:border-r" : ""}`}
            >
              <h2 className="text-3xl">{data.title}</h2>
              <p className="text-center lg:text-start">{data.description}</p>
              <Button href="/pricing" />
            </div>
          ))}
        {filter === "coaching" &&
          coachingData.map((data, index) => (
            <div
              key={index}
              className={`grid h-[40vh] w-full grid-rows-3 items-center justify-items-center gap-10 border-b border-t border-muted p-10 lg:items-start ${index === 1 ? "lg:border-l lg:border-r" : ""}`}
            >
              <h2 className="text-3xl">{data.title}</h2>
              <p>{data.description}</p>
              <Button href="/pricing" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default OffersOverview;
