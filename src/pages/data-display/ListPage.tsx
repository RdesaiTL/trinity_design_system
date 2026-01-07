import * as React from 'react';
import {
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar,
  Avatar, Checkbox, IconButton, Switch, Collapse, Box,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import WorkIcon from '@mui/icons-material/Work';
import ImageIcon from '@mui/icons-material/Image';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { ComponentPage, Section } from '../../components/shared';

export const ListPage: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <ComponentPage
      title="List"
      description="Lists are continuous, vertical indexes of text or images."
    >
      <Section title="Basic">
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><DraftsIcon /></ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Section>

      <Section title="Nested List">
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            <ListItemButton>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="Folders" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon><StarIcon /></ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Section>

      <Section title="With Avatar">
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            <ListItem>
              <ListItemAvatar><Avatar><ImageIcon /></Avatar></ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2024" />
            </ListItem>
            <ListItem>
              <ListItemAvatar><Avatar><WorkIcon /></Avatar></ListItemAvatar>
              <ListItemText primary="Work" secondary="Jan 7, 2024" />
            </ListItem>
            <ListItem>
              <ListItemAvatar><Avatar><BeachAccessIcon /></Avatar></ListItemAvatar>
              <ListItemText primary="Vacation" secondary="July 20, 2024" />
            </ListItem>
          </List>
        </Box>
      </Section>

      <Section title="With Checkbox">
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            {[0, 1, 2, 3].map((value) => (
              <ListItem key={value} disablePadding>
                <ListItemButton onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={`Line item ${value + 1}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Section>

      <Section title="With Secondary Action">
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            <ListItem secondaryAction={<IconButton edge="end"><DeleteIcon /></IconButton>}>
              <ListItemAvatar><Avatar><FolderIcon /></Avatar></ListItemAvatar>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem secondaryAction={<Switch edge="end" />}>
              <ListItemAvatar><Avatar><FolderIcon /></Avatar></ListItemAvatar>
              <ListItemText primary="With switch" />
            </ListItem>
          </List>
        </Box>
      </Section>

      <Section title="Dense">
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List dense>
            <ListItem><ListItemText primary="Dense item 1" /></ListItem>
            <ListItem><ListItemText primary="Dense item 2" /></ListItem>
            <ListItem><ListItemText primary="Dense item 3" /></ListItem>
          </List>
        </Box>
      </Section>
    </ComponentPage>
  );
};
