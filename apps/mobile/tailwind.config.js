/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#2FB6D9",
          teal: "#3BC9A0",
          green: "#5BD35B",
          sky: "#38BDF8",
        },
        flame: {
          deep: "#CE2410",
          mid: "#FF8A14",
          core: "#FFD046",
        },
      },
    },
  },
  plugins: [],
};
