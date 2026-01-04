import type { Meta, StoryObj } from '@storybook/react';
import { TransferList, TransferListItem } from '../components/TransferList';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import React from 'react';

const meta: Meta<typeof TransferList> = {
  title: 'Components/TransferList',
  component: TransferList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A dual-list selection component for transferring items between two lists. Supports search, custom rendering, and various selection modes.',
      },
    },
  },
  argTypes: {
    searchable: {
      control: 'boolean',
      description: 'Enable search filtering in both lists',
    },
    showMoveAll: {
      control: 'boolean',
      description: 'Show "move all" buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire component',
    },
    dense: {
      control: 'boolean',
      description: 'Dense mode with reduced padding',
    },
    height: {
      control: 'number',
      description: 'Height of the lists in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data - Permissions
const availablePermissions: TransferListItem[] = [
  { id: 'read', label: 'Read', secondary: 'View content' },
  { id: 'write', label: 'Write', secondary: 'Create and edit content' },
  { id: 'delete', label: 'Delete', secondary: 'Remove content' },
  { id: 'admin', label: 'Admin', secondary: 'Full access' },
  { id: 'export', label: 'Export', secondary: 'Export data' },
  { id: 'import', label: 'Import', secondary: 'Import data' },
  { id: 'share', label: 'Share', secondary: 'Share with others' },
  { id: 'comment', label: 'Comment', secondary: 'Add comments' },
];

const selectedPermissions: TransferListItem[] = [
  { id: 'read', label: 'Read', secondary: 'View content' },
];

// Sample data - Team members
const availableMembers: TransferListItem[] = [
  { id: 'user-1', label: 'Alice Johnson', secondary: 'Engineering' },
  { id: 'user-2', label: 'Bob Smith', secondary: 'Design' },
  { id: 'user-3', label: 'Carol Williams', secondary: 'Product' },
  { id: 'user-4', label: 'David Brown', secondary: 'Marketing' },
  { id: 'user-5', label: 'Eve Davis', secondary: 'Sales' },
  { id: 'user-6', label: 'Frank Miller', secondary: 'Engineering' },
  { id: 'user-7', label: 'Grace Wilson', secondary: 'Design' },
  { id: 'user-8', label: 'Henry Taylor', secondary: 'Product' },
];

const selectedMembers: TransferListItem[] = [];

export const Default: Story = {
  args: {
    leftItems: availablePermissions.filter(p => p.id !== 'read'),
    rightItems: selectedPermissions,
    leftTitle: 'Available Permissions',
    rightTitle: 'Assigned Permissions',
  },
};

export const WithSearch: Story = {
  args: {
    leftItems: availableMembers,
    rightItems: selectedMembers,
    leftTitle: 'Available Members',
    rightTitle: 'Team Members',
    searchable: true,
    searchPlaceholder: 'Search members...',
  },
};

export const Dense: Story = {
  args: {
    leftItems: availablePermissions.filter(p => p.id !== 'read'),
    rightItems: selectedPermissions,
    leftTitle: 'Available',
    rightTitle: 'Selected',
    dense: true,
    height: 200,
  },
};

export const WithoutMoveAll: Story = {
  args: {
    leftItems: availableMembers,
    rightItems: selectedMembers,
    leftTitle: 'Available',
    rightTitle: 'Selected',
    showMoveAll: false,
  },
};

export const Disabled: Story = {
  args: {
    leftItems: availablePermissions.filter(p => p.id !== 'read'),
    rightItems: selectedPermissions,
    leftTitle: 'Available Permissions',
    rightTitle: 'Assigned Permissions',
    disabled: true,
  },
};

export const WithDisabledItems: Story = {
  args: {
    leftItems: [
      { id: 'read', label: 'Read', secondary: 'View content' },
      { id: 'write', label: 'Write', secondary: 'Create and edit content' },
      { id: 'delete', label: 'Delete', secondary: 'Remove content', disabled: true },
      { id: 'admin', label: 'Admin', secondary: 'Full access', disabled: true },
    ],
    rightItems: [],
    leftTitle: 'Available Permissions',
    rightTitle: 'Assigned Permissions',
  },
  parameters: {
    docs: {
      description: {
        story: 'Some items can be disabled and cannot be selected or transferred.',
      },
    },
  },
};

export const CustomRenderItem: Story = {
  render: () => {
    const members: TransferListItem[] = availableMembers.map((m, i) => ({
      ...m,
      data: { avatar: `https://i.pravatar.cc/40?img=${i + 1}` },
    }));

    const [left, setLeft] = React.useState(members.slice(0, 5));
    const [right, setRight] = React.useState(members.slice(5));

    return (
      <TransferList
        leftItems={left}
        rightItems={right}
        leftTitle="Available Team Members"
        rightTitle="Project Team"
        searchable
        onChange={(newLeft, newRight) => {
          setLeft(newLeft);
          setRight(newRight);
        }}
        renderItem={(item, selected) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
            <Avatar
              src={item.data?.avatar as string}
              sx={{ width: 32, height: 32 }}
            >
              {item.label[0]}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={selected ? 600 : 400}>
                {item.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.secondary}
              </Typography>
            </Box>
          </Box>
        )}
      />
    );
  },
};

export const RoleAssignment: Story = {
  render: () => {
    const roles: TransferListItem[] = [
      { id: 'viewer', label: 'Viewer', secondary: 'Can view dashboards' },
      { id: 'editor', label: 'Editor', secondary: 'Can edit content' },
      { id: 'moderator', label: 'Moderator', secondary: 'Can moderate comments' },
      { id: 'publisher', label: 'Publisher', secondary: 'Can publish content' },
      { id: 'analyst', label: 'Analyst', secondary: 'Can access analytics' },
      { id: 'admin', label: 'Administrator', secondary: 'Full system access' },
    ];

    const [available, setAvailable] = React.useState(roles.slice(0, 4));
    const [assigned, setAssigned] = React.useState(roles.slice(4));

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Assign Roles to User
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Select which roles to assign to this user account.
        </Typography>
        <TransferList
          leftItems={available}
          rightItems={assigned}
          leftTitle="Available Roles"
          rightTitle="Assigned Roles"
          searchable
          onChange={(newAvailable, newAssigned) => {
            setAvailable(newAvailable);
            setAssigned(newAssigned);
          }}
          renderItem={(item) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WorkIcon fontSize="small" color="action" />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2">{item.label}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.secondary}
                </Typography>
              </Box>
            </Box>
          )}
        />
      </Box>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const allItems: TransferListItem[] = [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
      { id: '4', label: 'Item 4' },
      { id: '5', label: 'Item 5' },
    ];

    const [left, setLeft] = React.useState(allItems.slice(0, 3));
    const [right, setRight] = React.useState(allItems.slice(3));

    return (
      <Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Left items: {left.map(i => i.label).join(', ') || 'None'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Right items: {right.map(i => i.label).join(', ') || 'None'}
          </Typography>
        </Box>
        <TransferList
          leftItems={left}
          rightItems={right}
          onChange={(newLeft, newRight) => {
            setLeft(newLeft);
            setRight(newRight);
          }}
        />
      </Box>
    );
  },
};
