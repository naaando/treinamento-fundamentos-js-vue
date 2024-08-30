/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    { pattern: /^w-\[.*\]$/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
