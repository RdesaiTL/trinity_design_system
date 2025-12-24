import { defineWorkspace } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

export default defineWorkspace([
  // Unit tests
  {
    extends: './vite.config.ts',
    test: {
      name: 'unit',
      include: ['src/**/*.test.{ts,tsx}'],
      environment: 'jsdom',
      globals: true,
    },
  },
  // Storybook project for component testing
  {
    extends: './vite.config.ts',
    plugins: [
      storybookTest({
        configDir: '.storybook',
      }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }],
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);
