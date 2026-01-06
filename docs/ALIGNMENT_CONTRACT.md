# Trinity Design System Alignment Contract

**Document Type:** Architectural Governance  
**Authority:** Principal Design System Architect  
**Status:** Canonical  
**Last Updated:** January 5, 2026

---

## Foundational Principle

> **The MUI theme is the single source of visual truth. Trinity wrappers extend behavior, not appearance.**

---

## Inheritance vs Override Rules

### MUST INHERIT (Wrappers receive these passively)

| Property Category | Examples | Rationale |
|-------------------|----------|-----------|
| **Color palette** | Background, text, border colors | Brand consistency across all surfaces |
| **Typography scale** | Font size, weight, line height | Typographic hierarchy is system-wide |
| **Border radius** | Card corners, button shapes, input fields | Shape language defines brand identity |
| **Elevation/shadows** | Box shadows, z-index layering | Depth perception must be uniform |
| **Spacing rhythm** | Padding, margin, gap | Spatial consistency enables composition |
| **Interactive states** | Hover, focus, active, disabled | Feedback patterns must be predictable |
| **Motion/transitions** | Duration, easing | Animation language is perceptual |

### MAY OVERRIDE (With explicit justification)

| Condition | Allowed Override | Required Annotation |
|-----------|------------------|---------------------|
| **Layout composition** | Flex direction, grid structure, internal arrangement | None required |
| **Semantic purpose** | Status-specific colors (error, success, warning) when MUI's `color` prop is insufficient | `// @semantic-override: [reason]` |
| **Accessibility enhancement** | Increased contrast, larger touch targets, focus visibility | `// @a11y-override: [WCAG criterion]` |
| **Animation choreography** | Staggered entrances, coordinated transitions across children | `// @motion-override: [intent]` |
| **Responsive adaptation** | Breakpoint-specific layout changes | None required |

### MUST NEVER OVERRIDE

| Prohibition | Violation Example | Why It's Harmful |
|-------------|-------------------|------------------|
| **Hardcoded color values** | `color: '#FF6150'` | Breaks dark mode, brand updates |
| **Hardcoded pixel dimensions** | `fontSize: '14px'` | Breaks scaling, accessibility |
| **Token arithmetic** | `padding: token + 4` | Circumvents design decisions |
| **State appearance** | Custom hover colors | Breaks interaction predictability |
| **Component internal styling** | Overriding MUI's internal class structure | Brittle to MUI updates |
| **Opacity for emphasis** | `opacity: 0.7` for de-emphasis | Use semantic text colors instead |

---

## Semantic Token Integration Model

```
┌─────────────────────────────────────────────────────────────┐
│                    TOKEN FLOW HIERARCHY                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   BASE TOKENS (primitives)                                  │
│   └─ colors.navy.900, spacing.4, borderRadius.md            │
│      ↓                                                      │
│   SEMANTIC TOKENS (purpose)                                 │
│   └─ colors.text.primary, borders.radius.card               │
│      ↓                                                      │
│   MUI THEME (application)                                   │
│   └─ palette.primary, shape.borderRadius, spacing()         │
│      ↓                                                      │
│   MUI COMPONENT OVERRIDES (enforcement)                     │
│   └─ MuiButton.styleOverrides, MuiCard.styleOverrides       │
│      ↓                                                      │
│   TRINITY WRAPPERS (composition only)                       │
│   └─ Layout, behavior, slot content                         │
│                                                             │
│   ══════════════════════════════════════════════════════    │
│   RULE: Wrappers consume the END of this chain,             │
│         never bypass to earlier layers.                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Token Access Rules for Wrappers

| Need | Correct Approach | Incorrect Approach |
|------|------------------|-------------------|
| Get primary color | `theme.palette.primary.main` | `baseTokens.colors.navy[900]` |
| Get border radius | `theme.shape.borderRadius` **or** `semanticTokens.borders.radius.*` | `baseTokens.borderRadius.*` |
| Get spacing | `theme.spacing(2)` or `sx={{ p: 2 }}` | `baseTokens.spacing[4]` |
| Get typography | `<Typography variant="body1">` | `sx={{ fontSize: '1rem' }}` |

**Notes:**
- Wrappers must not invent new radius values.
- Semantic radius tokens are allowed when MUI does not already encode the intent (e.g. menu, pill, badge).

**Exception:** Component tokens (e.g., `componentTokens.button.height`) may be accessed directly when MUI has no equivalent.

---

## Non-Negotiable Alignment Principles

### 1. Theme Supremacy
The MUI theme is the runtime styling authority. Wrappers must query the theme, never encode values.

### 2. Passive Inheritance by Default
A wrapper with zero `sx` props should look identical to raw MUI. Any visual difference is a violation.

### 3. Behavior Over Appearance
Wrappers exist to compose, orchestrate, and add functionality—not to restyle. If you're writing `backgroundColor`, question why.

### 4. Explicit Deviation
When override is necessary, it must be:
- Annotated with intent (`@semantic-override`, `@a11y-override`)
- Reviewed by design system maintainers
- Documented in the component's story

### 5. No Magic Numbers
Every dimensional value must trace to a token or theme value. The number `8` should never appear in a wrapper—use `theme.spacing(1)` or `semanticTokens.spacing.*`.

### 6. Dark Mode Neutrality
Wrappers must not assume light or dark mode. Use theme-aware values (`text.primary`, `action.hover`) that adapt automatically.

### 7. Forward Compatibility
Wrappers should survive MUI major version upgrades. Avoid:
- Internal MUI class selectors (`.MuiButton-root`)
- Undocumented MUI props
- CSS-in-JS that fights MUI's styling engine

---

## Decision Framework

When adding styling to a wrapper, ask:

```
┌─────────────────────────────────────────────────────┐
│  "Does this styling decision belong to me?"         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Q1: Is this visual appearance or layout/behavior?  │
│      → Appearance: Let MUI handle it                │
│      → Behavior: May belong in wrapper              │
│                                                     │
│  Q2: Would this break if the theme changed?         │
│      → Yes: Use theme value instead                 │
│      → No: Likely safe                              │
│                                                     │
│  Q3: Is this consistent with other components?      │
│      → No: Add to theme, not wrapper                │
│      → Yes: Verify it comes from theme              │
│                                                     │
│  Q4: Will this survive dark mode?                   │
│      → No: Use semantic color                       │
│      → Yes: Proceed with caution                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Compliance Verification

A wrapper is **compliant** when:

- [ ] No hardcoded color values (hex, rgb, rgba without semantic meaning)
- [ ] No hardcoded pixel/rem values for spacing, sizing, typography
- [ ] All overrides are annotated with justification comments
- [ ] Renders identically in light and dark mode (where applicable)
- [ ] Visual output matches equivalent raw MUI composition
- [ ] No direct imports from `tokens.ts` for values available in theme

---

## Related Documents

- [INTENTIONAL_EXCEPTIONS.md](./INTENTIONAL_EXCEPTIONS.md) - Approved hardcoded color exceptions registry
- [STYLING_INCONSISTENCY_AUDIT.md](./STYLING_INCONSISTENCY_AUDIT.md) - Current violations and remediation plan
- [TOKEN_USAGE_RULES.md](./TOKEN_USAGE_RULES.md) - Detailed token consumption guidelines
- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Implementation patterns

---

*This contract governs the relationship between styling layers. Implementation guidelines and component-specific rules will follow.*
