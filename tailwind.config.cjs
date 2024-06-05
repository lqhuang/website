// const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  //   prefix: 'nx-',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // container: {
    // },
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   black: '#000',
    //   white: '#fff',
    //   gray: colors.gray,
    //   slate: colors.slate,
    //   neutral: colors.neutral,
    //   red: colors.red,
    //   orange: colors.orange,
    //   yellow: colors.yellow,
    //   primary: colors.blue,
    // },
    extend: {
      fontFamily: {
        logo: ['"Zilla Slab"', ...fontFamily.sans],
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
  darkMode: ['class'],
}
