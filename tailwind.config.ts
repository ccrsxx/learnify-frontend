import colors from 'tailwindcss/colors';
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
        accent: {
          main: colors.pink[400],
          start: colors.purple[500],
          end: colors.pink[400]
        }
      }
    }
  },
  plugins: []
};

export default config;
