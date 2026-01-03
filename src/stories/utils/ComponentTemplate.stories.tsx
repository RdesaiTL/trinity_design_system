/**
 * @fileoverview Component Story Template
 *
 * Copy this file when creating new component stories.
 * Replace all instances of "ComponentName" with your actual component name.
 *
 * Checklist:
 * - [ ] Update component import
 * - [ ] Update title category
 * - [ ] Fill in JSDoc overview
 * - [ ] Define argTypes with categories
 * - [ ] Add all required stories
 * - [ ] Document accessibility
 * - [ ] Add Do/Don't (if complex)
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Box, Stack, Typography, Paper, Grid } from '@mui/material';

// ============================================================================
// COMPONENT IMPORT
// ============================================================================

// TODO: Update this import path
// import { ComponentName } from '@/components/ComponentName';

// Placeholder for template - remove in actual story
const ComponentName = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children = 'Component',
  onClick,
}: {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}) => (
  <Box
    onClick={disabled ? undefined : onClick}
    sx={{
      padding: size === 'small' ? 1 : size === 'large' ? 3 : 2,
      backgroundColor: variant === 'primary' ? 'primary.main' : 'grey.200',
      color: variant === 'primary' ? 'white' : 'text.primary',
      borderRadius: 2,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-block',
    }}
  >
    {children}
  </Box>
);

// ============================================================================
// OVERVIEW DOCUMENTATION
// ============================================================================

/**
 * # ComponentName
 *
 * Brief description of what this component does and when to use it.
 *
 * ## When to Use
 * - Primary use case
 * - Secondary use case
 * - Alternative scenarios
 *
 * ## Trinity Design Specs
 * - **Border Radius**: Token reference (e.g., `borderRadius.md`)
 * - **Typography**: Font family and weight
 * - **Colors**: Theme color usage
 *
 * ## Anatomy
 * ```
 * ┌─────────────────────────────────┐
 * │ [Icon]  Label Text   [Action]  │
 * └─────────────────────────────────┘
 * ```
 *
 * ## Related Components
 * - [RelatedComponent1](/docs/category-component1--docs)
 * - [RelatedComponent2](/docs/category-component2--docs)
 */

// ============================================================================
// META CONFIGURATION
// ============================================================================

const meta: Meta<typeof ComponentName> = {
  // TODO: Update category path
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],

  // Parameters for docs and addons
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'One-line description for the component canvas.',
      },
    },
    // Accessibility addon configuration
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
  },

  // Props documentation with categories
  argTypes: {
    // ── Appearance ──────────────────────────────────────────────────────────
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'The visual style variant',
      table: {
        type: { summary: "'primary' | 'secondary' | 'tertiary'" },
        defaultValue: { summary: 'primary' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the component',
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'medium' },
        category: 'Appearance',
      },
    },

    // ── Content ─────────────────────────────────────────────────────────────
    children: {
      control: 'text',
      description: 'The content to display',
      table: {
        type: { summary: 'ReactNode' },
        category: 'Content',
      },
    },

    // ── State ───────────────────────────────────────────────────────────────
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },

    // ── Events ──────────────────────────────────────────────────────────────
    onClick: {
      action: 'clicked',
      description: 'Callback fired when component is clicked',
      table: {
        type: { summary: '() => void' },
        category: 'Events',
      },
    },
  },

  // Default args with mock functions
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// REQUIRED STORIES
// ============================================================================

/**
 * Interactive playground with all controls.
 * Use the Controls panel to experiment with different props.
 */
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    children: 'Interactive Component',
  },
};

/**
 * Default component with minimal configuration.
 */
export const Default: Story = {
  args: {
    children: 'Default',
  },
};

// ============================================================================
// VARIANT STORIES
// ============================================================================

/**
 * All visual variants side by side.
 */
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">
          Primary (default)
        </Typography>
        <ComponentName variant="primary">Primary Variant</ComponentName>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">
          Secondary
        </Typography>
        <ComponentName variant="secondary">Secondary Variant</ComponentName>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">
          Tertiary
        </Typography>
        <ComponentName variant="tertiary">Tertiary Variant</ComponentName>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compare all available visual variants.',
      },
    },
  },
};

// ============================================================================
// SIZE STORIES
// ============================================================================

/**
 * All size options for responsive layouts.
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <ComponentName size="small">Small</ComponentName>
      <ComponentName size="medium">Medium</ComponentName>
      <ComponentName size="large">Large</ComponentName>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size variations for different use cases.',
      },
    },
  },
};

// ============================================================================
// STATE STORIES
// ============================================================================

/**
 * Component states including disabled.
 */
export const States: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">
          Normal
        </Typography>
        <ComponentName>Normal State</ComponentName>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">
          Disabled
        </Typography>
        <ComponentName disabled>Disabled State</ComponentName>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive states of the component.',
      },
    },
  },
};

// ============================================================================
// ACCESSIBILITY DOCUMENTATION
// ============================================================================

