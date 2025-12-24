import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper, Stack, Avatar as MuiAvatar, Chip } from '@mui/material';
import { componentTokens } from '../../tokens';

/**
 * # Component Tokens
 * 
 * Component tokens provide precise values for specific UI components.
 * These tokens ensure consistency within components while allowing
 * flexibility in sizing and states.
 * 
 * ## Categories
 * - **Button**: Sizing, padding, colors by variant
 * - **Input**: Form field dimensions and states
 * - **Card**: Container styling
 * - **Avatar**: Size scale
 * - **And more...**
 */

const TokenTable = ({ 
  title, 
  tokens, 
  basePath 
}: { 
  title: string; 
  tokens: Record<string, unknown>; 
  basePath: string;
}) => (
  <Paper sx={{ p: 3, mb: 4 }}>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    <Box sx={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Token</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Value</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Path</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tokens).map(([key, value]) => (
            <tr key={key} style={{ borderBottom: '1px solid #F3F4F6' }}>
              <td style={{ padding: '8px 12px' }}>
                <Typography variant="body2" fontWeight={500}>{key}</Typography>
              </td>
              <td style={{ padding: '8px 12px' }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace',
                    color: 'text.secondary',
                  }}
                >
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </Typography>
              </td>
              <td style={{ padding: '8px 12px' }}>
                <Typography 
                  variant="caption" 
                  sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
                >
                  {basePath}.{key}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  </Paper>
);

const ButtonTokensDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Button Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Tokens for button sizing, padding, and color variants.
    </Typography>

    {/* Size Preview */}
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Size Preview</Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        {Object.entries(componentTokens.button.height).map(([size, height]) => (
          <Box
            key={size}
            sx={{
              height,
              px: componentTokens.button.padding[size as keyof typeof componentTokens.button.padding].x / 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: `${componentTokens.button.borderRadius}px`,
              fontSize: componentTokens.button.fontSize[size as keyof typeof componentTokens.button.fontSize],
            }}
          >
            {size.charAt(0).toUpperCase() + size.slice(1)}
          </Box>
        ))}
      </Stack>
    </Paper>

    <TokenTable title="Heights" tokens={componentTokens.button.height} basePath="componentTokens.button.height" />
    <TokenTable title="Padding" tokens={componentTokens.button.padding} basePath="componentTokens.button.padding" />
    <TokenTable title="Font Sizes" tokens={componentTokens.button.fontSize} basePath="componentTokens.button.fontSize" />
    
    {/* Color Variants */}
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Color Variants</Typography>
      <Grid container spacing={3}>
        {['primary', 'secondary', 'outlined'].map((variant) => (
          <Grid size={{ xs: 12, md: 4 }} key={variant}>
            <Typography variant="subtitle2" gutterBottom sx={{ textTransform: 'capitalize' }}>
              {variant}
            </Typography>
            <Stack spacing={1}>
              {Object.entries(componentTokens.button[variant as keyof typeof componentTokens.button] as Record<string, string>).map(([key, value]) => (
                <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: value === 'transparent' ? 'grey.100' : value,
                      borderRadius: 0.5,
                      border: value === 'transparent' ? '1px dashed' : 'none',
                      borderColor: 'grey.400',
                    }}
                  />
                  <Typography variant="caption">{key}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Paper>
  </Box>
);

const InputTokensDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Input Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Tokens for form inputs including text fields, selects, and textareas.
    </Typography>

    {/* Size Preview */}
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Size Preview</Typography>
      <Stack spacing={2}>
        {Object.entries(componentTokens.input.height).map(([size, height]) => (
          <Box
            key={size}
            sx={{
              height,
              px: componentTokens.input.padding[size as keyof typeof componentTokens.input.padding].x / 8,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: `${componentTokens.input.borderRadius}px`,
              fontSize: componentTokens.input.fontSize[size as keyof typeof componentTokens.input.fontSize],
              maxWidth: 300,
            }}
          >
            <Typography color="text.secondary">{size} input</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>

    <TokenTable title="Heights" tokens={componentTokens.input.height} basePath="componentTokens.input.height" />
    <TokenTable title="Padding" tokens={componentTokens.input.padding} basePath="componentTokens.input.padding" />
    <TokenTable title="Border Colors" tokens={componentTokens.input.borderColor} basePath="componentTokens.input.borderColor" />
  </Box>
);

const AvatarTokensDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Avatar Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Size scale for avatar components.
    </Typography>

    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Size Preview</Typography>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        {Object.entries(componentTokens.avatar.size).map(([size, pixels]) => (
          <Box key={size} sx={{ textAlign: 'center' }}>
            <MuiAvatar
              sx={{
                width: pixels,
                height: pixels,
                bgcolor: 'primary.main',
                fontSize: componentTokens.avatar.fontSize[size as keyof typeof componentTokens.avatar.fontSize],
                mb: 1,
              }}
            >
              AB
            </MuiAvatar>
            <Typography variant="caption" display="block">{size}</Typography>
            <Typography variant="caption" color="text.secondary">{pixels}px</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>

    <TokenTable title="Sizes" tokens={componentTokens.avatar.size} basePath="componentTokens.avatar.size" />
    <TokenTable title="Font Sizes" tokens={componentTokens.avatar.fontSize} basePath="componentTokens.avatar.fontSize" />
  </Box>
);

const ChipTokensDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Chip Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Tokens for chip/tag components.
    </Typography>

    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Size Preview</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Chip label="Small" size="small" />
        <Chip label="Medium" size="medium" />
      </Stack>
    </Paper>

    <TokenTable title="Heights" tokens={componentTokens.chip.height} basePath="componentTokens.chip.height" />
    <TokenTable title="Padding" tokens={componentTokens.chip.padding} basePath="componentTokens.chip.padding" />
    <TokenTable title="Font Sizes" tokens={componentTokens.chip.fontSize} basePath="componentTokens.chip.fontSize" />
  </Box>
);

const NavigationTokensDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Navigation Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Tokens for header and sidebar navigation components.
    </Typography>

    {/* Visual Preview */}
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Layout Preview</Typography>
      <Box sx={{ display: 'flex', border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden', height: 200 }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: componentTokens.navigation.sidebar.width,
            bgcolor: componentTokens.navigation.header.background,
            color: componentTokens.navigation.header.text,
            p: 2,
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.7 }}>Sidebar</Typography>
          <Typography variant="body2">{componentTokens.navigation.sidebar.width}px</Typography>
        </Box>
        {/* Main content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box
            sx={{
              height: componentTokens.navigation.header.height,
              bgcolor: componentTokens.navigation.header.background,
              color: componentTokens.navigation.header.text,
              display: 'flex',
              alignItems: 'center',
              px: 2,
            }}
          >
            <Typography variant="body2">Header ({componentTokens.navigation.header.height}px)</Typography>
          </Box>
          {/* Content */}
          <Box sx={{ flex: 1, bgcolor: 'grey.100', p: 2 }}>
            <Typography variant="caption" color="text.secondary">Content Area</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>

    <TokenTable title="Header" tokens={componentTokens.navigation.header} basePath="componentTokens.navigation.header" />
    <TokenTable title="Sidebar" tokens={componentTokens.navigation.sidebar} basePath="componentTokens.navigation.sidebar" />
    <TokenTable title="Nav Item" tokens={componentTokens.navigation.item} basePath="componentTokens.navigation.item" />
  </Box>
);

const AllComponentTokensDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>All Component Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Quick reference for all available component tokens.
    </Typography>

    <Grid container spacing={3}>
      {Object.keys(componentTokens).map((component) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={component}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ textTransform: 'capitalize' }}>
              {component}
            </Typography>
            <Stack spacing={0.5}>
              {Object.keys(componentTokens[component as keyof typeof componentTokens]).map((prop) => (
                <Typography 
                  key={prop} 
                  variant="caption" 
                  sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
                >
                  • {prop}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const meta: Meta = {
  title: 'Tokens/Components',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const ButtonTokens: Story = {
  render: () => <ButtonTokensDemo />,
};

export const InputTokens: Story = {
  render: () => <InputTokensDemo />,
};

export const AvatarTokens: Story = {
  render: () => <AvatarTokensDemo />,
};

export const ChipTokens: Story = {
  render: () => <ChipTokensDemo />,
};

export const NavigationTokens: Story = {
  render: () => <NavigationTokensDemo />,
};

export const AllTokens: Story = {
  render: () => <AllComponentTokensDemo />,
};
