import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ============================================================
      // JSX ACCESSIBILITY RULES (eslint-plugin-jsx-a11y)
      // These rules enforce WCAG 2.1 AA compliance at lint time
      // ============================================================

      // Critical: Ensure interactive elements are keyboard accessible
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',

      // Critical: Ensure all images have alt text
      'jsx-a11y/alt-text': [
        'error',
        {
          elements: ['img', 'object', 'area', 'input[type="image"]'],
          img: ['Image'],
          object: ['Object'],
          area: ['Area'],
          'input[type="image"]': ['InputImage'],
        },
      ],

      // Critical: Ensure form controls have labels
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: ['Label'],
          labelAttributes: ['label'],
          controlComponents: ['Input', 'TextField', 'Select'],
          depth: 3,
        },
      ],

      // Critical: Ensure buttons and links have accessible names
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to', 'href'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],

      // Critical: Proper ARIA usage
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',

      // Critical: Valid roles
      'jsx-a11y/aria-role': [
        'error',
        {
          ignoreNonDOM: true,
        },
      ],

      // Important: Heading hierarchy
      'jsx-a11y/heading-has-content': 'error',

      // Important: No autofocus (can disorient users)
      'jsx-a11y/no-autofocus': [
        'warn',
        {
          ignoreNonDOM: true,
        },
      ],

      // Important: Interactive elements must be focusable
      'jsx-a11y/interactive-supports-focus': 'error',

      // Important: No redundant roles
      'jsx-a11y/no-redundant-roles': 'warn',

      // Important: tabIndex values
      'jsx-a11y/tabindex-no-positive': 'error',

      // Important: Avoid access keys (can conflict with assistive tech)
      'jsx-a11y/no-access-key': 'warn',

      // Media accessibility
      'jsx-a11y/media-has-caption': 'warn',

      // Scope attribute only on th elements
      'jsx-a11y/scope': 'error',

      // Mouse events need keyboard alternatives
      'jsx-a11y/mouse-events-have-key-events': 'error',

      // No distracting elements
      'jsx-a11y/no-distracting-elements': [
        'error',
        {
          elements: ['marquee', 'blink'],
        },
      ],

      // Iframe must have title
      'jsx-a11y/iframe-has-title': 'error',

      // HTML element lang attribute
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/lang': 'error',
    },
  }
);
