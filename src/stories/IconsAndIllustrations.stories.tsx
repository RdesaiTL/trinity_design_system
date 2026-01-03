import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid, Stack, Button, Tabs, Tab, TextField, InputAdornment, Chip, IconButton, Tooltip } from '@mui/material';
import { useState, useRef } from 'react';
import { 
  Icon, 
  IconProvider, 
  useIconLibrary,
  getAvailableIcons,
  IconSize,
} from '../components/Icon';
import {
  EmptyTableIllustration,
  EmptyDraftsIllustration,
  GettingStartedIllustration,
  EmptyDocumentsIllustration,
  EmptyInsightsIllustration,
  NoResultsIllustration,
  ErrorGenericIllustration,
  Error404Illustration,
  Error500Illustration,
  ErrorPermissionIllustration,
  UploadIllustration,
  SuccessIllustration,
  NoNotificationsIllustration,
  NoDataIllustration,
  OfflineIllustration,
} from '../components/IllustratedMessage';
import { brandColors } from '../tokens';

/**
 * # Icons & Illustrations
 * 
 * Download SVG assets for use in your projects. This library includes:
 * 
 * - **Icons**: 100+ icons available in Material and Feather styles
 * - **Illustrations**: 15 SVG illustrations for empty states, errors, and more
 * 
 * ## How to Download
 * 
 * Click the download button on any icon or illustration to save it as an SVG file.
 * 
 * ## Usage in Code
 * 
 * ```tsx
 * // Icons
 * import { Icon, IconProvider } from './components/Icon';
 * <IconProvider><Icon name="home" size="medium" /></IconProvider>
 * 
 * // Illustrations
 * import { IllustratedMessage } from './components/IllustratedMessage';
 * <IllustratedMessage illustration="empty-table" title="No data" />
 * ```
 */

// Illustration metadata
const illustrations = [
  { id: 'empty-table', name: 'Empty Table', Component: EmptyTableIllustration, category: 'Empty States' },
  { id: 'empty-drafts', name: 'Empty Drafts', Component: EmptyDraftsIllustration, category: 'Empty States' },
  { id: 'getting-started', name: 'Getting Started', Component: GettingStartedIllustration, category: 'Empty States' },
  { id: 'empty-documents', name: 'Empty Documents', Component: EmptyDocumentsIllustration, category: 'Empty States' },
  { id: 'empty-insights', name: 'Empty Insights', Component: EmptyInsightsIllustration, category: 'Empty States' },
  { id: 'no-results', name: 'No Results', Component: NoResultsIllustration, category: 'Empty States' },
  { id: 'no-data', name: 'No Data', Component: NoDataIllustration, category: 'Empty States' },
  { id: 'no-notifications', name: 'No Notifications', Component: NoNotificationsIllustration, category: 'Empty States' },
  { id: 'error-generic', name: 'Error Generic', Component: ErrorGenericIllustration, category: 'Error States' },
  { id: 'error-404', name: 'Error 404', Component: Error404Illustration, category: 'Error States' },
  { id: 'error-500', name: 'Error 500', Component: Error500Illustration, category: 'Error States' },
  { id: 'error-permission', name: 'Permission Denied', Component: ErrorPermissionIllustration, category: 'Error States' },
  { id: 'offline', name: 'Offline', Component: OfflineIllustration, category: 'Error States' },
  { id: 'upload', name: 'Upload', Component: UploadIllustration, category: 'Actions' },
  { id: 'success', name: 'Success', Component: SuccessIllustration, category: 'Feedback' },
];

// Download SVG helper
const downloadSvg = (svgElement: SVGSVGElement | null, filename: string) => {
  if (!svgElement) return;
  
  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svgElement);
  
  // Add XML declaration and ensure proper SVG namespace
  if (!svgString.includes('xmlns')) {
    svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Download icon as SVG
const downloadIconSvg = (iconName: string, library: 'material' | 'feather') => {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);
  
  // Create a temporary icon element - we'll extract the SVG from the DOM
  setTimeout(() => {
    const svgElement = container.querySelector('svg');
    if (svgElement) {
      downloadSvg(svgElement as SVGSVGElement, `icon-${iconName}-${library}`);
    }
    document.body.removeChild(container);
  }, 100);
};

