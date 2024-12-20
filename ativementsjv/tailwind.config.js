/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js,tsx,ts}","./index.html"],
  theme: {
   fontFamily : {
     sans : ["lato", "sans-serif"]
    },

    extend: {
      colors : {
        primary : {
          blue : "#005CA7",
          purple : "#4C30C4",
          red : "#BF0000"
        },

        complementary : {
          white : "#F3F5F9",
          black : "#272727",
          gray : "#33303E",
        }
      },

      backgroundImage : {
        atvGradient : "linear-gradient(149deg, #2272B5 -10.8%, #005195 37.95%, #004582 100%)" 
      },

    },
  },
  plugins: [],
}




