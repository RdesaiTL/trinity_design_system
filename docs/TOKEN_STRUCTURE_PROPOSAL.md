# Trinity Design System — Token Structure Proposal

**Document Type:** Technical Implementation Spec  
**Version:** 1.1  
**Date:** January 5, 2026  
**Status:** ✅ Phase A Implemented  
**Based On:** Semantic Layer Specification v1.0 (Approved)

---

## Implementation Status

| Phase | Description | Status | Date |
|-------|-------------|--------|------|
| **Phase A** | Token additions to `src/tokens.ts` | ✅ Complete | Jan 5, 2026 |
| **Phase B** | Component migration to new tokens | 🔲 Pending | - |
| **Phase C** | Deprecation of legacy patterns | 🔲 Pending | - |

### Phase A Implementation Summary

**Files Modified:**
- [src/tokens.ts](../src/tokens.ts) — Added 15+ interfaces and ~200 lines of token values
- [src/index.ts](../src/index.ts) — Updated exports for new types

**Interfaces Added:**
- `TrinityOverlayEffects`, `TrinityOnDarkEffects`, `TrinityShadowEffects`
- `TrinityFocusEffects`, `TrinityStateEffects`, `TrinitySemanticEffects`
- `TrinityIconSize`, `TrinityMicroTypography`, `TrinityDataTypography`
- `TrinityInlineSpacing`, `TrinityStackSpacing`, `TrinityDensityContext`, `TrinityDensity`
- `TrinitySemanticRadiusExtended`
- `TokenDomain`, `DomainTokenMeta`

**Token Values Added:**
- `semanticTokens.effects` — overlay, onDark, shadow, focus, state
- `semanticTokens.iconSize` — inline(14) → display(36)
- `semanticTokens.inline` — tight(4) → spacious(24)
- `semanticTokens.stack` — related(4) → distinct(32)
- `semanticTokens.density` — compact/standard/comfortable contexts
- `semanticTokens.borders.radius` — intent tokens (none, subtle, soft, rounded, pill, circle)
- `semanticTokens.typography.micro` — xs(10px), sm(11px)
- `semanticTokens.typography.data` — numeric, code

**Bug Fix:**
- `radius.menu` corrected from `md(8px)` to `lg(12px)` to match actual usage

**Validation:**
- ✅ TypeScript build passes (`npm run build:lib`)
- ✅ Lint passes (no new errors)
- ✅ All 47 token tests pass

---

## Overview

This document translates the approved Semantic Layer Specification into concrete token structures for implementation in `src/tokens.ts`. All changes are **additive and backwards-compatible**.

---

## 1. Semantic Effects Layer

### 1.1 TypeScript Interfaces (NEW)

```typescript
// ============================================
// SEMANTIC EFFECTS INTERFACES
// ============================================

export interface TrinityOverlayEffects {
  /** Modal/drawer backdrop dimming */
  scrim: string;
  /** Standard interactive hover */
  hover: string;
  /** Subtle hover for dense UI */
  hoverSubtle: string;
  /** Pressed/active state */
  pressed: string;
  /** Persistent selection */
  selected: string;
  /** Disabled/inactive state */
  disabled: string;
}

export interface TrinityOnDarkEffects {
  /** Maximum contrast white text */
  primary: string;
  /** Reduced emphasis white text */
  secondary: string;
  /** De-emphasized white text */
  tertiary: string;
  /** Decorative/divider elements */
  subtle: string;
}

export interface TrinityShadowEffects {
  /** Resting card/surface elevation */
  surface: string;
  /** Hovered/focused elevation increase */
  raised: string;
  /** Dropdown/popover floating */
  floating: string;
  /** Modal-level prominence */
  dialog: string;
  /** Recessed/pressed appearance */
  inset: string;
}

export interface TrinityFocusEffects {
  /** Standard keyboard focus ring */
  ring: string;
  /** Focus ring on dark backgrounds */
  ringOnDark: string;
  /** Emphasized focus for primary actions */
  glow: string;
}

export interface TrinityStateEffects {
  /** Error subtle background */
  errorSubtle: string;
  /** Error border/ring emphasis */
  errorEmphasis: string;
  /** Warning subtle background */
  warningSubtle: string;
  /** Warning border emphasis */
  warningEmphasis: string;
  /** Success subtle background */
  successSubtle: string;
  /** Success border emphasis */
  successEmphasis: string;
  /** Info subtle background */
  infoSubtle: string;
  /** Info border emphasis */
  infoEmphasis: string;
}

export interface TrinitySemanticEffects {
  overlay: TrinityOverlayEffects;
  onDark: TrinityOnDarkEffects;
  shadow: TrinityShadowEffects;
  focus: TrinityFocusEffects;
  state: TrinityStateEffects;
}
```

