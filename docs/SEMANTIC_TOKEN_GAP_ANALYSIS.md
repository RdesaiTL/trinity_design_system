# Trinity Design System - Semantic Token Gap Analysis

**Document Type:** Token Architecture  
**Author:** Design System Token Architect  
**Date:** January 5, 2026  
**Status:** Recommendation

---

## Executive Summary

Wrapper components override MUI defaults because semantic tokens don't cover all real-world use cases. This document identifies gaps and proposes additive token changes to eliminate ad-hoc styling.

---

## Gap Analysis by Category

### 1. Typography: Micro Sizes

**Current State:**
```typescript
// baseTokens.fontSize
xs: '0.75rem',   // 12px - smallest available
sm: '0.875rem',  // 14px
base: '1rem',    // 16px

// semanticTokens.typography.micro (exists but incomplete)
micro.xs: '0.625rem',  // 10px ✓
micro.sm: '0.6875rem', // 11px ✓
```

**Gaps Found in Wrappers:**

| Hardcoded Value | File | Use Case |
|-----------------|------|----------|
| `'0.8125rem'` (13px) | AILabel.tsx | Between-size labels |
| `'0.9375rem'` (15px) | AIChat.tsx | Chat message body |
| `'0.7rem'` (11.2px) | StatusIndicator/Badge.tsx | Badge counts |
| `'14px'`, `'11px'` | InsightEnginePanel.tsx | Dense panel text |

**Root Cause:** 
- `micro` tokens exist but aren't exposed for general use
- No intermediate sizes between `xs` (12px) and `sm` (14px)
- Wrappers invent sizes to achieve density

**Approved Tokens:**

```typescript
semanticTokens.typography.dense: {
  /** For badge counts, status dots - 10px */
  badge: '0.625rem',
  
  /** For metadata, timestamps, dense tables - 12px */
  text: '0.75rem',
}
```

**Decision:** Consolidated to 2 tokens (10px for badges, 12px for all other dense text) for consistency.

---

### 2. Effects: On-Dark Opacity Scale

**Current State:**
```typescript
semanticTokens.effects.onDark: {
  primary: 'rgba(255, 255, 255, 0.87)',   // High emphasis
  secondary: 'rgba(255, 255, 255, 0.7)',  // Medium emphasis
  tertiary: 'rgba(255, 255, 255, 0.5)',   // Low emphasis
  subtle: 'rgba(255, 255, 255, 0.12)',    // Borders/dividers
}
```

**Gaps Found in Wrappers:**

| Hardcoded Value | File | Use Case |
|-----------------|------|----------|
| `rgba(255,255,255,0.1)` | PageHeader.tsx | Hero background tints |
| `rgba(255,255,255,0.8)` | PageHeader.tsx, AIVisuals.tsx | Near-white emphasis |
| `rgba(255,255,255,0.9)` | PageHeader.tsx | Maximum contrast elements |

**Root Cause:**
- Gap between `subtle` (12%) and `tertiary` (50%)
- No tokens above `primary` (87%) for near-white states
- Hero sections need different emphasis scale than body content

**Recommended Additions:**

```typescript
semanticTokens.effects.onDark: {
  // Existing tokens...
  primary: 'rgba(255, 255, 255, 0.87)',
  secondary: 'rgba(255, 255, 255, 0.7)',
  tertiary: 'rgba(255, 255, 255, 0.5)',
  subtle: 'rgba(255, 255, 255, 0.12)',
  
  // NEW: Fill the gaps
  /** Background tints on dark - 10% white */
  tint: 'rgba(255, 255, 255, 0.1)',
  
  /** Dividers stronger than subtle - 24% white */
  divider: 'rgba(255, 255, 255, 0.24)',
  
  /** Hero emphasis - 80% white */
  emphasis: 'rgba(255, 255, 255, 0.8)',
  
  /** Maximum contrast - 95% white (avoids pure white) */
  contrast: 'rgba(255, 255, 255, 0.95)',
}
```

**Alternative Naming (Hero Context):**

```typescript
semanticTokens.effects.hero: {
  /** Text on hero - high visibility */
  text: 'rgba(255, 255, 255, 0.95)',
  
  /** Secondary text on hero */
  textMuted: 'rgba(255, 255, 255, 0.7)',
  
  /** Interactive elements on hero */
  interactive: 'rgba(255, 255, 255, 0.8)',
  
  /** Background overlays on hero */
  overlay: 'rgba(255, 255, 255, 0.1)',
  
  /** Borders/dividers on hero */
  border: 'rgba(255, 255, 255, 0.5)',
}
```

---

### 3. Spacing: Arithmetic Elimination

**Current State:**
```typescript
semanticTokens.inline: {
  compact: 8,      // baseTokens.spacing[2]
  comfortable: 16, // baseTokens.spacing[4]
  spacious: 24,    // baseTokens.spacing[6]
}
```

**Gaps Found in Wrappers:**

| Hardcoded Value | File | Use Case |
|-----------------|------|----------|
| `comfortable + 4` (20px) | DataCard.tsx | Card padding needing "extra room" |
| `spacing[3]` (12px) | Various | Between compact and comfortable |

**Root Cause:**
- Only 3 semantic spacing values (8, 16, 24)
- Real-world needs intermediate values
- Developers resort to arithmetic: `token + 4`

**Recommended Additions:**

