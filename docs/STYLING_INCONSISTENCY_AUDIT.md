# Trinity Design System - Styling Inconsistency Audit

**Date:** January 5, 2026  
**Version:** 1.1.0  
**Status:** Action Required

---

## Executive Summary

The Trinity Design System has two parallel styling approaches that have drifted apart, causing visual inconsistencies between MUI primitives (styled via theme overrides) and Trinity custom components (styled inline).

### The Core Problem

```
┌─────────────────────────────────────────────────────────────────┐
│                     STYLING ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   MUI Components              Trinity Wrapper Components        │
│   ─────────────────           ──────────────────────────        │
│   <Button>                    <DataCard>                        │
│   <TextField>                 <Toast>                           │
│   <Card>                      <PageHeader>                      │
│   <Chip>                      <StatusIndicator>                 │
│   <Alert>                     <AI Components>                   │
│                                                                 │
│   Styled via:                 Styled via:                       │
│   └─ src/theme.ts             └─ Inline sx props                │
│      (component overrides)       (mixed token sources)          │
│                                                                 │
│   Token source:               Token sources:                    │
│   └─ tokenSet.base.*          ├─ semanticTokens.*               │
│   └─ tokenSet.semantic.*      ├─ baseTokens.*                   │
│                               ├─ Hardcoded px/rem               │
│                               └─ MUI spacing units (1=8px)      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Result:** A `<Button>` inside a `<DataCard>` may have different border-radius, spacing, or typography than expected because the wrapper component overrides theme defaults with inconsistent values.

---

## Component Inventory

### MUI Components (Theme-Styled) - 50+ Primitives

These use MUI directly and receive styling from `src/theme.ts` component overrides:

| Category | Components |
|----------|------------|
| **Layout** | Box, Container, Grid, Stack, Paper |
| **Typography** | Typography, Link, Divider |
| **Buttons** | Button, ButtonGroup, IconButton, Fab, ToggleButton, ToggleButtonGroup |
| **Form Inputs** | TextField, Autocomplete, Select, Checkbox, Radio, RadioGroup, Switch, Slider, Rating |
| **Form Helpers** | FormControl, FormControlLabel, FormGroup, FormLabel, InputAdornment |
| **Date/Time** | DatePicker, TimePicker, DateTimePicker (MUI X) |
| **Data Display** | Avatar, AvatarGroup, Badge, Chip, List components, Table components, Tooltip |
| **Feedback** | Alert, AlertTitle, CircularProgress, LinearProgress, Skeleton |
| **Navigation** | Breadcrumbs, Tabs, Tab, Menu, MenuItem, Pagination |
| **Surfaces** | Accordion, Card components, AppBar, Toolbar |
| **Transitions** | Collapse, Fade, Slide, Zoom |

### Trinity Wrapper Components - 35+ Custom

These are custom components with their own styling:

| Component | Purpose |
|-----------|---------|
| **TopNavHeader** | Trinity-branded navigation header |
| **TopNavWithSidebar** | Header + collapsible sidebar |
| **AppLayout** | Full application shell |
| **DataTable** | Feature-rich table with sorting, filtering |
| **Toast / ToastProvider** | Notification system |
| **Modal / ConfirmDialog** | Styled dialogs |
| **FileUpload** | Drag-drop file upload |
| **PageHeader** | Page title + breadcrumbs |
| **StatusIndicator** family | 8 status indicator variants |
| **AI Components** | 15+ AI/chat UI components |
| **Charts** | 11 chart types |
| **IllustratedMessage** | Empty states |
| **SearchInput** | Search with suggestions |
| **FilterBar** | Advanced filtering |
| **DataCard** | KPI/metric cards |
| **CommandPalette** | Keyboard command interface |
| **Timeline** | Activity timeline |
| **TreeView** | Hierarchical tree |
| **RichTextEditor** | WYSIWYG editor |
| **DiffViewer** | Code diff display |
| **Templates** | Dashboard, Settings, ListDetail |

---

## Detailed Inconsistency Findings

### 1. Border Radius Inconsistencies

**Theme Definition (src/theme.ts):**
```typescript
// Token values from src/tokens.ts
borderRadius: {
  none: 0,    // 0px
  xs: 4,      // 4px - badges, small chips
  sm: 6,      // 6px - buttons, tags, inputs
  md: 8,      // 8px - cards, list items
  lg: 12,     // 12px - larger cards, dialogs
  xl: 16,     // 16px - modals, popovers
  '2xl': 20,  // 20px - large containers
  '3xl': 24,  // 24px - maximum nesting
  full: 9999, // pill shapes
}

