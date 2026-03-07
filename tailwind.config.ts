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
        /* Paleta: Calça de Linho + Estrada Velha + Ouro + Sage Tropical */
        primary: {
          50: '#f7f6f1',
          100: '#edeadf',
          200: '#ddd8c8',
          300: '#c9bb8e',   /* Calça de Linho - Suvinil */
          400: '#b8a574',
          500: '#a6905e',
          600: '#8f7a4e',
          700: '#766441',
          800: '#5e5035',
          900: '#4a3f2b',
          950: '#302919',
        },
        secondary: {
          50: '#faf7f4',
          100: '#f3ede7',
          200: '#e6d9cc',
          300: '#d4c0ad',
          400: '#b9a08a',   /* Estrada Velha - Suvinil */
          500: '#ad8b6c',
          600: '#9a7a5e',
          700: '#80644d',
          800: '#6a5240',
          900: '#574436',
          950: '#3a2c22',
        },
        gold: {
          50: '#faf7f2',
          100: '#f2ebe0',
          200: '#e4d5be',
          300: '#d1b895',
          400: '#b9976a',
          500: '#a07d5a',   /* Ouro - Guararapes */
          600: '#8a6a4c',
          700: '#72573f',
          800: '#5d4734',
          900: '#4c3b2c',
          950: '#2e2319',
        },
        sage: {
          50: '#f4f6f3',
          100: '#e8ece5',
          200: '#d5ddd0',   /* Papel de Parede / Sage tropical */
          300: '#b8c5b0',
          400: '#96ab8c',
          500: '#7a9470',
          600: '#637a5b',
          700: '#50634a',
          800: '#41503d',
          900: '#364233',
          950: '#1e2520',
        },
        rose: {
          50: '#fdf8f6',
          100: '#f5ece7',
          200: '#edd9ce',
          300: '#dfc1b0',   /* Rose quente / complementar */
          400: '#cc9e83',
          500: '#bb8468',
          600: '#a46d54',
          700: '#885946',
          800: '#704a3b',
          900: '#5d3f33',
        },
        baby: {
          pink: '#f5ece7',
          sage: '#e8ece5',
          cream: '#f3efe9',
          beige: '#e6d9cc',
          mint: '#d5ddd0',
        },
        accent: {
          300: '#d1b895',
          400: '#b9976a',
          500: '#a07d5a',
          600: '#8a6a4c',
          700: '#72573f',
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