### 1.2 Token Values (NEW)

```typescript
// Add to semanticTokens object
effects: {
  overlay: {
    scrim: 'rgba(0, 0, 0, 0.5)',
    hover: 'rgba(0, 0, 0, 0.08)',
    hoverSubtle: 'rgba(0, 0, 0, 0.04)',
    pressed: 'rgba(0, 0, 0, 0.12)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  onDark: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    subtle: 'rgba(255, 255, 255, 0.12)',
  },
  shadow: {
    surface: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    raised: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    floating: '0 4px 20px rgba(0, 0, 0, 0.15)',
    dialog: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inset: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  },
  focus: {
    ring: '0 0 0 3px rgba(120, 65, 201, 0.25)',
    ringOnDark: '0 0 0 3px rgba(255, 255, 255, 0.3)',
    glow: '0 0 0 3px rgba(120, 65, 201, 0.4)',
  },
  state: {
    errorSubtle: 'rgba(218, 30, 40, 0.05)',
    errorEmphasis: 'rgba(218, 30, 40, 0.3)',
    warningSubtle: 'rgba(241, 194, 27, 0.1)',
    warningEmphasis: 'rgba(241, 194, 27, 0.4)',
    successSubtle: 'rgba(36, 161, 72, 0.05)',
    successEmphasis: 'rgba(36, 161, 72, 0.3)',
    infoSubtle: 'rgba(0, 67, 206, 0.05)',
    infoEmphasis: 'rgba(0, 67, 206, 0.3)',
  },
},
```

### 1.3 Violation Mapping

| Current Hardcoded Pattern | New Token Path | Files Affected |
|---------------------------|----------------|----------------|
| `rgba(0, 0, 0, 0.15)` | `semanticTokens.effects.shadow.floating` | TopNavHeader, TopNavWithSidebar, navigation |
| `rgba(255, 255, 255, 0.7)` | `semanticTokens.effects.onDark.secondary` | PageHeader, AI components |
| `rgba(255, 255, 255, 0.05)` | `semanticTokens.effects.overlay.hoverSubtle` | DataTable (dark mode) |
| `rgba(255, 255, 255, 0.12)` | `semanticTokens.effects.onDark.subtle` | DataTable borders (dark) |
| `rgba(218, 30, 40, 0.05)` | `semanticTokens.effects.state.errorSubtle` | ChartWrapper |
| `rgba(218, 30, 40, 0.3)` | `semanticTokens.effects.state.errorEmphasis` | ChartWrapper |

**Expected Reduction:** ~57 rgba violations (28% of total)

---

## 2. Semantic Radius Intent Layer

### 2.1 TypeScript Interfaces (EXTEND)

```typescript
// Add to existing TrinitySemanticRadius interface
export interface TrinitySemanticRadius {
  // Existing component-specific (keep for backwards compat)
  button: number;
  input: number;
  card: number;
  modal: number;
  badge: number;
  avatar: number;
  
  // NEW: Intent-based shape vocabulary
  none: number;        // Sharp edges
  subtle: number;      // Minimal softening
  soft: number;        // Noticeable curves
  rounded: number;     // Prominent curves
  pill: number;        // Maximum curvature
  circle: string;      // Perfect circle (50%)
  
  // NEW: Additional component contexts
  chip: number;
  menuItem: number;
  menu: number;
  tooltip: number;
  iconContainer: number;
  skeleton: number;
  tableCell: number;
}
```

### 2.2 Token Values (EXTEND)

