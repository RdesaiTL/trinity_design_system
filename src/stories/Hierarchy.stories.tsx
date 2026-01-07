import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Card, 
  CardContent,
  Chip,
  Stack,
  Divider,
  IconButton,
  Alert,
} from '@mui/material';
import { 
  Layers, 
  TextFields, 
  Visibility, 
  Height, 
  Contrast as ContrastIcon,
  TouchApp,
  SpaceBar,
  Architecture,
} from '@mui/icons-material';
import {
  elevationHierarchy,
  attentionHierarchy,
  scaleHierarchy,
  spacingHierarchy,
  getAttentionColor,
  uiElevation,
  uiPatterns,
  spacing,
  typographyPresets,
  attentionStyles,
  hoverEffect,
  architectureLayers,
} from '../hierarchy';
import { baseTokens } from '../tokens';

/**
 * # Design System Hierarchy
 * 
 * Modern design systems (2026 standard) are organized through two primary lenses:
 * 
 * 1. **System Architecture** - How the design system is built (layered tiers)
 * 2. **Visual Hierarchy** - How the system guides user attention
 * 
 * Trinity implements a comprehensive hierarchy system that ensures scalability
 * and consistency across all digital products.
 */

const meta: Meta = {
  title: 'Foundation/Hierarchy',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The hierarchy system provides structured organization of design assets, principles, 
and rules to ensure scalability and consistency. It governs both the internal 
architecture of the design system and the visual output that guides user attention.

## Design System Architecture (Internal)

The system is structured in 5 concentric layers:

1. **Foundations** - Raw primitives (colors, typography, spacing)
2. **Design Tokens** - Semantic mappings (color-primary, spacing-md)
3. **Core Components** - Reusable UI blocks (buttons, inputs)
4. **Patterns & Recipes** - Composed solutions (forms, headers)
5. **Product Ecosystem** - Final implementations

## Visual Hierarchy (Output)

Controls how users perceive importance:

- **Attention Hierarchy** - Signal-to-noise ratio
- **Typographic Hierarchy** - Text differentiation
- **Elevation** - Z-axis depth via shadows
- **Scale & Contrast** - Size and color prominence
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ============================================
// ARCHITECTURE HIERARCHY
// ============================================

const ArchitectureLayer: React.FC<{
  layer: number;
  name: string;
  description: string;
  color: string;
  examples: string[];
}> = ({ layer, name, description, color, examples }) => (
  <Paper
    sx={{
      p: 3,
      borderLeft: `4px solid ${color}`,
      backgroundColor: 'background.paper',
      mb: 2,
    }}
    elevation={0}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
      <Chip 
        label={`Layer ${layer}`} 
        size="small" 
        sx={{ backgroundColor: color, color: 'white', fontWeight: 600 }}
      />
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {name}
      </Typography>
    </Box>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      {description}
    </Typography>
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {examples.map((ex) => (
        <Chip key={ex} label={ex} size="small" variant="outlined" />
      ))}
    </Box>
  </Paper>
);

const ArchitectureDemo: React.FC = () => (
  <Box sx={{ maxWidth: 800 }}>
    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Architecture /> Design System Architecture
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      The Trinity Design System is organized in 5 concentric layers, building from 
      abstract foundations to concrete implementations.
    </Typography>
    
    <ArchitectureLayer
      layer={1}
      name="Foundations"
      description={architectureLayers.foundations}
      color={baseTokens.colors.navy[900]}
      examples={['Color palettes', 'Typography scales', 'Spacing', 'Shadows', 'Motion']}
    />
    <ArchitectureLayer
      layer={2}
      name="Design Tokens"
      description={architectureLayers.tokens}
      color={baseTokens.colors.purple[700]}
      examples={['color-primary', 'spacing-md', 'text-secondary', 'shadow-card']}
    />
    <ArchitectureLayer
      layer={3}
      name="Core Components"
      description={architectureLayers.components}
      color={baseTokens.colors.indigo[600]}
      examples={['Button', 'Input', 'Card', 'Chip', 'Avatar', 'Switch']}
    />
    <ArchitectureLayer
      layer={4}
      name="Patterns & Recipes"
      description={architectureLayers.hierarchy}
      color={baseTokens.colors.coral[600]}
      examples={['Contact Form', 'Navigation Header', 'Data Table', 'Modal Dialog']}
    />
    <ArchitectureLayer
      layer={5}
      name="Product Ecosystem"
      description={architectureLayers.patterns}
      color={baseTokens.colors.azure[500]}
      examples={['Dashboard', 'Settings Page', 'User Profile', 'Analytics']}
    />
  </Box>
);

export const SystemArchitecture: Story = {
  render: () => <ArchitectureDemo />,
  parameters: {
    docs: {
      description: {
        story: 'The design system architecture showing the 5-layer hierarchy from foundations to product implementations.',
      },
    },
  },
};

// ============================================
// ELEVATION HIERARCHY
// ============================================

const ElevationCard: React.FC<{
  name: string;
  level: number;
  zIndex: number | string;
  shadow: string;
  description: string;
}> = ({ name, level, zIndex, shadow, description }) => (
  <Card
    sx={{
      width: 200,
      height: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: shadow,
      position: 'relative',
      backgroundColor: 'background.paper',
    }}
  >
    <Chip 
      label={`z: ${zIndex}`} 
      size="small" 
      sx={{ position: 'absolute', top: 8, right: 8, fontSize: '0.7rem' }}
    />
    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
      {name}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      Level {level}
    </Typography>
    <Typography variant="caption" color="text.tertiary" sx={{ mt: 1, px: 1, textAlign: 'center' }}>
      {description}
    </Typography>
  </Card>
);

const ElevationDemo: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Layers /> Elevation Hierarchy
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Elevation creates depth through shadows and z-index layering. Higher elevation 
      elements appear closer to the user and demand more attention.
    </Typography>
    
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {Object.entries(elevationHierarchy).map(([key, value]) => (
        <ElevationCard
          key={key}
          name={key.charAt(0).toUpperCase() + key.slice(1)}
          level={value.level}
          zIndex={value.zIndex}
          shadow={value.shadow}
          description={value.description}
        />
      ))}
    </Box>

    <Divider sx={{ my: 4 }} />

    <Typography variant="h6" gutterBottom>
      Common UI Patterns
    </Typography>
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 2, ...uiElevation.card() }}>
          <Typography variant="subtitle2">Card (resting)</Typography>
          <Typography variant="caption" color="text.secondary">
            Standard card elevation
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 2, ...uiElevation.dropdown() }}>
          <Typography variant="subtitle2">Dropdown (floating)</Typography>
          <Typography variant="caption" color="text.secondary">
            Menu/dropdown elevation
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 2, ...uiElevation.modal() }}>
          <Typography variant="subtitle2">Modal (dialog)</Typography>
          <Typography variant="caption" color="text.secondary">
            Dialog/modal elevation
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 2, ...uiElevation.tooltip() }}>
          <Typography variant="subtitle2">Tooltip (tooltip)</Typography>
          <Typography variant="caption" color="text.secondary">
            Highest priority overlay
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export const Elevation: Story = {
  render: () => <ElevationDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Z-axis elevation system using shadows and layering to create visual depth and importance.',
      },
    },
  },
};

