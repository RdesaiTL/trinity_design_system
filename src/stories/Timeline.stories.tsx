import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Chip, Paper } from '@mui/material';
import {
  Check as CheckIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Comment as CommentIcon,
  Upload as UploadIcon,
  Person as PersonIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { Timeline, type TimelineItem } from '../components/Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile timeline component for activity feeds, audit logs, and historical data display.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: TimelineItem[] = [
  {
    id: '1',
    title: 'Project approved',
    description: 'The project proposal has been approved by the review committee.',
    timestamp: new Date().toISOString(),
    relativeTime: '2 hours ago',
    icon: <CheckIcon fontSize="small" />,
    type: 'success',
    actor: 'Sarah Johnson',
  },
  {
    id: '2',
    title: 'Updated project timeline',
    description: 'Extended deadline by 2 weeks based on scope changes.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    relativeTime: 'Yesterday',
    icon: <EditIcon fontSize="small" />,
    type: 'info',
    actor: 'Mike Chen',
  },
  {
    id: '3',
    title: 'Added 3 new comments',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    relativeTime: '2 days ago',
    icon: <CommentIcon fontSize="small" />,
    actor: 'Emily Davis',
  },
  {
    id: '4',
    title: 'Uploaded design files',
    description: 'Added 12 new design assets to the project.',
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    relativeTime: '3 days ago',
    icon: <UploadIcon fontSize="small" />,
    actor: 'John Smith',
    metadata: { 'Files': '12', 'Size': '24.5 MB' },
  },
  {
    id: '5',
    title: 'Project created',
    timestamp: new Date(Date.now() - 604800000).toISOString(),
    relativeTime: '1 week ago',
    icon: <StarIcon fontSize="small" />,
    type: 'success',
    actor: 'Admin',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Compact: Story = {
  args: {
    items: sampleItems,
    variant: 'compact',
  },
};

export const Detailed: Story = {
  args: {
    items: sampleItems,
    variant: 'detailed',
  },
};

export const WithoutConnector: Story = {
  args: {
    items: sampleItems,
    showConnector: false,
  },
};

export const WithAvatars: Story = {
  args: {
    items: sampleItems.map(item => ({
      ...item,
      icon: undefined,
      avatar: `https://i.pravatar.cc/40?u=${item.id}`,
    })),
  },
};

export const GroupedByDate: Story = {
  args: {
    items: sampleItems,
    groupByDate: true,
  },
};

export const WithExpandableContent: Story = {
  render: () => {
    const itemsWithExpanded: TimelineItem[] = [
      {
        id: '1',
        title: 'Deployment completed',
        description: 'Successfully deployed version 2.1.0',
        timestamp: new Date().toISOString(),
        relativeTime: '1 hour ago',
        icon: <CheckIcon fontSize="small" />,
        type: 'success',
        expandedContent: (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Deployment Details</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="v2.1.0" size="small" />
              <Chip label="Production" size="small" color="success" />
              <Chip label="3 services" size="small" />
            </Box>
          </Paper>
        ),
      },
      ...sampleItems.slice(1),
    ];

    return <Timeline items={itemsWithExpanded} variant="detailed" />;
  },
};

export const WithNestedItems: Story = {
  render: () => {
    const itemsWithChildren: TimelineItem[] = [
      {
        id: '1',
        title: 'Sprint completed',
        description: '15 stories completed, 3 carried over',
        timestamp: new Date().toISOString(),
        relativeTime: '3 hours ago',
        icon: <CheckIcon fontSize="small" />,
        type: 'success',
        children: [
          { id: '1-1', title: 'User authentication module', timestamp: '', relativeTime: '', type: 'success' },
          { id: '1-2', title: 'Dashboard redesign', timestamp: '', relativeTime: '', type: 'success' },
          { id: '1-3', title: 'API optimization', timestamp: '', relativeTime: '', type: 'warning' },
        ],
      },
      ...sampleItems.slice(1, 3),
    ];

    return <Timeline items={itemsWithChildren} />;
  },
};

export const Loading: Story = {
  args: {
    items: [],
    loading: true,
    loadingCount: 5,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    emptyMessage: 'No activity recorded yet',
  },
};

export const WithLoadMore: Story = {
  args: {
    items: sampleItems,
    showLoadMore: true,
    onLoadMore: () => console.log('Load more clicked'),
  },
};

export const WithMaxHeight: Story = {
  args: {
    items: [...sampleItems, ...sampleItems],
    maxHeight: 400,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 500 }}>
        <Story />
      </Box>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Default</Typography>
        <Timeline items={sampleItems.slice(0, 3)} variant="default" />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Compact</Typography>
        <Timeline items={sampleItems.slice(0, 3)} variant="compact" />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Detailed</Typography>
        <Timeline items={sampleItems.slice(0, 3)} variant="detailed" />
      </Box>
    </Box>
  ),
};
