# Trinity Design System — Semantic Layer Specification

**Document Type:** Design Decision  
**Version:** 1.0  
**Date:** January 5, 2026  
**Status:** Proposed  
**Addresses:** Audit Root Causes RC1-RC4

---

## Purpose

This specification defines the **missing semantic token layers** required to achieve full design system compliance. It establishes intent-based abstractions that bridge the gap between raw primitive tokens and component implementation.

**This document defines WHAT and WHY, not HOW or specific values.**

---

## 1. Semantic Effects Layer

### Problem Statement

Components require visual effects (shadows, overlays, focus states) but the token system only provides raw opacity decimals. Engineers hardcode `rgba()` values because no semantic layer expresses effect intent.

### Design Intent

Effects communicate **visual hierarchy**, **interaction state**, and **depth relationships**. They are not arbitrary—each effect serves a specific UI purpose.

---

### 1.1 Overlay Effects

**Definition:** Semi-transparent layers that modify underlying content visibility or indicate state change.

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `overlay.scrim` | Full-screen dimming layer | Modal backdrops, drawer overlays, focus traps |
| `overlay.hover` | Subtle surface state change | Row hover, card hover, interactive surface feedback |
| `overlay.hoverSubtle` | Minimal hover for dense UI | Chart hover, table cell focus without disruption |
| `overlay.pressed` | Active/pressed state | Button press, toggle active state |
| `overlay.selected` | Persistent selection state | Selected row, active tab background |
| `overlay.disabled` | Reduced visibility for inactive | Disabled controls, inactive sections |

**Rationale:** Overlays must express interaction states consistently. A "hover" overlay on a button and a table row should feel the same intensity, even if the base color differs.

---

### 1.2 Text-on-Surface Overlays

**Definition:** White or inverse-color text/icon opacity levels for placement on dark or colored backgrounds.

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `onDark.primary` | Maximum legibility white text | Hero headlines, primary actions on dark |
| `onDark.secondary` | Reduced emphasis white text | Subheadings, secondary labels on dark |
| `onDark.tertiary` | De-emphasized white text | Metadata, timestamps on dark backgrounds |
| `onDark.subtle` | Decorative/divider elements | Borders, separators on dark |

**Rationale:** Text on dark backgrounds requires different opacity levels than on light. These tokens ensure WCAG-compliant contrast while maintaining visual hierarchy.

---

### 1.3 Shadow Effects

**Definition:** Depth indicators that communicate elevation and spatial relationships.

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `shadow.surface` | Resting elevation | Cards at rest, surfaces on background |
| `shadow.raised` | Interactive elevation increase | Hovered cards, focused elements |
| `shadow.floating` | Detached overlay elements | Dropdowns, popovers, tooltips |
| `shadow.dialog` | Modal-level prominence | Dialogs, sheets, full modals |
| `shadow.inset` | Recessed/pressed appearance | Toggle wells, pressed buttons |

**Rationale:** Shadows establish a consistent elevation hierarchy. A dropdown should always feel "above" its trigger, regardless of where it appears in the interface.

---

### 1.4 Focus Effects

**Definition:** Keyboard accessibility indicators that communicate focus state.

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `focus.ring` | Standard focus indicator | Interactive elements on light backgrounds |
| `focus.ringOnDark` | Focus indicator for dark surfaces | Navigation items, dark mode controls |
| `focus.glow` | Emphasized focus for critical actions | Primary buttons, destructive actions |

**Rationale:** Focus indicators must be visible regardless of background. Separate tokens ensure accessibility compliance across color contexts.

---

### 1.5 State Effects

**Definition:** Semantic status communication through subtle visual treatment.

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `state.errorSubtle` | Error context background | Form field error state, validation feedback |
| `state.errorEmphasis` | Error border/ring | Error field border, alert accents |
| `state.warningSubtle` | Caution context background | Warning banners, soft alerts |
| `state.warningEmphasis` | Warning border/ring | Warning field accents |
| `state.successSubtle` | Positive context background | Success states, completion indicators |
| `state.successEmphasis` | Success border/ring | Success field accents |
| `state.infoSubtle` | Informational context | Help tips, informational banners |
| `state.infoEmphasis` | Info border/ring | Info field accents |

**Rationale:** Status states require both background fills and border treatments. Providing both prevents engineers from inventing opacity values.

---

## 2. Semantic Radius Layer

### Problem Statement

The current `semanticTokens.borders.radius` provides component-specific tokens (button, input, card) but lacks intent-based shape vocabulary. Engineers hardcode values for cases not covered by named components.

### Design Intent

Border radius communicates **shape language** and **hierarchy**. Shapes should be chosen by intent, not by pixel measurement.

---

