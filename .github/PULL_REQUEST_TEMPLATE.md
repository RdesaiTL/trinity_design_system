## Description

<!-- Briefly describe what this PR does and why -->

## Type of Change

- [ ] 🐛 Bug fix (patch version bump)
- [ ] ✨ New feature (minor version bump)
- [ ] 💥 Breaking change (major version bump)
- [ ] 📚 Documentation only (no version bump)
- [ ] ♻️ Refactor (no functional change)
- [ ] ✅ Test addition/update
- [ ] 🔧 Build/CI configuration

## Related Issues

<!-- Link to related issues: Fixes #123, Closes #456 -->

Fixes #

## Screenshots / Videos

<!-- If UI changes, add before/after screenshots or a video -->

| Before | After |
|--------|-------|
|        |       |

---

## Checklist

### 📋 Basics
- [ ] Branch follows naming convention (`feature/`, `fix/`, `docs/`, `refactor/`)
- [ ] Commits follow [Conventional Commits](https://conventionalcommits.org/)
- [ ] PR title follows format: `type(scope): description`

### 🧩 Component Quality (if adding/modifying components)
- [ ] Uses Trinity design tokens (not hardcoded colors/spacing)
- [ ] Supports both light and dark themes
- [ ] Props are properly typed with TypeScript
- [ ] Default props are sensible and documented
- [ ] Handles edge cases (empty states, loading, errors)

### ♿ Accessibility
- [ ] Component is keyboard navigable
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 text, 3:1 UI)
- [ ] ARIA attributes are correct
- [ ] No errors in Storybook a11y addon panel

### 📖 Documentation
- [ ] Storybook story follows [documentation standards](docs/STORYBOOK_STANDARDS.md)
- [ ] JSDoc comments on component and props
- [ ] `Playground` story with interactive controls
- [ ] Accessibility notes documented

### ✅ Testing
- [ ] Unit tests added/updated
- [ ] All tests passing (`npm test`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No lint errors (`npm run lint`)

### 🔄 Breaking Changes (if applicable)
- [ ] `BREAKING CHANGE:` footer in commit message
- [ ] Migration guide included below
- [ ] Deprecation warning added in previous version
- [ ] Announced in #design-system Slack channel

---

## Testing Instructions

<!-- How can reviewers test this change? -->

1. Run `npm install` (if dependencies changed)
2. Run `npm run storybook`
3. Navigate to **[Component Name]** in sidebar
4. Verify:
   - [ ] Specific behavior 1
   - [ ] Specific behavior 2

---

## Migration Guide (for breaking changes)

<!-- If this is a breaking change, provide migration steps -->

```diff
// Before
- <OldComponent prop="value" />

// After
+ <NewComponent newProp="value" />
```

---

## Additional Notes

<!-- Any additional context, concerns, or notes for reviewers -->
