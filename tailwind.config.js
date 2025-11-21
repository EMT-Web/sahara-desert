/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdf8f3',
          100: '#f9ede0',
          200: '#f3dbc1',
          300: '#e9c49a',
          400: '#dda56f',
          500: '#d4894f',
          600: '#c66f43',
          700: '#a55739',
          800: '#854733',
          900: '#6d3b2b',
        },
        desert: {
          50: '#fef9ee',
          100: '#fcefd6',
          200: '#f8dcac',
          300: '#f4c378',
          400: '#f0a342',
          500: '#eb871c',
          600: '#d66a12',
          700: '#b24f11',
          800: '#903e15',
          900: '#753414',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
