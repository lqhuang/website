// @ts-check

import tseslint from 'typescript-eslint'
import react from '@eslint-react/eslint-plugin'

// @ts-expect-error it's fine
import { FlatCompat } from '@eslint/eslintrc'
// @ts-expect-error it's fine
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  react.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier, // eslint-config-prettier last
  {
    rules: {
      '@eslint-react/naming-convention/filename': ['error', 'kebab-case'],
    },
    ignores: ['.prettierrc.mjs'],
  },
  { ignores: ['retired/', 'node_modules/'] },
]

export default eslintConfig
