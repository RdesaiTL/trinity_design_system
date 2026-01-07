# Trinity Design System - CI Fix Plan

**Date:** January 7, 2026  
**Version:** v1.1.0  
**Author:** Engineering Team

---

## Executive Summary

The CI pipeline has 2 failing jobs that need to be resolved before handoff:

| CI Job | Status | Root Cause |
|--------|--------|------------|
| **Lint** | ❌ Failed (43s) | 448 ESLint errors |
| **Test** | ❌ Failed (16m) | 1 failing unit test |
| Accessibility Audit | ✅ Passed | - |
| Storybook Publish | ✅ Passed | - |
| UI Tests (Chromatic) | ✅ Passed | - |

**Estimated Total Fix Time:** 3-4 hours

---

## Detailed Issue Breakdown

### 1. Lint Errors (448 total)

| Error Category | Count | Severity | Description |
|----------------|-------|----------|-------------|
| Component creation in render | 68 | 🔴 Critical | Components defined inside render cause remounting |
| Anchor accessibility | 75 | 🔴 Critical | Invalid hrefs or anchors used as buttons |
| Unused variables/imports | ~50 | 🟡 Medium | Dead code that should be removed |
| React hooks violations | 7 | 🔴 Critical | Hooks called in wrong context |
| Impure functions in render | 3 | 🔴 Critical | Math.random() called during render |
| Explicit any types | 5 | 🟡 Medium | TypeScript strict mode violations |
| Hardcoded colors | ~100 | 🟢 Warning | Non-token color values |

### 2. Test Failure (1 test)

**File:** `src/__tests__/tokens.test.ts`  
**Test:** `should set appropriate border radius per mode`

```
Expected: 20 (baseTokens.borderRadius.lg)
Received: 8 (actual theme value)
```

---

## Fix Plan - Execution Steps

### Phase 1: Fix Failing Test (15 min)
**Priority: Immediate**

1. Review the test expectation in `src/__tests__/tokens.test.ts` (lines 325-328)
2. Compare with actual theme definition in `src/theme.ts`
3. Either:
   - Update test to match current theme behavior, OR
   - Fix theme if borderRadius was changed unintentionally

**Files:**
- `src/__tests__/tokens.test.ts`
- `src/theme.ts`
- `src/tokens.ts`

---

### Phase 2: Fix React Hooks Violations (20 min)
**Priority: Critical - Runtime Bugs**

**Problem:** `useState` and other hooks called inside story `render` functions

**Pattern to fix:**
```tsx
// ❌ WRONG - Hook inside render callback
export const MyStory: Story = {
  render: () => {
    const [state, setState] = useState(false);
    return <Component value={state} />;
  }
};

// ✅ CORRECT - Extract to named component
const MyStoryComponent = () => {
  const [state, setState] = useState(false);
  return <Component value={state} />;
};

export const MyStory: Story = {
  render: () => <MyStoryComponent />
};
```

**Files to fix:**
- Multiple story files with stateful render functions

---

### Phase 3: Fix Impure Functions in Render (10 min)
**Priority: Critical - Unstable IDs**

**Problem:** `Math.random()` called during component render

**Pattern to fix:**
```tsx
// ❌ WRONG - New ID every render
const ChartComponent = () => {
  const id = `chart-${Math.random()}`;
  return <svg id={id}>...</svg>;
};

// ✅ CORRECT - Stable ID with useId
const ChartComponent = () => {
  const id = useId();
  return <svg id={id}>...</svg>;
};

// ✅ ALTERNATIVE - useMemo for one-time generation
const ChartComponent = () => {
  const id = useMemo(() => `chart-${Math.random()}`, []);
  return <svg id={id}>...</svg>;
};
```

**Files to fix:**
- `src/components/Charts/AreaChart.tsx`
- Other chart components

---

### Phase 4: Fix Component Creation in Render (45 min)
**Priority: High - Performance**

**Problem:** Components defined inside other components cause unnecessary remounting

**Pattern to fix:**
```tsx
// ❌ WRONG - Child recreated every render
const Parent = () => {
  const Child = () => <div>I remount every time!</div>;
  return <Child />;
};

// ✅ CORRECT - Child defined outside
const Child = () => <div>I'm stable!</div>;

const Parent = () => {
  return <Child />;
};
```

**Primary locations:**
- Story files (most common)
- Demo page components
- Example code in documentation

---

### Phase 5: Fix Unused Imports/Variables (30 min)
**Priority: Medium - Code Quality**

**Files with highest counts:**
| File | Errors | Action |
|------|--------|--------|
| `src/components/AppLayout/InsightEnginePanel.tsx` | 13 | Remove unused imports |
| `src/__tests__/a11y-audit.test.tsx` | 4 | Clean up test imports |
| Various page files | 11 | Remove unused `Showcase` imports |

**Bulk fix approach:**
```bash
# Use ESLint auto-fix for unused imports
npx eslint --fix --rule '@typescript-eslint/no-unused-vars: error' src/
```

---

### Phase 6: Fix Anchor Accessibility (45 min)
**Priority: High - Accessibility Compliance**

**Problem Types:**

1. **Missing/Invalid href (39 errors)**
```tsx
// ❌ WRONG
<a onClick={handleClick}>Click me</a>

// ✅ CORRECT - Use button
<Button onClick={handleClick}>Click me</Button>
```

2. **Anchor used as button (36 errors)**
```tsx
// ❌ WRONG
<a href="#" onClick={handleClick}>Action</a>

// ✅ CORRECT
<Button variant="text" onClick={handleClick}>Action</Button>
// OR
<Link component="button" onClick={handleClick}>Action</Link>
```

---

### Phase 7: Fix TypeScript Strict Issues (15 min)
**Priority: Medium - Type Safety**

1. **Explicit any (5 errors)**
   - Add proper types to decorator functions in `.storybook/preview.tsx`

2. **Triple slash reference (1 error)**
```tsx
// ❌ WRONG
/// <reference types="vitest-axe" />

// ✅ CORRECT
import type {} from 'vitest-axe';
```

---

### Phase 8: Address Hardcoded Colors (Optional - 1 hour)
**Priority: Low - These are warnings, not errors**

**Options:**
1. Add `// @intentional-color` comments where hex values are intentional
2. Replace with token references where appropriate
3. Configure ESLint to ignore test/story files for this rule

---

## Verification Checklist

After completing all fixes, run:

```bash
# 1. Lint check (should pass with 0 errors)
npm run lint

# 2. Token lint check
npm run lint:tokens

# 3. Type check
npx tsc --noEmit

# 4. Unit tests (should all pass)
npm test

# 5. Build verification
npm run build

# 6. Full CI simulation
npm run lint && npm run lint:tokens && npm test && npm run build
```

---

## CI Configuration Reference

**File:** `.github/workflows/ci.yml`

```yaml
jobs:
  lint:      # ESLint + Token lint + TypeScript
  test:      # Vitest with coverage
  accessibility:  # A11y audit
  build:     # Depends on lint, test, accessibility
```

---

## Post-Fix Handoff Checklist

- [ ] All 448 lint errors resolved
- [ ] All unit tests passing
- [ ] CI pipeline fully green
- [ ] No React console warnings in dev mode
- [ ] Chromatic baseline updated
- [ ] Documentation reviewed

---

## Support

For questions about these fixes:
- Review `docs/DEVELOPER_GUIDE.md` for patterns
- Check `docs/TOKEN_USAGE_RULES.md` for color token guidelines
- See `docs/STORYBOOK_STANDARDS.md` for story patterns

---

*Document generated for Trinity Design System v1.1.0*