```typescript
semanticTokens.inline: {
  /** 4px - Minimal breathing room */
  tight: 4,
  
  /** 8px - Dense but readable */
  compact: 8,
  
  /** 12px - Balanced density */
  snug: 12,
  
  /** 16px - Standard comfort */
  comfortable: 16,
  
  /** 20px - Generous without excess */
  relaxed: 20,
  
  /** 24px - Maximum breathing room */
  spacious: 24,
}

// Mirror for vertical (stack) spacing
semanticTokens.stack: {
  tight: 4,
  compact: 8,
  snug: 12,
  comfortable: 16,
  relaxed: 20,
  spacious: 24,
}
```

**Intent Mapping:**

| Old Pattern | New Token | Px Value |
|-------------|-----------|----------|
| `compact` (unchanged) | `inline.compact` | 8px |
| `compact + 4` | `inline.snug` | 12px |
| `comfortable` (unchanged) | `inline.comfortable` | 16px |
| `comfortable + 4` | `inline.relaxed` | 20px |
| `spacious` (unchanged) | `inline.spacious` | 24px |

---

### 4. Border Radius: Intent Completeness

**Current State:**
```typescript
semanticTokens.borders.radius: {
  none: 0,
  button: 9999,  // pill
  input: 6,      // sm
  card: 8,       // md
  menu: 12,      // lg
  dialog: 16,    // xl
  pill: 9999,    // alias
}
```

**Gaps Found in Wrappers:**

| Hardcoded Value | File | Use Case |
|-----------------|------|----------|
| `'10px'` | AILabel.tsx | Between card (8) and menu (12) |
| `'50%'` | Various charts | Circular elements |
| `2` (MUI = 16px) | ResizablePanel.tsx | Accidental MUI unit |

**Root Cause:**
- Missing `badge` intent (4px)
- Missing `circle` for truly circular elements
- `10px` doesn't exist - should use `menu` (12px) for consistency

**Approved Additions:**

```typescript
semanticTokens.borders.radius: {
  // Existing...
  none: 0,
  
  // NEW: Small element intent
  /** Badges, status dots, small chips - 4px */
  badge: 4,
  
  // Existing...
  input: 6,
  card: 8,
  menu: 12,    // Use for panels/sections (10px consolidated here)
  dialog: 16,
  pill: 9999,
  
  // NEW: Circular intent
  /** Perfect circles (avatars, dots) - 50% */
  circle: '50%',
}
```

**Decision:** Removed `panel` (10px) — use `menu` (12px) for panels/sections.

---

## Summary: Approved Token Additions

### Typography Dense
| Token | Value | Replaces |
|-------|-------|----------|
| `typography.dense.badge` | 0.625rem (10px) | Badge counts, status dots |
| `typography.dense.text` | 0.75rem (12px) | Metadata, timestamps, dense tables |

### Effects: On-Dark
| Token | Value | Replaces |
|-------|-------|----------|
| `effects.onDark.tint` | rgba(255,255,255,0.1) | Hero background overlays |
| `effects.onDark.divider` | rgba(255,255,255,0.24) | Stronger dark dividers |
| `effects.onDark.emphasis` | rgba(255,255,255,0.8) | Near-white emphasis |
| `effects.onDark.contrast` | rgba(255,255,255,0.95) | Maximum visibility |

### Spacing: Inline/Stack
| Token | Value | Replaces |
|-------|-------|----------|
| `inline.tight` | 4px | Minimal gaps |
| `inline.snug` | 12px | `compact + 4` arithmetic |
| `inline.relaxed` | 20px | `comfortable + 4` arithmetic |

### Border Radius
| Token | Value | Replaces |
|-------|-------|----------|
| `borders.radius.badge` | 4px | Small chip corners |
| `borders.radius.panel` | 10px | Section/panel corners |
| `borders.radius.circle` | '50%' | Circular elements |

---

## Implementation Priority

| Priority | Category | Impact | Effort |
|----------|----------|--------|--------|
| **P0** | On-Dark Effects | High - Hero sections | Low |
| **P0** | Spacing (snug, relaxed) | High - Eliminates arithmetic | Low |
| **P1** | Typography Dense | Medium - AI/dense components | Low |
| **P1** | Border Radius (badge, circle) | Medium - Charts, badges | Low |

---

## Final Token Count

| Category | Tokens |
|----------|--------|
| Typography | 2 (`dense.badge`, `dense.text`) |
| Effects | 4 (`onDark.tint/divider/emphasis/contrast`) |
| Spacing | 6 (`inline/stack.tight/snug/relaxed`) |
| Radius | 2 (`radius.badge`, `radius.circle`) |
| **Total** | **14** |

---

## Non-Goals

This analysis explicitly **does not** propose:

- Removing existing tokens (breaking change)
- Changing token values (visual regression)
- Component-level changes (separate scope)
- Theme.ts modifications (derived from tokens)

All changes are **additive** and **backward-compatible**.

---

## Validation Criteria

After implementation, verify:

- [ ] All hardcoded `rgba(255,255,255,*)` replaced with `onDark.*` tokens
- [ ] All `token + N` arithmetic replaced with semantic spacing
- [ ] All `'Npx'` font sizes map to typography scale tokens
- [ ] All numeric border-radius values map to intent tokens
- [ ] No new TypeScript errors introduced
- [ ] Visual regression tests pass

---

*This document identifies token architecture gaps. Implementation should follow standard token governance process.*
