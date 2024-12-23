/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        60: "60",
        9999: "9999",
      },
    },
  },
  plugins: [],
};
