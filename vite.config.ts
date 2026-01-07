import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TrinityDesignSystem',
      formats: ['es'],
      fileName: (format) => `index.${format === 'es' ? 'js' : format}`,
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@mui/material',
        '@mui/icons-material',
        '@emotion/react',
        '@emotion/styled',
      ],
      output: {
        // Preserve module structure for tree-shaking
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        // Provide global variables for UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': 'MuiMaterial',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
});
