import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid, Stack, Divider } from '@mui/material';
import { 
  IllustratedMessage, 
  UploadDropZone,
  IllustrationType,
} from '../components/IllustratedMessage';

/**
 * # Illustrated Message
 * 
 * Illustrated messages communicate to users about empty states, errors, and other scenarios
 * that need contextual guidance. They combine illustrations with text and optional actions
 * to provide a helpful user experience.
 * 
 * ## Types
 * 
 * ### Empty States
 * - **Empty Table**: When a data table has no content
 * - **Empty Drafts**: When drafts folder is empty
 * - **Getting Started**: For onboarding and first-time use
 * - **Empty Documents**: When no documents exist
 * - **Empty Insights**: When analytics/insights are unavailable
 * 
 * ### Error States
 * - **Error Generic**: General error message
 * - **Error 404**: Page not found
 * - **Error 500**: Server error
 * - **Error Permission**: Access denied
 * 
 * ### Other States
 * - **Upload**: Drag and drop file upload
 * - **No Results**: Search returned nothing
 * - **Success**: Operation completed
 * - **No Notifications**: No alerts
 * - **No Data**: Database empty
 * - **Offline**: Connection lost
 * 
 * ## Design Guidelines
 * - Use appropriate illustrations that match the context
 * - Provide clear, helpful messaging
 * - Include a call-to-action when appropriate
 * - Keep illustrations decorative (hidden from screen readers)
 */

interface IllustratedMessageDemoProps {
  variant: 'empty-states' | 'error-states' | 'upload' | 'gallery' | 'sizes' | 'all-illustrations';
}

