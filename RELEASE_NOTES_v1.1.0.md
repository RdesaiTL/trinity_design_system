# Trinity Design System v1.1.0 Release Notes

**Release Date:** January 6, 2026  
**Tag:** `v1.1.0`  
**Commit:** `2dc68f5`

---

## 🎉 Release Highlights

This release introduces a **complete semantic token system**, the **LandingPage template**, and an **83-asset brand library** - providing engineers with everything needed to build consistent, accessible, and on-brand Trinity applications.

---

## 📦 What's New

### 1. Semantic Token System (200+ Tokens)

A structured design token hierarchy that enforces consistency across all applications.

```typescript
import { baseTokens, semanticTokens } from '@trinity/design-system';

// ✅ Preferred: Use semantic tokens for component styling
backgroundColor: semanticTokens.background.surface
color: semanticTokens.text.primary
borderRadius: semanticTokens.borders.radius.card
```

#### New Token Categories

| Category | Purpose | Example |
|----------|---------|---------|
| `effects.overlay` | Backdrop and state overlays | `effects.overlay.scrim` (modal backdrop) |
| `effects.onDark` | Text on dark backgrounds | `effects.onDark.primary` (87% white) |
| `effects.shadow` | Elevation shadows | `effects.shadow.floating` (dropdowns) |
| `effects.focus` | Focus ring styles | `effects.focus.ring` |
| `effects.state` | State backgrounds | `effects.state.success.subtle` |
| `typography.dense` | Compact UI text | `typography.dense.body`, `typography.dense.caption` |

### 2. LandingPage Template

A complete landing page solution with hero section and feature cards.

```tsx
import { LandingPage } from '@trinity/design-system';
import { gradientIcons, brandGradients } from '@trinity/design-system/assets';

const features = [
  {
    id: 'ai',
    icon: gradientIcons.ai,
    title: 'AI Research',
    description: 'Powerful AI-driven insights',
    variant: 'navy',
    onClick: () => navigate('/research'),
  },
];

<LandingPage
  heroTitle="Welcome to Trinity"
  heroSubtitle="Transform your workflow"
  backgroundImage={brandGradients.light[0]}
  features={features}
  columns={3}
/>
```

### 3. Asset Library (83 Assets)

| Category | Count | Import |
|----------|-------|--------|
| Gradient Icons | 20 | `gradientIcons.ai`, `gradientIcons.market` |
| Light Gradients | 10 | `brandGradients.light[0-9]` |
| Dark Gradients | 8 | `brandGradients.dark[0-7]` |
| Smooth Abstract | 14 | `backgroundImages.smoothAbstract[0-13]` |
| Technology/Human | 13 | `backgroundImages.technologyHuman[0-12]` |
| Illustrations | 18 | `illustrations.collaboration`, etc. |

```tsx
import { 
  gradientIcons, 
  brandGradients, 
  backgroundImages,
  illustrations 
} from '@trinity/design-system/assets';
```

### 4. New Components

#### Combobox (Replaces Autocomplete)
```tsx
import { Combobox } from '@trinity/design-system';

<Combobox
  options={options}
  multiple
  creatable
  placeholder="Select tags..."
  onChange={handleChange}
/>
```

#### Footer
```tsx
import { Footer } from '@trinity/design-system';

<Footer variant="dark" companyName="Trinity LifeSciences" />
```

#### FeatureCard
```tsx
import { FeatureCard } from '@trinity/design-system';

<FeatureCard
  icon={gradientIcons.strategy}
  title="Strategy"
  description="Build winning strategies"
  variant="navy"  // or "white"
/>
```

---

## 🚀 Quick Start for Engineers

### Installation

```bash
npm install @trinity/design-system@1.1.0
```

### Basic Setup

```tsx
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '@trinity/design-system';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Import Patterns

```tsx
// Components
import { 
  Button, 
  DataTable, 
  StatusIndicator,
  LandingPage,
  Combobox,
  Footer 
} from '@trinity/design-system';

// Tokens
import { baseTokens, semanticTokens, brandColors } from '@trinity/design-system';

// Assets
import { gradientIcons, brandGradients, backgroundImages } from '@trinity/design-system/assets';

// Themes
import { lightTheme, darkTheme, accessibleCombinations } from '@trinity/design-system';
```

---

## ✅ DO's - Best Practices

### 1. Use Semantic Tokens for All Styling

```tsx
// ✅ DO: Use semantic tokens
<Box sx={{
  backgroundColor: semanticTokens.background.surface,
  color: semanticTokens.text.primary,
  borderRadius: semanticTokens.borders.radius.card,
  padding: semanticTokens.spacing.card.padding,
  boxShadow: semanticTokens.shadows.card,
}}>

