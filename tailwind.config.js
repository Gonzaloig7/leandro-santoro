/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Clases usadas dinámicamente en COLOR_TEXT y COLOR_DOT
    'text-emerald-400',
    'text-yellow-400',
    'text-red-400',
    'bg-emerald-500',
    'bg-yellow-400',
    'bg-red-500',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
