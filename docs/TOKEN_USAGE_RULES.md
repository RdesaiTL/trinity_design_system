# Trinity Design System - Token Usage Rules

## Overview

This document defines the rules for color and token usage in Trinity components to ensure consistency, maintainability, and theme support.

---

## 1. Token Import Rules

### ✅ Component Code MAY Import

```typescript
// Primary token sources
import { brandColors } from '../tokens';
import { brandColors } from '../../tokens';

// Semantic and component tokens (read-only consumption)
import { semanticTokens, componentTokens } from '../tokens';

// Theme utilities
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
```

### ❌ Component Code MUST NOT Import

```typescript
// Never import baseTokens directly in components
import { baseTokens } from '../tokens';  // ❌ VIOLATION

// Never import theme creation utilities in components
import { createTheme } from '@mui/material/styles';  // ❌ (except theme.ts)

// Never import raw hex values from external sources
import colors from 'tailwindcss/colors';  // ❌ VIOLATION
```

### Rationale

- `brandColors` = Public API for brand palette (safe)
- `baseTokens` = Internal implementation detail (may change)
- `semanticTokens` = Intended for consumption by components
- `componentTokens` = Component-specific styling

---

## 2. Color Literal Rules

### ❌ PROHIBITED in Component Files

```typescript
// Hardcoded hex colors
backgroundColor: '#ffffff',  // ❌
color: '#1A1B4B',           // ❌
borderColor: '#fff',        // ❌

// RGBA/HSLA literals
background: 'rgba(0, 0, 0, 0.5)',    // ❌
color: 'hsla(220, 50%, 50%, 0.8)',   // ❌

// Named CSS colors
color: 'red',        // ❌
background: 'white', // ❌
```

### ✅ ALLOWED Patterns

```typescript
// Token references
backgroundColor: brandColors.neutral.white,
color: semanticTokens.colors.text.primary,

// MUI alpha utility with token reference
borderColor: alpha(brandColors.neutral.white, 0.1),
background: alpha(brandColors.primary.navy, 0.05),

// Theme palette references
color: theme.palette.primary.main,
backgroundColor: theme.palette.background.paper,

// CSS variables from tokens
color: 'var(--trinity-color-navy-900)',
```

---

## 3. Exception Patterns

When a hardcoded color is intentionally required, document it with a comment:

### Exception Comment Format

```typescript
// @intentional-color: <reason>
const errorRed = '#EF4444'; // @intentional-color: Tailwind red-500 for universal error recognition
```

### Valid Exception Reasons

| Reason | Use Case |
|--------|----------|
| `illustration semantic` | SVG illustrations using standard icon colors |
| `external standard` | Third-party library requirements |
| `accessibility contrast` | WCAG-mandated specific contrast ratios |
| `animation interpolation` | CSS keyframes requiring static values |
| `print stylesheet` | Print-specific colors |

### Exception Examples

```typescript
// ✅ Valid exceptions
const illustrationColors = {
  error: '#EF4444',   // @intentional-color: illustration semantic (Tailwind red-500)
  warning: '#F59E0B', // @intentional-color: illustration semantic (Tailwind amber-500)
  success: '#10B981', // @intentional-color: illustration semantic (Tailwind emerald-500)
};

// ✅ Valid: Documented structural override
// @intentional-color: tabular readability (NOT from gray scale)
const headerBg = '#F3F4F6';
```

---

## 4. File-Based Exclusions

### Files EXEMPT from Color Rules

| Pattern | Reason |
|---------|--------|
| `src/tokens.ts` | Token definition file |
| `src/theme.ts` | Theme configuration |
| `**/*.test.{ts,tsx}` | Test files |
| `**/*.stories.{ts,tsx}` | Storybook stories (demo purposes) |
| `**/tokens.ts` | Component token files |
| `**/*.svg` | SVG assets |
| `.storybook/**` | Storybook configuration |

### Files SUBJECT to Color Rules

| Pattern | Strictness |
|---------|------------|
| `src/components/**/*.tsx` | STRICT |
| `src/pages/**/*.tsx` | STRICT |
| `src/hooks/**/*.ts` | STRICT |

---

## 5. Quick Reference

### Color Usage Decision Tree

```
Need a color in component code?
│
├─ Is it from brand palette?
│  └─ YES → Use brandColors.{category}.{name}
│
├─ Is it semantic (text, background, border)?
│  └─ YES → Use semanticTokens.colors.{category}.{name}
│
├─ Is it component-specific?
│  └─ YES → Use componentTokens.{component}.{property}
│
├─ Is it for transparency on existing token?
│  └─ YES → Use alpha(brandColors.x.y, opacity)
│
├─ Is it theme-dependent?
│  └─ YES → Use theme.palette.{path}
│
└─ None of the above?
   └─ Add @intentional-color comment with justification
```

---

## 6. Enforcement

### NPM Scripts

```bash
# Standard lint (includes basic color warnings)
npm run lint

# Strict token enforcement (CI-level, errors on violations)
npm run lint:tokens

# Auto-fix where possible
npm run lint:tokens:fix

# Full CI check (lint + token enforcement)
npm run lint:ci
```

### Configuration Files

| File | Purpose |
|------|---------|
| `eslint.config.js` | Main ESLint config (warnings for colors) |
| `eslint.tokens.config.js` | Strict token enforcement (errors for CI) |

### CI Pipeline (GitHub Actions)

Token enforcement runs in `.github/workflows/ci.yml`:

```yaml
- name: Run ESLint
  run: npm run lint

- name: Enforce token usage
  run: npm run lint:tokens
```

PRs will fail if:
- New hardcoded hex colors are introduced in component files
- `baseTokens` is imported directly in component code
- `rgba()`/`hsla()` literals are used without exception comments

### Pre-Commit Hook (Optional)

```bash
# .husky/pre-commit
npm run lint:tokens
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-03 | Initial rules (Phase 4.3) |
