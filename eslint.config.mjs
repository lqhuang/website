// @ts-check
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

import tseslint from 'typescript-eslint'
// @ts-expect-error it's fine
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
// @ts-expect-error it's fine
import eslintConfigPrettier from 'eslint-config-prettier'
import react from '@eslint-react/eslint-plugin'

// @ts-expect-error definitely esm
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  react.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      '@eslint-react/naming-convention/filename': ['warn', 'kebab-case'],
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier, // eslint-config-prettier last
  {
    ignores: ['**/sequenced-map**'],
  },
]

export default eslintConfig
