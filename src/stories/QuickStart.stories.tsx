import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Divider, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

// ============================================================================
// HOISTED COMPONENTS - Defined outside render to avoid React Compiler errors
// ============================================================================

interface CodeBlockProps {
  children: string;
  language?: string;
  isDark: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, isDark }) => (
  <Paper
    component="pre"
    sx={{
      bgcolor: isDark ? '#0d1117' : '#1e1e1e',
      color: '#e6edf3',
      p: 2.5,
      borderRadius: 2,
      overflow: 'auto',
      fontSize: '0.875rem',
      fontFamily: '"Fira Code", Monaco, Consolas, monospace',
      m: 0,
      border: isDark ? '1px solid #30363d' : 'none',
      '& .keyword': { color: '#ff7b72' },
      '& .string': { color: '#a5d6ff' },
      '& .comment': { color: '#8b949e' },
    }}
  >
    <code>{children}</code>
  </Paper>
);

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <Typography
    variant="h5"
    sx={{
      fontWeight: 700,
      color: 'text.primary',
      mb: 2,
      mt: 4,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    }}
  >
    {children}
  </Typography>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

const QuickStartPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Chip
          label="5 Minute Guide"
          size="small"
          sx={{
            bgcolor: isDark ? '#238636' : '#2da44e',
            color: 'white',
            fontWeight: 600,
            mb: 2,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Quick Start
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '1.125rem', lineHeight: 1.7 }}>
          Get up and running with Trinity Design System in minutes.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Step 1: Install */}
      <SectionTitle>1. Install</SectionTitle>
      <CodeBlock isDark={isDark}>{`npm install @trinity/design-system @mui/material @emotion/react @emotion/styled`}</CodeBlock>

      {/* Step 2: Setup Theme */}
      <SectionTitle>2. Setup Theme</SectionTitle>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        Wrap your app with ThemeProvider:
      </Typography>
      <CodeBlock isDark={isDark}>{`// App.tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '@trinity/design-system';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <YourApp />
    </ThemeProvider>
  );
}`}</CodeBlock>

      {/* Step 3: Use Components */}
      <SectionTitle>3. Use Components</SectionTitle>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        Import and use components:
      </Typography>
      <CodeBlock isDark={isDark}>{`import { Button, Card, TextField } from '@mui/material';
import { StatusIndicator, Modal } from '@trinity/design-system';

function MyPage() {
  return (
    <Card sx={{ p: 3 }}>
      <TextField label="Name" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained">Save</Button>
      <StatusIndicator status="success" label="Active" />
    </Card>
  );
}`}</CodeBlock>

      <Divider sx={{ my: 5 }} />

      {/* Dark Mode */}
      <SectionTitle>🌙 Dark Mode</SectionTitle>
      <CodeBlock isDark={isDark}>{`import { lightTheme, darkTheme } from '@trinity/design-system';

const [dark, setDark] = useState(false);

<ThemeProvider theme={dark ? darkTheme : lightTheme}>
  <CssBaseline />
  <App />
</ThemeProvider>`}</CodeBlock>

      <Divider sx={{ my: 5 }} />

      {/* Key Components Table */}
      <SectionTitle>📦 Key Components</SectionTitle>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
              <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              ['TopNavHeader', 'Navigation header with search, user menu'],
              ['TopNavWithSidebar', 'Full layout with sidebar navigation'],
              ['StatusIndicator', 'Status badges (success, warning, error)'],
              ['Modal', 'Accessible dialog with variants'],
              ['FileUpload', 'Drag-and-drop file upload'],
              ['AIChat', 'AI chat interface'],
            ].map(([name, desc]) => (
              <TableRow key={name}>
                <TableCell>
                  <code style={{ 
                    backgroundColor: isDark ? '#30363d' : '#f0f0f0', 
                    padding: '2px 6px', 
                    borderRadius: 4,
                    fontSize: '0.85rem',
                  }}>
                    {name}
                  </code>
                </TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 5 }} />

      {/* Design Tokens */}
      <SectionTitle>🎨 Design Tokens</SectionTitle>
      <CodeBlock isDark={isDark}>{`import { baseTokens, semanticTokens } from '@trinity/design-system';

// Colors
baseTokens.colors.navy      // '#1B365D'
baseTokens.colors.coral     // '#FF6B47'

// Spacing
baseTokens.spacing[4]       // 16px

// Border Radius
baseTokens.borderRadius.lg  // 12px`}</CodeBlock>

      <Divider sx={{ my: 5 }} />

      {/* Accessible Colors */}
      <SectionTitle>♿ Accessible Colors</SectionTitle>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        Use pre-validated WCAG AA compliant color combinations:
      </Typography>
      <CodeBlock isDark={isDark}>{`import { accessibleCombinations } from '@trinity/design-system';

<Box sx={{
  backgroundColor: accessibleCombinations.whiteOnNavy.bg,
  color: accessibleCombinations.whiteOnNavy.text,
}}>
  WCAG AA Compliant
</Box>`}</CodeBlock>

      <Divider sx={{ my: 5 }} />

      {/* Next Steps */}
      <Paper
        sx={{
          p: 3,
          bgcolor: isDark ? 'rgba(56, 139, 253, 0.1)' : 'rgba(9, 105, 218, 0.1)',
          border: `1px solid ${isDark ? 'rgba(56, 139, 253, 0.4)' : 'rgba(9, 105, 218, 0.3)'}`,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
          📚 Next Steps
        </Typography>
        <Box component="ul" sx={{ color: 'text.secondary', m: 0, pl: 2.5 }}>
          <li style={{ marginBottom: 8 }}>
            <strong>Developer Guide</strong> - See the full documentation in the "Developer Guide" story
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Browse Components</strong> - Explore component stories in the sidebar
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Design Tokens</strong> - Check the Tokens section for all available values
          </li>
        </Box>
      </Paper>
    </Box>
  );
};

const meta: Meta = {
  title: 'Getting Started/Quick Start',
  component: QuickStartPage,
  parameters: {
    layout: 'padded',
    docs: {
      toc: true,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <QuickStartPage />,
};