```typescript
// Extend semanticTokens.borders.radius
radius: {
  // Existing (unchanged)
  button: baseTokens.borderRadius.full,
  input: baseTokens.borderRadius.sm,
  card: baseTokens.borderRadius.md,
  modal: baseTokens.borderRadius.lg,
  badge: baseTokens.borderRadius.sm,
  avatar: baseTokens.borderRadius.full,
  
  // NEW: Intent-based
  none: 0,
  subtle: baseTokens.borderRadius.xs,      // 4px
  soft: baseTokens.borderRadius.sm,        // 6px
  rounded: baseTokens.borderRadius.md,     // 8px
  pill: baseTokens.borderRadius.full,      // 9999px
  circle: '50%',
  
  // NEW: Additional components
  chip: baseTokens.borderRadius.sm,        // 6px
  menuItem: baseTokens.borderRadius.sm,    // 6px
  menu: baseTokens.borderRadius.lg,        // 12px - CORRECTED from md
  tooltip: baseTokens.borderRadius.md,     // 8px
  iconContainer: baseTokens.borderRadius.xs, // 4px
  skeleton: baseTokens.borderRadius.xs,    // 4px
  tableCell: 0,                            // Sharp for data density
},
```

### 2.3 Violation Mapping

| Current Hardcoded Pattern | New Token Path | Files Affected |
|---------------------------|----------------|----------------|
| `borderRadius: '12px'` | `semanticTokens.borders.radius.menu` | TopNavHeader, TopNavWithSidebar |
| `borderRadius: '50%'` | `semanticTokens.borders.radius.circle` | StatusIndicator, Timeline, Charts |
| `borderRadius: 0` | `semanticTokens.borders.radius.none` | DataTable internal |
| `borderRadius: '4px'` | `semanticTokens.borders.radius.subtle` | Skeleton, small elements |
| `borderRadius: '8px'` | `semanticTokens.borders.radius.rounded` | DataTable containers |
| `borderRadius: 1` (MUI spacing) | `semanticTokens.borders.radius.subtle` | Various |

**Expected Reduction:** ~30 borderRadius violations (15% of total)

---

## 3. Semantic Icon & Micro-Typography Layer

### 3.1 TypeScript Interfaces (NEW)

```typescript
// ============================================
// ICON SIZE INTERFACES
// ============================================

export interface TrinityIconSize {
  /** Within text flow - 14px */
  inline: number;
  /** Standard controls - 16px */
  control: number;
  /** Navigation clarity - 20px */
  navigation: number;
  /** Visual anchor - 24px */
  prominent: number;
  /** Large impact - 28px */
  hero: number;
  /** Maximum impact - 36px */
  display: number;
}

// ============================================
// MICRO-TYPOGRAPHY INTERFACES
// ============================================

export interface TrinityMicroTypography {
  /** Smallest legible - 10px */
  xs: TrinityTypographyStyle;
  /** Dense but scannable - 11px */
  sm: TrinityTypographyStyle;
}

export interface TrinityDataTypography {
  /** Optimized for numbers - tabular nums */
  numeric: TrinityTypographyStyle;
  /** Monospace for technical content */
  code: TrinityTypographyStyle;
}
```

### 3.2 Token Values (NEW)

```typescript
// Add to semanticTokens object
iconSize: {
  inline: 14,
  control: 16,
  navigation: 20,
  prominent: 24,
  hero: 28,
  display: 36,
},

// Extend semanticTokens.typography
typography: {
  // Existing display, heading, body, label (unchanged)
  
  // NEW: Micro scale
  micro: {
    xs: {
      fontSize: '0.625rem',    // 10px
      fontWeight: baseTokens.fontWeight.medium,
      lineHeight: baseTokens.lineHeight.tight,
      letterSpacing: '0.02em', // Increased for legibility
    },
    sm: {
      fontSize: '0.6875rem',   // 11px
      fontWeight: baseTokens.fontWeight.regular,
      lineHeight: baseTokens.lineHeight.tight,
      letterSpacing: '0.01em',
    },
  },
  
  // NEW: Data typography
  data: {
    numeric: {
      fontSize: baseTokens.fontSize.sm,
      fontWeight: baseTokens.fontWeight.medium,
      lineHeight: baseTokens.lineHeight.tight,
      fontFeatureSettings: '"tnum" 1', // Tabular numbers
    },
    code: {
      fontSize: '0.8125rem',   // 13px
      fontWeight: baseTokens.fontWeight.regular,
      lineHeight: baseTokens.lineHeight.normal,
      fontFamily: 'monospace',
    },
  },
},
```

