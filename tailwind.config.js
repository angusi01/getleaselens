/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#65a30d',
          charcoal: '#374151',
          sage: '#65a30d',
          bg: '#f8faf8',
        },
        danger: '#b42318',
        warning: '#b7791f',
        success: '#147a43',
      },
      boxShadow: {
        card: '0 24px 70px rgba(55, 65, 81, .12)',
      },
    },
  },
  plugins: [],
};
