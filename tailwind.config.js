/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      colors: {
        'dark-grey': '#111111',
        'light-beige': '#DCC1AB',
        'cream': '#F5F0EC',
        'bottle-green': '#1B5B31',
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scaleY(0)' },
          '75%': {transform: 'scaleY(1.1)' },
          '100%': { transform: 'scaleY(1)' },
        },
        'scale-down': {
          from: {transform: 'scaleY(1)' },
          to: { transform: 'scaleY(0)' },
        }
      },
      animation: {
        'open-scale': 'scale-up 0.7s ease-in-out forwards',
        'close-scale': 'scale-down 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}