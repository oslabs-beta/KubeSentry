/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: 'rgb(24,24,24)',
        secondaryDark: 'rgb(33,33,33)',
        thirdDark: 'rgb(61,61,61)',
      },
    },
  },
  plugins: [],
};
