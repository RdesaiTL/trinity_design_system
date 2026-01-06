import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid, Stack, Button, TextField, InputAdornment, Chip, Alert, Divider } from '@mui/material';
import { useState, useRef } from 'react';
import { Icon, IconProvider } from '../../components/Icon';
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
  IllustratedMessage,
} from '../../components/IllustratedMessage';
import { semanticTokens } from '../../tokens';
import JSZip from 'jszip';

/**
 * # Illustrations
 * 
 * Trinity Design System includes a comprehensive set of SVG illustrations for
 * empty states, error pages, and feedback scenarios. These illustrations are
 * designed to provide visual context and improve user experience during edge cases.
 * 
 * ## Categories
 * 
 * - **Empty States**: For when there's no data to display (tables, lists, search results)
 * - **Error States**: For error pages (404, 500, permission denied)
 * - **Actions**: For upload, onboarding, and interactive states
 * - **Feedback**: For success confirmations and notifications
 * 
 * ## Integration
 * 
 * Illustrations are integrated into the design system through the `IllustratedMessage` component,
 * which combines an illustration with a title, description, and optional action button.
 * 
 * ```tsx
 * import { IllustratedMessage } from '@trinity/design-system';
 * 
 * // Using the IllustratedMessage component (recommended)
 * <IllustratedMessage
 *   illustration="empty-table"
 *   title="No data available"
 *   description="Add some items to get started"
 *   action={{ label: "Add Item", onClick: handleAdd }}
 * />
 * 
 * // Using individual illustrations directly
 * import { EmptyTableIllustration } from '@trinity/design-system';
 * <EmptyTableIllustration size={200} />
 * ```
 * 
 * ## Download Options
 * 
 * - Click "Download SVG" on any illustration to save it individually
 * - Click "Download All" to get a ZIP file with all illustrations
 */

