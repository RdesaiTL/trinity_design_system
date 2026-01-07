import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { baseTokens, semanticTokens } from '../../tokens';

/**
 * # Shadow Tokens
 * 
 * Shadow tokens create depth and elevation in the UI. They help establish visual hierarchy
 * and indicate interactive elements.
 * 
 * ## Elevation Levels
 * - **sm**: Subtle elevation for cards at rest
 * - **base**: Standard elevation for interactive elements
 * - **md-lg**: Higher elevation for dropdowns and popovers
 * - **xl-2xl**: Maximum elevation for modals and overlays
 */

const ShadowCard = ({ 
  name, 
  shadow, 
  tokenPath,
  useCase 
}: { 
  name: string; 
  shadow: string; 
  tokenPath: string;
  useCase: string;
}) => (
  <Paper sx={{ p: 3 }}>
    <Box
      sx={{
        width: '100%',
        height: 100,
        backgroundColor: 'background.paper',
        boxShadow: shadow,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {name}
      </Typography>
    </Box>
    <Typography variant="subtitle2" fontWeight={600}>{name}</Typography>
    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', display: 'block' }}>
      {tokenPath}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      {useCase}
    </Typography>
  </Paper>
);

const BaseShadowsDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Base Shadow Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      A progressive shadow scale from subtle to prominent elevation.
    </Typography>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <ShadowCard
          name="none"
          shadow={baseTokens.shadows.none}
          tokenPath="baseTokens.shadows.none"
          useCase="Flat elements, no elevation"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <ShadowCard
          name="sm"
          shadow={baseTokens.shadows.sm}
          tokenPath="baseTokens.shadows.sm"
          useCase="Subtle lift for buttons and inputs"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <ShadowCard
          name="base"
          shadow={baseTokens.shadows.base}
          tokenPath="baseTokens.shadows.base"
          useCase="Cards at rest"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <ShadowCard
          name="md"
          shadow={baseTokens.shadows.md}
          tokenPath="baseTokens.shadows.md"
          useCase="Elevated cards, hover states"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <ShadowCard
          name="lg"
          shadow={baseTokens.shadows.lg}
          tokenPath="baseTokens.shadows.lg"
          useCase="Dropdowns and popovers"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <ShadowCard
          name="xl"
          shadow={baseTokens.shadows.xl}
          tokenPath="baseTokens.shadows.xl"
          useCase="Prominent floating elements"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <ShadowCard
          name="2xl"
          shadow={baseTokens.shadows['2xl']}
          tokenPath="baseTokens.shadows['2xl']"
          useCase="Modals and overlays"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <ShadowCard
          name="inner"
          shadow={baseTokens.shadows.inner}
          tokenPath="baseTokens.shadows.inner"
          useCase="Inset elements like pressed buttons"
        />
      </Grid>
    </Grid>
  </Box>
);

const SemanticShadowsDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Semantic Shadow Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Component-specific shadows for consistent elevation across the UI.
    </Typography>

    <Grid container spacing={4}>
      {/* Card Shadow */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Card Shadow</Typography>
          <Box
            sx={{
              p: 3,
              bgcolor: 'background.paper',
              boxShadow: semanticTokens.shadows.card,
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>Card Title</Typography>
            <Typography variant="body2" color="text.secondary">
              Standard card elevation for content containers.
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            semanticTokens.shadows.card
          </Typography>
        </Paper>
      </Grid>

      {/* Dropdown Shadow */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Dropdown Shadow</Typography>
          <Box sx={{ position: 'relative', height: 150 }}>
            <Box
              sx={{
                p: 1,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 1,
                width: 200,
              }}
            >
              Select option
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: 44,
                left: 0,
                width: 200,
                bgcolor: 'background.paper',
                boxShadow: semanticTokens.shadows.dropdown,
                borderRadius: 1,
                p: 1,
              }}
            >
              <Box sx={{ p: 1, '&:hover': { bgcolor: 'grey.100' }, borderRadius: 0.5 }}>
                Option 1
              </Box>
              <Box sx={{ p: 1, '&:hover': { bgcolor: 'grey.100' }, borderRadius: 0.5 }}>
                Option 2
              </Box>
              <Box sx={{ p: 1, '&:hover': { bgcolor: 'grey.100' }, borderRadius: 0.5 }}>
                Option 3
              </Box>
            </Box>
          </Box>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            semanticTokens.shadows.dropdown
          </Typography>
        </Paper>
      </Grid>

      {/* Modal Shadow */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Modal Shadow</Typography>
          <Box
            sx={{
              position: 'relative',
              bgcolor: 'grey.200',
              p: 4,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                p: 3,
                bgcolor: 'background.paper',
                boxShadow: semanticTokens.shadows.modal,
                borderRadius: 3,
                maxWidth: 280,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Modal Dialog
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Maximum elevation for modal overlays.
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', mt: 2, display: 'block' }}>
            semanticTokens.shadows.modal
          </Typography>
        </Paper>
      </Grid>

      {/* Button Shadow */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Button Shadow</Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Box
              sx={{
                px: 3,
                py: 1.5,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 100,
                boxShadow: semanticTokens.shadows.button,
              }}
            >
              Button
            </Box>
            <Box
              sx={{
                px: 3,
                py: 1.5,
                bgcolor: 'secondary.main',
                color: 'white',
                borderRadius: 100,
                boxShadow: semanticTokens.shadows.button,
              }}
            >
              Action
            </Box>
          </Stack>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            semanticTokens.shadows.button
          </Typography>
        </Paper>
      </Grid>

      {/* Input Shadows */}
      <Grid size={{ xs: 12 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Input Shadows</Typography>
          <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Default (no shadow)
              </Typography>
              <Box
                sx={{
                  p: 1.5,
                  width: 200,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 1,
                  boxShadow: semanticTokens.shadows.input,
                }}
              >
                <Typography color="text.secondary">Input value</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Focused
              </Typography>
              <Box
                sx={{
                  p: 1.5,
                  width: 200,
                  border: '2px solid',
                  borderColor: 'primary.light',
                  borderRadius: 1,
                  boxShadow: semanticTokens.shadows.inputFocus,
                }}
              >
                <Typography>Input value</Typography>
              </Box>
            </Box>
          </Stack>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            input: semanticTokens.shadows.input | inputFocus: semanticTokens.shadows.inputFocus
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const ElevationGuideDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Elevation Hierarchy</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Visual guide to elevation levels and when to use them.
    </Typography>

    <Box sx={{ position: 'relative', bgcolor: 'grey.100', p: 4, borderRadius: 2, minHeight: 400 }}>
      {/* Ground level */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 40,
          width: 150,
          p: 2,
          bgcolor: 'grey.200',
          borderRadius: 1,
        }}
      >
        <Typography variant="caption" fontWeight={600}>Level 0</Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          Background
        </Typography>
      </Box>

      {/* Card level */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 60,
          left: 100,
          width: 150,
          p: 2,
          bgcolor: 'background.paper',
          boxShadow: baseTokens.shadows.base,
          borderRadius: 1,
        }}
      >
        <Typography variant="caption" fontWeight={600}>Level 1</Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          Cards, Panels
        </Typography>
      </Box>

      {/* Elevated card level */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 120,
          left: 180,
          width: 150,
          p: 2,
          bgcolor: 'background.paper',
          boxShadow: baseTokens.shadows.md,
          borderRadius: 1,
        }}
      >
        <Typography variant="caption" fontWeight={600}>Level 2</Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          Hover states
        </Typography>
      </Box>

      {/* Dropdown level */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 180,
          left: 260,
          width: 150,
          p: 2,
          bgcolor: 'background.paper',
          boxShadow: baseTokens.shadows.lg,
          borderRadius: 1,
        }}
      >
        <Typography variant="caption" fontWeight={600}>Level 3</Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          Dropdowns
        </Typography>
      </Box>

      {/* Modal level */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 240,
          left: 340,
          width: 150,
          p: 2,
          bgcolor: 'background.paper',
          boxShadow: baseTokens.shadows['2xl'],
          borderRadius: 2,
        }}
      >
        <Typography variant="caption" fontWeight={600}>Level 4</Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          Modals
        </Typography>
      </Box>

      {/* Arrow guide */}
      <Box
        sx={{
          position: 'absolute',
          right: 40,
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">↑</Typography>
        <Typography variant="caption" color="text.secondary">
          Increasing<br />Elevation
        </Typography>
      </Box>
    </Box>
  </Box>
);

const meta: Meta = {
  title: 'Tokens/Shadows',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const BaseShadows: Story = {
  render: () => <BaseShadowsDemo />,
};

export const SemanticShadows: Story = {
  render: () => <SemanticShadowsDemo />,
};

export const ElevationGuide: Story = {
  render: () => <ElevationGuideDemo />,
};
