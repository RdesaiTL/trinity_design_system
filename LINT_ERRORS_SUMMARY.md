# ESLint Error Summary Report

**Generated:** January 3, 2026  
**Total:** 872 problems (448 errors, 424 warnings)

---

## Executive Summary

| Category | Count | Severity | Priority |
|----------|-------|----------|----------|
| React Compiler Violations | ~71 | Error | 🔴 High |
| Anchor/Link Accessibility | ~75 | Error | 🔴 High |
| Unused Variables/Imports | ~90 | Error | 🟡 Medium |
| Explicit `any` Types | ~5 | Error | 🟡 Medium |
| React Hooks Rules | ~7 | Error | 🔴 High |
| Hardcoded Hex Colors | ~424 | Warning | 🟢 Low (mostly intentional in tokens.ts) |

---

## Category 1: React Compiler Errors (~71 errors)

**Rule:** `react-compiler/react-compiler`

These errors occur when components are created dynamically during render, which breaks React's optimization.

### Files Affected:
- `src/stories/DeveloperGuide.stories.tsx` - 68 errors
- `src/stories/QuickStart.stories.tsx` - ~7 errors  
- `src/stories/GettingStarted.stories.tsx` - ~9 errors

### Pattern:
```tsx
// ❌ Bad - Creating component during render
const render = () => {
  const MyComponent = () => <div>...</div>; // Error!
  return <MyComponent />;
};

// ✅ Good - Define component outside render
const MyComponent = () => <div>...</div>;
const render = () => <MyComponent />;
```

---

## Category 2: Anchor Accessibility Issues (~75 errors)

**Rule:** `jsx-a11y/anchor-is-valid`

Two sub-types:
1. **Anchor as button** (36 errors) - Using `<a>` when `<button>` is appropriate
2. **Invalid href** (39 errors) - Links with `href="#"` or empty href

### Fix Pattern:
```tsx
// ❌ Bad
<a href="#" onClick={handleClick}>Click me</a>

// ✅ Good - Use button for actions
<Button onClick={handleClick}>Click me</Button>

// ✅ Good - Use real href for navigation
<Link href="/actual-page">Go to page</Link>
```

---

## Category 3: Unused Variables (~90 errors)

**Rule:** `@typescript-eslint/no-unused-vars`

### Most Common:
| Variable | Count | Location |
|----------|-------|----------|
| `Showcase` | 11 | Various stories |
| `Box` | 7 | Various components |
| `Stack` | 5 | Various components |
| `Card/CardContent` | 6 | Various stories |
| `primaryColor/secondaryColor` | 6 | IllustratedMessage.tsx |

### Fix:
Remove unused imports or prefix with `_` if intentionally unused:
```tsx
// ❌ Bad
import { Box, Stack, Typography } from '@mui/material';
// Only using Typography...

// ✅ Good
import { Typography } from '@mui/material';
```

---

## Category 4: React Hooks Rules (~7 errors)

**Rule:** `react-hooks/rules-of-hooks`

### Issues:
- Hooks called inside callbacks (not at top level)
- Hooks called in non-component functions

### Files:
- `src/stories/DeveloperGuide.stories.tsx`
- `src/stories/QuickStart.stories.tsx`

---

## Category 5: Explicit Any Types (~5 errors)

**Rule:** `@typescript-eslint/no-explicit-any`

### Files:
- `src/components/Charts/types.ts:13`
- `src/components/DataTable/types.ts:69`
- A few test files

### Fix:
Replace `any` with proper types or `unknown`.

---

## Category 6: Hardcoded Hex Colors (~424 warnings)

**Rule:** `no-restricted-syntax`

### Note: Most are INTENTIONAL

The majority of these are in:
- `src/tokens.ts` (lines 573-647) - **This IS the token definition file**
- `src/theme.ts` - Theme configuration

### Files requiring attention:
Only component files with hardcoded colors need fixing. Token definition files are exempt.

---

## Top 20 Files by Problem Count

| File | Problems |
|------|----------|
| `src/tokens.ts` | 92 (all warnings - intentional) |
| `src/theme.ts` | 22 (all warnings - intentional) |
| `src/stories/DeveloperGuide.stories.tsx` | 68+ errors |
| `src/stories/QuickStart.stories.tsx` | 13+ errors |
| `src/stories/GettingStarted.stories.tsx` | 9+ errors |
| `src/components/IllustratedMessage/IllustratedMessage.tsx` | 12 |
| `src/components/DataTable/DataTable.tsx` | 10 |
| `src/components/Charts/*.tsx` | 8 each |

---

## Recommended Fix Order

### Phase 1: Critical (Breaks functionality)
1. Fix React Compiler errors in stories (move component definitions outside render)
2. Fix React Hooks violations

### Phase 2: Accessibility
3. Fix anchor-is-valid issues (replace `<a>` with `<Button>` or add proper href)

### Phase 3: Code Quality  
4. Remove unused imports/variables
5. Replace `any` with proper types

### Phase 4: Optional
6. Address remaining hardcoded colors (if not in token files)

---

## Quick Commands

```bash
# See all errors
npm run lint

# See only errors (no warnings)
npm run lint -- --quiet

# Auto-fix what's possible
npm run lint -- --fix

# Check specific file
npm run lint -- src/stories/DeveloperGuide.stories.tsx
```

---

## Full Report

See `LINT_ERRORS_REPORT.txt` for the complete ESLint output with all 872 problems listed.

