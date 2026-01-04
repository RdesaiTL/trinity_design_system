import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Divider, useTheme, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ============================================================================
// HOISTED COMPONENTS - Defined outside render to avoid React Compiler errors
// ============================================================================

interface CodeBlockProps {
  children: string;
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
      fontSize: '0.8rem',
      fontFamily: '"Fira Code", Monaco, Consolas, monospace',
      m: 0,
      border: isDark ? '1px solid #30363d' : 'none',
    }}
  >
    <code>{children}</code>
  </Paper>
);

interface SectionTitleProps {
  children: React.ReactNode;
  id?: string;
  isDark: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, id, isDark }) => (
  <Typography
    id={id}
    variant="h4"
    sx={{
      fontWeight: 700,
      color: 'text.primary',
      mb: 3,
      mt: 6,
      pb: 1,
      borderBottom: `2px solid ${isDark ? '#30363d' : '#e0e0e0'}`,
    }}
  >
    {children}
  </Typography>
);

interface SubSectionProps {
  children: React.ReactNode;
}

const SubSection: React.FC<SubSectionProps> = ({ children }) => (
  <Typography
    variant="h6"
    sx={{
      fontWeight: 600,
      color: 'text.primary',
      mb: 2,
      mt: 4,
    }}
  >
    {children}
  </Typography>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

const DeveloperGuidePage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Chip
          label="Complete Reference"
          size="small"
          sx={{
            bgcolor: isDark ? '#8957e5' : '#8250df',
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
          Developer Guide
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '1.125rem', lineHeight: 1.7 }}>
          Comprehensive guide for integrating Trinity Design System into your React applications.
        </Typography>
      </Box>

      {/* Table of Contents */}
      <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          📑 Table of Contents
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {['Installation', 'Theme Setup', 'Components', 'Design Tokens', 'Customization', 'Dark Mode', 'Accessibility', 'TypeScript'].map((item) => (
            <Chip
              key={item}
              label={item}
              size="small"
              variant="outlined"
              sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
            />
          ))}
        </Box>
      </Paper>

      <Divider />

      {/* Installation */}
      <SectionTitle isDark={isDark} id="installation">📦 Installation</SectionTitle>
      
      <SubSection>Prerequisites</SubSection>
      <Box component="ul" sx={{ color: 'text.secondary', mb: 3, pl: 3 }}>
        <li>Node.js 18.x or higher</li>
        <li>React 17.x, 18.x, or 19.x</li>
        <li>npm, yarn, or pnpm</li>
      </Box>

      <SubSection>Install the Package</SubSection>
      <CodeBlock isDark={isDark}>{`# npm
npm install @trinity/design-system

# yarn
yarn add @trinity/design-system

# pnpm
pnpm add @trinity/design-system`}</CodeBlock>

      <SubSection>Install Peer Dependencies</SubSection>
      <CodeBlock isDark={isDark}>{`npm install @mui/material @emotion/react @emotion/styled react react-dom`}</CodeBlock>

      {/* Theme Setup */}
      <SectionTitle isDark={isDark} id="theme-setup">🎨 Theme Setup</SectionTitle>

      <SubSection>Available Themes</SubSection>
      <CodeBlock isDark={isDark}>{`import { lightTheme, darkTheme } from '@trinity/design-system';`}</CodeBlock>

      <SubSection>Basic Setup</SubSection>
      <CodeBlock isDark={isDark}>{`// App.tsx
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '@trinity/design-system';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <YourApplication />
    </ThemeProvider>
  );
}

export default App;`}</CodeBlock>

      <SubSection>Creating a Custom Theme</SubSection>
      <CodeBlock isDark={isDark}>{`import { createTrinityTheme } from '@trinity/design-system';

const customTheme = createTrinityTheme({
  mode: 'light',
  primaryColor: '#1B365D',    // Navy (default)
  secondaryColor: '#FF6B47',  // Coral (default)
  // Override specific palette colors
  palette: {
    success: {
      main: '#2e7d32',
    },
  },
});`}</CodeBlock>

      {/* Components */}
      <SectionTitle isDark={isDark} id="components">🧩 Components</SectionTitle>

      <SubSection>Import Paths</SubSection>
      <CodeBlock isDark={isDark}>{`// Main entry - all exports
import { 
  lightTheme, 
  darkTheme,
  brandColors,
  StatusIndicator,
  Modal,
  FileUpload,
} from '@trinity/design-system';

// Theme only
import { lightTheme, darkTheme } from '@trinity/design-system/theme';

// Tokens only
import { baseTokens, semanticTokens } from '@trinity/design-system/tokens';

// Specific components
import { StatusIndicator } from '@trinity/design-system/components/StatusIndicator';
import { AIChat, AIPromptInput } from '@trinity/design-system/components/AI';`}</CodeBlock>

      {/* Component Accordion */}
      <Box sx={{ mt: 4 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>TopNavHeader</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              Enterprise navigation header with client selector, search, apps menu, and user profile.
            </Typography>
            <CodeBlock isDark={isDark}>{`import { TopNavHeader } from '@trinity/design-system';

<TopNavHeader
  clients={[
    { id: '1', name: 'Acme Corporation' },
    { id: '2', name: 'Global Industries' },
  ]}
  selectedClientId="1"
  onClientChange={(clientId) => handleClientChange(clientId)}
  searchValue={searchQuery}
  onSearchChange={(value) => setSearchQuery(value)}
  user={{
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatarUrl: '/avatars/john.jpg',
  }}
  onLogout={() => auth.logout()}
/>`}</CodeBlock>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>StatusIndicator</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              Visual status badges for displaying state.
            </Typography>
            <CodeBlock isDark={isDark}>{`import { StatusIndicator } from '@trinity/design-system';

<StatusIndicator status="success" label="Active" />
<StatusIndicator status="warning" label="Pending" />
<StatusIndicator status="error" label="Failed" />
<StatusIndicator status="info" label="Processing" />

// Variants
<StatusIndicator status="success" variant="dot" />
<StatusIndicator status="success" variant="badge" />
<StatusIndicator status="success" variant="pill" />`}</CodeBlock>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>Modal</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              Accessible dialog with multiple variants.
            </Typography>
            <CodeBlock isDark={isDark}>{`import { Modal } from '@trinity/design-system';

// Basic modal
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profile"
  primaryAction="Save"
  onPrimaryAction={handleSave}
  secondaryAction="Cancel"
>
  <TextField label="Name" fullWidth />
</Modal>

// Danger confirmation
<Modal
  open={showDeleteConfirm}
  variant="danger"
  title="Delete Item"
  primaryAction="Delete"
  onPrimaryAction={handleDelete}
>
  Are you sure? This action cannot be undone.
</Modal>`}</CodeBlock>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>FileUpload</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              Drag-and-drop file upload with progress indicators.
            </Typography>
            <CodeBlock isDark={isDark}>{`import { FileUpload } from '@trinity/design-system';

<FileUpload
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  maxFiles={5}
  onFilesChange={(files) => setUploadedFiles(files)}
  onUpload={async (file) => {
    await uploadToServer(file);
  }}
  helperText="Drag files here or click to browse"
/>`}</CodeBlock>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>AI Components</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              AI chat interface and prompt input components.
            </Typography>
            <CodeBlock isDark={isDark}>{`import { AIChat, AIPromptInput } from '@trinity/design-system';

// Full chat interface
<AIChat
  messages={messages}
  onSendMessage={(text) => handleSend(text)}
  isLoading={isProcessing}
  placeholder="Ask me anything..."
/>

// Standalone prompt input
<AIPromptInput
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  onSubmit={() => handleSubmit(prompt)}
  loading={isGenerating}
/>`}</CodeBlock>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Design Tokens */}
      <SectionTitle isDark={isDark} id="design-tokens">🎯 Design Tokens</SectionTitle>

      <SubSection>Base Tokens</SubSection>
      <CodeBlock isDark={isDark}>{`import { baseTokens } from '@trinity/design-system';

// Colors
baseTokens.colors.navy        // '#1B365D'
baseTokens.colors.coral       // '#FF6B47'
baseTokens.colors.sky         // '#4A90D9'
baseTokens.colors.success     // '#4CAF50'

// Spacing (in pixels)
baseTokens.spacing[1]   // 4
baseTokens.spacing[2]   // 8
baseTokens.spacing[4]   // 16
baseTokens.spacing[6]   // 24
baseTokens.spacing[8]   // 32

// Border Radius
baseTokens.borderRadius.sm    // 4
baseTokens.borderRadius.md    // 8
baseTokens.borderRadius.lg    // 12
baseTokens.borderRadius.xl    // 16
baseTokens.borderRadius.full  // 9999

// Typography
baseTokens.typography.fontFamily  // 'Montserrat, sans-serif'`}</CodeBlock>

      <SubSection>Semantic Tokens</SubSection>
      <CodeBlock isDark={isDark}>{`import { semanticTokens } from '@trinity/design-system';

// Backgrounds
semanticTokens.background.primary    // Navy
semanticTokens.background.secondary  // Coral
semanticTokens.background.surface    // White/Dark surface

// Text colors
semanticTokens.text.primary      // Primary text
semanticTokens.text.secondary    // Secondary/muted text
semanticTokens.text.onPrimary    // Text on primary background

// Status colors
semanticTokens.status.success
semanticTokens.status.warning
semanticTokens.status.error
semanticTokens.status.info`}</CodeBlock>

      {/* Customization */}
      <SectionTitle isDark={isDark} id="customization">⚙️ Customization</SectionTitle>

      <SubSection>Overriding Component Styles</SubSection>
      <CodeBlock isDark={isDark}>{`// Using sx prop
<Button
  variant="contained"
  sx={{
    borderRadius: '20px',
    textTransform: 'uppercase',
    fontWeight: 700,
  }}
>
  Custom Button
</Button>

// Using styled()
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(2, 4),
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));`}</CodeBlock>

      <SubSection>Theme Component Overrides</SubSection>
      <CodeBlock isDark={isDark}>{`import { createTrinityTheme } from '@trinity/design-system';

const theme = createTrinityTheme({
  mode: 'light',
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Override pill shape
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});`}</CodeBlock>

      {/* Dark Mode */}
      <SectionTitle isDark={isDark} id="dark-mode">🌙 Dark Mode</SectionTitle>

      <SubSection>Basic Implementation</SubSection>
      <CodeBlock isDark={isDark}>{`import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@trinity/design-system';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Toggle Theme
      </button>
      <YourApplication />
    </ThemeProvider>
  );
}`}</CodeBlock>

      <SubSection>System Preference Detection</SubSection>
      <CodeBlock isDark={isDark}>{`import { useMediaQuery } from '@mui/material';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}`}</CodeBlock>

      {/* Accessibility */}
      <SectionTitle isDark={isDark} id="accessibility">♿ Accessibility</SectionTitle>

      <SubSection>Pre-validated Color Combinations</SubSection>
      <CodeBlock isDark={isDark}>{`import { accessibleCombinations } from '@trinity/design-system';

// Pre-validated WCAG AA compliant text/background pairs
accessibleCombinations.whiteOnNavy    // { bg: '#1B365D', text: '#FFFFFF' }
accessibleCombinations.navyOnWhite    // { bg: '#FFFFFF', text: '#1B365D' }
accessibleCombinations.coralOnWhite   // { bg: '#FFFFFF', text: '#FF6B47' }

// Usage
<Box sx={{ 
  backgroundColor: accessibleCombinations.whiteOnNavy.bg,
  color: accessibleCombinations.whiteOnNavy.text,
}}>
  Accessible text
</Box>`}</CodeBlock>

      <SubSection>Validate Custom Colors</SubSection>
      <CodeBlock isDark={isDark}>{`import { getContrastRatio, validateAccessibility } from '@trinity/design-system';

// Check contrast ratio
const ratio = getContrastRatio('#1B365D', '#FFFFFF'); // Returns ~12.5

// Validate against WCAG standards
const result = validateAccessibility('#1B365D', '#FFFFFF');
// Returns: { aa: true, aaa: true, ratio: 12.5 }`}</CodeBlock>

      {/* TypeScript */}
      <SectionTitle isDark={isDark} id="typescript">📘 TypeScript</SectionTitle>

      <SubSection>Component Props</SubSection>
      <CodeBlock isDark={isDark}>{`import type {
  ModalProps,
  StatusIndicatorProps,
  FileUploadProps,
  TopNavHeaderProps,
} from '@trinity/design-system';

// Use types for custom wrappers
interface MyModalProps extends Omit<ModalProps, 'open' | 'onClose'> {
  customProp: string;
}`}</CodeBlock>

      <SubSection>Extending Theme Types</SubSection>
      <CodeBlock isDark={isDark}>{`// types/theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brand: Palette['primary'];
  }
  interface PaletteOptions {
    brand?: PaletteOptions['primary'];
  }
}`}</CodeBlock>

      {/* Footer */}
      <Divider sx={{ my: 5 }} />
      <Paper
        sx={{
          p: 3,
          bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography sx={{ color: 'text.secondary' }}>
          📖 Full documentation available at{' '}
          <code style={{ 
            backgroundColor: isDark ? '#30363d' : '#f0f0f0', 
            padding: '2px 6px', 
            borderRadius: 4,
          }}>
            docs/DEVELOPER_GUIDE.md
          </code>
        </Typography>
      </Paper>
    </Box>
  );
};

const meta: Meta = {
  title: 'Getting Started/Developer Guide',
  component: DeveloperGuidePage,
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
  render: () => <DeveloperGuidePage />,
};
