import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Snackbar,
  Alert,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Tooltip,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Download as DownloadIcon,
  ContentCopy as CopyIcon,
  Fullscreen as FullscreenIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import React, { useState } from 'react';
import {
  brandGradients,
  brandGradientMeta,
  GradientTheme,
} from '../../assets';
import JSZip from 'jszip';

/**
 * # Brand Gradients
 *
 * Official Trinity brand gradient backgrounds. These gradients incorporate
 * the core Trinity color palette and are optimized for both light and dark
 * mode interfaces.
 *
 * ## Variants
 *
 * ### Light Brand Gradients
 * Gradients optimized for light mode interfaces. Features softer tones
 * and subtle transitions ideal for:
 * - Light mode dashboards
 * - Marketing websites
 * - Print materials
 * - Email templates
 *
 * ### Dark Brand Gradients
 * Gradients optimized for dark mode interfaces. Features deeper tones
 * and richer colors ideal for:
 * - Dark mode dashboards
 * - Presentation backgrounds
 * - Video thumbnails
 * - Social media graphics
 *
 * ## Usage
 *
 * ```tsx
 * import { brandGradients } from '@trinity/design-system/assets';
 *
 * // Light mode background
 * <Box sx={{
 *   backgroundImage: `url(${brandGradients.light[0]})`,
 *   backgroundSize: 'cover',
 * }}>
 *   Content
 * </Box>
 *
 * // Theme-aware background
 * const theme = useTheme();
 * const gradient = theme.palette.mode === 'dark'
 *   ? brandGradients.dark[0]
 *   : brandGradients.light[0];
 * ```
 */
