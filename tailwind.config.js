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
        dark: '#341620',
        light: {
          100: '#fcfdff'
        }
      },
      animation: {
        'zoom': 'zoom-in .6s',
        'slideY': 'slide-y .6s ease-in'
      },
      keyframes: {
        "zoom-in": {
          '0%': { transform: 'translateY(-50%)', opacity: 0},
          '100%': { transform: 'translateY(0%)', opacity: 1}
        },
        "slide-y": {
          '0%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(0%)' }
        }
      }
    },
  },
  plugins: [],
}
