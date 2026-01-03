import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
  Button,
  Paper,
  Skeleton,
  Stack,
  Card,
  CardContent,
  Backdrop,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { brandColors } from '../tokens';
import { keyframes } from '@mui/system';

/**
 * # Loaders
 * 
 * Custom loading components with Trinity branding.
 * 
 * ## Types
 * - **Spinner**: Animated circular loader with brand colors
 * - **Full Page**: Overlay loader for page transitions
 * - **Button Loading**: Buttons with loading state
 * - **Skeleton**: Content placeholder loading
 */

// Trinity branded animations - staggered pulse effect
const trinityPulse1 = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scaleY(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const trinityPulse2 = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scaleY(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const trinityPulse3 = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scaleY(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
`;

const dotAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

// Trinity Logo Loader - Three bars with gradient animation
const TrinityLoader = ({ size = 'medium', animate = true }: { size?: 'small' | 'medium' | 'large', animate?: boolean }) => {
  const sizeMap = {
    small: 32,
    medium: 64,
    large: 96,
  };
  const dimension = sizeMap[size];

  return (
    <Box
      sx={{
        width: dimension,
        height: dimension,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg
        viewBox="0 0 160 160"
        width={dimension}
        height={dimension}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient 
            id={`trinity-gradient-${size}`} 
            x1="44" 
            y1="5.2" 
            x2="117.8" 
            y2="154.5" 
            gradientTransform="translate(0 162) scale(1 -1)" 
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ff6150"/>
            <stop offset="1" stopColor="#6b12ed"/>
          </linearGradient>
        </defs>
        
        {/* Left bar - shortest, bottom positioned */}
        <Box
          component="path"
          fill={`url(#trinity-gradient-${size})`}
          d="M49.3,75.5c3-.9,5.9.4,7.4,3,.6,1.3,1.1,2.8,1.3,4.3v66.4c0,4.7-2.7,7.7-7,7.7-4.2,0-7-3-7-7.7v-66.6c-.2-3.2,2.1-6.2,5.3-7Z"
          sx={{
            transformOrigin: '51px 115px',
            animation: animate ? `${trinityPulse1} 1.2s ease-in-out infinite` : 'none',
          }}
        />
        
        {/* Middle bar - tallest */}
        <Box
          component="path"
          fill={`url(#trinity-gradient-${size})`}
          d="M76.1,30.4c2.7-2.6,7.2-2.3,9.7.4.8.9,1.3,1.9,1.7,3,.2,1.1.4,2.1.4,3.2v89.2c0,5.1-2.3,8.1-6.6,8.3-4.4.2-7.4-3-7.4-8.1v-37.4l-.2-7.7v-44.6c-.2-2.3.6-4.7,2.3-6.4Z"
          sx={{
            transformOrigin: '80px 80px',
            animation: animate ? `${trinityPulse2} 1.2s ease-in-out infinite 0.2s` : 'none',
          }}
        />
        
        {/* Right bar - top positioned */}
        <Box
          component="path"
          fill={`url(#trinity-gradient-${size})`}
          d="M109.1,7.8c3-.9,5.9.4,7.4,3,.6,1.3,1.1,2.8,1.3,4.3v66.4c0,4.7-2.7,7.7-7,7.7s-7-3-7-7.7V14.8c-.2-3.2,2.1-6.2,5.3-7Z"
          sx={{
            transformOrigin: '110px 45px',
            animation: animate ? `${trinityPulse3} 1.2s ease-in-out infinite 0.4s` : 'none',
          }}
        />
      </svg>
    </Box>
  );
};

// Alias for backward compatibility
const TrinitySpinner = TrinityLoader;
const TrinityLogoSpinner = TrinityLoader;

// Dot Loader
const DotLoader = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  const sizeMap = {
    small: 8,
    medium: 12,
    large: 16,
  };
  const dotSize = sizeMap[size];

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: dotSize,
            height: dotSize,
            backgroundColor: i === 0 ? brandColors.primary.main : i === 1 ? brandColors.primary.light : brandColors.secondary.main,
            borderRadius: '50%',
            animation: `${dotAnimation} 1.4s ease-in-out infinite`,
            animationDelay: `${i * 0.16}s`,
          }}
        />
      ))}
    </Box>
  );
};

