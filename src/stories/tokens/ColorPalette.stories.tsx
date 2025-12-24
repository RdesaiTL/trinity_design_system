import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { baseTokens } from '../../tokens';

export default {
  title: 'Tokens/Colors',
  parameters: {
    docs: {
      description: {
        component: 'Visual palette of Trinity base color tokens.'
      }
    }
  }
};

const colorGroups = Object.entries(baseTokens.colors);

export const ColorPalette = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>Base Color Tokens</Typography>
    <Grid container spacing={4}>
      {colorGroups.map(([group, shades]) => (
        <Grid item xs={12} md={6} lg={4} key={group}>
          <Typography variant="h6" sx={{ mb: 2 }}>{group.charAt(0).toUpperCase() + group.slice(1)}</Typography>
          <Grid container spacing={1}>
            {Object.entries(shades).map(([shade, value]) => (
              <Grid item xs={4} key={shade}>
                <Paper elevation={1} sx={{ p: 2, bgcolor: value, color: '#fff', minHeight: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee' }}>
                  <Typography variant="body2">{group}.{shade}</Typography>
                  <Typography variant="caption">{value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  </Box>
);
