# Trinity Design System — Governance Model

> **Version**: 1.0.0  
> **Last Updated**: January 2026  
> **Status**: Active

A lightweight but enforceable governance framework for maintaining quality, consistency, and predictable releases.

---

## Table of Contents

1. [Semantic Versioning Rules](#semantic-versioning-rules)
2. [Change Classification Matrix](#change-classification-matrix)
3. [Automated Changelog Strategy](#automated-changelog-strategy)
4. [PR Checklist](#pr-checklist)
5. [Release Workflow](#release-workflow)
6. [Ownership & Roles](#ownership--roles)
7. [Governance Enforcement](#governance-enforcement)

---

## Semantic Versioning Rules

Trinity Design System follows [Semantic Versioning 2.0.0](https://semver.org/) with design-system-specific interpretations.

### Version Format

```
MAJOR.MINOR.PATCH[-prerelease][+build]

Examples:
  1.0.0        → Stable release
  1.1.0        → New features, backward compatible
  1.1.1        → Bug fixes only
  2.0.0-beta.1 → Pre-release for major version
  1.2.0-rc.1   → Release candidate
```

### Version Progression

```
1.0.0 → 1.0.1 (patch)   → Bug fix
1.0.1 → 1.1.0 (minor)   → New component
1.1.0 → 1.1.1 (patch)   → Fix in new component
1.1.1 → 2.0.0 (major)   → Breaking API change
```

---

## Change Classification Matrix

### 🟢 PATCH (x.x.X) — Bug Fixes

Changes that fix incorrect behavior without affecting the API.

| Change Type | Example | Commit Prefix |
|-------------|---------|---------------|
| Visual bug fix | Fix button hover color not matching spec | `fix:` |
| Accessibility fix | Add missing aria-label to icon button | `fix(a11y):` |
| Performance fix | Reduce re-renders in DataTable | `perf:` |
| Documentation typo | Fix code example in Button story | `docs:` |
| Test fix | Fix flaky test in Modal spec | `test:` |
| Dependency patch | Update @mui/material 6.1.0 → 6.1.1 | `chore(deps):` |

**Does NOT include:**
- New props or features
- Changes to default values
- Removal of anything

### 🟡 MINOR (x.X.0) — New Features

Backward-compatible additions that enhance functionality.

| Change Type | Example | Commit Prefix |
|-------------|---------|---------------|
| New component | Add `DatePicker` component | `feat:` |
| New prop (optional) | Add `loading` prop to Button | `feat:` |
| New variant | Add `ghost` variant to Button | `feat:` |
| New token | Add `spacing.2xs` token | `feat(tokens):` |
| New hook | Add `useToast` hook | `feat:` |
| New export | Export `StatusIndicator` subcomponents | `feat:` |
| Deprecation notice | Deprecate `IconIndicator` (still works) | `deprecate:` |
| Dependency minor | Update @mui/material 6.1.x → 6.2.0 | `chore(deps):` |

**Requirements:**
- All existing code continues to work
- New features have default values
- Deprecations include migration path

### 🔴 MAJOR (X.0.0) — Breaking Changes

Changes that require consumers to modify their code.

| Change Type | Example | Commit Prefix |
|-------------|---------|---------------|
| Remove component | Remove deprecated `LegacyButton` | `feat!:` or `BREAKING CHANGE:` |
| Remove prop | Remove `size="xs"` from Button | `feat!:` |
| Rename prop | Rename `isLoading` → `loading` | `feat!:` |
| Change default | Change default `variant` from `filled` to `outlined` | `feat!:` |
| Change token value | Change `borderRadius.md` from 8 → 12 | `feat!:` |
| Remove export | Remove `/legacy` export path | `feat!:` |
| Dependency major | Update MUI 6.x → 7.x | `chore(deps)!:` |
| TypeScript breaking | Narrow prop types, remove `any` | `feat!:` |

**Requirements:**
- Migration guide in release notes
- Codemod if affecting >10 instances
- Minimum 1 minor version deprecation warning
- Announced in #design-system channel

---

## Automated Changelog Strategy

### Conventional Commits → Changelog

We use [Conventional Commits](https://conventionalcommits.org/) with automated changelog generation.

#### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Type Mapping

| Commit Type | Changelog Section | Version Bump |
|-------------|-------------------|--------------|
| `feat` | ✨ Features | Minor |
| `fix` | 🐛 Bug Fixes | Patch |
| `perf` | ⚡ Performance | Patch |
| `docs` | 📚 Documentation | None |
| `style` | 💄 Styling | None |
| `refactor` | ♻️ Refactoring | None |
| `test` | ✅ Tests | None |
| `chore` | 🔧 Maintenance | None |
| `deprecate` | ⚠️ Deprecations | Minor |
| `feat!` / `BREAKING CHANGE` | 💥 Breaking Changes | Major |

#### Scope Examples

```bash
# Component scopes
feat(Button): add loading state
fix(Modal): correct focus trap behavior
feat(StatusIndicator): add differential variant

# System scopes
feat(tokens): add semantic color tokens
fix(a11y): improve screen reader announcements
docs(storybook): add accessibility notes

# Infrastructure scopes
chore(deps): update dependencies
test(DataTable): add sorting tests
ci(release): fix npm publish
```

### Automation Setup

#### 1. Install Dependencies

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
npm install -D standard-version  # or semantic-release
npm install -D husky
```

#### 2. Commitlint Configuration

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'deprecate',
      ],
    ],
    'scope-enum': [
      1, // Warning, not error
      'always',
      [
        // Components
        'Button', 'Modal', 'DataTable', 'StatusIndicator', 'Toast',
        'Alert', 'Card', 'Chip', 'Avatar', 'Menu', 'Tabs',
        // Systems
        'tokens', 'theme', 'a11y', 'navigation', 'AI',
        // Infrastructure
        'deps', 'storybook', 'build', 'ci', 'release',
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'body-max-line-length': [1, 'always', 100],
  },
};
```

#### 3. Husky Pre-commit Hook

```bash
npx husky init
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

#### 4. Release Script

```json
// package.json
{
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major",
    "release:dry": "standard-version --dry-run"
  }
}
```

#### 5. Changelog Configuration

```javascript
// .versionrc.js
module.exports = {
  types: [
    { type: 'feat', section: '✨ Features' },
    { type: 'fix', section: '🐛 Bug Fixes' },
    { type: 'perf', section: '⚡ Performance' },
    { type: 'deprecate', section: '⚠️ Deprecations' },
    { type: 'docs', section: '📚 Documentation', hidden: false },
    { type: 'refactor', section: '♻️ Refactoring', hidden: true },
    { type: 'test', section: '✅ Tests', hidden: true },
    { type: 'chore', section: '🔧 Maintenance', hidden: true },
  ],
  commitUrlFormat: 'https://github.com/your-org/trinity-design-system/commit/{{hash}}',
  compareUrlFormat: 'https://github.com/your-org/trinity-design-system/compare/{{previousTag}}...{{currentTag}}',
};
```

---

## PR Checklist

### Component Contribution Checklist

Every PR adding or modifying components must complete this checklist.

```markdown
## PR Checklist

### 📋 Basics
- [ ] Branch follows naming convention (`feature/`, `fix/`, `docs/`)
- [ ] Commits follow [Conventional Commits](https://conventionalcommits.org/)
- [ ] PR title follows format: `type(scope): description`
- [ ] PR description explains the "why" not just the "what"

### 🧩 Component Quality
- [ ] Component uses Trinity design tokens (not hardcoded values)
- [ ] Component supports both light and dark themes
- [ ] Component is responsive (or explicitly documented as fixed-width)
- [ ] Props are properly typed with TypeScript
- [ ] Default props are sensible and documented
- [ ] Component handles edge cases (empty states, loading, errors)

### ♿ Accessibility (Required)
- [ ] Component is keyboard navigable
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 text, 3:1 UI)
- [ ] Screen reader tested (VoiceOver or NVDA)
- [ ] ARIA attributes are correct and complete
- [ ] No accessibility errors in Storybook a11y addon

### 📖 Documentation (Required)
- [ ] Storybook story created following [template](./STORYBOOK_STANDARDS.md)
- [ ] JSDoc comments on component and props
- [ ] `Playground` story with all controls
- [ ] `AllVariants` story showing visual options
- [ ] Accessibility notes documented

### ✅ Testing (Required)
- [ ] Unit tests for component logic
- [ ] Accessibility tests pass (`npm run test:a11y`)
- [ ] Visual regression baseline updated (if applicable)
- [ ] No TypeScript errors (`npm run typecheck`)

### 🔄 Breaking Changes (if applicable)
- [ ] `BREAKING CHANGE:` in commit footer
- [ ] Migration guide in PR description
- [ ] Deprecation warning added (if replacing existing)
- [ ] Announced in #design-system channel

### 📦 Export & Integration
- [ ] Component exported from appropriate index.ts
- [ ] Subpath export added to package.json (if new module)
- [ ] Tree-shaking verified (no side effects)
```

### PR Template File

Create `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## Description

<!-- Briefly describe what this PR does and why -->

## Type of Change

- [ ] 🐛 Bug fix (patch)
- [ ] ✨ New feature (minor)
- [ ] 💥 Breaking change (major)
- [ ] 📚 Documentation only
- [ ] ♻️ Refactor (no functional change)
- [ ] ✅ Test addition/update

## Related Issues

<!-- Link to related issues: Fixes #123, Closes #456 -->

## Screenshots / Videos

<!-- If UI changes, add before/after screenshots -->

## Checklist

<!-- Copy relevant sections from component checklist above -->

## Testing Instructions

<!-- How can reviewers test this change? -->

1. Run `npm run storybook`
2. Navigate to [Component Name]
3. Verify [specific behavior]
```

---

## Release Workflow

### Text-Based Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TRINITY RELEASE WORKFLOW                              │
└─────────────────────────────────────────────────────────────────────────────┘

  DEVELOPMENT PHASE                    RELEASE PHASE                 POST-RELEASE
  ─────────────────                    ─────────────                 ────────────

  ┌─────────────┐                     ┌─────────────┐
  │  Developer  │                     │   Release   │
  │  creates    │                     │   Manager   │
  │  feature    │                     │   reviews   │
  │  branch     │                     │   queue     │
  └──────┬──────┘                     └──────┬──────┘
         │                                   │
         ▼                                   ▼
  ┌─────────────┐                     ┌─────────────┐
  │   Commits   │                     │  Run        │
  │   follow    │──── Conventional ───│  release    │
  │   format    │     Commits         │  script     │
  └──────┬──────┘                     └──────┬──────┘
         │                                   │
         ▼                                   ▼
  ┌─────────────┐                     ┌─────────────┐               ┌─────────────┐
  │  Open PR    │                     │  Auto-gen   │               │  Notify     │
  │  with       │                     │  CHANGELOG  │───────────────│  consumers  │
  │  checklist  │                     │  + version  │               │  (Slack)    │
  └──────┬──────┘                     └──────┬──────┘               └─────────────┘
         │                                   │
         ▼                                   ▼
  ┌─────────────┐                     ┌─────────────┐               ┌─────────────┐
  │   CI runs   │                     │  Create     │               │  Update     │
  │   • Tests   │                     │  GitHub     │───────────────│  Storybook  │
  │   • Lint    │                     │  Release    │               │  docs site  │
  │   • Types   │                     │  + Tag      │               └─────────────┘
  │   • a11y    │                     └──────┬──────┘
  └──────┬──────┘                            │
         │                                   ▼
         ▼                            ┌─────────────┐               ┌─────────────┐
  ┌─────────────┐                     │  Publish    │               │  Monitor    │
  │  Code       │                     │  to npm     │───────────────│  adoption   │
  │  review     │                     │  registry   │               │  metrics    │
  │  (2 approvals)│                   └─────────────┘               └─────────────┘
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  Merge to   │
  │  main       │────────────────────────────┐
  └─────────────┘                            │
                                             ▼
                                      ┌─────────────┐
                                      │  Accumulate │
                                      │  in release │
                                      │  queue      │
                                      └─────────────┘


  ═══════════════════════════════════════════════════════════════════════════

  RELEASE CADENCE

  ┌──────────────────────────────────────────────────────────────────────────┐
  │  Week 1      │  Week 2      │  Week 3      │  Week 4      │  Week 5     │
  │──────────────│──────────────│──────────────│──────────────│─────────────│
  │  Development │  Development │  Code Freeze │  Release     │  Development│
  │  Sprint      │  Sprint      │  + Testing   │  Day (Tue)   │  Sprint     │
  │              │              │              │              │             │
  │  Features    │  Features    │  Bug fixes   │  v1.X.0      │  Features   │
  │  merged      │  merged      │  only        │  published   │  for next   │
  └──────────────────────────────────────────────────────────────────────────┘

  Patch releases: As needed (critical bugs)
  Minor releases: Every 4 weeks (2nd Tuesday)
  Major releases: Quarterly (with 2-week beta)

  ═══════════════════════════════════════════════════════════════════════════
```

### Release Commands

```bash
# Check what will be released (dry run)
npm run release:dry

# Release patch (1.0.0 → 1.0.1)
npm run release -- --release-as patch

# Release minor (1.0.1 → 1.1.0)  
npm run release:minor

# Release major (1.1.0 → 2.0.0)
npm run release:major

# Pre-release versions
npm run release -- --prerelease beta    # 2.0.0-beta.0
npm run release -- --prerelease rc      # 2.0.0-rc.0

# Publish to npm
npm publish --access public
```

---

## Ownership & Roles

### Role Definitions

| Role | Responsibilities | Count |
|------|------------------|-------|
| **Design System Lead** | Strategy, roadmap, major decisions, conflict resolution | 1 |
| **Core Maintainer** | PR reviews, releases, architecture decisions | 2-3 |
| **Component Owner** | Specific component maintenance, domain expertise | Per component |
| **Contributor** | PRs, bug reports, feature requests | Community |

### CODEOWNERS File

Create `.github/CODEOWNERS`:

```
# Default owners for everything
* @trinity/design-system-core

# Theme and tokens
/src/theme.ts @trinity/design-system-core
/src/tokens.ts @trinity/design-system-core

# Component ownership
/src/components/AI/ @jane-doe @john-smith
/src/components/DataTable/ @data-team
/src/components/Charts/ @data-viz-team
/src/components/StatusIndicator/ @jane-doe

# Documentation
/docs/ @trinity/design-system-core
/src/stories/ @trinity/design-system-core

# CI/CD and releases
/.github/ @trinity/design-system-core
/package.json @trinity/design-system-core
```

### Decision Matrix

| Decision Type | Who Decides | Process |
|---------------|-------------|---------|
| New component addition | Core Maintainers | RFC → Review → Vote |
| API design | Component Owner + 1 Core | PR discussion |
| Breaking change | Design System Lead | RFC + 2-week comment period |
| Bug fix | Any Maintainer | Standard PR |
| Documentation | Any Contributor | Standard PR |
| Dependency update (patch) | Any Maintainer | Standard PR |
| Dependency update (major) | Core Maintainers | RFC if breaking |
| Release timing | Release Manager | Calendar-based |

### Escalation Path

```
Contributor Question/Issue
        │
        ▼
  Component Owner
  (responds within 2 business days)
        │
        ▼ (if unresolved)
  Core Maintainer
  (responds within 3 business days)
        │
        ▼ (if unresolved)
  Design System Lead
  (final decision)
```

---

## Governance Enforcement

### Automated Enforcement

| Check | Tool | Blocking? |
|-------|------|-----------|
| Commit message format | commitlint + husky | ✅ Yes |
| TypeScript types | `tsc --noEmit` | ✅ Yes |
| ESLint rules | eslint | ✅ Yes |
| Test coverage | vitest | ✅ Yes (>80%) |
| Accessibility | @storybook/addon-a11y | ✅ Yes |
| Bundle size | size-limit | ⚠️ Warning |
| PR checklist | GitHub required checks | ✅ Yes |

### CI Pipeline Gates

```yaml
# .github/workflows/ci.yml (excerpt)
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Install
        run: npm ci
        
      - name: Typecheck
        run: npm run typecheck
        
      - name: Lint
        run: npm run lint
        
      - name: Test
        run: npm run test -- --coverage
        
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi
          
      - name: Accessibility audit
        run: npm run test:a11y
        
      - name: Build Storybook
        run: npm run build-storybook
        
      - name: Bundle size check
        run: npm run size-limit

  required-approvals:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - name: Check approvals
        uses: actions/github-script@v7
        with:
          script: |
            const { data: reviews } = await github.rest.pulls.listReviews({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
            });
            const approvals = reviews.filter(r => r.state === 'APPROVED');
            if (approvals.length < 2) {
              core.setFailed('Requires 2 approvals');
            }
```

### Branch Protection Rules

Configure in GitHub Settings → Branches → `main`:

- ✅ Require pull request before merging
- ✅ Require 2 approvals
- ✅ Dismiss stale approvals when new commits are pushed
- ✅ Require review from Code Owners
- ✅ Require status checks to pass (quality job)
- ✅ Require branches to be up to date
- ✅ Require conversation resolution
- ❌ Allow force pushes (disabled)
- ❌ Allow deletions (disabled)

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│                TRINITY GOVERNANCE QUICK REFERENCE               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  VERSION BUMPS                                                  │
│  ─────────────                                                  │
│  PATCH (x.x.X): Bug fixes, docs typos, perf improvements       │
│  MINOR (x.X.0): New features, new props, deprecations          │
│  MAJOR (X.0.0): Breaking changes, removed APIs, renamed props  │
│                                                                 │
│  COMMIT FORMAT                                                  │
│  ─────────────                                                  │
│  feat(Button): add loading prop                                │
│  fix(Modal): correct focus trap                                │
│  feat!: remove deprecated IconIndicator  ← BREAKING            │
│                                                                 │
│  RELEASE SCHEDULE                                               │
│  ────────────────                                               │
│  Patches: As needed (critical bugs)                            │
│  Minors: Every 4 weeks (2nd Tuesday)                           │
│  Majors: Quarterly (2-week beta period)                        │
│                                                                 │
│  PR REQUIREMENTS                                                │
│  ───────────────                                                │
│  • 2 approvals (including 1 CODEOWNER)                         │
│  • All CI checks passing                                       │
│  • Checklist completed                                         │
│  • No unresolved conversations                                 │
│                                                                 │
│  CONTACTS                                                       │
│  ────────                                                       │
│  #design-system (Slack)                                        │
│  design-system@company.com                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Appendix: Governance Documentation Outline

For teams wanting to customize this model:

```
governance/
├── GOVERNANCE.md           ← This file (overview)
├── VERSIONING.md           ← Detailed versioning rules
├── CHANGELOG_GUIDE.md      ← How to write good commit messages
├── PR_TEMPLATE.md          ← Pull request template
├── RFC_TEMPLATE.md         ← Request for Comments template
├── RELEASE_RUNBOOK.md      ← Step-by-step release process
├── ROLES.md                ← Detailed role descriptions
└── ESCALATION.md           ← Issue escalation procedures
```
