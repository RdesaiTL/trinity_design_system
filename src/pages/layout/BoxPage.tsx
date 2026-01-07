import * as React from 'react';
import { Box } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const BoxPage: React.FC = () => (
  <ComponentPage
    title="Box"
    description="The Box component serves as a wrapper component for most of the CSS utility needs."
  >
    <Section title="Basic">
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        This is a basic Box component
      </Box>
    </Section>

    <Section title="Styling with sx">
      <Showcase direction="column">
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
          Primary background
        </Box>
        <Box sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', p: 2 }}>
          Secondary background
        </Box>
        <Box sx={{ bgcolor: 'error.main', color: 'error.contrastText', p: 2 }}>
          Error background
        </Box>
      </Showcase>
    </Section>

    <Section title="Borders">
      <Showcase>
        <Box sx={{ border: 1, p: 2 }}>Border 1</Box>
        <Box sx={{ border: 2, p: 2 }}>Border 2</Box>
        <Box sx={{ borderTop: 1, p: 2 }}>Border Top</Box>
        <Box sx={{ borderBottom: 1, p: 2 }}>Border Bottom</Box>
        <Box sx={{ borderLeft: 1, p: 2 }}>Border Left</Box>
        <Box sx={{ borderRight: 1, p: 2 }}>Border Right</Box>
      </Showcase>
    </Section>

    <Section title="Border Colors">
      <Showcase>
        <Box sx={{ border: 2, borderColor: 'primary.main', p: 2 }}>Primary</Box>
        <Box sx={{ border: 2, borderColor: 'secondary.main', p: 2 }}>Secondary</Box>
        <Box sx={{ border: 2, borderColor: 'error.main', p: 2 }}>Error</Box>
        <Box sx={{ border: 2, borderColor: 'grey.500', p: 2 }}>Grey</Box>
      </Showcase>
    </Section>

    <Section title="Border Radius">
      <Showcase>
        <Box sx={{ bgcolor: 'grey.300', p: 2, borderRadius: 0 }}>Sharp</Box>
        <Box sx={{ bgcolor: 'grey.300', p: 2, borderRadius: 1 }}>Radius 1</Box>
        <Box sx={{ bgcolor: 'grey.300', p: 2, borderRadius: 2 }}>Radius 2</Box>
        <Box sx={{ bgcolor: 'grey.300', p: 2, borderRadius: 4 }}>Radius 4</Box>
        <Box sx={{ bgcolor: 'grey.300', p: 2, borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Circle
        </Box>
      </Showcase>
    </Section>

    <Section title="Display">
      <Showcase direction="column">
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ bgcolor: 'primary.light', p: 1 }}>Flex Item 1</Box>
          <Box sx={{ bgcolor: 'primary.light', p: 1 }}>Flex Item 2</Box>
          <Box sx={{ bgcolor: 'primary.light', p: 1 }}>Flex Item 3</Box>
        </Box>
        <Box sx={{ display: 'inline', bgcolor: 'secondary.light', p: 1, m: 1 }}>Inline</Box>
        <Box sx={{ display: 'inline', bgcolor: 'secondary.light', p: 1, m: 1 }}>Inline</Box>
      </Showcase>
    </Section>

    <Section title="Sizing">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ bgcolor: 'grey.300', width: '100%', p: 1 }}>Width 100%</Box>
        <Box sx={{ bgcolor: 'grey.300', width: '75%', p: 1 }}>Width 75%</Box>
        <Box sx={{ bgcolor: 'grey.300', width: '50%', p: 1 }}>Width 50%</Box>
        <Box sx={{ bgcolor: 'grey.300', width: 200, p: 1 }}>Width 200px</Box>
      </Box>
    </Section>

    <Section title="Shadows">
      <Showcase>
        <Box sx={{ boxShadow: 0, p: 2, bgcolor: 'background.paper' }}>Shadow 0</Box>
        <Box sx={{ boxShadow: 1, p: 2, bgcolor: 'background.paper' }}>Shadow 1</Box>
        <Box sx={{ boxShadow: 3, p: 2, bgcolor: 'background.paper' }}>Shadow 3</Box>
        <Box sx={{ boxShadow: 6, p: 2, bgcolor: 'background.paper' }}>Shadow 6</Box>
      </Showcase>
    </Section>
  </ComponentPage>
);
