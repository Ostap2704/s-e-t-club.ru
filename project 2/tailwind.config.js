/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['animate-blink'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'tennis-neon': {
          50: '#eefff7',
          100: '#d7ffee',
          200: '#b3ffe2',
          300: '#76ffd0',
          400: '#33ffbc',
          500: '#00ffa3',
          600: '#00cc85',
          700: '#00a36c',
          800: '#008058',
          900: '#006948',
        },
        'tennis-pink': {
          50: '#fff0f7',
          100: '#ffe5f4',
          200: '#ffc2e7',
          300: '#ff8fd3',
          400: '#ff47b6',
          500: '#ff00a3',
          600: '#db006e',
          700: '#b80058',
          800: '#94004b',
          900: '#7a0041',
        },
        dark: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#121212',
        },
        success: {
          50: '#e6fff0',
          100: '#b3ffd6',
          200: '#80ffbd',
          300: '#4dffa3',
          400: '#1aff8a',
          500: '#00ff7a',
          600: '#00e66e',
          700: '#00cc62',
          800: '#00b356',
          900: '#009949',
        },
        error: {
          50: '#ffe6e6',
          100: '#ffb3b3',
          200: '#ff8080',
          300: '#ff4d4d',
          400: '#ff1a1a',
          500: '#ff0000',
          600: '#e60000',
          700: '#cc0000',
          800: '#b30000',
          900: '#990000',
        },
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.tennis-neon.500"), 0 0 20px theme("colors.tennis-neon.500")',
        'neon-hover': '0 0 10px theme("colors.tennis-neon.500"), 0 0 40px theme("colors.tennis-neon.500")',
        'neon-pink': '0 0 5px theme("colors.tennis-pink.500"), 0 0 20px theme("colors.tennis-pink.500")',
        'neon-purple': '0 0 5px #e879f9, 0 0 20px #e879f9',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'blink': 'blink 1.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': {
            'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px theme("colors.tennis-neon.500"), 0 0 40px theme("colors.tennis-neon.500")',
          },
          'to': {
            'text-shadow': '0 0 20px #fff, 0 0 30px theme("colors.tennis-pink.500"), 0 0 40px theme("colors.tennis-pink.500"), 0 0 50px theme("colors.tennis-pink.500")',
          },
        },
        blink: {
          '0%, 100%': {
            'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e879f9, 0 0 40px #e879f9',
            'box-shadow': '0 0 5px #e879f9, 0 0 20px #e879f9',
          },
          '50%': {
            'text-shadow': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #e879f9, 0 0 20px #e879f9',
            'box-shadow': '0 0 2px #e879f9, 0 0 10px #e879f9',
          },
        },
      },
    },
  },
  plugins: [],
};