import type { Meta, StoryObj } from '@storybook/react';
import { SplitPane } from '../components/SplitPane';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import {
  Folder as FolderIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const meta: Meta<typeof SplitPane> = {
  title: 'Components/SplitPane',
  component: SplitPane,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A resizable split pane component for creating flexible layouts. Supports horizontal and vertical orientations, min/max constraints, and collapsible panels.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    defaultSize: {
      control: { type: 'text' },
    },
    minSize: {
      control: 'number',
    },
    maxSize: {
      control: 'number',
    },
    resizerSize: {
      control: { type: 'number', min: 1, max: 16 },
    },
    showResizerIcon: {
      control: 'boolean',
    },
    doubleClickReset: {
      control: 'boolean',
    },
    collapsedFirst: {
      control: 'boolean',
    },
    collapsedSecond: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper components for demos
const FileTree = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
      <FolderIcon fontSize="small" /> Explorer
    </Typography>
    <List dense disablePadding>
      {['src/', 'components/', 'App.tsx', 'index.ts', 'theme.ts'].map((item, i) => (
        <ListItem key={i} sx={{ py: 0.25 }}>
          <ListItemText 
            primary={item} 
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

const CodeEditor = () => (
  <Box sx={{ p: 2, fontFamily: 'monospace', fontSize: 13 }}>
    <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
      <CodeIcon fontSize="small" /> App.tsx
    </Typography>
    <Box component="pre" sx={{ m: 0, color: 'text.secondary' }}>
{`import React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>Hello World</div>
    </ThemeProvider>
  );
};`}
    </Box>
  </Box>
);

const TerminalPanel = () => (
  <Box sx={{ p: 2, bgcolor: 'grey.900', color: 'grey.100', height: '100%' }}>
    <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
      <TerminalIcon fontSize="small" /> Terminal
    </Typography>
    <Box component="pre" sx={{ m: 0, fontFamily: 'monospace', fontSize: 12 }}>
{`$ npm run dev
  VITE v5.0.0  ready in 234 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose`}
    </Box>
  </Box>
);

const Panel = ({ title, children, icon }: { title: string; children?: React.ReactNode; icon?: React.ReactNode }) => (
  <Paper 
    elevation={0} 
    sx={{ 
      height: '100%', 
      overflow: 'auto',
      bgcolor: 'background.paper',
      borderRadius: 0,
    }}
  >
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Typography variant="subtitle2">{title}</Typography>
    </Box>
    <Box sx={{ p: 2 }}>
      {children || <Typography color="text.secondary">Panel content</Typography>}
    </Box>
  </Paper>
);

export const Default: Story = {
  render: () => (
    <Box sx={{ height: 400, border: 1, borderColor: 'divider' }}>
      <SplitPane direction="horizontal" defaultSize="30%">
        <Panel title="Left Panel" icon={<FolderIcon fontSize="small" />}>
          <Typography variant="body2" color="text.secondary">
            Drag the divider to resize
          </Typography>
        </Panel>
        <Panel title="Right Panel" icon={<CodeIcon fontSize="small" />}>
          <Typography variant="body2" color="text.secondary">
            This is the secondary panel
          </Typography>
        </Panel>
      </SplitPane>
    </Box>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box sx={{ height: 400, border: 1, borderColor: 'divider' }}>
      <SplitPane direction="vertical" defaultSize="60%">
        <Panel title="Top Panel">
          <Typography variant="body2" color="text.secondary">
            This panel is above
          </Typography>
        </Panel>
        <Panel title="Bottom Panel">
          <Typography variant="body2" color="text.secondary">
            This panel is below
          </Typography>
        </Panel>
      </SplitPane>
    </Box>
  ),
};

export const IDELayout: Story = {
  render: () => (
    <Box sx={{ height: 500, border: 1, borderColor: 'divider' }}>
      <SplitPane direction="horizontal" defaultSize="20%" minSize={150} maxSize={400}>
        <FileTree />
        <SplitPane direction="vertical" defaultSize="70%">
          <CodeEditor />
          <TerminalPanel />
        </SplitPane>
      </SplitPane>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nested SplitPanes can create complex IDE-like layouts with file tree, editor, and terminal.',
      },
    },
  },
};

export const WithConstraints: Story = {
  render: () => (
    <Box sx={{ height: 400, border: 1, borderColor: 'divider' }}>
      <SplitPane direction="horizontal" defaultSize="30%" minSize={200} maxSize={500}>
        <Panel title="Constrained Panel">
          <Typography variant="body2" color="text.secondary">
            This panel has min: 200px, max: 500px
          </Typography>
        </Panel>
        <Panel title="Secondary Panel">
          <Typography variant="body2" color="text.secondary">
            The primary panel's size is constrained
          </Typography>
        </Panel>
      </SplitPane>
    </Box>
  ),
};

export const CollapsedFirst: Story = {
  render: () => (
    <Box sx={{ height: 400, border: 1, borderColor: 'divider' }}>
      <SplitPane direction="horizontal" defaultSize="25%" collapsedFirst>
        <Panel title="Sidebar" icon={<FolderIcon fontSize="small" />}>
          <Typography variant="body2" color="text.secondary">
            This panel starts collapsed
          </Typography>
        </Panel>
        <Panel title="Main Content" icon={<CodeIcon fontSize="small" />}>
          <Typography variant="body2" color="text.secondary">
            Double-click the divider to expand the sidebar
          </Typography>
        </Panel>
      </SplitPane>
    </Box>
  ),
};

export const CollapsedSecond: Story = {
  render: () => (
    <Box sx={{ height: 400, border: 1, borderColor: 'divider' }}>
      <SplitPane direction="horizontal" defaultSize="75%" collapsedSecond>
        <Panel title="Main Content" icon={<CodeIcon fontSize="small" />}>
          <Typography variant="body2" color="text.secondary">
            The secondary panel is collapsed
          </Typography>
        </Panel>
        <Panel title="Properties" icon={<SettingsIcon fontSize="small" />}>
          <Typography variant="body2" color="text.secondary">
            Double-click to expand
          </Typography>
        </Panel>
      </SplitPane>
    </Box>
  ),
};

export const CustomResizerSize: Story = {
  render: () => (
    <Box sx={{ height: 400, border: 1, borderColor: 'divider' }}>
      <SplitPane direction="horizontal" defaultSize="40%" resizerSize={12}>
        <Panel title="Left">
          <Typography variant="body2" color="text.secondary">
            Thicker resizer (12px)
          </Typography>
        </Panel>
        <Panel title="Right">
          <Typography variant="body2" color="text.secondary">
            Easier to grab on touch devices
          </Typography>
        </Panel>
      </SplitPane>
    </Box>
  ),
};

export const NoResizerIcon: Story = {
  render: () => (
    <Box sx={{ height: 400, border: 1, borderColor: 'divider' }}>
      <SplitPane direction="horizontal" defaultSize="35%" showResizerIcon={false}>
        <Panel title="Left Panel">
          <Typography variant="body2" color="text.secondary">
            Resizer has no drag icon
          </Typography>
        </Panel>
        <Panel title="Right Panel">
          <Typography variant="body2" color="text.secondary">
            Cleaner minimal appearance
          </Typography>
        </Panel>
      </SplitPane>
    </Box>
  ),
};

export const ThreePanes: Story = {
  render: () => (
    <Box sx={{ height: 400, border: 1, borderColor: 'divider' }}>
      <SplitPane direction="horizontal" defaultSize="25%" minSize={150}>
        <Panel title="Navigation" icon={<FolderIcon fontSize="small" />} />
        <SplitPane direction="horizontal" defaultSize="60%">
          <Panel title="Content" icon={<CodeIcon fontSize="small" />} />
          <Panel title="Properties" icon={<SettingsIcon fontSize="small" />} />
        </SplitPane>
      </SplitPane>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Create three-pane layouts common in many applications.',
      },
    },
  },
};

export const GridLayout: Story = {
  render: () => (
    <Box sx={{ height: 500, border: 1, borderColor: 'divider' }}>
      <SplitPane direction="vertical" defaultSize="50%">
        <SplitPane direction="horizontal" defaultSize="50%">
          <Panel title="Top Left" />
          <Panel title="Top Right" />
        </SplitPane>
        <SplitPane direction="horizontal" defaultSize="50%">
          <Panel title="Bottom Left" />
          <Panel title="Bottom Right" />
        </SplitPane>
      </SplitPane>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Create a 2x2 grid layout by nesting horizontal and vertical split panes.',
      },
    },
  },
};
