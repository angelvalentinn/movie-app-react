/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#c1a362',
      secundary: '#292c3e',
      black_text: '#333',
      black: '#000',
      white_text: '#eee',
      white: '#fff',
      hover_black: '#000c',
      hover_black2: '#001b',
      red: '#c01111',
      transparent: 'transparent',
      gray_text: '#a1a1a1'
    },
    fontFamily: {
      fontMonserrat: ['Montserrat', 'sans-serif']
    }
  },
  plugins: [],
}

