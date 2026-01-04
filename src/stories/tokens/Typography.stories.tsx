import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { baseTokens, semanticTokens } from '../../tokens';

/**
 * # Typography Tokens
 * 
 * Typography tokens define the type scale, weights, and styles used across the design system.
 * 
 * ## Categories
 * - **Font Size**: Scale from xs (12px) to 6xl (60px)
 * - **Font Weight**: From light (300) to extrabold (800)
 * - **Line Height**: From tight (1.25) to loose (2)
 * - **Letter Spacing**: From tighter (-0.05em) to widest (0.1em)
 * - **Semantic Styles**: Pre-defined combinations for display, heading, body, and label text
 */

const _TokenDisplay = ({ label, value, tokenPath }: { label: string; value: string | number; tokenPath: string }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="subtitle2" fontWeight={600}>{label}</Typography>
    <Typography 
      variant="body1" 
      sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '0.75rem', mb: 1 }}
    >
      {tokenPath}
    </Typography>
    <Typography variant="h6" sx={{ color: 'primary.main' }}>
      {typeof value === 'number' ? value : value}
    </Typography>
  </Paper>
);

const FontSizeDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Font Size Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      A comprehensive scale of font sizes from 12px to 60px.
    </Typography>

    <Stack spacing={3}>
      {Object.entries(baseTokens.fontSize).map(([name, size]) => (
        <Box key={name} sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <Box sx={{ minWidth: 100 }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              fontSize.{name}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 80 }}>
            <Typography variant="body2" color="text.secondary">
              {size}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: size }}>
            The quick brown fox
          </Typography>
        </Box>
      ))}
    </Stack>
  </Box>
);

const FontWeightDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Font Weight Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Font weights from light (300) to extrabold (800).
    </Typography>

    <Stack spacing={3}>
      {Object.entries(baseTokens.fontWeight).map(([name, weight]) => (
        <Box key={name} sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <Box sx={{ minWidth: 120 }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              fontWeight.{name}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 50 }}>
            <Typography variant="body2" color="text.secondary">
              {weight}
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: weight, fontSize: '1.25rem' }}>
            The quick brown fox jumps over the lazy dog
          </Typography>
        </Box>
      ))}
    </Stack>
  </Box>
);

const LineHeightDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Line Height Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Line height values for controlling text density and readability.
    </Typography>

    <Grid container spacing={3}>
      {Object.entries(baseTokens.lineHeight).map(([name, height]) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={name}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              lineHeight.{name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {height}
            </Typography>
            <Box sx={{ 
              lineHeight: height, 
              border: '1px dashed', 
              borderColor: 'divider',
              p: 1,
              borderRadius: 1,
            }}>
              <Typography sx={{ lineHeight: height }}>
                This is sample text to demonstrate the line height. 
                Notice how the vertical spacing between lines changes.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const LetterSpacingDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Letter Spacing Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Letter spacing options for fine-tuning character spacing.
    </Typography>

    <Stack spacing={3}>
      {Object.entries(baseTokens.letterSpacing).map(([name, spacing]) => (
        <Box key={name} sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <Box sx={{ minWidth: 140 }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              letterSpacing.{name}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 80 }}>
            <Typography variant="body2" color="text.secondary">
              {spacing}
            </Typography>
          </Box>
          <Typography sx={{ letterSpacing: spacing, fontSize: '1.25rem', textTransform: 'uppercase' }}>
            LETTER SPACING
          </Typography>
        </Box>
      ))}
    </Stack>
  </Box>
);

const SemanticTypographyDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Semantic Typography Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Pre-defined typography styles combining size, weight, line height, and letter spacing.
    </Typography>

    {/* Display Styles */}
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Display</Typography>
    <Stack spacing={4}>
      {Object.entries(semanticTokens.typography.display).map(([name, style]) => (
        <Box key={name}>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block', mb: 1 }}>
            typography.display.{name}
          </Typography>
          <Typography sx={{ ...style }}>
            Display {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {style.fontSize} / {style.fontWeight} / {style.lineHeight}
          </Typography>
        </Box>
      ))}
    </Stack>

    {/* Heading Styles */}
    <Typography variant="h6" sx={{ mt: 6, mb: 2 }}>Headings</Typography>
    <Stack spacing={3}>
      {Object.entries(semanticTokens.typography.heading).map(([name, style]) => (
        <Box key={name}>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block', mb: 1 }}>
            typography.heading.{name}
          </Typography>
          <Typography sx={{ ...style }}>
            Heading {name.toUpperCase()}
          </Typography>
        </Box>
      ))}
    </Stack>

    {/* Body Styles */}
    <Typography variant="h6" sx={{ mt: 6, mb: 2 }}>Body</Typography>
    <Stack spacing={3}>
      {Object.entries(semanticTokens.typography.body).map(([name, style]) => (
        <Box key={name}>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block', mb: 1 }}>
            typography.body.{name}
          </Typography>
          <Typography sx={{ ...style }}>
            The quick brown fox jumps over the lazy dog. This is body {name} text.
          </Typography>
        </Box>
      ))}
    </Stack>

    {/* Label Styles */}
    <Typography variant="h6" sx={{ mt: 6, mb: 2 }}>Labels</Typography>
    <Stack spacing={2}>
      {Object.entries(semanticTokens.typography.label).map(([name, style]) => (
        <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', minWidth: 180 }}>
            typography.label.{name}
          </Typography>
          <Typography sx={{ ...style }}>
            Label {name}
          </Typography>
        </Box>
      ))}
    </Stack>
  </Box>
);

const meta: Meta = {
  title: 'Tokens/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const FontSize: Story = {
  render: () => <FontSizeDemo />,
};

export const FontWeight: Story = {
  render: () => <FontWeightDemo />,
};

export const LineHeight: Story = {
  render: () => <LineHeightDemo />,
};

export const LetterSpacing: Story = {
  render: () => <LetterSpacingDemo />,
};

export const SemanticTypography: Story = {
  render: () => <SemanticTypographyDemo />,
};
