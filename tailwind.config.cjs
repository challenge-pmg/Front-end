module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // azul escuro
        secondary: "#3B82F6", // azul médio
        accent: "#FBBF24", // amarelo
        light: "#F9FAFB",
        dark: "#1F2937",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        title: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};