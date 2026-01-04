import type { Meta, StoryObj } from '@storybook/react';
import { DockLayout, DockPanel, DockZone } from '../components/DockLayout';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  Folder as FolderIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Search as SearchIcon,
  Output as OutputIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import React from 'react';

const meta: Meta<typeof DockLayout> = {
  title: 'Components/DockLayout',
  component: DockLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A VS Code-style dockable panel layout system. Supports tabbed zones, split layouts, drag-and-drop panels, and panel action menus.',
      },
    },
  },
  argTypes: {
    showPanelActions: {
      control: 'boolean',
    },
    draggable: {
      control: 'boolean',
    },
    compact: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper components
const FileExplorer = () => (
  <Box sx={{ p: 1 }}>
    <List dense disablePadding>
      {['src/', 'components/', 'App.tsx', 'index.ts', 'theme.ts'].map((item) => (
        <ListItem key={item} sx={{ py: 0.25 }}>
          <ListItemIcon sx={{ minWidth: 28 }}>
            <FolderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
      ))}
    </List>
  </Box>
);

const SearchPanel = () => (
  <Box sx={{ p: 2 }}>
    <Box
      component="input"
      placeholder="Search files..."
      sx={{
        width: '100%',
        p: 1,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        mb: 2,
      }}
    />
    <Typography variant="body2" color="text.secondary">
      No results yet
    </Typography>
  </Box>
);

const EditorContent = ({ filename = 'App.tsx' }: { filename?: string }) => (
  <Box sx={{ p: 2, fontFamily: 'monospace', fontSize: 12 }}>
    <Box component="pre" sx={{ m: 0, color: 'text.secondary' }}>
{`// ${filename}
import React from 'react';

export const Component = () => {
  return <div>Hello World</div>;
};`}
    </Box>
  </Box>
);

const TerminalContent = () => (
  <Box sx={{ p: 1, bgcolor: 'grey.900', color: 'grey.100', height: '100%', fontFamily: 'monospace', fontSize: 12 }}>
    <Box component="pre" sx={{ m: 0 }}>
{`$ npm run dev
> vite

  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:5173/`}
    </Box>
  </Box>
);

const OutputPanel = () => (
  <Box sx={{ p: 1, fontFamily: 'monospace', fontSize: 11 }}>
    <Typography variant="body2" color="text.secondary">
      [12:30:15] Build started...
    </Typography>
    <Typography variant="body2" color="success.main">
      [12:30:17] Build completed successfully
    </Typography>
  </Box>
);

const ProblemsPanel = () => (
  <Box sx={{ p: 1 }}>
    <List dense disablePadding>
      <ListItem>
        <ListItemIcon sx={{ minWidth: 28 }}>
          <ErrorIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText 
          primary="Type error in App.tsx" 
          secondary="Line 15"
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: 28 }}>
          <WarningIcon fontSize="small" color="warning" />
        </ListItemIcon>
        <ListItemText 
          primary="Unused import" 
          secondary="Line 3"
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItem>
    </List>
  </Box>
);

// Sample panels
const samplePanels: DockPanel[] = [
  { id: 'explorer', title: 'Explorer', icon: <FolderIcon fontSize="small" />, content: <FileExplorer /> },
  { id: 'search', title: 'Search', icon: <SearchIcon fontSize="small" />, content: <SearchPanel /> },
  { id: 'editor1', title: 'App.tsx', icon: <CodeIcon fontSize="small" />, content: <EditorContent /> },
  { id: 'editor2', title: 'index.ts', icon: <CodeIcon fontSize="small" />, content: <EditorContent filename="index.ts" /> },
  { id: 'terminal', title: 'Terminal', icon: <TerminalIcon fontSize="small" />, content: <TerminalContent /> },
  { id: 'output', title: 'Output', icon: <OutputIcon fontSize="small" />, content: <OutputPanel /> },
  { id: 'problems', title: 'Problems', icon: <ErrorIcon fontSize="small" />, content: <ProblemsPanel /> },
];

// Simple layout with horizontal split
const simpleLayout: DockZone = {
  id: 'root',
  type: 'split-horizontal',
  panels: [],
  children: [
    {
      id: 'sidebar',
      type: 'tabs',
      panels: ['explorer', 'search'],
      activePanel: 'explorer',
      size: 0.25,
    },
    {
      id: 'main',
      type: 'tabs',
      panels: ['editor1', 'editor2'],
      activePanel: 'editor1',
      size: 0.75,
    },
  ],
};

export const Default: Story = {
  render: () => {
    const [layout, setLayout] = React.useState<DockZone>(simpleLayout);
    
    return (
      <Box sx={{ height: 500 }}>
        <DockLayout
          panels={samplePanels}
          layout={layout}
          onLayoutChange={setLayout}
          showPanelActions
        />
      </Box>
    );
  },
};

