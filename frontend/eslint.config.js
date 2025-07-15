import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  { ignores: ['dist/', 'node_modules/'] },
  { settings: { react: { version: 'detect' } } },
  { files: ['**/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginReact.configs.flat.recommended,
  stylistic.configs.recommended,
])
