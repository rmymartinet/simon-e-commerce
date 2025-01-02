import {
  coachingIncludes3Month,
  coachingIncludes6Month,
  coachingIncludes9Month,
  programIncludes,
} from "./cardPriceData";

export const coachingData = [
  {
    type: "Coaching",
    titlePlan: "Essai",
    month: 3,
    dayPrice: "5",
    price: 147,
    description:
      "Testez nos services et observez les premiers changements. Parfait pour initier votre transformation de style de vie.",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
    includes: coachingIncludes3Month,
    imageUrl: "/images/about/about_simon.webp",
  },
  {
    type: "Coaching",
    titlePlan: "Standard",
    month: 6,
    dayPrice: "4,50",
    price: 127,
    description:
      "Ancrez des habitudes saines et obtenez des résultats durables. Le meilleur équilibre entre durée et efficacité.",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
    mostPopular: true,
    includes: coachingIncludes6Month,
    imageUrl: "/images/about/about_simon.webp",
  },
  {
    type: "Coaching",
    titlePlan: "Intensif",
    month: 9,
    dayPrice: "4",
    price: 107,
    description:
      "Transformez-vous totalement avec un suivi intensif. L'engagement ultime pour un changement profond et pérenne.",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
    includes: coachingIncludes9Month,
    imageUrl: "/images/about/about_simon.webp",
  },
];

export const programData = [
  {
    type: "Programmes",
    titlePlan: "Débutant",
    month: 0,
    price: 77,
    description:
      "Un programme simple pour bien démarrer et poser les bases d’une nouvelle routine. Idéal pour débuter en douceur",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PROGRAM_BEGINNER_PRICE_ID!,
    includes: programIncludes,
    imageUrl: "/images/card_program/beginner.png",
  },
  {
    type: "Programmes",
    titlePlan: "Intermédiaire",
    month: 0,
    price: 87,
    description:
      "Consolidez vos acquis et progressez à votre rythme. Une approche équilibrée pour des résultats visibles",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PROGRAM_BEGINNER_PRICE_ID!,
    mostPopular: true,
    includes: programIncludes,
    imageUrl: "/images/card_program/intermediate.png",
  },
  {
    type: "Programmes",
    titlePlan: "Avancé",
    month: 0,
    price: 97,
    description:
      "Pour ceux qui veulent aller plus loin : un programme complet pour des objectifs ambitieux",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PROGRAM_BEGINNER_PRICE_ID!,
    includes: programIncludes,
    imageUrl: "/images/card_program/advanced.png",
  },
];
