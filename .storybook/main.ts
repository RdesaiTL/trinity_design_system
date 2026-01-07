import type { StorybookConfig } from '@storybook/react-vite';
import { execSync } from 'child_process';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  env: (config) => ({
    ...config,
    STORYBOOK_VERSION: process.env.npm_package_version || '0.0.0',
    STORYBOOK_COMMIT: execSync('git rev-parse --short HEAD').toString().trim(),
  }),
  viteFinal: async (config) => {
    // Set base path for GitHub Pages deployment
    if (process.env.GITHUB_ACTIONS) {
      config.base = '/trinity_design_system/';
    }
    return config;
  },
};

export default config;
