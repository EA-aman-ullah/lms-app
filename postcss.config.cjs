module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Path to your source files
  ],
  plugins: [
    require("tailwindcss"), // Use tailwindcss as plugin
    require("autoprefixer"), // Use autoprefixer as plugin
  ],
};
