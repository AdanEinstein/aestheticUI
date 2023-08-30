/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  heme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'gradient-start': '#BEE5FF',
        'gradient-end': '#186A9F',
        'bg-card': '#BED6F8'
      },
    },
  },
  safelist: ['bg-white', 'text-white'],
  plugins: [],
}

