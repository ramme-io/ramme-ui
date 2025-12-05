/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use our library's preset to get all the theme-aware styles
  presets: [require('./tailwind.preset.js')],
  // Tell Tailwind to scan all of our component and story files for CSS classes
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};