/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          primary: "#0f172a",
          secondary: "#1e293b",
          accent: "#6366f1",
          text: "#f1f5f9",
          muted: "#94a3b8",
          danger: "#ef4444"
      },
    },
  },
  plugins: [],
}

