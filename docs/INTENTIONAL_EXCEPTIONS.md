# Trinity Design System — Intentional Color Exceptions

> **Version**: 1.0.0  
> **Last Updated**: January 2026  
> **Status**: Governance Policy

This document serves as the **official registry** of approved exceptions to the Trinity Design System's token-only color policy. Any `eslint-disable no-restricted-syntax` comment for hardcoded colors **must** reference one of these categories.

---

## Policy

### When Exceptions Are Allowed

Hardcoded color values are permitted **only** when:

1. The color serves a functional purpose that cannot be achieved with tokens
2. The exception falls into an approved category below
3. The code includes both:
   - An `eslint-disable-next-line no-restricted-syntax` comment
   - A `@intentional-color` annotation referencing this document

### Required Comment Format

```tsx
// eslint-disable-next-line no-restricted-syntax -- @intentional-color: [CATEGORY] - [reason]
color: '#FFFFFF',
```

---

## Approved Exception Categories

### 1. AI Gradient Overlays

**Category ID**: `ai-gradient-overlay`

**Rationale**: AI components use dynamic gradient backgrounds that don't correspond to theme tokens. White (`#FFFFFF`) text/icons are required for WCAG AA contrast compliance against these gradients.

**Approved Colors**:
| Color | Usage |
|-------|-------|
| `#FFFFFF` | Text, icons on AI gradient backgrounds |

**Affected Components**:
- `AIActions.tsx` — Icon colors on primary/gradient variants
- `AIContainer.tsx` — Check icon on AI primary background
- `AIVisuals.tsx` — Icons and trend indicators on gradient cards
- `InsightEnginePanel.tsx` — AI avatar, Pro chip, button icons

**Example**:
```tsx
// eslint-disable-next-line no-restricted-syntax -- @intentional-color: ai-gradient-overlay - white icon on gradient
<Icon color="#FFFFFF" />
```

---

### 2. Chart Data Encoding

**Category ID**: `chart-data-encoding`

**Rationale**: Chart components require consistent contrast colors for visual data encoding that must work across both light and dark themes without theme-switching artifacts. These are presentation layer colors, not UI tokens.

**Approved Colors**:
| Color | Usage |
|-------|-------|
| `#FFFFFF` | Light contrast (bars, fills) |
| `#1F2937` | Dark contrast (gray-800) |
| `#9CA3AF` | Reference lines, label lines (gray-400) |
| `#6B7280` | Reference line labels (gray-500) |

**Affected Components**:
- `ComposedChart.tsx` — `CHART_CONTRAST` constant
- `PieChart.tsx` — Label line stroke

**Example**:
```tsx
/* eslint-disable no-restricted-syntax -- @intentional-color: chart-data-encoding */
const CHART_CONTRAST = {
  light: '#FFFFFF',
  dark: '#1F2937',
};
/* eslint-enable no-restricted-syntax */
```

---

### 3. White-on-Primary UI States

**Category ID**: `white-on-primary`

**Rationale**: Interactive elements with primary/accent backgrounds require white text for accessibility. While MUI's `common.white` is preferred, some component APIs only accept string colors.

**Approved Colors**:
| Color | Usage |
|-------|-------|
| `#FFFFFF` | Text/icons on primary buttons, selected states, active toggles |

**Affected Components**:
- `InsightEnginePanel.tsx` — User initials, selected chips, active buttons
- `TopNavHeader.tsx` / `TopNavWithSidebar.tsx` — (via MUI theme, not exceptions)

**Example**:
```tsx
// eslint-disable-next-line no-restricted-syntax -- @intentional-color: white-on-primary - text on accent background
color: isSelected ? '#FFFFFF' : colors.text,
```

---

## Adding New Exceptions

### Process

1. **Identify the category** — Does your use case fit an existing category?
2. **If no category exists** — Open a Design System governance issue
3. **Get approval** — Requires sign-off from Design System maintainers
4. **Update this document** — Add the new category with rationale
5. **Add the code** — Include proper `eslint-disable` with category reference

### Criteria for New Categories

New exception categories must demonstrate:

- [ ] **Functional necessity** — Tokens genuinely cannot solve the problem
- [ ] **Accessibility compliance** — Exception maintains WCAG AA
- [ ] **Cross-theme consistency** — Works in both light and dark modes
- [ ] **Limited scope** — Applies to specific, documented components
- [ ] **No workaround** — MUI theme or semantic tokens cannot be used

---

## Audit Checklist

When reviewing PRs with `eslint-disable no-restricted-syntax`:

- [ ] Comment includes `@intentional-color` annotation
- [ ] Category ID matches one in this document
- [ ] Color value matches approved colors for that category
- [ ] Component is listed in affected components (or PR adds it)

---

## References

- [TOKEN_USAGE_RULES.md](./TOKEN_USAGE_RULES.md) — Primary token governance
- [eslint.tokens.config.js](../eslint.tokens.config.js) — Enforcement configuration
- [CONTRIBUTING.md](../CONTRIBUTING.md) — PR checklist

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-01-06 | 1.0.0 | Initial policy document created from compliance audit |
