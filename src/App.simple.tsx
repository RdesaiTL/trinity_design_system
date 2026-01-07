import * as React from 'react';
import { ThemeProvider, CssBaseline, Box, Typography, Button } from '@mui/material';
import { lightTheme } from './theme';

export default function App() {
  console.log('App component rendering...');
  
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Typography variant="h3" gutterBottom>
          Trinity Design System
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          If you can see this, the app is working!
        </Typography>
        <Button variant="contained" color="primary">
          Test Button
        </Button>
      </Box>
    </ThemeProvider>
  );
}
