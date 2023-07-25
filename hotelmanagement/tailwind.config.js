/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'landing-page-image': "url('/landing-page.avif')"
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16'
      },
      fontSize: {
        'h1-font-size': '2rem',
        'h2-font-size': '1.5rem',
        'h3-font-size': '1.17rem',
        'h4-font-size': '1rem',
        'normal-font-size': '0.938rem',
        'small-font-size': '0.813rem',
        'smaller-font-size': '0.75rem',
        'tiny-font-size': '0.625rem'
      },
      zIndex: {
        'z-normal': '1',
        'z-tooltip': '10',
        'z-fixed': '100'
      },
      colors: {
        'color-primary': '#2563eb',
        'color-secondary': '#1d4ed8',
        'color-default': '#5189F5',
        'color-agent': '#613659',
        'color-success': '#45d175',
        'color-warning': '#f59e0b',
        'color-error': '#ff0000',
        'bg-white': '#ffffff',
        'bg-black': '#1e1e1e',
        'bg-gray': '#383838',
        'txt-white': '#f5f5f5',
        'txt-black': '#000000',
        'txt-grey': '#374151'
      },
      fontFamily: {
        'body-font': ['Inter', 'sans-serif'],
        'text-font': ['Poppins', 'serif']
      }
    }
  },

  plugins: [require('@tailwindcss/typography')]
}
