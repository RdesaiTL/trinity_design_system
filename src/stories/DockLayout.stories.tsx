import type { Meta, StoryObj } from '@storybook/react';
import { DockLayout, DockPanel, DockZone } from '../components/DockLayout';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import {
  Folder as FolderIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Search as SearchIcon,
  BugReport as DebugIcon,
  Extension as ExtensionIcon,
  Settings as SettingsIcon,
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
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    showPanelActions: {
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

export const Default: Story = {
  args: {
    direction: 'horizontal',
    zones: [
      {
        id: 'sidebar',
        size: 20,
        panels: [
          { id: 'explorer', title: 'Explorer', icon: <FolderIcon fontSize="small" />, content: <FileExplorer /> },
          { id: 'search', title: 'Search', icon: <SearchIcon fontSize="small" />, content: <SearchPanel /> },
        ],
      },
      {
        id: 'main',
        size: 60,
        panels: [
          { id: 'editor1', title: 'App.tsx', icon: <CodeIcon fontSize="small" />, content: <EditorContent /> },
          { id: 'editor2', title: 'index.ts', icon: <CodeIcon fontSize="small" />, content: <EditorContent filename="index.ts" /> },
        ],
      },
      {
        id: 'panel',
        size: 20,
        panels: [
          { id: 'terminal', title: 'Terminal', icon: <TerminalIcon fontSize="small" />, content: <TerminalContent /> },
        ],
      },
    ],
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 500 }}>
        <Story />
      </Box>
    ),
  ],
};

export const IDELayout: Story = {
  render: () => (
    <Box sx={{ height: 600 }}>
      <DockLayout
        direction="horizontal"
        zones={[
          {
            id: 'left-sidebar',
            size: 18,
            panels: [
              { id: 'explorer', title: 'Explorer', icon: <FolderIcon fontSize="small" />, content: <FileExplorer /> },
              { id: 'search', title: 'Search', icon: <SearchIcon fontSize="small" />, content: <SearchPanel /> },
              { id: 'debug', title: 'Debug', icon: <DebugIcon fontSize="small" />, content: <Box sx={{ p: 2 }}>Debug panel</Box> },
              { id: 'extensions', title: 'Extensions', icon: <ExtensionIcon fontSize="small" />, content: <Box sx={{ p: 2 }}>Extensions</Box> },
            ],
          },
          {
            id: 'editor-area',
            size: 62,
            direction: 'vertical',
            children: [
              {
                id: 'editors',
                size: 70,
                panels: [
                  { id: 'app', title: 'App.tsx', icon: <CodeIcon fontSize="small" />, content: <EditorContent /> },
                  { id: 'theme', title: 'theme.ts', icon: <CodeIcon fontSize="small" />, content: <EditorContent filename="theme.ts" /> },
                  { id: 'index', title: 'index.ts', icon: <CodeIcon fontSize="small" />, content: <EditorContent filename="index.ts" /> },
                ],
              },
              {
                id: 'bottom-panel',
                size: 30,
                panels: [
                  { id: 'terminal', title: 'Terminal', icon: <TerminalIcon fontSize="small" />, content: <TerminalContent /> },
                  { id: 'output', title: 'Output', icon: <OutputIcon fontSize="small" />, content: <OutputPanel /> },
                  { id: 'problems', title: 'Problems', icon: <ErrorIcon fontSize="small" />, content: <ProblemsPanel /> },
                ],
              },
            ],
          },
          {
            id: 'right-sidebar',
            size: 20,
            panels: [
              { id: 'outline', title: 'Outline', icon: <CodeIcon fontSize="small" />, content: <Box sx={{ p: 2 }}>Document outline</Box> },
            ],
          },
        ]}
        showPanelActions
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A full IDE-like layout with sidebars, editor tabs, and bottom panel area.',
      },
    },
  },
};

export const VerticalSplit: Story = {
  args: {
    direction: 'vertical',
    zones: [
      {
        id: 'top',
        size: 60,
        panels: [
          { id: 'editor', title: 'Editor', icon: <CodeIcon fontSize="small" />, content: <EditorContent /> },
        ],
      },
      {
        id: 'bottom',
        size: 40,
        panels: [
          { id: 'terminal', title: 'Terminal', icon: <TerminalIcon fontSize="small" />, content: <TerminalContent /> },
          { id: 'output', title: 'Output', icon: <OutputIcon fontSize="small" />, content: <OutputPanel /> },
        ],
      },
    ],
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 500 }}>
        <Story />
      </Box>
    ),
  ],
};

