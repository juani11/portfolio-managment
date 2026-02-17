import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.app.json'],
                // tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            import: importPlugin,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            /*
             * 🔹 TypeScript
             */
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/no-misused-promises': 'error',

            'react-hooks/set-state-in-effect': 'off',

            /*
             * 🔹 Imports
             */
            'import/first': 'error',
            // 'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
            // 'unused-imports/no-unused-imports': 'error',

            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
        },
    },
])