// ✅ DO: Use theme spacing
<Stack spacing={2}>  // Uses theme.spacing(2) = 8px
```

### 2. Use Accessible Color Combinations

```tsx
// ✅ DO: Use pre-validated accessible combinations
import { accessibleCombinations } from '@trinity/design-system';

<Box sx={{
  backgroundColor: accessibleCombinations.whiteOnNavy.bg,
  color: accessibleCombinations.whiteOnNavy.text,
}}>
  WCAG AA Compliant
</Box>
```

### 3. Use Trinity Components Over Raw MUI

```tsx
// ✅ DO: Use Trinity components
import { StatusIndicator, DataTable, Modal } from '@trinity/design-system';

<StatusIndicator status="success" variant="chip" />
<DataTable rows={data} columns={columns} />
<Modal open={open} title="Confirm" variant="danger" />
```

### 4. Use Brand Assets from the Library

```tsx
// ✅ DO: Use official gradient icons
import { gradientIcons } from '@trinity/design-system/assets';

<img src={gradientIcons.ai} alt="AI" width={48} />

// ✅ DO: Use brand backgrounds
<Box sx={{ backgroundImage: `url(${brandGradients.light[0]})` }}>
```

### 5. Follow Component Composition Patterns

```tsx
// ✅ DO: Use provided templates and layouts
import { LandingPage, TopNavWithSidebar, DashboardTemplate } from '@trinity/design-system';

// ✅ DO: Use StatusIndicator for all status displays
<StatusIndicator status="success" variant="dot" />     // Inline
<StatusIndicator status="warning" variant="chip" />    // Tags
<StatusIndicator status="error" variant="icon" />      // Attention
```

### 6. Use Dense Typography for Compact UIs

```tsx
// ✅ DO: Use dense variants for data-heavy screens
<Typography sx={semanticTokens.typography.dense.body}>
  Compact table content
</Typography>
```

### 7. Always Provide Accessible Labels

```tsx
// ✅ DO: Add aria-labels to icon buttons
<IconButton aria-label="Delete item">
  <DeleteIcon />
</IconButton>

// ✅ DO: Use proper heading hierarchy
<Typography variant="h1">Page Title</Typography>
<Typography variant="h2">Section</Typography>
```

### 8. Test Keyboard Navigation

```tsx
// ✅ DO: Ensure all interactive elements are focusable
// ✅ DO: Test Tab, Enter, Space, Escape interactions
// ✅ DO: Verify focus is visible on all elements
```

---

## ❌ DON'Ts - Anti-Patterns to Avoid

### 1. Never Use Hardcoded Colors

```tsx
// ❌ DON'T: Hardcode colors
<Box sx={{ backgroundColor: '#050742', color: '#FFFFFF' }}>

// ❌ DON'T: Use raw hex values
<Typography sx={{ color: '#F97068' }}>

// ✅ DO: Use tokens instead
<Box sx={{ 
  backgroundColor: brandColors.navy.primary,
  color: semanticTokens.text.inverse 
}}>
```

### 2. Never Create Custom Status Indicators

```tsx
// ❌ DON'T: Create custom status badges
<Chip 
  sx={{ backgroundColor: 'green', color: 'white' }}
  label="Active" 
/>

// ✅ DO: Use StatusIndicator
<StatusIndicator status="success" variant="chip" label="Active" />
```

### 3. Never Override Trinity Theme Defaults

```tsx
// ❌ DON'T: Override button radius
<Button sx={{ borderRadius: '4px' }}>  // Trinity uses pill buttons (100px)

// ❌ DON'T: Add shadows to buttons
<Button sx={{ boxShadow: 2 }}>  // Trinity buttons are flat

// ❌ DON'T: Uppercase button text
<Button sx={{ textTransform: 'uppercase' }}>  // Trinity uses sentence case
```

### 4. Never Use Non-Trinity Icon Libraries for Brand Icons

```tsx
// ❌ DON'T: Use generic icons for brand concepts
import ScienceIcon from '@mui/icons-material/Science';
<ScienceIcon />  // For AI/research features

// ✅ DO: Use Trinity gradient icons
import { gradientIcons } from '@trinity/design-system/assets';
<img src={gradientIcons.ai} alt="AI" />
```

### 5. Never Create Custom Modal/Dialog Styling

```tsx
// ❌ DON'T: Style MUI Dialog directly
<Dialog sx={{ '& .MuiPaper-root': { borderRadius: '4px' } }}>

