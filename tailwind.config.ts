import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-gradient':
          'linear-gradient(90deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.40) 100%)',
        'custom-gradient2':
          'linear-gradient(90deg, rgba(0, 0, 0, 0.07) 0%, rgba(0, 0, 0, 0) 100%)',
      },
      fontSize: {
        title: ['32px', { lineHeight: 'normal', fontWeight: '700' }],
        h1: [
          '28px',
          { lineHeight: 'normal', letterSpacing: '0.56px', fontWeight: '700' },
        ],
        h2: [
          '24px',
          { lineHeight: '29px', letterSpacing: '0.48px', fontWeight: '700' },
        ],
        'h3-regular': ['20px', { lineHeight: 'normal', fontWeight: '400' }],
        'h3-bold': ['20px', { lineHeight: 'normal', fontWeight: '700' }],
        'h4-regular': ['18px', { lineHeight: 'normal', fontWeight: '400' }],
        'h4-bold': ['18px', { lineHeight: 'normal', fontWeight: '700' }],
        'body1-regular': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'body1-bold': ['16px', { lineHeight: '20px', fontWeight: '700' }],
        'body1-medium': ['16px', { lineHeight: '26px', fontWeight: '600' }],
        'body2-regular': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'body2-bold': ['14px', { lineHeight: 'normal', fontWeight: '700' }],
        caption: ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      boxShadow: {
        custom:
          '0px 0px 0px 1px #CDD0DC inset, 0px 2px 4px 0px rgba(5, 16, 55, 0.06)',
        'search-bar-custom': '0px 4px 16px 0px rgba(17, 34, 17, 0.05)',
      },
      colors: {
        black200: '#1b1b1b',
        black100: '#171717',
        'nomad-black': '#112211',

        white: '#ffffff',

        gray600: '#4b4b4b',
        gray500: '#79747e',
        gray400: '#a4a1aa',
        gray300: '#adaeb8',
        gray200: '#dddddd',
        gray100: '#eeeeee',
        gray50: '#fafafa',

        red100: '#ff472e',
        red200: '#ffe4e0',

        yellow200: '#ffc23d',

        blue300: '#0085ff',
        blue200: '#2eb4ff',
        blue100: '#e5f3ff',

        green50: '#00AC07',
        green100: '#F1EFFD',
        green200: '#0B3B2D',
        green400: '#CED8D5',

        purple200: '#760dde',
        green300: '#7ac555',
        violet200: '#5534da',
      },

      screens: {
        mobile: { max: '767px' },
        tablet: { min: '768px', max: '1023px' },
        mainTabletSize: { min: '768px', max: '1248px' },
        mainPcSize: { min: '1248px' },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')], //스크롤바 숨김가능(scrollbar-hide)
};
export default config;
