/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          "light":"#DE7C7D",
          'dark':"#d49792"
        },
        secondary:{
          "light":"#ffdab9",
          'dark':"#e5b492"
        },
        tertiary:{
          "light":"#740938",
          'dark':"#943241"
        },
        accent:{
          "light":"#CC2B52",
          'dark':"#AF1740",
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
    flowbite.plugin(),
    require('flowbite/plugin'),
    require('tailwind-scrollbar-hide')
  ],
}

