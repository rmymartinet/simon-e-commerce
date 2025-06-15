"use client";

import React, { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";

// Types
type Month = 3 | 6 | 9;

interface Option {
  label: string;
  value: Month;
  dayPrice: string;
  pricePerMonth: number;
  description: string;
  badge?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  features: string[];
}

const BASE_PRICE = 189;

interface DurationSelectorProps {
  onChange: (value: number) => void;
  selectedDuration: number;
}

export default function DurationSelector({ onChange, selectedDuration }: DurationSelectorProps) {
  const [selected, setSelected] = useState(selectedDuration);

  const calculateSavingsPercentage = (price: number) => {
    const savings = BASE_PRICE - price;
    return Math.round((savings / BASE_PRICE) * 100);
  };

  const options: Option[] = [
    {
      label: "3 mois",
      value: 3,
      dayPrice: "5.00",
      pricePerMonth: 189,
      description: "Suivi intensif 3 mois – idéal pour tester et démarrer fort",
      features: [
        "Ajustements bi-mensuels",
        "Planification de la récupération",
        "Support prioritaire 24/7",
        "Séances de coaching en visioconférence mensuelles",
      ],
    },
    {
      label: "6 mois",
      value: 6,
      dayPrice: "4.50",
      pricePerMonth: 165,
      description: "Suivi sur 6 mois – résultats durables, tarif mensuel allégé",
      badge: `- ${calculateSavingsPercentage(165)}%`,
      badgeColor: "bg-green-500",
      badgeTextColor: "text-white",
      features: [
        "Ajustements hebdomadaires",
        "Planification de la récupération avancée",
        "Bilan de progression intermédiaire",
        "Séances de coaching en visio bimensuelles",
        "Accès à des ressources exclusives",
      ],
    },
    {
      label: "9 mois",
      value: 9,
      dayPrice: "4.00",
      pricePerMonth: 159,
      description: "Suivi sur 9 mois – transformation complète à petit prix",
      badge: `- ${calculateSavingsPercentage(159)}%`,
      badgeColor: "bg-green-500",
      badgeTextColor: "text-white",
      features: [
        "Programme d'entraînement évolutif",
        "Évaluation trimestrielle complète",
        "Conseils nutrition avancés et réévaluations régulières",
        "Séances de coaching en visio (hebdomadaires au besoin)",
        "Accès à des challenges mensuels exclusifs",
        "Plan de maintien personnalisé en fin de programme",
      ],
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value) as Month;
    setSelected(newValue);
    onChange?.(newValue);
  };

  return (
    <fieldset className="space-y-4">
      {options.map((opt) => {
        const isChecked = selected === opt.value;
        
        return (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-start rounded-lg border px-4 py-3 transition ${
              isChecked ? "border-green-500 bg-green-50" : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              name="duration"
              value={opt.value}
              checked={isChecked}
              onChange={handleChange}
              className="sr-only"
            />

            <span className={`mt-1 grid h-5 w-5 flex-shrink-0 place-content-center rounded-full border-2 transition ${
              isChecked ? "border-green-500 bg-green-500" : "border-gray-400 bg-white"
            }`}>
              {isChecked && <span className="mx-auto block h-3 w-3 rounded-full bg-white" />}
            </span>

            <div className="relative ml-4 flex w-full flex-col">
              <div className="flex items-start justify-between">
                <span className={`font-medium text-lg ${isChecked ? "text-gray-900" : "text-gray-800"}`}>
                  {opt.label}
                </span>

                <div className="flex flex-col items-end">
                  <span className={`font-semibold ${isChecked ? "text-green-600" : "text-gray-700"}`}>
                    {opt.pricePerMonth} €/mois
                  </span>
                  <span className="text-sm text-[--subtext]">
                    soit {opt.dayPrice} €/jour
                  </span>
                </div>
              </div>

              <p className="mt-1 text-sm text-gray-600">{opt.description}</p>

              {opt.badge && (
                <span className={`absolute -top-[30px] right-0 mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${opt.badgeColor} ${opt.badgeTextColor}`}>
                  {opt.badge}
                </span>
              )}

              {isChecked && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-black">
                  <ul className="space-y-2">
                    {opt.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <CiCircleCheck className="text-green-500 w-5 h-5 mt-0.5 flex-shrink-0 font-bold" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </label>
        );
      })}
    </fieldset>
  );
}