const meta: Meta = {
  title: 'Assets/Brand Gradients',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Official Trinity brand gradient backgrounds for light and dark mode interfaces.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const BrandGradientGallery: React.FC = () => {
  const theme = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<GradientTheme>(
    theme.palette.mode === 'dark' ? 'dark' : 'light'
  );
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const currentGradients = brandGradients[selectedTheme];
  const currentMeta = brandGradientMeta[selectedTheme];

  const handleCopyCode = (index: number) => {
    const code = `import { brandGradients } from '@trinity/design-system/assets';

// ${selectedTheme === 'light' ? 'Light' : 'Dark'} mode gradient
<Box sx={{
  backgroundImage: \`url(\${brandGradients.${selectedTheme}[${index}]})\`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
}} />`;
    navigator.clipboard.writeText(code);
    setSnackbar({ open: true, message: 'Copied code to clipboard!' });
  };

  const handleDownload = async (url: string, index: number) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedTheme}-brand-gradient-${index + 1}.png`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder(`trinity-${selectedTheme}-brand-gradients`);

    for (let i = 0; i < currentGradients.length; i++) {
      try {
        const url = currentGradients[i];
        const response = await fetch(url);
        const blob = await response.blob();
        folder?.file(`${selectedTheme}-brand-gradient-${i + 1}.png`, blob);
      } catch (e) {
        console.error(`Failed to fetch gradient ${i + 1}:`, e);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `trinity-${selectedTheme}-brand-gradients.zip`;
    link.click();
    URL.revokeObjectURL(link.href);
    setSnackbar({ open: true, message: `Downloaded all ${currentMeta.label}!` });
  };

  const handleDownloadAllGradients = async () => {
    const zip = new JSZip();
    const lightFolder = zip.folder('light-gradients');
    const darkFolder = zip.folder('dark-gradients');

    // Download light gradients
    for (let i = 0; i < brandGradients.light.length; i++) {
      try {
        const response = await fetch(brandGradients.light[i]);
        const blob = await response.blob();
        lightFolder?.file(`light-brand-gradient-${i + 1}.png`, blob);
      } catch (e) {
        console.error(`Failed to fetch light gradient ${i + 1}:`, e);
      }
    }

    // Download dark gradients
    for (let i = 0; i < brandGradients.dark.length; i++) {
      try {
        const response = await fetch(brandGradients.dark[i]);
        const blob = await response.blob();
        darkFolder?.file(`dark-brand-gradient-${i + 1}.png`, blob);
      } catch (e) {
        console.error(`Failed to fetch dark gradient ${i + 1}:`, e);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'trinity-all-brand-gradients.zip';
    link.click();
    URL.revokeObjectURL(link.href);
    setSnackbar({ open: true, message: 'Downloaded all brand gradients!' });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Brand Gradients
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {brandGradientMeta.light.count + brandGradientMeta.dark.count} official Trinity brand
          gradients for light and dark interfaces
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedTheme}
          onChange={(_, v) => setSelectedTheme(v)}
        >
          <Tab
            icon={<LightModeIcon />}
            iconPosition="start"
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Light Gradients
                <Chip label={brandGradientMeta.light.count} size="small" />
              </Box>
            }
            value="light"
          />
          <Tab
            icon={<DarkModeIcon />}
            iconPosition="start"
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Dark Gradients
                <Chip label={brandGradientMeta.dark.count} size="small" />
              </Box>
            }
            value="dark"
          />
        </Tabs>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h6">{currentMeta.label}</Typography>
          <Typography variant="body2" color="text.secondary">
            {currentMeta.description}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadAll}
          >
            Download {selectedTheme === 'light' ? 'Light' : 'Dark'} ({currentMeta.count})
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadAllGradients}
          >
            Download All ({brandGradientMeta.light.count + brandGradientMeta.dark.count})
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {currentGradients.map((url, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardMedia
                component="img"
                height={180}
                image={url}
                alt={`${currentMeta.label} ${index + 1}`}
                sx={{
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => setPreviewImage(url)}
              />
              <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  {selectedTheme}_brand_gradient{index + 1}
                </Typography>
                <Box>
                  <Tooltip title="Preview fullscreen">
                    <IconButton size="small" onClick={() => setPreviewImage(url)}>
                      <FullscreenIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy code">
                    <IconButton size="small" onClick={() => handleCopyCode(index)}>
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton size="small" onClick={() => handleDownload(url, index)}>
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Fullscreen Preview Modal */}
      {previewImage && (
        <Box
          onClick={() => setPreviewImage(null)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer',
          }}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              bottom: 20,
              color: 'white',
              opacity: 0.7,
            }}
          >
            Click anywhere to close
          </Typography>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity="success" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const Gallery: Story = {
  render: () => <BrandGradientGallery />,
};

export const ThemeAwareUsage: Story = {
  render: () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const gradient = isDark ? brandGradients.dark[0] : brandGradients.light[0];

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Theme-Aware Usage
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Automatically select gradient based on current theme mode
        </Typography>

        <Paper
          sx={{
            backgroundImage: `url(${gradient})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 300,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
              p: 3,
              borderRadius: 2,
              maxWidth: 400,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Current Theme: {isDark ? 'Dark' : 'Light'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              The gradient automatically adapts to the current theme mode.
              Toggle between light and dark mode to see the change.
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Code Example
          </Typography>
          <Box
            component="pre"
            sx={{
              bgcolor: 'grey.900',
              color: 'grey.100',
              p: 2,
              borderRadius: 1,
              overflow: 'auto',
              fontSize: 13,
            }}
          >
            {`import { brandGradients } from '@trinity/design-system/assets';
import { useTheme } from '@mui/material';

const MyComponent = () => {
  const theme = useTheme();
  const gradient = theme.palette.mode === 'dark'
    ? brandGradients.dark[0]
    : brandGradients.light[0];

  return (
    <Box sx={{
      backgroundImage: \`url(\${gradient})\`,
      backgroundSize: 'cover',
    }}>
      Content
    </Box>
  );
};`}
          </Box>
        </Box>
      </Box>
    );
  },
};

export const FullPageExamples: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Full Page Layout Examples
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Login Page (Light)
          </Typography>
          <Paper
            sx={{
              backgroundImage: `url(${brandGradients.light[2]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Paper sx={{ p: 4, width: 280, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Welcome Back
              </Typography>
              <Box sx={{ height: 40, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }} />
              <Box sx={{ height: 40, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }} />
              <Box sx={{ height: 40, bgcolor: 'primary.main', borderRadius: 100 }} />
            </Paper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Dashboard Header (Dark)
          </Typography>
          <Paper
            sx={{
              backgroundImage: `url(${brandGradients.dark[1]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: 400,
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" color="white" fontWeight={600}>
                Dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Welcome back, User
              </Typography>
            </Box>
            <Box sx={{ flex: 1, bgcolor: 'background.paper', m: 2, mt: 0, borderRadius: 2, p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Dashboard content area
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  ),
};
