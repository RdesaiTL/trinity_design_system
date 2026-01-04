import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '../components/PageHeader';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import AnalyticsIcon from '@mui/icons-material/Analytics';

/**
 * # PageHeader
 * 
 * The PageHeader component provides a consistent header pattern for pages within
 * Trinity applications. It includes breadcrumb navigation, page title, description,
 * contextual actions, and optional tab navigation.
 * 
 * ## Features
 * - **Breadcrumb navigation**: Shows page hierarchy
 * - **Title & subtitle**: Clear page identification
 * - **Action buttons**: Primary and secondary actions
 * - **Tab navigation**: Sub-section navigation
 * - **Status badges**: Show page/item status
 * - **Multiple variants**: Default, compact, and hero
 * 
 * ## Accessibility
 * - Breadcrumbs use proper `nav` and `aria-label`
 * - Tab navigation is keyboard accessible
 * - Action buttons have descriptive labels
 */
const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Consistent page header with breadcrumbs, title, actions, and tabs.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'hero'],
      description: 'Visual variant',
    },
    statusColor: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'default'],
      description: 'Status badge color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultBreadcrumbs = [
  { label: 'Home', href: '#' },
  { label: 'Analytics', href: '#' },
  { label: 'Dashboard' },
];

/**
 * Default page header with all features.
 */
export const Default: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Overview of your analytics and performance metrics.',
    breadcrumbs: defaultBreadcrumbs,
    primaryAction: 'Create Report',
    secondaryAction: 'Export',
    showBreadcrumbs: true,
  },
};

/**
 * Page header with tab navigation for sub-sections.
 */
export const WithTabs: Story = {
  args: {
    title: 'Client Profile',
    subtitle: 'Manage client information, contacts, and engagement history.',
    breadcrumbs: [
      { label: 'Home', href: '#' },
      { label: 'Clients', href: '#' },
      { label: 'Pharma Corp' },
    ],
    tabs: ['Overview', 'Contacts', 'Engagements', 'Documents', 'Settings'],
    selectedTab: 0,
    primaryAction: 'Edit Client',
  },
};

/**
 * Page header with status badge.
 */
export const WithStatus: Story = {
  args: {
    title: 'Campaign Details',
    subtitle: 'Q4 Marketing Campaign',
    breadcrumbs: [
      { label: 'Home', href: '#' },
      { label: 'Campaigns', href: '#' },
      { label: 'Q4 Marketing' },
    ],
    statusLabel: 'Active',
    statusColor: 'success',
    primaryAction: 'Edit',
    secondaryAction: 'Pause',
  },
};

/**
 * Page header with icon.
 */
export const WithIcon: Story = {
  args: {
    title: 'Analytics Dashboard',
    subtitle: 'Real-time insights and performance metrics.',
    breadcrumbs: defaultBreadcrumbs,
    icon: <AnalyticsIcon />,
    primaryAction: 'Generate Report',
  },
};

/**
 * Compact variant for dense layouts.
 */
export const Compact: Story = {
  args: {
    title: 'Settings',
    breadcrumbs: [
      { label: 'Home', href: '#' },
      { label: 'Settings' },
    ],
    variant: 'compact',
  },
};

/**
 * Hero variant with background image.
 */
export const Hero: Story = {
  args: {
    title: 'Welcome to Trinity',
    subtitle: 'Your unified platform for life sciences analytics and insights.',
    variant: 'hero',
    primaryAction: 'Get Started',
    secondaryAction: 'Learn More',
    showBreadcrumbs: false,
  },
};

/**
 * Page header with custom actions.
 */
export const WithCustomActions: Story = {
  args: {
    title: 'Report Details',
    subtitle: 'Monthly performance analysis',
    breadcrumbs: [
      { label: 'Home', href: '#' },
      { label: 'Reports', href: '#' },
      { label: 'Monthly Performance' },
    ],
    primaryAction: 'Download',
    actions: (
      <>
        <Tooltip title="Share">
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
};

/**
 * Loading state with skeletons.
 */
export const Loading: Story = {
  args: {
    title: '',
    loading: true,
  },
};

/**
 * All variants showcase.
 */
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ p: 2, bgcolor: 'grey.100' }}>
          Default Variant
        </Typography>
        <PageHeader
          title="Default Page Header"
          subtitle="Standard page header with all features"
          breadcrumbs={defaultBreadcrumbs}
          primaryAction="Primary"
          secondaryAction="Secondary"
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ p: 2, bgcolor: 'grey.100' }}>
          Compact Variant
        </Typography>
        <PageHeader
          title="Compact Header"
          breadcrumbs={[{ label: 'Home', href: '#' }, { label: 'Page' }]}
          variant="compact"
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ p: 2, bgcolor: 'grey.100' }}>
          Hero Variant
        </Typography>
        <PageHeader
          title="Hero Header"
          subtitle="Full-width hero section with gradient background"
          variant="hero"
          primaryAction="Get Started"
          showBreadcrumbs={false}
        />
      </Box>
    </Box>
  ),
};