### 2.1 Shape Intent Categories

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `radius.none` | Sharp edges, no rounding | Table cells, grid lines, technical UI |
| `radius.subtle` | Minimal softening | Dense data UI, small interactive targets |
| `radius.soft` | Noticeable but restrained | Standard controls, inputs, chips |
| `radius.rounded` | Prominent curves | Cards, containers, grouped content |
| `radius.pill` | Maximum curvature (half-height) | Buttons, tags, badges, status pills |
| `radius.circle` | Perfect circle (50%) | Avatars, status dots, icon containers |

**Rationale:** Shape intent allows designers to specify "this should feel soft" without pixel debates. A `soft` radius will scale proportionally across component sizes.

---

### 2.2 Contextual Radius Rules

| Context | Rule |
|---------|------|
| **Nesting** | Outer container radius = Inner radius + Padding gap |
| **Interactive controls** | Prefer `pill` for primary actions, `soft` for secondary |
| **Data display** | Prefer `subtle` or `none` for dense information |
| **Status indicators** | Use `circle` for dots, `pill` for labels |

**Rationale:** Nesting rules prevent visual artifacts where inner and outer curves conflict. Contextual guidance reduces decision fatigue.

---

## 3. Semantic Size & Spacing Layer

### Problem Statement

Components hardcode pixel spacing values because semantic spacing only provides generic scales (xs, sm, md). No intent vocabulary exists for inline padding, gap patterns, or density contexts.

### Design Intent

Spacing communicates **rhythm**, **grouping**, and **density**. Intent-based spacing ensures visual consistency across components without memorizing pixel values.

---

### 3.1 Inline Spacing (Within Components)

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `inline.tight` | Minimum internal breathing room | Icon-to-text gap, chip padding |
| `inline.compact` | Dense but readable | Button padding, input padding |
| `inline.comfortable` | Standard breathing room | Card padding, section content |
| `inline.spacious` | Generous internal space | Hero sections, prominent CTAs |

**Rationale:** Inline spacing affects perceived density. A "compact" button and a "compact" chip should feel equally dense.

---

### 3.2 Stack Spacing (Between Elements)

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `stack.related` | Tightly grouped items | Label + input, icon + text |
| `stack.grouped` | Visible grouping with separation | Form field groups, card sections |
| `stack.separated` | Clear content boundaries | Section breaks, content blocks |
| `stack.distinct` | Major structural divisions | Page sections, layout regions |

**Rationale:** Stack spacing establishes information hierarchy through whitespace. Related items cluster; distinct items stand apart.

---

### 3.3 Density Contexts

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `density.compact` | Maximum information density | Data tables, control panels |
| `density.standard` | Balanced readability/density | General application UI |
| `density.comfortable` | Prioritize readability | Content-heavy pages, documentation |

**Rationale:** Density is a global modifier that scales spacing proportionally. A "compact" density reduces all spacing, not just individual values.

---

## 4. Semantic Icon & Micro-Typography Layer

### Problem Statement

Components hardcode icon sizes (14px, 16px, 20px) and micro-text sizes (10px, 11px, 12px) because semantic typography only covers standard text scales (xs through 6xl). No vocabulary exists for icons or dense UI text.

### Design Intent

Icons and micro-text require their own scale because they serve different purposes than body text. Icons must align with interactive targets; micro-text must remain legible at small sizes.

---

### 4.1 Icon Size Scale

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `icon.inline` | Within text flow | Icons inside paragraphs, inline badges |
| `icon.control` | Standard interactive element | Buttons, form controls, menu items |
| `icon.navigation` | Wayfinding clarity | Navigation icons, toolbar actions |
| `icon.prominent` | Visual anchor | Empty states, feature icons |
| `icon.hero` | Maximum visual impact | Hero sections, large illustrations |

**Rationale:** Icons at different sizes serve different cognitive purposes. A navigation icon must be instantly recognizable; an inline icon must not disrupt text flow.

---

### 4.2 Micro-Typography Scale

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `micro.xs` | Smallest legible text | Chart axis labels, timestamps, badges |
| `micro.sm` | Dense but scannable | Table cells, metadata, captions |

**Rationale:** Micro-text requires special treatment for legibility. These sizes should have increased letter-spacing and font-weight adjustments applied automatically.

---

### 4.3 Typography Intent Additions

| Intent | Meaning | Use Case |
|--------|---------|----------|
| `typography.data` | Optimized for numbers/data | Table columns, metrics, statistics |
| `typography.code` | Monospace for technical content | Code snippets, IDs, hashes |

**Rationale:** Data-heavy interfaces need typography optimized for scanning numbers, not reading prose.

---

## 5. Domain Color Classification

### Problem Statement

The audit identified 38 hardcoded hex colors, but many are **intentional domain exceptions**. The token system lacks formal classification of color domains, causing false positives and governance confusion.

### Design Intent

Colors serve different purposes in different domains. UI colors follow brand guidelines strictly; data visualization colors prioritize distinction; illustration colors serve aesthetic purposes.

---

### 5.1 Color Domain Taxonomy

