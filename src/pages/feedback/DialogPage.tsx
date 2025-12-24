import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Button, TextField, Slide, Box, List, ListItem, ListItemButton, ListItemText,
  ListItemAvatar, Avatar, Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { ComponentPage, Section, Showcase } from '../../components/shared';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const emails = ['user1@gmail.com', 'user2@gmail.com'];

export const DialogPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [simpleOpen, setSimpleOpen] = React.useState(false);
  const [fullOpen, setFullOpen] = React.useState(false);

  return (
    <ComponentPage
      title="Dialog"
      description="Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks."
    >
      <Section title="Basic Dialog">
        <Showcase>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Open Dialog
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Basic Dialog</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This is a basic dialog. Dialogs are used to display content that temporarily blocks interactions with the main view.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)} autoFocus>Agree</Button>
            </DialogActions>
          </Dialog>
        </Showcase>
      </Section>

      <Section title="Alert Dialog">
        <Showcase>
          <Button variant="outlined" color="error" onClick={() => setAlertOpen(true)}>
            Delete Item
          </Button>
          <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
            <DialogTitle>Delete this item?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this item? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAlertOpen(false)}>Cancel</Button>
              <Button onClick={() => setAlertOpen(false)} color="error" autoFocus>Delete</Button>
            </DialogActions>
          </Dialog>
        </Showcase>
      </Section>

      <Section title="Form Dialog">
        <Showcase>
          <Button variant="outlined" onClick={() => setFormOpen(true)}>
            Subscribe
          </Button>
          <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your email address to subscribe to our newsletter.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setFormOpen(false)}>Cancel</Button>
              <Button onClick={() => setFormOpen(false)}>Subscribe</Button>
            </DialogActions>
          </Dialog>
        </Showcase>
      </Section>

      <Section title="Simple Dialog">
        <Showcase>
          <Button variant="outlined" onClick={() => setSimpleOpen(true)}>
            Select Account
          </Button>
          <Dialog onClose={() => setSimpleOpen(false)} open={simpleOpen}>
            <DialogTitle>Select account</DialogTitle>
            <List sx={{ pt: 0 }}>
              {emails.map((email) => (
                <ListItem disableGutters key={email}>
                  <ListItemButton onClick={() => setSimpleOpen(false)}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={email} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disableGutters>
                <ListItemButton onClick={() => setSimpleOpen(false)}>
                  <ListItemAvatar>
                    <Avatar>
                      <AddIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Add account" />
                </ListItemButton>
              </ListItem>
            </List>
          </Dialog>
        </Showcase>
      </Section>

      <Section title="Full-screen Dialog">
        <Showcase>
          <Button variant="outlined" onClick={() => setFullOpen(true)}>
            Full Screen
          </Button>
          <Dialog fullScreen open={fullOpen} onClose={() => setFullOpen(false)} TransitionComponent={Transition}>
            <DialogTitle>Full Screen Dialog</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This dialog takes up the full screen. Useful for mobile or complex content.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setFullOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Showcase>
      </Section>

      <Section title="Dialog Sizes">
        <Showcase>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => {
            const [isOpen, setIsOpen] = React.useState(false);
            return (
              <React.Fragment key={size}>
                <Button variant="outlined" onClick={() => setIsOpen(true)}>{size}</Button>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth={size} fullWidth>
                  <DialogTitle>Max Width: {size}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Dialog content with maxWidth="{size}" and fullWidth.</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setIsOpen(false)}>Close</Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            );
          })}
        </Showcase>
      </Section>
    </ComponentPage>
  );
};