// ============================================
// TYPOGRAPHY HIERARCHY
// ============================================

const TypographyDemo: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <TextFields /> Typographic Hierarchy
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Typography hierarchy uses distinct font sizes, weights, and line heights to 
      differentiate content types and guide reading order.
    </Typography>

    <Grid container spacing={4}>
      {/* Display Typography */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Typography variant="overline" sx={{ color: baseTokens.colors.purple[700] }}>
            Display (Level 1)
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ ...typographyPresets.heroTitle(), mb: 1 }}>Hero Title</Box>
            <Box sx={{ ...typographyPresets.pageTitle(), mb: 1 }}>Page Title</Box>
            <Box sx={{ ...typographyPresets.sectionTitle() }}>Section Title</Box>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Use for hero content, marketing headlines, major page titles
          </Typography>
        </Paper>
      </Grid>

      {/* Heading Typography */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Typography variant="overline" sx={{ color: baseTokens.colors.purple[700] }}>
            Headings (Level 2)
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h1" sx={{ mb: 0.5 }}>Heading 1</Typography>
            <Typography variant="h2" sx={{ mb: 0.5 }}>Heading 2</Typography>
            <Typography variant="h3" sx={{ mb: 0.5 }}>Heading 3</Typography>
            <Typography variant="h4" sx={{ mb: 0.5 }}>Heading 4</Typography>
            <Typography variant="h5" sx={{ mb: 0.5 }}>Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Use for page structure, section headers, card titles
          </Typography>
        </Paper>
      </Grid>

      {/* Body Typography */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Typography variant="overline" sx={{ color: baseTokens.colors.purple[700] }}>
            Body (Level 3)
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ ...typographyPresets.bodyLarge(), mb: 2 }}>
              Body Large - For lead paragraphs and important content that needs emphasis.
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Body Medium - Standard body text for main content. This is the default 
              for most paragraph text throughout the application.
            </Typography>
            <Typography variant="body2">
              Body Small - Secondary content, descriptions, less prominent information.
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Supporting Typography */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Typography variant="overline" sx={{ color: baseTokens.colors.purple[700] }}>
            Supporting (Levels 4-6)
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Subtitle 1 - Label Large</Typography>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>Subtitle 2 - Label Medium</Typography>
            <Typography variant="caption" sx={{ mb: 2, display: 'block' }}>
              Caption - Helper text, timestamps, metadata
            </Typography>
            <Typography variant="overline">
              Overline - Category indicators, section labels
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Use for labels, captions, helper text, and metadata
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export const Typography_: Story = {
  name: 'Typography',
  render: () => <TypographyDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Typographic hierarchy with distinct treatments for different content types from display to captions.',
      },
    },
  },
};

