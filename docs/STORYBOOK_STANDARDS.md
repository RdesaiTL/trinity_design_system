# Trinity Design System — Storybook Documentation Standards

> **Version**: 1.0.0  
> **Last Updated**: January 2026  
> **Status**: Active

This document defines the canonical structure, naming conventions, and best practices for all Storybook documentation in the Trinity Design System.

---

## Table of Contents

1. [Overview](#overview)
2. [Canonical Story Structure](#canonical-story-structure)
3. [Folder & Naming Conventions](#folder--naming-conventions)
4. [Documentation Gaps Audit](#documentation-gaps-audit)
5. [Migration Recommendation](#migration-recommendation)
6. [Story Template](#story-template)

---

## Overview

### Goals

- **Consistency**: Every component follows the same documentation pattern
- **Discoverability**: Developers can quickly find what they need
- **Completeness**: All variants, props, and accessibility notes documented
- **Maintainability**: Changes to stories are easy and predictable

### Current State Assessment

| Aspect | Current State | Target State |
|--------|---------------|--------------|
| Structure | Mixed (some follow patterns, some don't) | Canonical 6-section format |
| Location | `src/stories/` flat structure | `stories/` at root with categories |
| Naming | Mostly `{Component}.stories.tsx` | Consistent PascalCase with categories |
| autodocs | Partial adoption (~60%) | 100% adoption |
| Accessibility docs | Rarely documented | Every component |
| Do/Don't guidelines | Missing | Required for complex components |

---

## Canonical Story Structure

Every component story **MUST** include these 6 sections in order:

### 1. 📋 Overview (Meta Description)

The JSDoc comment above the `meta` object provides the component overview.

```tsx
/**
 * # ComponentName
 * 
 * Brief description of the component's purpose.
 * 
 * ## When to Use
 * - Use case 1
 * - Use case 2
 * 
 * ## Trinity Design Specs
 * - **Design token reference**: Value (e.g., border-radius: 100px)
 * - **Font**: Specification
 */
```

### 2. 🎛️ Props Table (argTypes)

Define comprehensive `argTypes` with categories:

```tsx
argTypes: {
  variant: {
    control: 'select',
    options: ['contained', 'outlined', 'text'],
    description: 'The visual style variant',
    table: { 
      defaultValue: { summary: 'contained' }, 
      category: 'Appearance' 
    },
  },
  disabled: {
    control: 'boolean',
    description: 'Disables the component',
    table: { category: 'State' },
  },
  onClick: {
    action: 'clicked',
    description: 'Callback when component is clicked',
    table: { category: 'Events' },
  },
}
```

**Standard Categories:**
| Category | Props |
|----------|-------|
| Appearance | variant, color, size, elevation |
| Content | children, label, title, description, icon |
| State | disabled, loading, selected, error |
| Layout | fullWidth, sx, className |
| Events | onClick, onChange, onClose, onSubmit |
| Accessibility | aria-label, role, tabIndex |

### 3. 🎨 Variants (Stories)

Required stories for every component:

```tsx
// Required: Interactive playground
export const Playground: Story = { args: { /* default props */ } };

// Required: Default state
export const Default: Story = { args: { /* minimal props */ } };

// Required: All visual variants
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Component variant="primary" />
      <Component variant="secondary" />
      {/* ... */}
    </Stack>
  ),
};

// Required: All sizes
export const Sizes: Story = { /* ... */ };

// Recommended: States (hover, disabled, loading, error)
export const States: Story = { /* ... */ };

// Recommended: With icons/slots
export const WithIcons: Story = { /* ... */ };

// Context-specific: Real-world usage
export const InContext: Story = { /* ... */ };
```

### 4. ♿ Accessibility Notes

Add accessibility documentation in the meta parameters:

```tsx
parameters: {
  docs: {
    description: {
      component: `
## Accessibility

### Keyboard Navigation
- **Tab**: Moves focus to the component
- **Enter/Space**: Activates the component
- **Escape**: Closes (for modals/menus)

### Screen Reader Support
- Uses \`role="button"\` for interactive elements
- \`aria-label\` provided for icon-only variants
- \`aria-expanded\` for expandable content

### WCAG Compliance
- ✅ 4.5:1 contrast ratio for text
- ✅ 3:1 contrast ratio for UI components
- ✅ Focus indicators visible
`,
    },
  },
  // Enable a11y addon panel
  a11y: {
    config: {
      rules: [
        { id: 'color-contrast', enabled: true },
      ],
    },
  },
},
```

### 5. ✅ Do / ❌ Don't Guidelines

For complex components, add usage guidelines:

```tsx
export const DosDonts: Story = {
  render: () => (
    <Grid container spacing={4}>
      {/* DO Examples */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, border: '2px solid green' }}>
          <Typography variant="h6" color="success.main">✅ Do</Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="body2" gutterBottom>
                Use clear, action-oriented labels
              </Typography>
              <Button>Save Changes</Button>
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Group related actions together
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained">Submit</Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      {/* DON'T Examples */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, border: '2px solid red' }}>
          <Typography variant="h6" color="error.main">❌ Don't</Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="body2" gutterBottom>
                Use vague or generic labels
              </Typography>
              <Button>Click Here</Button>
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Use too many primary buttons
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button variant="contained">Option A</Button>
                <Button variant="contained">Option B</Button>
                <Button variant="contained">Option C</Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Best practices and anti-patterns for this component.',
      },
    },
  },
};
```

### 6. 🔗 Related Components

Document related components in the overview:

```tsx
/**
 * ## Related Components
 * - [Button](/docs/inputs-button--docs) - For primary actions
 * - [IconButton](/docs/inputs-iconbutton--docs) - For icon-only buttons
 * - [ButtonGroup](/docs/inputs-buttongroup--docs) - For grouped buttons
 */
```

---

## Folder & Naming Conventions

### Current Structure (to migrate from)

```
src/
└── stories/
    ├── Button.stories.tsx       # ❌ Flat structure
    ├── Alert.stories.tsx        
    ├── Modal.stories.tsx        
    ├── tokens/                  # ✓ Good: Grouped tokens
    └── utils/                   # ✓ Good: Shared utilities
```

### Target Structure (recommended)

```
stories/                         # 📁 Root level (outside src/)
├── docs/                        # 📚 Documentation-only stories
│   ├── Welcome.mdx
│   ├── GettingStarted.mdx
│   ├── DeveloperGuide.mdx
│   └── Accessibility.mdx
│
├── tokens/                      # 🎨 Design tokens
│   ├── Colors.stories.tsx
│   ├── Typography.stories.tsx
│   ├── Spacing.stories.tsx
│   ├── Shadows.stories.tsx
│   └── Motion.stories.tsx
│
├── components/                  # 🧩 Component stories
│   ├── inputs/
│   │   ├── Button.stories.tsx
│   │   ├── TextField.stories.tsx
│   │   ├── Select.stories.tsx
│   │   └── Switch.stories.tsx
│   │
│   ├── data-display/
│   │   ├── Avatar.stories.tsx
│   │   ├── Chip.stories.tsx
│   │   ├── StatusIndicator.stories.tsx
│   │   └── DataTable.stories.tsx
│   │
│   ├── feedback/
│   │   ├── Alert.stories.tsx
│   │   ├── Modal.stories.tsx
│   │   ├── Toast.stories.tsx
│   │   └── Progress.stories.tsx
│   │
│   ├── navigation/
│   │   ├── Breadcrumbs.stories.tsx
│   │   ├── Menu.stories.tsx
│   │   ├── Tabs.stories.tsx
│   │   └── TopNavHeader.stories.tsx
│   │
│   ├── layout/
│   │   ├── Grid.stories.tsx
│   │   ├── Layout.stories.tsx
│   │   └── AppLayout.stories.tsx
│   │
│   └── surfaces/
│       ├── Card.stories.tsx
│       ├── Accordion.stories.tsx
│       └── Paper.stories.tsx
│
├── patterns/                    # 🔄 Composite patterns
│   ├── Forms.stories.tsx
│   ├── DataEntry.stories.tsx
│   └── EmptyStates.stories.tsx
│
├── visualization/               # 📊 Charts & data viz
│   ├── Charts.stories.tsx
│   ├── Sparkline.stories.tsx
│   └── Gauges.stories.tsx
│
└── utils/                       # 🛠️ Shared story utilities
    ├── index.ts
    ├── storyHelpers.tsx
    └── decorators.tsx
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Story files | `{ComponentName}.stories.tsx` | `Button.stories.tsx` |
| Story titles | `{Category}/{ComponentName}` | `Inputs/Button` |
| Story names | PascalCase, descriptive | `WithStartIcon`, `AllVariants` |
| Meta ID | lowercase hyphenated | `inputs-button` |
| MDX docs | `{Topic}.mdx` | `GettingStarted.mdx` |

### Story Title Hierarchy

```tsx
// Level 1: Category
title: 'Inputs/Button'           // → Inputs > Button

// Level 2: Subcategory (optional)
title: 'Inputs/Selection/Checkbox' // → Inputs > Selection > Checkbox

// Documentation
title: 'Docs/Getting Started'    // → Docs > Getting Started
```

---

## Documentation Gaps Audit

### Components Missing Stories

| Component | Location | Priority | Notes |
|-----------|----------|----------|-------|
| ResizablePanel | AppLayout/ | Medium | Needs interactive demo |
| InsightEnginePanel | AppLayout/ | Medium | Complex AI integration |
| CustomLegend | Charts/ | Low | Internal component |
| CustomTooltip | Charts/ | Low | Internal component |

### Stories Missing Sections

| Story File | Missing Sections |
|------------|------------------|
| Accordion.stories.tsx | Accessibility, Do/Don't |
| Avatar.stories.tsx | Accessibility notes |
| Breadcrumbs.stories.tsx | Do/Don't guidelines |
| Card.stories.tsx | Accessibility, Sizes |
| Chip.stories.tsx | Accessibility notes |
| DateTime.stories.tsx | Do/Don't, A11y |
| Grid.stories.tsx | Real-world examples |
| Icons.stories.tsx | Accessibility notes |
| Menu.stories.tsx | Keyboard navigation docs |
| Rating.stories.tsx | A11y notes |
| SelectionGroups.stories.tsx | Do/Don't |
| Slider.stories.tsx | A11y keyboard controls |
| Tabs.stories.tsx | A11y notes |
| TextField.stories.tsx | Error states, A11y |
| Tooltip.stories.tsx | A11y notes |

### Stories with Inconsistent Structure

| Story File | Issue |
|------------|-------|
| tokens/ColorPalette.stories.tsx | Uses default export pattern |
| AI.stories.tsx | Missing playground story |
| Charts.stories.tsx | No individual chart stories |
| StatusIndicator.stories.tsx | Legacy (superseded by Unified) |

### Recommended Additions

1. **Interaction Testing Stories** - Add `play` functions for user interaction tests
2. **Responsive Stories** - Show component behavior at different viewports
3. **Theme Comparison Stories** - Side-by-side light/dark mode
4. **Integration Stories** - Show components working together

---

## Migration Recommendation

### Why Move Stories Outside `src/`

| Benefit | Explanation |
|---------|-------------|
| **Cleaner Build Output** | Stories won't be bundled in production library |
| **Faster Builds** | Tree-shaking doesn't need to exclude stories |
| **Clearer Separation** | Documentation vs. source code distinction |
| **CI/CD Optimization** | Can run story tests separately from unit tests |
| **Standard Practice** | Aligns with Storybook community conventions |

### Migration Steps

#### Phase 1: Preparation (1 hour)

1. **Update `.storybook/main.ts`**:
```ts
const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  // ... rest of config
};
```

2. **Update TypeScript config** (`tsconfig.json`):
```json
{
  "include": ["src", "stories"],
  "exclude": ["stories/**/*.stories.tsx"]  // Exclude from lib build
}
```

3. **Create new folder structure**:
```bash
mkdir -p stories/{docs,tokens,components/{inputs,data-display,feedback,navigation,layout,surfaces},patterns,visualization,utils}
```

#### Phase 2: Migration (2-4 hours)

4. **Move utility files first**:
```bash
mv src/stories/utils/* stories/utils/
```

5. **Move token stories**:
```bash
mv src/stories/tokens/* stories/tokens/
```

6. **Move component stories by category**:
```bash
# Example for inputs
mv src/stories/Button.stories.tsx stories/components/inputs/
mv src/stories/TextField.stories.tsx stories/components/inputs/
mv src/stories/Switch.stories.tsx stories/components/inputs/
# ... etc
```

7. **Update imports in moved files**:
```tsx
// Before (from src/stories/)
import { Button } from '../components/Button';

// After (from stories/components/inputs/)
import { Button } from '../../../src/components/Button';
// OR use path alias
import { Button } from '@/components/Button';
```

#### Phase 3: Validation (1 hour)

8. **Run Storybook locally**:
```bash
npm run storybook
```

9. **Verify all stories load correctly**

10. **Run Chromatic/visual regression tests**

11. **Update CI/CD pipelines** if necessary

#### Phase 4: Cleanup

12. **Remove old `src/stories/` directory**
13. **Update documentation references**
14. **Commit migration**:
```bash
git add -A
git commit -m "chore(stories): migrate stories to root-level directory

BREAKING CHANGE: Stories moved from src/stories/ to stories/
- Cleaner production builds
- Better separation of concerns
- Standard Storybook convention

Migration guide: docs/STORYBOOK_STANDARDS.md"
```

### Path Aliases (Recommended)

Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@stories/*": ["./stories/*"]
    }
  }
}
```

Add to `vite.config.ts`:
```ts
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@stories': path.resolve(__dirname, './stories'),
    },
  },
});
```

---

## Story Template

See the companion file: `stories/utils/ComponentTemplate.stories.tsx`

Usage:
1. Copy the template
2. Replace `ComponentName` with your component name
3. Update category in title
4. Fill in documentation sections
5. Add component-specific stories

---

## Checklist for New Stories

- [ ] Overview with JSDoc comment
- [ ] `tags: ['autodocs']` enabled
- [ ] Props table with categories
- [ ] `Playground` story with all controls
- [ ] `Default` story with minimal props
- [ ] `AllVariants` story showing all visual variants
- [ ] `Sizes` story (if applicable)
- [ ] `States` story (disabled, loading, error)
- [ ] Accessibility documentation
- [ ] `DosDonts` story (for complex components)
- [ ] Related components linked
- [ ] Real-world usage example

---

## Resources

- [Storybook Docs](https://storybook.js.org/docs)
- [Component Story Format (CSF)](https://storybook.js.org/docs/api/csf)
- [MDX Documentation](https://storybook.js.org/docs/writing-docs/mdx)
- [Accessibility Testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)