// Applied to MUI components:
MuiCard:     borderRadius.md (8px)
MuiPaper:    borderRadius.md (8px)
MuiButton:   borderRadius.full (pill)
MuiChip:     borderRadius.sm (6px)
MuiAlert:    borderRadius.sm (6px)
MuiDialog:   borderRadius.xl (16px)
```

**Hardcoded Values Found:**

| File | Line | Current Value | Expected Token |
|------|------|---------------|----------------|
| `src/components/Layout.tsx` | 196 | `'8px'` | `semanticTokens.borders.radiusPx.md` |
| `src/components/Layout.tsx` | 224 | `'8px'` | `semanticTokens.borders.radiusPx.md` |
| `src/components/AI/AILabel.tsx` | 104 | `'10px'` / `'100px'` | `baseTokens.borderRadius.lg` / `.full` |
| `src/components/AppLayout/ResizablePanel.tsx` | 152 | `2` (16px MUI) | Explicit token |
| `src/components/IllustratedMessage.tsx` | 688 | `3` (24px MUI) | `semanticTokens.borders.radius.card` |
| `src/components/Charts/ChartWrapper.tsx` | 125 | `1` (8px MUI) | Token reference |
| `src/components/Charts/CustomLegend.tsx` | 142 | `1` (8px MUI) | Token reference |
| `src/components/Combobox/Combobox.tsx` | 325 | `0` | `baseTokens.borderRadius.none` |

**Issue:** MUI spacing units (`1 = 8px`, `2 = 16px`) are used inconsistently with explicit px values and token references.

---

### 2. Font Size Inconsistencies

**Token Definition (src/tokens.ts):**
```typescript
fontSize: {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem',// 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
}
```

**Hardcoded Values Found:**

| File | Line | Current Value | Expected Token |
|------|------|---------------|----------------|
| `src/components/AI/AILabel.tsx` | 41 | `'0.625rem'` (10px) | Custom - below xs |
| `src/components/AI/AILabel.tsx` | 42 | `'0.6875rem'` (11px) | Custom - between xs/sm |
| `src/components/AI/AILabel.tsx` | 43 | `'0.75rem'` (12px) | `baseTokens.fontSize.xs` |
| `src/components/AI/AILabel.tsx` | 44 | `'0.8125rem'` (13px) | Custom - between xs/sm |
| `src/components/AI/AILabel.tsx` | 45 | `'0.875rem'` (14px) | `baseTokens.fontSize.sm` |
| `src/components/AI/AIActions.tsx` | 269 | `'0.625rem'` | Consider adding `2xs` token |
| `src/components/AI/AIChat.tsx` | 313 | `'0.9375rem'` (15px) | Between sm/base |
| `src/components/AI/AISources.tsx` | 106, 149, 247 | `'0.75rem'` | `baseTokens.fontSize.xs` |
| `src/components/AI/AIContainer.tsx` | 323 | `'0.6875rem'` | Custom |
| `src/components/AI/AIExplainability.tsx` | 112 | `'0.75rem'` | `baseTokens.fontSize.xs` |
| `src/components/PageHeader/PageHeader.tsx` | 206, 221 | `'0.875rem'` | `baseTokens.fontSize.sm` |
| `src/components/PageHeader/PageHeader.tsx` | 276 | `'0.75rem'` | `baseTokens.fontSize.xs` |
| `src/components/StatusIndicator/Badge.tsx` | 57 | `'0.7rem'` (11.2px) | ~`baseTokens.fontSize.xs` |
| `src/components/StatusIndicator/StatusIndicator.tsx` | 418 | `'0.7rem'` | ~`baseTokens.fontSize.xs` |
| `src/components/AppLayout/InsightEnginePanel.tsx` | 753 | `'14px'` | `baseTokens.fontSize.sm` |
| `src/components/AppLayout/InsightEnginePanel.tsx` | 800 | `'11px'` | Consider `2xs` token |

**Issue:** AI components use non-standard font sizes (10px, 11px, 13px, 15px) that don't map to existing tokens. Consider adding `2xs: '0.625rem'` (10px) token.

---

### 3. Color Inconsistencies

**Semantic Token Definition:**
```typescript
effects: {
  overlay: {
    hover: 'rgba(0, 0, 0, 0.08)',
    hoverSubtle: 'rgba(0, 0, 0, 0.04)',
    pressed: 'rgba(0, 0, 0, 0.12)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    focus: 'rgba(0, 0, 0, 0.12)',
  },
  onDark: {
    subtle: 'rgba(255, 255, 255, 0.12)',
    medium: 'rgba(255, 255, 255, 0.24)',
    strong: 'rgba(255, 255, 255, 0.48)',
  },
}
```

**Hardcoded Values Found:**

| File | Line | Current Value | Expected Token |
|------|------|---------------|----------------|
| `src/components/PageHeader/PageHeader.tsx` | 189 | `rgba(255,255,255,0.7)` | `semanticTokens.effects.onDark.strong` or new token |
| `src/components/PageHeader/PageHeader.tsx` | 202 | `rgba(255,255,255,0.7)` | Same as above |
| `src/components/PageHeader/PageHeader.tsx` | 247 | `rgba(255,255,255,0.1)` | `semanticTokens.effects.onDark.subtle` |
| `src/components/PageHeader/PageHeader.tsx` | 285 | `rgba(255,255,255,0.8)` | New token needed |
| `src/components/PageHeader/PageHeader.tsx` | 303 | `rgba(255,255,255,0.5)` | `semanticTokens.effects.onDark.strong` |
| `src/components/PageHeader/PageHeader.tsx` | 307 | `rgba(255,255,255,0.1)` | `semanticTokens.effects.onDark.subtle` |
| `src/components/PageHeader/PageHeader.tsx` | 322 | `rgba(255,255,255,0.9)` | New token needed |
| `src/components/PageHeader/PageHeader.tsx` | 334, 356 | `rgba(255,255,255,0.7)` | New token needed |
| `src/components/AI/AIVisuals.tsx` | 161 | `rgba(255, 255, 255, 0.8)` | Token needed |
| `src/components/AI/AIVisuals.tsx` | 233 | `rgba(255, 255, 255, 0.7)` | Token needed |
| `src/components/Charts/ChartWrapper.tsx` | 124 | `rgba(218, 30, 40, 0.05)` | Error color token |

**Issue:** `onDark` tokens only go up to 0.48 opacity. Components need 0.7, 0.8, 0.9 variants for hero sections.

---

### 4. Spacing Inconsistencies

**Example from DataCard:**
```typescript
// src/components/DataCard/DataCard.tsx:136
padding: semanticTokens.inline.comfortable + 4, // 20px - comfortable + extra breathing room
```

**Issue:** Arithmetic on tokens breaks the token system. Should use `semanticTokens.inline.spacious` or a dedicated token.

---

## Recommended Token Additions

Based on audit findings, consider adding these tokens:

### Font Sizes
```typescript
fontSize: {
  '2xs': '0.625rem',  // 10px - for micro labels, AI badges
  // existing tokens...
}
```

### On-Dark Effects
```typescript
onDark: {
  subtle: 'rgba(255, 255, 255, 0.12)',   // existing
  medium: 'rgba(255, 255, 255, 0.24)',   // existing
  strong: 'rgba(255, 255, 255, 0.48)',   // existing
  // NEW:
  prominent: 'rgba(255, 255, 255, 0.7)', // for hero text
  emphasis: 'rgba(255, 255, 255, 0.8)',  // for hero emphasis
  contrast: 'rgba(255, 255, 255, 0.9)',  // for hero high-contrast
}
```

---

## Harmonization Options

### Option A: Fix Trinity Wrappers (Recommended)

**Effort:** Medium (2-3 days)  
**Risk:** Low  
**Scope:** ~30 files

Update Trinity wrapper components to use consistent token references:
1. Replace hardcoded `px` values with `semanticTokens.*` or `baseTokens.*`
2. Replace MUI spacing units with explicit token values
3. Add missing tokens for edge cases (2xs font, prominent opacity)

### Option B: Create MUI Primitive Wrappers

**Effort:** High (1 week)  
**Risk:** Medium (maintenance burden)  
**Scope:** New component files

Create thin wrappers around MUI primitives:
```typescript
// src/components/Button/Button.tsx
export { Button } from '@mui/material';
export type { ButtonProps } from '@mui/material';

