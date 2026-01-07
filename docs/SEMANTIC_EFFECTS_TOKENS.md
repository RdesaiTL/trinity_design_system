# Semantic Effects Token Definitions

## Overview

This document defines the **semantic effects token layer** needed to eliminate hardcoded rgba, opacity, and shadow values in the Trinity Design System. These tokens bridge the gap between the existing `baseTokens.opacity` values and actual UI use cases.

**Status:** Definition only - NO CODE CHANGES until approved  
**Phase:** Part of Semantic Token Compliance Audit

---

## Current State Analysis

### Existing Token Layers

| Layer | Purpose | Example |
|-------|---------|---------|
| `baseTokens.opacity` | Raw decimal values | `0.1`, `0.25`, `0.5` |
| `baseTokens.shadows` | Size-based shadows | `sm`, `md`, `lg`, `xl` |
| `semanticTokens.shadows` | Component shadows | `card`, `dropdown`, `modal` |

### Gap Identified

**57 rgba patterns** are hardcoded across components because there's no semantic layer for:
- Overlay states (hover backgrounds, focus rings)
- Alpha channel variations (dark mode adaptations)
- Component-specific opacity effects

---

## Proposed Semantic Effects Structure

### Interface Definition

```typescript
// Add to src/tokens.ts interfaces

export interface TrinitySemanticEffects {
  overlay: TrinityOverlayEffects;
  shadow: TrinityShadowEffects;
  focus: TrinityFocusEffects;
  state: TrinityStateEffects;
  ai: TrinityAIEffects;
}

export interface TrinityOverlayEffects {
  /** Dark overlay for modals/backdrops - rgba(0,0,0,0.5) */
  scrim: string;
  /** Very light hover background - rgba(0,0,0,0.04) */
  hoverSubtle: string;
  /** Standard hover background - rgba(0,0,0,0.08) */
  hover: string;
  /** Pressed/active background - rgba(0,0,0,0.12) */
  pressed: string;
  /** White text overlay on dark - rgba(255,255,255,0.7) */
  textOnDark: string;
  /** White on dark - muted - rgba(255,255,255,0.5) */
  textOnDarkMuted: string;
  /** White on dark - very muted - rgba(255,255,255,0.2) */
  textOnDarkSubtle: string;
  /** Dark mode surface hover - rgba(255,255,255,0.05) */
  darkHover: string;
  /** Dark mode borders - rgba(255,255,255,0.12) */
  darkBorder: string;
}

export interface TrinityShadowEffects {
  /** Navigation dropdown shadow */
  dropdown: string;
  /** Elevated card/container shadow */
  elevated: string;
  /** Tooltip/popover shadow */
  tooltip: string;
  /** Chart element shadow */
  chart: string;
  /** Pressed/inset shadow */
  inset: string;
}

export interface TrinityFocusEffects {
  /** Standard focus ring - primary color */
  ring: string;
  /** Focus ring on dark backgrounds */
  ringOnDark: string;
  /** Input focus glow */
  inputGlow: string;
}

export interface TrinityStateEffects {
  /** Error state subtle background - rgba(218,30,40,0.05) */
  errorSubtle: string;
  /** Error state border - rgba(218,30,40,0.3) */
  errorBorder: string;
  /** Success state subtle background */
  successSubtle: string;
  /** Success state border */
  successBorder: string;
  /** Warning state subtle background */
  warningSubtle: string;
  /** Warning state border */
  warningBorder: string;
}

export interface TrinityAIEffects {
  /** AI feature background (light) - rgba(120,65,201,0.05) */
  background: string;
  /** AI feature background (dark) - rgba(120,65,201,0.15) */
  backgroundDark: string;
  /** AI border (light) - rgba(120,65,201,0.2) */
  border: string;
  /** AI border (dark) - rgba(120,65,201,0.3) */
  borderDark: string;
  /** AI pulse animation shadow */
  glow: string;
  /** AI input focus ring */
  inputGlow: string;
  /** AI badge background */
  badge: string;
  /** AI gradient subtle background */
  gradientSubtle: string;
}
```

---

## Token Values Mapping

### Overlay Effects

| Token | Value | Current Usage (files) |
|-------|-------|----------------------|
| `overlay.scrim` | `rgba(0, 0, 0, 0.5)` | Modal backdrops |
| `overlay.hoverSubtle` | `rgba(0, 0, 0, 0.04)` | BarChart cursor |
| `overlay.hover` | `rgba(0, 0, 0, 0.08)` | Table row hover |
| `overlay.pressed` | `rgba(0, 0, 0, 0.12)` | Active states |
| `overlay.textOnDark` | `rgba(255, 255, 255, 0.7)` | Hero text |
| `overlay.textOnDarkMuted` | `rgba(255, 255, 255, 0.5)` | Breadcrumb dividers |
| `overlay.textOnDarkSubtle` | `rgba(255, 255, 255, 0.2)` | AI backgrounds |
| `overlay.darkHover` | `rgba(255, 255, 255, 0.05)` | Dark mode row hover |
| `overlay.darkBorder` | `rgba(255, 255, 255, 0.12)` | Dark mode dividers |

