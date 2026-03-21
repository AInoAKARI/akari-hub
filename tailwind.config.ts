import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        akari: {
          bg: "#0a0a0f",
          surface: "#14141f",
          border: "#2a2a3a",
          text: "#e8e4df",
          muted: "#8a8698",
          accent: "#f4a261",
          warm: "#e76f51",
          cool: "#7c9eb2",
          glow: "rgba(244, 162, 97, 0.15)",
          success: "#8bc34a",
          warning: "#ffb74d",
          error: "#ef5350"
        }
      }
    }
  },
  plugins: []
}

export default config

