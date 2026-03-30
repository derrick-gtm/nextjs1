import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          50:  "#f0f4ff",
          100: "#e0e9ff",
          200: "#c0d1ff",
          300: "#91abff",
          400: "#5b7cff",
          500: "#2d52ff",
          600: "#1130f5",
          700: "#0e22e0",
          800: "#121cb5",
          900: "#141c8e",
          950: "#0d1160",
        },
        surface: {
          DEFAULT: "#0a0c14",
          raised:  "#10121e",
          overlay: "#181b2c",
          border:  "#1e2236",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in":    "fadeIn 0.4s ease-out forwards",
        "slide-up":   "slideUp 0.4s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
