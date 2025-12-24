import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ConfirmDialog, useConfirmDialog } from '../components/Modal';
import { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

/**
 * # Modal
 * 
 * The Modal component provides a consistent dialog pattern for Trinity applications.
 * It supports multiple variants for different use cases.
 * 
 * ## Features
 * - **Multiple variants**: Default, info, success, warning, danger, confirm
 * - **Loading state**: Show progress during async actions
 * - **Customizable actions**: Primary and secondary buttons
 * - **Backdrop control**: Prevent accidental dismissal
 * 
 * ## Accessibility
 * - Focus is trapped within the modal
 * - Escape key closes the modal
 * - Screen readers announce the modal
 */
const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Trinity-styled modal with variants for info, form, confirm, and danger dialogs.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'danger', 'confirm'],
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive demo
const ModalDemo = ({ variant = 'default' }: { variant?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open {variant} Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Modal`}
        variant={variant as 'default' | 'info' | 'success' | 'warning' | 'danger' | 'confirm'}
        primaryAction="Confirm"
        onPrimaryAction={() => setOpen(false)}
      >
        <Typography>
          This is a {variant} modal dialog. You can customize the content and actions.
        </Typography>
      </Modal>
    </>
  );
};

/**
 * Default modal variant.
 */
export const Default: Story = {
  render: () => <ModalDemo variant="default" />,
};

/**
 * Info modal for displaying information.
 */
export const Info: Story = {
  render: () => <ModalDemo variant="info" />,
};

/**
 * Success modal for confirmations.
 */
export const Success: Story = {
  render: () => <ModalDemo variant="success" />,
};

/**
 * Warning modal for caution messages.
 */
export const Warning: Story = {
  render: () => <ModalDemo variant="warning" />,
};

/**
 * Danger modal for destructive actions.
 */
export const Danger: Story = {
  render: () => <ModalDemo variant="danger" />,
};

// Form modal demo
const FormModalDemo = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Form Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Profile"
        primaryAction="Save Changes"
        onPrimaryAction={handleSubmit}
        loading={loading}
        maxWidth="sm"
      >
        <Stack spacing={2}>
          <TextField label="Name" fullWidth defaultValue="John Doe" />
          <TextField label="Email" fullWidth defaultValue="john@example.com" />
          <TextField label="Bio" fullWidth multiline rows={3} />
        </Stack>
      </Modal>
    </>
  );
};

/**
 * Modal with form content.
 */
export const FormModal: Story = {
  render: () => <FormModalDemo />,
};

// Confirm dialog demo
const ConfirmDialogDemo = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>
        Delete Item
      </Button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        variant="danger"
        confirmLabel="Delete"
        loading={loading}
      />
    </>
  );
};

/**
 * Simplified confirmation dialog.
 */
export const ConfirmDialogExample: Story = {
  render: () => <ConfirmDialogDemo />,
};

// useConfirmDialog hook demo
const ConfirmDialogHookDemo = () => {
  const { confirm, state, close } = useConfirmDialog();

  const handleDelete = () => {
    confirm({
      title: 'Delete Project',
      message: 'All project data will be permanently deleted. Are you sure?',
      variant: 'danger',
      confirmLabel: 'Delete Project',
      onConfirm: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        close();
      },
    });
  };

  const handleArchive = () => {
    confirm({
      title: 'Archive Project',
      message: 'The project will be archived and can be restored later.',
      variant: 'warning',
      confirmLabel: 'Archive',
      onConfirm: () => {
        close();
      },
    });
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Project
        </Button>
        <Button variant="outlined" color="warning" onClick={handleArchive}>
          Archive Project
        </Button>
      </Stack>
      <ConfirmDialog
        open={state.isOpen}
        onClose={close}
        onConfirm={state.onConfirm}
        title={state.title}
        message={state.message}
        variant={state.variant}
        confirmLabel={state.confirmLabel}
      />
    </>
  );
};

/**
 * Using the useConfirmDialog hook.
 */
export const UsingHook: Story = {
  render: () => <ConfirmDialogHookDemo />,
};

// All variants showcase
const AllVariantsDemo = () => {
  const [openVariant, setOpenVariant] = useState<string | null>(null);

  const variants = ['default', 'info', 'success', 'warning', 'danger', 'confirm'] as const;

  return (
    <>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {variants.map((variant) => (
          <Button key={variant} variant="outlined" onClick={() => setOpenVariant(variant)}>
            {variant}
          </Button>
        ))}
      </Stack>
      {variants.map((variant) => (
        <Modal
          key={variant}
          open={openVariant === variant}
          onClose={() => setOpenVariant(null)}
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Modal`}
          variant={variant}
          primaryAction="Confirm"
          onPrimaryAction={() => setOpenVariant(null)}
        >
          <Typography>
            This demonstrates the {variant} modal variant with its associated icon and styling.
          </Typography>
        </Modal>
      ))}
    </>
  );
};

/**
 * All modal variants.
 */
export const AllVariants: Story = {
  render: () => <AllVariantsDemo />,
};

/**
 * Modal without footer.
 */
export const NoFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Information"
          hideFooter
        >
          <Typography>
            This modal has no footer actions. Close it using the X button or clicking outside.
          </Typography>
        </Modal>
      </>
    );
  },
};
