import type { Meta, StoryObj } from '@storybook/react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Badge,
  Paper,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FolderIcon from '@mui/icons-material/Folder';
import { useState } from 'react';
import { brandColors } from '../theme';

/**
 * # Tabs
 * 
 * Tabs organize content across different screens, data sets, and other interactions.
 * They allow users to navigate between groups of related content.
 * 
 * ## Types
 * - **Horizontal Tabs**: Standard left-to-right navigation
 * - **Vertical Tabs**: Sidebar-style navigation
 * - **Scrollable Tabs**: For many tab items
 * - **Icon Tabs**: Tabs with only icons
 * 
 * ## Design Guidelines
 * - Use 2-7 tabs for optimal usability
 * - Keep tab labels concise (1-2 words)
 * - Order tabs by importance or workflow
 * - Use badges sparingly for notifications
 * 
 * ## Accessibility
 * - Keyboard navigation with arrow keys
 * - Proper ARIA tab/tabpanel structure
 * - Focus indicator on active tab
 */

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface TabsDemoProps {
  variant?: 'standard' | 'fullWidth' | 'scrollable' | 'vertical' | 'icons' | 'withBadges' | 'contained';
}

const TabsDemo = ({ variant = 'standard' }: TabsDemoProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (variant === 'vertical') {
    return (
      <Box sx={{ display: 'flex', height: 300, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            minWidth: 160,
          }}
        >
          <Tab icon={<HomeIcon />} iconPosition="start" label="Dashboard" />
          <Tab icon={<BarChartIcon />} iconPosition="start" label="Analytics" />
          <Tab icon={<FolderIcon />} iconPosition="start" label="Projects" />
          <Tab icon={<PersonIcon />} iconPosition="start" label="Profile" />
          <Tab icon={<SettingsIcon />} iconPosition="start" label="Settings" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography variant="h6">Dashboard</Typography>
          <Typography color="text.secondary">Welcome to your dashboard overview.</Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h6">Analytics</Typography>
          <Typography color="text.secondary">View your analytics and reports.</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="h6">Projects</Typography>
          <Typography color="text.secondary">Manage your active projects.</Typography>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography variant="h6">Profile</Typography>
          <Typography color="text.secondary">Update your profile information.</Typography>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Typography variant="h6">Settings</Typography>
          <Typography color="text.secondary">Configure application settings.</Typography>
        </TabPanel>
      </Box>
    );
  }

  if (variant === 'icons') {
    return (
      <Box sx={{ width: '100%' }}>
        <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab icon={<HomeIcon />} aria-label="home" />
            <Tab icon={<BarChartIcon />} aria-label="analytics" />
            <Tab icon={<FolderIcon />} aria-label="projects" />
            <Tab 
              icon={
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              } 
              aria-label="notifications" 
            />
            <Tab icon={<SettingsIcon />} aria-label="settings" />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <Typography>Home content</Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>Analytics content</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Projects content</Typography>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography>Notifications content</Typography>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Typography>Settings content</Typography>
        </TabPanel>
      </Box>
    );
  }

  if (variant === 'withBadges') {
    return (
      <Box sx={{ width: '100%' }}>
        <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="All Items" />
            <Tab 
              label={
                <Badge badgeContent={12} color="primary" sx={{ pr: 2 }}>
                  Pending
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent="New" color="secondary" sx={{ pr: 3 }}>
                  Updates
                </Badge>
              } 
            />
            <Tab label="Completed" />
            <Tab 
              label={
                <Badge badgeContent={3} color="error" sx={{ pr: 2 }}>
                  Urgent
                </Badge>
              } 
            />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <Typography>All items list</Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>12 pending items</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>New updates available</Typography>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography>Completed items</Typography>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Typography>3 urgent items require attention</Typography>
        </TabPanel>
      </Box>
    );
  }

  if (variant === 'scrollable') {
    return (
      <Box sx={{ maxWidth: 500, bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Overview" />
          <Tab label="Market Analysis" />
          <Tab label="Competitive Intel" />
          <Tab label="Sales Data" />
          <Tab label="Forecasts" />
          <Tab label="KOL Mapping" />
          <Tab label="Territory" />
          <Tab label="Settings" />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={value}>
          <Typography>Content for tab {value + 1}</Typography>
        </TabPanel>
      </Box>
    );
  }

  if (variant === 'fullWidth') {
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Overview" />
          <Tab label="Details" />
          <Tab label="History" />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <Typography variant="h6">Overview</Typography>
          <Typography color="text.secondary">
            High-level summary information displayed here.
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h6">Details</Typography>
          <Typography color="text.secondary">
            Detailed information and breakdowns.
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="h6">History</Typography>
          <Typography color="text.secondary">
            Historical data and changes over time.
          </Typography>
        </TabPanel>
      </Box>
    );
  }

  if (variant === 'contained') {
    return (
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            bgcolor: brandColors.primary.main,
            borderRadius: '12px 12px 0 0',
            px: 2,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.7)',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'white',
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Analytics" />
            <Tab label="Reports" />
            <Tab label="Settings" />
          </Tabs>
        </Box>
        <Paper sx={{ borderRadius: '0 0 12px 12px', p: 3 }}>
          {value === 0 && <Typography>Overview content goes here</Typography>}
          {value === 1 && <Typography>Analytics content goes here</Typography>}
          {value === 2 && <Typography>Reports content goes here</Typography>}
          {value === 3 && <Typography>Settings content goes here</Typography>}
        </Paper>
      </Box>
    );
  }

  // Standard variant
  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview" />
          <Tab label="Analytics" />
          <Tab label="Reports" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Typography variant="h6">Overview</Typography>
        <Typography color="text.secondary">
          Get a high-level view of your data and key metrics.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6">Analytics</Typography>
        <Typography color="text.secondary">
          Deep dive into analytics and visualizations.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6">Reports</Typography>
        <Typography color="text.secondary">
          Generate and download custom reports.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="h6">Settings</Typography>
        <Typography color="text.secondary">
          Configure your preferences and account settings.
        </Typography>
      </TabPanel>
    </Box>
  );
};

