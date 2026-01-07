# Trinity Design System - Quick Start

Get up and running with Trinity Design System in 5 minutes.

---

## 1. Install

```bash
npm install @trinity/design-system @mui/material @emotion/react @emotion/styled
```

## 2. Setup Theme

```tsx
// Your application entry point
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '@trinity/design-system';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <YourApp />
    </ThemeProvider>
  );
}
```

## 3. Use Components

```tsx
import { Button, Card, TextField } from '@mui/material';
import { StatusIndicator, Modal } from '@trinity/design-system';

function MyPage() {
  return (
    <Card sx={{ p: 3 }}>
      <TextField label="Name" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained">Save</Button>
      <StatusIndicator status="success" label="Active" />
    </Card>
  );
}
```

---

## Dark Mode

```tsx
import { lightTheme, darkTheme } from '@trinity/design-system';

const [dark, setDark] = useState(false);

<ThemeProvider theme={dark ? darkTheme : lightTheme}>
  <CssBaseline />
  <App />
</ThemeProvider>
```

---

## Key Components

| Component | Import | Description |
|-----------|--------|-------------|
| `TopNavHeader` | `@trinity/design-system` | Navigation header with search, user menu |
| `TopNavWithSidebar` | `@trinity/design-system` | Full layout with sidebar navigation |
| `StatusIndicator` | `@trinity/design-system` | Status badges (success, warning, error) |
| `Modal` | `@trinity/design-system` | Accessible dialog with variants |
| `FileUpload` | `@trinity/design-system` | Drag-and-drop file upload |
| `AIChat` | `@trinity/design-system` | AI chat interface |

---

## Design Tokens

```tsx
import { baseTokens, semanticTokens } from '@trinity/design-system';

// Colors
baseTokens.colors.navy      // '#1B365D'
baseTokens.colors.coral     // '#FF6B47'

// Spacing
baseTokens.spacing[4]       // 16px

// Border Radius
baseTokens.borderRadius.lg  // 12px
```

---

## Accessible Colors

```tsx
import { accessibleCombinations } from '@trinity/design-system';

<Box sx={{
  backgroundColor: accessibleCombinations.whiteOnNavy.bg,
  color: accessibleCombinations.whiteOnNavy.text,
}}>
  WCAG AA Compliant
</Box>
```

---

## Next Steps

- 📖 [Full Developer Guide](./DEVELOPER_GUIDE.md) - Complete documentation
- 🎨 [Storybook](http://localhost:6006) - Interactive component demos
- 🎯 [Design Tokens](./DEVELOPER_GUIDE.md#design-tokens) - Full token reference

---

*Need help? Check the [Troubleshooting](./DEVELOPER_GUIDE.md#troubleshooting) section.*
