/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          "light":"#f8c5c1",
          'dark':"#d49792"
        },
        secondary:{
          "light":"#ffdab9",
          'dark':"#e5b492"
        },
        tertiary:{
          "light":"#d5928e",
          'dark':"#943241"
        },
        accent:{
          "light":"#b76e79",
          'dark':"#8a4c55",
          'extra':'#ff4081'
        },
        neutral:{
          "light":"#ffffff",
          'dark':"#e6e6e6"
        },textColor:{
          "light":"#333333",
          'dark':"#1a1a1a"
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar-hide')
  ],
}

