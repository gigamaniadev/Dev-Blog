/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#4F46E5',
              '&:hover': {
                color: '#4338CA',
              },
            },
          },
        },
        dark: {
          css: {
            color: '#D1D5DB',
            a: {
              color: '#818CF8',
              '&:hover': {
                color: '#A5B4FC',
              },
            },
            h1: {
              color: '#F3F4F6',
            },
            h2: {
              color: '#F3F4F6',
            },
            h3: {
              color: '#F3F4F6',
            },
            h4: {
              color: '#F3F4F6',
            },
            strong: {
              color: '#F3F4F6',
            },
            code: {
              color: '#F3F4F6',
            },
            blockquote: {
              color: '#D1D5DB',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};