// Or with enforcement:
export const TrinityButton = (props: ButtonProps) => (
  <Button disableElevation {...props} />
);
```

**Pros:**
- Single import source for consumers
- Can enforce Trinity defaults
- Abstraction for future changes

**Cons:**
- Must maintain wrapper compatibility with MUI updates
- Larger bundle size
- Documentation complexity

### Option C: ESLint Enforcement + Documentation

**Effort:** Medium (2-3 days)  
**Risk:** Low  
**Scope:** Tooling + docs

1. Add ESLint rule to flag hardcoded style values
2. Create design token usage guide
3. Add Storybook token documentation

---

## Files Requiring Updates

### High Priority (User-Facing Components)

| File | Issues |
|------|--------|
| `src/components/PageHeader/PageHeader.tsx` | 8 hardcoded rgba colors, 3 hardcoded font sizes |
| `src/components/AI/AILabel.tsx` | Custom font sizes, hardcoded border-radius |
| `src/components/AI/AISources.tsx` | 3 hardcoded font sizes |
| `src/components/StatusIndicator/Badge.tsx` | Non-standard font size |
| `src/components/Layout.tsx` | 2 hardcoded border-radius values |

### Medium Priority (Supporting Components)

| File | Issues |
|------|--------|
| `src/components/AI/AIChat.tsx` | Non-standard font size |
| `src/components/AI/AIActions.tsx` | Non-standard font size |
| `src/components/AI/AIContainer.tsx` | Non-standard font size |
| `src/components/AI/AIVisuals.tsx` | 2 hardcoded rgba colors |
| `src/components/AI/AIExplainability.tsx` | Hardcoded font size |
| `src/components/AppLayout/InsightEnginePanel.tsx` | 2 hardcoded font sizes |
| `src/components/AppLayout/ResizablePanel.tsx` | MUI spacing for border-radius |

### Low Priority (Internal/Chart Components)

| File | Issues |
|------|--------|
| `src/components/Charts/ChartWrapper.tsx` | Hardcoded color, MUI spacing |
| `src/components/Charts/CustomLegend.tsx` | MUI spacing |
| `src/components/IllustratedMessage.tsx` | MUI spacing for border-radius |
| `src/components/Combobox/Combobox.tsx` | Hardcoded border-radius |

---

## Validation Checklist

After harmonization, verify:

- [ ] All `borderRadius` values use tokens or theme
- [ ] All `fontSize` values use tokens or Typography variants
- [ ] All `rgba()` colors are tokenized or use MUI palette
- [ ] No arithmetic operations on tokens (`token + 4`)
- [ ] MUI spacing units (`1`, `2`, etc.) are intentional, not accidental
- [ ] Build passes without type errors
- [ ] Visual regression tests pass
- [ ] Storybook components render correctly in both themes

---

## Appendix: Token Quick Reference

### Border Radius
```typescript
baseTokens.borderRadius.none  // 0px
baseTokens.borderRadius.xs    // 4px
baseTokens.borderRadius.sm    // 6px
baseTokens.borderRadius.md    // 8px
baseTokens.borderRadius.lg    // 12px
baseTokens.borderRadius.xl    // 16px
baseTokens.borderRadius.full  // 9999px (pill)

