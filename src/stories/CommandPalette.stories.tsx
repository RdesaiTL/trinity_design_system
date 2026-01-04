import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Description as FileIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { CommandPalette, type CommandItem, type CommandGroup } from '../components/CommandPalette';

const meta: Meta<typeof CommandPalette> = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A keyboard-driven command menu following the ⌘K pattern for quick actions and navigation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCommands: CommandItem[] = [
  { id: 'home', label: 'Go to Home', icon: <HomeIcon fontSize="small" />, shortcut: ['⌘', 'H'], group: 'navigation' },
  { id: 'dashboard', label: 'Open Dashboard', icon: <DashboardIcon fontSize="small" />, shortcut: ['⌘', 'D'], group: 'navigation' },
  { id: 'settings', label: 'Open Settings', description: 'Manage your preferences', icon: <SettingsIcon fontSize="small" />, shortcut: ['⌘', ','], group: 'navigation' },
  { id: 'search', label: 'Search Files', icon: <SearchIcon fontSize="small" />, shortcut: ['⌘', 'P'], group: 'actions' },
  { id: 'new-file', label: 'Create New File', icon: <AddIcon fontSize="small" />, shortcut: ['⌘', 'N'], group: 'actions' },
  { id: 'new-project', label: 'Create New Project', icon: <AddIcon fontSize="small" />, group: 'actions' },
  { id: 'profile', label: 'View Profile', icon: <PersonIcon fontSize="small" />, group: 'user' },
  { id: 'docs', label: 'Documentation', description: 'View help and guides', icon: <FileIcon fontSize="small" />, group: 'help' },
  { id: 'support', label: 'Get Support', icon: <HelpIcon fontSize="small" />, group: 'help' },
  { id: 'logout', label: 'Sign Out', icon: <LogoutIcon fontSize="small" />, group: 'user' },
];

const sampleGroups: CommandGroup[] = [
  { id: 'navigation', label: 'Navigation' },
  { id: 'actions', label: 'Actions' },
  { id: 'user', label: 'Account' },
  { id: 'help', label: 'Help' },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Command Palette (⌘K)
        </Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={sampleCommands}
          groups={sampleGroups}
          onCommandSelect={(cmd) => console.log('Selected:', cmd.label)}
        />
      </Box>
    );
  },
};

export const WithRecentCommands: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={sampleCommands}
          groups={sampleGroups}
          recentCommands={['dashboard', 'settings', 'search']}
        />
      </Box>
    );
  },
};

export const SimpleList: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    const simpleCommands: CommandItem[] = [
      { id: '1', label: 'Copy', shortcut: ['⌘', 'C'] },
      { id: '2', label: 'Paste', shortcut: ['⌘', 'V'] },
      { id: '3', label: 'Cut', shortcut: ['⌘', 'X'] },
      { id: '4', label: 'Undo', shortcut: ['⌘', 'Z'] },
      { id: '5', label: 'Redo', shortcut: ['⌘', '⇧', 'Z'] },
    ];

    return (
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Simple Command Palette
        </Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={simpleCommands}
          placeholder="Type a command..."
        />
      </Box>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={sampleCommands}
          placeholder="What would you like to do?"
          emptyMessage="No matching commands. Try a different search."
        />
      </Box>
    );
  },
};

export const WithDisabledCommands: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    const commandsWithDisabled: CommandItem[] = [
      ...sampleCommands.slice(0, 3),
      { id: 'premium', label: 'Premium Feature', description: 'Upgrade to access', icon: <AddIcon fontSize="small" />, disabled: true },
      ...sampleCommands.slice(3),
    ];

    return (
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={commandsWithDisabled}
          groups={sampleGroups}
        />
      </Box>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [lastCommand, setLastCommand] = useState<string | null>(null);

    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Press <kbd>⌘</kbd> + <kbd>K</kbd> or click the button below
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
        {lastCommand && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Last command: <strong>{lastCommand}</strong>
          </Typography>
        )}
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={sampleCommands}
          groups={sampleGroups}
          onCommandSelect={(cmd) => {
            setLastCommand(cmd.label);
            console.log('Executed:', cmd.label);
          }}
        />
      </Box>
    );
  },
};

export const WithoutHints: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={sampleCommands}
          showHints={false}
        />
      </Box>
    );
  },
};
