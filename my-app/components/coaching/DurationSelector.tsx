"use client";

import React, { useState } from "react";

interface DurationSelectorProps {
  onChange: (value: number) => void;
  selectedDuration: number;
}

export default function DurationSelector({ onChange }: DurationSelectorProps) {
  // On stocke ici la durée sélectionnée (en mois). Valeur par défaut = "3"
  const [selected, setSelected] = useState(3);

  // Tableau d’options : label (affiché), value (en mois) et prix correspondant
  // Fonction pour calculer le pourcentage d'économie
  const calculateSavingsPercentage = (price: number) => {
    const basePrice = 189; // Prix de référence (6 mois)
    const savings = basePrice - price;
    return Math.round((savings / basePrice) * 100);
  };

  const options = [
    {
      label: "3 mois",
      value: "3",
      dayPrice: "5.00",
      pricePerMonth: 189,
      description: "Suivi intensif 3 mois – idéal pour tester et démarrer fort",
    },
    {
      label: "6 mois",
      value: "6",
      dayPrice: "4.50",
      pricePerMonth: 165,
      description:
        "Suivi sur 6 mois – résultats durables, tarif mensuel allégé",
      badge: `- ${calculateSavingsPercentage(165)}%`,
      badgeColor: "bg-green-500",
      badgeTextColor: "text-white",
    },
    {
      label: "9 mois",
      value: "9",
      dayPrice: "4.00",
      pricePerMonth: 159,
      description: "Suivi sur 9 mois – transformation complète à petit prix",
      badge: `- ${calculateSavingsPercentage(159)}%`,
      badgeColor: "bg-green-500",
      badgeTextColor: "text-white",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nouvelleValeur = e.target.value;
    setSelected(Number(nouvelleValeur));
    if (typeof onChange === "function") {
      onChange(Number(nouvelleValeur));
    }
  };

  return (
    <fieldset className="space-y-4">
      {options.map((opt) => {
        const isChecked = selected === Number(opt.value);
        return (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-start rounded-lg border px-4 py-3 transition ${
              isChecked
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            } `}
          >
            {/* Input radio, masqué mais accessible */}
            <input
              type="radio"
              name="duration"
              value={opt.value}
              checked={isChecked}
              onChange={handleChange}
              className="sr-only"
            />

            {/* Cercle de sélection */}
            <span
              className={`mt-1 grid h-5 w-5 flex-shrink-0 place-content-center rounded-full border-2 transition ${
                isChecked
                  ? "border-green-500 bg-green-500"
                  : "border-gray-400 bg-white"
              } `}
            >
              {isChecked && (
                <span className="mx-auto block h-3 w-3 rounded-full bg-white"></span>
              )}
            </span>

            {/* Espace entre le cercle et le contenu */}
            <div className="relative ml-4 flex w-full flex-col">
              <div className="flex items-center justify-between">
                <span
                  className={`font-medium ${
                    isChecked ? "text-gray-900" : "text-gray-800"
                  } `}
                >
                  {opt.label}
                </span>

                {/* Prix mensuel affiché */}
                <span
                  className={`font-semibold ${
                    isChecked ? "text-green-600" : "text-gray-700"
                  } `}
                >
                  {opt.pricePerMonth} €/mois
                </span>
              </div>

              {/* Description plus petite sous le label */}
              <p className="mt-1 text-sm text-gray-600">{opt.description}</p>

              {/* Badge optionnel (par exemple “PROMO”) */}
              {opt.badge && (
                <span
                  className={`absolute -top-[30px] right-0 mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${opt.badgeColor} ${opt.badgeTextColor} `}
                >
                  {opt.badge}
                </span>
              )}
            </div>
          </label>
        );
      })}
    </fieldset>
  );
}
