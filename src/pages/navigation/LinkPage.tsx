import * as React from 'react';
import { Link, Box, Typography, Stack } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const LinkPage: React.FC = () => (
  <ComponentPage
    title="Link"
    description="The Link component allows you to easily customize anchor elements with your theme colors and typography styles."
  >
    <Section title="Basic">
      <Showcase>
        <Link component="button" type="button">Link</Link>
        <Link component="button" type="button" color="inherit">color="inherit"</Link>
        <Link component="button" type="button" variant="body2">variant="body2"</Link>
      </Showcase>
    </Section>

    <Section title="Underline">
      <Showcase>
        <Link component="button" type="button" underline="none">underline="none"</Link>
        <Link component="button" type="button" underline="hover">underline="hover"</Link>
        <Link component="button" type="button" underline="always">underline="always"</Link>
      </Showcase>
    </Section>

    <Section title="Colors">
      <Showcase>
        <Link component="button" type="button" color="primary">Primary</Link>
        <Link component="button" type="button" color="secondary">Secondary</Link>
        <Link component="button" type="button" color="error">Error</Link>
        <Link component="button" type="button" color="text.primary">Text Primary</Link>
        <Link component="button" type="button" color="text.secondary">Text Secondary</Link>
      </Showcase>
    </Section>

    <Section title="Button Link">
      <Box>
        <Link component="button" type="button" variant="body2" onClick={() => console.log('Button clicked')}>
          Button Link
        </Link>
      </Box>
    </Section>

    <Section title="In Text">
      <Typography>
        This is a paragraph with a <Link component="button" type="button">link</Link> inside it. Links can be 
        embedded naturally within text content and will inherit the appropriate styling.
        You can also have <Link component="button" type="button" color="secondary">colored links</Link> for emphasis.
      </Typography>
    </Section>

    <Section title="Variants">
      <Stack spacing={1}>
        <Link component="button" type="button" variant="h6">Heading 6 Link</Link>
        <Link component="button" type="button" variant="body1">Body 1 Link</Link>
        <Link component="button" type="button" variant="body2">Body 2 Link</Link>
        <Link component="button" type="button" variant="caption">Caption Link</Link>
        <Link component="button" type="button" variant="button">Button Variant Link</Link>
      </Stack>
    </Section>

    <Section title="External Link">
      <Showcase>
        <Link href="https://mui.com" target="_blank" rel="noopener">
          MUI (opens in new tab)
        </Link>
      </Showcase>
    </Section>
  </ComponentPage>
);
