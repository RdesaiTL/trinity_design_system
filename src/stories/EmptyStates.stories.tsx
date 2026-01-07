import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Stack, Paper, Button, Link } from '@mui/material';
import { IllustratedMessage } from '../components/IllustratedMessage';
import type { IllustrationType, IllustratedMessageSize } from '../components/IllustratedMessage';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

/**
 * # Empty States
 * 
 * Empty states communicate to users that there is no data to display
 * and provide guidance on what to do next.
 * 
 * The `IllustratedMessage` component provides a consistent way to display
 * empty states with branded illustrations, titles, descriptions, and actions.
 * 
 * ## Available Illustrations
 * - `empty-table` - No data in tables
 * - `empty-drafts` - No drafts/documents
 * - `getting-started` - Onboarding empty state
 * - `empty-documents` - No documents
 * - `empty-insights` - No analytics data
 * - `no-results` - Search returned nothing
 * - `error-generic` - Something went wrong
 * - `error-404` - Page not found
 * - `error-500` - Server error
 * - `error-permission` - Access denied
 * - `upload` - Upload prompt
 * - `success` - Action completed
 * - `no-notifications` - No notifications
 * - `no-data` - Generic no data
 * - `offline` - No internet connection
 * 
 * ## Design Guidelines
 * - Use appropriate illustrations that match the context
 * - Provide clear, helpful messaging
 * - Include a call-to-action when appropriate
 * - Use consistent sizing across the application
 */

