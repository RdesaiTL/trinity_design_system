import * as React from 'react';
import { Tabs, Tab, Box, Typography, Paper } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { ComponentPage, Section, Showcase } from '../../components/shared';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}><Typography>{children}</Typography></Box>}
    </div>
  );
}

export const TabsPage: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  return (
    <ComponentPage
      title="Tabs"
      description="Tabs make it easy to explore and switch between different views."
    >
      <Section title="Basic">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={(_, v) => setValue(v)}>
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>Item One Content</TabPanel>
          <TabPanel value={value} index={1}>Item Two Content</TabPanel>
          <TabPanel value={value} index={2}>Item Three Content</TabPanel>
        </Box>
      </Section>

      <Section title="Colors">
        <Showcase direction="column">
          <Paper>
            <Tabs value={0} textColor="primary" indicatorColor="primary">
              <Tab label="Primary" /><Tab label="Primary" />
            </Tabs>
          </Paper>
          <Paper>
            <Tabs value={0} textColor="secondary" indicatorColor="secondary">
              <Tab label="Secondary" /><Tab label="Secondary" />
            </Tabs>
          </Paper>
        </Showcase>
      </Section>

      <Section title="Disabled Tab">
        <Tabs value={0}>
          <Tab label="Active" />
          <Tab label="Disabled" disabled />
          <Tab label="Active" />
        </Tabs>
      </Section>

      <Section title="Full Width">
        <Box sx={{ width: '100%' }}>
          <Tabs value={value2} onChange={(_, v) => setValue2(v)} variant="fullWidth">
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </Box>
      </Section>

      <Section title="Centered">
        <Box sx={{ width: '100%' }}>
          <Tabs value={0} centered>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </Box>
      </Section>

      <Section title="Scrollable">
        <Box sx={{ maxWidth: 480 }}>
          <Tabs value={0} variant="scrollable" scrollButtons="auto">
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
          </Tabs>
        </Box>
      </Section>

      <Section title="With Icons">
        <Showcase direction="column">
          <Tabs value={0}>
            <Tab icon={<PhoneIcon />} label="Phone" />
            <Tab icon={<FavoriteIcon />} label="Favorites" />
            <Tab icon={<PersonPinIcon />} label="Person" />
          </Tabs>
          <Tabs value={0}>
            <Tab icon={<PhoneIcon />} />
            <Tab icon={<FavoriteIcon />} />
            <Tab icon={<PersonPinIcon />} />
          </Tabs>
          <Tabs value={0}>
            <Tab icon={<PhoneIcon />} iconPosition="start" label="Phone" />
            <Tab icon={<FavoriteIcon />} iconPosition="start" label="Favorites" />
          </Tabs>
        </Showcase>
      </Section>

      <Section title="Vertical">
        <Box sx={{ display: 'flex', height: 200 }}>
          <Tabs orientation="vertical" variant="scrollable" value={0} sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
          </Tabs>
          <Box sx={{ p: 2 }}>
            <Typography>Vertical tab content area</Typography>
          </Box>
        </Box>
      </Section>
    </ComponentPage>
  );
};
