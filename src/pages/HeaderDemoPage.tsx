import * as React from 'react';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import TopNavHeader from '../components/TopNavHeader';
import { brandColors } from '../tokens';

export default function HeaderDemoPage() {
  const handleClientChange = (clientId: string) => {
    console.log('Client changed:', clientId);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleAppsClick = (appId: string) => {
    console.log('App selected:', appId);
  };

  const handleUserMenuClick = (action: string) => {
    console.log('User menu action:', action);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header Component */}
      <TopNavHeader
        appName="App Name"
        clientName="Long Client Name 1"
        clients={[
          { id: '1', name: 'Long Client Name 1' },
          { id: '2', name: 'Long Client Name 2' },
          { id: '3', name: 'Long Client Name 3' },
          { id: '4', name: 'Client ABC' },
          { id: '5', name: 'Client XYZ' },
        ]}
        onClientChange={handleClientChange}
        userInitials="RD"
        userName="Rahul M Desai"
        userEmail="rdesai@trinitylifesciences.com"
        onSearch={handleSearch}
        onAppsClick={handleAppsClick}
        onUserMenuClick={handleUserMenuClick}
        apps={[
          { id: 'launch-accelerator', name: 'Launch Accelerator' },
          { id: 'cloudcast', name: 'CloudCast' },
          { id: 'terra', name: 'Terra' },
          { id: 'market-intelligence', name: 'Market Intelligence Dashboard' },
        ]}
      />

      {/* Main Content - with padding for fixed header */}
      <Box sx={{ pt: 8 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Top Navigation Header Demo
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            This page demonstrates the Trinity-themed top navigation header component.
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Header Features
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <li>Trinity Life Sciences logo (actual brand SVG)</li>
                  <li>App name with divider separator</li>
                  <li>Search bar with white background on focus</li>
                  <li>Clear (x) button when search has text</li>
                  <li>Client selector with "Switch Clients" header</li>
                  <li>Apps menu with TrinityEDGE and app list</li>
                  <li>User menu with avatar, name, email</li>
                  <li>Help, Notification, Log out options</li>
                  <li>External link icons where appropriate</li>
                </Box>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Props
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The header accepts these props for customization:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                  <li><code>appName</code> - Application name</li>
                  <li><code>clientName</code> - Initial selected client</li>
                  <li><code>clients</code> - List of available clients</li>
                  <li><code>userInitials</code> - Avatar initials (e.g., "RD")</li>
                  <li><code>userName</code> - Full user name</li>
                  <li><code>userEmail</code> - User email address</li>
                  <li><code>apps</code> - List of available apps</li>
                  <li>Callback handlers for interactions</li>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Color Palette Reference */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Brand Colors Used
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
              {[
                { name: 'Primary Main', color: brandColors.primary.main },
                { name: 'Primary Light', color: brandColors.primary.light },
                { name: 'Secondary (Coral)', color: brandColors.secondary.main },
                { name: 'Azure', color: brandColors.secondary.light },
              ].map((item) => (
                <Box key={item.name} sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      backgroundColor: item.color,
                      mb: 1,
                      boxShadow: 1,
                    }}
                  />
                  <Typography variant="caption" display="block">
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.color}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