const meta: Meta<typeof IllustratedMessage> = {
  title: 'Patterns/Empty States',
  component: IllustratedMessage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Empty state patterns using the IllustratedMessage component.',
      },
    },
  },
  argTypes: {
    illustration: {
      control: 'select',
      options: [
        'empty-table',
        'empty-drafts',
        'getting-started',
        'empty-documents',
        'empty-insights',
        'no-results',
        'error-generic',
        'error-404',
        'error-500',
        'error-permission',
        'upload',
        'success',
        'no-notifications',
        'no-data',
        'offline',
      ] as IllustrationType[],
      description: 'Type of illustration to display',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'] as IllustratedMessageSize[],
      description: 'Size of the component',
    },
    title: {
      control: 'text',
      description: 'Title text',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty state for no data scenarios.
 */
export const NoData: Story = {
  args: {
    illustration: 'no-data',
    title: 'No reports yet',
    description: 'Get started by creating your first market analysis report. It only takes a few minutes to set up.',
    primaryAction: {
      label: 'Create Report',
      onClick: () => console.log('Create report clicked'),
    },
    secondaryAction: {
      label: 'Learn how to create reports',
      href: '#',
    },
  },
};

/**
 * Empty state when search returns no results.
 */
export const NoResults: Story = {
  args: {
    illustration: 'no-results',
    title: 'No results found',
    description: "We couldn't find any results matching your search. Try adjusting your filters or search terms.",
    primaryAction: {
      label: 'Clear Filters',
      onClick: () => console.log('Clear filters clicked'),
    },
    secondaryAction: {
      label: 'Learn about search tips',
      href: '#',
    },
  },
};

/**
 * Error state when something goes wrong.
 */
export const Error: Story = {
  args: {
    illustration: 'error-generic',
    title: 'Something went wrong',
    description: "We're having trouble loading this data. Please try again or contact support if the problem persists.",
    primaryAction: {
      label: 'Try Again',
      onClick: () => console.log('Retry clicked'),
    },
    secondaryAction: {
      label: 'Contact Support',
      href: '#',
    },
  },
};

/**
 * Error 404 - Page not found.
 */
export const Error404: Story = {
  args: {
    illustration: 'error-404',
    title: 'Page not found',
    description: "The page you're looking for doesn't exist or has been moved.",
    primaryAction: {
      label: 'Go Home',
      onClick: () => console.log('Go home clicked'),
    },
  },
};

/**
 * Error 500 - Server error.
 */
export const Error500: Story = {
  args: {
    illustration: 'error-500',
    title: 'Server error',
    description: "We're experiencing technical difficulties. Our team has been notified and is working on a fix.",
    primaryAction: {
      label: 'Try Again',
      onClick: () => console.log('Retry clicked'),
    },
  },
};

/**
 * Offline state when there's no internet connection.
 */
export const Offline: Story = {
  args: {
    illustration: 'offline',
    title: "You're offline",
    description: 'Check your internet connection and try again. Some features may not be available offline.',
    primaryAction: {
      label: 'Retry Connection',
      onClick: () => console.log('Retry connection clicked'),
    },
  },
};

/**
 * Access denied / Permission error state.
 */
export const NoAccess: Story = {
  args: {
    illustration: 'error-permission',
    title: 'Access restricted',
    description: "You don't have permission to view this content. Request access from your administrator.",
    primaryAction: {
      label: 'Request Access',
      onClick: () => console.log('Request access clicked'),
    },
  },
};

/**
 * Empty table state.
 */
export const EmptyTable: Story = {
  args: {
    illustration: 'empty-table',
    title: 'No data in table',
    description: 'There are no records to display. Create a new entry to get started.',
    primaryAction: {
      label: 'Add Entry',
      onClick: () => console.log('Add entry clicked'),
    },
  },
};

/**
 * Empty drafts state.
 */
export const EmptyDrafts: Story = {
  args: {
    illustration: 'empty-drafts',
    title: 'No drafts',
    description: 'You have no saved drafts. Start writing to save your progress.',
    primaryAction: {
      label: 'Create Draft',
      onClick: () => console.log('Create draft clicked'),
    },
  },
};

/**
 * Getting started / Onboarding state.
 */
export const GettingStarted: Story = {
  args: {
    illustration: 'getting-started',
    title: 'Welcome to Trinity',
    description: "Let's get you set up! Follow our quick start guide to begin using the platform.",
    primaryAction: {
      label: 'Get Started',
      onClick: () => console.log('Get started clicked'),
    },
    secondaryAction: {
      label: 'Skip for now',
      href: '#',
    },
  },
};

/**
 * Empty documents state.
 */
export const EmptyDocuments: Story = {
  args: {
    illustration: 'empty-documents',
    title: 'No documents',
    description: 'Upload or create documents to organize your files.',
    primaryAction: {
      label: 'Upload Document',
      onClick: () => console.log('Upload clicked'),
    },
  },
};

/**
 * Empty insights / analytics state.
 */
export const EmptyInsights: Story = {
  args: {
    illustration: 'empty-insights',
    title: 'No analytics yet',
    description: 'Data will appear here as activity increases. Check back soon!',
    primaryAction: {
      label: 'Learn More',
      onClick: () => console.log('Learn more clicked'),
    },
  },
};

/**
 * Upload prompt state.
 */
export const Upload: Story = {
  args: {
    illustration: 'upload',
    title: 'Upload your files',
    description: 'Drag and drop files here, or click to browse.',
    primaryAction: {
      label: 'Browse Files',
      onClick: () => console.log('Browse clicked'),
    },
  },
};

/**
 * Success state.
 */
export const Success: Story = {
  args: {
    illustration: 'success',
    title: 'All done!',
    description: 'Your changes have been saved successfully.',
    primaryAction: {
      label: 'Continue',
      onClick: () => console.log('Continue clicked'),
    },
  },
};

/**
 * No notifications state.
 */
export const NoNotifications: Story = {
  args: {
    illustration: 'no-notifications',
    title: 'No notifications',
    description: "You're all caught up! We'll notify you when something needs your attention.",
  },
};

/**
 * Small size variant.
 */
export const SmallSize: Story = {
  args: {
    illustration: 'no-data',
    title: 'No items',
    description: 'Add items to see them here.',
    size: 'small',
    primaryAction: {
      label: 'Add Item',
      onClick: () => console.log('Add clicked'),
    },
  },
};

/**
 * Large size variant.
 */
export const LargeSize: Story = {
  args: {
    illustration: 'getting-started',
    title: 'Welcome aboard!',
    description: 'Start your journey with Trinity Design System. We have everything you need to build beautiful, accessible applications.',
    size: 'large',
    primaryAction: {
      label: 'Get Started',
      onClick: () => console.log('Get started clicked'),
    },
    secondaryAction: {
      label: 'Take a tour',
      href: '#',
    },
  },
};

/**
 * Gallery showing all illustration types.
 */
export const IllustrationGallery: Story = {
  render: () => {
    const illustrations: IllustrationType[] = [
      'empty-table',
      'empty-drafts',
      'getting-started',
      'empty-documents',
      'empty-insights',
      'no-results',
      'error-generic',
      'error-404',
      'error-500',
      'error-permission',
      'upload',
      'success',
      'no-notifications',
      'no-data',
      'offline',
    ];

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          All Illustrations
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Gallery of all available illustration types for empty states.
        </Typography>
        <Stack 
          direction="row" 
          flexWrap="wrap" 
          gap={3}
          sx={{ justifyContent: 'flex-start' }}
        >
          {illustrations.map((illustration) => (
            <Paper 
              key={illustration} 
              sx={{ 
                p: 2, 
                width: 280,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <IllustratedMessage
                illustration={illustration}
                title={illustration.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                description="Example description text"
                size="small"
              />
            </Paper>
          ))}
        </Stack>
      </Box>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * Size comparison showing all three sizes.
 */
export const SizeComparison: Story = {
  render: () => (
    <Stack spacing={4} alignItems="center">
      <Box>
        <Typography variant="subtitle2" gutterBottom align="center">Small</Typography>
        <Paper sx={{ p: 2 }}>
          <IllustratedMessage
            illustration="no-data"
            title="Small Size"
            description="Compact empty state"
            size="small"
          />
        </Paper>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom align="center">Medium (Default)</Typography>
        <Paper sx={{ p: 2 }}>
          <IllustratedMessage
            illustration="no-data"
            title="Medium Size"
            description="Default empty state size"
            size="medium"
          />
        </Paper>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom align="center">Large</Typography>
        <Paper sx={{ p: 2 }}>
          <IllustratedMessage
            illustration="no-data"
            title="Large Size"
            description="Prominent empty state for full-page displays"
            size="large"
          />
        </Paper>
      </Box>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * Example showing compact inline empty states (using minimal styling).
 */
export const InlineEmptyStates: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Typography variant="h6">Inline Empty States</Typography>
      <Typography variant="body2" color="text.secondary">
        For smaller spaces, use compact variations or simple icon-based empty states.
      </Typography>
      
      {/* Dashed border inline */}
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'grey.300',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
          }}
        >
          <InboxIcon sx={{ fontSize: 32, color: 'grey.400', mb: 1 }} />
          <Typography color="text.secondary">
            No items in queue
          </Typography>
          <Link component="button" type="button" variant="body2" sx={{ mt: 1, display: 'inline-block' }}>
            Add items
          </Link>
        </Box>
      </Paper>

      {/* Compact horizontal */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1,
              bgcolor: 'grey.100',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <InboxIcon sx={{ color: 'grey.400' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </Box>
          <Button size="small">Mark all read</Button>
        </Box>
      </Paper>

      {/* Mini cards */}
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Paper sx={{ p: 3, textAlign: 'center', width: 180 }}>
          <InsertDriveFileOutlinedIcon sx={{ fontSize: 36, color: 'grey.400', mb: 1 }} />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            No files
          </Typography>
          <Button variant="outlined" size="small">Upload</Button>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', width: 180 }}>
          <PeopleOutlineIcon sx={{ fontSize: 36, color: 'grey.400', mb: 1 }} />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            No members
          </Typography>
          <Button variant="outlined" size="small">Invite</Button>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', width: 180 }}>
          <BarChartIcon sx={{ fontSize: 36, color: 'grey.400', mb: 1 }} />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            No analytics
          </Typography>
          <Button variant="outlined" size="small">Learn More</Button>
        </Paper>
      </Stack>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};