// ============================================
// ATTENTION HIERARCHY
// ============================================

const AttentionDemo: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Visibility /> Attention Hierarchy
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Attention hierarchy establishes a signal-to-noise ratio where primary actions 
      stand out over secondary elements, guiding users to the most important content first.
    </Typography>

    <Grid container spacing={3}>
      {Object.entries(attentionHierarchy).map(([key, value]) => (
        <Grid size={{ xs: 12, md: 6 }} key={key}>
          <Paper sx={{ p: 3, height: '100%' }} elevation={0}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: getAttentionColor(key as keyof typeof attentionHierarchy),
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                }}
              >
                {value.prominence}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {key}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Prominence: {value.prominence}/5 • Min Contrast: {value.minContrast}:1
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Use cases:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {value.usage.map((use: string) => (
                <Chip key={use} label={use} size="small" variant="outlined" />
              ))}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>

    <Divider sx={{ my: 4 }} />

    <Typography variant="h6" gutterBottom>
      Attention in Action
    </Typography>
    <Paper sx={{ p: 3 }} elevation={0}>
      <Stack spacing={2}>
        <Box sx={attentionStyles.primary()}>
          Primary: Critical actions and important headings demand immediate attention
        </Box>
        <Box sx={attentionStyles.secondary()}>
          Secondary: Section headers and key information have strong presence
        </Box>
        <Box sx={attentionStyles.tertiary()}>
          Tertiary: Body text and regular content - visible but not competing
        </Box>
        <Box sx={attentionStyles.muted()}>
          Muted: Helper text, timestamps, and metadata in the background
        </Box>
        <Box sx={attentionStyles.disabled()}>
          Disabled: Unavailable items clearly indicate non-interactive state
        </Box>
      </Stack>
    </Paper>
  </Box>
);