// ✅ DO: Use Trinity Modal
<Modal 
  open={open} 
  title="Confirm Action"
  variant="confirm"
  onClose={handleClose}
>
```

### 6. Never Bypass the Token System

```tsx
// ❌ DON'T: Create your own spacing scale
<Box sx={{ padding: '13px', margin: '7px' }}>

// ✅ DO: Use token-based spacing
<Box sx={{ 
  padding: baseTokens.spacing[3],  // 12px
  margin: baseTokens.spacing[2],   // 8px
}}>
```

### 7. Never Import from Internal Paths

```tsx
// ❌ DON'T: Import from internal paths
import { something } from '@trinity/design-system/src/components/internal';

// ✅ DO: Use public exports only
import { Component } from '@trinity/design-system';
```

### 8. Never Ignore TypeScript Errors

```tsx
// ❌ DON'T: Use @ts-ignore to suppress errors
// @ts-ignore
<Component wrongProp={value} />

// ✅ DO: Fix the type error or request API update
```

### 9. Never Skip Accessibility Testing

```tsx
// ❌ DON'T: Ship without keyboard testing
// ❌ DON'T: Use color alone to convey meaning
// ❌ DON'T: Hide content from screen readers without reason

// ✅ DO: Test with keyboard only
// ✅ DO: Test with screen reader
// ✅ DO: Verify color contrast ratios
```

### 10. Never Create One-Off Components

```tsx
// ❌ DON'T: Build custom components for patterns we have
// ❌ DON'T: Copy/paste component code and modify

// ✅ DO: Use existing components with props
// ✅ DO: Request new features if needed
```

---

## 🔒 Governance Rules

### Token Usage Enforcement

The design system includes **automated token linting** (`npm run lint:tokens`) that enforces:

1. **No hardcoded colors** in component files
2. **No raw pixel values** for spacing (use token scale)
3. **No custom shadows** (use shadow tokens)

### CI/CD Integration

All pull requests must pass:
- `npm run lint` - ESLint checks
- `npm run lint:tokens` - Token usage verification
- `npm run build:lib` - TypeScript compilation
- Accessibility audit (no new violations)

### Exception Policy

If you must use a non-token value (rare cases), add an exception comment:

```tsx
// @intentional-color: Brand requirement for third-party integration
<Box sx={{ backgroundColor: '#CUSTOM_HEX' }}>
```

This comment:
- Suppresses the lint error
- Documents why the exception exists
- Creates an audit trail for design reviews

**Valid exception reasons:**
- Third-party library integration requirements
- Dynamic colors from user-generated content
- Gradient color stops (already using brand gradients)

### Accessibility Requirements

All contributions must meet **WCAG 2.1 AA**:

| Requirement | Standard |
|-------------|----------|
| Color contrast (normal text) | 4.5:1 minimum |
| Color contrast (large text) | 3:1 minimum |
| Focus indicators | Visible on all interactive elements |
| Keyboard navigation | All features accessible via keyboard |
| Screen reader support | Proper ARIA labels and roles |
| Motion | Respect `prefers-reduced-motion` |

---

## 📋 Component Decision Matrix

| Need | Use This | Not This |
|------|----------|----------|
| Status display | `StatusIndicator` | Custom Chip/Badge |
| Data tables | `DataTable` | Raw MUI DataGrid |
| Modal dialogs | `Modal` | MUI Dialog |
| Toast messages | `Toast` + `useToast` | MUI Snackbar |
| File uploads | `FileUpload` | Custom dropzone |
| Multi-select | `Combobox` | MUI Autocomplete |
| Landing pages | `LandingPage` | Custom layouts |
| App navigation | `TopNavWithSidebar` | Custom nav |
| Page headers | `PageHeader` | Custom headers |
| Charts | Trinity `Charts` | Raw Recharts |
| Tree structures | `TreeView` | Custom tree |
| Split layouts | `SplitPane` | Custom resizable |
| Form inputs | MUI with Trinity theme | Custom inputs |
| Loading states | `Skeleton` / `Loader` | Custom spinners |

---

## 🎨 Design Token Reference

### Color Tokens

```typescript
// Brand Colors (use for branding elements)
brandColors.navy.primary      // #050742 - Primary navy
brandColors.coral.primary     // #F97068 - Primary coral
brandColors.purple.primary    // #6B4C9A - Primary purple

