/**
 * @fileoverview TopNavHeader provides a fully-featured top navigation bar for Trinity applications.
 * It includes client selection, search, apps menu, help, notifications, and user profile.
 *
 * @example
 * ```tsx
 * import { TopNavHeader } from '@trinity/design-system';
 *
 * <TopNavHeader
 *   clients={[{ id: '1', name: 'Acme Corp' }]}
 *   selectedClientId="1"
 *   onClientChange={(id) => setSelectedClient(id)}
 *   user={{ name: 'John Doe', email: 'john@example.com' }}
 *   onLogout={() => auth.logout()}
 * />
 * ```
 *
 * @module components/TopNavHeader
 */

import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AppsIcon from '@mui/icons-material/Apps';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { brandColors } from '../tokens';
import trinityLogoWhite from '../assets/trinity-logo-white.svg';

// Styled search component - matches the design with white bg when focused
const Search = styled('div')<{ focused?: string }>(({ theme, focused }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: focused === 'true' ? theme.palette.common.white : alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: focused === 'true' ? theme.palette.common.white : alpha(theme.palette.common.white, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  transition: theme.transitions.create(['background-color']),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    minWidth: 300,
  },
}));

const SearchIconWrapper = styled('div')<{ focused?: string }>(({ theme, focused }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: focused === 'true' ? brandColors.primary.main : alpha(theme.palette.common.white, 0.5),
}));

const StyledInputBase = styled(InputBase)<{ focused?: string }>(({ theme, focused }) => ({
  color: focused === 'true' ? brandColors.primary.main : 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 4, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: 14,
    '&::placeholder': {
      color: focused === 'true' ? brandColors.neutral.gray500 : alpha(theme.palette.common.white, 0.5),
      opacity: 1,
    },
  },
}));

const ClearButton = styled(IconButton)<{ show?: string }>(({ show }) => ({
  position: 'absolute',
  right: 4,
  top: '50%',
  transform: 'translateY(-50%)',
  padding: 4,
  opacity: show === 'true' ? 1 : 0,
  pointerEvents: show === 'true' ? 'auto' : 'none',
  color: brandColors.neutral.gray500,
  '&:hover': {
    backgroundColor: alpha(brandColors.neutral.gray500, 0.1),
  },
}));

const ClientSelector = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  color: theme.palette.common.white,
  borderRadius: 12,
  padding: '6px 12px',
  textTransform: 'none',
  fontSize: 14,
  fontWeight: 400,
  minWidth: 180,
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
}));

// Trinity Logo using actual SVG
const TrinityLogo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <img src={trinityLogoWhite} alt="Trinity" height={28} />
  </Box>
);

interface App {
  id: string;
  name: string;
  url?: string;
}

interface TopNavHeaderProps {
  appName?: string;
  clientName?: string;
  clients?: { id: string; name: string }[];
  onClientChange?: (clientId: string) => void;
  userInitials?: string;
  userName?: string;
  userEmail?: string;
  onSearch?: (query: string) => void;
  onAppsClick?: (appId: string) => void;
  onUserMenuClick?: (action: string) => void;
  apps?: App[];
}