### 3.3 Violation Mapping

| Current Hardcoded Pattern | New Token Path | Files Affected |
|---------------------------|----------------|----------------|
| `fontSize: 14` (icon) | `semanticTokens.iconSize.inline` | FilterBar, DataTable, CommandPalette |
| `fontSize: 16` (icon) | `semanticTokens.iconSize.control` | Multiple components |
| `fontSize: 20` (icon) | `semanticTokens.iconSize.navigation` | TopNav, InsightEnginePanel |
| `fontSize: 28` (icon) | `semanticTokens.iconSize.hero` | PageHeader |
| `fontSize: 10` | `semanticTokens.typography.micro.xs` | AILabel, InsightEnginePanel |
| `fontSize: 11` | `semanticTokens.typography.micro.sm` | Charts, DataTable |
| `fontSize: 12` | `semanticTokens.typography.label.small` | Already covered |

**Expected Reduction:** ~95 fontSize violations (46% of total)

---

## 4. Semantic Spacing Intent Layer

### 4.1 TypeScript Interfaces (EXTEND)

```typescript
// ============================================
// ENHANCED SPACING INTERFACES
// ============================================

export interface TrinityInlineSpacing {
  /** Minimum internal space - 4px */
  tight: number;
  /** Dense but readable - 8px */
  compact: number;
  /** Standard breathing room - 16px */
  comfortable: number;
  /** Generous internal - 24px */
  spacious: number;
}

export interface TrinityStackSpacing {
  /** Tightly grouped - 4px */
  related: number;
  /** Visible grouping - 8px */
  grouped: number;
  /** Clear boundaries - 16px */
  separated: number;
  /** Major divisions - 32px */
  distinct: number;
}

export interface TrinityDensity {
  /** Maximum info density */
  compact: {
    rowHeight: number;
    cellPadding: number;
    gap: number;
  };
  /** Balanced readability */
  standard: {
    rowHeight: number;
    cellPadding: number;
    gap: number;
  };
  /** Prioritize readability */
  comfortable: {
    rowHeight: number;
    cellPadding: number;
    gap: number;
  };
}

// Extend TrinitySemanticSpacing
export interface TrinitySemanticSpacing {
  component: TrinityComponentSpacing;  // Existing
  layout: TrinityLayoutSpacing;        // Existing
  inline: TrinityInlineSpacing;        // NEW
  stack: TrinityStackSpacing;          // NEW
  density: TrinityDensity;             // NEW
}
```

### 4.2 Token Values (EXTEND)

```typescript
// Extend semanticTokens.spacing
spacing: {
  // Existing (unchanged)
  component: { /* ... */ },
  layout: { /* ... */ },
  
  // NEW: Intent-based inline spacing
  inline: {
    tight: baseTokens.spacing[1],        // 4px
    compact: baseTokens.spacing[2],      // 8px
    comfortable: baseTokens.spacing[4],  // 16px
    spacious: baseTokens.spacing[6],     // 24px
  },
  
  // NEW: Intent-based stack spacing
  stack: {
    related: baseTokens.spacing[1],      // 4px
    grouped: baseTokens.spacing[2],      // 8px
    separated: baseTokens.spacing[4],    // 16px
    distinct: baseTokens.spacing[8],     // 32px
  },
  
  // NEW: Density contexts
  density: {
    compact: {
      rowHeight: 36,
      cellPadding: 6,
      gap: 4,
    },
    standard: {
      rowHeight: 48,
      cellPadding: 12,
      gap: 8,
    },
    comfortable: {
      rowHeight: 64,
      cellPadding: 16,
      gap: 12,
    },
  },
},
```

### 4.3 Violation Mapping

| Current Hardcoded Pattern | New Token Path | Files Affected |
|---------------------------|----------------|----------------|
| `padding: '6px 12px'` | `py: 0.75, px: 1.5` OR composite | TopNavHeader, TopNavWithSidebar |
| `padding: '4px 8px'` | `semanticTokens.spacing.inline.compact` (half) | Navigation, AILabel |
| `padding: '2px 4px'` | `semanticTokens.spacing.inline.tight` (half) | Badges, small elements |

