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
        // Warm neutrals: sand, linen and dune shadow. Backgrounds, borders, muted text.
        sand: {
          50: '#faf7f2',
          100: '#f4ede3',
          200: '#e9dccb',
          300: '#d9c4a8',
          400: '#c2a47f',
          500: '#a8865f',
          600: '#8a6a48',
          700: '#6c5239',
          800: '#4f3c2b',
          900: '#2e241b',
        },
        // Brand accent: burnt terracotta / Saharan ochre. CTAs, links, highlights.
        // 600+ passes WCAG AA for text on white and for white text on it.
        desert: {
          50: '#fcf5ee',
          100: '#f7e6d5',
          200: '#efcaa8',
          300: '#e4a877',
          400: '#d6874f',
          500: '#c46d36',
          600: '#a9562a',
          700: '#8a4424',
          800: '#6e3721',
          900: '#5a2f1e',
        },
        // Text colours: warm near-black rather than cold gray.
        ink: {
          900: '#1c1714',
          800: '#2b2420',
          700: '#463c35',
          600: '#625650',
          500: '#82766e',
        },
        // Sahara night sky: dark feature sections and the footer.
        night: {
          700: '#27324a',
          800: '#1b2433',
          900: '#121925',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        site: '80rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(28,23,20,0.04), 0 8px 24px -8px rgba(28,23,20,0.12)',
        lift: '0 2px 4px rgba(28,23,20,0.05), 0 20px 40px -12px rgba(28,23,20,0.22)',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
