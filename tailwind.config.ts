import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Inter", "sans-serif"],
        display: ["Georgia", "'Times New Roman'", "serif"]
      },
      colors: {
        // Chevignon heritage palette
        brand: {
          DEFAULT: "#111111",       // near-black
          accent: "#C8102E",        // Chevignon red
          cream: "#F5EFE6",         // heritage cream
          leather: "#7A4A2B",       // saddle leather
          denim: "#1F3A5F"          // deep indigo
        }
      },
      letterSpacing: {
        widest2: "0.25em"
      }
    }
  },
  plugins: []
};

export default config;