// Bar Loader
const BarLoader = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  const heightMap = {
    small: 3,
    medium: 4,
    large: 6,
  };

  return (
    <Box sx={{ width: size === 'small' ? 80 : size === 'medium' ? 120 : 160 }}>
      <LinearProgress
        sx={{
          height: heightMap[size],
          borderRadius: 4,
          backgroundColor: brandColors.neutral.gray100,
          '& .MuiLinearProgress-bar': {
            background: `linear-gradient(90deg, ${brandColors.primary.main}, ${brandColors.primary.light}, ${brandColors.secondary.main})`,
            borderRadius: 4,
          },
        }}
      />
    </Box>
  );
};

interface LoaderDemoProps {
  variant?: 'spinner' | 'fullPage' | 'buttonLoading' | 'skeleton' | 'dotLoader' | 'barLoader';
}

const LoaderDemo = ({ variant = 'spinner' }: LoaderDemoProps) => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState<string | null>(null);

  const showFullPageLoader = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const handleButtonClick = (buttonId: string) => {
    setButtonLoading(buttonId);
    setTimeout(() => setButtonLoading(null), 2000);
  };

  if (variant === 'fullPage') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Full Page Loader</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Overlay loader for page transitions and async operations.
        </Typography>

        <Button variant="contained" onClick={showFullPageLoader}>
          Show Full Page Loader (3s)
        </Button>

        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(5, 7, 66, 0.95)',
            flexDirection: 'column',
            gap: 3,
          }}
          open={loading}
        >
          <TrinityLoader size="large" />
          <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
            Loading...
          </Typography>
          <BarLoader size="large" />
        </Backdrop>

        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle2" gutterBottom>Preview (static)</Typography>
          <Paper
            sx={{
              p: 4,
              bgcolor: 'rgba(5, 7, 66, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <TrinityLoader size="large" />
            <Typography variant="body1" sx={{ color: 'white' }}>
              Loading...
            </Typography>
            <BarLoader size="medium" />
          </Paper>
        </Box>
      </Box>
    );
  }

  if (variant === 'buttonLoading') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Buttons with Loading State</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Buttons that show loading state during async operations.
        </Typography>

        <Stack spacing={3}>
          {/* Primary Button */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Default Button</Typography>
            <Button
              variant="contained"
              onClick={() => handleButtonClick('default')}
              disabled={buttonLoading === 'default'}
              startIcon={buttonLoading === 'default' ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {buttonLoading === 'default' ? 'Loading...' : 'Default Button'}
            </Button>
          </Box>

          {/* Secondary Button */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Secondary</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleButtonClick('secondary')}
              disabled={buttonLoading === 'secondary'}
              startIcon={buttonLoading === 'secondary' ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {buttonLoading === 'secondary' ? 'Loading...' : 'Secondary'}
            </Button>
          </Box>

          {/* Outlined Button */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Outline</Typography>
            <Button
              variant="outlined"
              onClick={() => handleButtonClick('outline')}
              disabled={buttonLoading === 'outline'}
              startIcon={buttonLoading === 'outline' ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {buttonLoading === 'outline' ? 'Loading...' : 'Outline'}
            </Button>
          </Box>

          {/* Gradient Button */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Gradient</Typography>
            <Button
              variant="contained"
              onClick={() => handleButtonClick('gradient')}
              disabled={buttonLoading === 'gradient'}
              sx={{
                background: `linear-gradient(135deg, ${brandColors.primary.main}, ${brandColors.primary.light})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${brandColors.primary.light}, ${brandColors.secondary.main})`,
                },
              }}
              startIcon={buttonLoading === 'gradient' ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {buttonLoading === 'gradient' ? 'Loading...' : 'Gradient'}
            </Button>
          </Box>

          {/* Icon only loading */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Icon Only Loading</Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick('icon1')}
                disabled={buttonLoading === 'icon1'}
                sx={{ minWidth: 48 }}
              >
                {buttonLoading === 'icon1' ? <CircularProgress size={20} color="inherit" /> : 'Save'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleButtonClick('icon2')}
                disabled={buttonLoading === 'icon2'}
                sx={{ minWidth: 48 }}
              >
                {buttonLoading === 'icon2' ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'skeleton') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Skeleton Loading</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Content placeholder loading states.
        </Typography>

        <Stack spacing={4}>
          {/* Basic Variants */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Basic Variants</Typography>
            <Stack spacing={2}>
              <Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" width={300} sx={{ fontSize: '1rem' }} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={210} height={60} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rounded" width={210} height={60} />
            </Stack>
          </Box>

          {/* Card Skeleton */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Card Skeleton</Typography>
            <Card sx={{ maxWidth: 345 }}>
              <Skeleton variant="rectangular" height={140} />
              <CardContent>
                <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 1 }} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </CardContent>
            </Card>
          </Box>

          {/* List Skeleton */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>List Skeleton</Typography>
            <Stack spacing={2}>
              {[1, 2, 3].map((i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Skeleton variant="circular" width={48} height={48} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="40%" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" width="70%" sx={{ fontSize: '0.875rem' }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Form Skeleton */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Form Skeleton</Typography>
            <Stack spacing={2} sx={{ maxWidth: 400 }}>
              <Box>
                <Skeleton variant="text" width={80} sx={{ fontSize: '0.75rem', mb: 0.5 }} />
                <Skeleton variant="rounded" height={40} />
              </Box>
              <Box>
                <Skeleton variant="text" width={60} sx={{ fontSize: '0.75rem', mb: 0.5 }} />
                <Skeleton variant="rounded" height={40} />
              </Box>
              <Box>
                <Skeleton variant="text" width={100} sx={{ fontSize: '0.75rem', mb: 0.5 }} />
                <Skeleton variant="rounded" height={80} />
              </Box>
              <Skeleton variant="rounded" width={120} height={36} />
            </Stack>
          </Box>

          {/* Table Skeleton */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Table Skeleton</Typography>
            <Paper sx={{ p: 2 }}>
              {/* Header */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2, pb: 1, borderBottom: 1, borderColor: 'divider' }}>
                <Skeleton variant="text" width="20%" />
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="text" width="25%" />
                <Skeleton variant="text" width="15%" />
              </Box>
              {/* Rows */}
              {[1, 2, 3, 4].map((i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2, py: 1 }}>
                  <Skeleton variant="text" width="20%" />
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="25%" />
                  <Skeleton variant="text" width="15%" />
                </Box>
              ))}
            </Paper>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'dotLoader') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Dot Loader</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Animated dots with Trinity brand colors.
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Small</Typography>
            <DotLoader size="small" />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Medium</Typography>
            <DotLoader size="medium" />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Large</Typography>
            <DotLoader size="large" />
          </Box>

          {/* In context */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>In Button Context</Typography>
            <Button variant="contained" disabled sx={{ gap: 1 }}>
              <DotLoader size="small" />
              Processing
            </Button>
          </Box>

          {/* Centered */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Centered Loading</Typography>
            <Paper sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
              <DotLoader size="medium" />
            </Paper>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'barLoader') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Bar Loader</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Linear progress with Trinity gradient.
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Small</Typography>
            <BarLoader size="small" />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Medium</Typography>
            <BarLoader size="medium" />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Large</Typography>
            <BarLoader size="large" />
          </Box>

          {/* Full width */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Full Width</Typography>
            <LinearProgress
              sx={{
                height: 4,
                borderRadius: 4,
                backgroundColor: brandColors.neutral.gray100,
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${brandColors.primary.main}, ${brandColors.primary.light}, ${brandColors.secondary.main})`,
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          {/* Determinate */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Determinate (65%)</Typography>
            <LinearProgress
              variant="determinate"
              value={65}
              sx={{
                height: 6,
                borderRadius: 4,
                backgroundColor: brandColors.neutral.gray100,
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${brandColors.primary.main}, ${brandColors.primary.light})`,
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          {/* With label */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>With Label</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={78}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: brandColors.neutral.gray100,
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${brandColors.primary.main}, ${brandColors.primary.light})`,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" fontWeight={600}>78%</Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  }

  // spinner variant (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Loaders</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Custom loading components with Trinity branding.
      </Typography>

      <Stack spacing={5}>
        {/* Trinity Logo Loader */}
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>Trinity Loader</Typography>
          <Stack direction="row" spacing={6} alignItems="flex-end">
            <Box sx={{ textAlign: 'center' }}>
              <TrinityLoader size="small" />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Small</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <TrinityLoader size="medium" />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Medium</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <TrinityLoader size="large" />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Large</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Static (no animation) */}
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>Static (No Animation)</Typography>
          <Stack direction="row" spacing={6} alignItems="flex-end">
            <Box sx={{ textAlign: 'center' }}>
              <TrinityLoader size="small" animate={false} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Small</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <TrinityLoader size="medium" animate={false} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Medium</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <TrinityLoader size="large" animate={false} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Large</Typography>
            </Box>
          </Stack>
        </Box>

        {/* MUI Circular Progress with brand colors */}
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>Circular Progress (Brand Colors)</Typography>
          <Stack direction="row" spacing={4} alignItems="center">
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={24} sx={{ color: brandColors.primary.main }} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Navy</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={32} sx={{ color: brandColors.primary.light }} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Purple</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={40} sx={{ color: brandColors.secondary.main }} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Coral</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={48} sx={{ color: brandColors.secondary.light }} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Azure</Typography>
            </Box>
          </Stack>
        </Box>

        {/* On dark background */}
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>On Dark Background</Typography>
          <Paper
            sx={{
              p: 4,
              bgcolor: brandColors.primary.main,
              display: 'flex',
              gap: 6,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <TrinityLoader size="small" />
            <TrinityLoader size="medium" />
            <TrinityLoader size="large" />
          </Paper>
        </Box>

        {/* In content context */}
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>In Content Context</Typography>
          <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <TrinityLoader size="medium" />
            <Typography variant="body2" color="text.secondary">Loading content...</Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof LoaderDemo> = {
  title: 'Feedback/Loaders',
  component: LoaderDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Custom loading components with Trinity branding including spinners, skeleton loaders, and animated indicators.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['spinner', 'fullPage', 'buttonLoading', 'skeleton', 'dotLoader', 'barLoader'],
      description: 'Loader variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Trinity branded spinners in various sizes.
 */
export const Spinners: Story = {
  args: {
    variant: 'spinner',
  },
};

/**
 * Full page overlay loader.
 */
export const FullPageLoader: Story = {
  args: {
    variant: 'fullPage',
  },
};

/**
 * Buttons with loading states.
 */
export const ButtonLoading: Story = {
  args: {
    variant: 'buttonLoading',
  },
};

/**
 * Skeleton loading placeholders.
 */
export const SkeletonLoading: Story = {
  args: {
    variant: 'skeleton',
  },
};

/**
 * Animated dot loader.
 */
export const DotLoaderVariant: Story = {
  args: {
    variant: 'dotLoader',
  },
};

/**
 * Linear bar loader with gradient.
 */
export const BarLoaderVariant: Story = {
  args: {
    variant: 'barLoader',
  },
};
