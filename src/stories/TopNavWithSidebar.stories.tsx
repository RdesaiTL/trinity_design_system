import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import TopNavWithSidebar from '../components/TopNavWithSidebar';
import { Box, Typography, Paper, Grid } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { SamplePageContent, sampleUser } from './utils';

/**
 * # TopNavWithSidebar
 * 
 * A complete layout component that combines the TopNavHeader with a collapsible
 * sidebar navigation. This is the recommended layout for Trinity applications
 * that require primary navigation.
 * 
 * ## Features
 * - **Collapsible Sidebar**: Toggle between expanded (200px) and collapsed (56px) states
 * - **Navigation Items**: Support for icons, labels, and selected states
 * - **Special Items**: Gradient background for AI/premium features (like "Insight Engine")
 * - **Hamburger Menu**: Toggle sidebar from the header
 * - **Smooth Transitions**: Animated expand/collapse with icon persistence
 * 
 * ## Design Specifications
 * - **Expanded Width**: 200px
 * - **Collapsed Width**: 56px
 * - **Header Height**: 56px
 * - **Selected State**: Navy (#050742) background
 * - **Special Item**: Gradient background (Coral to Purple)
 * 
 * ## Accessibility
 * - Keyboard navigation support
 * - Tooltips shown when sidebar is collapsed
 * - Focus indicators on all interactive elements
 * 
 * ## Usage Guidelines
 * - Wrap your page content as children of this component
 * - Mark one item as `selected` to indicate current page
 * - Use `isSpecial: true` for AI/premium feature items
 */
