// @ts-check

import tseslint from 'typescript-eslint'
import react from '@eslint-react/eslint-plugin'

import { FlatCompat } from '@eslint/eslintrc'
import * as eslintConfigPrettier from 'eslint-config-prettier'
import * as eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default tseslint.config([
  react.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: { parserOptions: { project: true } },
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier, // eslint-config-prettier last
  {
    rules: {
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@eslint-react/naming-convention/filename': ['error', 'kebab-case'],
    },
  },
  { ignores: ['node_modules/', '.next/', 'retired/'] },
])
