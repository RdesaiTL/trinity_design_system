# Accessibility Audit Report & Enforcement Strategy

## Executive Summary

This document presents the findings from the accessibility audit of the Trinity Design System and the proposed CI-level enforcement strategy to ensure WCAG 2.1 AA compliance.

---

## Current State Analysis

### ✅ Existing Accessibility Infrastructure

| Asset | Location | Status |
|-------|----------|--------|
| Focus trap hook | `src/accessibility.tsx` | Implemented |
| Reduced motion hook | `src/accessibility.tsx` | Implemented |
| ARIA live region hook | `src/accessibility.tsx` | Implemented |
| Roving tabindex hook | `src/accessibility.tsx` | Implemented |
| Skip link component | `src/accessibility.tsx` | Implemented |
| Visually hidden component | `src/accessibility.tsx` | Implemented |
| vitest-axe setup | `src/test-setup.ts` | Configured |

### ⚠️ Gaps Identified

| Gap | Risk Level | Impact |
|-----|------------|--------|
| **No CI test enforcement** | 🔴 Critical | Accessibility regressions can be merged |
| **No build-time fail on violations** | 🔴 Critical | axe errors don't block deployment |
| **Missing component a11y tests** | 🟠 High | Many components untested for a11y |
| **No ESLint jsx-a11y rules** | 🟠 High | Lint doesn't catch a11y issues |
| **No accessibility documentation** | 🟡 Medium | Developers lack guidance |

---

## Silent Failure Risks

### What Can Break Without Warning Today

| WCAG Criterion | Risk | Detection Method |
|----------------|------|------------------|
| 2.1.2 No Keyboard Trap | Focus escapes modal | Unit tests required |
| 1.4.1 Use of Color | Color-only indicators | Manual review only |
| 4.1.3 Status Messages | Toast not announced | Unit tests required |
| 1.3.1 Info and Relationships | Missing form labels | axe-core detectable |
| 2.4.3 Focus Order | Visual/DOM mismatch | Manual review |
| 4.1.2 Name, Role, Value | Missing ARIA | axe-core detectable |

---

## CI Enforcement Strategy

### New Workflow: `.github/workflows/ci.yml`

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CI PIPELINE STAGES                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────┐    ┌─────────┐    ┌──────────────┐    ┌─────────┐        │
│  │  LINT   │───►│  TEST   │───►│ ACCESSIBILITY │───►│  BUILD  │        │
│  └─────────┘    └─────────┘    └──────────────┘    └─────────┘        │
│       │              │                │                  │             │
│       ▼              ▼                ▼                  ▼             │
│   ESLint +       Vitest +        axe-core +         Vite +            │
│   jsx-a11y       Coverage        Dedicated         Storybook          │
│                                  A11y Tests                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

FAIL CONDITIONS:
  - Any ESLint jsx-a11y error → Pipeline fails
  - Any vitest test failure → Pipeline fails
  - Any axe violation → Pipeline fails
  - Build errors → Pipeline fails
```

### Enforcement Levels

#### Level 1: Lint-Time (Immediate Feedback)
- **Tool**: eslint-plugin-jsx-a11y
- **When**: On save, pre-commit
- **Catches**: Missing alt text, improper ARIA, non-interactive handlers

#### Level 2: Test-Time (Unit/Integration)
- **Tool**: vitest-axe, @testing-library/react
- **When**: Test runs, CI pipeline
- **Catches**: axe violations, keyboard issues, focus management

#### Level 3: Build-Time (Storybook)
- **Tool**: @storybook/addon-a11y
- **When**: Storybook build, visual review
- **Catches**: Component-level violations in all states

---

## Files Created

### Documentation

| File | Purpose |
|------|---------|
| `docs/ACCESSIBILITY.md` | Comprehensive a11y guide, WCAG matrix, testing requirements |
| `docs/COMPONENT_A11Y_CHECKLIST.md` | Pre-development and review checklist for new components |

### CI/CD

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | New CI pipeline with a11y enforcement |

### Testing

| File | Purpose |
|------|---------|
| `src/testing/a11y-utils.ts` | Reusable a11y testing utilities |
| `src/__tests__/a11y-audit.test.tsx` | Mandatory a11y tests for core components |

### Configuration

| File | Purpose |
|------|---------|
| `eslint.config.js` | ESLint with jsx-a11y rules |
| `package.json` | Added `test:a11y` script |

---

## Mandatory Accessibility Tests

### Components Requiring Tests

| Component | Test File | Requirements |
|-----------|-----------|--------------|
| Modal | `Modal/__tests__/Modal.test.tsx` | Focus trap, Escape, ARIA, axe |
| Toast | `Toast/__tests__/Toast.test.tsx` | Live region, pause on hover, axe |
| Navigation | `navigation/__tests__/*.test.tsx` | Skip link, aria-current, keyboard |
| DataTable | `DataTable/__tests__/DataTable.test.tsx` | Grid role, sort announcements, arrow keys |
| PageHeader | `PageHeader/__tests__/*.test.tsx` | Heading hierarchy, breadcrumb nav |
| FileUpload | `FileUpload/__tests__/*.test.tsx` | Keyboard activation, instructions |
| StatusIndicator | `StatusIndicator/__tests__/*.test.tsx` | Non-color indicators, text labels |

### Test Template

```typescript
describe('ComponentName Accessibility', () => {
  // MANDATORY: axe audit
  it('passes axe audit', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // MANDATORY: dark mode audit
  it('passes axe audit in dark mode', async () => {
    const { container } = render(<Component />, { theme: 'dark' });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // MANDATORY: keyboard navigation
  it('is keyboard navigable', async () => {
    const { user } = render(<Component />);
    await user.tab();
    expect(screen.getByRole('...')).toHaveFocus();
  });
});
```

---

## Implementation Checklist

### Immediate (This PR)

- [x] Create `docs/ACCESSIBILITY.md`
- [x] Create `docs/COMPONENT_A11Y_CHECKLIST.md`
- [x] Create `.github/workflows/ci.yml`
- [x] Create `src/testing/a11y-utils.ts`
- [x] Create `src/__tests__/a11y-audit.test.tsx`
- [x] Create `eslint.config.js` with jsx-a11y
- [x] Add `test:a11y` script to package.json

### Follow-Up Required

- [ ] Install `eslint-plugin-jsx-a11y` dependency
- [ ] Run `npm test` to validate all tests pass
- [ ] Run `npm run lint` to fix any jsx-a11y errors
- [ ] Add missing a11y tests to remaining components
- [ ] Configure Storybook a11y addon parameters

---

## Commands Reference

```bash
# Run all tests including accessibility
npm test

# Run only accessibility tests
npm run test:a11y

# Run linting with jsx-a11y rules
npm run lint

# Build with Storybook (includes a11y addon)
npm run build-storybook
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| axe violations | 0 | CI fails on any violation |
| jsx-a11y errors | 0 | Lint fails on any error |
| Component a11y coverage | 100% | All components have a11y tests |
| CI enforcement | Active | Tests required for merge |

---

## Next Steps

1. **Install dependency**: `npm install -D eslint-plugin-jsx-a11y`
2. **Run tests**: `npm test` to verify all tests pass
3. **Fix lint issues**: `npm run lint -- --fix`
4. **Review CI workflow**: Merge `.github/workflows/ci.yml`
5. **Gradual rollout**: Add a11y tests to remaining components
