module.exports = {
  mode: 'jit',
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        128: "32rem",
        66: "16.5rem",
      },
      backgroundColor: {
        lightBlack: "#181818",
        lighterBlack: "#212121",
        darkGray : "#383838"
      },
      borderColor : {
        darkGray : "#383838"
      }
    },
  },
  variants: {
    extend: {
      overflow: ["hover"],
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
