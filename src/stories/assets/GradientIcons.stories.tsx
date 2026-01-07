import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import React, { useState, useMemo } from 'react';
import {
  gradientIcons,
  gradientIconMeta,
  GradientIconName,
} from '../../assets';
import JSZip from 'jszip';

/**
 * # Gradient Icons
 *
 * Trinity's custom gradient icons for use across applications. These icons
 * feature the signature Trinity gradient treatment and are designed for
 * consistent brand expression.
 *
 * ## Usage
 *
 * ```tsx
 * import { gradientIcons } from '@trinity/design-system/assets';
 *
 * // As an image
 * <img src={gradientIcons.ai} alt="AI" width={48} height={48} />
 *
 * // As a background
 * <div style={{
 *   backgroundImage: `url(${gradientIcons.strategy})`,
 *   backgroundSize: 'contain',
 *   width: 64,
 *   height: 64
 * }} />
 * ```
 *
 * ## Categories
 * - **Business**: Market, portfolio, strategy icons
 * - **Technology**: AI, intelligence icons
 * - **Healthcare**: Medical, patient icons
 * - **Values**: Culture, growth, inclusion icons
 * - **Corporate**: Benefits, careers icons
 * - **Decorative**: Quote marks, puzzle pieces
 */
const meta: Meta = {
  title: 'Assets/Gradient Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Trinity branded gradient icons for use in applications. Click to copy import code, or download individually/in bulk.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Get all categories
const categories = [...new Set(Object.values(gradientIconMeta).map((m) => m.category))].sort();

const GradientIconGallery: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const iconEntries = useMemo(() => {
    return Object.entries(gradientIcons).filter(([name]) => {
      const meta = gradientIconMeta[name as GradientIconName];
      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        meta.label.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || meta.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const handleCopyImport = (iconName: string) => {
    const code = `import { gradientIcons } from '@trinity/design-system/assets';\n\n<img src={gradientIcons.${iconName}} alt="${gradientIconMeta[iconName as GradientIconName].label}" />`;
    navigator.clipboard.writeText(code);
    setSnackbar({ open: true, message: `Copied ${iconName} import code!` });
  };

  const handleDownload = async (iconName: string, url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `gradient-icon-${iconName}.svg`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder('trinity-gradient-icons');

    for (const [name, url] of Object.entries(gradientIcons)) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        folder?.file(`${name}.svg`, blob);
      } catch (e) {
        console.error(`Failed to fetch ${name}:`, e);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'trinity-gradient-icons.zip';
    link.click();
    URL.revokeObjectURL(link.href);
    setSnackbar({ open: true, message: 'Downloaded all gradient icons!' });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Gradient Icons
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {Object.keys(gradientIcons).length} custom Trinity gradient icons
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadAll}
          >
            Download All ({Object.keys(gradientIcons).length})
          </Button>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={(_, v) => setSelectedCategory(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All" value="All" />
          {categories.map((cat) => (
            <Tab key={cat} label={cat} value={cat} />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={2}>
        {iconEntries.map(([name, url]) => {
          const meta = gradientIconMeta[name as GradientIconName];
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={name}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 2,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                  }}
                >
                  <img
                    src={url}
                    alt={meta.label}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </Box>
                <Typography variant="caption" fontWeight={500} textAlign="center">
                  {meta.label}
                </Typography>
                <Chip label={meta.category} size="small" variant="outlined" />
                <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                  <Tooltip title="Copy import code">
                    <IconButton
                      size="small"
                      onClick={() => handleCopyImport(name)}
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download SVG">
                    <IconButton
                      size="small"
                      onClick={() => handleDownload(name, url)}
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {iconEntries.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="text.secondary">
            No icons found matching "{search}"
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
  render: () => <GradientIconGallery />,
};

export const UsageExample: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Usage Examples
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Feature Cards
            </Typography>
            <Grid container spacing={2}>
              {['ai', 'insights', 'strategy', 'customer'].map((icon) => (
                <Grid item xs={6} key={icon}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                    }}
                  >
                    <img
                      src={gradientIcons[icon as GradientIconName]}
                      alt={icon}
                      width={48}
                      height={48}
                    />
                    <Typography variant="body2" sx={{ mt: 1, textTransform: 'capitalize' }}>
                      {icon}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              List with Icons
            </Typography>
            {['benefits', 'growth', 'culture', 'together'].map((icon) => (
              <Box
                key={icon}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 1.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <img
                  src={gradientIcons[icon as GradientIconName]}
                  alt={icon}
                  width={32}
                  height={32}
                />
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {gradientIconMeta[icon as GradientIconName].label}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  ),
};