// Illustration metadata with components
const illustrations = [
  { id: 'empty-table', name: 'Empty Table', Component: EmptyTableIllustration, category: 'Empty States', description: 'For data tables with no rows' },
  { id: 'empty-drafts', name: 'Empty Drafts', Component: EmptyDraftsIllustration, category: 'Empty States', description: 'For empty draft or saved items' },
  { id: 'getting-started', name: 'Getting Started', Component: GettingStartedIllustration, category: 'Empty States', description: 'For onboarding and first-time users' },
  { id: 'empty-documents', name: 'Empty Documents', Component: EmptyDocumentsIllustration, category: 'Empty States', description: 'For document libraries with no files' },
  { id: 'empty-insights', name: 'Empty Insights', Component: EmptyInsightsIllustration, category: 'Empty States', description: 'For analytics with no data' },
  { id: 'no-results', name: 'No Results', Component: NoResultsIllustration, category: 'Empty States', description: 'For search with no matches' },
  { id: 'no-data', name: 'No Data', Component: NoDataIllustration, category: 'Empty States', description: 'Generic empty state' },
  { id: 'no-notifications', name: 'No Notifications', Component: NoNotificationsIllustration, category: 'Empty States', description: 'For empty notification center' },
  { id: 'error-generic', name: 'Error Generic', Component: ErrorGenericIllustration, category: 'Error States', description: 'For generic error pages' },
  { id: 'error-404', name: 'Error 404', Component: Error404Illustration, category: 'Error States', description: 'For page not found errors' },
  { id: 'error-500', name: 'Error 500', Component: Error500Illustration, category: 'Error States', description: 'For server errors' },
  { id: 'error-permission', name: 'Permission Denied', Component: ErrorPermissionIllustration, category: 'Error States', description: 'For access denied scenarios' },
  { id: 'offline', name: 'Offline', Component: OfflineIllustration, category: 'Error States', description: 'For network connectivity issues' },
  { id: 'upload', name: 'Upload', Component: UploadIllustration, category: 'Actions', description: 'For file upload dropzones' },
  { id: 'success', name: 'Success', Component: SuccessIllustration, category: 'Feedback', description: 'For success confirmations' },
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

// Get SVG string from element
const getSvgString = (svgElement: SVGSVGElement | null): string => {
  if (!svgElement) return '';
  
  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svgElement);
  
  if (!svgString.includes('xmlns')) {
    svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  return svgString;
};

// Illustration Download Card
const IllustrationCard = ({ 
  id, 
  name,
  description, 
  Component 
}: { 
  id: string; 
  name: string;
  description: string; 
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box ref={svgRef} sx={{ mb: 2, flexShrink: 0 }}>
        <Component size={120} />
      </Box>
      <Typography variant="subtitle2" gutterBottom>
        {name}
      </Typography>
      <Typography 
        variant="caption" 
        color="text.secondary"
        display="block"
        sx={{ mb: 1, fontFamily: 'monospace' }}
      >
        {id}
      </Typography>
      <Typography 
        variant="caption" 
        color="text.secondary"
        display="block"
        sx={{ mb: 2, flex: 1 }}
      >
        {description}
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

// Main Illustrations Demo Component
const IllustrationsDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const illustrationRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const categories = [...new Set(illustrations.map(i => i.category))];

  const filteredIllustrations = illustrations.filter(ill => {
    const matchesSearch = ill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Download all illustrations as ZIP
  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    
    try {
      const zip = new JSZip();
      const folder = zip.folder('trinity-illustrations');
      
      if (!folder) {
        throw new Error('Failed to create ZIP folder');
      }

      // Get all SVG elements from refs
      for (const [id, ref] of illustrationRefs.current.entries()) {
        const svgElement = ref?.querySelector('svg');
        if (svgElement) {
          const svgString = getSvgString(svgElement as SVGSVGElement);
          folder.file(`illustration-${id}.svg`, svgString);
        }
      }

      // Generate and download ZIP
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'trinity-illustrations.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download all illustrations:', error);
      // Fallback: download one by one
      for (const ill of filteredIllustrations) {
        const ref = illustrationRefs.current.get(ill.id);
        const svgElement = ref?.querySelector('svg');
        if (svgElement) {
          downloadSvg(svgElement as SVGSVGElement, `illustration-${ill.id}`);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <IconProvider defaultLibrary="material">
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Illustrations</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Download SVG illustrations for empty states, errors, and feedback scenarios.
        </Typography>

        {/* Integration Info */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            <strong>Design System Integration:</strong> Use the <code>IllustratedMessage</code> component 
            for consistent empty states and error pages. Individual illustrations can also be imported directly.
          </Typography>
        </Alert>

        {/* Controls */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems="flex-start">
          <TextField
            placeholder="Search illustrations..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 250 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="search" size="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          
          <Button
            variant="outlined"
            onClick={handleDownloadAll}
            disabled={isDownloadingAll}
            startIcon={<Icon name="download" size="small" />}
          >
            {isDownloadingAll ? 'Downloading...' : `Download All (${filteredIllustrations.length})`}
          </Button>
        </Stack>

        {/* Category Filters */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Categories
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              label="All"
              onClick={() => setSelectedCategory('all')}
              color={selectedCategory === 'all' ? 'primary' : 'default'}
              variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
              size="small"
            />
            {categories.map(cat => (
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

        <Divider sx={{ mb: 4 }} />

        {/* Illustrations Grid */}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {filteredIllustrations.length} illustrations found
        </Typography>

        <Grid container spacing={3}>
          {filteredIllustrations.map(({ id, name, description, Component }) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={id}>
              <Box ref={(el: HTMLDivElement | null) => { if (el) illustrationRefs.current.set(id, el); }}>
                <IllustrationCard 
                  id={id} 
                  name={name}
                  description={description} 
                  Component={Component} 
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {filteredIllustrations.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Icon name="search" size="xl" color="disabled" />
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              No illustrations found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try a different search term or category
            </Typography>
          </Box>
        )}

        {/* Usage Documentation */}
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="h5" gutterBottom>Implementation Guide</Typography>
          
          <Stack spacing={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>1. Using IllustratedMessage (Recommended)</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                The IllustratedMessage component provides a complete empty state pattern with title, description, and action:
              </Typography>
              <Box 
                component="pre" 
                sx={{ 
                  p: 2, 
                  backgroundColor: semanticTokens.colors.background.tertiary,
                  borderRadius: 1,
                  overflow: 'auto',
                  fontSize: '0.85rem',
                }}
              >
{`import { IllustratedMessage } from '@trinity/design-system';

// Empty table state
<IllustratedMessage
  illustration="empty-table"
  title="No data to display"
  description="Add some items to see them here"
  action={{
    label: "Add Item",
    onClick: () => handleAddItem(),
  }}
/>

// Error page
<IllustratedMessage
  illustration="error-404"
  title="Page not found"
  description="The page you're looking for doesn't exist"
  action={{
    label: "Go Home",
    href: "/",
  }}
/>`}
              </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>2. Using Individual Illustrations</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Import and use illustrations directly for custom layouts:
              </Typography>
              <Box 
                component="pre" 
                sx={{ 
                  p: 2, 
                  backgroundColor: semanticTokens.colors.background.tertiary,
                  borderRadius: 1,
                  overflow: 'auto',
                  fontSize: '0.85rem',
                }}
              >
{`import { 
  EmptyTableIllustration,
  Error404Illustration,
  SuccessIllustration,
} from '@trinity/design-system';

// With default size (160px)
<EmptyTableIllustration />

// With custom size
<Error404Illustration size={200} />

// In a custom layout
<Box sx={{ textAlign: 'center', py: 4 }}>
  <SuccessIllustration size={120} />
  <Typography variant="h5">All done!</Typography>
</Box>`}
              </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>3. Available Illustration Types</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                All illustration IDs for use with IllustratedMessage:
              </Typography>
              <Grid container spacing={1}>
                {illustrations.map(ill => (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={ill.id}>
                    <Chip 
                      label={ill.id} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </IconProvider>
  );
};

const meta: Meta<typeof IllustrationsDemo> = {
  title: 'Assets/Illustrations',
  component: IllustrationsDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Trinity Design System includes 15 custom SVG illustrations for empty states, error pages, and feedback scenarios.

**Features:**
- Individual SVG downloads
- Bulk download as ZIP file
- Integration via IllustratedMessage component
- Customizable sizes
- Responsive and accessible

**Categories:**
- Empty States: For tables, lists, and search with no data
- Error States: For 404, 500, and permission errors
- Actions: For uploads and onboarding
- Feedback: For success confirmations
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Browse and download all available illustrations.
 */
export const Gallery: Story = {};

/**
 * Example of IllustratedMessage component in action.
 */
export const IllustratedMessageExample: Story = {
  render: () => (
    <IconProvider defaultLibrary="material">
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>IllustratedMessage Examples</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          The recommended way to use illustrations in your application.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <IllustratedMessage
                illustration="empty-table"
                title="No data available"
                description="Add some items to see them displayed here"
                action={{
                  label: "Add Item",
                  onClick: () => alert('Add item clicked'),
                }}
              />
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <IllustratedMessage
                illustration="no-results"
                title="No results found"
                description="Try adjusting your search or filters"
              />
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <IllustratedMessage
                illustration="error-404"
                title="Page not found"
                description="The page you're looking for doesn't exist"
                action={{
                  label: "Go Home",
                  onClick: () => alert('Go home clicked'),
                }}
              />
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <IllustratedMessage
                illustration="success"
                title="Success!"
                description="Your changes have been saved successfully"
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </IconProvider>
  ),
};

/**
 * All illustrations displayed by category.
 */
export const ByCategory: Story = {
  render: () => {
    const categories = [...new Set(illustrations.map(i => i.category))];
    
    return (
      <IconProvider defaultLibrary="material">
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>Illustrations by Category</Typography>
          
          {categories.map(category => (
            <Box key={category} sx={{ mb: 6 }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {category}
              </Typography>
              <Grid container spacing={3}>
                {illustrations
                  .filter(ill => ill.category === category)
                  .map(({ id, name, Component }) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={id}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Component size={100} />
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                          {name}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </IconProvider>
    );
  },
};
