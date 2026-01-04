import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid, Stack, TextField, InputAdornment, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState, useMemo } from 'react';
import { 
  Icon, 
  IconProvider, 
  useIconLibrary,
  iconSizeMap, 
  getAvailableIcons,
  IconSize,
} from '../components/Icon';
import { brandColors } from '../tokens';
import { semanticTokens } from '../tokens';

/**
 * # Icon System
 * 
 * The Trinity Icon System provides a unified API for using icons from multiple libraries.
 * Currently supports **Material Icons** and **Feather Icons**.
 * 
 * ## Features
 * - **Library Switching**: Change icon libraries globally via context or per-icon
 * - **Consistent Naming**: Use the same icon name across libraries
 * - **Size System**: xs, small, medium, large, xl sizes
 * - **Theme Integration**: Works with Trinity color tokens
 * 
 * ## Usage
 * 
 * ```tsx
 * import { Icon, IconProvider } from './components/Icon';
 * 
 * // Wrap your app with IconProvider
 * <IconProvider defaultLibrary="material">
 *   <Icon name="home" size="medium" />
 *   <Icon name="settings" color="primary" />
 *   <Icon name="user" library="feather" /> // Override library
 * </IconProvider>
 * ```
 */

// Demo wrapper with IconProvider
const _IconDemo = ({ children }: { children: React.ReactNode }) => (
  <IconProvider defaultLibrary="material">
    {children}
  </IconProvider>
);

