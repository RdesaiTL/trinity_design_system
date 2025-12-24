import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const TypographyPage: React.FC = () => (
  <ComponentPage
    title="Typography"
    description="Use typography to present your design and content as clearly and efficiently as possible."
  >
    <Section title="Headings">
      <Box>
        <Typography variant="h1" gutterBottom>h1. Heading</Typography>
        <Typography variant="h2" gutterBottom>h2. Heading</Typography>
        <Typography variant="h3" gutterBottom>h3. Heading</Typography>
        <Typography variant="h4" gutterBottom>h4. Heading</Typography>
        <Typography variant="h5" gutterBottom>h5. Heading</Typography>
        <Typography variant="h6" gutterBottom>h6. Heading</Typography>
      </Box>
    </Section>

    <Section title="Subtitles">
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Box>
    </Section>

    <Section title="Body">
      <Box>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>
    </Section>

    <Section title="Other Variants">
      <Box>
        <Typography variant="button" display="block" gutterBottom>button text</Typography>
        <Typography variant="caption" display="block" gutterBottom>caption text</Typography>
        <Typography variant="overline" display="block" gutterBottom>overline text</Typography>
      </Box>
    </Section>

    <Section title="Colors">
      <Box>
        <Typography color="primary" gutterBottom>Primary color</Typography>
        <Typography color="secondary" gutterBottom>Secondary color</Typography>
        <Typography color="text.primary" gutterBottom>text.primary</Typography>
        <Typography color="text.secondary" gutterBottom>text.secondary</Typography>
        <Typography color="text.disabled" gutterBottom>text.disabled</Typography>
        <Typography color="error" gutterBottom>Error color</Typography>
        <Typography color="warning.main" gutterBottom>Warning color</Typography>
        <Typography color="info.main" gutterBottom>Info color</Typography>
        <Typography color="success.main" gutterBottom>Success color</Typography>
      </Box>
    </Section>

    <Section title="Text Alignment">
      <Box>
        <Typography align="left" gutterBottom>Left aligned text</Typography>
        <Typography align="center" gutterBottom>Center aligned text</Typography>
        <Typography align="right" gutterBottom>Right aligned text</Typography>
        <Typography align="justify" gutterBottom>
          Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
        </Typography>
      </Box>
    </Section>

    <Section title="Font Weight">
      <Box>
        <Typography fontWeight={300} gutterBottom>Light (300)</Typography>
        <Typography fontWeight={400} gutterBottom>Regular (400)</Typography>
        <Typography fontWeight={500} gutterBottom>Medium (500)</Typography>
        <Typography fontWeight={700} gutterBottom>Bold (700)</Typography>
      </Box>
    </Section>

    <Section title="Paragraph & Gutters">
      <Box>
        <Typography paragraph>
          First paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography paragraph>
          Second paragraph. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </Box>
    </Section>

    <Section title="No Wrap / Ellipsis">
      <Box sx={{ width: 200, border: '1px solid', borderColor: 'divider', p: 1 }}>
        <Typography noWrap>
          This text is very long and will be truncated with an ellipsis when it overflows.
        </Typography>
      </Box>
    </Section>
  </ComponentPage>
);
