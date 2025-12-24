# Trinity Design System - AI Coding Instructions

## Overview
MUI v6/7-based design system library with Trinity branding, WCAG 2.1 AA accessibility, and reusable navigation components. Built with Vite + React + TypeScript.

## Project Architecture

### Key Directories
- `src/theme.ts` - **Central theme config**: brand colors, accessible combinations, light/dark MUI themes with component overrides
- `src/components/` - Reusable Trinity components (`TopNavHeader`, `TopNavWithSidebar`, `Layout`, `shared`)
- `src/pages/` - Component demo pages organized by MUI category (inputs, data-display, feedback, surfaces, navigation, layout)
- `src/stories/` - Storybook stories with interactive documentation
- `.storybook/` - Storybook config with theme decorator in `preview.tsx`

### Design Token System
All styling derives from `brandColors` and `accessibleCombinations` in [src/theme.ts](src/theme.ts):
```typescript
import { brandColors, accessibleCombinations, lightTheme, darkTheme } from './theme';
```

## Critical Patterns

### Component Page Structure
Demo pages use shared components from [src/components/shared.tsx](src/components/shared.tsx):
```tsx
import { ComponentPage, Section, Showcase } from '../components/shared';

export const MyPage: React.FC = () => (
  <ComponentPage title="Component Name" description="Description text">
    <Section title="Variant Name">
      <Showcase>{/* Components here */}</Showcase>
    </Section>
  </ComponentPage>
);
```

### Storybook Stories
Stories follow CSF3 format with `Meta` and `StoryObj` types. See [src/stories/Button.stories.tsx](src/stories/Button.stories.tsx):
```tsx
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Component> = {
  title: 'Category/ComponentName',
  component: Component,
  tags: ['autodocs'],
  // argTypes for controls...
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { /* props */ } };
```

### Adding New Pages
1. Create page in appropriate `src/pages/{category}/` folder
2. Export from [src/pages/index.ts](src/pages/index.ts)
3. Add navigation entry in [src/App.tsx](src/App.tsx) `navCategories` array

## Style Guidelines

### Trinity-Specific MUI Overrides
- **Buttons**: Pill shape (`borderRadius: 100`), no elevation, coral hover on primary
- **Border radius**: 16px default (light), 8px (dark), 6px for small inputs
- **Typography**: Montserrat font, no uppercase buttons (`textTransform: 'none'`)
- **Switches**: Custom track/thumb styling with checkmark icon on checked state

### Accessibility Requirements
Always use `accessibleCombinations` for text/background pairs:
```tsx
<Box sx={{
  backgroundColor: accessibleCombinations.whiteOnNavy.bg,
  color: accessibleCombinations.whiteOnNavy.text,
}}>
```

## Development Commands
```bash
npm run dev           # Vite dev server at :5173
npm run storybook     # Storybook at :6006
npm run build         # TypeScript + Vite production build
npm run lint          # ESLint
```

## File Naming Conventions
- Pages: `{ComponentName}Page.tsx` (PascalCase)
- Stories: `{ComponentName}.stories.tsx`
- Components use default exports for main component, named exports for utilities
