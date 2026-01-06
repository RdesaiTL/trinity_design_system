import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid, Stack, TextField, InputAdornment, Chip, Alert, Divider } from '@mui/material';
import { useState, useMemo } from 'react';
import { 
  Icon, 
  IconProvider, 
  useIconLibrary,
  getAvailableIcons,
} from '../../components/Icon';
import { semanticTokens } from '../../tokens';

/**
 * # Icons
 * 
 * The Trinity Design System provides a unified icon system that supports multiple icon libraries.
 * Icons are integrated through the `Icon` component and can be switched between libraries globally or per-instance.
 * 
 * ## Supported Libraries
 * 
 * ### Material Icons (Default)
 * Material Design icons are included as part of the Trinity theme. They are the default icon library
 * and are automatically available when using the design system.
 * 
 * ```bash
 * # Already included with Trinity Design System
 * npm install @mui/icons-material
 * ```
 * 
 * ### Feather Icons
 * Feather Icons provide a lighter, outline-focused alternative. They're also bundled with the design system.
 * 
 * ```bash
 * # Already included with Trinity Design System  
 * npm install react-feather
 * ```
 * 
 * ## Installation & Setup
 * 
 * The Icon system is part of the Trinity Design System package:
 * 
 * ```tsx
 * import { Icon, IconProvider } from '@trinity/design-system';
 * 
 * // Wrap your app with IconProvider to set default library
 * function App() {
 *   return (
 *     <IconProvider defaultLibrary="material">
 *       <YourApp />
 *     </IconProvider>
 *   );
 * }
 * ```
 * 
 * ## Usage Examples
 * 
 * ### Basic Usage
 * ```tsx
 * import { Icon } from '@trinity/design-system';
 * 
 * // Using default library (set by IconProvider)
 * <Icon name="home" />
 * <Icon name="settings" size="large" />
 * <Icon name="user" color="primary" />
 * ```
 * 
 * ### Switching Libraries
 * ```tsx
 * // Override library for specific icon
 * <Icon name="home" library="feather" />
 * <Icon name="settings" library="material" />
 * 
 * // Or switch globally via context
 * const { setLibrary } = useIconLibrary();
 * setLibrary('feather');
 * ```
 * 
 * ### Size Options
 * ```tsx
 * <Icon name="home" size="xs" />     // 16px
 * <Icon name="home" size="small" />  // 20px
 * <Icon name="home" size="medium" /> // 24px (default)
 * <Icon name="home" size="large" />  // 32px
 * <Icon name="home" size="xl" />     // 40px
 * ```
 * 
 * ### Color Options
 * ```tsx
 * <Icon name="check" color="success" />
 * <Icon name="error" color="error" />
 * <Icon name="warning" color="warning" />
 * <Icon name="info" color="info" />
 * <Icon name="settings" color="primary" />
 * <Icon name="star" color="secondary" />
 * <Icon name="help" color="disabled" />
 * ```
 * 
 * ## Theme Integration
 * 
 * Icons automatically inherit theme colors and respond to dark/light mode.
 * The Icon component uses `semanticTokens` for consistent coloring across the design system.
 */

// Icon categories for organization
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

