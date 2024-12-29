/** @type {import('tailwindcss').Config} */
export default {
  content: [ './src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      animation: {
        morph: 'morph 10s infinite alternate ease-in-out',
      },
      keyframes: {
        morph: {
          '0%': {
            borderRadius: '0%',
          },
          '50%': {
            borderRadius: '50%',
          },
          '100%': {
            borderRadius: '0%',
          },
        },
      },
    },
  },
  plugins: [],
}

