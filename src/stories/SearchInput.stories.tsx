import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Description as FileIcon,
} from '@mui/icons-material';
import { SearchInput, type SearchSuggestion } from '../components/SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A powerful search input with suggestions, recent searches, keyboard navigation, and global shortcut support (⌘K).',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSuggestions: SearchSuggestion[] = [
  { id: '1', label: 'Dashboard Overview', category: 'Page', icon: <DashboardIcon fontSize="small" /> },
  { id: '2', label: 'User Settings', category: 'Settings', icon: <SettingsIcon fontSize="small" /> },
  { id: '3', label: 'John Smith', category: 'User', icon: <PersonIcon fontSize="small" />, metadata: 'john.smith@example.com' },
  { id: '4', label: 'Project Report Q4', category: 'Document', icon: <FileIcon fontSize="small" /> },
  { id: '5', label: 'Analytics Dashboard', category: 'Page', icon: <DashboardIcon fontSize="small" /> },
];

const sampleRecentSearches = [
  'dashboard',
  'user management',
  'quarterly report',
  'settings',
];

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    suggestions: sampleSuggestions,
  },
};

export const WithRecentSearches: Story = {
  args: {
    placeholder: 'Search anything...',
    suggestions: sampleSuggestions,
    recentSearches: sampleRecentSearches,
  },
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 400 }}>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
          Small
        </Typography>
        <SearchInput size="small" placeholder="Small search..." />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
          Medium (default)
        </Typography>
        <SearchInput size="medium" placeholder="Medium search..." />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
          Large
        </Typography>
        <SearchInput size="large" placeholder="Large search..." />
      </Box>
    </Box>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Search across all content...',
    suggestions: sampleSuggestions,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithoutShortcut: Story = {
  args: {
    placeholder: 'Search...',
    showShortcut: false,
    suggestions: sampleSuggestions,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [recent, setRecent] = useState(sampleRecentSearches);

    const handleSearch = (searchValue: string) => {
      console.log('Searching for:', searchValue);
      if (searchValue && !recent.includes(searchValue)) {
        setRecent([searchValue, ...recent.slice(0, 4)]);
      }
    };

    const handleClearRecent = () => setRecent([]);
    const handleRemoveRecent = (search: string) => setRecent(recent.filter(r => r !== search));

    return (
      <Box sx={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
          suggestions={sampleSuggestions.filter(s => 
            s.label.toLowerCase().includes(value.toLowerCase())
          )}
          recentSearches={recent}
          onClearRecentSearches={handleClearRecent}
          onRemoveRecentSearch={handleRemoveRecent}
          placeholder="Try typing or press ⌘K..."
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Current value: "{value}"
        </Typography>
      </Box>
    );
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search is disabled',
    disabled: true,
  },
};
