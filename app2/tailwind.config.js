/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pThin: ["Poppins-Thin", "sans-serif"],
        pExtraLight: ["Poppins-ExtraLight", "sans-serif"],
        pLight: ["Poppins-Light", "sans-serif"],
        pRegular: ["Poppins-Regular", "sans-serif"],
        pMedium: ["Poppins-Medium", "sans-serif"],
        pSemibold: ["Poppins-SemiBold", "sans-serif"],
        pBold: ["Poppins-Bold", "sans-serif"],
        pExtrabold: ["Poppins-ExtraBold", "sans-serif"],
        pBlack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
