# Quick Start for Engineers

> ⏱️ **Time to first component: < 10 minutes**  
> 📦 **Full setup: < 30 minutes**

This guide gets your team from zero to productive with Trinity Design System.

---

## Table of Contents

1. [Install (2 min)](#1-install)
2. [Setup Theme (3 min)](#2-setup-theme)
3. [Your First Components (5 min)](#3-your-first-components)
4. [Import Patterns](#4-import-patterns)
5. [Common Mistakes](#5-common-mistakes)
6. [Team Adoption Checklist](#6-team-adoption-checklist)

---

## 1. Install

```bash
# Required peer dependencies
npm install @trinity/design-system \
  @mui/material @mui/x-data-grid \
  @emotion/react @emotion/styled

# Optional: Icons (recommended)
npm install @mui/icons-material
```

**That's it.** No additional configuration needed.

---

## 2. Setup Theme

### Minimal Setup (Copy-Paste Ready)

```tsx
// Your application entry point
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '@trinity/design-system';

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {/* Your app here */}
    </ThemeProvider>
  );
}
```

### With Dark Mode Toggle

```tsx
// Your application entry point
import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@trinity/design-system';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Theme
      </button>
      {/* Your app here */}
    </ThemeProvider>
  );
}
```

### With CSS Variables (Advanced)

```tsx
// src/main.tsx
import { injectTrinityCssVariables } from '@trinity/design-system';

// Inject once at app startup
injectTrinityCssVariables();

// Now use in any CSS: var(--trinity-color-primary)
```

---

## 3. Your First Components

### The Essential 5

These cover 80% of use cases. Start here.

```tsx
import { Button, TextField, Card, CardContent, Alert } from '@mui/material';
import { StatusIndicator } from '@trinity/design-system';

function Dashboard() {
  return (
    <Card>
      <CardContent>
        {/* 1. Button - Trinity pill shape, no uppercase */}
        <Button variant="contained" color="primary">
          Save Changes
        </Button>

        {/* 2. TextField - Trinity border radius */}
        <TextField 
          label="Search" 
          variant="outlined" 
          fullWidth 
        />

        {/* 3. Card - Already styled, just use it */}
        {/* (You're inside one right now) */}

        {/* 4. Alert - All severities pre-styled */}
        <Alert severity="success">
          Operation completed successfully
        </Alert>

        {/* 5. StatusIndicator - Trinity's polymorphic indicator */}
        <StatusIndicator 
          variant="chip" 
          status="success" 
          label="Active" 
        />
      </CardContent>
    </Card>
  );
}
```

### Second Wave (Next 5)

Once comfortable, add these:

```tsx
import { 
  Chip, 
  Avatar, 
  Menu, 
  MenuItem, 
  Tabs, 
  Tab 
} from '@mui/material';
import { 
  Modal, 
  Toast, 
  DataTable 
} from '@trinity/design-system';
```

---

## 4. Import Patterns

### ✅ Recommended Imports

```tsx
// Theme (always needed)
import { lightTheme, darkTheme } from '@trinity/design-system';

// Design tokens (for custom styling)
import { baseTokens, semanticTokens } from '@trinity/design-system';

// Trinity-specific components
import { 
  StatusIndicator,
  Modal,
  Toast,
  DataTable,
  TopNavHeader,
} from '@trinity/design-system';

// MUI components (pre-styled by Trinity theme)
import { 
  Button, 
  TextField, 
  Card, 
  Alert,
  Chip,
} from '@mui/material';
```

### ⚠️ Optional Imports (Use When Needed)

```tsx
// Accessibility utilities
import { 
  useFocusTrap, 
  useReducedMotion,
  SkipLink,
} from '@trinity/design-system/accessibility';

// AI components (for AI-powered features)
import { 
  AIChat, 
  AIAvatar, 
  AIContainer,
} from '@trinity/design-system/components/AI';

// Navigation hooks (for custom navs)
import { 
  useSearch, 
  useSidebar,
} from '@trinity/design-system';

// Advanced: Token hook for runtime access
import { useTrinityTokens } from '@trinity/design-system';
```

### 🚫 Avoid These Imports

```tsx
// ❌ Don't import from internal paths
import { something } from '@trinity/design-system/dist/internal';

// ❌ Don't import deprecated components
import { IconIndicator } from '@trinity/design-system'; // Use StatusIndicator

// ❌ Don't import MUI theme creators
import { createTheme } from '@mui/material'; // Use Trinity themes
```

---

## 5. Common Mistakes

### Do / Don't Table

| ❌ Don't | ✅ Do | Why |
|----------|-------|-----|
| `color: '#FF6B35'` | `color: 'primary.main'` | Use theme palette, not hardcoded hex |
| `borderRadius: 8` | `borderRadius: 2` (theme units) | Let theme control radii |
| `fontFamily: 'Arial'` | Remove (theme handles it) | Montserrat is set globally |
| `import { createTheme }` | `import { lightTheme }` | Use pre-configured themes |
| `<Button style={{...}}>` | `<Button sx={{...}}>` | `sx` integrates with theme |
| `backgroundColor: '#fff'` | `backgroundColor: 'background.paper'` | Respects light/dark mode |
| `padding: '16px'` | `padding: 2` (or `p: 2`) | Use spacing units (8px base) |

### Anti-Patterns to Avoid

```tsx
// ❌ ANTI-PATTERN: Hardcoded colors
<Box sx={{ backgroundColor: '#1E3A5F', color: 'white' }}>

// ✅ CORRECT: Theme-aware colors
<Box sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>


// ❌ ANTI-PATTERN: Custom button styling
<Button sx={{ borderRadius: '4px', textTransform: 'uppercase' }}>

// ✅ CORRECT: Trust the theme (Trinity = pill shape, no uppercase)
<Button variant="contained">


// ❌ ANTI-PATTERN: Inline media queries
<Box sx={{ '@media (max-width: 600px)': { display: 'none' } }}>

// ✅ CORRECT: Use breakpoint helpers
<Box sx={{ display: { xs: 'none', sm: 'block' } }}>


// ❌ ANTI-PATTERN: Creating status badges manually
<Chip 
  label="Active" 
  sx={{ bgcolor: 'green', color: 'white' }} 
/>

// ✅ CORRECT: Use StatusIndicator
<StatusIndicator variant="chip" status="success" label="Active" />


// ❌ ANTI-PATTERN: Direct color values for accessibility
<Typography sx={{ color: '#666' }}>Muted text</Typography>

// ✅ CORRECT: Semantic color roles
<Typography color="text.secondary">Muted text</Typography>
```

### Accessibility Checklist per Component

| Component | Must Have |
|-----------|-----------|
| Button | Descriptive text (not just "Click here") |
| IconButton | `aria-label` prop |
| TextField | `label` prop (not placeholder only) |
| Image | `alt` text |
| Modal | Focus trap (built-in with Trinity Modal) |
| Alert | Appropriate `severity` prop |

---

## 6. Team Adoption Checklist

### Week 1: Foundation

- [ ] Install Trinity Design System
- [ ] Replace `createTheme()` with `lightTheme`/`darkTheme`
- [ ] Add `<CssBaseline />` to app root
- [ ] Test dark mode toggle works
- [ ] Import first 5 MUI components

### Week 2: Migration

- [ ] Replace hardcoded colors with theme palette
- [ ] Replace hardcoded spacing with theme units
- [ ] Migrate custom buttons to MUI `<Button>`
- [ ] Migrate status indicators to `<StatusIndicator>`
- [ ] Add `aria-label` to all icon buttons

### Week 3: Polish

- [ ] Use `<Modal>` for all dialogs
- [ ] Use `<Toast>` for notifications
- [ ] Use `<DataTable>` for data grids
- [ ] Run accessibility audit (Storybook a11y addon)
- [ ] Review against Do/Don't table

### Week 4: Validation

- [ ] No hardcoded colors in codebase
- [ ] No hardcoded fonts
- [ ] No custom theme creation
- [ ] All forms use controlled MUI inputs
- [ ] Lighthouse accessibility score > 90

---

## Example: Complete App Setup

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '@trinity/design-system';
import App from './App';

// Optional: CSS variables for use outside React
import { injectTrinityCssVariables } from '@trinity/design-system';
injectTrinityCssVariables();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

```tsx
// Your application component
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Stack,
  Alert,
} from '@mui/material';
import { StatusIndicator } from '@trinity/design-system';

export default function App() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Welcome to Trinity
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            You're using Trinity Design System!
          </Alert>

          <Stack spacing={2}>
            <TextField 
              label="Your Name" 
              variant="outlined" 
              fullWidth 
            />
            
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained">
                Get Started
              </Button>
              <Button variant="outlined">
                Learn More
              </Button>
              <StatusIndicator 
                variant="dot" 
                status="success" 
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
```

---

## Getting Help

| Resource | Link |
|----------|------|
| Storybook | `npm run storybook` → localhost:6006 |
| Component Docs | Each component has live examples |
| Token Reference | Storybook → Tokens section |
| Slack | #design-system |

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                  TRINITY QUICK REFERENCE                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  INSTALL                                                    │
│  npm i @trinity/design-system @mui/material                 │
│        @emotion/react @emotion/styled                       │
│                                                             │
│  THEME SETUP                                                │
│  import { lightTheme } from '@trinity/design-system';       │
│  <ThemeProvider theme={lightTheme}>                         │
│                                                             │
│  SPACING (8px base)                                         │
│  p: 1 = 8px | p: 2 = 16px | p: 3 = 24px | p: 4 = 32px      │
│                                                             │
│  COLORS                                                     │
│  primary.main | secondary.main | error.main | success.main  │
│  text.primary | text.secondary | background.paper           │
│                                                             │
│  BREAKPOINTS                                                │
│  xs: 0 | sm: 600 | md: 900 | lg: 1200 | xl: 1536           │
│                                                             │
│  TRINITY COMPONENTS                                         │
│  StatusIndicator | Modal | Toast | DataTable | TopNavHeader │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
