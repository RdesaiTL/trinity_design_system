# Trinity Design System — Testing Strategy

## Overview

This document defines the **repeatable testing strategy** for the Trinity Design System. All components must follow these conventions to ensure consistent quality, accessibility compliance (WCAG 2.1 AA), and maintainability.

---

## Testing Stack

| Tool | Purpose |
|------|---------|
| **Vitest** | Test runner (fast, ESM-native) |
| **Testing Library** | DOM queries & user interactions |
| **vitest-axe** | Automated accessibility audits |
| **userEvent** | Realistic user interaction simulation |

### Configuration Files

- `vitest.config.ts` — Main test configuration
- `src/test-setup.ts` — Global test setup (jest-dom matchers)
- `src/testing/test-utils.tsx` — Shared utilities and helpers

---

## Test Categories (7 Layers)

Every component test file should include these sections **in order**:

```
1. RENDERING       — Basic render, props, DOM structure
2. VARIANTS        — Visual variants, sizes, states
3. ACCESSIBILITY   — axe audit, ARIA attributes, labels
4. KEYBOARD        — Tab navigation, key handlers
5. INTERACTION     — Click, hover, focus behaviors
6. INTEGRATION     — Component combinations, context
7. EDGE CASES      — Error handling, boundary conditions
```

---

## Folder Structure Convention

```
src/
├── components/
│   ├── Modal/
│   │   ├── Modal.tsx
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── Modal.test.tsx       # Component tests
│   │
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   ├── CellRenderers.tsx
│   │   ├── types.ts
│   │   └── __tests__/
│   │       ├── DataTable.test.tsx   # Main component tests
│   │       └── CellRenderers.test.tsx # Sub-component tests
│   │
│   └── StatusIndicator/
│       ├── Indicators.tsx
│       ├── Badge.tsx
│       ├── types.ts
│       └── __tests__/
│           └── StatusIndicator.test.tsx
│
├── testing/
│   ├── test-utils.tsx               # Shared utilities
│   └── component.template.test.tsx  # Copy-paste template
│
└── __tests__/
    ├── accessibility.test.tsx       # Global a11y utilities
    ├── tokens.test.ts               # Token system tests
    └── form.test.tsx                # Form utilities tests
```

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Component test | `{ComponentName}.test.tsx` | `Modal.test.tsx` |
| Hook test | `use{HookName}.test.ts` | `useFocusTrap.test.ts` |
| Utility test | `{utilityName}.test.ts` | `tokens.test.ts` |

---

## Component Priority List (Top 10)

Components ranked by **risk score** (complexity × user interaction × accessibility impact):

| Priority | Component | Risk Score | Reason |
|----------|-----------|------------|--------|
| 🔴 1 | **Modal** | 10 | Focus trap, keyboard, ARIA dialog |
| 🔴 2 | **DataTable** | 10 | Grid navigation, selection, sorting |
| 🔴 3 | **TopNavWithSidebar** | 9 | Navigation landmark, keyboard nav |
| 🟠 4 | **FileUpload** | 8 | Keyboard, drag-drop, announcements |
| 🟠 5 | **Toast** | 8 | Live regions, auto-dismiss timing |
| 🟠 6 | **Autocomplete** | 8 | Combobox pattern, keyboard |
| 🟡 7 | **Tabs** | 7 | Tablist/tab roles, arrow keys |
| 🟡 8 | **StatusIndicator** | 6 | Color contrast, non-color cues |
| 🟡 9 | **DatePicker** | 8 | Complex keyboard, grid navigation |
| 🟢 10 | **Button** | 5 | Foundation component, all variants |

### Coverage Goals

| Phase | Target | Timeline |
|-------|--------|----------|
| Phase 1 | Priority 1-3 | Week 1-2 |
| Phase 2 | Priority 4-7 | Week 3-4 |
| Phase 3 | Priority 8-10 | Week 5 |
| Phase 4 | Remaining components | Week 6+ |

---

## Standard Test Template

Use `src/testing/component.template.test.tsx` as the starting point for all new component tests.

