import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper, Stack, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { baseTokens, semanticTokens } from '../../tokens';

/**
 * # Motion Tokens
 * 
 * Motion tokens define animation timing and easing curves for consistent, 
 * meaningful motion throughout the UI.
 * 
 * ## Categories
 * - **Duration**: How long animations take
 * - **Easing**: The acceleration curve of animations
 * 
 * ## Principles
 * - Use shorter durations for small elements and micro-interactions
 * - Use longer durations for larger elements and page transitions
 * - Ease-out for elements entering, ease-in for elements exiting
 */

const DurationDemo = () => {
  const [animate, setAnimate] = useState(false);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Duration Tokens</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Animation duration values from instant (50ms) to slow (500ms).
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={() => setAnimate(!animate)} 
        sx={{ mb: 4 }}
      >
        {animate ? 'Reset' : 'Animate'}
      </Button>

      <Stack spacing={3}>
        {Object.entries(baseTokens.duration).map(([name, duration]) => (
          <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ minWidth: 140 }}>
              <Typography variant="subtitle2" fontWeight={600}>duration.{name}</Typography>
              <Typography variant="body2" color="text.secondary">{duration}</Typography>
            </Box>
            <Box sx={{ flex: 1, position: 'relative', height: 40 }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: animate ? 'calc(100% - 40px)' : 0,
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.main',
                  borderRadius: 1,
                  transition: `left ${duration} ease-in-out`,
                }}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

const EasingDemo = () => {
  const [animate, setAnimate] = useState(false);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Easing Tokens</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Easing curves control the acceleration of animations.
      </Typography>

      <Button 
        variant="contained" 
        onClick={() => setAnimate(!animate)} 
        sx={{ mb: 4 }}
      >
        {animate ? 'Reset' : 'Animate'}
      </Button>

      <Stack spacing={4}>
        {Object.entries(baseTokens.easing).map(([name, easing]) => (
          <Paper key={name} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 2 }}>
              <Box sx={{ minWidth: 120 }}>
                <Typography variant="subtitle2" fontWeight={600}>easing.{name}</Typography>
                <Typography 
                  variant="caption" 
                  sx={{ fontFamily: 'monospace', color: 'text.secondary', display: 'block' }}
                >
                  {easing}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {name === 'linear' && 'Constant speed, no acceleration.'}
                  {name === 'in' && 'Starts slow, accelerates. Good for exits.'}
                  {name === 'out' && 'Starts fast, decelerates. Good for entries.'}
                  {name === 'inOut' && 'Slow start and end. Best for most animations.'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ position: 'relative', height: 40, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: animate ? 'calc(100% - 40px)' : 0,
                  width: 40,
                  height: 40,
                  bgcolor: 'secondary.main',
                  borderRadius: 1,
                  transition: `left 500ms ${easing}`,
                }}
              />
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

const SemanticMotionDemo = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setShow(s => !s), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Semantic Motion Tokens</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Pre-defined motion combinations for common interaction patterns.
      </Typography>

      <Grid container spacing={4}>
        {/* Duration tokens */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Motion Duration</Typography>
            <Stack spacing={2}>
              {Object.entries(semanticTokens.motion.duration).map(([name, value]) => (
                <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ minWidth: 100 }}>
                    <Typography variant="subtitle2">{name}</Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                      motion.duration.{name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Easing tokens */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Motion Easing</Typography>
            <Stack spacing={2}>
              {Object.entries(semanticTokens.motion.easing).map(([name, value]) => (
                <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ minWidth: 100 }}>
                    <Typography variant="subtitle2">{name}</Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                      motion.easing.{name}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const MotionGuidelinesDemo = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Motion Guidelines</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Best practices for applying motion in the Trinity Design System.
    </Typography>

    <Grid container spacing={4}>
      {/* Instant feedback */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Instant Feedback (50-100ms)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Use for micro-interactions that need immediate response.
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">• Button hover states</Typography>
            <Typography variant="body2">• Input focus rings</Typography>
            <Typography variant="body2">• Icon color changes</Typography>
            <Typography variant="body2">• Toggle state changes</Typography>
          </Stack>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              transition: color {baseTokens.duration.fastest} ease
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Standard animations */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Standard Animations (150-200ms)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            The sweet spot for most UI animations.
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">• Menu open/close</Typography>
            <Typography variant="body2">• Tooltip appear</Typography>
            <Typography variant="body2">• Card hover lift</Typography>
            <Typography variant="body2">• Checkbox/radio animations</Typography>
          </Stack>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              transition: all {baseTokens.duration.normal} ease-in-out
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Complex animations */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Complex Animations (300-500ms)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Longer durations for significant UI changes.
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">• Modal open/close</Typography>
            <Typography variant="body2">• Page transitions</Typography>
            <Typography variant="body2">• Drawer slide</Typography>
            <Typography variant="body2">• Accordion expand</Typography>
          </Stack>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              transition: transform {baseTokens.duration.slow} ease-out
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Easing guidelines */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Easing Selection</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choose the right easing for the context.
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2">ease-out (Enter)</Typography>
              <Typography variant="body2" color="text.secondary">
                Elements appearing: modals, tooltips, dropdowns
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">ease-in (Exit)</Typography>
              <Typography variant="body2" color="text.secondary">
                Elements disappearing: closing modals, hiding menus
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">ease-in-out (Move)</Typography>
              <Typography variant="body2" color="text.secondary">
                Elements moving: sliders, drag operations, tabs
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const meta: Meta = {
  title: 'Tokens/Motion',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Duration: Story = {
  render: () => <DurationDemo />,
};

export const Easing: Story = {
  render: () => <EasingDemo />,
};

export const SemanticMotion: Story = {
  render: () => <SemanticMotionDemo />,
};

export const Guidelines: Story = {
  render: () => <MotionGuidelinesDemo />,
};
