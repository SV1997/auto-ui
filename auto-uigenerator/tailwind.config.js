/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     spacing:{
      '120':'120%',
      '80':'80%'
     }
    },
  },
  plugins: [],
}