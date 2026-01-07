import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast, Toast } from '../components/Toast';
import { Box, Button, Stack, Typography, Paper } from '@mui/material';

/**
 * # Toast / Notifications
 * 
 * The Toast system provides a global notification mechanism for displaying
 * brief messages about app processes. Toasts appear temporarily and don't
 * require user action to disappear.
 * 
 * ## Features
 * - **Multiple severities**: Success, info, warning, error
 * - **Customizable position**: 6 positions available
 * - **Auto-dismiss**: Configurable duration
 * - **Actions**: Optional action buttons
 * - **Stacking**: Multiple toasts stack properly
 * 
 * ## Usage
 * 1. Wrap your app with `<ToastProvider>`
 * 2. Use the `useToast()` hook in any component
 * 
 * ## Accessibility
 * - Toast messages are announced to screen readers
 * - Keyboard dismissible
 * - Proper ARIA attributes
 */

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Global toast notification system with queue management.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo component that uses the toast hook
const ToastDemo = () => {
  const { success, info, warning, error, toast, dismissAll } = useToast();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Toast Notifications Demo
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Click the buttons below to trigger different toast notifications.
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button
          variant="contained"
          color="success"
          onClick={() => success('Changes saved successfully!')}
        >
          Success Toast
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={() => info('New update available')}
        >
          Info Toast
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => warning('Your session will expire soon')}
        >
          Warning Toast
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => error('Failed to save changes')}
        >
          Error Toast
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            toast({
              message: 'Item deleted',
              severity: 'info',
              action: 'Undo',
              onAction: () => console.log('Undo clicked'),
            })
          }
        >
          With Action
        </Button>
        <Button variant="outlined" color="secondary" onClick={dismissAll}>
          Dismiss All
        </Button>
      </Stack>
    </Box>
  );
};

/**
 * Interactive demo with all toast types.
 */
export const Interactive: Story = {
  render: () => <ToastDemo />,
};

// Demo for titled toasts
const TitledToastDemo = () => {
  const { toast } = useToast();

  const showTitledToast = (severity: 'success' | 'info' | 'warning' | 'error') => {
    const titles = {
      success: 'Success!',
      info: 'Information',
      warning: 'Warning',
      error: 'Error',
    };
    const messages = {
      success: 'Your report has been generated and is ready for download.',
      info: 'A new version is available. Refresh to get the latest features.',
      warning: 'You\'re using 90% of your storage quota.',
      error: 'We couldn\'t upload your file. Please try again.',
    };

    toast({
      title: titles[severity],
      message: messages[severity],
      severity,
      duration: 6000,
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Toasts with Titles
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button onClick={() => showTitledToast('success')} color="success" variant="outlined">
          Success
        </Button>
        <Button onClick={() => showTitledToast('info')} color="info" variant="outlined">
          Info
        </Button>
        <Button onClick={() => showTitledToast('warning')} color="warning" variant="outlined">
          Warning
        </Button>
        <Button onClick={() => showTitledToast('error')} color="error" variant="outlined">
          Error
        </Button>
      </Stack>
    </Box>
  );
};

/**
 * Toasts with titles for more context.
 */
export const WithTitles: Story = {
  render: () => <TitledToastDemo />,
};

// Position demo
const PositionDemo = () => {
  const { toast } = useToast();

  const positions = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ] as const;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Toast Positions
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {positions.map((position) => (
          <Button
            key={position}
            variant="outlined"
            size="small"
            onClick={() =>
              toast({
                message: `Toast at ${position}`,
                position,
                severity: 'info',
              })
            }
          >
            {position}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

/**
 * Different toast positions.
 */
export const Positions: Story = {
  render: () => <PositionDemo />,
};

// Stacked toasts demo
const StackedDemo = () => {
  const { toast } = useToast();
  let counter = 0;

  const addMultiple = () => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        counter++;
        toast({
          message: `Notification ${counter}`,
          severity: ['success', 'info', 'warning'][i % 3] as 'success' | 'info' | 'warning',
        });
      }, i * 300);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Stacked Toasts
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Multiple toasts stack vertically.
      </Typography>
      <Button variant="contained" onClick={addMultiple}>
        Add Multiple Toasts
      </Button>
    </Box>
  );
};

/**
 * Multiple toasts stacking.
 */
export const Stacked: Story = {
  render: () => <StackedDemo />,
};

/**
 * Usage example code.
 */
export const UsageExample: Story = {
  render: () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Usage Example
      </Typography>
      <Box
        component="pre"
        sx={{
          p: 2,
          bgcolor: 'grey.100',
          borderRadius: 1,
          overflow: 'auto',
          fontSize: '0.875rem',
        }}
      >
        {`// 1. Wrap your app with ToastProvider
import { ToastProvider } from '@trinity/design-system';

function App() {
  return (
    <ToastProvider defaultPosition="top-right">
      <YourApp />
    </ToastProvider>
  );
}

// 2. Use the hook in any component
import { useToast } from '@trinity/design-system';

function MyComponent() {
  const { success, error, toast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      success('Changes saved!');
    } catch (e) {
      error('Failed to save');
    }
  };

  // With custom options
  const handleDelete = () => {
    toast({
      message: 'Item deleted',
      severity: 'info',
      action: 'Undo',
      onAction: () => restoreItem(),
      duration: 8000,
    });
  };
}`}
      </Box>
    </Paper>
  ),
};
