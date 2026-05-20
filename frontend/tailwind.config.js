/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#8B5CF6",
        dark: "#020617",
        card: "rgba(255,255,255,0.05)",
      },

      animation: {
        float: "float 5s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },

        glow: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.7,
          },
        },
      },

      boxShadow: {
        glow: "0 10px 40px rgba(99,102,241,0.35)",
      },
    }
  },
  plugins: [],
};