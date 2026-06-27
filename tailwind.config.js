const tokens = require('./tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: tokens.colors.bg,
        surface: tokens.colors.surface,
        border: tokens.colors.border,
        accent: tokens.colors.accent,
        danger: tokens.colors.danger,
        success: tokens.colors.success,
        primary: tokens.colors.textPrimary,
        muted: tokens.colors.textMuted,
        brand: {
          DEFAULT: tokens.colors.accent,
          charcoal: tokens.colors.surface,
          sage: tokens.colors.success,
          bg: tokens.colors.bg,
        },
        warning: tokens.colors.accent,
      },
      fontFamily: {
        sans: tokens.typography.fontSans.split(', '),
      },
      spacing: tokens.spacing,
      boxShadow: {
        card: '0 24px 70px rgba(0, 0, 0, .24)',
      },
    },
  },
  plugins: [],
};
