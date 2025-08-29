
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { bg:"#0b0f14", panel:"rgba(255,255,255,0.05)", neon:"#7DF9FF", text:"rgba(255,255,255,0.92)" },
      boxShadow: { neon: "0 0 25px rgba(125, 249, 255, 0.35), inset 0 0 8px rgba(125, 249, 255, 0.15)" },
      borderRadius: { '2xl':'1.25rem' }
    },
  },
  plugins: [],
}
