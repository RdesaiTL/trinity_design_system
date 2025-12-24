import type { Meta, StoryObj } from '@storybook/react';
import { Typography, Box, Divider, Paper } from '@mui/material';

/**
 * # Typography
 * 
 * Typography is the art of arranging type to make text readable and visually appealing.
 * The Trinity Design System uses **Montserrat** as the primary typeface.
 * 
 * ## Font Family
 * - **Primary**: Montserrat
 * - **Fallback**: system-ui, -apple-system, sans-serif
 * 
 * ## Font Weights
 * - 300: Light
 * - 400: Regular
 * - 500: Medium
 * - 600: Semi-Bold (buttons, emphasis)
 * - 700: Bold (headings)
 * 
 * ## Design Guidelines
 * - Use heading levels semantically (h1 → h6)
 * - Maintain consistent hierarchy across pages
 * - Body text should use body1 or body2 variants
 */
const meta: Meta<typeof Typography> = {
  title: 'Foundation/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Typography system using Montserrat font family.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline', 'button'],
      description: 'The typography variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'textPrimary', 'textSecondary', 'error'],
      description: 'The color of the text',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    gutterBottom: {
      control: 'boolean',
      description: 'If true, adds bottom margin',
    },
    noWrap: {
      control: 'boolean',
      description: 'If true, text will not wrap',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default body text.
 */
export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'body1',
  },
};

/**
 * Complete typography scale showing all variants.
 */
export const TypeScale: Story = {
  render: () => (
    <Box>
      <Typography variant="h1" gutterBottom>h1. Heading</Typography>
      <Typography variant="h2" gutterBottom>h2. Heading</Typography>
      <Typography variant="h3" gutterBottom>h3. Heading</Typography>
      <Typography variant="h4" gutterBottom>h4. Heading</Typography>
      <Typography variant="h5" gutterBottom>h5. Heading</Typography>
      <Typography variant="h6" gutterBottom>h6. Heading</Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="button" display="block" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" display="block">
        overline text
      </Typography>
    </Box>
  ),
};

/**
 * Heading variants (h1-h6).
 */
export const Headings: Story = {
  render: () => (
    <Box>
      <Typography variant="h1" gutterBottom>Heading 1</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Use for main page titles
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h2" gutterBottom>Heading 2</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Use for major section headers
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h3" gutterBottom>Heading 3</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Use for sub-section headers
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h4" gutterBottom>Heading 4</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Use for card titles, dialogs
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h5" gutterBottom>Heading 5</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Use for small section headers
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6" gutterBottom>Heading 6</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Use for list item titles, labels
      </Typography>
    </Box>
  ),
};

/**
 * Body text variants for content.
 */
export const BodyText: Story = {
  render: () => (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>Body 1 (Default)</Typography>
      <Typography variant="body1" paragraph>
        Trinity Life Sciences transforms commercial decision-making with
        best-in-class analytics, insights, and technology solutions. Our
        comprehensive platform enables pharmaceutical companies to make
        data-driven decisions with confidence.
      </Typography>
      
      <Typography variant="h6" gutterBottom>Body 2 (Smaller)</Typography>
      <Typography variant="body2" paragraph>
        Trinity Life Sciences transforms commercial decision-making with
        best-in-class analytics, insights, and technology solutions. Our
        comprehensive platform enables pharmaceutical companies to make
        data-driven decisions with confidence.
      </Typography>
    </Box>
  ),
};

/**
 * Text with different colors.
 */
export const Colors: Story = {
  render: () => (
    <Box>
      <Typography color="primary" gutterBottom>Primary color text</Typography>
      <Typography color="secondary" gutterBottom>Secondary color text</Typography>
      <Typography color="text.primary" gutterBottom>Text primary color</Typography>
      <Typography color="text.secondary" gutterBottom>Text secondary color</Typography>
      <Typography color="error" gutterBottom>Error color text</Typography>
      <Typography color="success.main" gutterBottom>Success color text</Typography>
    </Box>
  ),
};

/**
 * Typography in context - sample article.
 */
export const InContext: Story = {
  render: () => (
    <Paper sx={{ p: 4, maxWidth: 700 }}>
      <Typography variant="overline" color="primary" gutterBottom>
        Case Study
      </Typography>
      <Typography variant="h3" gutterBottom>
        Accelerating Product Launch Success
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        How Trinity's Launch Accelerator helped a top-10 pharma company achieve
        30% faster time-to-peak sales.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h5" gutterBottom>The Challenge</Typography>
      <Typography variant="body1" paragraph>
        Launching a new pharmaceutical product is complex, requiring coordination
        across multiple teams and market conditions. Our client needed a way to
        synthesize disparate data sources and accelerate decision-making.
      </Typography>
      
      <Typography variant="h5" gutterBottom>The Solution</Typography>
      <Typography variant="body1" paragraph>
        Trinity's Launch Accelerator provided real-time market intelligence,
        competitive tracking, and predictive analytics—all in one integrated
        platform. The team could now make informed decisions in hours instead
        of weeks.
      </Typography>
      
      <Typography variant="h5" gutterBottom>The Results</Typography>
      <Typography variant="body1">
        Within the first year of launch:
      </Typography>
      <ul>
        <li><Typography variant="body1">30% faster time to peak sales</Typography></li>
        <li><Typography variant="body1">45% improvement in forecast accuracy</Typography></li>
        <li><Typography variant="body1">$50M+ in optimized marketing spend</Typography></li>
      </ul>
      
      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Note: Results may vary based on market conditions and implementation.
        </Typography>
      </Box>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing typography variants used together in a realistic article layout.',
      },
    },
  },
};