### Minimum Required Tests

Every component MUST have:

```typescript
describe('ComponentName', () => {
  // ✅ REQUIRED
  describe('Rendering', () => {
    it('renders without crashing', () => {});
    it('renders with default props', () => {});
  });

  // ✅ REQUIRED
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ✅ REQUIRED for interactive components
  describe('Keyboard Navigation', () => {
    it('is focusable via Tab', () => {});
  });
});
```

---

## Accessibility Testing Requirements

### Automated (axe-core)

Every component must pass an axe audit:

```typescript
import { axe, toHaveNoViolations } from 'vitest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Verification Checklist

| Check | Description |
|-------|-------------|
| **Color contrast** | Text meets 4.5:1 (AA), large text 3:1 |
| **Non-color cues** | Status conveyed by icon/shape, not just color |
| **Focus visible** | Focus ring visible on all interactive elements |
| **Keyboard access** | All functionality available via keyboard |
| **ARIA labels** | Interactive elements have accessible names |
| **Live regions** | Dynamic content announced to screen readers |

---

## Test Utilities

Import from `src/testing/test-utils.tsx`:

```typescript
import {
  // Custom render with theme
  render,
  
  // Accessibility
  expectNoA11yViolations,
  
  // Keyboard helpers
  createKeyboardHelpers,
  
  // Focus assertions
  expectFocused,
  expectInTabOrder,
  
  // ARIA assertions
  expectRole,
  expectAccessibleName,
  expectExpanded,
  
  // Async helpers
  waitForTransition,
} from '../testing/test-utils';
```

### Keyboard Helper Example

```typescript
const { user } = render(<Modal open />);
const kb = createKeyboardHelpers(user);

await kb.tab();       // Tab to next element
await kb.escape();    // Press Escape
await kb.enter();     // Press Enter
await kb.arrowDown(); // Arrow down
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific file
npx vitest run src/components/Modal/__tests__/Modal.test.tsx

# Run tests matching pattern
npx vitest run -t "accessibility"
```

---

## Test Quality Checklist

Before merging a component test:

- [ ] All 7 test categories present (where applicable)
- [ ] Axe accessibility audit passes
- [ ] Keyboard navigation tested
- [ ] All variants/sizes have tests
- [ ] Error states tested
- [ ] Edge cases covered
- [ ] No snapshot tests (prefer explicit assertions)
- [ ] Tests run in < 5 seconds

---

## Anti-Patterns to Avoid

### ❌ Don't

```typescript
// Snapshot tests - brittle, don't test behavior
it('matches snapshot', () => {
  expect(render(<Button />)).toMatchSnapshot();
});

// Testing implementation details
it('has class MuiButton-root', () => {
  expect(button).toHaveClass('MuiButton-root');
});

// Over-mocking
it('renders', () => {
  vi.mock('../Modal'); // Don't mock the component you're testing
});
```

### ✅ Do

```typescript
// Test behavior, not implementation
it('calls onClick when clicked', async () => {
  const onClick = vi.fn();
  const { user } = render(<Button onClick={onClick}>Click</Button>);
  await user.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

// Test accessibility
it('has accessible name', () => {
  render(<Button aria-label="Submit form">Submit</Button>);
  expect(screen.getByRole('button', { name: 'Submit form' })).toBeInTheDocument();
});

// Test user-facing behavior
it('disables button during loading', () => {
  render(<Button loading>Submit</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});
```

---

## CI Integration

Add to GitHub Actions workflow:

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
    - run: npm test -- --coverage
    - uses: codecov/codecov-action@v4
```

---

## Coverage Requirements

| Metric | Minimum | Target |
|--------|---------|--------|
| Statements | 70% | 85% |
| Branches | 65% | 80% |
| Functions | 70% | 85% |
| Lines | 70% | 85% |

---

## Related Documentation

- [Test Utils API](../src/testing/test-utils.tsx)
- [Component Template](../src/testing/component.template.test.tsx)
- [Accessibility Guide](./ARCHITECTURE_AUDIT.md#accessibility)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
