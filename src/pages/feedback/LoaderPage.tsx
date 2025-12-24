import * as React from 'react';
import { Box, Stack, Typography, Paper, CircularProgress, LinearProgress } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const LoaderPage: React.FC = () => {
  return (
    <ComponentPage
      title="Loader"
      description="Loaders indicate that content is being loaded or an action is being processed."
    >
      <Section title="Circular Progress">
        <Showcase>
          <CircularProgress size={24} />
          <CircularProgress size={32} />
          <CircularProgress size={40} />
          <CircularProgress size={48} />
        </Showcase>
      </Section>

      <Section title="Circular Progress Colors">
        <Showcase>
          <CircularProgress color="primary" />
          <CircularProgress color="secondary" />
          <CircularProgress color="success" />
          <CircularProgress color="error" />
          <CircularProgress color="warning" />
          <CircularProgress color="info" />
        </Showcase>
      </Section>

      <Section title="Determinate Circular">
        <Showcase>
          <CircularProgress variant="determinate" value={25} />
          <CircularProgress variant="determinate" value={50} />
          <CircularProgress variant="determinate" value={75} />
          <CircularProgress variant="determinate" value={100} />
        </Showcase>
      </Section>

      <Section title="Linear Progress">
        <Stack spacing={3} sx={{ width: '100%', maxWidth: 500 }}>
          <Box>
            <Typography variant="body2" gutterBottom>Indeterminate</Typography>
            <LinearProgress />
          </Box>
          <Box>
            <Typography variant="body2" gutterBottom>Determinate (50%)</Typography>
            <LinearProgress variant="determinate" value={50} />
          </Box>
          <Box>
            <Typography variant="body2" gutterBottom>Buffer</Typography>
            <LinearProgress variant="buffer" value={60} valueBuffer={80} />
          </Box>
        </Stack>
      </Section>

      <Section title="Linear Progress Colors">
        <Stack spacing={2} sx={{ width: '100%', maxWidth: 500 }}>
          <LinearProgress color="primary" />
          <LinearProgress color="secondary" />
          <LinearProgress color="success" />
          <LinearProgress color="error" />
          <LinearProgress color="warning" />
          <LinearProgress color="info" />
        </Stack>
      </Section>

      <Section title="Loading States in Context">
        <Stack direction="row" spacing={3}>
          <Paper sx={{ p: 4, width: 200, textAlign: 'center' }}>
            <CircularProgress size={32} />
            <Typography variant="body2" sx={{ mt: 2 }}>Loading...</Typography>
          </Paper>
          <Paper sx={{ p: 4, width: 300 }}>
            <Typography variant="subtitle2" gutterBottom>Uploading file...</Typography>
            <LinearProgress variant="determinate" value={65} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              65% complete
            </Typography>
          </Paper>
        </Stack>
      </Section>
    </ComponentPage>
  );
};
