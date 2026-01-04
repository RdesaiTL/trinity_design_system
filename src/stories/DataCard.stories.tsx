import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import {
  TrendingUp as TrendIcon,
  People as PeopleIcon,
  ShoppingCart as CartIcon,
  AttachMoney as MoneyIcon,
  Visibility as ViewsIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { DataCard } from '../components/DataCard';

const meta: Meta<typeof DataCard> = {
  title: 'Components/DataCard',
  component: DataCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile card component for displaying metrics with trends, sparklines, and comparison indicators.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSparkline = [10, 25, 18, 30, 22, 35, 40, 38, 45, 50, 48, 55];

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$48,250',
    trend: 'up',
    trendValue: 12.5,
    icon: <MoneyIcon />,
  },
};

export const WithSparkline: Story = {
  args: {
    title: 'Monthly Sales',
    value: '2,847',
    unit: 'units',
    trend: 'up',
    trendValue: 8.2,
    sparklineData: sampleSparkline,
    icon: <CartIcon />,
    iconColor: 'success',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DataCard
          title="Total Users"
          value="12,847"
          trend="up"
          trendValue={15.3}
          icon={<PeopleIcon />}
          iconColor="primary"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DataCard
          title="Revenue"
          value="$84,250"
          trend="up"
          trendValue={8.1}
          icon={<MoneyIcon />}
          iconColor="success"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DataCard
          title="Page Views"
          value="284K"
          trend="down"
          trendValue={-3.2}
          icon={<ViewsIcon />}
          iconColor="info"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DataCard
          title="Conversion Rate"
          value="3.24"
          unit="%"
          trend="flat"
          trendValue={0.1}
          icon={<TrendIcon />}
          iconColor="warning"
        />
      </Grid>
    </Grid>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <DataCard
          title="Small Card"
          value="1,234"
          size="small"
          trend="up"
          trendValue={5}
          icon={<PeopleIcon />}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DataCard
          title="Medium Card"
          value="5,678"
          size="medium"
          trend="up"
          trendValue={10}
          icon={<MoneyIcon />}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DataCard
          title="Large Card"
          value="9,012"
          size="large"
          trend="up"
          trendValue={15}
          icon={<CartIcon />}
        />
      </Grid>
    </Grid>
  ),
};

export const Variants: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <DataCard
          title="Default Variant"
          value="$12,345"
          variant="default"
          trend="up"
          trendValue={8}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DataCard
          title="Outlined Variant"
          value="$23,456"
          variant="outlined"
          trend="down"
          trendValue={-3}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DataCard
          title="Filled Variant"
          value="$34,567"
          variant="filled"
          trend="up"
          trendValue={12}
        />
      </Grid>
    </Grid>
  ),
};

export const WithSparklines: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataCard
          title="Weekly Sales"
          value="847"
          unit="orders"
          trend="up"
          trendValue={12.5}
          sparklineData={[20, 35, 28, 45, 38, 52, 48]}
          icon={<CartIcon />}
          iconColor="success"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataCard
          title="Active Users"
          value="3,241"
          trend="down"
          trendValue={-2.8}
          sparklineData={[100, 95, 88, 92, 85, 80, 78]}
          icon={<PeopleIcon />}
          iconColor="error"
        />
      </Grid>
    </Grid>
  ),
};

export const WithActions: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
      <Box sx={{ maxWidth: 300 }}>
        <DataCard
          title="Revenue"
          value="$48,250"
          trend="up"
          trendValue={12.5}
          icon={<MoneyIcon />}
          onMoreClick={(e) => setAnchorEl(e.currentTarget)}
          infoTooltip="Total revenue for the current month"
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>View Details</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Export Data</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Set Alert</MenuItem>
        </Menu>
      </Box>
    );
  },
};

export const Clickable: Story = {
  args: {
    title: 'Click Me',
    value: '1,234',
    trend: 'up',
    trendValue: 5,
    icon: <TrendIcon />,
    onClick: () => alert('Card clicked!'),
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Total Orders',
    value: '2,847',
    trend: 'up',
    trendValue: 8.2,
    icon: <CartIcon />,
    footer: (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Updated 5 min ago
        </Typography>
        <Button size="small">View All</Button>
      </Box>
    ),
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading Card',
    value: '',
    loading: true,
  },
};

export const WithComparison: Story = {
  args: {
    title: 'Monthly Target',
    value: '$48,250',
    trend: 'up',
    trendValue: 12.5,
    comparison: 'Target: $50,000 (96.5% achieved)',
    icon: <TrendIcon />,
    iconColor: 'success',
  },
};
