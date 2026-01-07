import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Button } from '@mui/material';
import {
  TrendingUp as TrendIcon,
  People as PeopleIcon,
  ShoppingCart as CartIcon,
  AttachMoney as MoneyIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  Upload as Upload,
} from '@mui/icons-material';
import { DashboardTemplate, type KpiItem, type ActivityItem } from '../components/templates/Dashboard';

const meta: Meta<typeof DashboardTemplate> = {
  title: 'Templates/DashboardTemplate',
  component: DashboardTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive dashboard template with KPI cards, charts grid, and activity feed sidebar.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleKpis: KpiItem[] = [
  { id: '1', title: 'Total Revenue', value: '$48,250', trend: 'up', trendValue: 12.5, icon: <MoneyIcon /> },
  { id: '2', title: 'Active Users', value: '2,847', trend: 'up', trendValue: 8.2, icon: <PeopleIcon /> },
  { id: '3', title: 'Orders', value: '1,234', trend: 'down', trendValue: -3.1, icon: <CartIcon /> },
  { id: '4', title: 'Conversion Rate', value: '3.24%', trend: 'flat', trendValue: 0.1, icon: <TrendIcon /> },
];

const sampleActivities: ActivityItem[] = [
  { id: '1', title: 'New order placed', description: 'Order #12345 - $299.00', timestamp: '2 min ago', type: 'success', icon: <CheckIcon fontSize="small" /> },
  { id: '2', title: 'User profile updated', description: 'John Smith updated their profile', timestamp: '15 min ago', icon: <EditIcon fontSize="small" /> },
  { id: '3', title: 'Report generated', description: 'Monthly sales report ready', timestamp: '1 hour ago', type: 'info', icon: <Upload fontSize="small" /> },
  { id: '4', title: 'New signup', description: 'jane@example.com joined', timestamp: '2 hours ago', avatar: 'https://i.pravatar.cc/40?u=jane' },
  { id: '5', title: 'Payment received', description: '$1,500.00 from Client ABC', timestamp: '3 hours ago', type: 'success', icon: <CheckIcon fontSize="small" /> },
];

// Mock chart component
const MockChart = ({ title, height = 200 }: { title: string; height?: number }) => (
  <Box sx={{ height }}>
    <Typography variant="subtitle2" gutterBottom>{title}</Typography>
    <Box
      sx={{
        height: height - 40,
        bgcolor: 'action.hover',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography color="text.secondary">Chart Placeholder</Typography>
    </Box>
  </Box>
);

export const Default: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Welcome back! Here\'s what\'s happening with your business.',
    kpis: sampleKpis,
    activities: sampleActivities,
    lastUpdated: new Date().toLocaleString(),
    onRefresh: () => console.log('Refresh clicked'),
    mainChart: <MockChart title="Revenue Trend" height={300} />,
    secondaryCharts: [
      <MockChart key="1" title="Sales by Category" />,
      <MockChart key="2" title="Customer Demographics" />,
    ],
  },
};

export const WithHeaderActions: Story = {
  args: {
    ...Default.args,
    headerActions: (
      <>
        <Button variant="outlined" size="small">Export</Button>
        <Button variant="contained" size="small">Add Widget</Button>
      </>
    ),
  },
};

export const WithoutActivityFeed: Story = {
  args: {
    title: 'Analytics Dashboard',
    kpis: sampleKpis,
    mainChart: <MockChart title="Traffic Overview" height={350} />,
    secondaryCharts: [
      <MockChart key="1" title="Page Views" />,
      <MockChart key="2" title="Bounce Rate" />,
      <MockChart key="3" title="Session Duration" />,
      <MockChart key="4" title="Top Pages" />,
    ],
    showActivityFeed: false,
  },
};

export const Loading: Story = {
  args: {
    title: 'Dashboard',
    kpis: sampleKpis,
    activities: sampleActivities,
    loading: true,
  },
};

export const MinimalKPIs: Story = {
  args: {
    title: 'Quick Overview',
    kpis: sampleKpis.slice(0, 2),
    kpiColumns: 2,
    mainChart: <MockChart title="Main Metrics" height={400} />,
    showActivityFeed: false,
  },
};

export const WithSidebarContent: Story = {
  args: {
    ...Default.args,
    sidebarContent: (
      <Box>
        <Typography variant="subtitle2" gutterBottom>Quick Actions</Typography>
        <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Create Report</Button>
        <Button variant="outlined" fullWidth>Schedule Meeting</Button>
      </Box>
    ),
  },
};
