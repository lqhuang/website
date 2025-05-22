// @ts-check
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint'
import react from '@eslint-react/eslint-plugin'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

/**
 * @type {import('typescript-eslint').ConfigArray}
 */
const config = tseslint.config([
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  react.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { project: true } } },
  {
    rules: {
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@eslint-react/naming-convention/filename': ['error', 'kebab-case'],
    },
  },
  { ignores: ['node_modules/', '.next/', 'retired/', 'out/'] },
])
export default config
