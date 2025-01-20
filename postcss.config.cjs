module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Path to your source files
  ],
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("tailwind-scrollbar"),
  ],
};
