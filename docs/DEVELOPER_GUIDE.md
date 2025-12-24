# Trinity Design System - Developer Guide

A comprehensive guide for integrating the Trinity Design System into your React applications.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Theme Setup](#theme-setup)
4. [Using Components](#using-components)
5. [Design Tokens](#design-tokens)
6. [Customization](#customization)
7. [Dark Mode](#dark-mode)
8. [Accessibility](#accessibility)
9. [TypeScript Support](#typescript-support)
10. [Troubleshooting](#troubleshooting)

---

## Installation

### Prerequisites

- **Node.js**: 18.x or higher
- **React**: 17.x, 18.x, or 19.x
- **Package Manager**: npm, yarn, or pnpm

### Install the Package

```bash
# npm
npm install @trinity/design-system

# yarn
yarn add @trinity/design-system

# pnpm
pnpm add @trinity/design-system
```

### Install Peer Dependencies

The design system requires these peer dependencies:

```bash
npm install @mui/material @emotion/react @emotion/styled react react-dom
```

---

## Quick Start

### 1. Wrap Your App with ThemeProvider

```tsx
// App.tsx
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '@trinity/design-system';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <YourApplication />
    </ThemeProvider>
  );
}

export default App;
```

### 2. Import and Use Components

```tsx
import { Button, TextField, Card } from '@mui/material';
import { TopNavHeader, StatusIndicator } from '@trinity/design-system';

function MyPage() {
  return (
    <>
      <TopNavHeader
        clients={[{ id: '1', name: 'Acme Corp' }]}
        selectedClientId="1"
        onClientChange={(id) => console.log('Selected:', id)}
        user={{ name: 'John Doe', email: 'john@example.com' }}
      />
      
      <Card sx={{ p: 3, m: 2 }}>
        <TextField label="Name" fullWidth sx={{ mb: 2 }} />
        <Button variant="contained">Submit</Button>
        <StatusIndicator status="success" label="Connected" />
      </Card>
    </>
  );
}
```

---

## Theme Setup

### Available Themes

Trinity provides pre-configured light and dark themes:

```tsx
import { lightTheme, darkTheme } from '@trinity/design-system';
```

### Creating a Custom Theme

Use `createTrinityTheme` for advanced customization:

```tsx
import { createTrinityTheme } from '@trinity/design-system';

const customTheme = createTrinityTheme({
  mode: 'light',
  primaryColor: '#1B365D',    // Navy (default)
  secondaryColor: '#FF6B47',  // Coral (default)
  // Override specific palette colors
  palette: {
    success: {
      main: '#2e7d32',
    },
  },
});
```

### Theme with Dark Mode Toggle

```tsx
import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@trinity/design-system';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Toggle Theme
      </button>
      <YourApplication />
    </ThemeProvider>
  );
}
```

---

## Using Components

### Import Paths

```tsx
// Main entry - all exports
import { 
  lightTheme, 
  darkTheme,
  brandColors,
  StatusIndicator,
  Modal,
  FileUpload,
} from '@trinity/design-system';

// Theme only
import { lightTheme, darkTheme, createTrinityTheme } from '@trinity/design-system/theme';

// Tokens only
import { baseTokens, semanticTokens } from '@trinity/design-system/tokens';

// Specific components
import { StatusIndicator } from '@trinity/design-system/components/StatusIndicator';
import { AIChat, AIPromptInput } from '@trinity/design-system/components/AI';
```

### Trinity Custom Components

#### TopNavHeader
Enterprise navigation header with client selector, search, and user menu:

```tsx
import { TopNavHeader } from '@trinity/design-system';

<TopNavHeader
  // Client selector
  clients={[
    { id: '1', name: 'Acme Corporation' },
    { id: '2', name: 'Global Industries' },
  ]}
  selectedClientId="1"
  onClientChange={(clientId) => handleClientChange(clientId)}
  
  // Search
  searchValue={searchQuery}
  onSearchChange={(value) => setSearchQuery(value)}
  onSearchSubmit={(value) => performSearch(value)}
  searchPlaceholder="Search..."
  
  // User profile
  user={{
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatarUrl: '/avatars/john.jpg',
  }}
  onLogout={() => auth.logout()}
  
  // Apps menu
  apps={[
    { id: 'dashboard', name: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'reports', name: 'Reports', icon: <ReportsIcon /> },
  ]}
  onAppClick={(appId) => navigate(`/${appId}`)}
/>
```

#### TopNavWithSidebar
Full layout with header and collapsible sidebar:

```tsx
import { TopNavWithSidebar } from '@trinity/design-system';

<TopNavWithSidebar
  // Header props (same as TopNavHeader)
  clients={clients}
  selectedClientId={selectedClientId}
  onClientChange={handleClientChange}
  user={currentUser}
  
  // Sidebar navigation
  sidebarItems={[
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      onClick: () => navigate('/dashboard'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      items: [
        { id: 'profile', label: 'Profile' },
        { id: 'security', label: 'Security' },
      ],
    },
  ]}
  activeItemId="dashboard"
  
  // Sidebar state
  sidebarOpen={isSidebarOpen}
  onSidebarToggle={() => setSidebarOpen(!isSidebarOpen)}
>
  {/* Your page content */}
  <MainContent />
</TopNavWithSidebar>
```

#### StatusIndicator
Visual status badges:

```tsx
import { StatusIndicator } from '@trinity/design-system';

<StatusIndicator status="success" label="Active" />
<StatusIndicator status="warning" label="Pending" />
<StatusIndicator status="error" label="Failed" />
<StatusIndicator status="info" label="Processing" />
<StatusIndicator status="neutral" label="Draft" />

// Variants
<StatusIndicator status="success" variant="dot" />
<StatusIndicator status="success" variant="badge" />
<StatusIndicator status="success" variant="pill" />
```

#### Modal
Accessible dialog with variants:

```tsx
import { Modal } from '@trinity/design-system';

// Basic modal
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profile"
  primaryAction="Save"
  onPrimaryAction={handleSave}
  secondaryAction="Cancel"
>
  <TextField label="Name" fullWidth />
</Modal>

// Danger confirmation
<Modal
  open={showDeleteConfirm}
  onClose={() => setShowDeleteConfirm(false)}
  variant="danger"
  title="Delete Item"
  primaryAction="Delete"
  onPrimaryAction={handleDelete}
>
  Are you sure? This action cannot be undone.
</Modal>
```

#### FileUpload
Drag-and-drop file upload:

```tsx
import { FileUpload } from '@trinity/design-system';

<FileUpload
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  maxFiles={5}
  onFilesChange={(files) => setUploadedFiles(files)}
  onUpload={async (file) => {
    await uploadToServer(file);
  }}
  helperText="Drag files here or click to browse"
/>
```

#### AI Components
AI chat and prompt components:

```tsx
import { AIChat, AIPromptInput, AIMessage } from '@trinity/design-system';

// Full chat interface
<AIChat
  messages={messages}
  onSendMessage={(text) => handleSend(text)}
  isLoading={isProcessing}
  placeholder="Ask me anything..."
/>

// Standalone prompt input
<AIPromptInput
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  onSubmit={() => handleSubmit(prompt)}
  placeholder="Enter your prompt..."
  loading={isGenerating}
/>
```

---

## Design Tokens

Trinity uses a layered token system for consistent styling.

### Base Tokens

```tsx
import { baseTokens } from '@trinity/design-system';

// Colors
baseTokens.colors.navy        // '#1B365D'
baseTokens.colors.coral       // '#FF6B47'
baseTokens.colors.sky         // '#4A90D9'
baseTokens.colors.success     // '#4CAF50'

// Spacing (in pixels)
baseTokens.spacing[1]   // 4
baseTokens.spacing[2]   // 8
baseTokens.spacing[4]   // 16
baseTokens.spacing[6]   // 24
baseTokens.spacing[8]   // 32

// Border Radius
baseTokens.borderRadius.sm    // 4
baseTokens.borderRadius.md    // 8
baseTokens.borderRadius.lg    // 12
baseTokens.borderRadius.xl    // 16
baseTokens.borderRadius.full  // 9999

// Typography
baseTokens.typography.fontFamily  // 'Montserrat, sans-serif'
baseTokens.typography.fontSize.sm // 12
baseTokens.typography.fontSize.md // 14
baseTokens.typography.fontSize.lg // 16
```

### Semantic Tokens

```tsx
import { semanticTokens } from '@trinity/design-system';

// Backgrounds
semanticTokens.background.primary    // Navy
semanticTokens.background.secondary  // Coral
semanticTokens.background.surface    // White/Dark surface

// Text colors
semanticTokens.text.primary      // Primary text
semanticTokens.text.secondary    // Secondary/muted text
semanticTokens.text.onPrimary    // Text on primary background

// Interactive states
semanticTokens.interactive.hover    // Hover background
semanticTokens.interactive.active   // Active/pressed state
semanticTokens.interactive.focus    // Focus ring color

// Status colors
semanticTokens.status.success
semanticTokens.status.warning
semanticTokens.status.error
semanticTokens.status.info
```

### Using Tokens with `sx` Prop

```tsx
import { Box, Typography } from '@mui/material';
import { baseTokens, semanticTokens } from '@trinity/design-system';

<Box
  sx={{
    p: baseTokens.spacing[4] / 8, // Convert to MUI spacing units
    borderRadius: `${baseTokens.borderRadius.lg}px`,
    backgroundColor: semanticTokens.background.surface,
  }}
>
  <Typography
    sx={{
      color: semanticTokens.text.primary,
      fontSize: baseTokens.typography.fontSize.lg,
    }}
  >
    Hello World
  </Typography>
</Box>
```

### Using the Token Hook

```tsx
import { useTrinityTokens } from '@trinity/design-system';

function MyComponent() {
  const tokens = useTrinityTokens();
  
  return (
    <Box
      sx={{
        backgroundColor: tokens.background.primary,
        color: tokens.text.onPrimary,
        borderRadius: tokens.borderRadius.lg,
      }}
    >
      Token-based styling
    </Box>
  );
}
```

---

## Customization

### Overriding Component Styles

Use MUI's `sx` prop or styled components:

```tsx
// Using sx prop
<Button
  variant="contained"
  sx={{
    borderRadius: '20px',
    textTransform: 'uppercase',
    fontWeight: 700,
  }}
>
  Custom Button
</Button>

// Using styled()
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(2, 4),
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));
```

### Theme Component Overrides

Override default component styles globally:

```tsx
import { createTrinityTheme } from '@trinity/design-system';

const theme = createTrinityTheme({
  mode: 'light',
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Override pill shape
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
  },
});
```

### Extending the Color Palette

```tsx
import { createTrinityTheme } from '@trinity/design-system';

const theme = createTrinityTheme({
  mode: 'light',
  palette: {
    // Add custom colors
    brand: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#FFFFFF',
    },
  },
});

// Usage
<Button color="brand" variant="contained">Brand Button</Button>
```

---

## Dark Mode

### Basic Implementation

```tsx
import React, { useState, createContext, useContext, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@trinity/design-system';

// Create context
const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

// Provider component
export function ThemeManager({ children }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// Toggle button component
function ThemeToggle() {
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <IconButton onClick={toggleColorMode}>
      {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
```

### System Preference Detection

```tsx
import { useMediaQuery } from '@mui/material';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  // Update when system preference changes
  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
```

### Persisting Theme Preference

```tsx
function usePersistedTheme() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggle = () => setMode(prev => prev === 'light' ? 'dark' : 'light');

  return { mode, toggle, theme: mode === 'light' ? lightTheme : darkTheme };
}
```

---

## Accessibility

Trinity Design System is built with WCAG 2.1 AA compliance.

### Color Contrast

Use pre-validated accessible color combinations:

```tsx
import { accessibleCombinations } from '@trinity/design-system';

// Pre-validated text/background pairs
accessibleCombinations.whiteOnNavy    // { bg: '#1B365D', text: '#FFFFFF' }
accessibleCombinations.navyOnWhite    // { bg: '#FFFFFF', text: '#1B365D' }
accessibleCombinations.coralOnWhite   // { bg: '#FFFFFF', text: '#FF6B47' }
accessibleCombinations.whiteOnCoral   // { bg: '#FF6B47', text: '#FFFFFF' }

// Usage
<Box sx={{ 
  backgroundColor: accessibleCombinations.whiteOnNavy.bg,
  color: accessibleCombinations.whiteOnNavy.text,
}}>
  Accessible text
</Box>
```

### Validate Custom Colors

```tsx
import { getContrastRatio, validateAccessibility } from '@trinity/design-system';

// Check contrast ratio
const ratio = getContrastRatio('#1B365D', '#FFFFFF'); // Returns ~12.5

// Validate against WCAG standards
const result = validateAccessibility('#1B365D', '#FFFFFF');
// Returns: { aa: true, aaa: true, ratio: 12.5 }
```

### Focus Management

Trinity components include visible focus indicators:

```tsx
// Focus ring tokens
import { semanticTokens } from '@trinity/design-system';

semanticTokens.focus.ring       // Focus ring color (coral)
semanticTokens.focus.ringOffset // Focus ring offset

// Custom focus styles
<Button
  sx={{
    '&:focus-visible': {
      outline: `2px solid ${semanticTokens.focus.ring}`,
      outlineOffset: '2px',
    },
  }}
>
  Focusable Button
</Button>
```

### Screen Reader Support

All Trinity components include proper ARIA attributes:

```tsx
// Modal has aria-labelledby and aria-describedby
<Modal
  open={open}
  onClose={onClose}
  title="Accessible Dialog"  // Linked via aria-labelledby
>
  Content here  {/* Linked via aria-describedby */}
</Modal>

// StatusIndicator has aria-label
<StatusIndicator
  status="success"
  label="Connection active"  // Used as aria-label
/>

// FileUpload supports keyboard navigation
<FileUpload ... />  // Enter/Space to activate dropzone
```

---

## TypeScript Support

Trinity is written in TypeScript with full type definitions.

### Component Props

```tsx
import type {
  ModalProps,
  StatusIndicatorProps,
  FileUploadProps,
  TopNavHeaderProps,
} from '@trinity/design-system';

// Use types for custom wrappers
interface MyModalProps extends Omit<ModalProps, 'open' | 'onClose'> {
  customProp: string;
}
```

### Theme Types

```tsx
import type { Theme } from '@mui/material';

// Extend theme with custom properties
declare module '@mui/material/styles' {
  interface Palette {
    brand: Palette['primary'];
  }
  interface PaletteOptions {
    brand?: PaletteOptions['primary'];
  }
}

// Use in components
function MyComponent() {
  const theme = useTheme();
  return <Box sx={{ color: theme.palette.brand.main }} />;
}
```

### Token Types

```tsx
import type { BaseTokens, SemanticTokens } from '@trinity/design-system';

// Type-safe token access
const spacing: number = baseTokens.spacing[4];
const color: string = semanticTokens.status.success;
```

---

## Troubleshooting

### Common Issues

#### 1. "Module not found" errors

Ensure peer dependencies are installed:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

#### 2. Theme not applying

Make sure `ThemeProvider` wraps your entire app:

```tsx
// ❌ Wrong - ThemeProvider too low in tree
function App() {
  return (
    <div>
      <Header />
      <ThemeProvider theme={lightTheme}>
        <Content />
      </ThemeProvider>
    </div>
  );
}

// ✅ Correct - ThemeProvider at root
function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div>
        <Header />
        <Content />
      </div>
    </ThemeProvider>
  );
}
```

#### 3. Fonts not loading

Import the Montserrat font:

```tsx
// In your entry file (main.tsx or index.tsx)
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
```

Or use the CDN in your HTML:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

#### 4. Dark mode flicker on page load

Use CSS to set initial background:

```css
/* In your global CSS */
html {
  background-color: #ffffff;
}

html.dark {
  background-color: #121212;
}
```

```tsx
// Set class before React hydrates
useLayoutEffect(() => {
  const savedMode = localStorage.getItem('theme-mode');
  if (savedMode === 'dark') {
    document.documentElement.classList.add('dark');
  }
}, []);
```

#### 5. TypeScript errors with custom theme properties

Extend the MUI theme types:

```tsx
// types/theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    customColor: Palette['primary'];
  }
  interface PaletteOptions {
    customColor?: PaletteOptions['primary'];
  }
}
```

---

## Resources

- **Storybook**: Interactive component documentation
- **GitHub**: Source code and issue tracking
- **Figma**: Design files (contact design team)

---

## Support

For questions or issues:

1. Check the [Storybook documentation](http://localhost:6006)
2. Search existing GitHub issues
3. Create a new issue with reproduction steps

---

*Trinity Design System v1.0.0*
