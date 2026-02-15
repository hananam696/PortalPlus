// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,jsx}",
//     "./components/**/*.{js,jsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
/**
@type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d9efff",
          200: "#b3dfff",
          300: "#7fc7ff",
          400: "#46aaff",
          500: "#1f8cff",
          600: "#0b6fe6",
          700: "#0857b3",
          800: "#0b4a8f",
          900: "#0d3d73",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        card: "0 6px 20px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};