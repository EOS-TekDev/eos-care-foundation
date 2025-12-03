import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowExportNames: ['AuthContext'] }],
      // Disable refs rule - the useScrollReveal pattern is valid and widely used
      // (see react-intersection-observer, framer-motion, etc.)
      'react-hooks/refs': 'off',
      // Disable set-state-in-effect - the useCountUp pattern uses RAF properly
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
