import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import recommendedConfig from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      //eslintConfigPrettier,
      recommendedConfig,
      //eslintConfigPrettierFlat
    ],
    //plugins: {"prettier": eslintPluginPrettier},
    // rules: {
    //   'prettier/prettier': ['error', {}, {usePrettierrc: true}],
    // },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  
])
