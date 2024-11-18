import type { Config } from "tailwindcss";

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
      },
      gridTemplateColumns: {
        custom: "20vw minmax(20vw, 1fr) minmax(20vw, 1fr)",
      },
      gridTemplateRows: {
        cardPrice: "150px max-content max-content",
      },
      gridColumn: {
        "start-1-end-2": "1 / 2",
        "start-2-end-4": "2 / 4",
        "start-2-end-3": "2 / 3",
        "start-3-end-4": "3 / 4",
      },
      backgroundColor: {
        glassmorph: "rgba(255, 255, 255, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
