/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'highlight': 'rgb(255 0 0)',
        'primary-color': 'rgb(20 20 20)',
        'text-color': 'white',
        'text2-color': 'rgb(153,153,153)',
      },
    },
  },
  plugins: [],
}

