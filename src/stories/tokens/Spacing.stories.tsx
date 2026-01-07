import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { baseTokens, semanticTokens } from '../../tokens';

/**
 * # Spacing Tokens
 * 
 * Spacing tokens provide a consistent scale for padding, margins, gaps, and other spatial relationships.
 * 
 * ## Scale
 * The spacing scale is based on 4px increments, providing harmonious and predictable spacing throughout the UI.
 * 
 * ## Usage
 * - Use smaller values (0-3) for tight component internals
 * - Use medium values (4-8) for general padding and margins
 * - Use larger values (10+) for section and page-level spacing
 */

const SpacingBlock = ({ 
  name, 
  value, 
  tokenPath 
}: { 
  name: string | number; 
  value: number; 
  tokenPath: string;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
    <Box sx={{ minWidth: 120 }}>
      <Typography variant="subtitle2" fontWeight={600}>{name}</Typography>
      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
        {tokenPath}
      </Typography>
    </Box>
    <Box sx={{ minWidth: 60 }}>
      <Typography variant="body2" color="text.secondary">
        {value}px
      </Typography>
    </Box>
    <Box
      sx={{
        width: value,
        height: 24,
        backgroundColor: 'primary.main',
        borderRadius: 0.5,
        minWidth: value > 0 ? 2 : 0,
      }}
    />
  </Box>
);

const BaseSpacingDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Base Spacing Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      A consistent spacing scale based on 4px increments. Use these for margins, padding, and gaps.
    </Typography>

    <Paper sx={{ p: 3 }}>
      {Object.entries(baseTokens.spacing).map(([name, value]) => (
        <SpacingBlock 
          key={name} 
          name={name} 
          value={value} 
          tokenPath={`baseTokens.spacing.${name}`} 
        />
      ))}
    </Paper>
  </Box>
);

const SpacingVisualDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Visual Spacing Guide</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Visual representation of spacing values as applied padding.
    </Typography>

    <Grid container spacing={3}>
      {[1, 2, 4, 6, 8, 10, 12, 16].map((n) => (
        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={n}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              spacing.{n}
            </Typography>
            <Box 
              sx={{ 
                mt: 2, 
                border: '1px dashed', 
                borderColor: 'divider',
                display: 'inline-flex',
              }}
            >
              <Box
                sx={{
                  p: `${baseTokens.spacing[n as keyof typeof baseTokens.spacing]}px`,
                  backgroundColor: 'primary.light',
                  opacity: 0.2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'primary.main',
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {baseTokens.spacing[n as keyof typeof baseTokens.spacing]}px
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const SemanticSpacingDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Semantic Spacing Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Named spacing values for specific component and layout contexts.
    </Typography>

    {/* Component Spacing */}
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Component Spacing</Typography>
    <Paper sx={{ p: 3 }}>
      <Stack spacing={2}>
        {Object.entries(semanticTokens.spacing.component).map(([name, value]) => (
          <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ minWidth: 150 }}>
              <Typography variant="subtitle2">{name}</Typography>
              <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                spacing.component.{name}
              </Typography>
            </Box>
            <Box sx={{ minWidth: 60 }}>
              <Typography variant="body2" color="text.secondary">
                {value}px
              </Typography>
            </Box>
            <Box
              sx={{
                width: value,
                height: 20,
                backgroundColor: 'secondary.main',
                borderRadius: 0.5,
              }}
            />
          </Box>
        ))}
      </Stack>
    </Paper>

    {/* Layout Spacing */}
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Layout Spacing</Typography>
    <Paper sx={{ p: 3 }}>
      <Stack spacing={2}>
        {Object.entries(semanticTokens.spacing.layout).map(([name, value]) => (
          <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ minWidth: 180 }}>
              <Typography variant="subtitle2">{name}</Typography>
              <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                spacing.layout.{name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {value}px
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  </Box>
);

const SpacingUsageDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Spacing Usage Guidelines</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Recommendations for when to use different spacing values.
    </Typography>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Tight Spacing (4-8px)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Use for component internals, icon gaps, and dense layouts.
          </Typography>
          <Box sx={{ display: 'flex', gap: `${baseTokens.spacing[1]}px`, alignItems: 'center' }}>
            <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
            <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
            <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
          </Box>
          <Typography variant="caption" sx={{ mt: 1, display: 'block', fontFamily: 'monospace' }}>
            gap: spacing.1 (4px)
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Standard Spacing (16-24px)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Use for card padding, form field spacing, and general margins.
          </Typography>
          <Stack spacing={`${baseTokens.spacing[4]}px`}>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>Field 1</Box>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>Field 2</Box>
          </Stack>
          <Typography variant="caption" sx={{ mt: 1, display: 'block', fontFamily: 'monospace' }}>
            gap: spacing.4 (16px)
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Section Spacing (48-64px)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Use between major page sections and content groups.
          </Typography>
          <Box sx={{ border: '1px dashed', borderColor: 'divider', p: 2 }}>
            <Box sx={{ bgcolor: 'grey.200', p: 2, mb: `${baseTokens.spacing[12]}px` }}>Section 1</Box>
            <Box sx={{ bgcolor: 'grey.200', p: 2 }}>Section 2</Box>
          </Box>
          <Typography variant="caption" sx={{ mt: 1, display: 'block', fontFamily: 'monospace' }}>
            gap: spacing.12 (48px)
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Page Padding (24px+)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Use for page-level padding and container gutters.
          </Typography>
          <Box sx={{ border: '1px solid', borderColor: 'divider', position: 'relative' }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                bgcolor: 'secondary.light',
                opacity: 0.2,
              }} 
            />
            <Box sx={{ p: `${baseTokens.spacing[6]}px`, position: 'relative' }}>
              <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                Content
              </Box>
            </Box>
          </Box>
          <Typography variant="caption" sx={{ mt: 1, display: 'block', fontFamily: 'monospace' }}>
            padding: spacing.6 (24px)
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const meta: Meta = {
  title: 'Tokens/Spacing',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const BaseSpacing: Story = {
  render: () => <BaseSpacingDemo />,
};

export const VisualGuide: Story = {
  render: () => <SpacingVisualDemo />,
};

export const SemanticSpacing: Story = {
  render: () => <SemanticSpacingDemo />,
};

export const UsageGuidelines: Story = {
  render: () => <SpacingUsageDemo />,
};
