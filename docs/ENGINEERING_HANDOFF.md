# Trinity Design System — Engineering Handoff

> **Document Type**: Developer Onboarding  
> **Last Updated**: January 7, 2026  
> **Audience**: Engineers consuming or contributing to the design system

---

## Quick Start

### Installation

```bash
npm install @trinity/design-system
```

### Basic Usage

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, Button, TopNavHeader } from '@trinity/design-system';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <TopNavHeader title="My App" />
      <Button variant="contained">Get Started</Button>
    </ThemeProvider>
  );
}
```

---

## Architecture Overview

### Token Hierarchy

```
┌─────────────────────────────────────────────────────┐
│                  MUI Theme                          │  ← Single source of truth
├─────────────────────────────────────────────────────┤
│              Semantic Tokens                        │  ← Purpose-based aliases
│   (semanticTokens.colors.text.primary)              │
├─────────────────────────────────────────────────────┤
│              Brand Colors                           │  ← Trinity palette
│   (brandColors.primary.navy)                        │
├─────────────────────────────────────────────────────┤
│              Base Tokens                            │  ← Raw values (internal)
│   (baseTokens.colors.navy[900])                     │
└─────────────────────────────────────────────────────┘
```

### What You Should Import

```tsx
// ✅ ALLOWED
import { brandColors, semanticTokens } from '@trinity/design-system';
import { lightTheme, darkTheme } from '@trinity/design-system';

// ❌ PROHIBITED
import { baseTokens } from '@trinity/design-system'; // Internal only
```

---

## Styling Guidelines

### Color Usage

```tsx
// ✅ Use tokens
<Box sx={{ color: brandColors.primary.navy }} />
<Box sx={{ backgroundColor: semanticTokens.colors.background.primary }} />

// ✅ Use theme
<Box sx={{ color: 'primary.main' }} />
<Box sx={{ color: (theme) => theme.palette.text.secondary }} />

// ❌ Never hardcode
<Box sx={{ color: '#0A2540' }} />  // VIOLATION
```

### Spacing

```tsx
// ✅ Use theme spacing
<Box sx={{ p: 2, gap: 1 }} />  // 16px padding, 8px gap

// ❌ Never hardcode
<Box sx={{ padding: '16px' }} />  // VIOLATION
```

### Border Radius

```tsx
// ✅ Use theme
<Box sx={{ borderRadius: 1 }} />  // 8px (theme default)
<Card sx={{ borderRadius: 2 }} />  // 16px

// ❌ Never hardcode
<Box sx={{ borderRadius: '8px' }} />  // VIOLATION
```

---

## Component Patterns

### Layout Components

```tsx
import { TopNavWithSidebar, Layout } from '@trinity/design-system';

<TopNavWithSidebar
  title="App Name"
  navCategories={[
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ]}
>
  <Layout maxWidth="lg">
    {/* Page content */}
  </Layout>
</TopNavWithSidebar>
```

### Form Components

```tsx
import { SearchInput, FilterBar, Combobox } from '@trinity/design-system';

// Search with suggestions
<SearchInput
  placeholder="Search..."
  onSearch={handleSearch}
  suggestions={suggestions}
/>

// Multi-select filter
<FilterBar
  filters={[
    { key: 'status', label: 'Status', type: 'select', options: [...] },
    { key: 'date', label: 'Date', type: 'date' },
  ]}
  onFilterChange={handleFilter}
/>
```

### Data Display

```tsx
import { DataTable, DataCard, AreaChart } from '@trinity/design-system';

// Table with sorting and pagination
<DataTable
  columns={columns}
  data={rows}
  sortable
  pagination
/>

// Chart
<AreaChart
  data={chartData}
  xKey="date"
  series={[{ key: 'revenue', name: 'Revenue' }]}
/>
```

---

## Accessibility Requirements

### Focus Management

All interactive components support keyboard navigation:
- `Tab` / `Shift+Tab` for focus traversal
- `Enter` / `Space` for activation
- `Escape` for dismissal (modals, dropdowns)
- Arrow keys for menu/list navigation

### ARIA Labels

```tsx
// ✅ Required for icon-only buttons
<IconButton aria-label="Close dialog">
  <CloseIcon />
</IconButton>

// ✅ Required for custom controls
<SearchInput aria-label="Search products" />
```

### Color Contrast

All text/background combinations meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text).

---

## Development Workflow

### Running Locally

```bash
# Development server
npm run dev

# Storybook
npm run storybook

# Tests
npm test

# Lint
npm run lint
npm run lint:tokens  # Strict token compliance
```

### Pre-Commit Checklist

1. `npm run lint` — 0 errors
2. `npm run lint:tokens` — 0 errors (for component changes)
3. `npm test` — All tests pass
4. `npm run build` — Build succeeds

### CI Pipeline

| Job | Trigger | Required |
|-----|---------|----------|
| Lint | All PRs | ✅ |
| Test | All PRs | ✅ |
| Build | All PRs | ✅ |
| Storybook | All PRs | ✅ |
| Chromatic | All PRs | ✅ (visual review) |

---

## Common Patterns

### Theme Switching

```tsx
import { lightTheme, darkTheme } from '@trinity/design-system';

const [isDark, setIsDark] = useState(false);

<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
  {children}
</ThemeProvider>
```

### Responsive Design

```tsx
<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 1, md: 2 },
    p: { xs: 2, md: 4 },
  }}
/>
```

### Custom Component Styling

```tsx
// ✅ Extend via sx prop
<Button sx={{ minWidth: 200 }}>Wide Button</Button>

// ✅ Use styled() for complex extensions
const PrimaryCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));
```

---

## Troubleshooting

### "Hardcoded hex color" Lint Error

```tsx
// ❌ This will fail lint:tokens
color: '#FF6150'

// ✅ Fix: Use token
color: brandColors.secondary.coral

// ✅ Or if truly intentional, add exception comment
// eslint-disable-next-line no-restricted-syntax -- @intentional-color: [category] - [reason]
color: '#FFFFFF'
```

### "autoFocus" Accessibility Warning

```tsx
// If autoFocus is intentional for UX, add:
// eslint-disable-next-line jsx-a11y/no-autofocus -- Intentional: [UX reason]
autoFocus
```

### Component Not Rendering Theme Styles

Ensure `ThemeProvider` wraps your app root:

```tsx
// ❌ Missing provider
<App />

// ✅ Correct
<ThemeProvider theme={lightTheme}>
  <App />
</ThemeProvider>
```

---

## Related Documentation

- [TOKEN_USAGE_RULES.md](./TOKEN_USAGE_RULES.md) — Detailed token compliance rules
- [ALIGNMENT_CONTRACT.md](./ALIGNMENT_CONTRACT.md) — Architectural governance
- [INTENTIONAL_EXCEPTIONS.md](./INTENTIONAL_EXCEPTIONS.md) — Approved exception categories
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) — Full accessibility guidelines
- [STORYBOOK_STANDARDS.md](./STORYBOOK_STANDARDS.md) — Story writing conventions
