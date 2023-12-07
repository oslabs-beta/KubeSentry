/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: 'rgb(10,10,20)',
        secondaryDark: 'rgb(35,35,35)',
        thirdDark: 'rgb(60,60,60)',
      },
    },
  },
  plugins: [],
};
