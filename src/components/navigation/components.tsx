/**
 * Navigation - Shared Components
 * Reusable navigation sub-components
 */

import React from 'react';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AppsIcon from '@mui/icons-material/Apps';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { brandColors } from '../../tokens';
import trinityLogoWhite from '../../assets/trinity-logo-white.svg';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  ClearButton,
  ClientSelector,
  HeaderIconButton,
} from './styled';
import { Client, App } from './types';

// ============================================================================
// TRINITY LOGO
// ============================================================================

export interface TrinityLogoProps {
  height?: number;
}

export const TrinityLogo: React.FC<TrinityLogoProps> = ({ height = 28 }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <img src={trinityLogoWhite} alt="Trinity" height={height} />
  </Box>
);

// ============================================================================
// SEARCH BAR
// ============================================================================

export interface SearchBarProps {
  value: string;
  isFocused: boolean;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  onClear: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  isFocused,
  placeholder = 'Search',
  onChange,
  onKeyPress,
  onClear,
  onFocus,
  onBlur,
}) => (
  <Search focused={isFocused.toString()}>
    <SearchIconWrapper focused={isFocused.toString()}>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder={placeholder}
      inputProps={{ 'aria-label': 'search' }}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      onBlur={onBlur}
      focused={isFocused.toString()}
    />
    <ClearButton
      show={(value.length > 0).toString()}
      onClick={onClear}
      size="small"
      aria-label="Clear search"
    >
      <ClearIcon fontSize="small" />
    </ClearButton>
  </Search>
);

// ============================================================================
// CLIENT MENU
// ============================================================================

export interface ClientMenuProps {
  selectedClient: string;
  clients: Client[];
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onButtonClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onSelect: (client: Client) => void;
}

export const ClientMenu: React.FC<ClientMenuProps> = ({
  selectedClient,
  clients,
  anchorEl,
  isOpen,
  onButtonClick,
  onClose,
  onSelect,
}) => (
  <>
    <ClientSelector
      onClick={onButtonClick}
      endIcon={<KeyboardArrowDownIcon />}
      aria-label={`Current client: ${selectedClient}. Click to switch clients`}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      {selectedClient}
    </ClientSelector>
    <Menu
      id="client-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
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
      >
        Switch Clients
      </Typography>
      {clients.map((client) => (
        <MenuItem
          key={client.id}
          onClick={() => onSelect(client)}
          selected={client.name === selectedClient}
          aria-selected={client.name === selectedClient}
          role="option"
          sx={{ py: 1 }}
        >
          {client.name}
        </MenuItem>
      ))}
    </Menu>
  </>
);

// ============================================================================
// APPS MENU
// ============================================================================

export interface AppsMenuProps {
  apps: App[];
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onButtonClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onSelect: (appId: string) => void;
}

export const AppsMenu: React.FC<AppsMenuProps> = ({
  apps,
  anchorEl,
  isOpen,
  onButtonClick,
  onClose,
  onSelect,
}) => (
  <>
    <HeaderIconButton
      onClick={onButtonClick}
      aria-label="Applications menu"
      aria-haspopup="menu"
      aria-expanded={isOpen}
    >
      <AppsIcon />
    </HeaderIconButton>
    <Menu
      id="apps-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
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
          minWidth: 280,
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ px: 2, py: 1.5, fontWeight: 600, color: 'text.primary' }}
      >
        Trinity Applications
      </Typography>
      {apps.map((app) => (
        <MenuItem
          key={app.id}
          onClick={() => onSelect(app.id)}
          sx={{ py: 1.5 }}
        >
          <ListItemText primary={app.name} />
          {app.url && (
            <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
              <OpenInNewIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </ListItemIcon>
          )}
        </MenuItem>
      ))}
    </Menu>
  </>
);

// ============================================================================
// USER MENU
// ============================================================================

export interface UserMenuProps {
  userInitials: string;
  userName: string;
  userEmail: string;
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onButtonClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onAction: (action: string) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  userInitials,
  userName,
  userEmail,
  anchorEl,
  isOpen,
  onButtonClick,
  onClose,
  onAction,
}) => (
  <>
    <HeaderIconButton
      onClick={onButtonClick}
      aria-label="User menu"
      aria-haspopup="menu"
      aria-expanded={isOpen}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          fontSize: 13,
          fontWeight: 600,
          bgcolor: brandColors.secondary.main,
          color: 'white',
        }}
      >
        {userInitials}
      </Avatar>
    </HeaderIconButton>
    <Menu
      id="user-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
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
          minWidth: 280,
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userEmail}
        </Typography>
      </Box>
      <Divider />
      <MenuItem onClick={() => onAction('help')} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <HelpOutlineIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Help & Support" />
      </MenuItem>
      <MenuItem onClick={() => onAction('notifications')} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <NotificationsNoneIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => onAction('logout')} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </MenuItem>
    </Menu>
  </>
);

// ============================================================================
// HELP & NOTIFICATIONS BUTTONS
// ============================================================================

export interface HeaderActionsProps {
  onHelpClick?: () => void;
  onNotificationsClick?: () => void;
  showHelp?: boolean;
  showNotifications?: boolean;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  onHelpClick,
  onNotificationsClick,
  showHelp = true,
  showNotifications = true,
}) => (
  <>
    {showHelp && (
      <HeaderIconButton
        aria-label="Help"
        onClick={onHelpClick}
      >
        <HelpOutlineIcon />
      </HeaderIconButton>
    )}
    {showNotifications && (
      <HeaderIconButton
        aria-label="Notifications"
        onClick={onNotificationsClick}
      >
        <NotificationsNoneIcon />
      </HeaderIconButton>
    )}
  </>
);
