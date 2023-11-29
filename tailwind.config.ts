import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          alert: {
            error: '#FF0000',
            warning: '#F9CC00',
            success: '#73CA5C'
          },
          blue: {
            50: '#EBF3FC',
            100: '#E2D4F0',
            200: '#D0B7E6',
            300: '#489CFF',
            400: '#6148FF57',
            500: '#6148FF',
            600: '#202244CC'
          },
          cream: {
            100: '#FFF8ED',
            200: '#FFF0DC',
            300: '#FFE9CA',
            400: '#D4C2A8',
            500: '#AA9B87'
          },
          neutral: {
            100: '#FhFFFFF',
            200: '#D0D0D0',
            300: '#8A8A8A',
            400: '#3C3C3C',
            500: '#151515'
          }
        }
      },
      boxShadow: {
        low: '0 0 4px rgba(0, 0, 0, 0.15)',
        high: '0 0 10px rgba(0, 0, 0, 0.15)'
      }
    }
  },
  plugins: []
};

export default config;