// IDE-like layout
const ideLayout: DockZone = {
  id: 'root',
  type: 'split-horizontal',
  panels: [],
  children: [
    {
      id: 'sidebar',
      type: 'tabs',
      panels: ['explorer', 'search'],
      activePanel: 'explorer',
      size: 0.2,
    },
    {
      id: 'center',
      type: 'split-vertical',
      panels: [],
      size: 0.8,
      children: [
        {
          id: 'editors',
          type: 'tabs',
          panels: ['editor1', 'editor2'],
          activePanel: 'editor1',
          size: 0.7,
        },
        {
          id: 'bottom',
          type: 'tabs',
          panels: ['terminal', 'output', 'problems'],
          activePanel: 'terminal',
          size: 0.3,
        },
      ],
    },
  ],
};

export const IDELayout: Story = {
  render: () => {
    const [layout, setLayout] = React.useState<DockZone>(ideLayout);
    
    return (
      <Box sx={{ height: 600 }}>
        <DockLayout
          panels={samplePanels}
          layout={layout}
          onLayoutChange={setLayout}
          showPanelActions
          draggable
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A full IDE-like layout with sidebar, editor tabs, and bottom panel area.',
      },
    },
  },
};

// Vertical split layout
const verticalLayout: DockZone = {
  id: 'root',
  type: 'split-vertical',
  panels: [],
  children: [
    {
      id: 'top',
      type: 'tabs',
      panels: ['editor1'],
      activePanel: 'editor1',
      size: 0.6,
    },
    {
      id: 'bottom',
      type: 'tabs',
      panels: ['terminal', 'output'],
      activePanel: 'terminal',
      size: 0.4,
    },
  ],
};

export const VerticalSplit: Story = {
  render: () => {
    const [layout, setLayout] = React.useState<DockZone>(verticalLayout);
    
    return (
      <Box sx={{ height: 500 }}>
        <DockLayout
          panels={samplePanels}
          layout={layout}
          onLayoutChange={setLayout}
          showPanelActions
        />
      </Box>
    );
  },
};

// Single zone with tabs
const singleZoneLayout: DockZone = {
  id: 'root',
  type: 'tabs',
  panels: ['editor1', 'editor2', 'terminal'],
  activePanel: 'editor1',
};

export const SingleZone: Story = {
  render: () => {
    const [layout, setLayout] = React.useState<DockZone>(singleZoneLayout);
    
    return (
      <Box sx={{ height: 400 }}>
        <DockLayout
          panels={samplePanels}
          layout={layout}
          onLayoutChange={setLayout}
          showPanelActions
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A single zone with multiple tabbed panels.',
      },
    },
  },
};

export const CompactMode: Story = {
  render: () => {
    const [layout, setLayout] = React.useState<DockZone>(simpleLayout);
    
    return (
      <Box sx={{ height: 400 }}>
        <DockLayout
          panels={samplePanels}
          layout={layout}
          onLayoutChange={setLayout}
          showPanelActions
          compact
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact mode reduces spacing for denser layouts.',
      },
    },
  },
};

export const WithoutPanelActions: Story = {
  render: () => {
    const [layout, setLayout] = React.useState<DockZone>(simpleLayout);
    
    return (
      <Box sx={{ height: 400 }}>
        <DockLayout
          panels={samplePanels}
          layout={layout}
          onLayoutChange={setLayout}
          showPanelActions={false}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Panel actions menu hidden for a cleaner appearance.',
      },
    },
  },
};

// Three-column layout
const threeColumnLayout: DockZone = {
  id: 'root',
  type: 'split-horizontal',
  panels: [],
  children: [
    {
      id: 'left',
      type: 'tabs',
      panels: ['explorer'],
      activePanel: 'explorer',
      size: 0.2,
    },
    {
      id: 'center',
      type: 'tabs',
      panels: ['editor1', 'editor2'],
      activePanel: 'editor1',
      size: 0.6,
    },
    {
      id: 'right',
      type: 'tabs',
      panels: ['problems', 'output'],
      activePanel: 'problems',
      size: 0.2,
    },
  ],
};

export const ThreeColumnLayout: Story = {
  render: () => {
    const [layout, setLayout] = React.useState<DockZone>(threeColumnLayout);
    
    return (
      <Box sx={{ height: 500 }}>
        <DockLayout
          panels={samplePanels}
          layout={layout}
          onLayoutChange={setLayout}
          showPanelActions
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A three-column layout with sidebar, main content, and properties panel.',
      },
    },
  },
};
