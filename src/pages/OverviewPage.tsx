import * as React from 'react';
import { Box, Typography, Paper, Grid, Chip, Card, CardContent, Button } from '@mui/material';
import { brandColors } from '../theme';

export const OverviewPage: React.FC = () => (
  <Box>
    <Typography variant="h4" fontWeight={700} gutterBottom>
      Trinity Design System
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
      A comprehensive component library built on Material-UI. Browse components by category, customize the theme, and share with your development team.
    </Typography>


    <Typography variant="h5" fontWeight={600} gutterBottom>
      Brand Colors
    </Typography>
    <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {[
          { label: 'Primary Light', color: brandColors.primary.light },
          { label: 'Primary', color: brandColors.primary.main },
          { label: 'Primary Dark', color: brandColors.primary.dark },
          { label: 'Secondary Light', color: brandColors.secondary.light },
          { label: 'Secondary', color: brandColors.secondary.main },
          { label: 'Secondary Dark', color: brandColors.secondary.dark },
        ].map((c) => (
          <Box key={c.label} sx={{ textAlign: 'center' }}>
            <Box sx={{ width: 64, height: 64, bgcolor: c.color, borderRadius: 2, mb: 1 }} />
            <Typography variant="caption">{c.label}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>

    <Typography variant="h5" fontWeight={600} gutterBottom>
      Quick Preview
    </Typography>
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="contained">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="outlined">Outlined</Button>
        <Chip label="Chip" />
        <Chip label="Primary" color="primary" />
        <Chip label="Secondary" color="secondary" />
      </Box>
    </Paper>
  </Box>
);
