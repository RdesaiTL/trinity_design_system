import * as React from 'react';
import { CircularProgress, LinearProgress, Box, Stack, Typography } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const ProgressPage: React.FC = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <ComponentPage
      title="Progress"
      description="Progress indicators express an unspecified wait time or display the length of a process."
    >
      <Section title="Circular Indeterminate">
        <Showcase>
          <CircularProgress />
          <CircularProgress color="secondary" />
          <CircularProgress color="success" />
          <CircularProgress color="inherit" />
        </Showcase>
      </Section>

      <Section title="Circular Determinate">
        <Showcase>
          <CircularProgress variant="determinate" value={25} />
          <CircularProgress variant="determinate" value={50} />
          <CircularProgress variant="determinate" value={75} />
          <CircularProgress variant="determinate" value={100} />
          <CircularProgress variant="determinate" value={progress} />
        </Showcase>
      </Section>

      <Section title="Circular with Label">
        <Showcase>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={progress} />
            <Box
              sx={{
                top: 0, left: 0, bottom: 0, right: 0,
                position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Typography variant="caption" component="div" color="text.secondary">
                {`${Math.round(progress)}%`}
              </Typography>
            </Box>
          </Box>
        </Showcase>
      </Section>

      <Section title="Circular Sizes">
        <Showcase>
          <CircularProgress size={20} />
          <CircularProgress size={30} />
          <CircularProgress size={40} />
          <CircularProgress size={60} />
        </Showcase>
      </Section>

      <Section title="Linear Indeterminate">
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
          <Box sx={{ mt: 2 }}><LinearProgress color="secondary" /></Box>
          <Box sx={{ mt: 2 }}><LinearProgress color="success" /></Box>
        </Box>
      </Section>

      <Section title="Linear Determinate">
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </Section>

      <Section title="Linear Buffer">
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="buffer" value={progress} valueBuffer={progress + 10} />
        </Box>
      </Section>

      <Section title="Linear with Label">
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
          </Box>
        </Box>
      </Section>
    </ComponentPage>
  );
};
