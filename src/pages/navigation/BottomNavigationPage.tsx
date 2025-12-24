import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FolderIcon from '@mui/icons-material/Folder';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const BottomNavigationPage: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState('recents');

  return (
    <ComponentPage
      title="Bottom Navigation"
      description="Bottom navigation bars allow movement between primary destinations in an app."
    >
      <Section title="Basic">
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
      </Section>

      <Section title="No Labels">
        <Box sx={{ width: 500 }}>
          <BottomNavigation value={value} onChange={(_, newValue) => setValue(newValue)}>
            <BottomNavigationAction icon={<RestoreIcon />} />
            <BottomNavigationAction icon={<FavoriteIcon />} />
            <BottomNavigationAction icon={<LocationOnIcon />} />
            <BottomNavigationAction icon={<FolderIcon />} />
          </BottomNavigation>
        </Box>
      </Section>

      <Section title="With Values">
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            value={value2}
            onChange={(_, newValue) => setValue2(newValue)}
            showLabels
          >
            <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
          </BottomNavigation>
        </Box>
      </Section>

      <Section title="Fixed Position Example">
        <Paper sx={{ position: 'relative', height: 150, overflow: 'hidden' }} elevation={3}>
          <Box sx={{ p: 2, pb: 8 }}>
            <Box sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              Content Area
            </Box>
          </Box>
          <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels value={0}>
              <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
              <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
              <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            </BottomNavigation>
          </Paper>
        </Paper>
      </Section>
    </ComponentPage>
  );
};
