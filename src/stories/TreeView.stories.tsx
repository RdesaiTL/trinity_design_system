import type { Meta, StoryObj } from '@storybook/react';
import { TreeView, TreeNode } from '../components/TreeView';
import { Box, Typography, Chip } from '@mui/material';
import {
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  InsertDriveFile as FileIcon,
  Code as CodeIcon,
  Image as ImageIcon,
  Description as DocIcon,
  Javascript as JsIcon,
  Css as CssIcon,
} from '@mui/icons-material';

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A hierarchical tree view component with expand/collapse, selection, search, and drag-and-drop capabilities.',
      },
    },
  },
  argTypes: {
    multiSelect: {
      control: 'boolean',
      description: 'Enable multi-select mode',
    },
    showCheckboxes: {
      control: 'boolean',
      description: 'Show checkboxes for selection',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search filtering',
    },
    showIcons: {
      control: 'boolean',
      description: 'Show folder/file icons',
    },
    dense: {
      control: 'boolean',
      description: 'Dense mode with reduced padding',
    },
    draggable: {
      control: 'boolean',
      description: 'Enable drag and drop',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample file system data
const fileSystemData: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'Button.tsx', label: 'Button.tsx' },
          { id: 'Card.tsx', label: 'Card.tsx' },
          { id: 'Input.tsx', label: 'Input.tsx' },
          {
            id: 'shared',
            label: 'shared',
            children: [
              { id: 'utils.ts', label: 'utils.ts' },
              { id: 'types.ts', label: 'types.ts' },
            ],
          },
        ],
      },
      {
        id: 'pages',
        label: 'pages',
        children: [
          { id: 'Home.tsx', label: 'Home.tsx' },
          { id: 'About.tsx', label: 'About.tsx' },
          { id: 'Contact.tsx', label: 'Contact.tsx' },
        ],
      },
      { id: 'App.tsx', label: 'App.tsx' },
      { id: 'index.tsx', label: 'index.tsx' },
      { id: 'theme.ts', label: 'theme.ts' },
    ],
  },
  {
    id: 'public',
    label: 'public',
    children: [
      { id: 'index.html', label: 'index.html' },
      { id: 'favicon.ico', label: 'favicon.ico' },
      {
        id: 'assets',
        label: 'assets',
        children: [
          { id: 'logo.svg', label: 'logo.svg' },
          { id: 'hero.png', label: 'hero.png' },
        ],
      },
    ],
  },
  { id: 'package.json', label: 'package.json' },
  { id: 'tsconfig.json', label: 'tsconfig.json' },
  { id: 'README.md', label: 'README.md' },
];

