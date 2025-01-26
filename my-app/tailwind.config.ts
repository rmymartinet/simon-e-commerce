/* eslint-disable */
import { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        subtle: "#6e7681",
        muted: "#8b8b8b",
        card: "#000000cf",
        light: "#E0E0E0",
      },
      gridTemplateColumns: {
        custom: "20vw minmax(20vw, 1fr) minmax(20vw, 1fr)",
        blogCustom: "2fr 1fr",
        connexionModal: "1fr max-content 1fr",
        coachingNutrition: "max-content 1fr max-content",
      },
      gridTemplateRows: {
        cardPrice: "120px max-content max-content",
        featuresCard: "280px max-content",
        feedBackContainer: "max-content 1fr",
        feedBackCard: "max-content 1fr max-content",
      },
      gridColumn: {
        "start-1-end-2": "1 / 2",
        "start-2-end-4": "2 / 4",
        "start-2-end-3": "2 / 3",
        "start-3-end-4": "3 / 4",
      },

      backgroundImage: {
        "button-gradient": "linear-gradient(135deg, #a26ff4, #512e99)",
      },
      borderRadius: {
        button: "1.125rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
/* eslint-enable */

export default config;
