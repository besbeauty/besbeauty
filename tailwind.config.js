/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      fontFamily: {
        headline: ['Noto Serif'],
        body: ['Manrope'],
        label: ['Manrope'],
        serif: ['Noto Serif'],
        sans: ['Manrope'],
      },
    },
  },
  plugins: [],
};