export const SingleZone: Story = {
  args: {
    zones: [
      {
        id: 'main',
        size: 100,
        panels: [
          { id: 'file1', title: 'file1.tsx', icon: <CodeIcon fontSize="small" />, content: <EditorContent filename="file1.tsx" /> },
          { id: 'file2', title: 'file2.tsx', icon: <CodeIcon fontSize="small" />, content: <EditorContent filename="file2.tsx" /> },
          { id: 'file3', title: 'file3.tsx', icon: <CodeIcon fontSize="small" />, content: <EditorContent filename="file3.tsx" /> },
        ],
      },
    ],
    showPanelActions: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 400 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'A single zone with multiple tabbed panels.',
      },
    },
  },
};

export const WithPanelActions: Story = {
  args: {
    direction: 'horizontal',
    showPanelActions: true,
    onPanelClose: (panelId) => console.log('Close panel:', panelId),
    onPanelMaximize: (panelId) => console.log('Maximize panel:', panelId),
    onPanelMove: (panelId, targetZoneId) => console.log('Move panel:', panelId, 'to', targetZoneId),
    zones: [
      {
        id: 'left',
        size: 30,
        panels: [
          { id: 'panel1', title: 'Panel 1', icon: <FolderIcon fontSize="small" />, content: <Box sx={{ p: 2 }}>Panel 1 content</Box> },
        ],
      },
      {
        id: 'right',
        size: 70,
        panels: [
          { id: 'panel2', title: 'Panel 2', icon: <CodeIcon fontSize="small" />, content: <Box sx={{ p: 2 }}>Panel 2 content</Box> },
          { id: 'panel3', title: 'Panel 3', icon: <TerminalIcon fontSize="small" />, content: <Box sx={{ p: 2 }}>Panel 3 content</Box> },
        ],
      },
    ],
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 400 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Panel actions menu visible on each tab for close, maximize, and move operations.',
      },
    },
  },
};

export const NestedZones: Story = {
  render: () => (
    <Box sx={{ height: 500 }}>
      <DockLayout
        direction="horizontal"
        zones={[
          {
            id: 'sidebar',
            size: 25,
            panels: [
              { id: 'explorer', title: 'Explorer', content: <FileExplorer /> },
            ],
          },
          {
            id: 'center',
            size: 75,
            direction: 'horizontal',
            children: [
              {
                id: 'editor-left',
                size: 50,
                panels: [
                  { id: 'editor1', title: 'Left Editor', content: <EditorContent filename="left.tsx" /> },
                ],
              },
              {
                id: 'editor-right',
                size: 50,
                panels: [
                  { id: 'editor2', title: 'Right Editor', content: <EditorContent filename="right.tsx" /> },
                ],
              },
            ],
          },
        ]}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Split editors side-by-side using nested zones.',
      },
    },
  },
};

export const DarkThemePreview: Story = {
  render: () => (
    <Box sx={{ height: 500, bgcolor: 'grey.900', color: 'grey.100' }}>
      <DockLayout
        direction="horizontal"
        zones={[
          {
            id: 'sidebar',
            size: 22,
            panels: [
              { id: 'explorer', title: 'Explorer', icon: <FolderIcon fontSize="small" />, content: <FileExplorer /> },
            ],
          },
          {
            id: 'main',
            size: 78,
            direction: 'vertical',
            children: [
              {
                id: 'editor',
                size: 65,
                panels: [
                  { id: 'file', title: 'App.tsx', icon: <CodeIcon fontSize="small" />, content: <EditorContent /> },
                ],
              },
              {
                id: 'terminal',
                size: 35,
                panels: [
                  { id: 'term', title: 'Terminal', icon: <TerminalIcon fontSize="small" />, content: <TerminalContent /> },
                ],
              },
            ],
          },
        ]}
      />
    </Box>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'DockLayout adapts to dark theme backgrounds.',
      },
    },
  },
};

export const MinimalLayout: Story = {
  args: {
    direction: 'horizontal',
    zones: [
      {
        id: 'nav',
        size: 15,
        minSize: 100,
        panels: [
          { id: 'menu', title: 'Menu', content: <Box sx={{ p: 2 }}>Navigation</Box> },
        ],
      },
      {
        id: 'content',
        size: 85,
        panels: [
          { id: 'main', title: 'Content', content: <Box sx={{ p: 2 }}>Main content area</Box> },
        ],
      },
    ],
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 350 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'A minimal two-panel layout suitable for admin dashboards.',
      },
    },
  },
};
