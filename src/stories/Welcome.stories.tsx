import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid, Chip, useTheme } from '@mui/material';
import { baseTokens, semanticTokens } from '../tokens';

// ============================================================================
// WELCOME PAGE - Landing Page for Trinity Design System
// ============================================================================

const WelcomePage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', fontFamily: 'Montserrat, sans-serif' }}>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          background: isDark 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
            : 'linear-gradient(135deg, #050742 0%, #0a0d5c 100%)',
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          mb: 5,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(120, 65, 201, 0.3)',
            filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255, 97, 80, 0.2)',
            filter: 'blur(50px)',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Chip
            label="v1.1.0"
            size="small"
            sx={{
              bgcolor: baseTokens.colors.coral[800],
              color: 'white',
              fontWeight: 600,
              mb: 3,
              fontSize: '0.75rem',
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              mb: 2,
              letterSpacing: '-1px',
            }}
          >
            Trinity Design System
          </Typography>

          <Typography
            sx={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
              maxWidth: 600,
              lineHeight: 1.7,
            }}
          >
            A React component library built on MUI v6/7 with Trinity branding, 
            WCAG 2.1 AA accessibility, and enterprise-grade patterns.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Chip label="MUI v6/7" sx={{ bgcolor: 'white', color: baseTokens.colors.navy[900], fontWeight: 600 }} />
            <Chip label="React + TypeScript" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }} />
            <Chip label="WCAG 2.1 AA" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }} />
          </Box>
        </Box>
      </Paper>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          { value: '50+', label: 'Components', color: baseTokens.colors.navy[900] },
          { value: '120+', label: 'Design Tokens', color: baseTokens.colors.purple[700] },
          { value: 'AA', label: 'WCAG Compliant', color: baseTokens.colors.coral[800] },
          { value: '74', label: 'Story Variants', color: semanticTokens.colors.status.success.text },
        ].map((stat) => (
          <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
                {stat.value}
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mt: 1 }}>
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Quick Links */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>
        Documentation
      </Typography>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            component="a"
            href="?path=/story/getting-started--default"
            sx={{
              p: 3,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              display: 'block',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)', boxShadow: 2 },
            }}
          >
            <Typography sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              📖 Getting Started
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              Installation, setup, and v1.1.0 component guide
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            component="a"
            href="?path=/story/tokens-colors--brand-colors"
            sx={{
              p: 3,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              display: 'block',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)', boxShadow: 2 },
            }}
          >
            <Typography sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              🎨 Design Tokens
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              Colors, spacing, typography, and more
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            component="a"
            href="?path=/story/accessibility--color-contrast"
            sx={{
              p: 3,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              display: 'block',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)', boxShadow: 2 },
            }}
          >
            <Typography sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              ♿ Accessibility
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              WCAG compliance and color contrast
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Component Categories */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>
        Component Categories
      </Typography>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {[
          { title: 'Inputs', desc: 'Button, TextField, SearchInput, FilterBar, Select', icon: '📝' },
          { title: 'Data Display', desc: 'DataCard, Timeline, DataTable, Charts, Chip', icon: '📊' },
          { title: 'Feedback', desc: 'Alert, Progress, Modal, Toast, StatusIndicator', icon: '💬' },
          { title: 'Navigation', desc: 'CommandPalette, Tabs, Menu, Breadcrumbs', icon: '🧭' },
          { title: 'Layout', desc: 'SplitPane, DockLayout, AppLayout, Grid', icon: '📐' },
          { title: 'Utilities', desc: 'DiffViewer, FileUpload, TreeView, TransferList', icon: '🛠️' },
        ].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
            <Paper
              sx={{
                p: 2.5,
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography sx={{ fontSize: '1.25rem', mb: 1 }}>{item.icon}</Typography>
              <Typography sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                {item.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Brand Palette */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>
        Brand Palette
      </Typography>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {[
          { name: 'Navy', color: baseTokens.colors.navy[900], hex: '#050742', role: 'Primary' },
          { name: 'Purple', color: baseTokens.colors.purple[700], hex: '#7841C9', role: 'Secondary' },
          { name: 'Coral', color: baseTokens.colors.coral[800], hex: '#FF6150', role: 'Accent' },
          { name: 'Azure', color: baseTokens.colors.azure[500], hex: '#27AAE1', role: 'Info' },
          { name: 'Emerald', color: semanticTokens.colors.status.success.text, hex: '#16A34A', role: 'Success' },
        ].map((item) => (
          <Grid size={{ xs: 6, sm: 2.4 }} key={item.name}>
            <Paper
              sx={{
                bgcolor: item.color,
                borderRadius: 3,
                p: 3,
                color: 'white',
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                {item.name}
              </Typography>
              <Typography sx={{ opacity: 0.8, fontSize: '0.75rem', mt: 0.5 }}>
                {item.hex}
              </Typography>
              <Typography sx={{ opacity: 0.7, fontSize: '0.7rem', mt: 1 }}>
                {item.role}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// ============================================================================
// STORYBOOK META
// ============================================================================

const meta: Meta<typeof WelcomePage> = {
  title: 'Welcome',
  component: WelcomePage,
  parameters: {
    layout: 'padded',
    docs: {
      page: null,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