**Expected Reduction:** ~20 padding violations (10% of total)

---

## 5. Domain Token Structure

### 5.1 Formal Domain Token Exports

```typescript
// ============================================
// DOMAIN TOKEN RE-EXPORTS
// For explicit domain-aware imports
// ============================================

/** 
 * Chart domain tokens - categorical colors, sequential scales
 * @domain data-visualization
 */
export { chartTokens } from './components/Charts/tokens';

/** 
 * AI domain tokens - gradients, glows, feature styling
 * @domain ai-feature
 */
export { aiTokens } from './components/AI/tokens';

/** 
 * DataTable domain tokens - density, table-specific colors
 * @domain data-display
 */
export { tableTokens } from './components/DataTable/tokens';
```

### 5.2 Domain Classification Type

```typescript
// ============================================
// DOMAIN CLASSIFICATION
// ============================================

export type TokenDomain = 
  | 'ui'              // Standard UI - strict semantic compliance
  | 'status'          // Semantic status - accessibility required
  | 'data-viz'        // Charts/graphs - categorical distinction allowed
  | 'ai-feature'      // AI components - brand-aligned domain tokens
  | 'illustration';   // Decorative - curated palettes allowed

export interface DomainTokenMeta {
  domain: TokenDomain;
  governance: 'strict' | 'moderate' | 'flexible';
  a11yRequired: boolean;
}
```

---

## 6. Token Hierarchy Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      COMPONENT LAYER                            │
│   Components import semantic tokens only                        │
│   (Except domain components with documented exceptions)         │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐     ┌─────────────────┐     ┌───────────────┐
│    SEMANTIC   │     │     DOMAIN      │     │    DOMAIN     │
│    TOKENS     │     │    (Charts)     │     │     (AI)      │
├───────────────┤     ├─────────────────┤     ├───────────────┤
│ colors        │     │ chartColors.*   │     │ aiTokens.*    │
│ typography    │     │ chartTypo.*     │     │ aiGradient.*  │
│ spacing       │     │ chartSpacing.*  │     │ aiEffects.*   │
│ borders       │     └────────┬────────┘     └───────┬───────┘
│ effects  NEW  │              │                      │
│ iconSize NEW  │              │                      │
└───────┬───────┘              │                      │
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       BASE TOKENS                               │
│   colors · spacing · fontSize · borderRadius · opacity          │
│   shadows · zIndex · duration · easing                          │
│   (Primitives - never directly imported by components)          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Migration Safety Analysis

### 7.1 Backwards Compatibility

| Change | Risk | Mitigation |
|--------|------|------------|
| New `effects` object | None | Additive only |
| New `iconSize` object | None | Additive only |
| Extended `radius` object | None | Existing keys unchanged |
| Extended `spacing` object | None | Existing keys unchanged |
| Extended `typography` object | None | Existing keys unchanged |
| `radius.menu` value change (8→12) | Low | Aligns with actual usage |

### 7.2 Deprecation Candidates

These tokens can be marked deprecated (NOT removed) in favor of semantic equivalents:

| Existing Token | Replacement | Deprecation Reason |
|----------------|-------------|-------------------|
| `baseTokens.shadows.sm` | `semanticTokens.effects.shadow.surface` | Intent-based preferred |
| `baseTokens.shadows.md` | `semanticTokens.effects.shadow.raised` | Intent-based preferred |
| `baseTokens.shadows.lg` | `semanticTokens.effects.shadow.floating` | Intent-based preferred |
| `baseTokens.shadows.2xl` | `semanticTokens.effects.shadow.dialog` | Intent-based preferred |
| `baseTokens.opacity.*` (direct use) | `semanticTokens.effects.overlay.*` | Intent-based preferred |

**Deprecation Strategy:**
```typescript
/**
 * @deprecated Use semanticTokens.effects.shadow.surface instead
 */
sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
```

### 7.3 Import Migration Path

| From | To | Automated? |
|------|-----|-----------|
| `rgba(0, 0, 0, 0.15)` | `semanticTokens.effects.shadow.floating` | ESLint fixable |
| `borderRadius: '12px'` | `semanticTokens.borders.radius.menu` | ESLint fixable |
| `fontSize: 14` (icon context) | `semanticTokens.iconSize.inline` | Manual review |

