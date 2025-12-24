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
        <Link href="#">Link</Link>
        <Link href="#" color="inherit">color="inherit"</Link>
        <Link href="#" variant="body2">variant="body2"</Link>
      </Showcase>
    </Section>

    <Section title="Underline">
      <Showcase>
        <Link href="#" underline="none">underline="none"</Link>
        <Link href="#" underline="hover">underline="hover"</Link>
        <Link href="#" underline="always">underline="always"</Link>
      </Showcase>
    </Section>

    <Section title="Colors">
      <Showcase>
        <Link href="#" color="primary">Primary</Link>
        <Link href="#" color="secondary">Secondary</Link>
        <Link href="#" color="error">Error</Link>
        <Link href="#" color="text.primary">Text Primary</Link>
        <Link href="#" color="text.secondary">Text Secondary</Link>
      </Showcase>
    </Section>

    <Section title="Button Link">
      <Box>
        <Link component="button" variant="body2" onClick={() => console.log('Button clicked')}>
          Button Link
        </Link>
      </Box>
    </Section>

    <Section title="In Text">
      <Typography>
        This is a paragraph with a <Link href="#">link</Link> inside it. Links can be 
        embedded naturally within text content and will inherit the appropriate styling.
        You can also have <Link href="#" color="secondary">colored links</Link> for emphasis.
      </Typography>
    </Section>

    <Section title="Variants">
      <Stack spacing={1}>
        <Link href="#" variant="h6">Heading 6 Link</Link>
        <Link href="#" variant="body1">Body 1 Link</Link>
        <Link href="#" variant="body2">Body 2 Link</Link>
        <Link href="#" variant="caption">Caption Link</Link>
        <Link href="#" variant="button">Button Variant Link</Link>
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