export const Attention: Story = {
  render: () => <AttentionDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Attention hierarchy for establishing visual importance from primary CTAs to disabled states.',
      },
    },
  },
};

// ============================================
// SCALE HIERARCHY
// ============================================

const ScaleDemo: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Height /> Scale Hierarchy
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Scale hierarchy uses consistent size ratios to communicate importance. 
      Trinity uses a {scaleHierarchy.ratio}:1 (major third) ratio for harmonious scaling.
    </Typography>

    <Grid container spacing={4}>
      {/* Size Scale */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Typography variant="h6" gutterBottom>Size Multipliers</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Base unit × multiplier = final size
          </Typography>
          <Stack spacing={1}>
            {Object.entries(scaleHierarchy.sizes).map(([key, value]) => (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 32 * value,
                    height: 8,
                    backgroundColor: baseTokens.colors.purple[600],
                    borderRadius: 4,
                  }}
                />
                <Typography variant="body2" sx={{ minWidth: 60 }}>
                  {key}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ×{value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>

      {/* Icon Sizes */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Typography variant="h6" gutterBottom>Icon Sizes</Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {Object.entries(scaleHierarchy.icons).map(([key, value]) => (
              <Box key={key} sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: value,
                    height: value,
                    backgroundColor: baseTokens.colors.navy[900],
                    borderRadius: 1,
                    mb: 0.5,
                  }}
                />
                <Typography variant="caption">{key}</Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  {value}px
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>

      {/* Touch Targets */}
      <Grid size={{ xs: 12 }}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TouchApp /> Touch Targets (Accessibility)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Minimum interactive area sizes for touch accessibility (WCAG 2.5.5)
          </Typography>
          <Stack direction="row" spacing={3}>
            {Object.entries(scaleHierarchy.touchTargets).map(([key, value]) => (
              <Box key={key} sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: value,
                    height: value,
                    border: `2px dashed ${baseTokens.colors.coral[600]}`,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="caption">{value}px</Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                  {key}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export const Scale: Story = {
  render: () => <ScaleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Scale hierarchy using consistent size ratios and touch target requirements for accessibility.',
      },
    },
  },
};

// ============================================
// SPACING HIERARCHY
// ============================================

const SpacingDemo: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <SpaceBar /> Spacing Hierarchy
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Spacing hierarchy creates visual rhythm and groups related content. 
      Four categories organize spacing from micro to layout scale.
    </Typography>

    <Grid container spacing={4}>
      {Object.entries(spacingHierarchy).map(([category, values]) => (
        <Grid size={{ xs: 12, md: 6 }} key={category}>
          <Paper sx={{ p: 3 }} elevation={0}>
            <Typography variant="h6" sx={{ textTransform: 'capitalize', mb: 2 }}>
              {category} Spacing
            </Typography>
            <Stack spacing={2}>
              {Object.entries(values).map(([key, value]) => (
                <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: value as number,
                      height: 24,
                      backgroundColor: baseTokens.colors.azure[500],
                      borderRadius: 1,
                      minWidth: 4,
                    }}
                  />
                  <Typography variant="body2">
                    {key}: {value as number}px
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>

    <Divider sx={{ my: 4 }} />

    <Typography variant="h6" gutterBottom>
      Spacing Presets
    </Typography>
    <Alert severity="info" sx={{ mb: 2 }}>
      Import from <code>hierarchy.ts</code>: <code>spacing.inline</code>, <code>spacing.component</code>, etc.
    </Alert>
    <Grid container spacing={2}>
      {Object.entries(spacing).map(([key, value]) => (
        <Grid size={{ xs: 6, md: 3 }} key={key}>
          <Paper sx={{ p: 2, textAlign: 'center' }} elevation={0}>
            <Typography variant="subtitle2">{key}</Typography>
            <Typography variant="h6">{value}px</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export const Spacing: Story = {
  render: () => <SpacingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Spacing hierarchy organized from micro (inline) to layout (page) scale for consistent rhythm.',
      },
    },
  },
};

// ============================================
// INTERACTIVE HIERARCHY
// ============================================

const InteractiveDemo: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <TouchApp /> Interactive Hierarchy
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Interactive states provide visual feedback during user interactions. 
      Consistent state treatments help users understand what's clickable and responsive.
    </Typography>

    <Grid container spacing={3}>
      {/* State Examples */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Typography variant="h6" gutterBottom>Interactive States</Typography>
          <Stack spacing={2}>
            <Button variant="contained">Default State</Button>
            <Button variant="contained" sx={{ 
              transform: 'translateY(-1px)',
              boxShadow: elevationHierarchy.raised.shadow,
            }}>
              Hover State
            </Button>
            <Button variant="contained" sx={{ 
              transform: 'scale(0.98)',
              opacity: 0.9,
            }}>
              Active/Pressed State
            </Button>
            <Button variant="contained" sx={{ 
              outline: `2px solid ${baseTokens.colors.navy[900]}`,
              outlineOffset: '2px',
            }}>
              Focus State
            </Button>
            <Button variant="contained" disabled>Disabled State</Button>
          </Stack>
        </Paper>
      </Grid>

      {/* Hover Effects */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Typography variant="h6" gutterBottom>Hover Effects</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Hover over these cards to see different effects
          </Typography>
          <Stack spacing={2}>
            <Card sx={{ p: 2, cursor: 'pointer', ...hoverEffect.lift }}>
              <Typography variant="subtitle2">Lift Effect</Typography>
              <Typography variant="caption" color="text.secondary">
                Subtle vertical lift with shadow
              </Typography>
            </Card>
            <Card sx={{ p: 2, cursor: 'pointer', ...hoverEffect.scale }}>
              <Typography variant="subtitle2">Scale Effect</Typography>
              <Typography variant="caption" color="text.secondary">
                Gentle scale increase
              </Typography>
            </Card>
            <Card sx={{ p: 2, cursor: 'pointer', ...hoverEffect.highlight }}>
              <Typography variant="subtitle2">Highlight Effect</Typography>
              <Typography variant="caption" color="text.secondary">
                Background color change
              </Typography>
            </Card>
          </Stack>
        </Paper>
      </Grid>
    </Grid>

    <Divider sx={{ my: 4 }} />

    <Typography variant="h6" gutterBottom>Focus Ring Accessibility</Typography>
    <Alert severity="warning" sx={{ mb: 2 }}>
      All interactive elements must have visible focus indicators for keyboard navigation (WCAG 2.4.7)
    </Alert>
    <Stack direction="row" spacing={2}>
      <Button variant="outlined">Tab to focus me</Button>
      <IconButton aria-label="Example icon button">
        <Visibility />
      </IconButton>
      <Chip label="Clickable chip" onClick={() => {}} />
    </Stack>
  </Box>
);

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive state hierarchy for hover, focus, active, and disabled states with accessible focus rings.',
      },
    },
  },
};

// ============================================
// CONTRAST HIERARCHY
// ============================================

const ContrastDemo: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <ContrastIcon /> Contrast Hierarchy
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Contrast hierarchy manages color intensity to guide attention while maintaining 
      accessibility (WCAG 2.1 AA minimum 4.5:1 for normal text, 3:1 for large text).
    </Typography>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, backgroundColor: 'white' }} elevation={0}>
          <Typography variant="h6" gutterBottom>Light Mode Contrast</Typography>
          <Stack spacing={2}>
            <Box sx={{ p: 2, backgroundColor: 'white', border: '1px solid #eee', borderRadius: 1 }}>
              <Typography sx={{ color: baseTokens.colors.navy[900], fontWeight: 600 }}>
                High Contrast (12.5:1) - Primary content
              </Typography>
            </Box>
            <Box sx={{ p: 2, backgroundColor: 'white', border: '1px solid #eee', borderRadius: 1 }}>
              <Typography sx={{ color: baseTokens.colors.gray[700] }}>
                Medium Contrast (7.5:1) - Body content
              </Typography>
            </Box>
            <Box sx={{ p: 2, backgroundColor: 'white', border: '1px solid #eee', borderRadius: 1 }}>
              <Typography sx={{ color: baseTokens.colors.gray[500] }}>
                Low Contrast (4.5:1) - Secondary content
              </Typography>
            </Box>
            <Box sx={{ p: 2, backgroundColor: 'white', border: '1px solid #eee', borderRadius: 1 }}>
              <Typography sx={{ color: baseTokens.colors.gray[400] }}>
                Subtle (3:1) - Disabled/decorative
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, backgroundColor: baseTokens.colors.gray[800] }} elevation={0}>
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Dark Mode Contrast
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ p: 2, backgroundColor: baseTokens.colors.gray[800], border: '1px solid #444', borderRadius: 1 }}>
              <Typography sx={{ color: baseTokens.colors.gray[50], fontWeight: 600 }}>
                High Contrast - Primary content
              </Typography>
            </Box>
            <Box sx={{ p: 2, backgroundColor: baseTokens.colors.gray[800], border: '1px solid #444', borderRadius: 1 }}>
              <Typography sx={{ color: baseTokens.colors.gray[200] }}>
                Medium Contrast - Body content
              </Typography>
            </Box>
            <Box sx={{ p: 2, backgroundColor: baseTokens.colors.gray[800], border: '1px solid #444', borderRadius: 1 }}>
              <Typography sx={{ color: baseTokens.colors.gray[400] }}>
                Low Contrast - Secondary content
              </Typography>
            </Box>
            <Box sx={{ p: 2, backgroundColor: baseTokens.colors.gray[800], border: '1px solid #444', borderRadius: 1 }}>
              <Typography sx={{ color: baseTokens.colors.gray[500] }}>
                Subtle - Disabled/decorative
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export const ContrastHierarchy: Story = {
  name: 'Contrast',
  render: () => <ContrastDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Contrast hierarchy for managing color intensity while ensuring WCAG accessibility compliance.',
      },
    },
  },
};

