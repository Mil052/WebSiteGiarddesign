/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.html", "./src/*.js", "./node_modules/tw-elements/dist/js/**/*.js" ],
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
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}