// Organization hierarchy data
const orgData: TreeNode[] = [
  {
    id: 'ceo',
    label: 'CEO - Jane Smith',
    children: [
      {
        id: 'cto',
        label: 'CTO - John Doe',
        children: [
          {
            id: 'eng-manager',
            label: 'Engineering Manager',
            children: [
              { id: 'dev-1', label: 'Senior Developer' },
              { id: 'dev-2', label: 'Developer' },
              { id: 'dev-3', label: 'Junior Developer' },
            ],
          },
          {
            id: 'qa-manager',
            label: 'QA Manager',
            children: [
              { id: 'qa-1', label: 'QA Engineer' },
              { id: 'qa-2', label: 'QA Engineer' },
            ],
          },
        ],
      },
      {
        id: 'cfo',
        label: 'CFO - Bob Wilson',
        children: [
          { id: 'accountant', label: 'Senior Accountant' },
          { id: 'analyst', label: 'Financial Analyst' },
        ],
      },
      {
        id: 'cmo',
        label: 'CMO - Alice Brown',
        children: [
          { id: 'marketing-1', label: 'Marketing Manager' },
          { id: 'marketing-2', label: 'Content Strategist' },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    data: fileSystemData,
    showIcons: true,
    searchable: false,
  },
};

export const WithSearch: Story = {
  args: {
    data: fileSystemData,
    showIcons: true,
    searchable: true,
    searchPlaceholder: 'Search files...',
  },
};

export const MultiSelect: Story = {
  args: {
    data: fileSystemData,
    showIcons: true,
    multiSelect: true,
    showCheckboxes: true,
  },
};

export const Dense: Story = {
  args: {
    data: fileSystemData,
    showIcons: true,
    dense: true,
  },
};

export const NoIcons: Story = {
  args: {
    data: fileSystemData,
    showIcons: false,
  },
};

export const OrganizationChart: Story = {
  args: {
    data: orgData,
    showIcons: false,
    expanded: ['ceo', 'cto', 'cfo', 'cmo'],
  },
  render: (args) => (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Organization Structure
      </Typography>
      <TreeView {...args} />
    </Box>
  ),
};

export const CustomIcons: Story = {
  render: () => {
    const getFileIcon = (filename: string) => {
      if (filename.endsWith('.tsx') || filename.endsWith('.ts')) {
        return <CodeIcon fontSize="small" color="primary" />;
      }
      if (filename.endsWith('.js')) {
        return <JsIcon fontSize="small" sx={{ color: '#f7df1e' }} />;
      }
      if (filename.endsWith('.css')) {
        return <CssIcon fontSize="small" sx={{ color: '#264de4' }} />;
      }
      if (filename.endsWith('.png') || filename.endsWith('.svg') || filename.endsWith('.ico')) {
        return <ImageIcon fontSize="small" color="secondary" />;
      }
      if (filename.endsWith('.json') || filename.endsWith('.md')) {
        return <DocIcon fontSize="small" color="action" />;
      }
      return <FileIcon fontSize="small" />;
    };

    const dataWithIcons: TreeNode[] = [
      {
        id: 'project',
        label: 'my-project',
        children: [
          {
            id: 'src',
            label: 'src',
            children: [
              { id: 'app.tsx', label: 'App.tsx', icon: getFileIcon('App.tsx') },
              { id: 'index.tsx', label: 'index.tsx', icon: getFileIcon('index.tsx') },
              { id: 'styles.css', label: 'styles.css', icon: getFileIcon('styles.css') },
            ],
          },
          { id: 'package.json', label: 'package.json', icon: getFileIcon('package.json') },
          { id: 'README.md', label: 'README.md', icon: getFileIcon('README.md') },
        ],
      },
    ];

    return (
      <Box sx={{ maxWidth: 350 }}>
        <TreeView
          data={dataWithIcons}
          showIcons={true}
          expanded={['project', 'src']}
          defaultBranchIcon={<FolderIcon fontSize="small" sx={{ color: '#ffc107' }} />}
          defaultBranchOpenIcon={<FolderOpenIcon fontSize="small" sx={{ color: '#ffc107' }} />}
        />
      </Box>
    );
  },
};

export const CustomRender: Story = {
  render: () => {
    const dataWithMeta: TreeNode[] = [
      {
        id: 'feature-1',
        label: 'User Authentication',
        data: { status: 'completed', priority: 'high' },
        children: [
          { id: 'task-1-1', label: 'Login Form', data: { status: 'completed' } },
          { id: 'task-1-2', label: 'Registration', data: { status: 'completed' } },
          { id: 'task-1-3', label: 'Password Reset', data: { status: 'in-progress' } },
        ],
      },
      {
        id: 'feature-2',
        label: 'Dashboard',
        data: { status: 'in-progress', priority: 'medium' },
        children: [
          { id: 'task-2-1', label: 'Analytics Charts', data: { status: 'completed' } },
          { id: 'task-2-2', label: 'User Statistics', data: { status: 'in-progress' } },
          { id: 'task-2-3', label: 'Export Reports', data: { status: 'pending' } },
        ],
      },
      {
        id: 'feature-3',
        label: 'Settings',
        data: { status: 'pending', priority: 'low' },
        children: [
          { id: 'task-3-1', label: 'Profile Settings', data: { status: 'pending' } },
          { id: 'task-3-2', label: 'Notifications', data: { status: 'pending' } },
        ],
      },
    ];

    return (
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Project Tasks
        </Typography>
        <TreeView
          data={dataWithMeta}
          showIcons={false}
          expanded={['feature-1', 'feature-2']}
          renderNode={(node) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              <Typography variant="body2" sx={{ flex: 1 }}>
                {node.label}
              </Typography>
              {node.data?.status && (
                <Chip
                  label={node.data.status}
                  size="small"
                  color={
                    node.data.status === 'completed'
                      ? 'success'
                      : node.data.status === 'in-progress'
                      ? 'warning'
                      : 'default'
                  }
                  sx={{ fontSize: '0.65rem', height: 20 }}
                />
              )}
            </Box>
          )}
        />
      </Box>
    );
  },
};

export const Draggable: Story = {
  args: {
    data: fileSystemData,
    showIcons: true,
    draggable: true,
    expanded: ['src', 'components'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Tree view with drag and drop enabled. Drag items to reorganize.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['Button.tsx']);
    const [expanded, setExpanded] = React.useState<string[]>(['src', 'components']);

    return (
      <Box sx={{ maxWidth: 350 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Selected: {selected.join(', ') || 'None'}
        </Typography>
        <TreeView
          data={fileSystemData}
          showIcons={true}
          selected={selected}
          expanded={expanded}
          onSelect={setSelected}
          onExpand={setExpanded}
        />
      </Box>
    );
  },
};

// Need React for the controlled story
import React from 'react';
