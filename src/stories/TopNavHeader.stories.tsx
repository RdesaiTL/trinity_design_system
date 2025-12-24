import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import TopNavHeader from '../components/TopNavHeader';
import { Box } from '@mui/material';

/**
 * # TopNavHeader
 * 
 * The TopNavHeader is the primary navigation component for Trinity applications.
 * It provides a consistent header experience with branding, search, client selection,
 * app switching, and user menu functionality.
 * 
 * ## Features
 * - **Trinity Logo & App Name**: Displays the Trinity logo with the application name
 * - **Search Bar**: Centered search with white background on focus and clear button
 * - **Client Selector**: Dropdown to switch between clients with "Switch Clients" header
 * - **Apps Menu**: Access to other Trinity applications (TrinityEDGE)
 * - **User Menu**: Avatar with user info, Help, Notifications, and Logout options
 * 
 * ## Accessibility
 * - All interactive elements are keyboard accessible
 * - WCAG 2.1 AA compliant color contrast ratios
 * - Proper ARIA labels for menus and buttons
 * 
 * ## Usage Guidelines
 * - Use at the top of every page in your application
 * - Always provide `appName` to identify the application
 * - Provide `clients` array if your app supports multi-client switching
 */
const meta: Meta<typeof TopNavHeader> = {
  title: 'Navigation/TopNavHeader',
  component: TopNavHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full-width top navigation header with Trinity branding, search, client selector, apps menu, and user menu.',
      },
    },
  },
  argTypes: {
    appName: {
      control: 'text',
      description: 'The name of the application displayed next to the Trinity logo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'App Name' },
      },
    },
    clientName: {
      control: 'text',
      description: 'The currently selected client name',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Long Client Name 1' },
      },
    },
    clients: {
      control: 'object',
      description: 'Array of available clients for the dropdown selector',
      table: {
        type: { summary: '{ id: string; name: string }[]' },
      },
    },
    userInitials: {
      control: 'text',
      description: 'User initials displayed in the avatar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'RD' },
      },
    },
    userName: {
      control: 'text',
      description: 'Full name of the logged-in user',
      table: {
        type: { summary: 'string' },
      },
    },
    userEmail: {
      control: 'text',
      description: 'Email address of the logged-in user',
      table: {
        type: { summary: 'string' },
      },
    },
    apps: {
      control: 'object',
      description: 'Array of Trinity applications available in the apps menu',
      table: {
        type: { summary: '{ id: string; name: string; url?: string }[]' },
      },
    },
    onClientChange: {
      action: 'client-changed',
      description: 'Callback fired when user selects a different client',
      table: {
        type: { summary: '(clientId: string) => void' },
      },
    },
    onSearch: {
      action: 'search',
      description: 'Callback fired when user submits a search query',
      table: {
        type: { summary: '(query: string) => void' },
      },
    },
    onAppsClick: {
      action: 'app-clicked',
      description: 'Callback fired when user clicks on an app in the apps menu',
      table: {
        type: { summary: '(appId: string) => void' },
      },
    },
    onUserMenuClick: {
      action: 'user-menu-clicked',
      description: 'Callback fired when user clicks a menu item (Help, Notifications, Logout)',
      table: {
        type: { summary: '(action: string) => void' },
      },
    },
  },
  args: {
    onClientChange: fn(),
    onSearch: fn(),
    onAppsClick: fn(),
    onUserMenuClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default header configuration showing all features.
 * Click on the client selector, apps menu, and user avatar to see the dropdowns.
 */
export const Default: Story = {
  args: {
    appName: 'Launch Accelerator',
    clientName: 'Pharma Corp',
    userName: 'John Smith',
    userEmail: 'jsmith@trinitylifesciences.com',
    userInitials: 'JS',
  },
};

/**
 * Header with minimal configuration - just the app name.
 * Useful for applications that don't require client switching.
 */
export const Minimal: Story = {
  args: {
    appName: 'CloudCast',
    userInitials: 'AB',
    userName: 'Alice Brown',
    userEmail: 'abrown@trinitylifesciences.com',
    clients: [],
  },
};

/**
 * Header configured for a different Trinity application.
 */
export const TerraApplication: Story = {
  args: {
    appName: 'Terra',
    clientName: 'BioTech Solutions',
    userName: 'Sarah Johnson',
    userEmail: 'sjohnson@trinitylifesciences.com',
    userInitials: 'SJ',
    clients: [
      { id: '1', name: 'BioTech Solutions' },
      { id: '2', name: 'MedPharm Industries' },
      { id: '3', name: 'Healthcare Partners' },
    ],
    apps: [
      { id: 'launch-accelerator', name: 'Launch Accelerator' },
      { id: 'cloudcast', name: 'CloudCast' },
      { id: 'market-intel', name: 'Market Intelligence Dashboard' },
    ],
  },
};

/**
 * Header with many clients in the selector.
 * Tests the dropdown behavior with a long list.
 */
export const ManyClients: Story = {
  args: {
    appName: 'Market Intelligence',
    clientName: 'Client Alpha',
    userName: 'Mike Wilson',
    userEmail: 'mwilson@trinitylifesciences.com',
    userInitials: 'MW',
    clients: [
      { id: '1', name: 'Client Alpha' },
      { id: '2', name: 'Client Beta' },
      { id: '3', name: 'Client Gamma' },
      { id: '4', name: 'Client Delta' },
      { id: '5', name: 'Client Epsilon' },
      { id: '6', name: 'Client Zeta' },
      { id: '7', name: 'Client Eta' },
      { id: '8', name: 'Client Theta' },
      { id: '9', name: 'Client Iota' },
      { id: '10', name: 'Client Kappa' },
    ],
  },
};

/**
 * Example showing how the header looks with a very long application name.
 */
export const LongAppName: Story = {
  args: {
    appName: 'Market Intelligence Dashboard Pro',
    clientName: 'Very Long Client Organization Name Inc.',
    userName: 'Christopher Alexander',
    userEmail: 'calexander@trinitylifesciences.com',
    userInitials: 'CA',
  },
};

/**
 * Interactive demo showing all callback actions in the Actions panel.
 * Try interacting with the search, client selector, apps menu, and user menu.
 */
export const InteractiveDemo: Story = {
  args: {
    appName: 'Demo Application',
    clientName: 'Demo Client',
    userName: 'Demo User',
    userEmail: 'demo@trinitylifesciences.com',
    userInitials: 'DU',
  },
  parameters: {
    docs: {
      description: {
        story: 'Try interacting with all the header elements. Check the Actions panel below to see the callback events being fired.',
      },
    },
  },
};

/**
 * Header displayed on a page with content below it.
 * Shows how the header integrates with page content.
 */
export const WithPageContent: Story = {
  args: {
    appName: 'Launch Accelerator',
    clientName: 'Pharma Corp',
    userName: 'John Smith',
    userEmail: 'jsmith@trinitylifesciences.com',
    userInitials: 'JS',
  },
  render: (args) => (
    <Box>
      <TopNavHeader {...args} />
      <Box sx={{ p: 3, bgcolor: '#FAFAFA', minHeight: '50vh' }}>
        <h1>Page Content</h1>
        <p>This demonstrates how the header looks with page content below it.</p>
      </Box>
    </Box>
  ),
};
