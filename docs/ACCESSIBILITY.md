# Trinity Design System — Accessibility Guide

## WCAG 2.1 AA Compliance

This document defines the accessibility standards, testing requirements, and enforcement mechanisms for the Trinity Design System. All components **must** meet WCAG 2.1 Level AA compliance.

---

## Table of Contents

1. [WCAG Coverage Matrix](#wcag-coverage-matrix)
2. [Silent Failure Risks](#silent-failure-risks)
3. [Automated Testing Requirements](#automated-testing-requirements)
4. [Component-Specific Requirements](#component-specific-requirements)
5. [Keyboard Navigation Patterns](#keyboard-navigation-patterns)
6. [Screen Reader Support](#screen-reader-support)
7. [Color & Contrast](#color--contrast)
8. [New Component Checklist](#new-component-checklist)
9. [Testing Tools & Resources](#testing-tools--resources)

---

## WCAG Coverage Matrix

### Perceivable (1.x)

| Criterion | Level | Requirement | Testable |
|-----------|-------|-------------|----------|
| 1.1.1 Non-text Content | A | All images have alt text | ✅ axe |
| 1.3.1 Info and Relationships | A | Semantic HTML, ARIA roles | ✅ axe |
| 1.3.2 Meaningful Sequence | A | DOM order matches visual order | ⚠️ Manual |
| 1.4.1 Use of Color | A | Color not sole indicator | ⚠️ Manual |
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 text, 3:1 large text | ✅ axe |
| 1.4.4 Resize Text | AA | 200% zoom without loss | ⚠️ Manual |
| 1.4.11 Non-text Contrast | AA | 3:1 for UI components | ✅ axe |

### Operable (2.x)

| Criterion | Level | Requirement | Testable |
|-----------|-------|-------------|----------|
| 2.1.1 Keyboard | A | All functionality via keyboard | ✅ Unit tests |
| 2.1.2 No Keyboard Trap | A | Focus can leave all components | ✅ Unit tests |
| 2.4.1 Bypass Blocks | A | Skip links available | ✅ axe |
| 2.4.3 Focus Order | A | Logical focus sequence | ✅ Unit tests |
| 2.4.4 Link Purpose | A | Link text is descriptive | ✅ axe |
| 2.4.6 Headings and Labels | AA | Descriptive headings | ✅ axe |
| 2.4.7 Focus Visible | AA | Focus indicator visible | ✅ Unit tests |

### Understandable (3.x)

| Criterion | Level | Requirement | Testable |
|-----------|-------|-------------|----------|
| 3.1.1 Language of Page | A | `lang` attribute present | ✅ axe |
| 3.2.1 On Focus | A | No unexpected changes | ✅ Unit tests |
| 3.2.2 On Input | A | Predictable behavior | ✅ Unit tests |
| 3.3.1 Error Identification | A | Errors clearly identified | ✅ axe |
| 3.3.2 Labels or Instructions | A | Form fields labeled | ✅ axe |

### Robust (4.x)

| Criterion | Level | Requirement | Testable |
|-----------|-------|-------------|----------|
| 4.1.1 Parsing | A | Valid HTML | ✅ axe |
| 4.1.2 Name, Role, Value | A | ARIA attributes valid | ✅ axe |

---

## Silent Failure Risks

### ⚠️ Failures That Can Occur Without Automated Detection

| Risk | WCAG | Impact | Current Gap |
|------|------|--------|-------------|
| **Missing focus trap in modals** | 2.1.2 | Users can tab outside modal | No auto-detection |
| **Color-only status indicators** | 1.4.1 | Color blind users can't distinguish | Manual review only |
| **Missing live region for toasts** | 4.1.3 | Screen readers miss notifications | No auto-detection |
| **Incorrect heading hierarchy** | 1.3.1 | Navigation confusion | Partially detectable |
| **Focus order doesn't match visual order** | 2.4.3 | Keyboard users get lost | Manual review only |
| **Interactive elements without accessible names** | 4.1.2 | Screen readers say "button" | Detectable but often missed |
| **Keyboard traps in complex widgets** | 2.1.2 | Users stuck in component | Requires interaction tests |
| **Missing skip links** | 2.4.1 | Keyboard users traverse all nav | Detectable |
| **Auto-playing media without controls** | 1.4.2 | Users can't stop audio | Manual review |
| **Time-based dismissal without extension** | 2.2.1 | Users can't read content | No auto-detection |

### How We Address These Gaps

| Gap | Solution |
|-----|----------|
| Focus trap | `useFocusTrap` hook + mandatory unit tests |
| Color indicators | StatusIndicator always includes shape/text |
| Live regions | `useAriaLive` hook + Toast tests |
| Heading hierarchy | axe-core `heading-order` rule |
| Focus order | Keyboard navigation tests |
| Accessible names | axe-core `button-name`, `link-name` rules |
| Keyboard traps | `useFocusTrap` with Escape handler |
| Skip links | `SkipLink` component in layouts |
| Toast timing | Configurable duration, pause on hover |

---

## Automated Testing Requirements

### Required Tests Per Component Type

```
┌─────────────────────────────────────────────────────────────────┐
│                    MANDATORY TEST PYRAMID                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                         ┌─────────┐                             │
│                         │ E2E     │  Storybook a11y addon       │
│                         │ Tests   │  Visual regression          │
│                         └────┬────┘                             │
│                              │                                  │
│                    ┌─────────┴─────────┐                        │
│                    │  Integration      │  Component + context    │
│                    │  Tests            │  Theme switching        │
│                    └─────────┬─────────┘                        │
│                              │                                  │
│          ┌───────────────────┴───────────────────┐              │
│          │         Unit Tests                    │              │
│          │  axe audit | keyboard | ARIA | focus  │              │
│          └───────────────────────────────────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Minimum Test Coverage

Every component MUST include:

```typescript
describe('Accessibility', () => {
  // 1. MANDATORY: Automated axe audit
  it('has no accessibility violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // 2. MANDATORY: Dark mode audit
  it('has no accessibility violations in dark mode', async () => {
    const { container } = render(<Component />, { theme: 'dark' });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // 3. MANDATORY: Accessible name verification
  it('has accessible name', () => {
    render(<Component aria-label="Descriptive name" />);
    expect(screen.getByRole('...', { name: 'Descriptive name' })).toBeInTheDocument();
  });
});

describe('Keyboard Navigation', () => {
  // 4. MANDATORY for interactive components
  it('is focusable via Tab', async () => {
    const { user } = render(<Component />);
    await user.tab();
    expect(screen.getByRole('...')).toHaveFocus();
  });

  // 5. MANDATORY for interactive components
  it('can be activated with Enter/Space', async () => {
    const onClick = vi.fn();
    const { user } = render(<Component onClick={onClick} />);
    await user.tab();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });
});
```

---

## Component-Specific Requirements

### Modal / Dialog

| Requirement | WCAG | Test |
|-------------|------|------|
| Has `role="dialog"` | 4.1.2 | `expect(modal).toHaveAttribute('role', 'dialog')` |
| Has `aria-labelledby` pointing to title | 4.1.2 | Verify ID relationship |
| Has `aria-describedby` for content | 4.1.2 | Verify ID relationship |
| Focus trapped inside when open | 2.1.2 | Tab cycling test |
| Closes on Escape | 2.1.1 | Keyboard test |
| Returns focus on close | 2.4.3 | Focus restoration test |
| No accessibility violations | All | axe audit |

```typescript
// Modal Test Requirements
describe('Modal Accessibility', () => {
  it('has dialog role', () => {
    render(<Modal open title="Test" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-labelledby', () => {
    render(<Modal open title="Test Title" />);
    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(document.getElementById(labelId!)).toHaveTextContent('Test Title');
  });

  it('traps focus', async () => {
    const { user } = render(
      <Modal open title="Test">
        <button>First</button>
        <button>Last</button>
      </Modal>
    );
    
    // Tab from last to first (wrap)
    screen.getByText('Last').focus();
    await user.tab();
    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus();
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn();
    const { user } = render(<Modal open onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('returns focus on close', async () => {
    const Wrapper = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Open</button>
          <Modal open={open} onClose={() => setOpen(false)} />
        </>
      );
    };
    
    const { user } = render(<Wrapper />);
    const openButton = screen.getByText('Open');
    await user.click(openButton);
    await user.keyboard('{Escape}');
    expect(openButton).toHaveFocus();
  });
});
```

### Toast / Notification

| Requirement | WCAG | Test |
|-------------|------|------|
| Has `role="alert"` or live region | 4.1.3 | Role assertion |
| Has `aria-live="polite"` or `"assertive"` | 4.1.3 | Attribute check |
| Pause auto-dismiss on hover/focus | 2.2.1 | Interaction test |
| Dismissible via keyboard | 2.1.1 | Keyboard test |
| Accessible close button | 4.1.2 | Name assertion |

```typescript
describe('Toast Accessibility', () => {
  it('has alert role for errors', () => {
    render(<Toast severity="error" message="Error occurred" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('has status role for info', () => {
    render(<Toast severity="info" message="Information" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-live attribute', () => {
    render(<Toast severity="success" message="Success" />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });

  it('pauses auto-dismiss on hover', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const { user } = render(
      <Toast message="Test" autoHideDuration={3000} onClose={onClose} />
    );
    
    await user.hover(screen.getByRole('status'));
    vi.advanceTimersByTime(5000);
    expect(onClose).not.toHaveBeenCalled();
    
    vi.useRealTimers();
  });

  it('close button has accessible name', () => {
    render(<Toast message="Test" onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /close|dismiss/i })).toBeInTheDocument();
  });
});
```

### Navigation (TopNav, Sidebar)

| Requirement | WCAG | Test |
|-------------|------|------|
| Has `role="navigation"` or `<nav>` | 1.3.1 | Element/role check |
| Has `aria-label` identifying nav purpose | 4.1.2 | Attribute check |
| Current page indicated with `aria-current` | 4.1.2 | Attribute check |
| Skip link targets main content | 2.4.1 | Skip link test |
| Keyboard navigable | 2.1.1 | Arrow key tests |
| Submenu has `aria-expanded` | 4.1.2 | State attribute |

```typescript
describe('Navigation Accessibility', () => {
  it('uses nav element or navigation role', () => {
    render(<TopNavWithSidebar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has aria-label for navigation purpose', () => {
    render(<TopNavWithSidebar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label');
  });

  it('marks current page with aria-current', () => {
    render(<TopNavWithSidebar currentPath="/dashboard" />);
    const currentLink = screen.getByRole('link', { name: /dashboard/i });
    expect(currentLink).toHaveAttribute('aria-current', 'page');
  });

  it('skip link moves focus to main content', async () => {
    const { user } = render(<TopNavWithSidebar />);
    await user.tab(); // Focus skip link
    await user.keyboard('{Enter}');
    expect(document.getElementById('main-content')).toHaveFocus();
  });

  it('submenu indicates expanded state', async () => {
    const { user } = render(<Navigation items={menuWithSubmenu} />);
    const menuButton = screen.getByRole('button', { name: /settings/i });
    
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });
});
```

### DataTable

| Requirement | WCAG | Test |
|-------------|------|------|
| Has `role="grid"` | 4.1.2 | Role assertion |
| Column headers have `role="columnheader"` | 4.1.2 | Role assertion |
| Sortable columns have `aria-sort` | 4.1.2 | State attribute |
| Checkboxes have accessible labels | 4.1.2 | Name assertion |
| Keyboard navigation (arrows, Home, End) | 2.1.1 | Keyboard tests |
| Row actions accessible via keyboard | 2.1.1 | Keyboard test |
| Loading state announced | 4.1.3 | Live region test |

```typescript
describe('DataTable Accessibility', () => {
  it('has grid role', () => {
    render(<DataTable columns={columns} rows={rows} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('has columnheader roles', () => {
    render(<DataTable columns={columns} rows={rows} />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(columns.length);
  });

  it('sortable columns have aria-sort', async () => {
    const { user } = render(<DataTable columns={columns} rows={rows} />);
    const header = screen.getByText('Name');
    
    await user.click(header);
    const columnHeader = header.closest('[role="columnheader"]');
    expect(columnHeader).toHaveAttribute('aria-sort', 'ascending');
  });

  it('selection checkboxes have accessible labels', () => {
    render(<DataTable columns={columns} rows={rows} checkboxSelection />);
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(cb => {
      expect(cb).toHaveAccessibleName();
    });
  });

  it('supports arrow key navigation', async () => {
    const { user } = render(<DataTable columns={columns} rows={rows} />);
    
    await user.tab(); // Enter grid
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowRight}');
    
    // Verify focus moved
    expect(document.activeElement?.closest('[role="gridcell"]')).toBeInTheDocument();
  });

  it('announces loading state', async () => {
    render(<DataTable columns={columns} rows={[]} loading />);
    expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
  });
});
```

---

## Keyboard Navigation Patterns

### Standard Patterns by Component Type

| Component | Tab | Enter/Space | Escape | Arrows |
|-----------|-----|-------------|--------|--------|
| Button | Focus | Activate | — | — |
| Link | Focus | Navigate | — | — |
| Modal | Focus first | Activate buttons | Close | — |
| Menu | Focus menu | Activate item | Close | Navigate items |
| Tabs | Focus tab list | Select tab | — | Navigate tabs |
| Grid/Table | Enter grid | Activate cell | Exit grid | Navigate cells |
| Combobox | Focus input | Open/select | Close | Navigate options |
| Tree | Focus tree | Expand/collapse | — | Navigate nodes |

### Required Keyboard Tests

```typescript
// Create keyboard helper for all tests
const keyboard = {
  tab: () => userEvent.tab(),
  shiftTab: () => userEvent.tab({ shift: true }),
  enter: () => userEvent.keyboard('{Enter}'),
  space: () => userEvent.keyboard(' '),
  escape: () => userEvent.keyboard('{Escape}'),
  arrowDown: () => userEvent.keyboard('{ArrowDown}'),
  arrowUp: () => userEvent.keyboard('{ArrowUp}'),
  arrowLeft: () => userEvent.keyboard('{ArrowLeft}'),
  arrowRight: () => userEvent.keyboard('{ArrowRight}'),
  home: () => userEvent.keyboard('{Home}'),
  end: () => userEvent.keyboard('{End}'),
};
```

---

## Screen Reader Support

### ARIA Patterns Used

| Pattern | Components | Key Attributes |
|---------|------------|----------------|
| Dialog | Modal, ConfirmDialog | `role="dialog"`, `aria-labelledby`, `aria-describedby`, `aria-modal` |
| Alert | Toast (error) | `role="alert"`, `aria-live="assertive"` |
| Status | Toast (info/success) | `role="status"`, `aria-live="polite"` |
| Menu | Dropdown, ContextMenu | `role="menu"`, `role="menuitem"`, `aria-expanded` |
| Tablist | Tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` |
| Grid | DataTable | `role="grid"`, `role="row"`, `role="gridcell"`, `aria-sort` |
| Navigation | TopNav, Sidebar | `role="navigation"`, `aria-current`, `aria-label` |
| Combobox | Autocomplete | `role="combobox"`, `role="listbox"`, `aria-expanded`, `aria-activedescendant` |

### Live Region Usage

```typescript
// Use for dynamic content announcements
const { announce, ariaProps } = useAriaLive({ politeness: 'polite' });

// Announce on data load
useEffect(() => {
  if (data) {
    announce(`Loaded ${data.length} items`);
  }
}, [data]);

// Announce on error
useEffect(() => {
  if (error) {
    announce(`Error: ${error.message}`, { politeness: 'assertive' });
  }
}, [error]);
```

---

## Color & Contrast

### Minimum Requirements

| Element | Ratio | Notes |
|---------|-------|-------|
| Normal text (< 18px) | 4.5:1 | Against background |
| Large text (≥ 18px or 14px bold) | 3:1 | Against background |
| UI components | 3:1 | Borders, icons, focus indicators |
| Focus indicators | 3:1 | Against adjacent colors |

### Non-Color Indicators

**Never use color alone to convey meaning:**

```tsx
// ❌ BAD: Color-only status
<span style={{ color: 'red' }}>Error</span>

// ✅ GOOD: Color + icon + text
<StatusIndicator status="error" />
// Renders: 🔴 ❌ Error (icon, shape, text)
```

---

## New Component Checklist

### Pre-Development

- [ ] Identify appropriate ARIA pattern (dialog, menu, grid, etc.)
- [ ] Determine keyboard interaction model
- [ ] Review similar components in WAI-ARIA Authoring Practices
- [ ] Document accessibility requirements

### Development

- [ ] Use semantic HTML elements (`<button>`, `<nav>`, `<main>`)
- [ ] Add required ARIA attributes
- [ ] Implement keyboard handlers
- [ ] Ensure focus management
- [ ] Test with screen reader
- [ ] Test with keyboard only
- [ ] Verify color contrast

### Testing (Mandatory)

- [ ] axe audit test (light mode)
- [ ] axe audit test (dark mode)
- [ ] Tab navigation test
- [ ] Enter/Space activation test
- [ ] Escape dismissal test (if dismissible)
- [ ] Arrow key navigation test (if navigable)
- [ ] Focus visible test
- [ ] Accessible name test

### Code Review

- [ ] No color-only indicators
- [ ] All interactive elements focusable
- [ ] ARIA attributes valid
- [ ] Keyboard handlers complete
- [ ] Tests pass
- [ ] axe violations = 0

---

## Testing Tools & Resources

### Automated Tools

| Tool | Purpose | Integration |
|------|---------|-------------|
| **axe-core** | DOM accessibility audit | vitest-axe |
| **Storybook a11y addon** | Visual a11y panel | @storybook/addon-a11y |
| **eslint-plugin-jsx-a11y** | Lint-time checks | ESLint config |
| **Lighthouse** | Page-level audit | CI/CD |

### Manual Testing Tools

| Tool | Purpose |
|------|---------|
| **VoiceOver** (macOS) | Screen reader testing |
| **NVDA** (Windows) | Screen reader testing |
| **axe DevTools** | Browser extension |
| **WAVE** | Browser extension |
| **Contrast Checker** | Color ratio verification |

### Resources

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

## Reporting Accessibility Issues

When reporting an accessibility issue:

1. **WCAG Criterion**: Which guideline is violated?
2. **Impact**: Who is affected and how?
3. **Steps to Reproduce**: How to encounter the issue
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What happens now
6. **Assistive Technology**: Screen reader, browser, OS used

Example:

```markdown
## Accessibility Issue: Modal Focus Trap Missing

**WCAG Criterion**: 2.1.2 No Keyboard Trap
**Impact**: Keyboard users can tab outside modal, losing context
**Steps**: 
1. Open modal
2. Tab repeatedly
3. Focus leaves modal
**Expected**: Focus should cycle within modal
**Actual**: Focus escapes to page behind modal
**Environment**: VoiceOver, Safari 17, macOS Sonoma
```
