import type { Config } from 'tailwindcss'

import tailwindTypography from '@tailwindcss/typography'

import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: ['class'],

  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        logo: ['var(--font-zilla-slab)'],
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-plex-mono)', ...fontFamily.mono],
      },
    },
  },
  plugins: [tailwindTypography],
} satisfies Config
