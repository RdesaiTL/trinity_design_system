import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box, TextField, Switch, FormControlLabel, Typography, Divider, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import {
  Person as PersonIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as AppearanceIcon,
  Language as LanguageIcon,
  Storage as DataIcon,
  CreditCard as BillingIcon,
  Group as TeamIcon,
} from '@mui/icons-material';
import { SettingsTemplate, type SettingsNavItem, type SettingsSection } from '../components/templates/Settings';

const meta: Meta<typeof SettingsTemplate> = {
  title: 'Templates/SettingsTemplate',
  component: SettingsTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A settings page template with sidebar navigation and form sections.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const navItems: SettingsNavItem[] = [
  { id: 'profile', label: 'Profile', description: 'Your personal information', icon: <PersonIcon /> },
  { id: 'security', label: 'Security', description: 'Password and authentication', icon: <SecurityIcon /> },
  { id: 'notifications', label: 'Notifications', description: 'Email and push settings', icon: <NotificationsIcon />, badge: 3 },
  { id: 'appearance', label: 'Appearance', description: 'Theme and display', icon: <AppearanceIcon /> },
  { id: 'language', label: 'Language & Region', icon: <LanguageIcon /> },
  { id: 'data', label: 'Data & Privacy', icon: <DataIcon /> },
  { id: 'billing', label: 'Billing', icon: <BillingIcon /> },
  { id: 'team', label: 'Team', icon: <TeamIcon /> },
];

// Sample form content components
const ProfileSection = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField label="First Name" defaultValue="John" fullWidth />
      <TextField label="Last Name" defaultValue="Smith" fullWidth />
    </Box>
    <TextField label="Email" defaultValue="john.smith@example.com" fullWidth />
    <TextField label="Bio" multiline rows={3} defaultValue="Software developer passionate about UX." fullWidth />
  </Box>
);

const SecuritySection = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <TextField label="Current Password" type="password" fullWidth />
    <TextField label="New Password" type="password" fullWidth />
    <TextField label="Confirm Password" type="password" fullWidth />
    <Divider sx={{ my: 2 }} />
    <Typography variant="subtitle2">Two-Factor Authentication</Typography>
    <FormControlLabel control={<Switch />} label="Enable 2FA" />
  </Box>
);

const NotificationsSection = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Typography variant="subtitle2">Email Notifications</Typography>
    <FormControlLabel control={<Switch defaultChecked />} label="Marketing emails" />
    <FormControlLabel control={<Switch defaultChecked />} label="Product updates" />
    <FormControlLabel control={<Switch />} label="Weekly digest" />
    <Divider sx={{ my: 2 }} />
    <Typography variant="subtitle2">Push Notifications</Typography>
    <FormControlLabel control={<Switch defaultChecked />} label="New messages" />
    <FormControlLabel control={<Switch defaultChecked />} label="Mentions" />
    <FormControlLabel control={<Switch />} label="Reminders" />
  </Box>
);

const AppearanceSection = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <FormControl fullWidth>
      <InputLabel>Theme</InputLabel>
      <Select defaultValue="system" label="Theme">
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
        <MenuItem value="system">System</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth>
      <InputLabel>Font Size</InputLabel>
      <Select defaultValue="medium" label="Font Size">
        <MenuItem value="small">Small</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="large">Large</MenuItem>
      </Select>
    </FormControl>
    <FormControlLabel control={<Switch defaultChecked />} label="Show sidebar labels" />
    <FormControlLabel control={<Switch />} label="Compact mode" />
  </Box>
);

const sections: SettingsSection[] = [
  { id: 'profile', title: 'Profile Settings', description: 'Manage your personal information and how it appears to others.', content: <ProfileSection /> },
  { id: 'security', title: 'Security Settings', description: 'Protect your account with strong security measures.', content: <SecuritySection /> },
  { id: 'notifications', title: 'Notification Preferences', description: 'Control how and when you receive notifications.', content: <NotificationsSection /> },
  { id: 'appearance', title: 'Appearance', description: 'Customize the look and feel of the application.', content: <AppearanceSection /> },
  { id: 'language', title: 'Language & Region', description: 'Set your preferred language and regional settings.', content: <Typography color="text.secondary">Language settings content...</Typography> },
  { id: 'data', title: 'Data & Privacy', description: 'Manage your data and privacy preferences.', content: <Typography color="text.secondary">Data & Privacy content...</Typography> },
  { id: 'billing', title: 'Billing', description: 'Manage your subscription and payment methods.', content: <Typography color="text.secondary">Billing content...</Typography> },
  { id: 'team', title: 'Team Settings', description: 'Manage your team members and permissions.', content: <Typography color="text.secondary">Team settings content...</Typography> },
];

export const Default: Story = {
  args: {
    title: 'Settings',
    navItems,
    sections,
    onSave: () => console.log('Save clicked'),
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    ...Default.args,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Account' },
      { label: 'Settings' },
    ],
  },
};

export const WithHeaderActions: Story = {
  args: {
    ...Default.args,
    headerActions: (
      <Button variant="outlined" size="small">Cancel</Button>
    ),
  },
};

export const WithoutSaveButton: Story = {
  args: {
    ...Default.args,
    showSaveButton: false,
  },
};

export const SavingState: Story = {
  args: {
    ...Default.args,
    saving: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        alert('Settings saved!');
      }, 1500);
    };

    return (
      <SettingsTemplate
        title="Settings"
        navItems={navItems}
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onSave={handleSave}
        saving={saving}
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Settings' },
        ]}
      />
    );
  },
};

export const NarrowSidebar: Story = {
  args: {
    ...Default.args,
    sidebarWidth: 220,
    showDividers: false,
  },
};