// Icon Gallery Component
const IconGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { library, setLibrary } = useIconLibrary();

  // Categorize icons
  const categories: Record<string, string[]> = {
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

  const allIcons = getAvailableIcons();
  
  const filteredIcons = useMemo(() => {
    let icons: string[] = selectedCategory === 'all' 
      ? allIcons 
      : categories[selectedCategory] || [];
    
    if (searchTerm) {
      icons = icons.filter((icon: string) => 
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return icons;
  }, [selectedCategory, searchTerm, allIcons]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Icon Gallery</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Browse all available icons. Click on an icon to copy its name.
      </Typography>

      {/* Controls */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <TextField
          placeholder="Search icons..."
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
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">Library:</Typography>
          <ToggleButtonGroup
            value={library}
            exclusive
            onChange={(_, newLib) => newLib && setLibrary(newLib)}
            size="small"
          >
            <ToggleButton value="material">Material</ToggleButton>
            <ToggleButton value="feather">Feather</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>

      {/* Category Chips */}
      <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
        <Chip
          label={`All (${allIcons.length})`}
          onClick={() => setSelectedCategory('all')}
          color={selectedCategory === 'all' ? 'primary' : 'default'}
          variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
        />
        {Object.entries(categories).map(([category, icons]) => (
          <Chip
            key={category}
            label={`${category} (${icons.length})`}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
            variant={selectedCategory === category ? 'filled' : 'outlined'}
          />
        ))}
      </Stack>

      {/* Icon Grid */}
      <Grid container spacing={2}>
        {filteredIcons.map((iconName: string) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={iconName}>
            <Paper
              sx={{
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                  bgcolor: 'action.hover',
                },
              }}
              onClick={() => {
                navigator.clipboard.writeText(iconName);
              }}
            >
              <Icon name={iconName} size="large" />
              <Typography 
                variant="caption" 
                display="block" 
                sx={{ 
                  mt: 1, 
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  color: 'text.secondary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {iconName}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {filteredIcons.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Icon name="search" size="xl" color="disabled" />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            No icons found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or category filter
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// Size Comparison
const SizeComparison = () => {
  const { library, setLibrary } = useIconLibrary();
  const sizes: IconSize[] = ['xs', 'small', 'medium', 'large', 'xl'];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Icon Sizes</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Available size options from xs (16px) to xl (48px).
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">Library:</Typography>
        <ToggleButtonGroup
          value={library}
          exclusive
          onChange={(_, newLib) => newLib && setLibrary(newLib)}
          size="small"
        >
          <ToggleButton value="material">Material</ToggleButton>
          <ToggleButton value="feather">Feather</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={4} alignItems="flex-end" justifyContent="center">
          {sizes.map((size) => (
            <Box key={size} sx={{ textAlign: 'center' }}>
              <Icon name="star" size={size} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {size}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {iconSizeMap[size]}px
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

// Library Comparison
const LibraryComparison = () => {
  const sampleIcons = ['home', 'user', 'settings', 'search', 'heart', 'star', 'check', 'close', 'edit', 'delete'];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Library Comparison</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Side-by-side comparison of Material Icons and Feather Icons.
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 4 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
              Icon Name
            </Typography>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2, textAlign: 'center' }}>
              Material
            </Typography>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2, textAlign: 'center' }}>
              Feather
            </Typography>
          </Grid>

          {sampleIcons.map((iconName) => (
            <>
              <Grid size={{ xs: 4 }} key={`name-${iconName}`}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {iconName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 4 }} key={`material-${iconName}`} sx={{ textAlign: 'center' }}>
                <Icon name={iconName} size="medium" library="material" />
              </Grid>
              <Grid size={{ xs: 4 }} key={`feather-${iconName}`} sx={{ textAlign: 'center' }}>
                <Icon name={iconName} size="medium" library="feather" />
              </Grid>
            </>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

// Color Options
const ColorOptions = () => {
  const { library, setLibrary } = useIconLibrary();
  const colors: Array<{ name: string; value: string }> = [
    { name: 'inherit', value: 'inherit' },
    { name: 'primary', value: 'primary' },
    { name: 'secondary', value: 'secondary' },
    { name: 'error', value: 'error' },
    { name: 'disabled', value: 'disabled' },
    { name: 'Custom (Navy)', value: brandColors.primary.main },
    { name: 'Custom (Coral)', value: brandColors.secondary.main },
    { name: 'Custom (Purple)', value: brandColors.primary.light },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Icon Colors</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Icons support theme colors and custom hex values.
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">Library:</Typography>
        <ToggleButtonGroup
          value={library}
          exclusive
          onChange={(_, newLib) => newLib && setLibrary(newLib)}
          size="small"
        >
          <ToggleButton value="material">Material</ToggleButton>
          <ToggleButton value="feather">Feather</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {colors.map(({ name, value }) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={name}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Icon name="heart" size="large" color={value} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {name}
              </Typography>
              {value.startsWith('#') && (
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                  {value}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Usage Examples
const UsageExamples = () => {
  const { library, setLibrary } = useIconLibrary();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Usage Examples</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Common patterns for using icons in your UI.
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">Library:</Typography>
        <ToggleButtonGroup
          value={library}
          exclusive
          onChange={(_, newLib) => newLib && setLibrary(newLib)}
          size="small"
        >
          <ToggleButton value="material">Material</ToggleButton>
          <ToggleButton value="feather">Feather</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={4}>
        {/* Buttons with Icons */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Buttons with Icons</Typography>
            <Stack spacing={2}>
              <Box 
                sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 1,
                  px: 2.5,
                  py: 1,
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: 100,
                  cursor: 'pointer',
                }}
              >
                <Icon name="add" size="small" />
                <Typography variant="button">Add Item</Typography>
              </Box>
              <Box 
                sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 1,
                  px: 2.5,
                  py: 1,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  borderRadius: 100,
                  cursor: 'pointer',
                }}
              >
                <Icon name="download" size="small" />
                <Typography variant="button">Download</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Navigation Items */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Navigation Items</Typography>
            <Stack spacing={1}>
              {[
                { icon: 'home', label: 'Dashboard' },
                { icon: 'chart', label: 'Analytics' },
                { icon: 'users', label: 'Team' },
                { icon: 'settings', label: 'Settings' },
              ].map((item, index) => (
                <Box 
                  key={item.icon}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: index === 0 ? 'action.selected' : 'transparent',
                    '&:hover': { bgcolor: 'action.hover' },
                    cursor: 'pointer',
                  }}
                >
                  <Icon name={item.icon} size="small" color={index === 0 ? 'primary' : 'inherit'} />
                  <Typography variant="body2">{item.label}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Status Indicators */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Status Indicators</Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon name="check-circle" color={semanticTokens.colors.status.success.text} size="small" />
                <Typography variant="body2">Operation successful</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon name="error" color={semanticTokens.colors.status.error.text} size="small" />
                <Typography variant="body2">Error occurred</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon name="warning" color={semanticTokens.colors.status.warning.text} size="small" />
                <Typography variant="body2">Warning message</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon name="info" color={semanticTokens.colors.status.info.text} size="small" />
                <Typography variant="body2">Information notice</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Input with Icons */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Input Fields</Typography>
            <Stack spacing={2}>
              <TextField
                placeholder="Search..."
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon name="search" size="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                placeholder="Email address"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon name="email" size="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                placeholder="Password"
                size="small"
                type="password"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon name="lock" size="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon name="eye" size="small" sx={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Main story wrapper
const IconStoryWrapper = ({ variant }: { variant: 'gallery' | 'sizes' | 'comparison' | 'colors' | 'examples' }) => {
  return (
    <IconProvider defaultLibrary="material">
      {variant === 'gallery' && <IconGallery />}
      {variant === 'sizes' && <SizeComparison />}
      {variant === 'comparison' && <LibraryComparison />}
      {variant === 'colors' && <ColorOptions />}
      {variant === 'examples' && <UsageExamples />}
    </IconProvider>
  );
};

const meta: Meta<typeof IconStoryWrapper> = {
  title: 'Foundation/Icons',
  component: IconStoryWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Unified icon system supporting Material Icons and Feather Icons with library switching.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Browse all available icons with search and category filtering.
 * Switch between Material and Feather libraries to compare.
 */
export const Gallery: Story = {
  args: {
    variant: 'gallery',
  },
};

/**
 * Available icon sizes from xs (16px) to xl (48px).
 */
export const Sizes: Story = {
  args: {
    variant: 'sizes',
  },
};

/**
 * Side-by-side comparison of Material Icons and Feather Icons.
 */
export const LibraryComparison_: Story = {
  name: 'Library Comparison',
  args: {
    variant: 'comparison',
  },
};

/**
 * Color options including theme colors and custom hex values.
 */
export const Colors: Story = {
  args: {
    variant: 'colors',
  },
};

/**
 * Common UI patterns using icons.
 */
export const Examples: Story = {
  args: {
    variant: 'examples',
  },
};