// Icon Download Card
const IconDownloadCard = ({ iconName }: { iconName: string }) => {
  const { library } = useIconLibrary();
  const svgRef = useRef<HTMLDivElement>(null);
  
  const handleDownload = () => {
    const svgElement = svgRef.current?.querySelector('svg');
    if (svgElement) {
      downloadSvg(svgElement as SVGSVGElement, `icon-${iconName}-${library}`);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
          '& .download-btn': {
            opacity: 1,
          },
        },
      }}
    >
      <Box ref={svgRef} sx={{ mb: 1 }}>
        <Icon name={iconName} size="large" />
      </Box>
      <Typography 
        variant="caption" 
        display="block" 
        sx={{ 
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: 'text.secondary',
          mb: 1,
        }}
      >
        {iconName}
      </Typography>
      <Button
        size="small"
        variant="outlined"
        onClick={handleDownload}
        className="download-btn"
        sx={{ 
          opacity: 0,
          transition: 'opacity 0.2s',
          fontSize: '0.65rem',
          py: 0.25,
          px: 1,
        }}
      >
        Download SVG
      </Button>
    </Paper>
  );
};

// Illustration Download Card
const IllustrationDownloadCard = ({ 
  id, 
  name, 
  Component 
}: { 
  id: string; 
  name: string; 
  Component: React.FC<{ size?: number }>;
}) => {
  const svgRef = useRef<HTMLDivElement>(null);
  
  const handleDownload = () => {
    const svgElement = svgRef.current?.querySelector('svg');
    if (svgElement) {
      downloadSvg(svgElement as SVGSVGElement, `illustration-${id}`);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        textAlign: 'center',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box ref={svgRef} sx={{ mb: 2 }}>
        <Component size={120} />
      </Box>
      <Typography variant="subtitle2" gutterBottom>
        {name}
      </Typography>
      <Typography 
        variant="caption" 
        color="text.secondary"
        display="block"
        sx={{ mb: 2, fontFamily: 'monospace' }}
      >
        {id}
      </Typography>
      <Button
        size="small"
        variant="contained"
        onClick={handleDownload}
        startIcon={<Icon name="download" size="small" />}
      >
        Download SVG
      </Button>
    </Paper>
  );
};

// Main Demo Component
interface IconsIllustrationsProps {
  tab?: 'icons' | 'illustrations' | 'all';
}

const IconsIllustrationsDemo = ({ tab = 'all' }: IconsIllustrationsProps) => {
  const [activeTab, setActiveTab] = useState(tab === 'all' ? 0 : tab === 'icons' ? 1 : 2);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { library, setLibrary } = useIconLibrary();
  
  const allIcons = getAvailableIcons();
  
  // Icon categories
  const iconCategories: Record<string, string[]> = {
    'Navigation': ['home', 'menu', 'close', 'back', 'forward', 'up', 'down', 'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'more-vertical', 'more-horizontal'],
    'Actions': ['add', 'remove', 'edit', 'delete', 'save', 'copy', 'paste', 'cut', 'undo', 'redo', 'refresh', 'download', 'upload', 'share', 'print', 'filter', 'sort', 'search', 'zoom-in', 'zoom-out'],
    'Status': ['check', 'check-circle', 'error', 'warning', 'info', 'help', 'success'],
    'Communication': ['email', 'phone', 'chat', 'send', 'notification', 'notification-off'],
    'Content': ['file', 'folder', 'folder-open', 'image', 'video', 'audio', 'document', 'link', 'attachment'],
    'User': ['user', 'users', 'user-add', 'user-remove', 'settings', 'logout', 'login', 'lock', 'unlock', 'key'],
    'Data': ['chart', 'pie-chart', 'line-chart', 'trending-up', 'trending-down', 'database', 'table'],
    'UI': ['star', 'star-outline', 'heart', 'heart-outline', 'bookmark', 'flag', 'tag', 'calendar', 'clock', 'location', 'globe'],
    'View': ['eye', 'eye-off', 'grid', 'list', 'columns', 'maximize', 'minimize', 'sidebar'],
    'Media': ['play', 'pause', 'stop', 'skip-forward', 'skip-back', 'volume', 'volume-off'],
    'Misc': ['code', 'terminal', 'external-link', 'cloud', 'cloud-upload', 'cloud-download', 'wifi', 'wifi-off', 'battery', 'power', 'sun', 'moon', 'zap', 'gift', 'package', 'box', 'layers', 'shield', 'award', 'activity'],
  };

  // Illustration categories
  const illustrationCategories = [...new Set(illustrations.map(i => i.category))];

  // Filtered icons
  const filteredIcons = allIcons.filter((icon: string) => {
    const matchesSearch = icon.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      (iconCategories[selectedCategory] && iconCategories[selectedCategory].includes(icon));
    return matchesSearch && matchesCategory;
  });

  // Filtered illustrations
  const filteredIllustrations = illustrations.filter(ill => {
    const matchesSearch = ill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ill.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Download all icons
  const downloadAllIcons = async () => {
    for (const iconName of filteredIcons) {
      // Create a temporary container
      const container = document.createElement('div');
      container.id = `temp-icon-${iconName}`;
      document.body.appendChild(container);
      
      // Wait a bit for rendering
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const existingIcon = document.querySelector(`[data-icon-name="${iconName}"] svg`);
      if (existingIcon) {
        downloadSvg(existingIcon as SVGSVGElement, `icon-${iconName}-${library}`);
      }
      
      document.body.removeChild(container);
      
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Icons & Illustrations</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Download SVG assets for use in your projects. Click on any item to download.
      </Typography>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3 }}>
        <Tab label="All Assets" />
        <Tab label={`Icons (${allIcons.length})`} />
        <Tab label={`Illustrations (${illustrations.length})`} />
      </Tabs>

      {/* Search and Filters */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Search..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon name="search" size="small" />
              </InputAdornment>
            ),
          }}
        />
        
        {(activeTab === 0 || activeTab === 1) && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">Library:</Typography>
            <Chip 
              label="Material" 
              onClick={() => setLibrary('material')}
              color={library === 'material' ? 'primary' : 'default'}
              variant={library === 'material' ? 'filled' : 'outlined'}
              size="small"
            />
            <Chip 
              label="Feather" 
              onClick={() => setLibrary('feather')}
              color={library === 'feather' ? 'primary' : 'default'}
              variant={library === 'feather' ? 'filled' : 'outlined'}
              size="small"
            />
          </Stack>
        )}
      </Stack>

      {/* Category Filters */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label="All"
            onClick={() => setSelectedCategory('all')}
            color={selectedCategory === 'all' ? 'primary' : 'default'}
            variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
            size="small"
          />
          {(activeTab === 0 || activeTab === 1) && Object.keys(iconCategories).map(cat => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? 'primary' : 'default'}
              variant={selectedCategory === cat ? 'filled' : 'outlined'}
              size="small"
            />
          ))}
          {(activeTab === 0 || activeTab === 2) && illustrationCategories.map(cat => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? 'primary' : 'default'}
              variant={selectedCategory === cat ? 'filled' : 'outlined'}
              size="small"
            />
          ))}
        </Stack>
      </Box>

      {/* Icons Section */}
      {(activeTab === 0 || activeTab === 1) && (
        <Box sx={{ mb: 6 }}>
          {activeTab === 0 && (
            <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon name="layers" size="medium" /> Icons
              <Chip label={`${filteredIcons.length} icons`} size="small" sx={{ ml: 1 }} />
            </Typography>
          )}
          
          <Grid container spacing={2}>
            {filteredIcons.map((iconName: string) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={iconName}>
                <Box data-icon-name={iconName}>
                  <IconDownloadCard iconName={iconName} />
                </Box>
              </Grid>
            ))}
          </Grid>

          {filteredIcons.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Icon name="search" size="xl" color="disabled" />
              <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                No icons found
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Illustrations Section */}
      {(activeTab === 0 || activeTab === 2) && (
        <Box>
          {activeTab === 0 && (
            <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon name="image" size="medium" /> Illustrations
              <Chip label={`${filteredIllustrations.length} illustrations`} size="small" sx={{ ml: 1 }} />
            </Typography>
          )}

          <Grid container spacing={3}>
            {filteredIllustrations.map(({ id, name, Component, category }) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={id}>
                <IllustrationDownloadCard 
                  id={id} 
                  name={name} 
                  Component={Component} 
                />
              </Grid>
            ))}
          </Grid>

          {filteredIllustrations.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Icon name="search" size="xl" color="disabled" />
              <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                No illustrations found
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

// Wrapper with IconProvider
const IconsIllustrationsWrapper = (props: IconsIllustrationsProps) => (
  <IconProvider defaultLibrary="material">
    <IconsIllustrationsDemo {...props} />
  </IconProvider>
);

const meta: Meta<typeof IconsIllustrationsWrapper> = {
  title: 'Foundation/Icons & Illustrations',
  component: IconsIllustrationsWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Download SVG icons and illustrations for use in your projects.',
      },
    },
  },
  argTypes: {
    tab: {
      control: 'select',
      options: ['all', 'icons', 'illustrations'],
      description: 'Initial tab to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Browse and download all icons and illustrations.
 */
export const All: Story = {
  args: {
    tab: 'all',
  },
};

/**
 * Browse and download icons only.
 */
export const Icons: Story = {
  args: {
    tab: 'icons',
  },
};

/**
 * Browse and download illustrations only.
 */
export const Illustrations: Story = {
  args: {
    tab: 'illustrations',
  },
};