// Semantic Colors (use for UI)
semanticTokens.text.primary   // Primary text
semanticTokens.text.secondary // Secondary text
semanticTokens.text.disabled  // Disabled text
semanticTokens.background.surface // Card/paper background
semanticTokens.background.subtle  // Subtle background
semanticTokens.border.default     // Default borders
```

### Spacing Tokens

```typescript
baseTokens.spacing[0]   // 0px
baseTokens.spacing[1]   // 4px
baseTokens.spacing[2]   // 8px
baseTokens.spacing[3]   // 12px
baseTokens.spacing[4]   // 16px
baseTokens.spacing[6]   // 24px
baseTokens.spacing[8]   // 32px
baseTokens.spacing[12]  // 48px
baseTokens.spacing[16]  // 64px
```

### Border Radius Tokens

```typescript
semanticTokens.borders.radius.none    // 0px
semanticTokens.borders.radius.sm      // 4px
semanticTokens.borders.radius.input   // 6px
semanticTokens.borders.radius.card    // 12px
semanticTokens.borders.radius.lg      // 16px
semanticTokens.borders.radius.full    // 9999px (pill)
```

### Shadow Tokens

```typescript
semanticTokens.shadows.card      // Card elevation
semanticTokens.shadows.dropdown  // Dropdown/popover
semanticTokens.shadows.modal     // Modal dialogs
semanticTokens.effects.shadow.surface   // Resting surfaces
semanticTokens.effects.shadow.floating  // Floating elements
semanticTokens.effects.shadow.dialog    // Dialog boxes
```

---

## 🔄 Migration from v1.0.0

### Breaking Changes

**None** - v1.1.0 is fully backward compatible.

### Deprecations

| Deprecated | Replacement | Action |
|------------|-------------|--------|
| `Autocomplete` stories | `Combobox` | Use Combobox for new features |
| Legacy StatusIndicator imports | Unified `StatusIndicator` | Already migrated in v1.0.0 |

### Recommended Updates

```tsx
// Update token imports to use new semantic effects
import { semanticTokens } from '@trinity/design-system';

// Use new overlay tokens for modals
backdropFilter: semanticTokens.effects.overlay.scrim

// Use new shadow tokens for elevation
boxShadow: semanticTokens.effects.shadow.floating
```

---

## 🛠️ Development Commands

```bash
# Start Storybook (documentation)
npm run storybook

# Build library
npm run build:lib

# Run all linting
npm run lint

# Run token usage linting
npm run lint:tokens

# TypeScript check
npx tsc --noEmit

# Run tests
npm test
```

---

## 📚 Resources

### Storybook Documentation
- **Local**: `npm run storybook` → http://localhost:6006
- **Stories**: 71 documented components with live examples

### Key Documentation Pages

| Page | Content |
|------|---------|
| Welcome | Overview, stats, quick links |
| Getting Started | Installation, setup, imports |
| Tokens/Colors | Color token reference |
| Tokens/Spacing | Spacing scale reference |
| Assets/Gradient Icons | Icon library with download |
| Templates/LandingPage | Landing page examples |
| Components/StatusIndicator | Status display patterns |

### File Structure

```
src/
├── tokens.ts          # All design tokens
├── theme.ts           # MUI theme configuration
├── assets/            # Brand assets (icons, gradients, images)
├── components/        # All components
│   ├── AI/            # AI-specific components
│   ├── Charts/        # Data visualization
│   ├── DataTable/     # Data grid component
│   ├── Modal/         # Modal dialogs
│   ├── StatusIndicator/ # Status displays
│   └── ...
└── stories/           # Storybook documentation
    ├── tokens/        # Token documentation
    └── assets/        # Asset documentation
```

---

## 🤝 Getting Help

### Support Channels

| Channel | Use For |
|---------|---------|
| Slack #trinity-design-system | Questions, discussions |
| GitHub Issues | Bug reports, feature requests |
| Design System Office Hours | Complex integration help |
| Storybook Autodocs | Component API reference |

### Requesting New Features

1. Check if it exists in Storybook first
2. Search GitHub Issues for existing requests
3. Create an issue with:
   - Use case description
   - Proposed API
   - Design mockup (if available)
4. Tag with `enhancement` label

### Reporting Bugs

1. Check if it's a known issue
2. Create an issue with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/environment info
   - Minimal code example

---

## 🏷️ Version Summary

| Metric | Value |
|--------|-------|
| Components | 60+ |
| Design Tokens | 200+ |
| Stories | 71 |
| Assets | 83 |
| Accessibility | WCAG 2.1 AA |
| TypeScript | Strict mode |
| Bundle Size | Tree-shakeable |

---

## ✨ What's Next (v1.2.0 Roadmap)

- Dark mode token refinements
- Additional chart types
- Form validation patterns
- More page templates
- Figma token sync
- Automated visual regression tests

---

**Happy building! 🚀**

*Trinity Design System Team*
