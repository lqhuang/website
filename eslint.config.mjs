// @ts-check
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

import tseslint from 'typescript-eslint'
import * as eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import * as eslintConfigPrettier from 'eslint-config-prettier'
import react from '@eslint-react/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  react.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:next-on-pages/recommended',
  ),
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      '@eslint-react/naming-convention/filename': ['warn', 'kebab-case'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier, // eslint-config-prettier last
]
