/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px', // 20rem
        '3xl': '1920px', // 120rem
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
