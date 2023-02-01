/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        100: "50rem",
      },
      // colors: () => ({
      //   lime: {
      //     400: "red",
      //   },
      // }),
      // fontSize: {
      //   "2xl": "200px",
      // },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
