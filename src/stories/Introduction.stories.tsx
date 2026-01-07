import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Divider, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material';

// ============================================================================
// CODE BLOCK COMPONENT
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

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

interface SectionProps {
  title: string;
  id?: string;
  children: React.ReactNode;
  isDark: boolean;
}

const Section: React.FC<SectionProps> = ({ title, id, children, isDark }) => (
  <Box sx={{ mb: 6 }}>
    <Typography
      id={id}
      variant="h4"
      sx={{
        fontWeight: 700,
        color: 'text.primary',
        mb: 3,
        pb: 1,
        borderBottom: `2px solid ${isDark ? '#30363d' : '#e0e0e0'}`,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

interface SubSectionProps {
  title: string;
  children: React.ReactNode;
}

const SubSection: React.FC<SubSectionProps> = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        color: 'text.primary',
        mb: 2,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

const IntroductionPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Trinity Design System
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '1.125rem', lineHeight: 1.7 }}>
          A React component library built on MUI v6/7 with Trinity branding, WCAG 2.1 AA accessibility, and enterprise-grade patterns.
        </Typography>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* ================================================================== */}
      {/* OVERVIEW */}
      {/* ================================================================== */}
      <Section title="Overview" id="overview" isDark={isDark}>
        <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
          This design system provides:
        </Typography>
        <Box component="ul" sx={{ color: 'text.secondary', pl: 3, mb: 3 }}>
          <li><strong>Pre-configured MUI themes</strong> – Light and dark themes with Trinity branding applied to all MUI components.</li>
          <li><strong>Design tokens</strong> – A three-tier token system (base, semantic, component) for consistent styling.</li>
          <li><strong>Custom components</strong> – Enterprise patterns like StatusIndicator, Modal, FileUpload, and navigation layouts.</li>
          <li><strong>Accessibility utilities</strong> – Pre-validated color combinations and contrast checking functions.</li>
        </Box>
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Architecture:</strong> Standard MUI components receive Trinity styling automatically via theme overrides. 
          Custom components extend MUI for patterns not covered by the base library.
        </Alert>
      </Section>

      {/* ================================================================== */}
      {/* INSTALLATION */}
      {/* ================================================================== */}
      <Section title="Installation" id="installation" isDark={isDark}>
        <SubSection title="Requirements">
          <Box component="ul" sx={{ color: 'text.secondary', pl: 3 }}>
            <li>Node.js 18.x or higher</li>
            <li>React 17.x, 18.x, or 19.x</li>
            <li>npm, yarn, or pnpm</li>
          </Box>
        </SubSection>

        <SubSection title="Install Package">
          <CodeBlock isDark={isDark}>{`npm install @trinity/design-system`}</CodeBlock>
        </SubSection>

        <SubSection title="Peer Dependencies">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            The following peer dependencies must be installed:
          </Typography>
          <CodeBlock isDark={isDark}>{`npm install @mui/material @emotion/react @emotion/styled`}</CodeBlock>
        </SubSection>
      </Section>

      {/* ================================================================== */}
      {/* THEME SETUP */}
      {/* ================================================================== */}
      <Section title="Theme Setup" id="theme-setup" isDark={isDark}>
        <SubSection title="Basic Configuration">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Wrap your application root with ThemeProvider and CssBaseline:
          </Typography>
          <CodeBlock isDark={isDark}>{`import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '@trinity/design-system';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <YourApplication />
    </ThemeProvider>
  );
}`}</CodeBlock>
        </SubSection>

        <SubSection title="Dark Mode">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Toggle between light and dark themes:
          </Typography>
          <CodeBlock isDark={isDark}>{`import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@trinity/design-system';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <YourApplication />
    </ThemeProvider>
  );
}`}</CodeBlock>
        </SubSection>

        <SubSection title="System Preference Detection">
          <CodeBlock isDark={isDark}>{`import { useMediaQuery } from '@mui/material';
import { lightTheme, darkTheme } from '@trinity/design-system';

function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <YourApplication />
    </ThemeProvider>
  );
}`}</CodeBlock>
        </SubSection>
      </Section>

      {/* ================================================================== */}
      {/* USING COMPONENTS */}
      {/* ================================================================== */}
      <Section title="Using Components" id="using-components" isDark={isDark}>
        <SubSection title="MUI Components">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Standard MUI components receive Trinity styling automatically when wrapped in ThemeProvider:
          </Typography>
          <CodeBlock isDark={isDark}>{`import { Button, TextField, Card, CardContent } from '@mui/material';

function MyForm() {
  return (
    <Card>
      <CardContent>
        <TextField label="Email" fullWidth sx={{ mb: 2 }} />
        <Button variant="contained">Submit</Button>
      </CardContent>
    </Card>
  );
}`}</CodeBlock>
        </SubSection>

        <SubSection title="Custom Components">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Import Trinity-specific components directly:
          </Typography>
          <CodeBlock isDark={isDark}>{`import { 
  // Layout & Navigation
  AppLayout,
  CommandPalette,
  SplitPane,
  DockLayout,
  TopNavHeader,
  
  // Templates (v1.1.0)
  LandingPage,
  FeatureCard,
  Footer,
  
  // Data Display
  DataCard,
  DataTable,
  Timeline,
  DiffViewer,
  
  // Inputs & Feedback
  SearchInput,
  Combobox,
  FilterBar,
  Modal,
  StatusIndicator,
} from '@trinity/design-system';`}</CodeBlock>
        </SubSection>

        <SubSection title="Available Custom Components">
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  ['AppLayout', 'Full application shell with sidebar, header, and AI integration'],
                  ['Combobox', 'Enhanced autocomplete with multi-select, groups, and create option'],
                  ['CommandPalette', 'Keyboard-driven command interface (⌘K) with search'],
                  ['DataCard', 'Metric cards with trends, sparklines, and comparison indicators'],
                  ['DataTable', 'Enhanced table with sorting, pagination, and selection'],
                  ['DiffViewer', 'Side-by-side and unified code/text diff viewer'],
                  ['DockLayout', 'VS Code-style dockable panel layout system'],
                  ['FeatureCard', 'Feature cards with gradient icons for landing pages'],
                  ['FileUpload', 'Drag-and-drop file upload with progress tracking'],
                  ['FilterBar', 'Composable filter bar with presets and quick filters'],
                  ['Footer', 'Responsive footer with multi-column links and social icons'],
                  ['LandingPage', 'Hero + feature grid template with background options'],
                  ['Modal', 'Accessible dialog with confirmation, danger, and custom variants'],
                  ['SearchInput', 'Search with suggestions, recent searches, and ⌘K shortcut'],
                  ['SplitPane', 'Resizable split layouts with collapsible panels'],
                  ['StatusIndicator', 'Unified status with icon, shape, chip, badge variants'],
                  ['Timeline', 'Activity feeds, audit logs, and historical data display'],
                  ['TopNavHeader', 'Navigation header with client selector, search, apps menu'],
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
        </SubSection>
      </Section>

      {/* ================================================================== */}
      {/* DESIGN TOKENS */}
      {/* ================================================================== */}
      <Section title="Design Tokens" id="design-tokens" isDark={isDark}>
        <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
          The token system has three tiers:
        </Typography>
        
        <Box component="ul" sx={{ color: 'text.secondary', pl: 3, mb: 4 }}>
          <li><strong>Base tokens</strong> – Primitive values (colors, spacing, typography, border radius)</li>
          <li><strong>Semantic tokens</strong> – Contextual aliases (brand colors, status colors, text/background colors)</li>
          <li><strong>Component tokens</strong> – Component-specific values (button radius, input height)</li>
        </Box>

        <SubSection title="Base Tokens">
          <CodeBlock isDark={isDark}>{`import { baseTokens } from '@trinity/design-system';

// Colors (with shade scales 50-900)
baseTokens.colors.navy[900]     // '#050742' - Primary Navy
baseTokens.colors.purple[700]   // '#7841C9' - Primary Purple
baseTokens.colors.coral[800]    // '#FF6150' - Primary Coral
baseTokens.colors.azure[500]    // '#27AAE1' - Primary Azure
baseTokens.colors.gray[500]     // '#6B7280' - Mid Gray

// Spacing (in pixels)
baseTokens.spacing[1]   // 4
baseTokens.spacing[2]   // 8
baseTokens.spacing[4]   // 16
baseTokens.spacing[6]   // 24
baseTokens.spacing[8]   // 32

// Border Radius
baseTokens.borderRadius.none  // 0
baseTokens.borderRadius.sm    // 6
baseTokens.borderRadius.md    // 8
baseTokens.borderRadius.lg    // 12
baseTokens.borderRadius.xl    // 16
baseTokens.borderRadius.full  // 9999 (pill)

// Typography
baseTokens.fontSize.sm    // '0.875rem' (14px)
baseTokens.fontSize.base  // '1rem' (16px)
baseTokens.fontSize.lg    // '1.125rem' (18px)
baseTokens.fontWeight.medium   // 500
baseTokens.fontWeight.semibold // 600
baseTokens.fontWeight.bold     // 700`}</CodeBlock>
        </SubSection>

        <SubSection title="Semantic Tokens">
          <CodeBlock isDark={isDark}>{`import { semanticTokens } from '@trinity/design-system';

// Brand Colors
semanticTokens.colors.brand.primary    // Navy (#050742)
semanticTokens.colors.brand.secondary  // Purple (#7841C9)
semanticTokens.colors.brand.accent     // Coral (#FF6150)

// Text Colors
semanticTokens.colors.text.primary     // Primary text color
semanticTokens.colors.text.secondary   // Muted text color
semanticTokens.colors.text.disabled    // Disabled text color

// Background Colors
semanticTokens.colors.background.primary   // Primary background
semanticTokens.colors.background.secondary // Secondary background
semanticTokens.colors.background.brand     // Brand colored background

// Status Colors
semanticTokens.colors.status.success.text       // '#16A34A'
semanticTokens.colors.status.success.background // '#F0FDF4'
semanticTokens.colors.status.error.text         // '#DC2626'
semanticTokens.colors.status.error.background   // '#FEF2F2'
semanticTokens.colors.status.warning.text       // '#D97706'
semanticTokens.colors.status.info.text          // Azure`}</CodeBlock>
        </SubSection>

        <SubSection title="Semantic Effects (v1.1.0)">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            New intent-based effect tokens for overlays, shadows, and on-dark text:
          </Typography>
          <CodeBlock isDark={isDark}>{`import { semanticTokens } from '@trinity/design-system';

// Overlay effects for interaction states
semanticTokens.effects.overlay.scrim      // Modal backdrop (50% black)
semanticTokens.effects.overlay.hover      // Standard hover (8% black)
semanticTokens.effects.overlay.pressed    // Pressed state (12% black)

// White text on dark backgrounds
semanticTokens.effects.onDark.primary     // 87% white (high emphasis)
semanticTokens.effects.onDark.secondary   // 70% white (medium emphasis)
semanticTokens.effects.onDark.tertiary    // 50% white (low emphasis)

// Shadow effects
semanticTokens.effects.shadow.surface     // Resting card elevation
semanticTokens.effects.shadow.floating    // Dropdown/popover
semanticTokens.effects.shadow.dialog      // Modal dialogs

// Dense typography for compact UI
semanticTokens.typography.dense.badge     // 10px - badge counts
semanticTokens.typography.dense.text      // 12px - metadata`}</CodeBlock>
        </SubSection>

        <Alert severity="warning" sx={{ mt: 3 }}>
          <strong>Governance Rule:</strong> Use semantic tokens for UI elements. Base tokens are for reference or when no semantic token exists. 
          Do not hardcode hex values outside of token definitions.
        </Alert>
      </Section>

      {/* ================================================================== */}
      {/* ASSET LIBRARY (v1.1.0) */}
      {/* ================================================================== */}
      <Section title="Asset Library" id="assets" isDark={isDark}>
        <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
          v1.1.0 includes a curated asset library for marketing pages and branded content:
        </Typography>

        <SubSection title="Gradient Icons (38 SVGs)">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Brand-aligned gradient icons for feature cards and landing pages:
          </Typography>
          <CodeBlock isDark={isDark}>{`import { gradientIcons } from '@trinity/design-system';

// Available icons: ai, insights, strategy, launch, growth, etc.
<img src={gradientIcons.iconAi} alt="AI" width={64} />
<img src={gradientIcons.iconInsights} alt="Insights" width={64} />`}</CodeBlock>
        </SubSection>

        <SubSection title="Brand Gradients (18 images)">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Light and dark brand gradient backgrounds:
          </Typography>
          <CodeBlock isDark={isDark}>{`import { brandGradients } from '@trinity/design-system';

// Light variants (10)
brandGradients.light.gradient1  // through gradient10

// Dark variants (8)
brandGradients.dark.gradient1   // through gradient8

// Usage as hero background
<Box sx={{ backgroundImage: \`url(\${brandGradients.light.gradient1})\` }} />`}</CodeBlock>
        </SubSection>

        <SubSection title="Background Images (27 images)">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Smooth abstract and technology/human themed backgrounds:
          </Typography>
          <CodeBlock isDark={isDark}>{`import { backgroundImages } from '@trinity/design-system';

// Smooth abstract (14)
backgroundImages.smoothAbstract.abstract1  // through abstract14

// Technology & Human (13)
backgroundImages.techHuman.th1  // through th13`}</CodeBlock>
        </SubSection>

        <Alert severity="info" sx={{ mt: 3 }}>
          <strong>Storybook:</strong> Browse all assets visually in the Assets category in the sidebar.
        </Alert>
      </Section>

      {/* ================================================================== */}
      {/* ACCESSIBILITY */}
      {/* ================================================================== */}
      <Section title="Accessibility" id="accessibility" isDark={isDark}>
        <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
          All components meet WCAG 2.1 AA standards. Color combinations are pre-validated for 4.5:1 minimum contrast ratio.
        </Typography>

        <SubSection title="Pre-Validated Color Combinations">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Use these combinations for guaranteed accessible text/background pairs:
          </Typography>
          <CodeBlock isDark={isDark}>{`import { accessibleCombinations } from '@trinity/design-system';

// White text on colored backgrounds
accessibleCombinations.whiteOnNavy    // { text: '#FFFFFF', bg: '#050742' }
accessibleCombinations.whiteOnPurple  // { text: '#FFFFFF', bg: '#7841C9' }

// Navy text on light backgrounds
accessibleCombinations.navyOnWhite    // { text: '#050742', bg: '#FFFFFF' }
accessibleCombinations.navyOnCoral    // { text: '#050742', bg: '#FF6150' }
accessibleCombinations.navyOnAzure    // { text: '#050742', bg: '#27AAE1' }

// Usage
<Box sx={{ 
  backgroundColor: accessibleCombinations.whiteOnNavy.bg,
  color: accessibleCombinations.whiteOnNavy.text,
}}>
  Accessible text
</Box>`}</CodeBlock>
        </SubSection>

        <SubSection title="Contrast Validation">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Validate custom color combinations:
          </Typography>
          <CodeBlock isDark={isDark}>{`import { getContrastRatio, validateAccessibility } from '@trinity/design-system';

// Get contrast ratio between two colors
const ratio = getContrastRatio('#050742', '#FFFFFF'); // ~12.5

// Validate against WCAG standards
const result = validateAccessibility('#050742', '#FFFFFF');
// { aa: true, aaa: true, ratio: 12.5 }`}</CodeBlock>
        </SubSection>

        <Alert severity="error" sx={{ mt: 3 }}>
          <strong>Required:</strong> All text must meet 4.5:1 contrast ratio (AA standard). Use accessibleCombinations or validate with getContrastRatio before deploying custom colors.
        </Alert>
      </Section>

      {/* ================================================================== */}
      {/* GOVERNANCE RULES */}
      {/* ================================================================== */}
      <Section title="Governance Rules" id="governance" isDark={isDark}>
        <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
          Follow these rules to maintain consistency and accessibility across applications:
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
            Color Usage
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 3, m: 0 }}>
            <li>Use semantic tokens for UI elements (text, backgrounds, borders)</li>
            <li>Never hardcode hex values in component files</li>
            <li>All text/background combinations must pass WCAG 2.1 AA (4.5:1 contrast)</li>
            <li>Use accessibleCombinations for guaranteed compliance</li>
            <li><strong>Exceptions:</strong> If hardcoded colors are required, add <code>@intentional-color</code> annotation with approved category (see INTENTIONAL_EXCEPTIONS.md)</li>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
            Component Styling
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 3, m: 0 }}>
            <li>Prefer MUI's sx prop for one-off styling</li>
            <li>Use styled() for reusable styled components</li>
            <li>Reference theme values via theme.palette and theme.spacing</li>
            <li>Do not override component behavior, only presentation</li>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
            Typography
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 3, m: 0 }}>
            <li>Use Montserrat as the primary typeface (applied automatically via theme)</li>
            <li>Use Typography component for all text content</li>
            <li>Use semantic variants (h1-h6, body1, body2, caption)</li>
            <li>Buttons use sentence case (no uppercase transforms)</li>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
            Spacing & Layout
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 3, m: 0 }}>
            <li>Use theme.spacing() or baseTokens.spacing for all whitespace</li>
            <li>Standard spacing scale: 4, 8, 12, 16, 24, 32, 48px</li>
            <li>Use MUI Grid (v2) for page layouts</li>
            <li>Container max-width is 1200px by default</li>
          </Box>
        </Paper>
      </Section>

      {/* ================================================================== */}
      {/* THEME.TS USAGE */}
      {/* ================================================================== */}
      <Section title="Internal Files: theme.ts" id="theme-ts" isDark={isDark}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>⚠️ Do not import theme.ts directly.</strong> It is an internal implementation file, not part of the public API.
        </Alert>

        <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
          The <code style={{ backgroundColor: isDark ? '#30363d' : '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>theme.ts</code> file 
          contains the internal MUI theme configuration that powers the design system. It exists to wire tokens into MUI's ThemeProvider. 
          This file is subject to change without notice and direct imports bypass token governance.
        </Typography>

        <SubSection title="Public API">
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            The supported public API consists of:
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 3, mb: 3 }}>
            <li><strong>Themes:</strong> <code style={{ backgroundColor: isDark ? '#30363d' : '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>lightTheme</code>, <code style={{ backgroundColor: isDark ? '#30363d' : '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>darkTheme</code> – for ThemeProvider</li>
            <li><strong>Tokens:</strong> <code style={{ backgroundColor: isDark ? '#30363d' : '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>baseTokens</code>, <code style={{ backgroundColor: isDark ? '#30363d' : '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>semanticTokens</code> – for styling</li>
            <li><strong>Utilities:</strong> <code style={{ backgroundColor: isDark ? '#30363d' : '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>accessibleCombinations</code>, <code style={{ backgroundColor: isDark ? '#30363d' : '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>getContrastRatio</code>, <code style={{ backgroundColor: isDark ? '#30363d' : '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>brandColors</code></li>
            <li><strong>Components:</strong> StatusIndicator, Modal, FileUpload, TopNavHeader, etc.</li>
          </Box>
        </SubSection>

        <SubSection title="Correct Usage">
          <CodeBlock isDark={isDark}>{`// ✅ Correct: Import from the package root
import { 
  lightTheme, 
  darkTheme, 
  baseTokens, 
  semanticTokens,
  accessibleCombinations,
} from '@trinity/design-system';

// Use tokens for styling
const styles = {
  color: semanticTokens.colors.text.primary,
  backgroundColor: baseTokens.colors.navy[900],
  padding: baseTokens.spacing[4],
};`}</CodeBlock>
        </SubSection>

        <SubSection title="Incorrect Usage">
          <CodeBlock isDark={isDark}>{`// ❌ Incorrect: Direct import from theme.ts
import { lightTheme } from '@trinity/design-system/theme';
import { brandColors } from '@trinity/design-system/src/theme';

// ❌ Incorrect: Accessing internal theme structure
import { createTrinityTheme } from '@trinity/design-system/theme';
const customTheme = createTrinityTheme('light');

// ❌ Incorrect: Hardcoding values that exist in tokens
const styles = {
  color: '#050742',  // Use semanticTokens.colors.brand.primary
  padding: 16,       // Use baseTokens.spacing[4]
};`}</CodeBlock>
        </SubSection>

        <Alert severity="info" sx={{ mt: 3 }}>
          <strong>ESLint Enforcement:</strong> Direct imports from <code>theme.ts</code> will trigger lint warnings. 
          CI pipelines may block merges that bypass token governance. Components will render, but this usage pattern is unsupported.
        </Alert>
      </Section>

      {/* ================================================================== */}
      {/* TYPESCRIPT */}
      {/* ================================================================== */}
      <Section title="TypeScript" id="typescript" isDark={isDark}>
        <SubSection title="Component Props">
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
        </SubSection>

        <SubSection title="Token Types">
          <CodeBlock isDark={isDark}>{`import type {
  TrinityBaseColors,
  TrinitySpacing,
  TrinityBorderRadius,
  TrinityFontSize,
} from '@trinity/design-system';`}</CodeBlock>
        </SubSection>
      </Section>

      {/* ================================================================== */}
      {/* NEXT STEPS */}
      {/* ================================================================== */}
      <Divider sx={{ my: 5 }} />
      <Paper
        sx={{
          p: 3,
          bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
          Next Steps
        </Typography>
        <Box component="ul" sx={{ color: 'text.secondary', m: 0, pl: 2.5 }}>
          <li><strong>Browse Components</strong> – Explore the component stories in the sidebar</li>
          <li><strong>View Tokens</strong> – Check the Tokens section for complete color, spacing, and typography values</li>
          <li><strong>Test Accessibility</strong> – Use the Accessibility stories to verify contrast ratios</li>
        </Box>
      </Paper>
    </Box>
  );
};

// ============================================================================
// STORYBOOK META
// ============================================================================

const meta: Meta<typeof IntroductionPage> = {
  title: 'Getting Started',
  component: IntroductionPage,
  parameters: {
    layout: 'padded',
    docs: {
      toc: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
