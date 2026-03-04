import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Paleta: Capim de Cheiro (sage) + Nó de Marinheiro (beige) + Rosa Claro */
        primary: {
          50: '#f4f6f2',
          100: '#e6eae2',
          200: '#ced6c7',
          300: '#b3bfaa',
          400: '#9eac94',   /* Capim de Cheiro */
          500: '#8a9b80',
          600: '#748368',
          700: '#5e6b55',
          800: '#4d5747',
          900: '#3f483a',
          950: '#2a3027',
        },
        secondary: {
          50: '#faf8f5',
          100: '#f3efe9',
          200: '#e8dfd5',   /* Nó de Marinheiro */
          300: '#ddd1c3',
          400: '#ccbba8',
          500: '#b9a48d',
          600: '#a68e76',
          700: '#8d7662',
          800: '#755f50',
          900: '#5e4d42',
          950: '#3d3129',
        },
        rose: {
          50: '#fff5f7',
          100: '#ffe8ed',
          200: '#ffd4dd',
          300: '#ffb3c2',   /* Rosa claro – detalhes */
          400: '#ff8da4',
          500: '#f76b8a',
          600: '#e64d6f',
          700: '#c93558',
          800: '#a82d4a',
          900: '#8e2941',
        },
        baby: {
          pink: '#fce8ed',
          sage: '#e6eae2',
          cream: '#f3efe9',
          beige: '#e8dfd5',
          mint: '#dde8d6',
        },
        accent: {
          300: '#ffb3c2',
          400: '#ff8da4',
          500: '#f76b8a',
          600: '#e64d6f',
          700: '#c93558',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
