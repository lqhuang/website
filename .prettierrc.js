// @ts-check
/* eslint-disable @eslint-react/naming-convention/filename */
/** @type {import('prettier').Config} */
const config = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cva', 'cx', 'cn', 'tv'],
}
export default config
