# Component Accessibility Checklist

Use this checklist when creating or reviewing Trinity Design System components.
All items marked **[MANDATORY]** must pass before PR approval.

---

## Pre-Development Planning

- [ ] Identified appropriate ARIA pattern from [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/)
- [ ] Documented expected keyboard interactions
- [ ] Reviewed similar components in design system for consistency
- [ ] Identified required ARIA attributes for the component role

---

## Development Checklist

### Semantic HTML **[MANDATORY]**

- [ ] Uses semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<header>`)
- [ ] Avoids div/span soup - uses appropriate elements
- [ ] Interactive elements use `<button>` or `<a>`, not `<div onClick>`
- [ ] Form elements use `<input>`, `<select>`, `<textarea>`

### ARIA Attributes **[MANDATORY]**

- [ ] Has appropriate `role` if semantic HTML is insufficient
- [ ] Has `aria-label` or `aria-labelledby` for accessible name
- [ ] Has `aria-describedby` for additional context (errors, hints)
- [ ] Dynamic state uses correct ARIA: `aria-expanded`, `aria-selected`, `aria-pressed`
- [ ] Disabled state uses `aria-disabled` alongside `disabled` attribute
- [ ] Loading states communicate to screen readers (`aria-busy`, live regions)

### Keyboard Navigation **[MANDATORY]**

- [ ] Focusable with Tab key
- [ ] Focus indicator clearly visible
- [ ] Activatable with Enter and/or Space
- [ ] Dismissible with Escape (dialogs, menus, popovers)
- [ ] Arrow keys work where expected (menus, tabs, grids)
- [ ] No keyboard traps - user can always tab out
- [ ] Focus order matches visual order

### Focus Management **[MANDATORY]**

- [ ] Focus moves to newly opened content (modals, dialogs)
- [ ] Focus returns to trigger on close
- [ ] Focus trapped in modal dialogs when open
- [ ] Skip links available for navigation components
- [ ] `tabindex="0"` for custom focusable elements
- [ ] `tabindex="-1"` for programmatically focusable elements only

### Color & Contrast **[MANDATORY]**

- [ ] Text has 4.5:1 contrast ratio (3:1 for large text)
- [ ] UI components have 3:1 contrast ratio
- [ ] Focus indicators have 3:1 contrast
- [ ] **Never uses color alone** to convey meaning
- [ ] Status uses icon + text + color (not just color)
- [ ] Works in both light and dark themes

### Screen Reader Support **[MANDATORY]**

- [ ] Content makes sense when read linearly
- [ ] Hidden decorative elements use `aria-hidden="true"`
- [ ] Live regions for dynamic content (`aria-live`)
- [ ] Error messages announced immediately
- [ ] Loading states announced
- [ ] Image alternatives (alt text or `aria-hidden`)

---

## Testing Requirements **[MANDATORY]**

### Automated Tests

```typescript
// 1. axe audit - light mode
it('passes axe audit', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// 2. axe audit - dark mode
it('passes axe audit in dark mode', async () => {
  const { container } = render(<Component />, { theme: 'dark' });
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// 3. Accessible name
it('has accessible name', () => {
  render(<Component aria-label="Descriptive name" />);
  expect(screen.getByRole('...', { name: 'Descriptive name' })).toBeInTheDocument();
});
```

### Keyboard Tests

```typescript
// 4. Tab focus
it('is focusable via Tab', async () => {
  const { user } = render(<Component />);
  await user.tab();
  expect(screen.getByRole('...')).toHaveFocus();
});

// 5. Activation
it('activates with Enter/Space', async () => {
  const onClick = vi.fn();
  const { user } = render(<Component onClick={onClick} />);
  await user.tab();
  await user.keyboard('{Enter}');
  expect(onClick).toHaveBeenCalled();
});

// 6. Escape (for dismissible)
it('closes on Escape', async () => {
  const onClose = vi.fn();
  const { user } = render(<Component open onClose={onClose} />);
  await user.keyboard('{Escape}');
  expect(onClose).toHaveBeenCalled();
});
```

### Manual Tests

- [ ] Tested with VoiceOver (macOS) or NVDA (Windows)
- [ ] Verified focus indicator visibility
- [ ] Checked color contrast with browser devtools
- [ ] Confirmed keyboard-only navigation works end-to-end

---

## Component-Specific Requirements

### Modal / Dialog

- [ ] `role="dialog"` present
- [ ] `aria-labelledby` points to title
- [ ] `aria-describedby` for description (optional)
- [ ] `aria-modal="true"` set
- [ ] Focus trapped when open
- [ ] Focus returns on close
- [ ] Closes on Escape
- [ ] Background content hidden from screen readers

### Menu / Dropdown

- [ ] `role="menu"` with `role="menuitem"` children
- [ ] `aria-expanded` on trigger
- [ ] Arrow key navigation
- [ ] Home/End keys work
- [ ] First/last item focus loops (optional)
- [ ] Escape closes menu
- [ ] Click outside closes menu

### Tabs

- [ ] `role="tablist"` container
- [ ] `role="tab"` for each tab
- [ ] `role="tabpanel"` for content
- [ ] `aria-selected="true"` on active tab
- [ ] Arrow keys navigate tabs
- [ ] Tab key moves to tabpanel content

### Form Controls

- [ ] `<label>` associated via `for`/`id`
- [ ] Error messages use `aria-describedby`
- [ ] Required fields use `aria-required`
- [ ] Invalid fields use `aria-invalid`
- [ ] Autocomplete attribute when applicable

### Data Table / Grid

- [ ] `role="grid"` on table
- [ ] `role="row"` for rows
- [ ] `role="columnheader"` for headers
- [ ] `role="gridcell"` for cells
- [ ] `aria-sort` on sortable columns
- [ ] Arrow key navigation
- [ ] Selection checkboxes labeled

### Toast / Alert

- [ ] `role="alert"` for errors
- [ ] `role="status"` for info/success
- [ ] `aria-live` appropriate politeness
- [ ] Pause auto-dismiss on hover/focus
- [ ] Close button accessible

### Navigation

- [ ] `<nav>` or `role="navigation"`
- [ ] `aria-label` identifies nav purpose
- [ ] `aria-current="page"` on current item
- [ ] Skip link to main content
- [ ] Submenus use `aria-expanded`

---

## Code Review Checklist

### Must Verify

- [ ] All interactive elements keyboard accessible
- [ ] No `tabindex` greater than 0
- [ ] No `outline: none` without replacement focus style
- [ ] Color contrast verified
- [ ] Screen reader tested
- [ ] All tests passing

### Red Flags

❌ `<div onClick>` - Use `<button>` instead
❌ `outline: none` - Provide alternative focus indicator
❌ Color-only status - Add icon and/or text
❌ Missing labels - Add `aria-label` or visible label
❌ `tabindex="2"` - Never use values > 0
❌ Auto-playing media - Provide controls
❌ Time limits - Provide extension mechanism

---

## Resources

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Rules](https://dequeuniversity.com/rules/axe/)
- [Inclusive Components](https://inclusive-components.design/)
- [Trinity ACCESSIBILITY.md](./ACCESSIBILITY.md)
