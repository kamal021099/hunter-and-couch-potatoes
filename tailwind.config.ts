import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FF4D1C",  // Electric Rust — CTAs, buttons, highlights
          dark:    "#1A1A2E",  // Deep navy — page backgrounds, cards
          surface: "#F5F0E8",  // Warm off-white — light surfaces, text on dark
          accent:  "#FFB347",  // Amber — badges, tags, Couch Potato card
          muted:   "#888888",  // Grey — secondary text, placeholders
        },
      },
      fontFamily: {
        heading: ["Syne", "sans-serif"],    // Headings, brand name, titles
        body:    ["DM Sans", "sans-serif"],  // Body text, labels, inputs
      },
      borderRadius: {
        card: "20px",   // Listing cards, category cards
        btn:  "12px",   // All buttons
        pill: "100px",  // Tags, badges, dot indicators
      },
    },
  },
  plugins: [],
};

export default config;
