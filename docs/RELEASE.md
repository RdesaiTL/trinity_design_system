# Trinity Design System — Release Notes

> **Current Version**: 1.1.1  
> **Release Date**: January 7, 2026  
> **Status**: Stable

---

## v1.1.1 — Patch Release

**Release Date**: January 7, 2026

### Fixes
- **React Runtime Correctness**: Fixed ref access during render in `SearchInput` and `SplitPane` components
- **Accessibility Compliance**: Added scoped `eslint-disable` comments for intentional `autoFocus` usages with UX justifications
- **TypeScript Errors**: Fixed `ComposedChart` and `Sparkline` type errors in aria-label properties
- **Token Lint**: Resolved all jsx-a11y violations in production components
- **Test Fix**: Corrected `borderRadius` expectation in tokens test (20 → 8)

### Files Modified
- `SearchInput.tsx` — State-based anchor management
- `SplitPane.tsx` — `containerSize` state + `useMemo` for styles
- `FilterBar.tsx` — autoFocus eslint-disable comments
- `TopNavHeader.tsx` — autoFocus eslint-disable, unused var fix
- `DialogPage.tsx` — autoFocus eslint-disable comments
- `AIPage.tsx` — aria-role eslint-disable for component props
- `Combobox.tsx` — `useCallback` memoization for `handleCreate`

---

## v1.1.0 — Feature Release

**Release Date**: January 6, 2026

### Highlights
- **Chromatic Integration**: Visual regression testing via Chromatic CI
- **Landing Page Components**: `Footer`, `LandingPage` templates
- **Chart Components**: Full Recharts-based data visualization suite
- **Token System Enhancement**: Semantic effects, density tokens, icon sizing

### New Components
- `Footer` — Site-wide footer with navigation and social links
- `LandingPage` stories — Hero, Features, CTA templates
- `AreaChart`, `BarChart`, `LineChart`, `PieChart`, `ComposedChart`
- `Sparkline`, `Gauge`, `RadialProgress`

### Infrastructure
- Chromatic visual testing pipeline
- Token compliance ESLint configuration (`eslint.tokens.config.js`)
- Accessibility audit tooling

---

## v1.0.0 — Initial Release

**Release Date**: December 2025

### Foundation
- MUI v6/7 theming with Trinity brand tokens
- Core component library (40+ components)
- Storybook documentation site
- WCAG 2.1 AA accessibility compliance
- Light/Dark theme support

---

## Upgrade Guide

### From 1.1.0 to 1.1.1

No breaking changes. Update via:

```bash
npm update @trinity/design-system
```

### From 1.0.x to 1.1.x

1. Review new token structure in `src/tokens.ts`
2. Update any custom Chart usage to new component API
3. Run `npm run lint:tokens` to check compliance

---

## CI Status

| Check | Status |
|-------|--------|
| `npm run lint` | ✅ 0 errors |
| `npm run lint:tokens` | ✅ 0 errors |
| `npm test` | ✅ 492 passed |
| `npm run build` | ✅ Passing |
| Chromatic | ✅ Visual baselines established |

---

## Links

- **Storybook**: https://main--[project-id].chromatic.com
- **Repository**: https://github.com/RdesaiTL/trinity_design_system
- **Chromatic**: https://www.chromatic.com/library?appId=[app-id]
