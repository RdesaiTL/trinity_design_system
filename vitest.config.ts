import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    css: false, // Don't process CSS in tests
    server: {
      deps: {
        inline: [/@mui\/x-data-grid/], // Inline dependencies that use CSS imports
      },
    },
  },
});
