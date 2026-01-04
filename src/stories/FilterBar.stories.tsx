import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  Person as PersonIcon,
  CalendarMonth as CalendarIcon,
  Category as CategoryIcon,
  Flag as PriorityIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import { FilterBar, type FilterConfig, type FilterValue, type FilterPreset } from '../components/FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'Components/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A composable filter bar with support for multiple filter types, presets, and quick filters.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFilters: FilterConfig[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'multiselect',
    icon: <CategoryIcon fontSize="small" />,
    options: [
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'completed', label: 'Completed' },
      { value: 'archived', label: 'Archived' },
    ],
  },
  {
    id: 'assignee',
    label: 'Assignee',
    type: 'select',
    icon: <PersonIcon fontSize="small" />,
    options: [
      { value: 'john', label: 'John Smith' },
      { value: 'jane', label: 'Jane Doe' },
      { value: 'bob', label: 'Bob Wilson' },
    ],
  },
  {
    id: 'priority',
    label: 'Priority',
    type: 'select',
    icon: <PriorityIcon fontSize="small" />,
    options: [
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ],
  },
  {
    id: 'dateRange',
    label: 'Date Range',
    type: 'daterange',
    icon: <CalendarIcon fontSize="small" />,
  },
  {
    id: 'search',
    label: 'Search',
    type: 'text',
    placeholder: 'Search by name...',
  },
];

const samplePresets: FilterPreset[] = [
  {
    id: 'my-tasks',
    label: 'My Active Tasks',
    filters: { assignee: 'john', status: ['active', 'pending'] },
    icon: <BookmarkIcon fontSize="small" />,
  },
  {
    id: 'high-priority',
    label: 'High Priority',
    filters: { priority: 'high', status: ['active'] },
    icon: <PriorityIcon fontSize="small" />,
  },
];

export const Default: Story = {
  args: {
    filters: sampleFilters,
  },
};

export const WithPresets: Story = {
  args: {
    filters: sampleFilters,
    presets: samplePresets,
  },
};

export const WithQuickFilters: Story = {
  args: {
    filters: sampleFilters,
    showQuickFilters: true,
    quickFilterIds: ['status', 'priority', 'assignee'],
  },
};

export const Compact: Story = {
  args: {
    filters: sampleFilters,
    compact: true,
    showQuickFilters: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, FilterValue>>({
      status: ['active'],
    });

    return (
      <Box>
        <FilterBar
          filters={sampleFilters}
          values={values}
          onChange={setValues}
          presets={samplePresets}
          showQuickFilters
        />
        <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Current filters:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ mt: 1, fontFamily: 'monospace' }}>
            {JSON.stringify(values, null, 2)}
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const WithActiveFilters: Story = {
  args: {
    filters: sampleFilters,
    values: {
      status: ['active', 'pending'],
      priority: 'high',
      assignee: 'john',
    },
    showQuickFilters: true,
  },
};

export const Disabled: Story = {
  args: {
    filters: sampleFilters,
    disabled: true,
  },
};
