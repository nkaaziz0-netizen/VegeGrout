import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7F5EC",
        bg2: "#FCFBF5",
        ink: "#1F2A17",
        moss: {
          DEFAULT: "#3E6B2C",
          dark: "#2E5220",
        },
        growth: "#A8D24A",
        clay: "#D97A44",
        line: "rgba(31,42,23,0.14)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      maxWidth: {
        wrap: "1140px",
      },
    },
  },
  plugins: [],
};
export default config;
