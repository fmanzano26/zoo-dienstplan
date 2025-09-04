/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // tonos más neutros/gris
        'zoo-cyan': '#67F7FF',
        'zoo-bg': '#080C14',
        'zoo-card': '#12161F',   // <— menos azul, más gris
        'zoo-border': '#2B3140', // <— borde más neutro
        'zoo-text': '#D7DEE7'
      },
      boxShadow: {
        'neon': '0 0 20px rgba(103,247,255,0.6), 0 0 40px rgba(103,247,255,0.2)',
      },
      dropShadow: {
        'neon': '0 0 35px rgba(103,247,255,0.75)'
      }
    },
  },
  plugins: [],
}