| Domain | Purpose | Governance | Token Requirement |
|--------|---------|------------|-------------------|
| **UI** | Interface controls, text, surfaces | **Strict** — Brand compliance mandatory | Must use `semanticTokens.colors.*` |
| **Status** | Semantic state communication | **Strict** — Accessibility mandatory | Must use `semanticTokens.colors.status.*` |
| **Data Visualization** | Chart elements, data encoding | **Moderate** — Contrast required | May use domain palette; document rationale |
| **AI/Feature** | Branded feature areas | **Moderate** — Brand-aligned | May use domain tokens with brand colors |
| **Illustration** | Decorative, explanatory graphics | **Flexible** — Design discretion | May use curated external palette |

**Rationale:** Not all colors serve the same purpose. Data visualization requires categorical distinction that brand colors cannot provide. Acknowledging this prevents false compliance violations.

---

### 5.2 Domain Exception Annotation

Each color domain exception must be documented with:

1. **Domain classification** — Which domain applies
2. **Justification** — Why semantic tokens are insufficient
3. **Accessibility verification** — Contrast compliance confirmed
4. **Approval status** — Design lead sign-off

**Annotation format:**
```
@intentional-color: <domain>
@reason: <justification>
@a11y-verified: true|false
```

**Rationale:** Formal annotation distinguishes intentional design decisions from compliance violations. This enables automated scanning to skip documented exceptions.

---

### 5.3 Domain-Specific Token Layers

| Domain | Token Layer | Contents |
|--------|-------------|----------|
| **UI** | `semanticTokens.colors.*` | Standard UI colors (existing) |
| **Data Viz** | `chartTokens.colors.*` | Categorical, sequential, diverging palettes |
| **AI** | `aiTokens.colors.*` | AI gradient, glow, background treatments |
| **Illustration** | `illustrationTokens.colors.*` | Curated status/decorative palette |

**Rationale:** Domain-specific token layers make intent explicit. An engineer importing `chartTokens` signals intentional domain usage.

---

## 6. Layer Relationships

### Token Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT USAGE                          │
│   (Components consume semantic tokens only)                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   SEMANTIC TOKENS                           │
│   effects · radius · spacing · typography · colors          │
│   (Intent-based, component-agnostic)                        │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  DOMAIN TOKENS  │ │  DOMAIN TOKENS  │ │  DOMAIN TOKENS  │
│     (Charts)    │ │      (AI)       │ │  (Illustration) │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     BASE TOKENS                             │
│   colors · spacing · typography · radius · opacity          │
│   (Primitive values, never used directly in components)     │
└─────────────────────────────────────────────────────────────┘
```

### Consumption Rules

| Consumer | May Import |
|----------|------------|
| Components (TSX files) | `semanticTokens`, domain tokens for classified features |
| Domain token files | `baseTokens`, `semanticTokens` |
| Theme configuration | `baseTokens`, `semanticTokens` |
| Storybook/Tests | Any (for documentation/verification) |

---

## 7. Implementation Priority

Based on audit impact analysis:

| Priority | Layer | Root Cause Addressed | Violation Reduction |
|----------|-------|---------------------|---------------------|
| **P0** | Semantic Effects | RC1 | ~57 violations (28%) |
| **P0** | Icon/Micro Typography | RC2 | ~95 violations (46%) |
| **P1** | Semantic Radius Intent | RC3 | ~30 violations (15%) |
| **P1** | Domain Color Classification | RC4 | Governance clarity |
| **P2** | Semantic Spacing Intent | RC6 | ~20 violations (10%) |

---

## 8. Success Criteria

This specification is successfully implemented when:

1. **Zero rgba() hardcoding** — All opacity effects use semantic effect tokens
2. **Zero arbitrary borderRadius** — All shapes use intent-based radius tokens
3. **Zero magic number fontSize** — All text uses typography or micro scale
4. **Zero undocumented hex colors** — All exceptions annotated with domain classification
5. **Clear import boundaries** — ESLint enforces token consumption rules

---

## Appendix: Decision Rationale Summary

| Design Decision | Rationale |
|-----------------|-----------|
| Effects layer separate from colors | Effects are about visibility/depth, not brand expression |
| Radius by intent, not by component | Shapes should feel consistent regardless of component type |
| Inline vs Stack spacing distinction | Horizontal and vertical spacing serve different cognitive purposes |
| Icon scale separate from typography | Icons serve recognition, not reading; different optimization needs |
| Domain color classification | Acknowledges that not all color use cases can follow brand rules |
| Annotation requirement for exceptions | Distinguishes intentional design from compliance failure |

---

*This specification defines semantic intent. Implementation values will be determined during token development phase.*

---

**Approval Required From:**
- [ ] Design Lead
- [ ] Engineering Lead
- [ ] Accessibility Lead

**Next Step:** Upon approval, proceed to token value definition and implementation in `src/tokens.ts`.
