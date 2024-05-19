import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
        "black200": "#1b1b1b",
        "black100": "#171717",
        "nomad-black": "#112211",

        "white": "#ffffff",

        "gray600": "#4b4b4b",
        "gray500": "#79747e",
        "gray400": "#a4a1aa",
        "gray300": "#adaeb8",
        "gray200": "#dddddd",
        "gray100": "#eeeeee",
        "gray50": "#fafafa",

        "red100": "#ff472e",
        "red200": "#ffe4e0",

        "yellow200": "#ffc23d",

        "blue300": "#0085ff",
        "blue200": "#2eb4ff",
        "blue100": "#e5f3ff",

        "green50": "00AC07",
        "green100": "#F1EFFD",
        "green200": "0B3B2D",

        "purple200": "#760dde",
        "green300": "#7ac555",
        "violet200": "#5534da",
    },
    screens:{
      'mobile':'375px',
      'tablet':'768px',
      'laptop': '1024px',
      'desktop':'1280px'
    }
  },
  plugins: [],
};
export default config;
