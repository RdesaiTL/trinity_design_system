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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import AppsIcon from '@mui/icons-material/Apps';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { brandColors, semanticTokens, componentTokens } from '../tokens';
import trinityLogoWhite from '../assets/trinity-logo-white.svg';

const drawerWidthExpanded = 200;
const drawerWidthCollapsed = 56;

// Styled search component
const Search = styled('div')<{ focused?: string }>(({ theme, focused }) => ({
  position: 'relative',
  borderRadius: `${semanticTokens.borders.radius.menu}px`, // 12px
  backgroundColor: focused === 'true' ? theme.palette.common.white : semanticTokens.effects.onDark.subtle, // 12% white
  '&:hover': {
    backgroundColor: focused === 'true' ? theme.palette.common.white : 'rgba(255, 255, 255, 0.15)', // @intentional-color: hover state
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
    fontSize: semanticTokens.typography.body.small.fontSize, // 14px
    '&::placeholder': {
      color: focused === 'true' ? brandColors.neutral.gray500 : alpha(theme.palette.common.white, 0.5),
      opacity: 1,
    },
  },
}));

const ClearButton = styled(IconButton)<{ show?: string }>(({ show }) => ({
  position: 'absolute',
  right: semanticTokens.inline.tight, // 4px
  top: '50%',
  transform: 'translateY(-50%)',
  padding: semanticTokens.inline.tight, // 4px
  opacity: show === 'true' ? 1 : 0,
  pointerEvents: show === 'true' ? 'auto' : 'none',
  color: brandColors.neutral.gray500,
  '&:hover': {
    backgroundColor: semanticTokens.effects.overlay.hover, // 8%
  },
}));

const ClientSelector = styled(Button)(({ theme }) => ({
  backgroundColor: semanticTokens.effects.onDark.subtle, // 12% white
  color: theme.palette.common.white,
  borderRadius: `${semanticTokens.borders.radius.menu}px`, // 12px
  padding: `${semanticTokens.density.compact.cellPadding}px ${semanticTokens.density.standard.cellPadding}px`, // 6px 12px
  textTransform: 'none',
  fontSize: semanticTokens.typography.body.small.fontSize, // 14px
  fontWeight: semanticTokens.typography.body.small.fontWeight, // 400
  minWidth: 180,
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // @intentional-color: hover state
  },
}));

// Trinity Logo
const TrinityLogo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <img src={trinityLogoWhite} alt="Trinity" height={28} />
  </Box>
);

// Navigation item interface
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isSpecial?: boolean; // For items like "Insight Engine" with gradient background
}

interface App {
  id: string;
  name: string;
  url?: string;
}

interface TopNavWithSidebarProps {
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
  navItems?: NavItem[];
  selectedNavItem?: string;
  onNavItemClick?: (itemId: string) => void;
  children?: React.ReactNode;
}

const defaultNavItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <HomeOutlinedIcon /> },
  { id: 'menu2', label: 'Menu 2', icon: <TrendingUpIcon /> },
  { id: 'menu3', label: 'Menu 3', icon: <TrackChangesIcon /> },
  { id: 'menu4', label: 'Menu 4', icon: <FolderOpenIcon /> },
  { id: 'menu5', label: 'Menu 5', icon: <SupportAgentIcon /> },
  { id: 'insight-engine', label: 'Insight Engine', icon: <AutoAwesomeIcon />, isSpecial: true },
];

