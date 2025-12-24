import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button, Stack, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

/**
 * # Button
 * 
 * Buttons allow users to take actions with a single tap. They communicate actions
 * that users can take and are typically placed throughout your UI, in places like:
 * 
 * - Dialogs
 * - Modal windows
 * - Forms
 * - Cards
 * - Toolbars
 * 
 * ## Trinity Design Specs
 * - **Border Radius**: 100px (pill shape)
 * - **Text Transform**: None (no uppercase)
 * - **Font Weight**: 600 (semi-bold)
 * - **Elevation**: None (flat design)
 * 
 * ## Variants
 * - **Contained**: High emphasis, for primary actions
 * - **Outlined**: Medium emphasis, for secondary actions
 * - **Text**: Low emphasis, for tertiary actions
 */
const meta: Meta<typeof Button> = {
  title: 'Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Buttons with Trinity styling - pill shape, no uppercase, and brand colors.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'The variant to use',
      table: { defaultValue: { summary: 'contained' }, category: 'Appearance' },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'The color of the button',
      table: { defaultValue: { summary: 'primary' }, category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
      table: { defaultValue: { summary: 'medium' }, category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the button will be disabled',
      table: { category: 'State' },
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the button will take up the full width of its container',
      table: { category: 'Layout' },
    },
    children: {
      control: 'text',
      description: 'Button text content',
      table: { category: 'Content' },
    },
    startIcon: {
      control: false,
      description: 'Element placed before the children',
      table: { category: 'Icons' },
    },
    endIcon: {
      control: false,
      description: 'Element placed after the children',
      table: { category: 'Icons' },
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default button with contained variant in primary color.
 */
export const Default: Story = {
  args: {
    variant: 'contained',
    children: 'Button',
  },
};

/**
 * All three button variants side by side.
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
  ),
};

/**
 * Primary and secondary color buttons.
 */
export const Colors: Story = {
  render: () => (
    <Box>
      <Typography variant="subtitle2" gutterBottom>Contained</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="contained" color="success">Success</Button>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="contained" color="info">Info</Button>
        <Button variant="contained" color="warning">Warning</Button>
      </Stack>
      
      <Typography variant="subtitle2" gutterBottom>Outlined</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="primary">Primary</Button>
        <Button variant="outlined" color="secondary">Secondary</Button>
        <Button variant="outlined" color="success">Success</Button>
        <Button variant="outlined" color="error">Error</Button>
        <Button variant="outlined" color="info">Info</Button>
        <Button variant="outlined" color="warning">Warning</Button>
      </Stack>
    </Box>
  ),
};

/**
 * Small, medium, and large button sizes.
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" size="small">Small</Button>
      <Button variant="contained" size="medium">Medium</Button>
      <Button variant="contained" size="large">Large</Button>
    </Stack>
  ),
};

/**
 * Buttons with icons for enhanced visual communication.
 */
export const WithIcons: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" startIcon={<AddIcon />}>
        Add Item
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
      <Button variant="outlined" startIcon={<SaveIcon />}>
        Save Draft
      </Button>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </Stack>
  ),
};

/**
 * Disabled state for unavailable actions.
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" disabled>Contained</Button>
      <Button variant="outlined" disabled>Outlined</Button>
      <Button variant="text" disabled>Text</Button>
    </Stack>
  ),
};

/**
 * Full width button for forms and mobile layouts.
 */
export const FullWidth: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      <Button variant="contained" fullWidth sx={{ mb: 2 }}>
        Full Width Button
      </Button>
      <Button variant="outlined" fullWidth>
        Full Width Outlined
      </Button>
    </Box>
  ),
};

/**
 * Interactive button that logs click events to the Actions panel.
 */
export const Interactive: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Click Me',
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the button and check the Actions panel to see the onClick event.',
      },
    },
  },
};
