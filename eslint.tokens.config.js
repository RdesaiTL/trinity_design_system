/**
 * ESLint Configuration for Token Usage Enforcement
 * 
 * This configuration enforces strict token usage rules for CI.
 * Run with: npx eslint --config eslint.tokens.config.js src/components/**\/*.tsx
 * 
 * @see docs/TOKEN_USAGE_RULES.md
 */

import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';

// Files exempt from strict color checking
const EXEMPT_PATTERNS = [
  '**/tokens.ts',
  '**/theme.ts',
  '**/*.test.{ts,tsx}',
  '**/*.stories.{ts,tsx}',
  '.storybook/**',
];

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    ignores: [
      'dist',
      'storybook-static',
      'node_modules',
      ...EXEMPT_PATTERNS,
    ],
  },
  {
    files: ['src/components/**/*.{ts,tsx}', 'src/pages/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Disable rules that conflict with TypeScript/our codebase
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      
      // ============================================================
      // STRICT TOKEN USAGE RULES
      // These rules ERROR (not warn) for CI enforcement
      // ============================================================

      'no-restricted-syntax': [
        'error',
        // Hardcoded hex colors
        {
          selector: 'Literal[value=/^#[0-9A-Fa-f]{3,8}$/]',
          message: '❌ TOKEN VIOLATION: Hardcoded hex color detected. Use brandColors or semanticTokens. Add @intentional-color comment if needed.',
        },
        // rgba() function calls
        {
          selector: 'CallExpression[callee.name="rgba"]',
          message: '❌ TOKEN VIOLATION: Use alpha() from MUI with token reference instead of rgba().',
        },
        // hsla() function calls
        {
          selector: 'CallExpression[callee.name="hsla"]',
          message: '❌ TOKEN VIOLATION: Use token references instead of hsla().',
        },
        // Direct baseTokens import (should use brandColors or semanticTokens)
        {
          selector: 'ImportSpecifier[imported.name="baseTokens"]',
          message: '⚠️ IMPORT WARNING: Prefer brandColors or semanticTokens over baseTokens in component code.',
        },
      ],

      // Restrict certain imports in component files
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['tailwindcss/colors', 'tailwindcss/*'],
              message: 'Import colors from @trinity/design-system tokens instead.',
            },
          ],
        },
      ],
    },
  }
);
