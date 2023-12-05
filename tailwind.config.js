/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: '#202225',
        secondaryDark: '#292b2f',
        thirdDark: '#2f3136',
      },
    },
  },
  plugins: [],
};
