import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Menu,
  MenuItem,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Divider,
  MenuList,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import { useState, MouseEvent } from 'react';
import { brandColors } from '../tokens';

/**
 * # Menu
 * 
 * Menus display a list of choices on a temporary surface.
 * They appear when users interact with a button or other control.
 * 
 * ## Types
 * - **Basic Menu**: Simple list of actions
 * - **Icon Menu**: Menu triggered by icon button
 * - **Context Menu**: Right-click menu
 * - **Nested Menu**: Menu with submenus
 * 
 * ## Design Guidelines
 * - Keep menu items under 15 for usability
 * - Group related items with dividers
 * - Use icons consistently (all or none)
 * - Place destructive actions at the bottom
 */

interface MenuDemoProps {
  variant?: 'basic' | 'withIcons' | 'contextMenu' | 'accountMenu' | 'actionMenu' | 'customized';
}

const MenuDemo = ({ variant = 'basic' }: MenuDemoProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState('');
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    handleClose();
  };

  if (variant === 'withIcons') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Menu with Icons</Typography>
        <Button
          variant="outlined"
          onClick={handleClick}
          aria-controls={open ? 'icon-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          Open Menu
        </Button>
        <Menu
          id="icon-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'icon-menu-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentCutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" color="text.secondary">⌘X</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentCopyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" color="text.secondary">⌘C</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentPasteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" color="text.secondary">⌘V</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  if (variant === 'contextMenu') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Context Menu (Icon Button)</Typography>
        <Stack direction="row" spacing={2}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">Market Analysis Report</Typography>
              <Typography variant="body2" color="text.secondary">
                Last modified: 2 hours ago
              </Typography>
            </Box>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Paper>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ShareIcon fontSize="small" />
            </ListItemIcon>
            Share
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>
            Download
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PrintIcon fontSize="small" />
            </ListItemIcon>
            Print
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  if (variant === 'accountMenu') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Account Menu</Typography>
        <Button
          variant="outlined"
          onClick={handleClick}
          startIcon={<PersonIcon />}
        >
          John Doe
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              minWidth: 220,
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2">John Doe</Typography>
            <Typography variant="body2" color="text.secondary">
              john.doe@company.com
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  if (variant === 'actionMenu') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Action Menu with Selection</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Selected: {selected || 'None'}
        </Typography>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          Select Status
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {['Draft', 'In Review', 'Published', 'Archived'].map((status) => (
            <MenuItem
              key={status}
              onClick={() => handleSelect(status)}
              selected={selected === status}
            >
              {selected === status && (
                <ListItemIcon>
                  <CheckIcon fontSize="small" />
                </ListItemIcon>
              )}
              <ListItemText inset={selected !== status}>{status}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }

  if (variant === 'customized') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Customized Menus</Typography>
        <Stack spacing={4}>
          {/* Dense Menu */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Dense Menu</Typography>
            <Paper sx={{ maxWidth: 200 }}>
              <MenuList dense>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Settings</MenuItem>
                <Divider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Paper>
          </Box>

          {/* Styled Menu */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Brand Styled</Typography>
            <Paper 
              sx={{ 
                maxWidth: 200,
                bgcolor: brandColors.primary.main,
                color: 'white',
              }}
            >
              <MenuList>
                <MenuItem sx={{ 
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  color: 'inherit',
                }}>
                  Dashboard
                </MenuItem>
                <MenuItem sx={{ 
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  color: 'inherit',
                }}>
                  Analytics
                </MenuItem>
                <MenuItem sx={{ 
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  color: 'inherit',
                }}>
                  Reports
                </MenuItem>
                <MenuItem sx={{ 
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  color: 'inherit',
                }}>
                  Settings
                </MenuItem>
              </MenuList>
            </Paper>
          </Box>

          {/* Menu with Descriptions */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>With Descriptions</Typography>
            <Paper sx={{ maxWidth: 280 }}>
              <MenuList>
                <MenuItem sx={{ py: 1.5 }}>
                  <Box>
                    <Typography variant="body2">Quick Export</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Export data as CSV
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem sx={{ py: 1.5 }}>
                  <Box>
                    <Typography variant="body2">Scheduled Export</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Set up automatic exports
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem sx={{ py: 1.5 }}>
                  <Box>
                    <Typography variant="body2">API Integration</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Connect to external systems
                    </Typography>
                  </Box>
                </MenuItem>
              </MenuList>
            </Paper>
          </Box>
        </Stack>
      </Box>
    );
  }

  // basic variant (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Basic Menu</Typography>
      <Button
        variant="outlined"
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>

      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle2" gutterBottom>Static Menu Preview</Typography>
        <Paper sx={{ maxWidth: 200 }}>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem selected>My account</MenuItem>
            <MenuItem>Settings</MenuItem>
            <Divider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Paper>
      </Box>
    </Box>
  );
};

const meta: Meta<typeof MenuDemo> = {
  title: 'Navigation/Menu',
  component: MenuDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Menus for displaying lists of actions.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'withIcons', 'contextMenu', 'accountMenu', 'actionMenu', 'customized'],
      description: 'Menu demo variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic menu usage.
 */
export const Basic: Story = {
  args: {
    variant: 'basic',
  },
};

/**
 * Menu with icons and keyboard shortcuts.
 */
export const WithIcons: Story = {
  args: {
    variant: 'withIcons',
  },
};

/**
 * Context menu triggered by icon button.
 */
export const ContextMenu: Story = {
  args: {
    variant: 'contextMenu',
  },
};

/**
 * Account/user menu pattern.
 */
export const AccountMenu: Story = {
  args: {
    variant: 'accountMenu',
  },
};

/**
 * Menu with selection state.
 */
export const ActionMenu: Story = {
  args: {
    variant: 'actionMenu',
  },
};

/**
 * Customized menu styles.
 */
export const Customized: Story = {
  args: {
    variant: 'customized',
  },
};