const meta: Meta<typeof TopNavWithSidebar> = {
  title: 'Navigation/TopNavWithSidebar',
  component: TopNavWithSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete layout with top navigation header and collapsible sidebar for primary navigation.',
      },
    },
  },
  argTypes: {
    appName: {
      control: 'text',
      description: 'Application name displayed in the header',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'App Name' },
      },
    },
    navItems: {
      control: 'object',
      description: 'Array of navigation items for the sidebar',
      table: {
        type: { summary: 'NavItem[]' },
      },
    },
    selectedNavItem: {
      control: 'text',
      description: 'ID of the currently selected navigation item',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultSidebarExpanded: {
      control: 'boolean',
      description: 'Whether the sidebar starts expanded or collapsed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onNavItemClick: {
      action: 'nav-item-clicked',
      description: 'Callback fired when a navigation item is clicked',
      table: {
        type: { summary: '(itemId: string) => void' },
      },
    },
    onSidebarToggle: {
      action: 'sidebar-toggled',
      description: 'Callback fired when the sidebar is expanded or collapsed',
      table: {
        type: { summary: '(expanded: boolean) => void' },
      },
    },
    children: {
      control: false,
      description: 'Page content to render in the main area',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
  args: {
    onNavItemClick: fn(),
    onSidebarToggle: fn(),
    onClientChange: fn(),
    onSearch: fn(),
    onAppsClick: fn(),
    onUserMenuClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default navigation items
const defaultNavItems = [
  { id: 'home', label: 'Home', icon: <HomeOutlinedIcon /> },
  { id: 'trends', label: 'Trends', icon: <TrendingUpIcon /> },
  { id: 'forecast', label: 'Forecast', icon: <TrackChangesIcon /> },
  { id: 'resources', label: 'Resources', icon: <FolderOpenIcon /> },
  { id: 'support', label: 'Support', icon: <SupportAgentIcon /> },
  { id: 'insight-engine', label: 'Insight Engine', icon: <AutoAwesomeIcon />, isSpecial: true },
];

/**
 * Default layout with the sidebar expanded and Home selected.
 * Click the hamburger icon to toggle the sidebar.
 */
export const Default: Story = {
  args: {
    appName: 'Launch Accelerator',
    clientName: 'Pharma Corp',
    userName: sampleUser.name,
    userEmail: sampleUser.email,
    userInitials: sampleUser.initials,
    navItems: defaultNavItems,
    selectedNavItem: 'home',
    defaultSidebarExpanded: true,
  },
  render: (args) => (
    <TopNavWithSidebar {...args}>
      <SamplePageContent />
    </TopNavWithSidebar>
  ),
};

/**
 * Layout with the sidebar collapsed by default.
 * Only icons are visible until the user expands it.
 */
export const CollapsedSidebar: Story = {
  args: {
    appName: 'Launch Accelerator',
    clientName: 'Pharma Corp',
    userName: sampleUser.name,
    userEmail: sampleUser.email,
    userInitials: sampleUser.initials,
    navItems: defaultNavItems,
    selectedNavItem: 'trends',
    defaultSidebarExpanded: false,
  },
  render: (args) => (
    <TopNavWithSidebar {...args}>
      <SamplePageContent />
    </TopNavWithSidebar>
  ),
};

/**
 * Layout with the "Insight Engine" AI feature selected.
 * Notice the gradient background on the special navigation item.
 */
export const SpecialItemSelected: Story = {
  args: {
    appName: 'Launch Accelerator',
    clientName: 'Pharma Corp',
    userName: 'John Smith',
    userEmail: 'jsmith@trinitylifesciences.com',
    userInitials: 'JS',
    navItems: defaultNavItems,
    selectedNavItem: 'insight-engine',
    defaultSidebarExpanded: true,
  },
  render: (args) => (
    <TopNavWithSidebar {...args}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          ✨ Insight Engine
        </Typography>
        <Typography color="text.secondary">
          AI-powered insights and recommendations
        </Typography>
      </Box>
    </TopNavWithSidebar>
  ),
};

/**
 * Layout configured for a different application with custom navigation.
 */
export const TerraApplication: Story = {
  args: {
    appName: 'Terra',
    clientName: 'BioTech Solutions',
    userName: 'Sarah Johnson',
    userEmail: 'sjohnson@trinitylifesciences.com',
    userInitials: 'SJ',
    navItems: [
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { id: 'analytics', label: 'Analytics', icon: <BarChartIcon /> },
      { id: 'users', label: 'Users', icon: <PeopleIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
      { id: 'ai-assistant', label: 'AI Assistant', icon: <AutoAwesomeIcon />, isSpecial: true },
    ],
    selectedNavItem: 'dashboard',
    defaultSidebarExpanded: true,
  },
  render: (args) => (
    <TopNavWithSidebar {...args}>
      <SamplePageContent />
    </TopNavWithSidebar>
  ),
};

/**
 * Layout with many navigation items to test scrolling.
 */
export const ManyNavItems: Story = {
  args: {
    appName: 'Market Intelligence',
    clientName: 'Pharma Corp',
    userName: 'Mike Wilson',
    userEmail: 'mwilson@trinitylifesciences.com',
    userInitials: 'MW',
    navItems: [
      { id: 'home', label: 'Home', icon: <HomeOutlinedIcon /> },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { id: 'analytics', label: 'Analytics', icon: <BarChartIcon /> },
      { id: 'trends', label: 'Trends', icon: <TrendingUpIcon /> },
      { id: 'forecast', label: 'Forecast', icon: <TrackChangesIcon /> },
      { id: 'resources', label: 'Resources', icon: <FolderOpenIcon /> },
      { id: 'users', label: 'Users', icon: <PeopleIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
      { id: 'support', label: 'Support', icon: <SupportAgentIcon /> },
      { id: 'insight-engine', label: 'Insight Engine', icon: <AutoAwesomeIcon />, isSpecial: true },
    ],
    selectedNavItem: 'home',
    defaultSidebarExpanded: true,
  },
  render: (args) => (
    <TopNavWithSidebar {...args}>
      <SamplePageContent />
    </TopNavWithSidebar>
  ),
};

/**
 * Interactive demo with all events logged to the Actions panel.
 * Try clicking navigation items and toggling the sidebar.
 */
export const InteractiveDemo: Story = {
  args: {
    appName: 'Demo Application',
    clientName: 'Demo Client',
    userName: 'Demo User',
    userEmail: 'demo@trinitylifesciences.com',
    userInitials: 'DU',
    navItems: defaultNavItems,
    selectedNavItem: 'home',
    defaultSidebarExpanded: true,
  },
  render: (args) => (
    <TopNavWithSidebar {...args}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Interactive Demo</Typography>
        <Typography color="text.secondary" paragraph>
          Try the following interactions:
        </Typography>
        <ul>
          <li>Click the hamburger menu (☰) to toggle the sidebar</li>
          <li>Click navigation items to see selection state change</li>
          <li>Use the search bar in the header</li>
          <li>Click the client selector, apps menu, and user avatar</li>
        </ul>
        <Typography color="text.secondary">
          Check the <strong>Actions</strong> panel below to see events being fired.
        </Typography>
      </Box>
    </TopNavWithSidebar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Try all the interactive elements and watch the Actions panel for callback events.',
      },
    },
  },
};
