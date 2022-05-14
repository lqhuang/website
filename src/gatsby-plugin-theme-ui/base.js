import { appleLight, appleDark } from './colors'
import { typoScale, mdxStyles } from './typography'
import { MOBILE_WIDTH, DEFAULT_WIDTH, LARGE_DISPLAY_WIDTH } from './breakpoints'

const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]
// const space = [0, '0.25rem', '0.5rem', '1rem', '2rem', '4rem', '8rem', '16rem', '32rem']
const breakpoints = [MOBILE_WIDTH, DEFAULT_WIDTH, LARGE_DISPLAY_WIDTH]

const colors = {
  ...appleLight,
  transparent: 'transparent',
  modes: {
    light: appleLight,
    dark: appleDark,
  },
}

export const base = {
  initialColorMode: 'light',
  useCustomProperties: true,
  useColorSchemeMediaQuery: false,
  breakpoints,
  space,
  colors,
  ...typoScale,
  styles: mdxStyles,
  // variants
  dividers: {
    bottom: {
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      borderBottomColor: 'divide',
      pb: 3,
    },
    top: {
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: 'divide',
      pt: 3,
    },
  },
}
