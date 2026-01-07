# Trinity Design System v1.0.0

**Release Date:** January 4, 2026  
**Package:** `@trinity/design-system@1.0.0`

---

## Release Summary

This is the first production-ready release of the Trinity Design System — a token-driven component library built on MUI v6/v7 with full TypeScript support.

The system enforces design consistency through semantic tokens, provides WCAG 2.1 AA accessible components, and includes governance tooling to ensure proper token usage across consuming applications.

Storybook serves as the canonical documentation for all components.

---

## What's Included

### Design Tokens

A three-tier token architecture providing a single source of truth for design decisions:

- **Base Tokens** — Primitive values (colors, spacing, typography scales)
- **Semantic Tokens** — Contextual mappings (backgrounds, borders, text hierarchy)
- **Component Tokens** — Component-specific configurations (buttons, inputs, cards, navigation)

Tokens are available via:
```typescript
import { tokens, semanticTokens, componentTokens } from '@trinity/design-system';
```

### Components

| Category | Components |
|----------|------------|
| **Layout** | `AppLayout`, `Layout`, `TopNavHeader`, `TopNavWithSidebar`, `PageHeader` |
| **Navigation** | `TrinityLogo`, `SearchBar`, `ClientMenu`, `AppsMenu`, `UserMenu`, `HeaderActions` |
| **Data Display** | `DataTable`, `StatusIndicator` family, `IllustratedMessage`, Charts library |
| **Feedback** | `Toast`, `Modal`, `ConfirmDialog` |
| **AI** | `AILabel`, `AIAvatar`, `AIChatMessage`, `AIChatInput`, `AISource`, `AIContainer` |
| **Inputs** | `FileUpload` |
| **Icons** | `Icon` with configurable icon library support (MUI, Feather) |

### Charts

Full charting library built on Recharts with Trinity theming:

- `LineChart`, `AreaChart`, `BarChart`, `PieChart`, `DonutChart`
- `ScatterChart`, `BubbleChart`, `RadialBarChart`, `GaugeChart`
- `ComposedChart`, `Sparkline`
- Pre-configured color palettes: categorical, sequential, diverging, status

### Accessibility Utilities

```typescript
import { useFocusTrap, useAnnounce, VisuallyHidden, SkipLink } from '@trinity/design-system/accessibility';
```

- Focus trap management for modals and dialogs
- Screen reader announcements (polite/assertive)
- Keyboard navigation hooks
- Reduced motion support

### Utility Hooks

```typescript
import { useDebounce, useClipboard, useLocalStorage, useTrinityBreakpoints } from '@trinity/design-system';
```

### Theming

Light and dark themes with CSS variable injection:

```typescript
import { lightTheme, darkTheme, injectTrinityCssVariables } from '@trinity/design-system';
```

---

## Governance & Enforcement

### Token Usage Enforcement

Custom ESLint rules prevent hardcoded values in component styling:

```bash
npm run lint:tokens
```

Rules enforced:
- No hardcoded hex colors — use `semanticTokens.colors.*` or `tokens.colors.*`
- No magic numbers for spacing — use `semanticTokens.spacing.*`
- No inline border-radius values — use `tokens.borderRadius.*`

### CI Integration

The `lint:ci` script runs both standard linting and token governance checks:

```bash
npm run lint:ci
```

This should be integrated into your CI pipeline to enforce design consistency.

---

## Breaking Changes

None. This is the initial stable release.

---

## Known Exceptions / Intentional Warnings

The following lint warnings are intentional and suppressed:

| File | Warning | Reason |
|------|---------|--------|
| Form components | `jsx-a11y/no-autofocus` | Controlled autofocus for modal form UX |
| Toast component | `jsx-a11y/no-noninteractive-element-to-interactive-role` | `role="alert"` on status regions for screen reader announcements |

These patterns follow accessibility best practices for their specific use cases.

---

## How to Get Started

### Installation

```bash
npm install @trinity/design-system
```

### Peer Dependencies

Ensure these are installed in your application:

```json
{
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "@mui/material": "^6.0.0 || ^7.0.0",
  "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
  "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0"
}
```

### Basic Setup

```tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, injectTrinityCssVariables } from '@trinity/design-system';

// Inject CSS variables (call once at app init)
injectTrinityCssVariables();

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {/* Your application */}
    </ThemeProvider>
  );
}
```

### Token Usage

```tsx
import { semanticTokens } from '@trinity/design-system';

const MyComponent = () => (
  <Box sx={{
    backgroundColor: semanticTokens.colors.background.primary,
    padding: semanticTokens.spacing.md,
    borderRadius: semanticTokens.borderRadius.md,
  }}>
    Content
  </Box>
);
```

---

## Useful Links

| Resource | Location |
|----------|----------|
| **Storybook** | Run `npm run storybook` (port 6006) |
| **Token Reference** | See `tokens.ts` exports |
| **Migration Guide** | `MIGRATION.md` |
| **Contributing** | `CONTRIBUTING.md` |
| **Changelog** | `CHANGELOG.md` |

---

## Package Contents

- **Size:** 2.6 MB (compressed)
- **Unpacked:** 10.9 MB
- **Files:** 2,932 (includes source maps)
- **TypeScript:** Full type definitions included

---

## Support

For issues or questions, open an issue in the repository or contact the Platform team.
