import type { Meta, StoryObj } from '@storybook/react';
import { 
  Alert, 
  AlertTitle, 
  Stack, 
  Button, 
  Collapse,
  IconButton,
  Box 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';

/**
 * # Alert
 * 
 * Alerts display brief messages for the user. They can contain an optional close
 * button and can be styled to indicate different severities.
 * 
 * ## Severities
 * - **Success**: Positive confirmation
 * - **Info**: Neutral information
 * - **Warning**: Caution or potential issues
 * - **Error**: Critical problems requiring attention
 * 
 * ## Usage Guidelines
 * - Use appropriate severity for the message type
 * - Keep messages concise and actionable
 * - Consider adding a title for longer messages
 */
const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Alert messages for user feedback with different severity levels.',
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: 'The severity of the alert',
      table: { defaultValue: { summary: 'success' }, category: 'Appearance' },
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
      description: 'The variant to use',
      table: { defaultValue: { summary: 'standard' }, category: 'Appearance' },
    },
    children: {
      control: 'text',
      description: 'The alert message content',
      table: { category: 'Content' },
    },
    icon: {
      control: 'boolean',
      description: 'Override the icon displayed before the children. Set to false to remove the icon.',
      table: { category: 'Content' },
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when the close button is clicked. If set, a close icon button is displayed.',
      table: { category: 'Events' },
    },
  },
  args: {
    severity: 'success',
    variant: 'standard',
    children: 'This is an alert message — check it out!',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground - use the Controls panel to customize the alert.
 * Try changing severity, variant, and message content!
 */
export const Playground: Story = {
  args: {
    severity: 'success',
    variant: 'standard',
    children: 'This is an alert message — check it out!',
  },
};

/**
 * Default alert variants showing all severities.
 */
export const Default: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert severity="success">This is a success alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="error">This is an error alert — check it out!</Alert>
    </Stack>
  ),
};

/**
 * Outlined variant for subtle alerts.
 */
export const Outlined: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert severity="success" variant="outlined">Success outlined</Alert>
      <Alert severity="info" variant="outlined">Info outlined</Alert>
      <Alert severity="warning" variant="outlined">Warning outlined</Alert>
      <Alert severity="error" variant="outlined">Error outlined</Alert>
    </Stack>
  ),
};

/**
 * Filled variant for high-emphasis alerts.
 */
export const Filled: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert severity="success" variant="filled">Success filled</Alert>
      <Alert severity="info" variant="filled">Info filled</Alert>
      <Alert severity="warning" variant="filled">Warning filled</Alert>
      <Alert severity="error" variant="filled">Error filled</Alert>
    </Stack>
  ),
};

/**
 * Alerts with titles for more detailed messages.
 */
export const WithTitle: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Your changes have been saved successfully.
      </Alert>
      <Alert severity="info">
        <AlertTitle>Information</AlertTitle>
        A new version is available. Please refresh to update.
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        Your session will expire in 5 minutes.
      </Alert>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Failed to save changes. Please try again.
      </Alert>
    </Stack>
  ),
};

/**
 * Alerts with action buttons.
 */
export const WithAction: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert 
        severity="info"
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        Item has been moved to trash.
      </Alert>
      <Alert 
        severity="warning"
        action={
          <Button color="inherit" size="small">
            UPGRADE
          </Button>
        }
      >
        Your storage is almost full. Upgrade your plan for more space.
      </Alert>
    </Stack>
  ),
};

/**
 * Dismissible alert with close button.
 */
export const Dismissible: Story = {
  render: () => {
    const DismissibleAlert = () => {
      const [open, setOpen] = useState(true);

      return (
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Your profile has been updated successfully!
            </Alert>
          </Collapse>
          {!open && (
            <Button variant="outlined" onClick={() => setOpen(true)}>
              Show Alert Again
            </Button>
          )}
        </Box>
      );
    };

    return <DismissibleAlert />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the X button to dismiss the alert, then click the button to show it again.',
      },
    },
  },
};

/**
 * Custom icon alert.
 */
export const CustomIcon: Story = {
  render: () => (
    <Alert 
      severity="success" 
      icon={<CheckCircleOutlineIcon fontSize="inherit" />}
    >
      Custom icon alert with CheckCircleOutline.
    </Alert>
  ),
};

/**
 * Alert without icon.
 */
export const NoIcon: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert severity="success" icon={false}>
        Success alert without icon
      </Alert>
      <Alert severity="error" icon={false}>
        Error alert without icon
      </Alert>
    </Stack>
  ),
};

/**
 * Real-world usage examples.
 */
export const Examples: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert severity="success">
        <AlertTitle>Report Generated</AlertTitle>
        Your market analysis report has been generated and is ready for download.
      </Alert>
      
      <Alert severity="info" variant="outlined">
        <AlertTitle>Scheduled Maintenance</AlertTitle>
        The system will be undergoing maintenance on Saturday, Dec 20th from 2-4 AM EST.
      </Alert>
      
      <Alert 
        severity="warning"
        action={
          <Button color="inherit" size="small" variant="outlined">
            Review
          </Button>
        }
      >
        <AlertTitle>Data Sync Warning</AlertTitle>
        Some client data may be outdated. Last sync: 24 hours ago.
      </Alert>
      
      <Alert 
        severity="error"
        action={
          <Button color="inherit" size="small">
            Contact Support
          </Button>
        }
      >
        <AlertTitle>Connection Failed</AlertTitle>
        Unable to connect to the analytics server. Please check your network connection.
      </Alert>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common alert patterns used in Trinity applications.',
      },
    },
  },
};
