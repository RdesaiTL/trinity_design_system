import type { Meta, StoryObj } from '@storybook/react';
import { 
  Chip, 
  Stack, 
  Avatar, 
  Box 
} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { fn } from 'storybook/test';

/**
 * # Chip
 * 
 * Chips are compact elements that represent an input, attribute, or action.
 * They allow users to enter information, make selections, filter content,
 * or trigger actions.
 * 
 * ## Usage Guidelines
 * - Use chips for tags, categories, or selections
 * - Use deletable chips for user-generated content
 * - Use clickable chips for filters or actions
 */
const meta: Meta<typeof Chip> = {
  title: 'Data Display/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Chips for tags, filters, selections, and actions.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The content of the chip',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'The variant to use',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'The color of the chip',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the chip',
    },
    clickable: {
      control: 'boolean',
      description: 'If true, the chip will be clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the chip will be disabled',
    },
  },
  args: {
    onClick: fn(),
    onDelete: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground - use Controls to customize the chip.
 * Try changing label, variant, color, size, and toggling clickable/disabled.
 */
export const Playground: Story = {
  args: {
    label: 'Chip Label',
    variant: 'filled',
    color: 'default',
    size: 'medium',
    clickable: false,
    disabled: false,
  },
};

/**
 * Default chip variants.
 */
export const Default: Story = {
  args: {
    label: 'Chip',
  },
};

/**
 * All color options for chips.
 */
export const Colors: Story = {
  render: () => (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip label="Default" />
        <Chip label="Primary" color="primary" />
        <Chip label="Secondary" color="secondary" />
        <Chip label="Success" color="success" />
        <Chip label="Error" color="error" />
        <Chip label="Info" color="info" />
        <Chip label="Warning" color="warning" />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="Default" variant="outlined" />
        <Chip label="Primary" color="primary" variant="outlined" />
        <Chip label="Secondary" color="secondary" variant="outlined" />
        <Chip label="Success" color="success" variant="outlined" />
        <Chip label="Error" color="error" variant="outlined" />
        <Chip label="Info" color="info" variant="outlined" />
        <Chip label="Warning" color="warning" variant="outlined" />
      </Stack>
    </Box>
  ),
};

/**
 * Clickable chips for interactive use.
 */
export const Clickable: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip label="Clickable" clickable />
      <Chip label="Clickable" clickable color="primary" />
      <Chip label="Clickable" clickable variant="outlined" />
    </Stack>
  ),
};

/**
 * Deletable chips for removable items.
 */
export const Deletable: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip label="Deletable" onDelete={() => {}} />
      <Chip label="Custom Icon" onDelete={() => {}} deleteIcon={<DeleteIcon />} />
      <Chip label="Outlined" variant="outlined" onDelete={() => {}} />
    </Stack>
  ),
};

/**
 * Chips with avatars.
 */
export const WithAvatar: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip avatar={<Avatar>R</Avatar>} label="Rahul Desai" />
      <Chip 
        avatar={<Avatar alt="User" src="https://i.pravatar.cc/150?img=1" />} 
        label="John Smith" 
      />
      <Chip avatar={<Avatar><FaceIcon /></Avatar>} label="With Icon" />
    </Stack>
  ),
};

/**
 * Chips with icons.
 */
export const WithIcon: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip icon={<FaceIcon />} label="With Icon" />
      <Chip icon={<FaceIcon />} label="Clickable" clickable />
      <Chip icon={<DoneIcon />} label="Done" color="success" />
    </Stack>
  ),
};

/**
 * Size variations.
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip label="Small" size="small" />
      <Chip label="Medium" size="medium" />
      <Chip label="Small" size="small" variant="outlined" />
      <Chip label="Medium" size="medium" variant="outlined" />
    </Stack>
  ),
};

/**
 * Disabled chips.
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip label="Disabled" disabled />
      <Chip label="Disabled" disabled clickable />
      <Chip label="Disabled" disabled onDelete={() => {}} />
    </Stack>
  ),
};

/**
 * Filter chips for selection states.
 */
export const FilterChips: Story = {
  render: () => {
    const FilterExample = () => {
      const categories = ['All', 'Pharma', 'Biotech', 'Medical Devices', 'Healthcare'];
      const [selected, setSelected] = React.useState('All');

      return (
        <Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                clickable
                color={selected === category ? 'primary' : 'default'}
                variant={selected === category ? 'filled' : 'outlined'}
                onClick={() => setSelected(category)}
              />
            ))}
          </Stack>
        </Box>
      );
    };

    return <FilterExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Click chips to toggle selection state. Useful for filter interfaces.',
      },
    },
  },
};

/**
 * Tags example showing common use case.
 */
export const Tags: Story = {
  render: () => (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label="Launch Strategy" size="small" color="primary" />
          <Chip label="Market Analysis" size="small" color="primary" />
          <Chip label="Competitive Intel" size="small" color="secondary" />
          <Chip label="Q4 2024" size="small" />
        </Stack>
      </Box>
      <Box>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip 
            label="Oncology" 
            size="small" 
            onDelete={() => {}} 
          />
          <Chip 
            label="Immunology" 
            size="small" 
            onDelete={() => {}} 
          />
          <Chip 
            label="CNS" 
            size="small" 
            onDelete={() => {}} 
          />
        </Stack>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tags for categorizing content. Bottom row shows deletable tags.',
      },
    },
  },
};

// Import React for the filter example
import React from 'react';
