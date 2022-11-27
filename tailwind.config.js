/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: { main: '#0093E9' },
      keyframes: {
        fadeDefault: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fade: 'fadeDefault 250ms linear',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwindcss-question-mark'),
  ],
};
