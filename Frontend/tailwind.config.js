export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0f0a15",
        darker: "#1a0f2e",
        surface: "#2a1a3e",
        card: "#3d2557",
        border: "#d946ef",
        primary: "#ec4899",
        secondary: "#f472b6",
        accent: "#d946ef",
        glow: "#ec4899",
        muted: "#6b21a8",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(236, 72, 153, 0.4), 0 0 30px rgba(236, 72, 153, 0.3), 0 0 60px rgba(236, 72, 153, 0.15)",
        soft: "0 8px 20px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        grid: "repeating-linear-gradient(90deg, rgba(236, 72, 153, 0.04) 0px, rgba(236, 72, 153, 0.04) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(0deg, rgba(236, 72, 153, 0.02) 0px, rgba(236, 72, 153, 0.02) 1px, transparent 1px, transparent 2px)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: ["Fira Code", "Source Code Pro", "monospace"],
      },
    },
  },
  plugins: [],
};
