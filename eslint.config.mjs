// @ts-check
import tseslint from 'typescript-eslint'
import nextLint from '@next/eslint-plugin-next'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'
import react from '@eslint-react/eslint-plugin'

export default [
  react.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  nextLint.configs['recommended'],
  eslintPluginPrettierRecommended,
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
  eslintConfigPrettier, // eslint-config-prettier last
]
