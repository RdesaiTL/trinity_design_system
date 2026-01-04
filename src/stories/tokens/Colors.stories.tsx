import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import { baseTokens, semanticTokens } from '../../tokens';

/**
 * # Color Tokens
 * 
 * Color tokens define the visual identity of the Trinity Design System.
 * They are organized into three categories:
 * 
 * - **Base Colors**: Raw color values organized by hue (navy, purple, coral, etc.)
 * - **Semantic Colors**: Colors with meaning (text, background, border, status)
 * - **Component Colors**: Specific colors for UI components
 * 
 * ## Accessibility
 * All color combinations meet WCAG 2.1 AA standards for contrast ratios.
 */

interface ColorSwatchProps {
  color: string;
  name: string;
  tokenPath: string;
  textColor?: string;
}

const ColorSwatch = ({ color, name, tokenPath, textColor }: ColorSwatchProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const computedTextColor = textColor || (
    color === '#FFFFFF' || color === '#FAFAFA' || color.toLowerCase().includes('f') && color.length < 5
      ? '#000000'
      : '#FFFFFF'
  );

  return (
    <Tooltip title={copied ? 'Copied!' : 'Click to copy token path'}>
      <Paper
        onClick={handleCopy}
        sx={{
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3,
          },
        }}
      >
        <Box
          sx={{
            height: 80,
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: computedTextColor,
            border: color === '#FFFFFF' || color === '#FAFAFA' ? '1px solid #E5E7EB' : 'none',
          }}
        >
          {copied ? <CheckIcon /> : <ContentCopyIcon sx={{ opacity: 0.7 }} />}
        </Box>
        <Box sx={{ p: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={600} noWrap>
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            {color}
          </Typography>
        </Box>
      </Paper>
    </Tooltip>
  );
};

const ColorScaleRow = ({ 
  name, 
  colors, 
  basePath 
}: { 
  name: string; 
  colors: Record<string | number, string>; 
  basePath: string;
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
      {name}
    </Typography>
    <Grid container spacing={2}>
      {Object.entries(colors).map(([shade, color]) => (
        <Grid size={{ xs: 6, sm: 4, md: 2, lg: 1.5 }} key={shade}>
          <ColorSwatch
            color={color}
            name={shade}
            tokenPath={`${basePath}.${shade}`}
            textColor={parseInt(shade) < 400 ? '#000' : '#FFF'}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

const BaseColorsDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Base Color Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Primitive color values organized by hue. Each color has a scale from 50 (lightest) to 900 (darkest).
    </Typography>

    <ColorScaleRow name="Navy" colors={baseTokens.colors.navy} basePath="baseTokens.colors.navy" />
    <ColorScaleRow name="Purple" colors={baseTokens.colors.purple} basePath="baseTokens.colors.purple" />
    <ColorScaleRow name="Indigo" colors={baseTokens.colors.indigo} basePath="baseTokens.colors.indigo" />
    <ColorScaleRow name="Coral" colors={baseTokens.colors.coral} basePath="baseTokens.colors.coral" />
    <ColorScaleRow name="Azure" colors={baseTokens.colors.azure} basePath="baseTokens.colors.azure" />
    <ColorScaleRow name="Gray" colors={baseTokens.colors.gray} basePath="baseTokens.colors.gray" />
  </Box>
);

const SemanticColorsDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Semantic Color Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Colors with contextual meaning. Use these for consistent application of color across components.
    </Typography>

    {/* Brand Colors */}
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Brand</Typography>
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, sm: 3 }}>
        <ColorSwatch 
          color={semanticTokens.colors.brand.primary} 
          name="Primary" 
          tokenPath="semanticTokens.colors.brand.primary" 
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <ColorSwatch 
          color={semanticTokens.colors.brand.secondary} 
          name="Secondary" 
          tokenPath="semanticTokens.colors.brand.secondary" 
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <ColorSwatch 
          color={semanticTokens.colors.brand.tertiary} 
          name="Tertiary" 
          tokenPath="semanticTokens.colors.brand.tertiary" 
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <ColorSwatch 
          color={semanticTokens.colors.brand.accent} 
          name="Accent" 
          tokenPath="semanticTokens.colors.brand.accent" 
        />
      </Grid>
    </Grid>

    {/* Text Colors */}
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Text</Typography>
    <Grid container spacing={2}>
      {Object.entries(semanticTokens.colors.text).map(([name, color]) => (
        <Grid size={{ xs: 6, sm: 3, md: 2 }} key={name}>
          <ColorSwatch 
            color={color} 
            name={name} 
            tokenPath={`semanticTokens.colors.text.${name}`} 
          />
        </Grid>
      ))}
    </Grid>

    {/* Background Colors */}
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Background</Typography>
    <Grid container spacing={2}>
      {Object.entries(semanticTokens.colors.background).map(([name, color]) => (
        <Grid size={{ xs: 6, sm: 3, md: 2 }} key={name}>
          <ColorSwatch 
            color={color} 
            name={name} 
            tokenPath={`semanticTokens.colors.background.${name}`} 
          />
        </Grid>
      ))}
    </Grid>

    {/* Border Colors */}
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Border</Typography>
    <Grid container spacing={2}>
      {Object.entries(semanticTokens.colors.border).map(([name, color]) => (
        <Grid size={{ xs: 6, sm: 3, md: 2 }} key={name}>
          <ColorSwatch 
            color={color} 
            name={name} 
            tokenPath={`semanticTokens.colors.border.${name}`} 
          />
        </Grid>
      ))}
    </Grid>

    {/* Interactive Colors */}
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Interactive</Typography>
    <Grid container spacing={2}>
      {Object.entries(semanticTokens.colors.interactive).map(([name, color]) => (
        <Grid size={{ xs: 6, sm: 3, md: 2 }} key={name}>
          <ColorSwatch 
            color={color} 
            name={name} 
            tokenPath={`semanticTokens.colors.interactive.${name}`} 
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

const StatusColorsDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Status Color Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Colors for communicating status, feedback, and system states.
    </Typography>

    {Object.entries(semanticTokens.colors.status).map(([status, colors]) => (
      <Box key={status} sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>{status}</Typography>
        <Grid container spacing={2}>
          {Object.entries(colors).map(([variant, color]) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={variant}>
              <ColorSwatch 
                color={color} 
                name={variant} 
                tokenPath={`semanticTokens.colors.status.${status}.${variant}`} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    ))}
  </Box>
);

const meta: Meta = {
  title: 'Tokens/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const BaseColors: Story = {
  render: () => <BaseColorsDemo />,
};

export const SemanticColors: Story = {
  render: () => <SemanticColorsDemo />,
};

export const StatusColors: Story = {
  render: () => <StatusColorsDemo />,
};
