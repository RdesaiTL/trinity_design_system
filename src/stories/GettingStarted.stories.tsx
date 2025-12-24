import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid, Chip, useTheme, Divider } from '@mui/material';

const GettingStartedPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const CodeBlock = ({ children }: { children: string }) => (
    <Paper
      component="pre"
      sx={{
        bgcolor: isDark ? '#1e1e1e' : '#1e1e1e',
        color: '#d4d4d4',
        p: 2,
        borderRadius: 2,
        overflow: 'auto',
        fontSize: '0.875rem',
        fontFamily: 'Monaco, Consolas, monospace',
        m: 0,
      }}
    >
      <code>{children}</code>
    </Paper>
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', fontFamily: 'Montserrat, sans-serif' }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          mb: 2,
          fontSize: '2.5rem',
        }}
      >
        Getting Started
      </Typography>
      <Typography
        sx={{ color: 'text.secondary', mb: 5, fontSize: '1.125rem', lineHeight: 1.7 }}
      >
        Get up and running with the Trinity Design System in minutes.
      </Typography>

      {/* Prerequisites */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
      >
        Prerequisites
      </Typography>
      <Box component="ul" sx={{ color: 'text.secondary', mb: 4, pl: 3 }}>
        <li>Node.js 18+ installed</li>
        <li>npm or yarn package manager</li>
        <li>Basic knowledge of React and TypeScript</li>
      </Box>

      {/* Installation */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
      >
        Installation
      </Typography>
      <Box sx={{ mb: 2 }}>
        <CodeBlock>npm install @trinity/design-system</CodeBlock>
      </Box>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        Or with yarn:
      </Typography>
      <Box sx={{ mb: 4 }}>
        <CodeBlock>yarn add @trinity/design-system</CodeBlock>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Setup */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
      >
        Setup
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2, mt: 3 }}
      >
        1. Import the Theme Provider
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        Wrap your application with the Trinity theme provider:
      </Typography>
      <Box sx={{ mb: 4 }}>
        <CodeBlock>{`import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@trinity/design-system';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}`}</CodeBlock>
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
      >
        2. Import Components
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        Use Trinity components directly from MUI - they're already styled:
      </Typography>
      <Box sx={{ mb: 4 }}>
        <CodeBlock>{`import { Button, TextField, Card } from '@mui/material';

function MyComponent() {
  return (
    <Card>
      <TextField label="Email" fullWidth />
      <Button variant="contained">Submit</Button>
    </Card>
  );
}`}</CodeBlock>
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
      >
        3. Use Design Tokens
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        Import tokens for custom styling:
      </Typography>
      <Box sx={{ mb: 4 }}>
        <CodeBlock>{`import { tokens } from '@trinity/design-system';

const MyStyledComponent = styled('div')({
  padding: tokens.spacing[4],           // 16px
  borderRadius: tokens.borderRadius.md, // 8px
  color: tokens.colors.navy[900],       // #050742
});`}</CodeBlock>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Token System */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}
      >
        Token System
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3 }}>
        The design system uses a three-tier token architecture:
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              borderLeft: 4,
              borderColor: '#050742',
              bgcolor: isDark ? 'background.paper' : '#f0f4ff',
            }}
          >
            <Typography sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
              Base Tokens
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              Raw values like colors.navy[900], spacing[4], fontSize.lg
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              borderLeft: 4,
              borderColor: '#7841C9',
              bgcolor: isDark ? 'background.paper' : '#f5f0ff',
            }}
          >
            <Typography sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
              Semantic Tokens
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              Contextual aliases like colors.text.primary, colors.background.paper
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              borderLeft: 4,
              borderColor: '#FF6150',
              bgcolor: isDark ? 'background.paper' : '#fff5f4',
            }}
          >
            <Typography sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
              Component Tokens
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              Component-specific like button.borderRadius, input.height.sm
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Available Tokens */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}
      >
        Available Tokens
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
      >
        Colors
      </Typography>
      <Box sx={{ mb: 3 }}>
        <CodeBlock>{`tokens.colors.navy[900]    // #050742 - Primary brand
tokens.colors.purple[500]  // #7841C9 - Secondary
tokens.colors.coral[500]   // #FF6150 - Accent
tokens.colors.azure[500]   // #27AAE1 - Info
tokens.colors.emerald[500] // #1DC286 - Success`}</CodeBlock>
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
      >
        Spacing
      </Typography>
      <Box sx={{ mb: 3 }}>
        <CodeBlock>{`tokens.spacing[1]  // 4px
tokens.spacing[2]  // 8px
tokens.spacing[3]  // 12px
tokens.spacing[4]  // 16px
tokens.spacing[6]  // 24px
tokens.spacing[8]  // 32px`}</CodeBlock>
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
      >
        Border Radius
      </Typography>
      <Box sx={{ mb: 3 }}>
        <CodeBlock>{`tokens.borderRadius.none  // 0px
tokens.borderRadius.sm    // 4px
tokens.borderRadius.md    // 8px
tokens.borderRadius.lg    // 12px
tokens.borderRadius.xl    // 16px
tokens.borderRadius.full  // 9999px (pill)`}</CodeBlock>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Accessibility */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
      >
        Accessibility
      </Typography>
      <Paper
        sx={{
          p: 3,
          bgcolor: isDark ? 'rgba(29, 194, 134, 0.1)' : '#e8f5e9',
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography
          sx={{ fontWeight: 600, color: '#1b5e20', mb: 1.5 }}
        >
          ✓ Built-in Accessibility
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5, color: '#2e7d32' }}>
          <li>Color contrast ratios of 4.5:1 or higher</li>
          <li>Focus indicators on all interactive elements</li>
          <li>ARIA labels and roles where needed</li>
          <li>Keyboard navigation support</li>
          <li>Screen reader compatible</li>
        </Box>
      </Paper>

      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        Use the accessibleCombinations export for safe color pairings:
      </Typography>
      <Box sx={{ mb: 4 }}>
        <CodeBlock>{`import { accessibleCombinations } from '@trinity/design-system';

<Box sx={{
  backgroundColor: accessibleCombinations.whiteOnNavy.bg,
  color: accessibleCombinations.whiteOnNavy.text,
}}>
  Accessible text on Navy background
</Box>`}</CodeBlock>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Ready to build */}
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: isDark ? 'background.paper' : 'grey.50',
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
        >
          Ready to build?
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Start exploring components in the sidebar →
        </Typography>
      </Paper>
    </Box>
  );
};

const meta: Meta<typeof GettingStartedPage> = {
  title: 'Getting Started',
  component: GettingStartedPage,
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
