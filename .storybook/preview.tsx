import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from '../src/theme';

// Import Montserrat font
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

const withThemeProvider = (Story: React.ComponentType, context: any) => {
  const isDark = context.globals.theme === 'dark';
  const theme = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: isDark ? '#18181B' : '#FAFAFA',
          color: isDark ? '#FAFAFA' : '#18181B',
          padding: 2,
        }}
      >
        <Story />
      </Box>
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    // Chromatic configuration for visual testing
    chromatic: {
      // Pause animations for consistent snapshots
      pauseAnimationAtEnd: true,
      // Allow more time for async components to load
      delay: 300,
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Getting Started',
          'Tokens',
          'Components',
          'Patterns',
          '*',
        ],
      },
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FAFAFA' },
        { name: 'dark', value: '#18181B' },
        { name: 'navy', value: '#050742' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        mobileLarge: {
          name: 'Mobile Large',
          styles: {
            width: '414px',
            height: '896px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        tabletLandscape: {
          name: 'Tablet Landscape',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        laptop: {
          name: 'Laptop',
          styles: {
            width: '1366px',
            height: '768px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
        ultrawide: {
          name: 'Ultrawide',
          styles: {
            width: '2560px',
            height: '1080px',
          },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light Theme', icon: 'sun' },
          { value: 'dark', title: 'Dark Theme', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [withThemeProvider],
  tags: ['autodocs'],
};

export default preview;
