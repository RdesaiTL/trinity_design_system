# Token System Migration Guide

## Overview

This document guides engineers through migrating from the legacy token system to the new canonical 4-tier token architecture.

---

## What Changed

### Before (Legacy)
```
src/
├── tokens.ts              # 1840 lines, mixed concerns
├── components/
│   ├── AI/tokens.ts       # Hardcoded values, duplicated
│   ├── Charts/tokens.ts   # Hardcoded hex colors
│   └── DataTable/tokens.ts
```

### After (Canonical)
```
src/foundations/tokens/
├── index.ts              # Main barrel file - import from here
├── base.ts               # Tier 1: Raw primitives (colors, spacing, typography)
├── semantic.ts           # Tier 2: Intent-based aliases (brand, text, background)
├── component.ts          # Tier 3: Component-scoped tokens (button, input, card)
├── contextual.ts         # Tier 4: Mode/state overrides (darkMode, highContrast)
└── domains/
    ├── index.ts          # Domain barrel file
    ├── ai.ts             # AI component tokens
    ├── charts.ts         # Chart visualization tokens
    └── datatable.ts      # DataTable tokens
```

---

## Migration Steps

### Step 1: Update Imports

Replace all legacy imports with the new canonical import:

```tsx
// ❌ BEFORE (Legacy)
import { baseTokens, semanticTokens } from '../tokens';
import { aiRadius, aiSpacing } from './AI/tokens';
import { chartColorsPrimary } from './Charts/tokens';

// ✅ AFTER (Canonical)
import { 
  colors, 
  spacing, 
  brand, 
  text,
  aiRadius,
  chartColorsPrimary,
} from '@/foundations/tokens';
```

### Step 2: Update Token References

#### Colors

```tsx
// ❌ BEFORE
const navy = '#00234B';
const coral = '#FF6150';
backgroundColor: brandColors.navy;

// ✅ AFTER
import { colors, brand } from '@/foundations/tokens';

const navy = colors.navy[900];
const coral = colors.coral[800];
backgroundColor: brand.primary;
```

#### Spacing

```tsx
// ❌ BEFORE
padding: 16;
margin: baseTokens.spacing.md;

// ✅ AFTER
import { spacing, space } from '@/foundations/tokens';

padding: spacing[4];  // 16px
margin: space.md;     // 16px
```

#### Typography

```tsx
// ❌ BEFORE
fontSize: 14;
fontWeight: 600;

// ✅ AFTER
import { fontSize, fontWeight } from '@/foundations/tokens';

fontSize: fontSize.sm;          // 14px
fontWeight: fontWeight.semibold; // 600
```

#### Border Radius

```tsx
// ❌ BEFORE
borderRadius: 8;
borderRadius: theme.shape.borderRadius;

// ✅ AFTER
import { borderRadius, radius } from '@/foundations/tokens';

borderRadius: borderRadius.md;  // 8px
borderRadius: radius.default;   // 8px
```

### Step 3: Update Component-Specific Tokens

#### AI Components

```tsx
// ❌ BEFORE (from src/components/AI/tokens.ts)
import { aiRadius, aiSpacing } from './tokens';

// ✅ AFTER
import { aiRadius, aiSpacing, aiComponents } from '@/foundations/tokens';
```

#### Charts

```tsx
// ❌ BEFORE (from src/components/Charts/tokens.ts)
import { chartColorsPrimary, chartTypography } from './tokens';

// ✅ AFTER
import { 
  chartColorsPrimary, 
  chartTypography,
  chartTokens,
  getChartColor,
} from '@/foundations/tokens';
```

#### DataTable

```tsx
// ❌ BEFORE (from src/components/DataTable/tokens.ts)
import { densityTokens, tableColors } from './tokens';

// ✅ AFTER
import { 
  densityTokens, 
  tableColors,
  getDensityTokens,
  getTableColors,
} from '@/foundations/tokens';
```

---

## Token Mapping Reference

### Legacy → New Mapping