const meta: Meta<typeof TabsDemo> = {
  title: 'Navigation/Tabs',
  component: TabsDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tab navigation for organizing content into sections.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'fullWidth', 'scrollable', 'vertical', 'icons', 'withBadges', 'contained'],
      description: 'Visual variant of the tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive Tabs playground - use Controls to customize.
 */
export const Playground: Story = {
  argTypes: {
    centered: {
      control: 'boolean',
      description: 'Center the tabs',
    },
    textColor: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit'],
      description: 'Tab text color',
    },
    indicatorColor: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Indicator color',
    },
  },
  render: (args: { centered?: boolean; textColor?: 'primary' | 'secondary' | 'inherit'; indicatorColor?: 'primary' | 'secondary' }) => {
    const [value, setValue] = useState(0);
    return (
      <Box sx={{ width: '100%' }}>
        <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            centered={args.centered}
            textColor={args.textColor}
            indicatorColor={args.indicatorColor}
          >
            <Tab label="Tab One" />
            <Tab label="Tab Two" />
            <Tab label="Tab Three" />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <Typography>Content for Tab One</Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>Content for Tab Two</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Content for Tab Three</Typography>
        </TabPanel>
      </Box>
    );
  },
  args: {
    centered: false,
    textColor: 'primary',
    indicatorColor: "secondary",
  },
};

/**
 * Standard horizontal tabs.
 */
export const Standard: Story = {
  args: {
    variant: 'standard',
  },
};

/**
 * Full-width tabs that span the container.
 */
export const FullWidth: Story = {
  args: {
    variant: 'fullWidth',
  },
};

/**
 * Scrollable tabs for many items.
 */
export const Scrollable: Story = {
  args: {
    variant: 'scrollable',
  },
};

/**
 * Vertical tabs for sidebar navigation.
 */
export const Vertical: Story = {
  args: {
    variant: 'vertical',
  },
};

/**
 * Icon-only tabs for compact navigation.
 */
export const IconTabs: Story = {
  args: {
    variant: 'icons',
  },
};

/**
 * Tabs with notification badges.
 */
export const WithBadges: Story = {
  args: {
    variant: 'withBadges',
  },
};

/**
 * Contained tabs with colored background.
 */
export const Contained: Story = {
  args: {
    variant: 'contained',
  },
};
