import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { accessibleCombinations } from '../theme';
import { brandColors } from '../tokens';

/**
 * # Color Accessibility
 * 
 * These color combinations meet **WCAG 2.1 AA** accessibility standards,
 * ensuring a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
 * 
 * ## Why Accessibility Matters
 * - **Users with visual impairments** rely on sufficient contrast to read content
 * - **Legal compliance** with accessibility regulations (ADA, Section 508)
 * - **Better UX** for all users, especially in varying lighting conditions
 * 
 * ## How to Use
 * Import `accessibleCombinations` from the theme and apply both text and background colors together:
 * 
 * ```tsx
 * import { accessibleCombinations } from './theme';
 * 
 * <Box sx={{
 *   backgroundColor: accessibleCombinations.whiteOnNavy.bg,
 *   color: accessibleCombinations.whiteOnNavy.text,
 * }}>
 *   WCAG AA Compliant
 * </Box>
 * ```
 */

interface AccessiblePairProps {
  name: string;
  textColor: string;
  bgColor: string;
  description: string;
}

const AccessiblePair = ({ name, textColor, bgColor, description }: AccessiblePairProps) => (
  <Paper
    elevation={0}
    sx={{
      backgroundColor: bgColor,
      color: textColor,
      p: 3,
      borderRadius: 2,
      border: bgColor === '#FFFFFF' ? '1px solid #E5E7EB' : 'none',
      height: '100%',
    }}
  >
    <Typography 
      variant="h2" 
      sx={{ 
        fontWeight: 700, 
        mb: 1,
        color: textColor,
      }}
    >
      Aa
    </Typography>
    <Typography variant="subtitle1" fontWeight={600} sx={{ color: textColor }}>
      {name}
    </Typography>
    <Typography variant="body2" sx={{ color: textColor, opacity: 0.8, mt: 1 }}>
      {description}
    </Typography>
    <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${textColor}20` }}>
      <Typography variant="caption" sx={{ color: textColor, opacity: 0.7 }}>
        Text: {textColor}
      </Typography>
      <br />
      <Typography variant="caption" sx={{ color: textColor, opacity: 0.7 }}>
        Background: {bgColor}
      </Typography>
    </Box>
  </Paper>
);

const AccessibilityGuide = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>WCAG 2.1 AA Accessible Color Pairs</Typography>
    <Typography variant="body1" color="text.secondary" paragraph>
      Use these pre-tested color combinations to ensure your UI meets accessibility standards.
    </Typography>
    
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AccessiblePair
          name="White on Navy"
          textColor={accessibleCombinations.whiteOnNavy.text}
          bgColor={accessibleCombinations.whiteOnNavy.bg}
          description="Primary header style, highest impact"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AccessiblePair
          name="Navy on White"
          textColor={accessibleCombinations.navyOnWhite.text}
          bgColor={accessibleCombinations.navyOnWhite.bg}
          description="Default body text, clean and readable"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AccessiblePair
          name="White on Purple"
          textColor={accessibleCombinations.whiteOnPurple.text}
          bgColor={accessibleCombinations.whiteOnPurple.bg}
          description="Accent buttons and highlights"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AccessiblePair
          name="Purple on White"
          textColor={accessibleCombinations.purpleOnWhite.text}
          bgColor={accessibleCombinations.purpleOnWhite.bg}
          description="Links and secondary text"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AccessiblePair
          name="Coral on Navy"
          textColor={accessibleCombinations.coralOnNavy.text}
          bgColor={accessibleCombinations.coralOnNavy.bg}
          description="Accent text on dark backgrounds"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AccessiblePair
          name="Navy on Coral"
          textColor={accessibleCombinations.navyOnCoral.text}
          bgColor={accessibleCombinations.navyOnCoral.bg}
          description="CTA buttons, promotional"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AccessiblePair
          name="Azure on Navy"
          textColor={accessibleCombinations.azureOnNavy.text}
          bgColor={accessibleCombinations.azureOnNavy.bg}
          description="Informational on dark"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AccessiblePair
          name="Navy on Azure"
          textColor={accessibleCombinations.navyOnAzure.text}
          bgColor={accessibleCombinations.navyOnAzure.bg}
          description="Info banners and alerts"
        />
      </Grid>
    </Grid>
  </Box>
);

const meta: Meta = {
  title: 'Foundation/Accessibility',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'WCAG 2.1 AA compliant color combinations for accessible UI design.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * All WCAG 2.1 AA compliant color pairs available in the design system.
 */
export const ColorPairs: Story = {
  render: () => <AccessibilityGuide />,
};

/**
 * Example showing how to import and use accessible combinations.
 */
export const CodeExample: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Using Accessible Combinations</Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Import & Usage</Typography>
        <Box
          component="pre"
          sx={{
            bgcolor: '#1e1e1e',
            color: '#d4d4d4',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            fontSize: 14,
          }}
        >
{`import { accessibleCombinations } from './theme';

// Available combinations:
// - whiteOnNavy, navyOnWhite
// - whiteOnPurple, purpleOnWhite  
// - coralOnNavy, navyOnCoral
// - azureOnNavy, navyOnAzure

// Usage in component:
<Button
  sx={{
    backgroundColor: accessibleCombinations.whiteOnNavy.bg,
    color: accessibleCombinations.whiteOnNavy.text,
    '&:hover': {
      backgroundColor: accessibleCombinations.whiteOnPurple.bg,
    },
  }}
>
  Accessible Button
</Button>

// Usage with styled-components:
const AccessibleCard = styled(Paper)(({ theme }) => ({
  backgroundColor: accessibleCombinations.navyOnWhite.bg,
  color: accessibleCombinations.navyOnWhite.text,
  padding: theme.spacing(3),
}));`}
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Live Examples</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              backgroundColor: accessibleCombinations.whiteOnNavy.bg,
              color: accessibleCombinations.whiteOnNavy.text,
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Header Component</Typography>
            <Typography variant="body2">Using whiteOnNavy combination</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              backgroundColor: accessibleCombinations.navyOnCoral.bg,
              color: accessibleCombinations.navyOnCoral.text,
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Promotional Banner</Typography>
            <Typography variant="body2">Using navyOnCoral combination</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Contrast ratio requirements for WCAG compliance.
 */
export const ContrastRequirements: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>WCAG Contrast Requirements</Typography>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="primary">
              Level AA (Minimum)
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Normal text:</strong> 4.5:1 contrast ratio
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Large text (18pt+ or 14pt bold):</strong> 3:1 contrast ratio
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is the minimum standard and what all Trinity components meet.
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="secondary">
              Level AAA (Enhanced)
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Normal text:</strong> 7:1 contrast ratio
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Large text:</strong> 4.5:1 contrast ratio
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enhanced accessibility for users with more severe visual impairments.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3, bgcolor: brandColors.neutral.lightGray }}>
        <Typography variant="h6" gutterBottom>Testing Tools</Typography>
        <Typography variant="body2" paragraph>
          Use these tools to verify contrast ratios:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2">
              <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener">
                WebAIM Contrast Checker
              </a>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <a href="https://color.adobe.com/create/color-contrast-analyzer" target="_blank" rel="noopener">
                Adobe Color Contrast Analyzer
              </a>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">Chrome DevTools - Accessibility Inspector</Typography>
          </li>
        </ul>
      </Paper>
    </Box>
  ),
};

/**
 * WCAG 2.1 Interactive Component Guidelines
 */
export const InteractiveGuidelines: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>WCAG 2.1 Interactive Component Guidelines</Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Key accessibility patterns implemented in Trinity components.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="primary">
              🎯 Focus Management
            </Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li><Typography variant="body2">All interactive elements are keyboard focusable</Typography></li>
              <li><Typography variant="body2">Focus indicators are visible (2:1 contrast minimum)</Typography></li>
              <li><Typography variant="body2">Focus is trapped in modals/dialogs</Typography></li>
              <li><Typography variant="body2">Focus returns to trigger after dialog closes</Typography></li>
            </ul>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="primary">
              🏷️ ARIA Labels
            </Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li><Typography variant="body2"><code>aria-label</code> for icon-only buttons</Typography></li>
              <li><Typography variant="body2"><code>aria-expanded</code> for dropdown triggers</Typography></li>
              <li><Typography variant="body2"><code>aria-haspopup</code> for menu triggers</Typography></li>
              <li><Typography variant="body2"><code>aria-current="page"</code> for active nav items</Typography></li>
            </ul>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="primary">
              🗣️ Screen Reader Support
            </Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li><Typography variant="body2"><code>role="alert"</code> for important messages</Typography></li>
              <li><Typography variant="body2"><code>aria-live</code> regions for dynamic content</Typography></li>
              <li><Typography variant="body2">Meaningful link/button text (not "click here")</Typography></li>
              <li><Typography variant="body2">Form labels associated with inputs</Typography></li>
            </ul>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="primary">
              ⌨️ Keyboard Navigation
            </Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li><Typography variant="body2">Tab: Navigate between focusable elements</Typography></li>
              <li><Typography variant="body2">Enter/Space: Activate buttons and links</Typography></li>
              <li><Typography variant="body2">Arrow keys: Navigate within menus/lists</Typography></li>
              <li><Typography variant="body2">Escape: Close modals and dropdowns</Typography></li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 3, mt: 3, bgcolor: brandColors.primary.main, color: 'white' }}>
        <Typography variant="h6" gutterBottom>Trinity Component Implementations</Typography>
        <Typography variant="body2" paragraph>
          The following accessibility features have been added to Trinity components:
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" gutterBottom>TopNavHeader & TopNavWithSidebar:</Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>aria-label on all icon buttons</Typography></li>
              <li><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>aria-expanded and aria-haspopup on dropdowns</Typography></li>
              <li><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>aria-current="page" on active nav items</Typography></li>
              <li><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>Proper landmark roles (header, nav, main)</Typography></li>
            </ul>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" gutterBottom>Form Components:</Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>FormControlLabel for Switch accessibility</Typography></li>
              <li><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>aria-labelledby for Slider components</Typography></li>
              <li><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>getAriaValueText for range values</Typography></li>
              <li><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>Error states with aria-describedby</Typography></li>
            </ul>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  ),
};
