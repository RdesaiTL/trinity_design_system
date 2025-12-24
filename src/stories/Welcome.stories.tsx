import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid, Chip, useTheme } from '@mui/material';

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
            label="Design System v1.0"
            size="small"
            sx={{
              bgcolor: '#FF6150',
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
            Trinity
            <br />
            Design System
          </Typography>

          <Typography
            sx={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
              maxWidth: 500,
              lineHeight: 1.7,
            }}
          >
            A comprehensive React component library built on MUI, designed for
            Trinity Life Sciences applications.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Chip
              label="MUI v6/7"
              sx={{
                bgcolor: 'white',
                color: '#050742',
                fontWeight: 600,
              }}
            />
            <Chip
              label="React + TypeScript"
              variant="outlined"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: 'white',
              }}
            />
            <Chip
              label="WCAG 2.1 AA"
              variant="outlined"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: 'white',
              }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          { value: '40+', label: 'Components', color: '#050742' },
          { value: '100+', label: 'Design Tokens', color: '#7841C9' },
          { value: 'AA', label: 'WCAG Compliant', color: '#FF6150' },
          { value: '2', label: 'Theme Modes', color: '#1DC286' },
        ].map((stat) => (
          <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography
                sx={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: isDark ? stat.color : stat.color,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  mt: 1,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Feature Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 4,
              height: '100%',
              background: isDark
                ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                : 'linear-gradient(135deg, #050742 0%, #0a0d5c 100%)',
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#FF6150',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                mb: 2.5,
              }}
            >
              🎨
            </Box>
            <Typography
              variant="h6"
              sx={{ color: 'white', fontWeight: 600, mb: 1.5 }}
            >
              Design Tokens
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
              Three-tier token architecture: base primitives, semantic aliases,
              and component-specific tokens.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 4,
              height: '100%',
              background: 'linear-gradient(135deg, #7841C9 0%, #9b6dd4 100%)',
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: 'rgba(255,255,255,0.2)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                mb: 2.5,
              }}
            >
              ♿
            </Box>
            <Typography
              variant="h6"
              sx={{ color: 'white', fontWeight: 600, mb: 1.5 }}
            >
              Accessibility First
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.7 }}>
              All components meet WCAG 2.1 AA standards with tested color
              combinations and keyboard navigation.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 4,
              height: '100%',
              bgcolor: 'background.paper',
              borderRadius: 3,
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#050742',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                mb: 2.5,
              }}
            >
              🧩
            </Box>
            <Typography
              variant="h6"
              sx={{ color: 'text.primary', fontWeight: 600, mb: 1.5 }}
            >
              MUI Components
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              Pre-configured Material UI components with Trinity theming. Just
              import and use.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 4,
              height: '100%',
              bgcolor: 'background.paper',
              borderRadius: 3,
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#1DC286',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                mb: 2.5,
              }}
            >
              ⚡
            </Box>
            <Typography
              variant="h6"
              sx={{ color: 'text.primary', fontWeight: 600, mb: 1.5 }}
            >
              Ready Patterns
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              Common UI patterns like data tables, empty states, modals, and
              page headers ready for production.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Brand Colors */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}
      >
        Brand Palette
      </Typography>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {[
          { name: 'Navy', hex: '#050742', role: 'Primary' },
          { name: 'Purple', hex: '#7841C9', role: 'Secondary' },
          { name: 'Coral', hex: '#FF6150', role: 'Accent' },
          { name: 'Azure', hex: '#27AAE1', role: 'Info' },
          { name: 'Emerald', hex: '#1DC286', role: 'Success' },
        ].map((color) => (
          <Grid size={{ xs: 6, sm: 2.4 }} key={color.name}>
            <Paper
              sx={{
                bgcolor: color.hex,
                borderRadius: 3,
                p: 3,
                color: 'white',
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                {color.name}
              </Typography>
              <Typography sx={{ opacity: 0.8, fontSize: '0.75rem', mt: 0.5 }}>
                {color.hex}
              </Typography>
              <Typography sx={{ opacity: 0.7, fontSize: '0.7rem', mt: 1 }}>
                {color.role}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Explore */}
      <Paper
        sx={{
          p: 4,
          bgcolor: isDark ? 'background.paper' : 'grey.50',
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}
        >
          📚 Documentation
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            { title: '🚀 Quick Start', desc: 'Get running in 5 minutes', link: '?path=/story/getting-started-quick-start--default' },
            { title: '📖 Developer Guide', desc: 'Complete integration reference', link: '?path=/story/getting-started-developer-guide--default' },
            { title: '🎨 Design Tokens', desc: 'Colors, spacing, typography', link: '?path=/story/tokens-colors--brand-colors' },
          ].map((item) => (
            <Grid size={{ xs: 12, sm: 4 }} key={item.title}>
              <Paper
                component="a"
                href={item.link}
                sx={{
                  p: 2.5,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'divider',
                  display: 'block',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                }}
              >
                <Typography
                  sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}
        >
          🧩 Explore Components
        </Typography>
        <Grid container spacing={2}>
          {[
            { title: 'Inputs', desc: 'Button, TextField, Switch, Slider' },
            { title: 'Data Display', desc: 'Avatar, Chip, Table, Tooltip' },
            { title: 'Feedback', desc: 'Alert, Progress, Modal, Loader' },
            { title: 'Navigation', desc: 'Tabs, Menu, Breadcrumbs, TopNav' },
            { title: 'AI Components', desc: 'Chat, Suggestions, AI Labels' },
            { title: 'Layout', desc: 'Grid, Container, TopNavWithSidebar' },
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
                <Typography
                  sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
        <Typography variant="body2">
          Built with ❤️ by Trinity Life Sciences
        </Typography>
      </Box>
    </Box>
  );
};

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
