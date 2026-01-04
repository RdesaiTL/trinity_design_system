import type { Meta, StoryObj } from '@storybook/react';
import { Box, Skeleton, Paper, Stack, Typography } from '@mui/material';

/**
 * # Skeleton
 * 
 * Skeleton loading placeholders provide a visual representation of content
 * that is being loaded. They improve perceived performance and reduce
 * layout shift.
 * 
 * ## Types
 * - **Text**: Multi-line text placeholders
 * - **Circular**: Avatar and icon placeholders
 * - **Rectangular**: Image and card placeholders
 * - **Custom**: Complex component skeletons
 * 
 * ## Design Guidelines
 * - Match skeleton shapes to actual content
 * - Use animation to indicate loading
 * - Avoid using too many skeletons
 * - Consider skeleton duration for UX
 */

interface SkeletonDemoProps {
  variant?: 'text' | 'avatars' | 'cards' | 'list' | 'table' | 'dashboard';
  animation?: 'pulse' | 'wave' | false;
}

const SkeletonDemo = ({ variant = 'text', animation = 'pulse' }: SkeletonDemoProps) => {
  if (variant === 'avatars') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Avatar Skeletons</Typography>
        <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
          <Skeleton variant="circular" width={40} height={40} animation={animation} />
          <Skeleton variant="circular" width={48} height={48} animation={animation} />
          <Skeleton variant="circular" width={56} height={56} animation={animation} />
          <Skeleton variant="circular" width={64} height={64} animation={animation} />
        </Stack>
        
        <Typography variant="h6" gutterBottom>User Profile Skeleton</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Skeleton variant="circular" width={56} height={56} animation={animation} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={24} animation={animation} />
            <Skeleton variant="text" width="40%" height={20} animation={animation} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (variant === 'cards') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Card Skeletons</Typography>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          {/* Media Card Skeleton */}
          <Paper sx={{ width: 300 }}>
            <Skeleton variant="rectangular" height={140} animation={animation} />
            <Box sx={{ p: 2 }}>
              <Skeleton variant="text" height={28} animation={animation} />
              <Skeleton variant="text" width="80%" animation={animation} />
              <Skeleton variant="text" width="60%" animation={animation} />
            </Box>
          </Paper>

          {/* Profile Card Skeleton */}
          <Paper sx={{ width: 300, p: 3, textAlign: 'center' }}>
            <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} animation={animation} />
            <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} height={28} animation={animation} />
            <Skeleton variant="text" width="40%" sx={{ mx: 'auto' }} animation={animation} />
            <Skeleton variant="rectangular" height={36} sx={{ mt: 2, borderRadius: 1 }} animation={animation} />
          </Paper>

          {/* Stats Card Skeleton */}
          <Paper sx={{ width: 300, p: 3 }}>
            <Skeleton variant="text" width="40%" animation={animation} />
            <Skeleton variant="text" width="60%" height={40} animation={animation} />
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 12 }} animation={animation} />
              <Skeleton variant="text" width={80} animation={animation} />
            </Stack>
          </Paper>
        </Stack>
      </Box>
    );
  }

  if (variant === 'list') {
    return (
      <Box sx={{ p: 4, maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>List Skeletons</Typography>
        <Paper>
          {[1, 2, 3, 4, 5].map((item) => (
            <Box key={item} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: item < 5 ? '1px solid' : 'none', borderColor: 'divider' }}>
              <Skeleton variant="circular" width={40} height={40} animation={animation} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="70%" animation={animation} />
                <Skeleton variant="text" width="50%" height={16} animation={animation} />
              </Box>
              <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} animation={animation} />
            </Box>
          ))}
        </Paper>
      </Box>
    );
  }

  if (variant === 'table') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Table Skeleton</Typography>
        <Paper>
          {/* Header */}
          <Box sx={{ p: 2, bgcolor: 'grey.100', display: 'flex', gap: 2 }}>
            <Skeleton variant="text" width={150} animation={animation} />
            <Skeleton variant="text" width={100} animation={animation} />
            <Skeleton variant="text" width={120} animation={animation} />
            <Skeleton variant="text" width={80} animation={animation} />
            <Box sx={{ flex: 1 }} />
            <Skeleton variant="text" width={60} animation={animation} />
          </Box>
          
          {/* Rows */}
          {[1, 2, 3, 4, 5].map((row) => (
            <Box
              key={row}
              sx={{
                p: 2,
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                borderBottom: row < 5 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 150 }}>
                <Skeleton variant="circular" width={32} height={32} animation={animation} />
                <Skeleton variant="text" width={100} animation={animation} />
              </Box>
              <Skeleton variant="text" width={100} animation={animation} />
              <Skeleton variant="text" width={120} animation={animation} />
              <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 12 }} animation={animation} />
              <Box sx={{ flex: 1 }} />
              <Skeleton variant="circular" width={32} height={32} animation={animation} />
            </Box>
          ))}
        </Paper>
      </Box>
    );
  }

  if (variant === 'dashboard') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Dashboard Skeleton</Typography>
        
        {/* Stats Row */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          {[1, 2, 3, 4].map((card) => (
            <Paper key={card} sx={{ p: 3, flex: 1 }}>
              <Skeleton variant="text" width="60%" animation={animation} />
              <Skeleton variant="text" width="40%" height={36} animation={animation} />
              <Skeleton variant="text" width="30%" height={16} animation={animation} />
            </Paper>
          ))}
        </Stack>

        {/* Chart Section */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Paper sx={{ flex: 2, p: 3 }}>
            <Skeleton variant="text" width="30%" height={28} animation={animation} />
            <Skeleton variant="rectangular" height={200} sx={{ mt: 2 }} animation={animation} />
          </Paper>
          <Paper sx={{ flex: 1, p: 3 }}>
            <Skeleton variant="text" width="50%" height={28} animation={animation} />
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <Skeleton variant="circular" width={150} height={150} animation={animation} />
            </Box>
            <Stack spacing={1}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Skeleton variant="circular" width={12} height={12} animation={animation} />
                  <Skeleton variant="text" width="60%" animation={animation} />
                  <Skeleton variant="text" width="20%" animation={animation} />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>

        {/* Activity Section */}
        <Paper sx={{ p: 3 }}>
          <Skeleton variant="text" width="20%" height={28} animation={animation} />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {[1, 2, 3].map((activity) => (
              <Box key={activity} sx={{ flex: 1, display: 'flex', gap: 2 }}>
                <Skeleton variant="circular" width={40} height={40} animation={animation} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="80%" animation={animation} />
                  <Skeleton variant="text" width="60%" height={16} animation={animation} />
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    );
  }

  // Text variant (default)
  return (
    <Box sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>Text Skeletons</Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" gutterBottom>Article Preview</Typography>
        <Skeleton variant="text" height={32} animation={animation} />
        <Skeleton variant="text" animation={animation} />
        <Skeleton variant="text" animation={animation} />
        <Skeleton variant="text" width="80%" animation={animation} />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" gutterBottom>Animation: Pulse</Typography>
        <Skeleton variant="text" animation="pulse" />
        <Skeleton variant="text" width="80%" animation="pulse" />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" gutterBottom>Animation: Wave</Typography>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" width="80%" animation="wave" />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>No Animation</Typography>
        <Skeleton variant="text" animation={false} />
        <Skeleton variant="text" width="80%" animation={false} />
      </Box>
    </Box>
  );
};

const meta: Meta<typeof SkeletonDemo> = {
  title: 'Feedback/Skeleton',
  component: SkeletonDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Skeleton placeholders for loading states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'avatars', 'cards', 'list', 'table', 'dashboard'],
      description: 'Skeleton layout variant',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', false],
      description: 'Animation style',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Text skeleton placeholders.
 */
export const Text: Story = {
  args: {
    variant: 'text',
    animation: 'pulse',
  },
};

/**
 * Avatar and user profile skeletons.
 */
export const Avatars: Story = {
  args: {
    variant: 'avatars',
    animation: 'pulse',
  },
};

/**
 * Card layout skeletons.
 */
export const Cards: Story = {
  args: {
    variant: 'cards',
    animation: 'pulse',
  },
};

/**
 * List item skeletons.
 */
export const List: Story = {
  args: {
    variant: 'list',
    animation: 'wave',
  },
};

/**
 * Table skeleton with header and rows.
 */
export const Table: Story = {
  args: {
    variant: 'table',
    animation: 'wave',
  },
};

/**
 * Full dashboard skeleton layout.
 */
export const Dashboard: Story = {
  args: {
    variant: 'dashboard',
    animation: 'pulse',
  },
};
