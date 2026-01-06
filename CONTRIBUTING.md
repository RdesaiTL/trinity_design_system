# Contributing to Trinity Design System

Thank you for your interest in contributing to the Trinity Design System! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Component Guidelines](#component-guidelines)
- [Styling Guidelines](#styling-guidelines)
- [Accessibility Requirements](#accessibility-requirements)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

Please be respectful and constructive in all interactions. We are committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+
- Git

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/trinity-design-system.git
   cd trinity-design-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Start Storybook:
   ```bash
   npm run storybook
   ```

## Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates

Example: `feature/add-date-picker-component`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting (no code change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(Button): add loading state prop
fix(StatusIndicator): correct color contrast for warning state
docs(README): update installation instructions
```

## Component Guidelines

### File Structure

New components should follow this structure:

```
src/components/ComponentName/
├── index.ts              # Barrel exports
├── ComponentName.tsx     # Main component
├── types.ts              # TypeScript types/interfaces
├── styles.ts             # Styled components (if needed)
└── utils.ts              # Helper functions (if needed)
```

### Component Template

```tsx
import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

export interface MyComponentProps {
  /** Description of the prop */
  variant?: 'primary' | 'secondary';
  /** Additional custom styles */
  sx?: SxProps<Theme>;
  /** Component content */
  children?: React.ReactNode;
}

/**
 * MyComponent - Brief description of what the component does.
 * 
 * @example
 * ```tsx
 * <MyComponent variant="primary">Content</MyComponent>
 * ```
 */
export const MyComponent: React.FC<MyComponentProps> = ({
  variant = 'primary',
  sx,
  children,
}) => {
  return (
    <Box
      sx={{
        // Component styles
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
```

### Export Components

Add exports to `src/components/index.ts`:

```typescript
export * from './MyComponent';
```

## Styling Guidelines

### Use Theme Tokens

Always use theme tokens from `src/theme.ts`:

```tsx
// ✅ Good
<Box sx={{ color: 'primary.main', borderRadius: 2 }}>

// ❌ Avoid
<Box sx={{ color: '#003366', borderRadius: '16px' }}>
```

### Accessible Color Combinations

Use `accessibleCombinations` for text/background pairs:

```tsx
import { accessibleCombinations } from '../theme';

<Box sx={{
  backgroundColor: accessibleCombinations.whiteOnNavy.bg,
  color: accessibleCombinations.whiteOnNavy.text,
}}>
```

### Trinity-Specific Patterns

- **Buttons**: Pill shape (`borderRadius: 100`), no elevation
- **Cards/Containers**: 16px border radius (light), 8px (dark)
- **Inputs**: 6px border radius for small inputs
- **Typography**: Montserrat font, no uppercase buttons

## Accessibility Requirements

All components must meet **WCAG 2.1 AA** standards:

### Minimum Requirements

1. **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
2. **Keyboard Navigation**: All interactive elements must be keyboard accessible
3. **Focus Indicators**: Visible focus states for all focusable elements
4. **ARIA Labels**: Proper labels for screen readers
5. **Reduced Motion**: Respect `prefers-reduced-motion` preference

### Testing Accessibility

```tsx
// Use accessibility utilities
import { useReducedMotion, VisuallyHidden } from '../accessibility';

const MyComponent = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <button>
      <VisuallyHidden>Screen reader text</VisuallyHidden>
      <Icon aria-hidden="true" />
    </button>
  );
};
```

### Storybook Accessibility Addon

Run accessibility audits in Storybook using the addon-a11y panel.

## Testing Requirements

### Test Structure

```
src/
├── components/
│   ├── __tests__/
│   │   └── MyComponent.test.tsx
│   └── MyComponent.tsx
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Template

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render with default props', () => {
    render(<MyComponent>Content</MyComponent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const onClick = vi.fn();
    render(<MyComponent onClick={onClick}>Click me</MyComponent>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should apply custom styles', () => {
    render(<MyComponent sx={{ color: 'red' }}>Styled</MyComponent>);
    // Assert styles
  });
});
```

### Coverage Requirements

- Minimum 80% code coverage for new components
- All public APIs must have tests
- Edge cases and error states should be tested

## Documentation

### Storybook Stories

Every component needs a Storybook story:

```tsx
// src/stories/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../components/MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default content',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary variant',
  },
};
```

### JSDoc Comments

All exported functions and components should have JSDoc comments:

```tsx
/**
 * Calculates the accessible color for a given background.
 * 
 * @param backgroundColor - The background color in hex format
 * @returns The appropriate text color for accessibility
 * 
 * @example
 * ```tsx
 * const textColor = getAccessibleColor('#003366');
 * // Returns '#ffffff'
 * ```
 */
export const getAccessibleColor = (backgroundColor: string): string => {
  // Implementation
};
```

## Pull Request Process

### Before Submitting

1. ✅ Run `npm run lint` and fix any issues
2. ✅ Run `npm test` and ensure all tests pass
3. ✅ Run `npm run build` to verify build succeeds
4. ✅ Update documentation if needed
5. ✅ Add/update Storybook stories
6. ✅ Update CHANGELOG.md with your changes

### PR Template

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Storybook stories added/updated
- [ ] CHANGELOG.md updated
- [ ] Accessibility requirements met
- [ ] Token compliance verified (`npm run lint:tokens`)
- [ ] Any `eslint-disable` for colors references [INTENTIONAL_EXCEPTIONS.md](docs/INTENTIONAL_EXCEPTIONS.md)

## Screenshots (if applicable)
```

### Review Process

1. Create PR against `main` branch
2. Request review from team members
3. Address feedback and update PR
4. Squash and merge when approved

## Questions?

If you have questions, feel free to:
- Open a GitHub issue
- Reach out to the design system team

Thank you for contributing! 🎉