### Shadow Effects

| Token | Value | Current Usage |
|-------|-------|--------------|
| `shadow.dropdown` | `0 4px 20px rgba(0, 0, 0, 0.15)` | TopNavHeader, menus |
| `shadow.elevated` | `0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)` | DataTable elevated |
| `shadow.tooltip` | `0 4px 12px rgba(0, 0, 0, 0.1)` | Charts, tooltips |
| `shadow.chart` | `drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))` | PieChart filter |
| `shadow.inset` | `inset 0 2px 4px rgba(0, 0, 0, 0.05)` | Pressed buttons |

### Focus Effects

| Token | Value | Current Usage |
|-------|-------|--------------|
| `focus.ring` | `0 0 0 3px rgba(120, 65, 201, 0.25)` | Standard focus |
| `focus.ringOnDark` | `0 0 0 3px rgba(255, 255, 255, 0.3)` | Focus on dark bg |
| `focus.inputGlow` | `0 0 0 3px rgba(120, 65, 201, 0.15)` | Input focus |

### State Effects

| Token | Value | Current Usage |
|-------|-------|--------------|
| `state.errorSubtle` | `rgba(218, 30, 40, 0.05)` | ChartWrapper error |
| `state.errorBorder` | `rgba(218, 30, 40, 0.3)` | Error dashed border |
| `state.successSubtle` | `rgba(36, 161, 72, 0.05)` | Success background |
| `state.successBorder` | `rgba(36, 161, 72, 0.3)` | Success border |
| `state.warningSubtle` | `rgba(255, 138, 0, 0.05)` | Warning background |
| `state.warningBorder` | `rgba(255, 138, 0, 0.3)` | Warning border |

### AI Effects

| Token | Value | Current Usage |
|-------|-------|--------------|
| `ai.background` | `rgba(120, 65, 201, 0.05)` | AI component bg |
| `ai.backgroundDark` | `rgba(120, 65, 201, 0.15)` | Dark mode AI bg |
| `ai.border` | `rgba(120, 65, 201, 0.2)` | AI component border |
| `ai.borderDark` | `rgba(120, 65, 201, 0.3)` | Dark mode AI border |
| `ai.glow` | `0 0 20px rgba(255, 97, 80, 0.3), 0 0 40px rgba(120, 65, 201, 0.2)` | Animated glow |
| `ai.inputGlow` | `0 0 0 3px rgba(120, 65, 201, 0.15)` | AI input focus |
| `ai.badge` | `rgba(120, 65, 201, 0.15)` | AI source badge |
| `ai.gradientSubtle` | `linear-gradient(180deg, rgba(120, 65, 201, 0.03) 0%, rgba(120, 65, 201, 0.06) 100%)` | Subtle gradient |

---

## Implementation Blueprint

### Phase 1: Add Interfaces (tokens.ts)

Add the interface definitions above to the existing interface section (~line 310).

### Phase 2: Add Implementation

```typescript
// Add to semanticTokens object (~line 1207)
effects: {
  overlay: {
    scrim: 'rgba(0, 0, 0, 0.5)',
    hoverSubtle: 'rgba(0, 0, 0, 0.04)',
    hover: 'rgba(0, 0, 0, 0.08)',
    pressed: 'rgba(0, 0, 0, 0.12)',
    textOnDark: 'rgba(255, 255, 255, 0.7)',
    textOnDarkMuted: 'rgba(255, 255, 255, 0.5)',
    textOnDarkSubtle: 'rgba(255, 255, 255, 0.2)',
    darkHover: 'rgba(255, 255, 255, 0.05)',
    darkBorder: 'rgba(255, 255, 255, 0.12)',
  },
  shadow: {
    dropdown: '0 4px 20px rgba(0, 0, 0, 0.15)',
    elevated: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    tooltip: '0 4px 12px rgba(0, 0, 0, 0.1)',
    chart: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
    inset: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  focus: {
    ring: `0 0 0 3px rgba(120, 65, 201, 0.25)`,
    ringOnDark: '0 0 0 3px rgba(255, 255, 255, 0.3)',
    inputGlow: `0 0 0 3px rgba(120, 65, 201, 0.15)`,
  },
  state: {
    errorSubtle: 'rgba(218, 30, 40, 0.05)',
    errorBorder: 'rgba(218, 30, 40, 0.3)',
    successSubtle: 'rgba(36, 161, 72, 0.05)',
    successBorder: 'rgba(36, 161, 72, 0.3)',
    warningSubtle: 'rgba(255, 138, 0, 0.05)',
    warningBorder: 'rgba(255, 138, 0, 0.3)',
  },
  ai: {
    background: 'rgba(120, 65, 201, 0.05)',
    backgroundDark: 'rgba(120, 65, 201, 0.15)',
    border: 'rgba(120, 65, 201, 0.2)',
    borderDark: 'rgba(120, 65, 201, 0.3)',
    glow: '0 0 20px rgba(255, 97, 80, 0.3), 0 0 40px rgba(120, 65, 201, 0.2)',
    inputGlow: '0 0 0 3px rgba(120, 65, 201, 0.15)',
    badge: 'rgba(120, 65, 201, 0.15)',
    gradientSubtle: 'linear-gradient(180deg, rgba(120, 65, 201, 0.03) 0%, rgba(120, 65, 201, 0.06) 100%)',
  },
},
```