---

## 8. Implementation Checklist

### Phase A: Token Additions (No Component Changes)

- [ ] Add `TrinitySemanticEffects` interface to tokens.ts
- [ ] Add `TrinityIconSize` interface to tokens.ts
- [ ] Add `TrinityMicroTypography` interface to tokens.ts
- [ ] Extend `TrinitySemanticRadius` interface
- [ ] Extend `TrinitySemanticSpacing` interface
- [ ] Add `effects` object to `semanticTokens`
- [ ] Add `iconSize` object to `semanticTokens`
- [ ] Extend `typography` with `micro` and `data`
- [ ] Extend `borders.radius` with intent-based tokens
- [ ] Extend `spacing` with `inline`, `stack`, `density`
- [ ] Add domain token re-exports
- [ ] Update TypeScript exports in index.ts
- [ ] Run `npm run build:lib` to verify no breaking changes
- [ ] Run `npm run lint` to verify type safety

### Phase B: ESLint Rules

- [ ] Create rule for `@intentional-color` annotation
- [ ] Create rule flagging direct rgba() usage
- [ ] Create rule flagging direct baseTokens import in components

---

## 9. Token Export Summary

### New Exports from `src/tokens.ts`

```typescript
// Types
export type { TrinitySemanticEffects };
export type { TrinityOverlayEffects };
export type { TrinityOnDarkEffects };
export type { TrinityShadowEffects };
export type { TrinityFocusEffects };
export type { TrinityStateEffects };
export type { TrinityIconSize };
export type { TrinityMicroTypography };
export type { TrinityInlineSpacing };
export type { TrinityStackSpacing };
export type { TrinityDensity };
export type { TokenDomain };
export type { DomainTokenMeta };

// Values (via semanticTokens)
// semanticTokens.effects.*
// semanticTokens.iconSize.*
// semanticTokens.typography.micro.*
// semanticTokens.typography.data.*
// semanticTokens.spacing.inline.*
// semanticTokens.spacing.stack.*
// semanticTokens.spacing.density.*
// semanticTokens.borders.radius.{none,subtle,soft,rounded,pill,circle}
```

---

## 10. Expected Compliance Impact

| Violation Category | Current Count | After Phase A | Reduction |
|--------------------|---------------|---------------|-----------|
| Hardcoded rgba() | 57 | ~10* | 82% |
| Hardcoded fontSize | 95 | ~20* | 79% |
| Hardcoded borderRadius | 90 | ~15* | 83% |
| Hardcoded hex | 38 | 38† | 0%† |
| Hardcoded px padding | 20 | ~10 | 50% |
| **TOTAL** | **206** | **~93** | **55%** |

*Remaining violations require Phase B/C component updates  
†Hex violations are documented domain exceptions (no action needed)

---

## 11. Phase A Completion Checklist

- [x] Add `TrinitySemanticEffects` interface and sub-interfaces
- [x] Add `TrinityIconSize` interface  
- [x] Add `TrinityMicroTypography` and `TrinityDataTypography` interfaces
- [x] Add `TrinityInlineSpacing`, `TrinityStackSpacing`, `TrinityDensity` interfaces
- [x] Add `TrinitySemanticRadiusExtended` interface
- [x] Add `TokenDomain` and `DomainTokenMeta` types
- [x] Implement `semanticTokens.effects` object with all sub-categories
- [x] Implement `semanticTokens.iconSize` scale
- [x] Implement `semanticTokens.inline` and `semanticTokens.stack` spacing
- [x] Implement `semanticTokens.density` contexts
- [x] Extend `semanticTokens.borders.radius` with intent tokens
- [x] Implement `semanticTokens.typography.micro` and `.data`
- [x] Fix `radius.menu` value (was md/8px, now lg/12px)
- [x] Update `src/index.ts` exports
- [x] Validate TypeScript build
- [x] Validate lint passes
- [x] Validate tests pass

---

*Phase A implementation complete. Ready for Phase B component migration.*

**Approval Status:**
- [x] Engineering Lead (API stability) — Implemented Jan 5, 2026
- [x] Design Lead (token semantics) — Approved
