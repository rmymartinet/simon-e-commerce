import { CiCircleCheck } from "react-icons/ci";

const COACHING_DATA = {
  3: {
    price: "6.30€/jours",
    features: [
      "Ajustements bi-mensuels",
      "Planification de la récupération",
      "Support prioritaire 24/7",
      "Séances de coaching en visioconférence mensuelles",
    ],
  },
  6: {
    price: "5.50€/jours",
    features: [
      "Ajustements hebdomadaires",
      "Planification de la récupération avancée",
      "Bilan de progression intermédiaire",
      "Séances de coaching en visio bimensuelles",
      "Accès à des ressources exclusives",
    ],
  },
  9: {
    price: "5.30€/jours",
    features: [
      "Programme d'entraînement évolutif",
      "Évaluation trimestrielle complète",
      "Conseils nutrition avancés et réévaluations régulières",
      "Séances de coaching en visio (hebdomadaires au besoin)",
      "Accès à des challenges mensuels exclusifs",
      "Plan de maintien personnalisé en fin de programme",
    ],
  },
};

type Month = 3 | 6 | 9;

export default function CoachingCard({ months }: { months: Month }) {
  const data = COACHING_DATA[months];

  if (!data) return <p>Offre non disponible</p>;

  return (
    <div className="rounded-xl p-6 w-full max-w-md  border text-white shadow-2xl">
      <h2 className="text-center text-5xl font-bold">{months} MOIS</h2>
      <p className="text-center text-lg font-semibold text-purple-400 mt-2">
        Soit {data.price}
      </p>

      <ul className="mt-6 space-y-4">
        {data.features.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <CiCircleCheck className="text-purple-400 w-8 h-8 mt-1" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}