// Demo component
const IllustratedMessageDemo = ({ variant }: IllustratedMessageDemoProps) => {
  if (variant === 'empty-states') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Empty States</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Use empty states to communicate when there's no data to display and guide users on what to do next.
        </Typography>

        <Grid container spacing={4}>
          {/* Empty Table */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Tables
              </Typography>
              <IllustratedMessage
                illustration="empty-table"
                title="No data yet"
                description="Start by adding some data to see it displayed in the table."
                primaryAction={{ label: 'Add Data', onClick: () => console.log('Add data') }}
                secondaryAction={{ label: 'Learn more', href: '#' }}
              />
            </Paper>
          </Grid>

          {/* Empty Drafts */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Drafts
              </Typography>
              <IllustratedMessage
                illustration="empty-drafts"
                title="No drafts saved"
                description="When you start writing, your drafts will appear here."
                primaryAction={{ label: 'Create New', onClick: () => console.log('Create') }}
              />
            </Paper>
          </Grid>

          {/* Getting Started */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Getting Started
              </Typography>
              <IllustratedMessage
                illustration="getting-started"
                title="Welcome! Let's get started"
                description="Set up your workspace in just a few steps and start exploring what you can do."
                primaryAction={{ label: 'Start Setup', onClick: () => console.log('Setup') }}
                secondaryAction={{ label: 'Skip for now', onClick: () => console.log('Skip') }}
              />
            </Paper>
          </Grid>

          {/* Empty Documents */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Documents
              </Typography>
              <IllustratedMessage
                illustration="empty-documents"
                title="No documents"
                description="Upload your first document or create a new one to get started."
                primaryAction={{ label: 'Upload Document', onClick: () => console.log('Upload') }}
              />
            </Paper>
          </Grid>

          {/* Empty Insights */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Insights
              </Typography>
              <IllustratedMessage
                illustration="empty-insights"
                title="No insights available"
                description="Once you have enough data, insights and analytics will appear here."
                primaryAction={{ label: 'Import Data', onClick: () => console.log('Import') }}
              />
            </Paper>
          </Grid>

          {/* No Results */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                No Results
              </Typography>
              <IllustratedMessage
                illustration="no-results"
                title="No results found"
                description="We couldn't find anything matching your search. Try adjusting your filters."
                primaryAction={{ label: 'Clear Filters', onClick: () => console.log('Clear') }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (variant === 'error-states') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Error States</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Error states communicate problems and help users understand what went wrong and how to recover.
        </Typography>

        <Grid container spacing={4}>
          {/* Generic Error */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Generic Error
              </Typography>
              <IllustratedMessage
                illustration="error-generic"
                title="Something went wrong"
                description="We encountered an unexpected error. Please try again or contact support if the problem persists."
                primaryAction={{ label: 'Try Again', onClick: () => console.log('Retry') }}
                secondaryAction={{ label: 'Contact Support', href: '#' }}
              />
            </Paper>
          </Grid>

          {/* 404 Error */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                404 - Not Found
              </Typography>
              <IllustratedMessage
                illustration="error-404"
                title="Page not found"
                description="The page you're looking for doesn't exist or has been moved."
                primaryAction={{ label: 'Go Home', onClick: () => console.log('Home') }}
                secondaryAction={{ label: 'Go Back', onClick: () => console.log('Back') }}
              />
            </Paper>
          </Grid>

          {/* 500 Error */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                500 - Server Error
              </Typography>
              <IllustratedMessage
                illustration="error-500"
                title="Server error"
                description="Our servers are having trouble. We're working on it. Please try again in a few minutes."
                primaryAction={{ label: 'Refresh Page', onClick: () => console.log('Refresh') }}
              />
            </Paper>
          </Grid>

          {/* Permission Error */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Permission Denied
              </Typography>
              <IllustratedMessage
                illustration="error-permission"
                title="Access denied"
                description="You don't have permission to view this content. Request access from your administrator."
                primaryAction={{ label: 'Request Access', onClick: () => console.log('Request') }}
              />
            </Paper>
          </Grid>

          {/* Offline */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Offline
              </Typography>
              <IllustratedMessage
                illustration="offline"
                title="You're offline"
                description="Check your internet connection and try again."
                primaryAction={{ label: 'Retry', onClick: () => console.log('Retry') }}
              />
            </Paper>
          </Grid>

          {/* Success */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Success
              </Typography>
              <IllustratedMessage
                illustration="success"
                title="All done!"
                description="Your changes have been saved successfully."
                primaryAction={{ label: 'Continue', onClick: () => console.log('Continue') }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (variant === 'upload') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Upload - Drag and Drop</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The UploadDropZone component provides a drag-and-drop interface for file uploads.
        </Typography>

        <Grid container spacing={4}>
          {/* Default Upload */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>Default</Typography>
            <UploadDropZone
              onDrop={(files) => console.log('Dropped:', files)}
              onBrowse={() => console.log('Browse clicked')}
            />
          </Grid>

          {/* Custom Upload */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>Custom Labels</Typography>
            <UploadDropZone
              title="Drop your images here"
              description="or click to select from your device"
              acceptedTypes="PNG, JPG, GIF up to 5MB each"
              browseLabel="Select Images"
              onDrop={(files) => console.log('Dropped:', files)}
              onBrowse={() => console.log('Browse clicked')}
            />
          </Grid>

          {/* Small Upload */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>Small Size</Typography>
            <UploadDropZone
              size="small"
              title="Drop file here"
              description="or click to browse"
              acceptedTypes="PDF only"
              onDrop={(files) => console.log('Dropped:', files)}
            />
          </Grid>

          {/* Medium Upload */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>Medium Size</Typography>
            <UploadDropZone
              size="medium"
              onDrop={(files) => console.log('Dropped:', files)}
            />
          </Grid>

          {/* Large Upload */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>Large Size</Typography>
            <UploadDropZone
              size="large"
              onDrop={(files) => console.log('Dropped:', files)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Using IllustratedMessage for upload */}
        <Typography variant="h5" gutterBottom>Upload as Illustrated Message</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          You can also use the IllustratedMessage component with the upload illustration.
        </Typography>

        <Paper sx={{ p: 2, maxWidth: 500 }}>
          <IllustratedMessage
            illustration="upload"
            title="Upload your files"
            description="Drag and drop files here, or click to browse. Supported formats: PNG, JPG, PDF."
            primaryAction={{ label: 'Browse Files', onClick: () => console.log('Browse') }}
          />
        </Paper>
      </Box>
    );
  }

  if (variant === 'sizes') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Size Variants</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          IllustratedMessage comes in three sizes to fit different contexts.
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="overline" color="text.secondary" gutterBottom display="block">
                Small
              </Typography>
              <IllustratedMessage
                illustration="no-notifications"
                title="No notifications"
                description="You're all caught up!"
                size="small"
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="overline" color="text.secondary" gutterBottom display="block">
                Medium (default)
              </Typography>
              <IllustratedMessage
                illustration="no-notifications"
                title="No notifications"
                description="You're all caught up! Check back later for updates."
                size="medium"
                primaryAction={{ label: 'Refresh', onClick: () => {} }}
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="overline" color="text.secondary" gutterBottom display="block">
                Large
              </Typography>
              <IllustratedMessage
                illustration="no-notifications"
                title="No notifications"
                description="You're all caught up! Check back later for updates and alerts."
                size="large"
                primaryAction={{ label: 'Refresh', onClick: () => {} }}
                secondaryAction={{ label: 'Settings', onClick: () => {} }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (variant === 'all-illustrations') {
    const illustrations: { type: IllustrationType; label: string }[] = [
      { type: 'empty-table', label: 'Empty Table' },
      { type: 'empty-drafts', label: 'Empty Drafts' },
      { type: 'getting-started', label: 'Getting Started' },
      { type: 'empty-documents', label: 'Empty Documents' },
      { type: 'empty-insights', label: 'Empty Insights' },
      { type: 'no-results', label: 'No Results' },
      { type: 'error-generic', label: 'Error Generic' },
      { type: 'error-404', label: 'Error 404' },
      { type: 'error-500', label: 'Error 500' },
      { type: 'error-permission', label: 'Error Permission' },
      { type: 'upload', label: 'Upload' },
      { type: 'success', label: 'Success' },
      { type: 'no-notifications', label: 'No Notifications' },
      { type: 'no-data', label: 'No Data' },
      { type: 'offline', label: 'Offline' },
    ];

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>All Illustrations</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Browse all available illustrations in the IllustratedMessage component.
        </Typography>

        <Grid container spacing={3}>
          {illustrations.map(({ type, label }) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={type}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IllustratedMessage
                  illustration={type}
                  title={label}
                  size="small"
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // Gallery (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Illustrated Message Gallery</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A collection of common illustrated message patterns for your application.
      </Typography>

      <Stack spacing={4}>
        {/* Full page empty state example */}
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>Full Page Empty State</Typography>
          <Box sx={{ py: 6, bgcolor: 'grey.50', borderRadius: 2 }}>
            <IllustratedMessage
              illustration="getting-started"
              title="Welcome to Trinity"
              description="Get started by creating your first project. We'll guide you through the setup process."
              size="large"
              primaryAction={{ label: 'Create Project', onClick: () => console.log('Create') }}
              secondaryAction={{ label: 'Take a tour', onClick: () => console.log('Tour') }}
            />
          </Box>
        </Paper>

        {/* Card/widget empty state */}
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>Card/Widget Empty State</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <IllustratedMessage
                  illustration="empty-insights"
                  title="No insights"
                  description="Add data to see insights"
                  size="small"
                  primaryAction={{ label: 'Add Data', onClick: () => {} }}
                />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <IllustratedMessage
                  illustration="no-notifications"
                  title="All caught up"
                  description="No new notifications"
                  size="small"
                />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <IllustratedMessage
                  illustration="no-data"
                  title="No recent activity"
                  description="Activity will appear here"
                  size="small"
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Table empty state */}
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>Table Empty State</Typography>
          <Paper variant="outlined">
            {/* Mock table header */}
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'grey.300' }}>
              <Grid container>
                <Grid size={{ xs: 4 }}><Typography variant="subtitle2">Name</Typography></Grid>
                <Grid size={{ xs: 4 }}><Typography variant="subtitle2">Status</Typography></Grid>
                <Grid size={{ xs: 4 }}><Typography variant="subtitle2">Date</Typography></Grid>
              </Grid>
            </Box>
            {/* Empty state */}
            <Box sx={{ py: 6 }}>
              <IllustratedMessage
                illustration="empty-table"
                title="No records found"
                description="Add your first record to get started, or import data from a file."
                primaryAction={{ label: 'Add Record', onClick: () => {} }}
                secondaryAction={{ label: 'Import Data', onClick: () => {} }}
              />
            </Box>
          </Paper>
        </Paper>
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof IllustratedMessageDemo> = {
  title: 'Patterns/Illustrated Message',
  component: IllustratedMessageDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Illustrated messages for empty states, error states, and user guidance.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['gallery', 'empty-states', 'error-states', 'upload', 'sizes', 'all-illustrations'],
      description: 'Demo variant to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Gallery of common illustrated message patterns.
 */
export const Gallery: Story = {
  args: {
    variant: 'gallery',
  },
};

/**
 * Empty states for tables, drafts, getting started, documents, and insights.
 */
export const EmptyStates: Story = {
  args: {
    variant: 'empty-states',
  },
};

/**
 * Error states including generic errors, 404, 500, and permission denied.
 */
export const ErrorStates: Story = {
  args: {
    variant: 'error-states',
  },
};

/**
 * Upload drop zone with drag and drop functionality.
 */
export const Upload: Story = {
  args: {
    variant: 'upload',
  },
};

/**
 * Size variants: small, medium, and large.
 */
export const Sizes: Story = {
  args: {
    variant: 'sizes',
  },
};

/**
 * Browse all available illustrations.
 */
export const AllIllustrations: Story = {
  args: {
    variant: 'all-illustrations',
  },
};
