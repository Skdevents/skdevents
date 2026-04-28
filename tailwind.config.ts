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
        skdPrimary: "#a40049",
        skdDark: "#4d002c",
        skdLight: "#f8fafc", // White/Light background
      },
      backgroundImage: {
        'skd-gradient': 'linear-gradient(135deg, #a40049 0%, #4d002c 100%)',
      },
    },
  },
  plugins: [],
};
export default config;