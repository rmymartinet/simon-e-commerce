import { feedBack } from "./app/data/feedbackData";

/* eslint-disable */
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
        muted: "#8b949e",
        card: "#000000cf",
      },
      gridTemplateColumns: {
        custom: "20vw minmax(20vw, 1fr) minmax(20vw, 1fr)",
        blogCustom: "2fr 1fr",
        connexionModal: "1fr max-content 1fr",
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

      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "100%",
            h1: {
              fontSize: theme("fontSize.5xl"), // Taille du titre h1
              fontWeight: theme("fontWeight.semibold"), // Poids du titre h3
            },
            h2: {
              fontSize: theme("fontSize.4xl"), // Taille du titre h2
              fontWeight: theme("fontWeight.medium"), // Poids du titre h3
            },
            h3: {
              fontSize: theme("fontSize.3xl"), // Taille du titre h3
              fontWeight: theme("fontWeight.medium"), // Poids du titre h3
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
/* eslint-enable */

export default config;
