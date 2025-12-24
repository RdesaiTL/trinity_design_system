import * as React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box, Menu, MenuItem, Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const AppBarPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <ComponentPage
      title="App Bar"
      description="The App Bar displays information and actions relating to the current screen."
    >
      <Section title="Basic">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                App Title
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Section>

      <Section title="With Search & Actions">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                Material UI
              </Typography>
              <IconButton size="large" color="inherit"><SearchIcon /></IconButton>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={4} color="error"><MailIcon /></Badge>
              </IconButton>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={17} color="error"><NotificationsIcon /></Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
      </Section>

      <Section title="Colors">
        <Showcase direction="column">
          <AppBar position="static" color="primary">
            <Toolbar variant="dense">
              <Typography variant="h6" sx={{ flexGrow: 1 }}>Primary</Typography>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="secondary">
            <Toolbar variant="dense">
              <Typography variant="h6" sx={{ flexGrow: 1 }}>Secondary</Typography>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="transparent">
            <Toolbar variant="dense">
              <Typography variant="h6" sx={{ flexGrow: 1 }}>Transparent</Typography>
            </Toolbar>
          </AppBar>
        </Showcase>
      </Section>

      <Section title="Dense Toolbar">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Dense Toolbar
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </Section>

      <Section title="Elevation">
        <Showcase direction="column">
          <AppBar position="static" elevation={0}>
            <Toolbar variant="dense">
              <Typography variant="h6">No Elevation</Typography>
            </Toolbar>
          </AppBar>
          <AppBar position="static" elevation={4}>
            <Toolbar variant="dense">
              <Typography variant="h6">Elevation 4</Typography>
            </Toolbar>
          </AppBar>
          <AppBar position="static" elevation={8}>
            <Toolbar variant="dense">
              <Typography variant="h6">Elevation 8</Typography>
            </Toolbar>
          </AppBar>
        </Showcase>
      </Section>
    </ComponentPage>
  );
};