| Legacy Token | New Token | Import From |
|-------------|-----------|-------------|
| `brandColors.navy` | `brand.primary` | `semantic` |
| `brandColors.coral` | `brand.secondary` | `semantic` |
| `brandColors.purple` | `brand.accent` | `semantic` |
| `baseTokens.spacing.xs` | `spacing[1]` or `space.xs` | `base` / `semantic` |
| `baseTokens.spacing.sm` | `spacing[2]` or `space.sm` | `base` / `semantic` |
| `baseTokens.spacing.md` | `spacing[4]` or `space.md` | `base` / `semantic` |
| `baseTokens.spacing.lg` | `spacing[6]` or `space.lg` | `base` / `semantic` |
| `baseTokens.spacing.xl` | `spacing[8]` or `space.xl` | `base` / `semantic` |
| `baseTokens.borderRadius.sm` | `borderRadius.sm` | `base` |
| `baseTokens.borderRadius.md` | `borderRadius.md` | `base` |
| `baseTokens.borderRadius.lg` | `borderRadius.lg` | `base` |
| `baseTokens.borderRadius.full` | `borderRadius.full` | `base` |

### Status Colors

| Legacy | New |
|--------|-----|
| `colors.success.main` | `status.success.default` |
| `colors.warning.main` | `status.warning.default` |
| `colors.error.main` | `status.error.default` |
| `colors.info.main` | `status.info.default` |

### Dark Mode

```tsx
// ❌ BEFORE
import { darkModeTokens } from '../tokens';
const bgColor = darkModeTokens.background.primary;

// ✅ AFTER
import { darkMode } from '@/foundations/tokens';
const bgColor = darkMode.background.primary;
```

---

## Breaking Changes

### 1. Removed Exports

The following are no longer exported directly:

- `brandColors` → Use `brand` from semantic tokens
- `accessibleCombinations` → Use `brand` + `text` tokens
- `darkModeTokens` → Use `darkMode` from contextual tokens

### 2. Structure Changes

```tsx
// ❌ baseTokens.spacing.md
// ✅ spacing[4] or space.md

// ❌ baseTokens.borderRadius.md  
// ✅ borderRadius.md or radius.default

// ❌ semanticTokens.colors.text.primary
// ✅ text.primary
```

### 3. AI Token Changes

```tsx
// ❌ aiRadius = { xs: 1, sm: 1.5, md: 2 }  (raw values)
// ✅ aiRadius = { xs: 1, sm: 1.5, md: 2 }  (derived from borderRadius.xs / 4)
```

### 4. Chart Token Changes

```tsx
// ❌ chartColorsPrimary[0] = '#7841C9'  (hardcoded hex)
// ✅ chartColorsPrimary[0] = colors.purple[700]  (derived)
```

---

## Path Aliases

Add this to your `tsconfig.json` for cleaner imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/foundations/*": ["./src/foundations/*"]
    }
  }
}
```

Then import:

```tsx
import { colors, brand, button } from '@/foundations/tokens';
```

---

## Using the Combined Token Object

For programmatic access to all tokens:

```tsx
import tokens from '@/foundations/tokens';

// Access by tier
tokens.base.colors.navy[900]
tokens.semantic.brand.primary
tokens.component.button.primary.background
tokens.contextual.darkMode.text.primary

// Access domains
tokens.domains.ai.radius.md
tokens.domains.charts.colors.primary
tokens.domains.dataTable.density.compact
```

---

## Validation Checklist

After migration, verify:

- [ ] No hardcoded hex colors (`#XXXXXX`) in component files
- [ ] No magic numbers for spacing, radius, or font sizes
- [ ] All imports come from `@/foundations/tokens` or relative `../foundations/tokens`
- [ ] Dark mode uses `darkMode` tokens, not inline color switches
- [ ] TypeScript compiles without errors
- [ ] Storybook renders correctly
- [ ] Visual regression tests pass

---

## Need Help?

If you encounter issues during migration:

1. Check the [Developer Guide](./DEVELOPER_GUIDE.md)
2. Review token type definitions in each file
3. Use TypeScript autocomplete to explore available tokens
4. Search the codebase for usage examples

---

## Timeline

| Phase | Description | Target |
|-------|-------------|--------|
| Phase 1 | New token architecture created | ✅ Complete |
| Phase 2 | Migrate core components | Week 1 |
| Phase 3 | Migrate domain components (AI, Charts, DataTable) | Week 2 |
| Phase 4 | Deprecate legacy token files | Week 3 |
| Phase 5 | Remove legacy token files | Week 4 |