export default function TopNavWithSidebar({
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
    { id: 'launch-accelerator', name: 'Launch Accelerator' },
    { id: 'cloudcast', name: 'CloudCast' },
    { id: 'terra', name: 'Terra' },
    { id: 'market-intelligence', name: 'Market Intelligence Dashboard' },
  ],
  navItems = defaultNavItems,
  selectedNavItem = 'home',
  onNavItemClick,
  children,
}: TopNavWithSidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const _isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [clientAnchorEl, setClientAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
  const [appsAnchorEl, setAppsAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = React.useState(clientName);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true);
  const [selectedNav, setSelectedNav] = React.useState(selectedNavItem);
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);

  // On mobile, drawer is always full width when open
  const drawerWidth = isMobile 
    ? drawerWidthExpanded 
    : (sidebarExpanded ? drawerWidthExpanded : drawerWidthCollapsed);

  // Toggle sidebar
  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileDrawerOpen(!mobileDrawerOpen);
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  // Close mobile drawer
  const handleMobileDrawerClose = () => {
    setMobileDrawerOpen(false);
  };

  // Mobile search handlers
  const handleMobileSearchOpen = () => {
    setMobileSearchOpen(true);
  };

  const handleMobileSearchClose = () => {
    setMobileSearchOpen(false);
    setSearchValue('');
    setSearchFocused(false);
  };

  const handleMobileSearchSubmit = () => {
    if (searchValue.trim()) {
      onSearch?.(searchValue);
      handleMobileSearchClose();
    }
  };

  // Nav item click
  const handleNavClick = (itemId: string) => {
    setSelectedNav(itemId);
    onNavItemClick?.(itemId);
    // Close mobile drawer after navigation
    if (isMobile) {
      handleMobileDrawerClose();
    }
  };

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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        component="header"
        sx={{
          backgroundColor: brandColors.primary.main,
          borderBottom: `1px solid ${semanticTokens.effects.onDark.subtle}`, // 12% white
          borderRadius: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: 56, px: { xs: 1, sm: 2 } }}>
          {/* Hamburger Menu */}
          <IconButton
            onClick={handleToggleSidebar}
            aria-label={sidebarExpanded ? 'Collapse sidebar navigation' : 'Expand sidebar navigation'}
            aria-expanded={sidebarExpanded}
            aria-controls="sidebar-navigation"
            sx={{
              color: 'white',
              mr: 1,
              '&:hover': {
                backgroundColor: semanticTokens.effects.onDark.subtle, // 12% white
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Left Section - Logo and App Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, minWidth: 0 }}>
            <TrinityLogo />
            {/* Hide divider and app name on small screens */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)', // @intentional-color: decorative divider
                height: semanticTokens.iconSize.prominent, // 24px
                alignSelf: 'center',
                display: { xs: 'none', sm: 'block' },
              }}
            />
            <Typography
              variant="subtitle1"
              noWrap
              sx={{
                color: 'white',
                fontWeight: semanticTokens.typography.label.medium.fontWeight, // 500
                fontSize: semanticTokens.typography.body.small.fontSize, // 14px
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {appName}
            </Typography>
          </Box>

          {/* Center Section - Search (hidden on mobile, shown as icon) */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {/* Desktop Search Bar */}
            <Search 
              focused={searchFocused.toString()}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
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

          {/* Mobile Search Icon */}
          <IconButton
            onClick={handleMobileSearchOpen}
            aria-label="Open search"
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: semanticTokens.effects.onDark.secondary,
              '&:hover': {
                backgroundColor: semanticTokens.effects.onDark.subtle,
                color: brandColors.neutral.white,
              },
            }}
          >
            <SearchIcon />
          </IconButton>

          {/* Right Section - Client Selector, Apps, User */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
            {/* Client Selector Dropdown - truncated on mobile */}
            <ClientSelector
              onClick={handleClientClick}
              endIcon={<KeyboardArrowDownIcon />}
              aria-label={`Current client: ${selectedClient}. Click to switch clients`}
              aria-haspopup="listbox"
              aria-expanded={Boolean(clientAnchorEl)}
              sx={{
                minWidth: { xs: 100, sm: 180 },
                maxWidth: { xs: 120, sm: 'none' },
                display: { xs: 'none', sm: 'flex' },
                '& .MuiButton-endIcon': {
                  ml: { xs: 0, sm: 1 },
                },
              }}
            >
              <Typography noWrap sx={{ maxWidth: { xs: 80, sm: 'none' } }}>
                {selectedClient}
              </Typography>
            </ClientSelector>
            <Menu
              anchorEl={clientAnchorEl}
              open={Boolean(clientAnchorEl)}
              onClose={handleClientClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { mt: 1, minWidth: 220, borderRadius: semanticTokens.borders.radiusPx.lg, boxShadow: semanticTokens.effects.shadow.floating },
              }}
            >
              <Typography variant="subtitle2" sx={{ px: 2, py: 1.5, fontWeight: semanticTokens.typography.label.medium.fontWeight }}>
                Switch Clients
              </Typography>
              {clients.map((client) => (
                <MenuItem
                  key={client.id}
                  onClick={() => handleClientSelect(client)}
                  selected={client.name === selectedClient}
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
                color: semanticTokens.effects.onDark.secondary, // 70% white
                '&:hover': { backgroundColor: semanticTokens.effects.onDark.subtle, color: brandColors.neutral.white },
              }}
            >
              <AppsIcon />
            </IconButton>
            <Menu
              anchorEl={appsAnchorEl}
              open={Boolean(appsAnchorEl)}
              onClose={handleAppsClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { mt: 1, minWidth: 240, borderRadius: semanticTokens.borders.radiusPx.lg, boxShadow: semanticTokens.effects.shadow.floating },
              }}
            >
              <MenuItem sx={{ py: 1.5 }} onClick={() => handleAppSelect('trinity-edge')}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" fontWeight={semanticTokens.typography.label.medium.fontWeight}>TrinityEDGE</Typography>
                  <Typography variant="caption" color="text.secondary">Apps Access</Typography>
                </Box>
                <OpenInNewIcon fontSize="small" sx={{ color: 'text.secondary', ml: 2 }} />
              </MenuItem>
              <Divider />
              {apps.map((app) => (
                <MenuItem key={app.id} onClick={() => handleAppSelect(app.id)} sx={{ py: 1, justifyContent: 'space-between' }}>
                  <Typography variant="body2">{app.name}</Typography>
                  <OpenInNewIcon fontSize="small" sx={{ color: 'text.secondary', ml: 2 }} />
                </MenuItem>
              ))}
            </Menu>

            {/* User Avatar */}
            <IconButton
              onClick={handleUserClick}
              aria-label={`User menu for ${userName}`}
              aria-haspopup="menu"
              aria-expanded={Boolean(userAnchorEl)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: semanticTokens.borders.radiusPx.lg, // 12px
                padding: `${semanticTokens.inline.tight}px ${semanticTokens.inline.compact}px`, // 4px 8px
                '&:hover': { backgroundColor: semanticTokens.effects.onDark.subtle },
              }}
            >
              <Avatar
                sx={{
                  width: componentTokens.avatar.size.sm,
                  height: componentTokens.avatar.size.sm,
                  fontSize: semanticTokens.typography.label.small.fontSize, // 12px
                  fontWeight: semanticTokens.typography.heading.h6.fontWeight, // 600
                  backgroundColor: brandColors.primary.light,
                  color: 'white',
                }}
              >
                {userInitials}
              </Avatar>
              <KeyboardArrowDownIcon sx={{ color: semanticTokens.effects.onDark.secondary, fontSize: semanticTokens.iconSize.navigation, ml: 0.5 }} />
            </IconButton>
            <Menu
              anchorEl={userAnchorEl}
              open={Boolean(userAnchorEl)}
              onClose={handleUserClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { mt: 1, minWidth: 240, borderRadius: semanticTokens.borders.radiusPx.lg, boxShadow: semanticTokens.effects.shadow.floating },
              }}
            >
              <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: componentTokens.avatar.size.md,
                    height: componentTokens.avatar.size.md,
                    fontSize: semanticTokens.typography.body.small.fontSize, // 14px
                    fontWeight: semanticTokens.typography.heading.h6.fontWeight, // 600
                    backgroundColor: brandColors.primary.light,
                    color: 'white',
                  }}
                >
                  {userInitials}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={semanticTokens.typography.heading.h6.fontWeight}>{userName}</Typography>
                  <Typography variant="caption" color="text.secondary">{userEmail}</Typography>
                </Box>
              </Box>
              <Divider />
              <MenuItem onClick={() => handleUserAction('help')} sx={{ py: 1.5 }}>
                <ListItemIcon><HelpOutlineIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Help" />
                <OpenInNewIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </MenuItem>
              <MenuItem onClick={() => handleUserAction('notifications')} sx={{ py: 1.5 }}>
                <ListItemIcon><NotificationsNoneIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Notification" />
              </MenuItem>
              <MenuItem onClick={() => handleUserAction('logout')} sx={{ py: 1.5 }}>
                <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Log out" />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>

        {/* Mobile Search Drawer */}
        <Drawer
          anchor="top"
          open={mobileSearchOpen}
          onClose={handleMobileSearchClose}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              backgroundColor: brandColors.primary.main,
              pt: 1,
              pb: 2,
            },
          }}
        >
          <Box sx={{ px: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <IconButton
                onClick={handleMobileSearchClose}
                aria-label="Close search"
                sx={{ color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 500 }}>
                Search
              </Typography>
            </Box>
            <Search focused="true" sx={{ maxWidth: 'none', mx: 0 }}>
              <SearchIconWrapper focused="true">
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleMobileSearchSubmit();
                  }
                }}                 
                focused="true"
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
        </Drawer>
      </AppBar>

      {/* Side Navigation Drawer - Permanent on desktop, Temporary on mobile */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileDrawerOpen : true}
        onClose={handleMobileDrawerClose}
        id="sidebar-navigation"
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          width: isMobile ? drawerWidthExpanded : drawerWidth,
          flexShrink: 0,
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            width: isMobile ? drawerWidthExpanded : drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: 'hidden',
            mt: isMobile ? 0 : '56px', // No top margin on mobile (overlay)
          },
        }}
      >
        {/* Mobile drawer header */}
        {isMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Navigation
            </Typography>
            <IconButton onClick={handleMobileDrawerClose} aria-label="Close navigation">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <List 
          component="nav" 
          aria-label="Main navigation"
          sx={{ pt: isMobile ? 1 : 2 }}
        >
          {navItems.map((item) => {
            const isSelected = selectedNav === item.id;
            const isSpecial = item.isSpecial;
            // On mobile, always show expanded view
            const showLabel = isMobile || sidebarExpanded;

            return (
              <ListItem key={item.id} disablePadding sx={{ px: 1, mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isSelected ? 'page' : undefined}
                  aria-label={showLabel ? undefined : item.label}
                  sx={{
                    borderRadius: semanticTokens.borders.radiusPx.md, // 8px
                    minHeight: componentTokens.avatar.size.md, // 40px
                    justifyContent: showLabel ? 'initial' : 'center',
                    px: showLabel ? 1.5 : 1,
                    // Special gradient background for Insight Engine when selected
                    ...(isSpecial && isSelected && {
                      background: `linear-gradient(135deg, ${brandColors.secondary.main} 0%, ${brandColors.primary.light} 100%)`,
                      color: 'white',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${brandColors.secondary.main} 0%, ${brandColors.primary.light} 100%)`,
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    }),
                    // Normal selected state
                    ...(!isSpecial && isSelected && {
                      backgroundColor: brandColors.primary.main,
                      color: 'white',
                      '&:hover': {
                        backgroundColor: brandColors.primary.main,
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    }),
                    // Hover state for non-selected items
                    ...(!isSelected && {
                      '&:hover': {
                        backgroundColor: semanticTokens.effects.overlay.hover, // 8%
                      },
                    }),
                    // Special item non-selected state (icon has gradient)
                    ...(isSpecial && !isSelected && {
                      '& .MuiListItemIcon-root': {
                        color: brandColors.secondary.main,
                      },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: showLabel ? 1.5 : 0,
                      justifyContent: 'center',
                      color: isSelected ? 'inherit' : brandColors.primary.light,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {showLabel && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: semanticTokens.typography.body.small.fontSize, // 14px
                        fontWeight: isSelected ? semanticTokens.typography.label.medium.fontWeight : semanticTokens.typography.body.medium.fontWeight,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '56px', // Height of AppBar
          // On mobile, main content takes full width (no sidebar margin)
          ml: isMobile ? 0 : `${drawerWidth}px`,
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
          backgroundColor: 'background.default',
          height: 'calc(100vh - 56px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          '& > *': {
            flex: 1,
            minHeight: 0,
          },
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
