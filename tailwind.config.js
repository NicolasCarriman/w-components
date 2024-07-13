
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B2333',
        primaryLight: '#CF8CA2',
        dark: '#341620',
        light: {
          100: '#fcfdff'
        }
      },
      animation: {
        'zoom': 'zoom-in .6s',
        'slideY': 'slide-y .3s ease-in-out forwards',
        'rotate': 'rotate-el .3s ease-in forwards'
      },
      keyframes: {
        "zoom-in": {
          '0%': { transform: 'translateY(-50%)', opacity: 0},
          '100%': { transform: 'translateY(0%)', opacity: 1}
        },
        "slide-y": {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' }
        },
        "rotate-el": {
          '0%': { transform: 'rotate(0deg)'},
          '100%': { transform: 'rotate(180deg)'}
        }
      }
    },
  },
  plugins: [],
}
