import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Breadcrumbs,
  Link,
  Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import { brandColors } from '../theme';

/**
 * # Breadcrumbs
 * 
 * Breadcrumbs show the user's current location within a site hierarchy
 * and provide navigation to previous levels.
 * 
 * ## Design Guidelines
 * - Always show the home/root level first
 * - Current page should not be a link
 * - Keep breadcrumb text concise
 * - Use consistent separator icons
 * - Consider collapsing long breadcrumb trails
 */

interface BreadcrumbsDemoProps {
  variant?: 'basic' | 'withIcons' | 'collapsed' | 'custom' | 'interactive';
}

const BreadcrumbsDemo = ({ variant = 'basic' }: BreadcrumbsDemoProps) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    console.log('Breadcrumb clicked');
  };

  if (variant === 'withIcons') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Breadcrumbs with Icons</Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Home Icon</Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="#"
                onClick={handleClick}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="#"
                onClick={handleClick}
              >
                Analytics
              </Link>
              <Typography color="text.primary">Reports</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>All Icons</Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="#"
                onClick={handleClick}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="#"
                onClick={handleClick}
              >
                <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Projects
              </Link>
              <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
              >
                <DescriptionIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Market Analysis
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Icon Only Home</Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                href="#"
                onClick={handleClick}
              >
                <HomeIcon fontSize="small" />
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="#"
                onClick={handleClick}
              >
                Analytics
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="#"
                onClick={handleClick}
              >
                Reports
              </Link>
              <Typography color="text.primary">Q4 Summary</Typography>
            </Breadcrumbs>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'collapsed') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Collapsed Breadcrumbs</Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Max Items = 3</Typography>
            <Breadcrumbs maxItems={3} aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Analytics
              </Link>
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Market Data
              </Link>
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Reports
              </Link>
              <Typography color="text.primary">Q4 Analysis</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Items Before/After Collapse</Typography>
            <Breadcrumbs
              maxItems={4}
              itemsBeforeCollapse={1}
              itemsAfterCollapse={2}
              aria-label="breadcrumb"
            >
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Analytics
              </Link>
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Market Intelligence
              </Link>
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Competitive Analysis
              </Link>
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Reports
              </Link>
              <Typography color="text.primary">Summary</Typography>
            </Breadcrumbs>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'custom') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Custom Separators & Styles</Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Arrow Separator</Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Analytics
              </Link>
              <Typography color="text.primary">Reports</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Custom Arrow</Typography>
            <Breadcrumbs
              separator={<KeyboardArrowRightIcon fontSize="small" sx={{ color: brandColors.primary.main }} />}
              aria-label="breadcrumb"
            >
              <Link 
                underline="hover" 
                href="#" 
                onClick={handleClick}
                sx={{ color: brandColors.primary.main }}
              >
                Home
              </Link>
              <Link 
                underline="hover" 
                href="#" 
                onClick={handleClick}
                sx={{ color: brandColors.primary.main }}
              >
                Analytics
              </Link>
              <Typography sx={{ color: brandColors.primary.dark, fontWeight: 500 }}>
                Reports
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Slash Separator</Typography>
            <Breadcrumbs separator="/" aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Analytics
              </Link>
              <Typography color="text.primary">Reports</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Pipe Separator</Typography>
            <Breadcrumbs separator="|" aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                Analytics
              </Link>
              <Typography color="text.primary">Reports</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Contained Style</Typography>
            <Paper sx={{ py: 1, px: 2, display: 'inline-block', bgcolor: 'grey.100' }}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                  Home
                </Link>
                <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                  Analytics
                </Link>
                <Typography color="text.primary" fontWeight={500}>Reports</Typography>
              </Breadcrumbs>
            </Paper>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'interactive') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Interactive Examples</Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Page Header with Breadcrumbs</Typography>
            <Paper sx={{ p: 3 }}>
              <Breadcrumbs sx={{ mb: 1 }}>
                <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                  <HomeIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                  Home
                </Link>
                <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
                  Analytics
                </Link>
                <Typography color="text.primary">Market Reports</Typography>
              </Breadcrumbs>
              <Typography variant="h5">Market Reports</Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage all your market analysis reports
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>File Browser Style</Typography>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'grey.50', p: 1, borderRadius: 1 }}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  sx={{ flex: 1 }}
                >
                  <Button
                    size="small"
                    sx={{ minWidth: 'auto', p: 0.5 }}
                    onClick={handleClick}
                  >
                    <HomeIcon fontSize="small" />
                  </Button>
                  <Button size="small" sx={{ textTransform: 'none' }} onClick={handleClick}>
                    Documents
                  </Button>
                  <Button size="small" sx={{ textTransform: 'none' }} onClick={handleClick}>
                    Projects
                  </Button>
                  <Typography variant="body2" fontWeight={500}>
                    Q4 Analysis
                  </Typography>
                </Breadcrumbs>
              </Box>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Wizard Progress</Typography>
            <Paper sx={{ p: 2 }}>
              <Breadcrumbs separator="→">
                <Typography 
                  sx={{ 
                    color: 'success.main',
                    fontWeight: 500,
                  }}
                >
                  ✓ Details
                </Typography>
                <Typography 
                  sx={{ 
                    color: brandColors.primary.main,
                    fontWeight: 500,
                  }}
                >
                  Configuration
                </Typography>
                <Typography color="text.disabled">Review</Typography>
                <Typography color="text.disabled">Confirm</Typography>
              </Breadcrumbs>
            </Paper>
          </Box>
        </Stack>
      </Box>
    );
  }

  // basic variant (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Basic Breadcrumbs</Typography>
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>Simple</Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
              Home
            </Link>
            <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
              Analytics
            </Link>
            <Typography color="text.primary">Reports</Typography>
          </Breadcrumbs>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Longer Path</Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
              Home
            </Link>
            <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
              Market Intelligence
            </Link>
            <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
              Competitive Analysis
            </Link>
            <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
              Reports
            </Link>
            <Typography color="text.primary">Q4 2024 Summary</Typography>
          </Breadcrumbs>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Two Levels</Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#" onClick={handleClick}>
              Dashboard
            </Link>
            <Typography color="text.primary">Settings</Typography>
          </Breadcrumbs>
        </Box>
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof BreadcrumbsDemo> = {
  title: 'Navigation/Breadcrumbs',
  component: BreadcrumbsDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Breadcrumbs for navigation hierarchy.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'withIcons', 'collapsed', 'custom', 'interactive'],
      description: 'Breadcrumbs demo variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic breadcrumb usage.
 */
export const Basic: Story = {
  args: {
    variant: 'basic',
  },
};

/**
 * Breadcrumbs with icons.
 */
export const WithIcons: Story = {
  args: {
    variant: 'withIcons',
  },
};

/**
 * Collapsed breadcrumbs for long paths.
 */
export const Collapsed: Story = {
  args: {
    variant: 'collapsed',
  },
};

/**
 * Custom separators and styles.
 */
export const Custom: Story = {
  args: {
    variant: 'custom',
  },
};

/**
 * Interactive breadcrumb examples.
 */
export const Interactive: Story = {
  args: {
    variant: 'interactive',
  },
};
