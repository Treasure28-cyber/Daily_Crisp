import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: "#C0151F", light: "#E8202C" },
        charcoal: "#1A1A1A",
        "off-white": "#F9F6F3",
        "light-grey": "#F2F0ED",
        "mid-grey": "#E0DDD8",
        muted: "#7A7670",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        barlow: ["var(--font-barlow)"],
      },
    },
  },
  plugins: [],
};

export default config;
