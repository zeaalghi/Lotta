import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          header: "#1A3A26", // Headers: Top Navbar, Footer, Main Headings
          title: "#2B4F39", // Titles: Section Subtitles, Labels, Active Text Links
          primary: "#5F8D70", // Primary/UI: Primary Buttons, Active Tabs, Badges
          hover: "#4D775C", // Primary Button Hover
          sage: "#A8CBB8", // Backgrounds: Secondary Accents & Active Borders
          card: "#D4E4DC", // Card Body: Soft Sage bottom half of cards
          pill: "#E6EFEA", // Inactive Filter Pills & Subtle Surfaces
          canvas: "#F8F9F5", // Canvas: 61.8% Main Background
          alt: "#F1F4EE", // Alternating Section Canvas
          border: "#C5D6CC", // Clean Card/Section Borders
          input: "#9AB0A3", // Form Input & Dropdown Borders
          body: "#3E5647", // Body Copy Text
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      maxWidth: {
        lotta: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