semanticTokens.borders.radius.card   // md (8px)
semanticTokens.borders.radius.button // full
semanticTokens.borders.radius.input  // sm (6px)
semanticTokens.borders.radius.menu   // lg (12px)
```

### Font Sizes
```typescript
baseTokens.fontSize.xs    // 0.75rem (12px)
baseTokens.fontSize.sm    // 0.875rem (14px)
baseTokens.fontSize.base  // 1rem (16px)
baseTokens.fontSize.lg    // 1.125rem (18px)
baseTokens.fontSize.xl    // 1.25rem (20px)
```

### Spacing (Semantic)
```typescript
semanticTokens.inline.compact      // 12px
semanticTokens.inline.comfortable  // 16px
semanticTokens.inline.spacious     // 24px
semanticTokens.stack.compact       // 8px
semanticTokens.stack.comfortable   // 16px
semanticTokens.stack.spacious      // 24px
```

### Effects
```typescript
semanticTokens.effects.overlay.hover       // rgba(0,0,0,0.08)
semanticTokens.effects.overlay.pressed     // rgba(0,0,0,0.12)
semanticTokens.effects.onDark.subtle       // rgba(255,255,255,0.12)
semanticTokens.effects.onDark.medium       // rgba(255,255,255,0.24)
semanticTokens.effects.onDark.strong       // rgba(255,255,255,0.48)
```

---

## Next Steps

1. **Review this audit** with design team
2. **Decide on harmonization approach** (A, B, or C)
3. **Prioritize fixes** based on user-facing impact
4. **Add missing tokens** if needed (2xs font, prominent opacity)
5. **Implement changes** with visual regression testing
6. **Update documentation** and Storybook

---

*Document generated from automated audit of Trinity Design System v1.1.0*
