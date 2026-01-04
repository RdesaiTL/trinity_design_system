import type { Meta, StoryObj } from '@storybook/react';
import { Combobox, ComboboxOption } from '../components/Combobox';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import {
  Person as PersonIcon,
  Label as TagIcon,
  Star as StarIcon,
  LocalOffer as OfferIcon,
} from '@mui/icons-material';
import React from 'react';

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
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Enable multi-select mode',
    },
    creatable: {
      control: 'boolean',
      description: 'Allow creating new options',
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Show checkboxes in dropdown',
    },
    groupBy: {
      control: 'boolean',
      description: 'Group options by group property',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
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
    const priorities: ComboboxOption[] = [
      { id: 'critical', label: 'Critical', data: { color: '#dc2626' } },
      { id: 'high', label: 'High', data: { color: '#f97316' } },
      { id: 'medium', label: 'Medium', data: { color: '#eab308' } },
      { id: 'low', label: 'Low', data: { color: '#22c55e' } },
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
