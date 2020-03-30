
const emojiFonts = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
const sansFallback = '-apple-system, "Helvetica Neue", "Noto Sans", "Segoe UI", Arial, sans-serif'
const serifFallback = 'Georgia, Cambria, "Times New Roman", STSong, NSimSun, serif'
const baseFonts = {
  sans: `"Noto Sans SC", ${sansFallback}, ${emojiFonts}`,
  serif: `"Zilla Slab", "Noto Serif SC", ${serifFallback}`,
  mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
}

const typoScale = {
  fonts: {
    body: baseFonts.sans,
    heading: baseFonts.serif,
    monospace: baseFonts.mono,
  },
  fontSizes: [
    // 14, 16, 18, 20, 24, 32, 48, 64,
    '0.886em', '1.000em', '1.127em', '1.272em', '1.434em', '1.618em', '1.824em', '2.058em',
  ],
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    // general
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em',
  },
}

const commonHeading = {
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading',
  color: 'heading',
  m: 0,
  mb: 1,
}

const headingStyles = {
  h1: {
    ...commonHeading,
    fontSize: [5, 6, 7],
    mt: 2,
  },
  h2: {
    ...commonHeading,
    fontSize: [4, 5, 6],
    mt: 2,
  },
  h3: {
    ...commonHeading,
    fontSize: [3, 4, 5],
    mt: 3,
  },
  h4: {
    ...commonHeading,
    fontSize: [2, 3, 4],
  },
  h5: {
    ...commonHeading,
    fontSize: [1, 2, 3],
  },
  h6: {
    ...commonHeading,
    fontSize: 1,
    mb: 2,
  },
}

const mdxStyles = {
  ...headingStyles,
  root: {
    color: 'text',
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body',
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
      color: 'secondary',
    },
  },
  p: {
    color: 'text',
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body',
    // '--baseline-multiplier': 0.179,
    // '--x-height-multiplier': 0.35,
    mb: 3,
  },
  table: {
    borderCollapse: 'collapse',
    borderSpace: 0,
    'th,td': {
      borderBottomStyle: 'solid',
      borderBottomColor: 'hsla(0,0%,0%,0.12)',
    },
  },
  th: {
    borderBottomWidth: '2px',
  },
  td: {
    borderBottomWidth: '1px',
  },
  hr: {
    background: 'hsla(0, 0%, 0%, 0.1)',
    border: 'none',
    height: '1px',
    // marginBottom: 'calc(1em - 1px)',
  },
}


export { typoScale, mdxStyles }