// Icon Card Component (no download button)
const IconCard = ({ iconName, onCopy }: { iconName: string; onCopy: (name: string) => void }) => {
  return (
    <Paper
      onClick={() => onCopy(iconName)}
      sx={{
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
          backgroundColor: semanticTokens.colors.background.secondary,
        },
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Icon name={iconName} size="large" />
      </Box>
      <Typography 
        variant="caption" 
        display="block" 
        sx={{ 
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: 'text.secondary',
        }}
      >
        {iconName}
      </Typography>
    </Paper>
  );
};

// Main Icons Demo Component
const IconsDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const { library, setLibrary } = useIconLibrary();
  
  const allIcons = getAvailableIcons();

  const filteredIcons = useMemo(() => {
    let icons: string[] = selectedCategory === 'all' 
      ? allIcons 
      : iconCategories[selectedCategory] || [];
    
    if (searchTerm) {
      icons = icons.filter((icon: string) => 
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return icons;
  }, [selectedCategory, searchTerm, allIcons]);

  const handleCopy = (iconName: string) => {
    const code = `<Icon name="${iconName}" />`;
    navigator.clipboard.writeText(code);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Icon Library</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Browse all available icons. Click on any icon to copy its usage code.
      </Typography>

      {/* Integration Info */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body2">
          <strong>Part of Trinity Theme:</strong> Both Material Icons and Feather Icons are included in the Trinity Design System.
          No additional installation required when using the design system package.
        </Typography>
      </Alert>

      {copiedIcon && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Copied: <code>{`<Icon name="${copiedIcon}" />`}</code>
        </Alert>
      )}

      {/* Controls */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <TextField
          placeholder="Search icons..."
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
        
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">Library:</Typography>
          <Chip 
            label="Material Icons" 
            onClick={() => setLibrary('material')}
            color={library === 'material' ? 'primary' : 'default'}
            variant={library === 'material' ? 'filled' : 'outlined'}
            size="small"
          />
          <Chip 
            label="Feather Icons" 
            onClick={() => setLibrary('feather')}
            color={library === 'feather' ? 'primary' : 'default'}
            variant={library === 'feather' ? 'filled' : 'outlined'}
            size="small"
          />
        </Stack>
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
          {Object.keys(iconCategories).map(cat => (
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

      {/* Icon Grid */}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {filteredIcons.length} icons found
      </Typography>

      <Grid container spacing={2}>
        {filteredIcons.map((iconName: string) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={iconName}>
            <IconCard iconName={iconName} onCopy={handleCopy} />
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
            Try a different search term or category
          </Typography>
        </Box>
      )}

      {/* Usage Documentation */}
      <Box sx={{ mt: 6 }}>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h5" gutterBottom>Usage Guide</Typography>
        
        <Stack spacing={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>1. Wrap with IconProvider</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Set the default icon library at the root of your application:
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
{`import { IconProvider } from '@trinity/design-system';

function App() {
  return (
    <IconProvider defaultLibrary="material">
      <YourApp />
    </IconProvider>
  );
}`}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>2. Use Icons</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Import and use the Icon component anywhere in your app:
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
{`import { Icon } from '@trinity/design-system';

// Basic usage
<Icon name="home" />

// With size
<Icon name="settings" size="large" />

// With color
<Icon name="check" color="success" />

// Override library per-icon
<Icon name="user" library="feather" />`}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>3. Available Sizes</Typography>
            <Stack direction="row" spacing={4} alignItems="center" sx={{ mt: 2 }}>
              {(['xs', 'small', 'medium', 'large', 'xl'] as const).map(size => (
                <Stack key={size} alignItems="center" spacing={1}>
                  <Icon name="star" size={size} />
                  <Typography variant="caption" color="text.secondary">
                    {size}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>4. Available Colors</Typography>
            <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
              {(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'disabled'] as const).map(color => (
                <Stack key={color} alignItems="center" spacing={1}>
                  <Icon name="check-circle" size="large" color={color} />
                  <Typography variant="caption" color="text.secondary">
                    {color}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

// Wrapper with IconProvider
const IconsWrapper = () => (
  <IconProvider defaultLibrary="material">
    <IconsDemo />
  </IconProvider>
);

const meta: Meta<typeof IconsWrapper> = {
  title: 'Assets/Icons',
  component: IconsWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Trinity Icon System provides a unified API for using icons from Material Icons and Feather Icons libraries.
Both libraries are included as part of the Trinity Design System theme.

**Key Features:**
- Unified API across icon libraries
- Global library switching via IconProvider
- Per-icon library override
- Consistent sizing (xs, small, medium, large, xl)
- Theme-aware colors
- Click to copy usage code
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Browse and search all available icons. Click on any icon to copy its usage code.
 */
export const Gallery: Story = {};

/**
 * Shows how to use icons with different sizes.
 */
export const Sizes: Story = {
  render: () => (
    <IconProvider defaultLibrary="material">
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Icon Sizes</Typography>
        <Stack direction="row" spacing={4} alignItems="center">
          {(['xs', 'small', 'medium', 'large', 'xl'] as const).map(size => (
            <Stack key={size} alignItems="center" spacing={1}>
              <Icon name="home" size={size} />
              <Typography variant="caption">{size}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </IconProvider>
  ),
};

/**
 * Shows how to use icons with different colors.
 */
export const Colors: Story = {
  render: () => (
    <IconProvider defaultLibrary="material">
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Icon Colors</Typography>
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
          {(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'disabled'] as const).map(color => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Icon name="check-circle" size="large" color={color} />
              <Typography variant="caption">{color}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </IconProvider>
  ),
};

/**
 * Compare Material Icons vs Feather Icons.
 */
export const LibraryComparison: Story = {
  render: () => (
    <IconProvider defaultLibrary="material">
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Library Comparison</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          The same icon names render differently depending on the library:
        </Typography>
        
        <Grid container spacing={3}>
          {['home', 'settings', 'user', 'search', 'star', 'heart', 'check', 'menu'].map(iconName => (
            <Grid size={{ xs: 6, sm: 3 }} key={iconName}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="caption" display="block" sx={{ mb: 2, fontFamily: 'monospace' }}>
                  {iconName}
                </Typography>
                <Stack direction="row" spacing={3} justifyContent="center">
                  <Stack alignItems="center" spacing={0.5}>
                    <Icon name={iconName} library="material" size="large" />
                    <Typography variant="caption" color="text.secondary">Material</Typography>
                  </Stack>
                  <Stack alignItems="center" spacing={0.5}>
                    <Icon name={iconName} library="feather" size="large" />
                    <Typography variant="caption" color="text.secondary">Feather</Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </IconProvider>
  ),
};