### Phase 3: Update Component Token Files

Update the existing component token files to use these semantic effects:

| File | Changes |
|------|---------|
| `src/components/AI/tokens.ts` | Replace hardcoded rgba with `semanticTokens.effects.ai.*` |
| `src/components/DataTable/tokens.ts` | Replace shadows with `semanticTokens.effects.shadow.*` |
| `src/components/Charts/tokens.ts` | Replace overlay/shadow with `semanticTokens.effects.*` |

### Phase 4: Update Components

Replace all hardcoded rgba usage with semantic token references:

```tsx
// Before
boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)'

// After  
boxShadow: semanticTokens.effects.shadow.dropdown
```

---

## Migration Priority

### Tier 1: High Impact (used in 5+ places)
1. `shadow.dropdown` - 10 occurrences  
2. `overlay.textOnDark` - 8 occurrences
3. `ai.background/border` - 6 occurrences each

### Tier 2: Medium Impact (2-4 places)
4. `overlay.darkHover` - 4 occurrences
5. `shadow.tooltip` - 3 occurrences
6. `ai.glow` - 3 occurrences

### Tier 3: Low Impact (1 place, still needs token)
7. `state.errorSubtle/Border` - 2 occurrences
8. `overlay.hoverSubtle` - 1 occurrence

---

## Color Base References

For traceability, these are the base colors used in the effects:

| Color | Hex | Usage |
|-------|-----|-------|
| Black | `#000000` | Shadows, overlays |
| White | `#FFFFFF` | Light overlays, dark mode text |
| Purple (Primary) | `#7841C9` | AI effects, focus rings |
| Coral (Accent) | `#FF6150` | AI glow accent |
| Error Red | `#DA1E28` | Error states |
| Success Green | `#24A148` | Success states |
| Warning Orange | `#FF8A00` | Warning states |

---

## Validation Checklist

Before implementation, verify:

- [ ] All 57 rgba patterns are covered by proposed tokens
- [ ] No visual regression from token substitution
- [ ] Dark mode variants properly paired with light variants
- [ ] TypeScript interfaces complete and exported
- [ ] ESLint rules updated to flag raw rgba usage

---

## Appendix: Raw rgba Inventory

### From Components (57 occurrences)

```
10 rgba(0, 0, 0, 0.15)        - dropdown/nav shadows
 5 rgba(0, 0, 0, 0.1)         - subtle shadows
 4 rgba(255,255,255,0.7)      - hero text overlay
 3 rgba(255, 255, 255, 0.2)   - white overlays
 3 rgba(120, 65, 201, 0.3)    - AI border dark
 3 rgba(120, 65, 201, 0.2)    - AI border light
 3 rgba(120, 65, 201, 0.15)   - AI badge bg
 3 rgba(120, 65, 201, 0.05)   - AI background
 2 rgba(255, 255, 255, 0.8)   - hero text emphasis
 2 rgba(255, 255, 255, 0.12)  - dark mode border
 2 rgba(255, 255, 255, 0.1)   - dark mode subtle
 2 rgba(255, 255, 255, 0.05)  - dark mode hover
 2 rgba(0, 0, 0, 0.12)        - pressed states
 2 rgba(0, 0, 0, 0.08)        - shadows
 2 rgba(0, 0, 0, 0.06)        - multi-shadow parts
 1 rgba(255, 255, 255, 0.9)   - maximum white overlay
 1 rgba(255, 255, 255, 0.5)   - breadcrumb divider
 1 rgba(218, 30, 40, 0.3)     - error border
 1 rgba(218, 30, 40, 0.05)    - error background
 1 rgba(120, 65, 201, 0.4)    - AI pulse max
 1 rgba(120, 65, 201, 0.25)   - AI badge dark
 1 rgba(120, 65, 201, 0.08)   - AI gradient end
 1 rgba(120, 65, 201, 0.06)   - AI gradient subtle
 1 rgba(120, 65, 201, 0.03)   - AI gradient start
 1 rgba(0, 0, 0, 0.05)        - chart grid/inner
 1 rgba(0, 0, 0, 0.04)        - cursor hover
```

---

*Document created: 2025-01-XX*  
*Last updated: 2025-01-XX*  
*Author: Trinity Design System Team*
