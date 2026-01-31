/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f4',
          100: '#fbe9e9',
          200: '#f6d1d1',
          300: '#eea9a9',
          400: '#e37474',
          500: '#dc5e5e',
          600: '#c95050',
          700: '#a64141',
          800: '#8a3838',
          900: '#743232',
        },
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}
