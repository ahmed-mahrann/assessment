/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        title: "#1B1C1E",
        subtitle: "#C1C1C1",
        surface: "#FBFBFB",
        graySurface: "#F8F8F8",
        buttonBg: "#00ABEB",
        inputBg: "#F3F3F3",
        grayBg: "#F5F5F5",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