// ============================================
// UI PATTERNS
// ============================================

const PatternsDemo: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      UI Patterns (Layer 4)
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Pre-composed patterns that combine hierarchy principles into ready-to-use UI solutions.
    </Typography>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h6" gutterBottom>Interactive Card Pattern</Typography>
        <Card sx={uiPatterns.interactiveCard()}>
          <CardContent>
            <Typography variant="subtitle1">Clickable Card</Typography>
            <Typography variant="body2" color="text.secondary">
              Combines resting elevation, hover lift, and focus ring
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h6" gutterBottom>Primary Button Pattern</Typography>
        <Button 
          variant="contained" 
          sx={uiPatterns.primaryButton()}
        >
          Primary Action
        </Button>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>Section Pattern</Typography>
        <Box sx={{ ...uiPatterns.section(), backgroundColor: 'background.paper', borderRadius: 2, p: 3 }}>
          <Typography variant="h5">Section Title</Typography>
          <Typography variant="body1">
            This section uses the standard section spacing pattern with 
            proper vertical rhythm and content gaps.
          </Typography>
          <Button variant="outlined">Section Action</Button>
        </Box>
      </Grid>
    </Grid>

    <Divider sx={{ my: 4 }} />

    <Alert severity="success">
      <Typography variant="subtitle2" gutterBottom>
        Using UI Patterns
      </Typography>
      <Typography variant="body2">
        Import <code>uiPatterns</code> from <code>hierarchy.ts</code> and spread into your sx prop:
        <br />
        <code>{`<Card sx={uiPatterns.interactiveCard()}>...</Card>`}</code>
      </Typography>
    </Alert>
  </Box>
);

export const UIPatterns: Story = {
  render: () => <PatternsDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Pre-composed UI patterns that combine multiple hierarchy principles into ready-to-use solutions.',
      },
    },
  },
};
