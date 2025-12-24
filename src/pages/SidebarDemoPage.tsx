import * as React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import TopNavWithSidebar from '../components/TopNavWithSidebar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { brandColors } from '../theme';

const navItems = [
  { id: 'home', label: 'Home', icon: <HomeOutlinedIcon /> },
  { id: 'menu2', label: 'Menu 2', icon: <TrendingUpIcon /> },
  { id: 'menu3', label: 'Menu 3', icon: <TrackChangesIcon /> },
  { id: 'menu4', label: 'Menu 4', icon: <FolderOpenIcon /> },
  { id: 'menu5', label: 'Menu 5', icon: <SupportAgentIcon /> },
  { id: 'insight-engine', label: 'Insight Engine', icon: <AutoAwesomeIcon />, isSpecial: true },
];

export default function SidebarDemoPage() {
  const [selectedNav, setSelectedNav] = React.useState('home');

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

  const handleNavItemClick = (itemId: string) => {
    setSelectedNav(itemId);
    console.log('Nav item clicked:', itemId);
  };

  return (
    <TopNavWithSidebar
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
      navItems={navItems}
      selectedNavItem={selectedNav}
      onNavItemClick={handleNavItemClick}
    >
      {/* Page Content */}
      <Box>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          {navItems.find(item => item.id === selectedNav)?.label || 'Home'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          This is the {navItems.find(item => item.id === selectedNav)?.label?.toLowerCase()} page content. 
          Click the hamburger menu (☰) to collapse/expand the sidebar.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sidebar Features
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Collapsible sidebar (click hamburger menu)</li>
                <li>Icons only when collapsed</li>
                <li>Full labels when expanded</li>
                <li>Selected state with navy background</li>
                <li>Hover state with light gray background</li>
                <li>Special gradient for "Insight Engine" item</li>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Component Props
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li><code>navItems</code> - Array of navigation items</li>
                <li><code>selectedNavItem</code> - Currently selected item</li>
                <li><code>onNavItemClick</code> - Navigation callback</li>
                <li><code>children</code> - Main content area</li>
                <li>All TopNavHeader props are also supported</li>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Color Reference */}
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Navigation States
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 120,
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: brandColors.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 14,
                }}
              >
                Selected
              </Box>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Normal Selected
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 120,
                  height: 40,
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, ${brandColors.secondary.main} 0%, ${brandColors.primary.light} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 14,
                }}
              >
                Special
              </Box>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Insight Engine
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 120,
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(5, 7, 66, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                }}
              >
                Hover
              </Box>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Hover State
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </TopNavWithSidebar>
  );
}
