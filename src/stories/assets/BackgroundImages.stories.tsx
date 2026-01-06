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
} from '@mui/material';
import {
  Download as DownloadIcon,
  ContentCopy as CopyIcon,
  Fullscreen as FullscreenIcon,
} from '@mui/icons-material';
import React, { useState } from 'react';
import {
  backgroundImages,
  backgroundImageMeta,
  BackgroundCategory,
} from '../../assets';
import JSZip from 'jszip';

/**
 * # Background Images
 *
 * Professional background images for Trinity applications. Available in two
 * distinct collections designed for different use cases.
 *
 * ## Collections
 *
 * ### Smooth Abstract
 * Soft, flowing abstract backgrounds with subtle gradient effects. Ideal for:
 * - Hero sections
 * - Landing pages
 * - Marketing materials
 * - Dashboard backgrounds
 *
 * ### Technology & Human
 * Backgrounds featuring the intersection of technology and human elements. Ideal for:
 * - AI/ML product pages
 * - Healthcare technology sections
 * - Innovation showcases
 * - About pages
 *
 * ## Usage
 *
 * ```tsx
 * import { backgroundImages } from '@trinity/design-system/assets';
 *
 * // As a CSS background
 * <Box sx={{
 *   backgroundImage: `url(${backgroundImages.smoothAbstract[0]})`,
 *   backgroundSize: 'cover',
 *   backgroundPosition: 'center',
 *   minHeight: 400,
 * }}>
 *   <Typography>Hero Content</Typography>
 * </Box>
 *
 * // With overlay for text readability
 * <Box sx={{
 *   backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImages.technologyHuman[2]})`,
 *   backgroundSize: 'cover',
 * }}>
 *   <Typography color="white">Readable text</Typography>
 * </Box>
 * ```
 */
const meta: Meta = {
  title: 'Assets/Background Images',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Professional background images in two collections: Smooth Abstract and Technology & Human.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const BackgroundGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BackgroundCategory>('smoothAbstract');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const currentImages = backgroundImages[selectedCategory];
  const currentMeta = backgroundImageMeta[selectedCategory];

  const handleCopyCode = (index: number) => {
    const code = `import { backgroundImages } from '@trinity/design-system/assets';

<Box sx={{
  backgroundImage: \`url(\${backgroundImages.${selectedCategory}[${index}]})\`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: 400,
}} />`;
    navigator.clipboard.writeText(code);
    setSnackbar({ open: true, message: 'Copied code to clipboard!' });
  };

  const handleDownload = async (url: string, index: number) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const ext = url.includes('.png') ? 'png' : 'jpg';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedCategory}-${index + 1}.${ext}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder(`trinity-${selectedCategory}-backgrounds`);

    for (let i = 0; i < currentImages.length; i++) {
      try {
        const url = currentImages[i];
        const response = await fetch(url);
        const blob = await response.blob();
        const ext = url.includes('.png') ? 'png' : 'jpg';
        folder?.file(`${selectedCategory}-${i + 1}.${ext}`, blob);
      } catch (e) {
        console.error(`Failed to fetch image ${i + 1}:`, e);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `trinity-${selectedCategory}-backgrounds.zip`;
    link.click();
    URL.revokeObjectURL(link.href);
    setSnackbar({ open: true, message: `Downloaded all ${currentMeta.label}!` });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Background Images
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {backgroundImageMeta.smoothAbstract.count + backgroundImageMeta.technologyHuman.count} professional
          background images in 2 collections
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={(_, v) => setSelectedCategory(v)}
        >
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Smooth Abstract
                <Chip label={backgroundImageMeta.smoothAbstract.count} size="small" />
              </Box>
            }
            value="smoothAbstract"
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Technology & Human
                <Chip label={backgroundImageMeta.technologyHuman.count} size="small" />
              </Box>
            }
            value="technologyHuman"
          />
        </Tabs>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6">{currentMeta.label}</Typography>
          <Typography variant="body2" color="text.secondary">
            {currentMeta.description}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadAll}
        >
          Download All ({currentMeta.count})
        </Button>
      </Box>

      <Grid container spacing={3}>
        {currentImages.map((url, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
                height={200}
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
                  {selectedCategory === 'smoothAbstract'
                    ? `smooth_abstract${index + 1}`
                    : `bg_th${index + 1}`}
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
  render: () => <BackgroundGallery />,
};

export const UsageExamples: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Usage Examples
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Hero Section
          </Typography>
          <Paper
            sx={{
              backgroundImage: `url(${backgroundImages.smoothAbstract[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                bgcolor: 'rgba(255,255,255,0.9)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" fontWeight={600}>
                Welcome to Trinity
              </Typography>
              <Typography color="text.secondary">
                Transforming healthcare through innovation
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            With Dark Overlay
          </Typography>
          <Paper
            sx={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImages.technologyHuman[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" color="white" fontWeight={600}>
              AI-Powered Insights
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Card Background
          </Typography>
          <Paper
            sx={{
              backgroundImage: `url(${backgroundImages.smoothAbstract[3]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: 200,
              p: 3,
              borderRadius: 2,
            }}
          >
            <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.95)' }}>
              <Typography variant="h6">Feature Card</Typography>
              <Typography variant="body2" color="text.secondary">
                Content with subtle background texture
              </Typography>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  ),
};
