import * as React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const PaperPage: React.FC = () => (
  <ComponentPage
    title="Paper"
    description="In Material Design, the physical properties of paper are translated to the screen."
  >
    <Section title="Basic">
      <Showcase>
        <Paper elevation={0} sx={{ p: 2 }}>elevation=0</Paper>
        <Paper sx={{ p: 2 }}>elevation=1 (default)</Paper>
        <Paper elevation={3} sx={{ p: 2 }}>elevation=3</Paper>
      </Showcase>
    </Section>

    <Section title="Elevation Levels">
      <Grid container spacing={2}>
        {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
          <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={elevation}>
            <Paper
              elevation={elevation}
              sx={{
                p: 2,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2">elevation={elevation}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Section>

    <Section title="Variants">
      <Showcase>
        <Paper sx={{ p: 3 }}>
          <Typography>Elevation (Default)</Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography>Outlined</Typography>
        </Paper>
      </Showcase>
    </Section>

    <Section title="Square Corners">
      <Showcase>
        <Paper sx={{ p: 2 }}>Rounded (default)</Paper>
        <Paper square sx={{ p: 2 }}>Square corners</Paper>
      </Showcase>
    </Section>

    <Section title="Custom Styling">
      <Showcase>
        <Paper
          sx={{
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Typography>Primary Background</Typography>
        </Paper>
        <Paper
          sx={{
            p: 2,
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
          }}
        >
          <Typography>Secondary Background</Typography>
        </Paper>
        <Paper
          elevation={6}
          sx={{
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography>Custom Border Radius</Typography>
        </Paper>
      </Showcase>
    </Section>

    <Section title="As Container">
      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Paper as Container
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Paper can be used as a container for other content. It provides a subtle background and optional elevation to help group related content.
        </Typography>
      </Paper>
    </Section>
  </ComponentPage>
);
