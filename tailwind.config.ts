import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // new fonts
        'Open Sans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: '#006AFE',
        'primary-light': '#C2DCFF',
        link: '#4D148C', // link color
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          primary: '#E9E9E9',
          bg: '#FAFAFA',
        },
      },
      boxShadow: {
        'all-side':
          '0px 0px 8px 0px rgb(0 0 0 / 0.1), 0px -0px 8px 0px rgb(0 0 0 / 0.1); ',
      },
      screens: {
        lg: '1180px',
      },
    },
    skeletonScreen: {
      DEFAULT: {
        baseColor: '#EEEEEE',
        movingColor:
          'linear-gradient(to right, transparent 0%, #FDFDFD 50%, transparent 100%)',
        duration: '1.5s',
        timing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  variants: {
    scrollbar: {
      rounded: true,
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('@gradin/tailwindcss-skeleton-screen'),
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('tailwindcss-debug-screens'),
  ],
};
export default config;