export default function TopNavHeader({
  appName = 'App Name',
  clientName = 'Long Client Name 1',
  clients = [
    { id: '1', name: 'Long Client Name 1' },
    { id: '2', name: 'Long Client Name 2' },
    { id: '3', name: 'Long Client Name 3' },
    { id: '4', name: 'Client ABC' },
    { id: '5', name: 'Client XYZ' },
  ],
  onClientChange,
  userInitials = 'RD',
  userName = 'Rahul M Desai',
  userEmail = 'rdesai@trinitylifesciences.com',
  onSearch,
  onAppsClick,
  onUserMenuClick,
  apps = [
    { id: 'launch-accelerator', name: 'Launch Accelerator', url: '#' },
    { id: 'cloudcast', name: 'CloudCast', url: '#' },
    { id: 'terra', name: 'Terra', url: '#' },
    { id: 'market-intelligence', name: 'Market Intelligence Dashboard', url: '#' },
  ],
}: TopNavHeaderProps) {
  const [clientAnchorEl, setClientAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
  const [appsAnchorEl, setAppsAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = React.useState(clientName);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchFocused, setSearchFocused] = React.useState(false);

  // Client handlers
  const handleClientClick = (event: React.MouseEvent<HTMLElement>) => {
    setClientAnchorEl(event.currentTarget);
  };

  const handleClientClose = () => {
    setClientAnchorEl(null);
  };

  const handleClientSelect = (client: { id: string; name: string }) => {
    setSelectedClient(client.name);
    onClientChange?.(client.id);
    handleClientClose();
  };

  // User menu handlers
  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchorEl(null);
  };

  const handleUserAction = (action: string) => {
    onUserMenuClick?.(action);
    handleUserClose();
  };

  // Apps menu handlers
  const handleAppsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAppsAnchorEl(event.currentTarget);
  };

  const handleAppsClose = () => {
    setAppsAnchorEl(null);
  };

  const handleAppSelect = (appId: string) => {
    onAppsClick?.(appId);
    handleAppsClose();
  };

  // Search handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch?.(searchValue);
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      component="header"
      sx={{
        backgroundColor: brandColors.primary.main,
        borderBottom: `1px solid ${alpha(brandColors.neutral.white, 0.1)}`,
        borderRadius: 0,
      }}
    >
      <Toolbar 
        component="nav" 
        aria-label="Main navigation"
        sx={{ minHeight: 56, px: { xs: 2, sm: 3 } }}
      >
        {/* Left Section - Logo and App Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TrinityLogo />
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              backgroundColor: alpha(brandColors.neutral.white, 0.3),
              height: 24,
              alignSelf: 'center',
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              color: 'white',
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            {appName}
          </Typography>
        </Box>

        {/* Center Section - Search */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Search focused={searchFocused.toString()}>
            <SearchIconWrapper focused={searchFocused.toString()}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              focused={searchFocused.toString()}
            />
            <ClearButton
              show={(searchValue.length > 0).toString()}
              onClick={handleClearSearch}
              size="small"
              aria-label="Clear search"
            >
              <ClearIcon fontSize="small" />
            </ClearButton>
          </Search>
        </Box>

        {/* Right Section - Client Selector, Apps, User */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Client Selector Dropdown */}
          <ClientSelector
            onClick={handleClientClick}
            endIcon={<KeyboardArrowDownIcon />}
            aria-label={`Current client: ${selectedClient}. Click to switch clients`}
            aria-haspopup="listbox"
            aria-expanded={Boolean(clientAnchorEl)}
          >
            {selectedClient}
          </ClientSelector>
          <Menu
            id="client-menu"
            anchorEl={clientAnchorEl}
            open={Boolean(clientAnchorEl)}
            onClose={handleClientClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            MenuListProps={{
              'aria-label': 'Client selection',
              role: 'listbox',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 220,
                borderRadius: '12px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ px: 2, py: 1.5, fontWeight: 600, color: 'text.primary' }}
              id="client-menu-header"
            >
              Switch Clients
            </Typography>
            {clients.map((client) => (
              <MenuItem
                key={client.id}
                onClick={() => handleClientSelect(client)}
                selected={client.name === selectedClient}
                aria-selected={client.name === selectedClient}
                role="option"
                sx={{ py: 1 }}
              >
                {client.name}
              </MenuItem>
            ))}
          </Menu>

          {/* Apps Grid Icon */}
          <IconButton
            onClick={handleAppsClick}
            aria-label="Applications menu"
            aria-haspopup="menu"
            aria-expanded={Boolean(appsAnchorEl)}
            sx={{
              color: alpha(brandColors.neutral.white, 0.7),
              '&:hover': {
                backgroundColor: alpha(brandColors.neutral.white, 0.1),
                color: brandColors.neutral.white,
              },
            }}
          >
            <AppsIcon />
          </IconButton>
          <Menu
            anchorEl={appsAnchorEl}
            open={Boolean(appsAnchorEl)}
            onClose={handleAppsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 240,
                borderRadius: '12px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            {/* TrinityEDGE Header */}
            <MenuItem
              sx={{ py: 1.5 }}
              onClick={() => handleAppSelect('trinity-edge')}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  TrinityEDGE
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Apps Access
                </Typography>
              </Box>
              <OpenInNewIcon fontSize="small" sx={{ color: 'text.secondary', ml: 2 }} />
            </MenuItem>
            <Divider />
            {apps.map((app) => (
              <MenuItem
                key={app.id}
                onClick={() => handleAppSelect(app.id)}
                sx={{ py: 1, justifyContent: 'space-between' }}
              >
                <Typography variant="body2">{app.name}</Typography>
                <OpenInNewIcon fontSize="small" sx={{ color: 'text.secondary', ml: 2 }} />
              </MenuItem>
            ))}
          </Menu>

          {/* User Avatar with Dropdown */}
          <IconButton
            onClick={handleUserClick}
            aria-label={`User menu for ${userName}`}
            aria-haspopup="menu"
            aria-expanded={Boolean(userAnchorEl)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '12px',
              padding: '4px 8px',
              '&:hover': {
                backgroundColor: alpha(brandColors.neutral.white, 0.1),
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: 12,
                fontWeight: 600,
                backgroundColor: brandColors.primary.light,
                color: 'white',
              }}
            >
              {userInitials}
            </Avatar>
            <KeyboardArrowDownIcon
              sx={{
                color: alpha(brandColors.neutral.white, 0.7),
                fontSize: 20,
                ml: 0.5,
              }}
            />
          </IconButton>
          <Menu
            anchorEl={userAnchorEl}
            open={Boolean(userAnchorEl)}
            onClose={handleUserClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 240,
                borderRadius: '12px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            {/* User Info Header */}
            <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  fontSize: 14,
                  fontWeight: 600,
                  backgroundColor: brandColors.primary.light,
                  color: 'white',
                }}
              >
                {userInitials}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  {userName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userEmail}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <MenuItem onClick={() => handleUserAction('help')} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <HelpOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Help" />
              <OpenInNewIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </MenuItem>
            <MenuItem onClick={() => handleUserAction('notifications')} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <NotificationsNoneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Notification" />
            </MenuItem>
            <MenuItem onClick={() => handleUserAction('logout')} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
