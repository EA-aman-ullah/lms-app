/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        hoverPrimary: "var(--color-hoverPrimary)",
        secondary: "var(--color-secondary)",
        hoverSecondary: "var( --color-hoverSecondary)",
        accent: "var(--color-accent)",
        pending: "var(--color-pending)",
        headings: "var(--color-headings)",
        textSecondary: "var(--color-textSecondary)",
        body: "var(--color-body)",
        borderSecondary: "var(--color-borderSecondary)",
        borderPrimary: "var(--color-borderPrimary)",
        transBlack: "var(--color-transBlack)",
        transWhite: "var( --color-transWhite)",
        disable: "var( --color-primaryDisable)",
        card: "var( --color-bookcard)",
      },
      backgroundImage: {
        login: "url('/src/assets/images/bg-login.jpeg')", // Notice the '/' at the start
      },

      screens: {
        sm: "450px",
      },
    },
  },
  plugins: [],
};