/**
 * Accessibility features and keyboard navigation.
 *
 * ## Keyboard Navigation
 * | Key | Action |
 * |-----|--------|
 * | Tab | Move focus to component |
 * | Enter | Activate component |
 * | Space | Activate component |
 *
 * ## Screen Reader Announcements
 * - Component role is announced
 * - State changes are announced
 * - Labels are read aloud
 *
 * ## WCAG Compliance
 * - ✅ 4.5:1 contrast ratio for text
 * - ✅ 3:1 contrast ratio for interactive elements
 * - ✅ Focus indicator visible
 * - ✅ Touch target minimum 44x44px
 */
export const Accessibility: Story = {
  render: () => (
    <Stack spacing={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Keyboard Navigation Demo
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Try navigating with Tab and activating with Enter or Space.
        </Typography>
        <Stack direction="row" spacing={2}>
          <ComponentName>First</ComponentName>
          <ComponentName>Second</ComponentName>
          <ComponentName>Third</ComponentName>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Focus Indicators
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          All interactive elements have visible focus states.
        </Typography>
        <ComponentName>Focus Me</ComponentName>
      </Paper>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Keyboard Support

| Key | Action |
|-----|--------|
| \`Tab\` | Move focus to/from component |
| \`Enter\` | Activate the component |
| \`Space\` | Activate the component |

### ARIA Attributes

- \`role="button"\` - Indicates interactive element
- \`aria-disabled\` - Indicates disabled state
- \`aria-label\` - Provides accessible name
        `,
      },
    },
  },
};

// ============================================================================
// DO / DON'T GUIDELINES
// ============================================================================

/**
 * Best practices and anti-patterns.
 */
export const DosDonts: Story = {
  render: () => (
    <Grid container spacing={4}>
      {/* DO Examples */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 3,
            border: '2px solid',
            borderColor: 'success.main',
            height: '100%',
          }}
        >
          <Typography
            variant="h6"
            color="success.main"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            ✅ Do
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Use clear, descriptive labels
              </Typography>
              <ComponentName>Save Changes</ComponentName>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Use appropriate variant for hierarchy
              </Typography>
              <Stack direction="row" spacing={1}>
                <ComponentName variant="secondary">Cancel</ComponentName>
                <ComponentName variant="primary">Submit</ComponentName>
              </Stack>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Size consistently within context
              </Typography>
              <Stack direction="row" spacing={1}>
                <ComponentName size="medium">Action A</ComponentName>
                <ComponentName size="medium">Action B</ComponentName>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      {/* DON'T Examples */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 3,
            border: '2px solid',
            borderColor: 'error.main',
            height: '100%',
          }}
        >
          <Typography
            variant="h6"
            color="error.main"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            ❌ Don't
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Use vague or generic labels
              </Typography>
              <ComponentName>Click Here</ComponentName>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Use multiple primary variants together
              </Typography>
              <Stack direction="row" spacing={1}>
                <ComponentName variant="primary">Option 1</ComponentName>
                <ComponentName variant="primary">Option 2</ComponentName>
                <ComponentName variant="primary">Option 3</ComponentName>
              </Stack>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Mix sizes inconsistently
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <ComponentName size="small">Small</ComponentName>
                <ComponentName size="large">Large</ComponentName>
                <ComponentName size="medium">Medium</ComponentName>
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
        story: 'Guidelines for proper component usage.',
      },
    },
  },
};

// ============================================================================
// REAL-WORLD EXAMPLE
// ============================================================================

/**
 * Component in a realistic context.
 */
export const InContext: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Settings Panel
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Configure your preferences below.
      </Typography>
      <Stack spacing={2}>
        {/* Form fields would go here */}
        <Box
          sx={{
            height: 100,
            bgcolor: 'grey.100',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="text.secondary">Form Fields</Typography>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <ComponentName variant="secondary">Cancel</ComponentName>
          <ComponentName variant="primary">Save Settings</ComponentName>
        </Stack>
      </Stack>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing component in a realistic application context.',
      },
    },
  },
};

// ============================================================================
// RESPONSIVE BEHAVIOR (Optional)
// ============================================================================

/**
 * Component behavior at different viewport sizes.
 */
export const Responsive: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="body2" color="text.secondary">
        Resize the viewport to see responsive behavior.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <ComponentName>Responsive Item 1</ComponentName>
        <ComponentName>Responsive Item 2</ComponentName>
        <ComponentName>Responsive Item 3</ComponentName>
      </Box>
    </Stack>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        story: 'Demonstrates responsive behavior across breakpoints.',
      },
    },
  },
};

// ============================================================================
// THEME COMPARISON (Optional)
// ============================================================================

/**
 * Side-by-side light and dark mode comparison.
 * Note: This requires custom decorator setup.
 */
export const ThemeComparison: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="subtitle2" gutterBottom>
            Light Mode
          </Typography>
          <ComponentName>Light Theme</ComponentName>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, bgcolor: 'grey.900' }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: 'white' }}>
            Dark Mode
          </Typography>
          <ComponentName variant="secondary">Dark Theme</ComponentName>
        </Paper>
      </Grid>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of light and dark theme variants.',
      },
    },
  },
};
