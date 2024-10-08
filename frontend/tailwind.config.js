/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    },
    colors: {
      'main':'#826E98',
      'nav-foot':'#DCD1E9',
      'white': '#FFFBFB',
      'input-line': '#C4C4C4',
      'gray':'#555353',
      'dark-gray': '#3B3B3B',
      'red': '#FF2511',
      'light-red': '#ff4433',
      'purple': '#4A3561',
    },
    backgroundImage: {
      'gradient-nav-foot': 'linear-gradient(to bottom,#CBBBDD, #DCD1E9, white)',
      'gradient-pop': 'linear-gradient(to bottom,#5E437C, #795B9A, #C7B0E0)',
    },
    fontFamily: {
      'Nunito': 'Nunito',
      'Telex': 'Telex',
      'Kalnia': 'Kalnia',
      'Judson': 'Judson',
      'AbhayaLibre': 'Abhaya Libre',
    },
  },
  plugins: [],
}

