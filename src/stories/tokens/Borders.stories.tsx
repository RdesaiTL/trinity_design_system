import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { baseTokens, semanticTokens } from '../../tokens';

/**
 * # Border Tokens
 * 
 * Border tokens define the visual treatment of element boundaries including radius and width.
 * 
 * ## Categories
 * - **Border Radius**: From sharp (0) to fully rounded (full/9999)
 * - **Border Width**: Standard widths for different emphasis levels
 * - **Semantic Borders**: Component-specific border styles
 */

const BorderRadiusDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Border Radius Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Border radius values from sharp corners to fully rounded shapes.
    </Typography>

    <Grid container spacing={3}>
      {Object.entries(baseTokens.borderRadius).map(([name, value]) => (
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={name}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                backgroundColor: 'primary.main',
                borderRadius: `${value}px`,
                mx: 'auto',
                mb: 2,
              }}
            />
            <Typography variant="subtitle2" fontWeight={600}>{name}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
              {value === 9999 ? 'full' : `${value}px`}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const BorderWidthDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Border Width Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Standard border widths for different use cases.
    </Typography>

    <Stack spacing={3}>
      {Object.entries(baseTokens.borderWidth)
        .filter(([, value]) => value > 0)
        .map(([name, value]) => (
          <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ minWidth: 150 }}>
              <Typography variant="subtitle2" fontWeight={600}>borderWidth.{name}</Typography>
              <Typography variant="body2" color="text.secondary">{value}px</Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                height: 60,
                border: `${value}px solid`,
                borderColor: 'primary.main',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {value}px border
              </Typography>
            </Box>
          </Box>
        ))}
    </Stack>
  </Box>
);

const SemanticBordersDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Semantic Border Tokens</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Component-specific border radius and width values.
    </Typography>

    {/* Border Radius */}
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Border Radius</Typography>
    <Grid container spacing={3}>
      {Object.entries(semanticTokens.borders.radius).map(([name, value]) => (
        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={name}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Box
              sx={{
                width: 80,
                height: name === 'button' ? 40 : 80,
                backgroundColor: 'secondary.main',
                borderRadius: `${value}px`,
                mx: 'auto',
                mb: 2,
              }}
            />
            <Typography variant="subtitle2" fontWeight={600}>{name}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', display: 'block' }}>
              borders.radius.{name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {value === 9999 ? 'full' : `${value}px`}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    {/* Border Width */}
    <Typography variant="h6" sx={{ mt: 6, mb: 2 }}>Border Width</Typography>
    <Grid container spacing={3}>
      {Object.entries(semanticTokens.borders.width).map(([name, value]) => (
        <Grid size={{ xs: 12, sm: 4 }} key={name}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                height: 60,
                border: `${value}px solid`,
                borderColor: 'primary.main',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {name} ({value}px)
              </Typography>
            </Box>
            <Typography variant="subtitle2" fontWeight={600}>{name}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
              borders.width.{name}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const BorderUsageDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Border Usage Examples</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Real-world examples of border tokens applied to UI elements.
    </Typography>

    <Grid container spacing={4}>
      {/* Button Examples */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Buttons</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Buttons use pill-shaped (full) border radius.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                px: 3,
                py: 1.5,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: `${semanticTokens.borders.radius.button}px`,
              }}
            >
              Primary
            </Box>
            <Box
              sx={{
                px: 3,
                py: 1.5,
                border: '2px solid',
                borderColor: 'primary.main',
                color: 'primary.main',
                borderRadius: `${semanticTokens.borders.radius.button}px`,
              }}
            >
              Outlined
            </Box>
          </Stack>
          <Typography variant="caption" sx={{ mt: 2, display: 'block', fontFamily: 'monospace' }}>
            borderRadius: borders.radius.button (full)
          </Typography>
        </Paper>
      </Grid>

      {/* Input Examples */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Inputs</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Form inputs use subtle rounded corners.
          </Typography>
          <Box
            sx={{
              p: 1.5,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: `${semanticTokens.borders.radius.input}px`,
              mb: 2,
            }}
          >
            <Typography color="text.secondary">Text input</Typography>
          </Box>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            borderRadius: borders.radius.input (6px)
          </Typography>
        </Paper>
      </Grid>

      {/* Card Examples */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Cards</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Cards use medium border radius for a modern look.
          </Typography>
          <Box
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: `${semanticTokens.borders.radius.card}px`,
              bgcolor: 'grey.50',
            }}
          >
            <Typography variant="subtitle2">Card Title</Typography>
            <Typography variant="body2" color="text.secondary">
              Card content goes here
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ mt: 2, display: 'block', fontFamily: 'monospace' }}>
            borderRadius: borders.radius.card (12px)
          </Typography>
        </Paper>
      </Grid>

      {/* Modal Examples */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Modals</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Modals use larger radius for prominent appearance.
          </Typography>
          <Box
            sx={{
              p: 3,
              bgcolor: 'background.paper',
              borderRadius: `${semanticTokens.borders.radius.modal}px`,
              boxShadow: 3,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>Modal Title</Typography>
            <Typography variant="body2" color="text.secondary">
              Modal content area
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ mt: 2, display: 'block', fontFamily: 'monospace' }}>
            borderRadius: borders.radius.modal (16px)
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

/**
 * Nesting Principles Demo
 * 
 * Based on the formula: Outer radius = Inner radius + Padding
 * This ensures consistent visual spacing when elements are nested.
 */
const NestingPrinciplesDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Nesting Principles</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
      When nesting elements, the outer container's radius should equal the inner element's radius plus the padding.
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontStyle: 'italic' }}>
      Formula: <strong>Outer radius = Inner radius + Padding</strong>
    </Typography>

    <Grid container spacing={4}>
      {/* Button in Card Example */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Button in Card</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            When a button (sm: 6px) is in a card with 8px padding, the card needs lg: 12px radius.
          </Typography>
          <Box
            sx={{
              p: '8px',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: `${baseTokens.borderRadius.lg}px`, // 12px
              bgcolor: 'grey.50',
              display: 'inline-block',
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 1,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: `${baseTokens.borderRadius.sm}px`, // 6px
              }}
            >
              Button
            </Box>
          </Box>
          <Typography variant="caption" sx={{ mt: 2, display: 'block', fontFamily: 'monospace' }}>
            Inner (button): 6px + Padding: 8px ≈ Outer: 12px
          </Typography>
        </Paper>
      </Grid>

      {/* Input in Panel Example */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Input in Panel</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            When an input (sm: 6px) is in a panel with 8px padding, use md: 8px or lg: 12px.
          </Typography>
          <Box
            sx={{
              p: '8px',
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: `${baseTokens.borderRadius.lg}px`, // 12px
              bgcolor: 'grey.100',
            }}
          >
            <Box
              sx={{
                p: 1.5,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: `${baseTokens.borderRadius.sm}px`, // 6px
                bgcolor: 'white',
              }}
            >
              <Typography variant="body2" color="text.secondary">Input field</Typography>
            </Box>
          </Box>
          <Typography variant="caption" sx={{ mt: 2, display: 'block', fontFamily: 'monospace' }}>
            Inner (input): 6px + Padding: 8px ≈ Outer: 12px
          </Typography>
        </Paper>
      </Grid>

      {/* Card in Modal Example */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Card in Modal</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            When a card (lg: 12px) is in a modal with 16px padding, use 3xl: 24px for the modal.
          </Typography>
          <Box
            sx={{
              p: '16px',
              borderRadius: `${baseTokens.borderRadius['3xl']}px`, // 24px
              bgcolor: 'grey.100',
              boxShadow: 3,
            }}
          >
            <Box
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: `${baseTokens.borderRadius.lg}px`, // 12px
                bgcolor: 'white',
              }}
            >
              <Typography variant="subtitle2">Nested Card</Typography>
              <Typography variant="body2" color="text.secondary">Content inside modal</Typography>
            </Box>
          </Box>
          <Typography variant="caption" sx={{ mt: 2, display: 'block', fontFamily: 'monospace' }}>
            Inner (card): 12px + Padding: 16px = Outer: 24px (3xl)
          </Typography>
        </Paper>
      </Grid>

      {/* Chip in Container Example */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Chips in Container</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            When chips (sm: 6px) are in a container with 4px padding, use md: 8px for container.
          </Typography>
          <Box
            sx={{
              p: '4px',
              display: 'inline-flex',
              gap: 1,
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: `${baseTokens.borderRadius.md}px`, // 8px
              bgcolor: 'grey.50',
            }}
          >
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: `${baseTokens.borderRadius.sm}px`, // 6px
                fontSize: '0.75rem',
              }}
            >
              Tag 1
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: 'secondary.main',
                color: 'white',
                borderRadius: `${baseTokens.borderRadius.sm}px`, // 6px
                fontSize: '0.75rem',
              }}
            >
              Tag 2
            </Box>
          </Box>
          <Typography variant="caption" sx={{ mt: 2, display: 'block', fontFamily: 'monospace' }}>
            Inner (chip): 6px + Padding: 4px ≈ Outer: 8px (md)
          </Typography>
        </Paper>
      </Grid>
    </Grid>

    {/* Size Guidelines */}
    <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>Size-Based Guidelines</Typography>
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>Small Elements (16-32px)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Badges, chips, small buttons, icons
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            Use: xs (4px) or sm (6px)
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>Medium Elements (32-64px)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Inputs, cards, list items, menus
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            Use: md (8px) or lg (12px)
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>Large Elements (64px+)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Modals, dialogs, large containers
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            Use: xl (16px) or 2xl/3xl (20-24px)
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const meta: Meta = {
  title: 'Tokens/Borders',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const BorderRadius: Story = {
  render: () => <BorderRadiusDemo />,
};

export const BorderWidth: Story = {
  render: () => <BorderWidthDemo />,
};

export const SemanticBorders: Story = {
  render: () => <SemanticBordersDemo />,
};

export const UsageExamples: Story = {
  render: () => <BorderUsageDemo />,
};

export const NestingPrinciples: Story = {
  render: () => <NestingPrinciplesDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the nesting formula: Outer radius = Inner radius + Padding. This ensures consistent visual spacing when elements are nested inside containers.',
      },
    },
  },
};
