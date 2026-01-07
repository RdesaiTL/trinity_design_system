# Trinity Design System

A customizable MUI-based design system with Trinity branding, WCAG 2.1 AA accessible color palette, and reusable navigation components.

## � Documentation

| Guide | Description |
|-------|-------------|
| [**Quick Start**](./docs/QUICK_START.md) | Get running in 5 minutes |
| [**Developer Guide**](./docs/DEVELOPER_GUIDE.md) | Complete integration guide |
| [**Storybook**](http://localhost:6006) | Interactive component demos |

---

## 🚀 Quick Start

### Install

```bash
npm install @trinity/design-system @mui/material @emotion/react @emotion/styled
```

### Setup

```tsx
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

### Use Components

```tsx
import { Button, Card } from '@mui/material';
import { StatusIndicator, Modal } from '@trinity/design-system';

<Card sx={{ p: 3 }}>
  <Button variant="contained">Save</Button>
  <StatusIndicator status="success" label="Active" />
</Card>
```

---

## 🎨 Features

- **Trinity Branding** - Pre-configured colors, typography, and component styles
- **Accessible** - WCAG 2.1 AA compliant color combinations
- **Dark Mode** - Light and dark themes included
- **TypeScript** - Full type definitions
- **Tree-Shakeable** - Import only what you need

---

## 📦 What's Included

### Themes
```tsx
import { lightTheme, darkTheme, createTrinityTheme } from '@trinity/design-system';
```

### Components
```tsx
import {
  TopNavHeader,       // Navigation header
  TopNavWithSidebar,  // Full layout with sidebar
  StatusIndicator,    // Status badges
  Modal,              // Accessible dialogs
  FileUpload,         // Drag-and-drop upload
  AIChat,             // AI chat interface
  AIPromptInput,      // AI prompt input
} from '@trinity/design-system';
```

### Design Tokens
```tsx
import { baseTokens, semanticTokens, brandColors } from '@trinity/design-system';
```

### Utilities
```tsx
import {
  accessibleCombinations,  // Pre-validated color pairs
  getContrastRatio,        // Check color contrast
  validateAccessibility,   // WCAG validation
} from '@trinity/design-system';
```

---

## 🛠 Development

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm, yarn, or pnpm

### Setup

```bash
# Clone and install
git clone <repo-url>
cd trinity-design-system
npm install

# Start development
npm run dev          # App at http://localhost:5173
npm run storybook    # Docs at http://localhost:6006
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run storybook` | Start Storybook |
| `npm run build` | Build for production |
| `npm run test` | Run tests |
| `npm run lint` | Run linter |

---

**Trinity Design System** - Built with ❤️ using [MUI](https://mui.com/) and [Vite](https://vitejs.dev/)
