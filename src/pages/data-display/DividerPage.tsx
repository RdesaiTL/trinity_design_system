import * as React from 'react';
import { Divider, Box, Typography, List, ListItem, ListItemText, Chip, Stack } from '@mui/material';
import { ComponentPage, Section } from '../../components/shared';

export const DividerPage: React.FC = () => (
  <ComponentPage
    title="Divider"
    description="A divider is a thin line that groups content in lists and layouts."
  >
    <Section title="Basic">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          <ListItem><ListItemText primary="Item 1" /></ListItem>
          <Divider />
          <ListItem><ListItemText primary="Item 2" /></ListItem>
          <Divider />
          <ListItem><ListItemText primary="Item 3" /></ListItem>
        </List>
      </Box>
    </Section>

    <Section title="Inset">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          <ListItem><ListItemText primary="Item 1" secondary="Secondary text" /></ListItem>
          <Divider variant="inset" />
          <ListItem><ListItemText primary="Item 2" secondary="Secondary text" /></ListItem>
          <Divider variant="inset" />
          <ListItem><ListItemText primary="Item 3" secondary="Secondary text" /></ListItem>
        </List>
      </Box>
    </Section>

    <Section title="Middle">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          <ListItem><ListItemText primary="Item 1" /></ListItem>
          <Divider variant="middle" />
          <ListItem><ListItemText primary="Item 2" /></ListItem>
          <Divider variant="middle" />
          <ListItem><ListItemText primary="Item 3" /></ListItem>
        </List>
      </Box>
    </Section>

    <Section title="With Text">
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Typography>Lorem ipsum dolor sit amet.</Typography>
        <Divider>CENTER</Divider>
        <Typography>Lorem ipsum dolor sit amet.</Typography>
        <Divider textAlign="left">LEFT</Divider>
        <Typography>Lorem ipsum dolor sit amet.</Typography>
        <Divider textAlign="right">RIGHT</Divider>
        <Typography>Lorem ipsum dolor sit amet.</Typography>
      </Box>
    </Section>

    <Section title="With Chip">
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Typography>Lorem ipsum dolor sit amet.</Typography>
        <Divider><Chip label="Chip" size="small" /></Divider>
        <Typography>Lorem ipsum dolor sit amet.</Typography>
      </Box>
    </Section>

    <Section title="Vertical">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: 40 }}>
        <Typography>Item 1</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography>Item 2</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography>Item 3</Typography>
      </Box>
    </Section>

    <Section title="Stack with Dividers">
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Typography>Item 1</Typography>
        <Typography>Item 2</Typography>
        <Typography>Item 3</Typography>
      </Stack>
    </Section>
  </ComponentPage>
);
