import * as React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const ContainerPage: React.FC = () => (
  <ComponentPage
    title="Container"
    description="The container centers your content horizontally. It's the most basic layout element."
  >
    <Section title="Fluid">
      <Container maxWidth={false}>
        <Paper sx={{ bgcolor: 'primary.light', p: 2 }}>
          <Typography>maxWidth=false (fluid, full width)</Typography>
        </Paper>
      </Container>
    </Section>

    <Section title="Fixed Widths">
      <Showcase direction="column">
        <Container maxWidth="xs">
          <Paper sx={{ bgcolor: 'grey.200', p: 2 }}>
            <Typography>maxWidth="xs" (444px)</Typography>
          </Paper>
        </Container>
        <Container maxWidth="sm">
          <Paper sx={{ bgcolor: 'grey.200', p: 2 }}>
            <Typography>maxWidth="sm" (600px)</Typography>
          </Paper>
        </Container>
        <Container maxWidth="md">
          <Paper sx={{ bgcolor: 'grey.200', p: 2 }}>
            <Typography>maxWidth="md" (900px)</Typography>
          </Paper>
        </Container>
        <Container maxWidth="lg">
          <Paper sx={{ bgcolor: 'grey.200', p: 2 }}>
            <Typography>maxWidth="lg" (1200px)</Typography>
          </Paper>
        </Container>
        <Container maxWidth="xl">
          <Paper sx={{ bgcolor: 'grey.200', p: 2 }}>
            <Typography>maxWidth="xl" (1536px)</Typography>
          </Paper>
        </Container>
      </Showcase>
    </Section>

    <Section title="Fixed">
      <Container fixed>
        <Paper sx={{ bgcolor: 'secondary.light', p: 2 }}>
          <Typography>
            fixed - The max-width matches the min-width of the current breakpoint
          </Typography>
        </Paper>
      </Container>
    </Section>

    <Section title="Disable Gutters">
      <Showcase direction="column">
        <Container maxWidth="sm">
          <Paper sx={{ bgcolor: 'info.light', p: 2 }}>
            <Typography>With gutters (default padding)</Typography>
          </Paper>
        </Container>
        <Container maxWidth="sm" disableGutters>
          <Paper sx={{ bgcolor: 'info.light', p: 2 }}>
            <Typography>disableGutters (no padding)</Typography>
          </Paper>
        </Container>
      </Showcase>
    </Section>
  </ComponentPage>
);
