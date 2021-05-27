module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        128: "32rem",
        66 : "16.5rem"
      },
    },
  },
  variants: {
    extend: {
      overflow: ["hover"],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
