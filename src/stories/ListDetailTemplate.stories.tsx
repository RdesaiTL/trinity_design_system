import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box, Typography, Chip, IconButton, Avatar, Divider } from '@mui/material';
import {
  Email as EmailIcon,
  Archive as ArchiveIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
} from '@mui/icons-material';
import { ListDetailTemplate, type ListDetailItem } from '../components/templates/ListDetail';

const meta: Meta<typeof ListDetailTemplate> = {
  title: 'Templates/ListDetailTemplate',
  component: ListDetailTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A master-detail split view template for displaying list items with detailed views.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '100vh', bgcolor: 'background.default' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleEmails: ListDetailItem[] = [
  {
    id: '1',
    title: 'Project Update - Q4 Review',
    subtitle: 'Hi team, I wanted to share the Q4 review document with everyone...',
    avatar: 'https://i.pravatar.cc/40?u=sarah',
    meta: '10:30 AM',
    unread: true,
    status: 'info',
  },
  {
    id: '2',
    title: 'Meeting Reminder',
    subtitle: 'Don\'t forget our standup meeting tomorrow at 9 AM',
    avatar: 'https://i.pravatar.cc/40?u=mike',
    meta: 'Yesterday',
    unread: true,
  },
  {
    id: '3',
    title: 'Invoice #12345',
    subtitle: 'Your invoice for December services is ready',
    avatarInitials: 'AB',
    meta: 'Dec 28',
    badge: '$2,500',
    status: 'success',
  },
  {
    id: '4',
    title: 'Welcome to the team!',
    subtitle: 'We\'re excited to have you join us. Here\'s what you need to know...',
    avatar: 'https://i.pravatar.cc/40?u=hr',
    meta: 'Dec 25',
  },
  {
    id: '5',
    title: 'Security Alert',
    subtitle: 'Unusual login activity detected on your account',
    icon: <EmailIcon fontSize="small" />,
    meta: 'Dec 20',
    status: 'warning',
  },
  {
    id: '6',
    title: 'Your subscription expires soon',
    subtitle: 'Renew now to keep your premium features',
    avatarInitials: 'SB',
    meta: 'Dec 15',
    status: 'error',
  },
];

// Email detail content
const EmailDetail = ({ email }: { email: ListDetailItem }) => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
      <Avatar src={email.avatar} sx={{ width: 48, height: 48 }}>
        {email.avatarInitials}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">{email.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          From: sender@example.com
        </Typography>
        <Typography variant="caption" color="text.secondary">
          To: me@example.com • {email.meta}
        </Typography>
      </Box>
    </Box>
    <Divider sx={{ mb: 3 }} />
    <Typography variant="body1" paragraph>
      Hi there,
    </Typography>
    <Typography variant="body1" paragraph>
      {email.subtitle}
    </Typography>
    <Typography variant="body1" paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </Typography>
    <Typography variant="body1" paragraph>
      Best regards,<br />
      The Team
    </Typography>
  </Box>
);

export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>('1');
    const [searchValue, setSearchValue] = useState('');
    
    const selectedEmail = sampleEmails.find(e => e.id === selectedId);

    return (
      <Box sx={{ height: '100%', p: 3 }}>
        <ListDetailTemplate
          items={sampleEmails}
          selectedId={selectedId}
          onSelect={(item) => setSelectedId(item.id)}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search emails..."
          listHeader={
            <Typography variant="h6" fontWeight={600}>Inbox</Typography>
          }
          detailHeader={
            selectedEmail && (
              <Typography variant="subtitle1" fontWeight={500} noWrap>
                {selectedEmail.title}
              </Typography>
            )
          }
          detailActions={
            selectedEmail && (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton size="small"><ReplyIcon /></IconButton>
                <IconButton size="small"><ForwardIcon /></IconButton>
                <IconButton size="small"><ArchiveIcon /></IconButton>
                <IconButton size="small"><DeleteIcon /></IconButton>
              </Box>
            )
          }
          detailContent={selectedEmail && <EmailDetail email={selectedEmail} />}
        />
      </Box>
    );
  },
};

export const WithFilters: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState('');

    const selectedEmail = sampleEmails.find(e => e.id === selectedId);

    return (
      <Box sx={{ height: '100%', p: 3 }}>
        <ListDetailTemplate
          items={sampleEmails}
          selectedId={selectedId}
          onSelect={(item) => setSelectedId(item.id)}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          showFilter
          filterCount={2}
          onFilterClick={() => console.log('Filter clicked')}
          listHeader={
            <Box>
              <Typography variant="h6" fontWeight={600}>Messages</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label="All" size="small" color="primary" />
                <Chip label="Unread" size="small" variant="outlined" />
                <Chip label="Starred" size="small" variant="outlined" />
              </Box>
            </Box>
          }
          detailContent={selectedEmail && <EmailDetail email={selectedEmail} />}
          emptyDetailContent={
            <Box sx={{ textAlign: 'center' }}>
              <EmailIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Select an email to read
              </Typography>
            </Box>
          }
        />
      </Box>
    );
  },
};

export const Loading: Story = {
  args: {
    items: [],
    loading: true,
    loadingCount: 8,
    listHeader: <Typography variant="h6" fontWeight={600}>Loading...</Typography>,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '100%', p: 3 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Empty: Story = {
  args: {
    items: [],
    emptyListMessage: 'No emails found',
    listHeader: <Typography variant="h6" fontWeight={600}>Inbox</Typography>,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '100%', p: 3 }}>
        <Story />
      </Box>
    ),
  ],
};

export const CustomListWidth: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>('1');
    const selectedEmail = sampleEmails.find(e => e.id === selectedId);

    return (
      <Box sx={{ height: '100%', p: 3 }}>
        <ListDetailTemplate
          items={sampleEmails}
          selectedId={selectedId}
          onSelect={(item) => setSelectedId(item.id)}
          listWidth={450}
          listHeader={<Typography variant="h6" fontWeight={600}>Wide List</Typography>}
          detailContent={selectedEmail && <EmailDetail email={selectedEmail} />}
        />
      </Box>
    );
  },
};

export const NarrowList: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>('1');
    const selectedEmail = sampleEmails.find(e => e.id === selectedId);

    return (
      <Box sx={{ height: '100%', p: 3 }}>
        <ListDetailTemplate
          items={sampleEmails}
          selectedId={selectedId}
          onSelect={(item) => setSelectedId(item.id)}
          listWidth={280}
          showSearch={false}
          listHeader={<Typography variant="subtitle1" fontWeight={600}>Compact</Typography>}
          detailContent={selectedEmail && <EmailDetail email={selectedEmail} />}
        />
      </Box>
    );
  },
};
