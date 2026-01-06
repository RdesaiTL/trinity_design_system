import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import Footer from '../components/Footer';

/**
 * # Footer
 * 
 * A consistent footer component for Trinity applications, matching the TopNavHeader design.
 * 
 * ## Features
 * - **Auto-updating year** - Copyright year updates automatically
 * - **Responsive** - Stacks vertically on mobile
 * - **Customizable links** - Pass custom navigation links
 * - **Light/Dark variants** - Match your page background
 * - **Accessible** - Proper ARIA labels and focus states
 * 
 * ## Design Guidelines
 * - Use dark variant with navy background for primary pages
 * - Use light variant when footer appears on white/light backgrounds
 * - External links open in new tab by default
 */
const meta: Meta<typeof Footer> = {
  title: 'Navigation/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Footer component with copyright and navigation links, matching TopNavHeader styling.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['dark', 'light'],
      description: 'Visual variant for different backgrounds',
      table: { defaultValue: { summary: 'dark' } },
    },
    companyName: {
      control: 'text',
      description: 'Company name in copyright notice',
      table: { defaultValue: { summary: 'Trinity LifeSciences' } },
    },
    links: {
      control: 'object',
      description: 'Array of footer navigation links',
    },
  },
  decorators: [
    (Story, context) => (
      <Box sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default footer with Trinity branding and standard links.
 */
export const Default: Story = {
  args: {},
};

/**
 * Light variant for use on white/light backgrounds.
 */
export const LightVariant: Story = {
  args: {
    variant: 'light',
  },
  decorators: [
    (Story) => (
      <Box sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', bgcolor: 'grey.100' }}>
        <Story />
      </Box>
    ),
  ],
};

/**
 * Custom links example - you can pass any links you need.
 */
export const CustomLinks: Story = {
  args: {
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Support', href: 'mailto:support@example.com', external: false },
    ],
  },
};

/**
 * Custom company name for white-label applications.
 */
export const CustomCompanyName: Story = {
  args: {
    companyName: 'Acme Healthcare',
  },
};

/**
 * Minimal footer with single link.
 */
export const MinimalLinks: Story = {
  args: {
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
};

/**
 * Footer integrated with TopNavHeader in a full-page layout.
 */
export const FullPageLayout: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}>
        {/* Mock TopNav */}
        <Box sx={{ 
          height: 56, 
          bgcolor: 'primary.main', 
          display: 'flex', 
          alignItems: 'center', 
          px: 3 
        }}>
          <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>Trinity App</Box>
        </Box>
        
        {/* Main Content */}
        <Box sx={{ flex: 1, p: 3 }}>
          <Box sx={{ maxWidth: 600 }}>
            <h2>Page Content</h2>
            <p>This demonstrates the footer in context with a full page layout.</p>
          </Box>
        </Box>
        
        {/* Footer */}
        <Story />
      </Box>
    ),
  ],
};

/**
 * Mobile-responsive view - footer stacks vertically on small screens.
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
