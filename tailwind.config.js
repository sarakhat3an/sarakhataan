/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0c0c0e',
          50: '#111113',
          100: '#161618',
          200: '#1e1e21',
        },
        stone: {
          DEFAULT: '#2a2825',
          300: '#3a3530',
          400: '#4a4540',
          500: '#5a5550',
          600: '#6b6660',
          700: '#8a8580',
          800: '#b0aaa0',
          900: '#c8bfad',
        },
        gold: {
          DEFAULT: '#c8a882',
          light: '#d4b892',
          dark: '#a0845e',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        mono:  ['DM Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}