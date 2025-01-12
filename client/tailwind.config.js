/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        morph: 'morph 10s infinite alternate ease-in-out',
        'border-move': 'borderMove 5s infinite linear', // Added border-move animation
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
        borderMove: {
          '0%': {
            borderImage: 'linear-gradient(90deg, #fff, #fff) 1',
            borderImageSlice: 1,
          },
          '25%': {
            borderImage: 'linear-gradient(90deg, #fff, transparent) 1',
            borderImageSlice: 1,
          },
          '50%': {
            borderImage: 'linear-gradient(90deg, transparent, #fff) 1',
            borderImageSlice: 1,
          },
          '75%': {
            borderImage: 'linear-gradient(90deg, transparent, #fff) 1',
            borderImageSlice: 1,
          },
          '100%': {
            borderImage: 'linear-gradient(90deg, #fff, transparent) 1',
            borderImageSlice: 1,
          },
        },
      },
    },
  },
  plugins: [],
}
