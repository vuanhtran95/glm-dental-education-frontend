/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        128: '32rem',
        256: '64rem',
        512: '128rem',
        1024: '256rem',
        2048: '512rem',
      },
      colors: {
        primary: '#646cff',
      },
    },
  },
  plugins: [],
};
