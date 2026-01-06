import type { Meta, StoryObj } from '@storybook/react';
import { Combobox, ComboboxOption } from '../components/Combobox';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import {
  Label as TagIcon,
  LocalOffer as OfferIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import React from 'react';

/**
 * # Combobox
 *
 * An enhanced autocomplete/multi-select component with create option, grouping,
 * and custom rendering. Built on MUI Autocomplete with Trinity-specific features.
 *
 * ## When to Use
 * - Single or multi-select from a list of options
 * - Tag/label selection interfaces
 * - User/assignee pickers
 * - Filterable dropdowns with search
 * - When users need to create new options on the fly
 *
 * ## Trinity Design Specs
 * - **Border Radius**: 6px for input, 8px for dropdown
 * - **Checkbox style**: Trinity checkbox in multi-select mode
 * - **Chip style**: Uses Trinity Chip component for tags
 *
 * ## Accessibility
 *
 * ### Keyboard Navigation
 * - **Tab**: Moves focus to/from the combobox
 * - **Arrow Down/Up**: Navigate through options
 * - **Enter**: Select highlighted option
 * - **Escape**: Close dropdown and clear input
 * - **Backspace**: Remove last selected item (multi-select)
 *
 * ### Screen Reader Support
 * - Uses `role="combobox"` with proper ARIA attributes
 * - `aria-expanded` indicates dropdown state
 * - `aria-activedescendant` tracks highlighted option
 * - Selected items announced with count in multi-select
 * - Options use `role="option"` with `aria-selected`
 *
 * ### WCAG Compliance
 * - ✅ 4.5:1 contrast ratio for text and labels
 * - ✅ 3:1 contrast ratio for input borders
 * - ✅ Focus indicators clearly visible
 * - ✅ Error states use both color and text
 */
const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An enhanced multi-select component with create option, grouping, and custom rendering. Built on MUI Autocomplete with additional features.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Enable multi-select mode',
      table: { category: 'Behavior' },
    },
    creatable: {
      control: 'boolean',
      description: 'Allow creating new options',
      table: { category: 'Behavior' },
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Show checkboxes in dropdown',
      table: { category: 'Appearance' },
    },
    groupBy: {
      control: 'boolean',
      description: 'Group options by group property',
      table: { category: 'Behavior' },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the input',
      table: { defaultValue: { summary: 'medium' }, category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled',
      table: { category: 'State' },
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the component takes full container width',
      table: { category: 'Layout' },
    },
    label: {
      control: 'text',
      description: 'The label for the input field',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value selected',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
      table: { category: 'Content' },
    },
    error: {
      control: 'boolean',
      description: 'If true, displays error state',
      table: { category: 'State' },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed when error is true',
      table: { category: 'Validation' },
    },
    limitTags: {
      control: 'number',
      description: 'Maximum number of tags visible (multi-select)',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data - Simple tags
const tags: ComboboxOption[] = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue.js' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'nuxt', label: 'Nuxt' },
  { id: 'remix', label: 'Remix' },
  { id: 'gatsby', label: 'Gatsby' },
];

// Sample data - Users with secondary text
const users: ComboboxOption[] = [
  { id: 'user-1', label: 'Alice Johnson', secondary: 'alice@example.com' },
  { id: 'user-2', label: 'Bob Smith', secondary: 'bob@example.com' },
  { id: 'user-3', label: 'Carol Williams', secondary: 'carol@example.com' },
  { id: 'user-4', label: 'David Brown', secondary: 'david@example.com' },
  { id: 'user-5', label: 'Eve Davis', secondary: 'eve@example.com' },
];

// Sample data - Grouped options
const groupedOptions: ComboboxOption[] = [
  { id: 'red', label: 'Red', group: 'Warm Colors' },
  { id: 'orange', label: 'Orange', group: 'Warm Colors' },
  { id: 'yellow', label: 'Yellow', group: 'Warm Colors' },
  { id: 'green', label: 'Green', group: 'Cool Colors' },
  { id: 'blue', label: 'Blue', group: 'Cool Colors' },
  { id: 'purple', label: 'Purple', group: 'Cool Colors' },
  { id: 'black', label: 'Black', group: 'Neutral Colors' },
  { id: 'white', label: 'White', group: 'Neutral Colors' },
  { id: 'gray', label: 'Gray', group: 'Neutral Colors' },
];

// Sample data - With icons
const categories: ComboboxOption[] = [
  { id: 'bug', label: 'Bug', icon: <OfferIcon fontSize="small" color="error" /> },
  { id: 'feature', label: 'Feature', icon: <StarIcon fontSize="small" color="primary" /> },
  { id: 'improvement', label: 'Improvement', icon: <TagIcon fontSize="small" color="success" /> },
  { id: 'documentation', label: 'Documentation', icon: <TagIcon fontSize="small" color="info" /> },
];

export const Default: Story = {
  args: {
    options: tags,
    label: 'Select Framework',
    placeholder: 'Choose a framework...',
  },
};

export const MultiSelect: Story = {
  args: {
    options: tags,
    label: 'Select Frameworks',
    placeholder: 'Choose frameworks...',
    multiple: true,
    showCheckbox: true,
  },
};

export const Creatable: Story = {
  render: () => {
    const [options, setOptions] = React.useState(tags);

    return (
      <Combobox
        options={options}
        label="Tags"
        placeholder="Add tags..."
        multiple
        creatable
        createText='Create "{value}"'
        onCreate={(value) => {
          const newOption = { id: value.toLowerCase().replace(/\s+/g, '-'), label: value };
          setOptions([...options, newOption]);
          return newOption;
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Type a new value and press Enter or click "Create" to add a new option.',
      },
    },
  },
};

export const WithSecondaryText: Story = {
  args: {
    options: users,
    label: 'Assign to',
    placeholder: 'Select user...',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Grouped: Story = {
  args: {
    options: groupedOptions,
    label: 'Select Color',
    placeholder: 'Choose a color...',
    groupBy: true,
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400 }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithIcons: Story = {
  args: {
    options: categories,
    label: 'Issue Type',
    placeholder: 'Select type...',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 300 }}>
        <Story />
      </Box>
    ),
  ],
};

export const SmallSize: Story = {
  args: {
    options: tags,
    label: 'Frameworks',
    placeholder: 'Select...',
    multiple: true,
    size: 'small',
  },
};

export const WithError: Story = {
  args: {
    options: users,
    label: 'Required Field',
    placeholder: 'Select user...',
    error: true,
    errorMessage: 'This field is required',
  },
};

export const WithHelperText: Story = {
  args: {
    options: tags,
    label: 'Technologies',
    placeholder: 'Select technologies...',
    multiple: true,
    helperText: 'Select the technologies used in your project',
  },
};

export const LimitTags: Story = {
  args: {
    options: tags,
    label: 'Selected Technologies',
    multiple: true,
    limitTags: 2,
    defaultValue: [tags[0], tags[1], tags[2], tags[3]],
  },
  parameters: {
    docs: {
      description: {
        story: 'When many items are selected, only the first 2 are shown with a "+2" indicator.',
      },
    },
  },
};

export const CustomRenderOption: Story = {
  render: () => {
    const usersWithAvatars = users.map((u, i) => ({
      ...u,
      data: { avatar: `https://i.pravatar.cc/40?img=${i + 1}` },
    }));

    return (
      <Box sx={{ maxWidth: 400 }}>
        <Combobox
          options={usersWithAvatars}
          label="Team Member"
          placeholder="Select team member..."
          fullWidth
          renderOption={(option) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
              <Avatar
                src={option.data?.avatar as string}
                sx={{ width: 32, height: 32 }}
              />
              <Box>
                <Typography variant="body2">{option.label}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {option.secondary}
                </Typography>
              </Box>
            </Box>
          )}
        />
      </Box>
    );
  },
};

export const CustomRenderTag: Story = {
  render: () => {
    // @intentional-color: Priority level colors for demo - Tailwind red/orange/yellow/green
    const priorities: ComboboxOption[] = [
      { id: 'critical', label: 'Critical', data: { color: '#dc2626' } }, // @intentional-color: Tailwind red-600 for critical
      { id: 'high', label: 'High', data: { color: '#f97316' } }, // @intentional-color: Tailwind orange-500 for high
      { id: 'medium', label: 'Medium', data: { color: '#eab308' } }, // @intentional-color: Tailwind yellow-500 for medium
      { id: 'low', label: 'Low', data: { color: '#22c55e' } }, // @intentional-color: Tailwind green-500 for low
    ];

    return (
      <Box sx={{ maxWidth: 400 }}>
        <Combobox
          options={priorities}
          label="Priority Levels"
          placeholder="Select priorities..."
          multiple
          fullWidth
          defaultValue={[priorities[0], priorities[2]]}
          renderTag={(option, onDelete) => (
            <Chip
              label={option.label}
              size="small"
              onDelete={onDelete}
              sx={{
                backgroundColor: option.data?.color as string,
                color: 'white',
                '& .MuiChip-deleteIcon': {
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { color: 'white' },
                },
              }}
            />
          )}
        />
      </Box>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<ComboboxOption[]>([tags[0]]);

    return (
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Selected: {value.map(v => v.label).join(', ') || 'None'}
        </Typography>
        <Combobox
          options={tags}
          value={value}
          onChange={setValue}
          label="Controlled Combobox"
          multiple
          fullWidth
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Chip
            label="Clear"
            onClick={() => setValue([])}
            variant="outlined"
            size="small"
          />
          <Chip
            label="Select All"
            onClick={() => setValue(tags)}
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>
    );
  },
};
