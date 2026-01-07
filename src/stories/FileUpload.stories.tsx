import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload, UploadFile } from '../components/FileUpload';
import { useState } from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';

/**
 * # FileUpload
 * 
 * The FileUpload component provides drag-and-drop file upload functionality
 * with progress indicators, file validation, and preview support.
 * 
 * ## Features
 * - **Drag & drop zone**: Easy file dropping
 * - **Progress indicators**: Upload progress feedback
 * - **File validation**: Size and type restrictions
 * - **Multi-file support**: Upload multiple files
 * - **Preview**: Image file previews
 * 
 * ## Variants
 * - **dropzone**: Full drag-drop area
 * - **button**: Simple upload button
 * - **compact**: Inline file chips
 */
const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Drag-and-drop file upload with progress, validation, and preview.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dropzone', 'button', 'compact'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dropzone variant.
 */
export const Default: Story = {
  args: {
    variant: 'dropzone',
    helperText: 'Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 10MB)',
    accept: '.pdf,.doc,.docx,.xls,.xlsx',
    maxSize: 10 * 1024 * 1024,
    multiple: true,
  },
};

/**
 * Button variant for compact layouts.
 */
export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    accept: 'image/*',
    multiple: true,
  },
};

/**
 * Compact variant with inline file chips.
 */
export const CompactVariant: Story = {
  args: {
    variant: 'compact',
    accept: '.pdf,.doc,.docx',
    multiple: true,
  },
};

/**
 * Single file upload.
 */
export const SingleFile: Story = {
  args: {
    variant: 'dropzone',
    multiple: false,
    helperText: 'Upload a single file',
  },
};

/**
 * With file size limit.
 */
export const WithSizeLimit: Story = {
  args: {
    variant: 'dropzone',
    maxSize: 5 * 1024 * 1024, // 5MB
    helperText: 'Maximum file size: 5MB',
    multiple: true,
  },
};

/**
 * Image files only.
 */
export const ImagesOnly: Story = {
  args: {
    variant: 'dropzone',
    accept: 'image/*',
    helperText: 'Supported formats: PNG, JPG, GIF, SVG',
    multiple: true,
  },
};

// Controlled example with state
const ControlledDemo = () => {
  const [files, setFiles] = useState<UploadFile[]>([
    {
      id: '1',
      file: new File([], 'report.pdf'),
      name: 'report.pdf',
      size: 2500000,
      type: 'application/pdf',
      progress: 100,
      status: 'complete',
    },
    {
      id: '2',
      file: new File([], 'data.xlsx'),
      name: 'data.xlsx',
      size: 1200000,
      type: 'application/vnd.ms-excel',
      progress: 65,
      status: 'uploading',
    },
  ]);

  return (
    <Box sx={{ maxWidth: 500 }}>
      <FileUpload
        variant="dropzone"
        files={files}
        onFilesChange={setFiles}
        multiple
        helperText="Drag files here or click to browse"
      />
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Current files state: {files.length} files
        </Typography>
      </Paper>
    </Box>
  );
};

/**
 * Controlled component with state management.
 */
export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

// With simulated upload
const SimulatedUploadDemo = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const simulateUpload = async (_file: File): Promise<void> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Simulate random failure
    if (Math.random() > 0.8) {
      throw new Error('Network error');
    }
  };

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="subtitle2" gutterBottom>
        Simulated Upload (20% failure rate)
      </Typography>
      <FileUpload
        variant="dropzone"
        files={files}
        onFilesChange={setFiles}
        onUpload={simulateUpload}
        multiple
        helperText="Files will be automatically uploaded"
      />
    </Box>
  );
};

/**
 * With simulated upload handler.
 */
export const WithUploadHandler: Story = {
  render: () => <SimulatedUploadDemo />,
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    variant: 'dropzone',
    disabled: true,
    helperText: 'Upload is currently disabled',
  },
};

/**
 * Small size variant.
 */
export const SmallSize: Story = {
  args: {
    variant: 'dropzone',
    size: 'small',
    helperText: 'Compact upload area',
  },
};

/**
 * All variants showcase.
 */
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 500 }}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Dropzone Variant
        </Typography>
        <FileUpload
          variant="dropzone"
          helperText="Drag & drop files here"
          multiple
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Button Variant
        </Typography>
        <FileUpload variant="button" multiple />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Compact Variant
        </Typography>
        <FileUpload variant="compact" multiple />
      </Box>
    </Stack>
  ),
};
