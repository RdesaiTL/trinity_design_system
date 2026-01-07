import * as React from 'react';
import {
  Menu, MenuItem, Button, IconButton, Divider, ListItemIcon, ListItemText,
  Typography, Paper, MenuList,
} from '@mui/material';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import Check from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const MenuPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [iconAnchor, setIconAnchor] = React.useState<null | HTMLElement>(null);

  return (
    <ComponentPage
      title="Menu"
      description="Menus display a list of choices on temporary surfaces."
    >
      <Section title="Basic">
        <Showcase>
          <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Open Menu</Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
          </Menu>
        </Showcase>
      </Section>

      <Section title="Icon Menu">
        <Showcase>
          <IconButton onClick={(e) => setIconAnchor(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={iconAnchor} open={Boolean(iconAnchor)} onClose={() => setIconAnchor(null)}>
            <MenuItem onClick={() => setIconAnchor(null)}>Edit</MenuItem>
            <MenuItem onClick={() => setIconAnchor(null)}>Duplicate</MenuItem>
            <Divider />
            <MenuItem onClick={() => setIconAnchor(null)}>Archive</MenuItem>
            <MenuItem onClick={() => setIconAnchor(null)} sx={{ color: 'error.main' }}>Delete</MenuItem>
          </Menu>
        </Showcase>
      </Section>

      <Section title="With Icons">
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
              <ListItemText>Cut</ListItemText>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>⌘X</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
              <ListItemText>Copy</ListItemText>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>⌘C</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
              <ListItemText>Paste</ListItemText>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>⌘V</Typography>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
              <ListItemText>Web Clipboard</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Section>

      <Section title="Dense">
        <Paper sx={{ width: 320 }}>
          <MenuList dense>
            <MenuItem>
              <ListItemText inset>Single</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText inset>1.15</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText inset>Double</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><Check /></ListItemIcon>
              Custom: 1.2
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemText>Add space before paragraph</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Add space after paragraph</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemText>Custom spacing...</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Section>

      <Section title="Selected">
        <Paper sx={{ width: 220 }}>
          <MenuList>
            <MenuItem>Default</MenuItem>
            <MenuItem selected>Selected Item</MenuItem>
            <MenuItem>Another Item</MenuItem>
          </MenuList>
        </Paper>
      </Section>
    </ComponentPage>
  );
};
