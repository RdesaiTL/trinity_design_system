# Trinity Design System - Release Notes

A comprehensive release history for the Trinity Design System — a token-driven component library built on MUI v6/v7 with full TypeScript support and WCAG 2.1 AA accessibility.

**Package:** `@trinity/design-system`  
**Repository:** [github.com/RdesaiTL/trinity_design_system](https://github.com/RdesaiTL/trinity_design_system)

---

# v1.1.0 (January 4, 2026)

**Type:** Minor Release (Backward Compatible)

## Summary

Trinity Design System v1.1.0 introduces **7 new production-ready components**, **3 page-level templates**, expanded design tokens, and comprehensive Storybook documentation. This release focuses on complex UI patterns commonly needed in enterprise applications—tree views, split panes, rich text editing, and diff viewing—all built with full accessibility support.

### Highlights
- 🧩 7 new components + 3 templates
- 🎨 Extended token system with spacing, easing, and surface colors
- 📚 74 new Storybook stories with interactive documentation
- ♿ WCAG 2.1 AA compliance across all new components
- 🔧 Zero breaking changes

---

## New Components

### Data & Selection

| Component | Description |
|-----------|-------------|
| **TreeView** | Hierarchical tree with expand/collapse, multi-select, checkboxes, search filtering, and drag-drop. Full ARIA tree semantics with keyboard navigation. |
| **TransferList** | Dual-list selection for moving items between lists. Supports search, custom rendering, and disabled items. |
| **Combobox** | Enhanced multi-select autocomplete with creatable options, grouping, icons, and custom chip rendering. |

### Layout & Panels

| Component | Description |
|-----------|-------------|
| **SplitPane** | Resizable split layout (horizontal/vertical) with min/max constraints and collapsible panels. ARIA separator with keyboard resize support. |
| **DockLayout** | VS Code-style dockable panel system with tabbed zones, split layouts, and drag-and-drop panel reorganization. |

### Content & Editing

| Component | Description |
|-----------|-------------|
| **RichTextEditor** | WYSIWYG editor with formatting toolbar, lists, headings, alignment, links, images, and fullscreen mode. |
| **DiffViewer** | Side-by-side and unified diff views with syntax highlighting, line numbers, and word-level changes. |

### Additional Components

| Component | Description |
|-----------|-------------|
| **Timeline** | Vertical/horizontal timeline for activity feeds, history, and step sequences. |
| **DataCard** | Metric display card with trend indicators, sparklines, and comparison values. |
| **FilterBar** | Composable filter system with chips, dropdowns, date ranges, and saved filter sets. |
| **SearchInput** | Enhanced search with suggestions, recent searches, keyboard navigation, and loading states. |
| **CommandPalette** | ⌘K-style command interface with fuzzy search, keyboard shortcuts, and grouped actions. |

---

## Page Templates

Three new page-level composition templates demonstrating real-world layouts:

| Template | Description |
|----------|-------------|
| **DashboardTemplate** | Metrics grid, charts, activity feed, and action cards |
| **ListDetailTemplate** | Master-detail pattern with sidebar navigation |
| **SettingsTemplate** | Grouped settings sections with form controls |

See `docs/COMPOSITION_PATTERNS.md` for 8 additional layout patterns.

---

## Token & Theme Enhancements

### Spacing Scale Extensions
```typescript
// New half-values for fine-grained spacing
spacing: { 0.5: '2px', 1.5: '6px', 2.5: '10px', ... }
```

### Animation Easing
```typescript
easing: {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
}
```

### Semantic Surface Colors
```typescript
semanticTokens.colors.surface: {
  success: { light, dark },
  warning: { light, dark },
  error: { light, dark },
  info: { light, dark },
}
```

### Border Radius Tokens
```typescript
semanticTokens.borders.radiusPx: {
  xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '16px', full: '9999px'
}
```

---

## Storybook & Documentation

### New Stories (74 total)
- All 7 components have comprehensive stories with `autodocs`
- Interactive `argTypes` controls for all props
- Variant galleries, state demonstrations, and edge cases
- Real-world usage examples

### Story Categories
```
Components/
├── Data Display/
│   ├── TreeView (8 stories)
│   ├── DataCard (6 stories)
│   └── Timeline (5 stories)
├── Inputs/
│   ├── Combobox (7 stories)
│   ├── TransferList (6 stories)
│   ├── SearchInput (5 stories)
│   └── FilterBar (4 stories)
├── Layout/
│   ├── SplitPane (6 stories)
│   └── DockLayout (5 stories)
├── Editors/
│   ├── RichTextEditor (6 stories)
│   └── DiffViewer (5 stories)
└── Templates/
    ├── Dashboard (3 stories)
    ├── ListDetail (3 stories)
    └── Settings (3 stories)
```

---

## Accessibility (v1.1.0)

All new components meet **WCAG 2.1 AA** standards:

| Component | Keyboard | ARIA | Focus Management |
|-----------|----------|------|------------------|
| TreeView | ↑↓←→ Home End Enter Space | `role="tree"`, `aria-expanded` | Roving tabindex |
| SplitPane | ←→↑↓ Shift+Arrow | `role="separator"`, `aria-valuenow` | Focus visible |
| TransferList | Tab, Space, Enter | `role="listbox"`, `aria-selected` | Focus trap |
| DockLayout | Tab navigation | `role="tablist"`, `aria-controls` | Panel focus |
| RichTextEditor | Standard editing | `aria-label`, live regions | Toolbar focus |
| DiffViewer | ↑↓ navigation | `role="grid"`, `aria-rowindex` | Line focus |
| CommandPalette | ↑↓ Enter Esc | `role="combobox"`, `aria-activedescendant` | Focus trap |

---

## New Imports (v1.1.0)

```typescript
// New components
import {
  TreeView,
  TransferList,
  Combobox,
  SplitPane,
  RichTextEditor,
  DiffViewer,
  DockLayout,
  Timeline,
  DataCard,
  FilterBar,
  SearchInput,
  CommandPalette,
} from '@trinity/design-system';

// New templates
import {
  DashboardTemplate,
  ListDetailTemplate,
  SettingsTemplate,
} from '@trinity/design-system/templates';
```

---

# v1.0.0 (January 4, 2026)

**Type:** Initial Stable Release

## Summary

The first production-ready release of the Trinity Design System — a token-driven component library built on MUI v6/v7 with full TypeScript support.

The system enforces design consistency through semantic tokens, provides WCAG 2.1 AA accessible components, and includes governance tooling to ensure proper token usage across consuming applications.

Storybook serves as the canonical documentation for all components.

---

## Design Tokens

A three-tier token architecture providing a single source of truth for design decisions:

- **Base Tokens** — Primitive values (colors, spacing, typography scales)
- **Semantic Tokens** — Contextual mappings (backgrounds, borders, text hierarchy)
- **Component Tokens** — Component-specific configurations (buttons, inputs, cards, navigation)

```typescript
import { tokens, semanticTokens, componentTokens } from '@trinity/design-system';
```

---

## Core Components

| Category | Components |
|----------|------------|
| **Layout** | `AppLayout`, `Layout`, `TopNavHeader`, `TopNavWithSidebar`, `PageHeader` |
| **Navigation** | `TrinityLogo`, `SearchBar`, `ClientMenu`, `AppsMenu`, `UserMenu`, `HeaderActions` |
| **Data Display** | `DataTable`, `StatusIndicator` family, `IllustratedMessage`, Charts library |
| **Feedback** | `Toast`, `Modal`, `ConfirmDialog` |
| **AI** | `AILabel`, `AIAvatar`, `AIChatMessage`, `AIChatInput`, `AISource`, `AIContainer` |
| **Inputs** | `FileUpload` |
| **Icons** | `Icon` with configurable icon library support (MUI, Feather) |

---

## Charts Library

Full charting library built on Recharts with Trinity theming:

- `LineChart`, `AreaChart`, `BarChart`, `PieChart`, `DonutChart`
- `ScatterChart`, `BubbleChart`, `RadialBarChart`, `GaugeChart`
- `ComposedChart`, `Sparkline`
- Pre-configured color palettes: categorical, sequential, diverging, status

---

## Accessibility Utilities

```typescript
import { useFocusTrap, useAnnounce, VisuallyHidden, SkipLink } from '@trinity/design-system/accessibility';
```

- Focus trap management for modals and dialogs
- Screen reader announcements (polite/assertive)
- Keyboard navigation hooks
- Reduced motion support

---

## Utility Hooks

```typescript
import { useDebounce, useClipboard, useLocalStorage, useTrinityBreakpoints } from '@trinity/design-system';
```

---

## Theming

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

```bash
npm run lint:ci
```

This should be integrated into your CI pipeline to enforce design consistency.

---

## Known Exceptions / Intentional Warnings

| File | Warning | Reason |
|------|---------|--------|
| Form components | `jsx-a11y/no-autofocus` | Controlled autofocus for modal form UX |
| Toast component | `jsx-a11y/no-noninteractive-element-to-interactive-role` | `role="alert"` on status regions for screen reader announcements |

These patterns follow accessibility best practices for their specific use cases.

---

# Getting Started

## Installation

```bash
# Latest version
npm install @trinity/design-system

# Specific version
npm install @trinity/design-system@1.1.0
```

## Peer Dependencies

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

## Basic Setup

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

## Token Usage

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

# Useful Links

| Resource | Description |
|----------|-------------|
| **Storybook** | Run `npm run storybook` (port 6006) |
| **Token Reference** | See `tokens.ts` exports |
| **Migration Guide** | `MIGRATION.md` |
| **Contributing** | `CONTRIBUTING.md` |
| **Changelog** | `CHANGELOG.md` |
| **Composition Patterns** | `docs/COMPOSITION_PATTERNS.md` |
| **Token Usage Rules** | `docs/TOKEN_USAGE_RULES.md` |
| **Accessibility Checklist** | `docs/COMPONENT_A11Y_CHECKLIST.md` |

---

# Package Contents

| Version | Size (compressed) | Unpacked | Files |
|---------|-------------------|----------|-------|
| v1.1.0 | 2.7 MB | ~11 MB | ~3,000 |
| v1.0.0 | 2.6 MB | 10.9 MB | 2,932 |

- Full TypeScript definitions included
- Source maps included

---

# Support

For issues or feature requests, please [open a GitHub issue](https://github.com/RdesaiTL/trinity_design_system/issues).

---

*Trinity Design System Team*
