module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      50: 50,
      75: 75,
      100: 100,
      auto: "auto",
    },
    extend: {
      width: {
        128: "32rem",
        66: "16.5rem",
      },
      maxWidth: {
        60: "15rem",
        80: "20rem",
      },
      maxHeight: {
        192 : "48rem"
      },
      top: {
        17: "5rem",
      },
      backgroundColor: {
        lightBlack: "#181818",
        lighterBlack: "#212121",
        darkGray: "#383838",
      },
      borderColor: {
        darkGray: "#383838",
      },
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
