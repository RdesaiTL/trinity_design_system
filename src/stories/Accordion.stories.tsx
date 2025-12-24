import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { brandColors } from '../theme';

/**
 * # Accordion
 * 
 * Accordions contain creation flows and allow lightweight editing of an element.
 * They display a list of high-level options that can expand to reveal more detail.
 * 
 * ## Use Cases
 * - **FAQ sections**: Questions and answers
 * - **Settings panels**: Grouped configuration options
 * - **Navigation**: Expandable menu sections
 * - **Content sections**: Collapsible content areas
 * 
 * ## Design Guidelines
 * - Use descriptive headers
 * - Keep expanded content focused
 * - Consider allowing only one section open at a time
 * - Use icons to enhance visual hierarchy
 * 
 * ## Accessibility
 * - Keyboard navigation with Enter/Space
 * - Proper ARIA expanded states
 * - Focus management
 */

interface AccordionDemoProps {
  variant?: 'default' | 'outlined' | 'faq' | 'settings' | 'checklist';
  allowMultiple?: boolean;
}

const AccordionDemo = ({ variant = 'default', allowMultiple = true }: AccordionDemoProps) => {
  const [expanded, setExpanded] = useState<string | false>(allowMultiple ? false : 'panel1');

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (variant === 'faq') {
    const faqs = [
      {
        question: 'What is Launch Accelerator?',
        answer: 'Launch Accelerator is Trinity\'s flagship platform for pharmaceutical product launch planning and execution. It combines market intelligence, competitive analysis, and AI-powered insights to help you make better launch decisions.',
      },
      {
        question: 'How do I create a new report?',
        answer: 'Navigate to Reports > New Report, select your report type, choose the relevant data sources and parameters, then click "Generate Report". Reports are typically ready within a few minutes depending on complexity.',
      },
      {
        question: 'Can I export data to Excel?',
        answer: 'Yes! All data tables and visualizations support export to Excel (.xlsx), CSV, and PDF formats. Simply click the export icon in the toolbar and select your preferred format.',
      },
      {
        question: 'How is my data secured?',
        answer: 'Trinity employs enterprise-grade security including SOC 2 Type II compliance, data encryption at rest and in transit, role-based access control, and regular security audits. Your data is never shared with other clients.',
      },
      {
        question: 'What support options are available?',
        answer: 'We offer 24/7 technical support, dedicated customer success managers, online documentation, video tutorials, and monthly training webinars. Premium support packages include on-site training and custom development.',
      },
    ];

    return (
      <Box sx={{ maxWidth: 700 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography color="text.secondary" paragraph>
          Find answers to common questions about Trinity products.
        </Typography>
        <Stack spacing={1.5}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                '&:before': { display: 'none' },
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '12px !important',
                '&:first-of-type': { 
                  borderRadius: '12px !important',
                  borderTopLeftRadius: '12px !important',
                  borderTopRightRadius: '12px !important',
                },
                '&:last-of-type': { 
                  borderRadius: '12px !important',
                  borderBottomLeftRadius: '12px !important',
                  borderBottomRightRadius: '12px !important',
                },
                '&.Mui-expanded': {
                  margin: 0,
                },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={500}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Box>
    );
  }

  if (variant === 'settings') {
    const settingsGroups = [
      {
        icon: <PersonIcon />,
        title: 'Profile Settings',
        description: 'Manage your personal information',
        content: (
          <List dense>
            <ListItem>
              <ListItemText primary="Display Name" secondary="John Smith" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary="jsmith@trinitylifesciences.com" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Title" secondary="Senior Analyst" />
            </ListItem>
          </List>
        ),
      },
      {
        icon: <NotificationsIcon />,
        title: 'Notifications',
        description: 'Configure email and push notifications',
        badge: '3 new',
        content: (
          <List dense>
            <ListItem>
              <ListItemText primary="Email Notifications" secondary="Enabled" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Push Notifications" secondary="Enabled" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Weekly Digest" secondary="Every Monday" />
            </ListItem>
          </List>
        ),
      },
      {
        icon: <SecurityIcon />,
        title: 'Security',
        description: 'Password and authentication settings',
        content: (
          <List dense>
            <ListItem>
              <ListItemText primary="Password" secondary="Last changed 30 days ago" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Two-Factor Authentication" secondary="Enabled" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Login History" secondary="View recent logins" />
            </ListItem>
          </List>
        ),
      },
      {
        icon: <SettingsIcon />,
        title: 'Preferences',
        description: 'Customize your experience',
        content: (
          <List dense>
            <ListItem>
              <ListItemText primary="Theme" secondary="Light" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Language" secondary="English (US)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Timezone" secondary="Eastern Time (ET)" />
            </ListItem>
          </List>
        ),
      },
    ];

    return (
      <Box sx={{ maxWidth: 600 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Settings
        </Typography>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {settingsGroups.map((group, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              disableGutters
              sx={{
                boxShadow: 'none',
                '&:not(:last-child)': {
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                },
                '&:before': { display: 'none' },
                '&.Mui-expanded': { margin: 0 },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Avatar sx={{ bgcolor: brandColors.primary.light, width: 36, height: 36 }}>
                  {group.icon}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography fontWeight={500}>{group.title}</Typography>
                    {group.badge && (
                      <Chip label={group.badge} size="small" color="primary" sx={{ height: 20, fontSize: 11 }} />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {group.description}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {group.content}
            </AccordionDetails>
          </Accordion>
          ))}
        </Box>
      </Box>
    );
  }

  if (variant === 'checklist') {
    const tasks = [
      { title: 'Project Setup', items: ['Create repository', 'Install dependencies', 'Configure environment'], completed: [true, true, true] },
      { title: 'Design Phase', items: ['Create wireframes', 'Design mockups', 'Review with stakeholders'], completed: [true, true, false] },
      { title: 'Development', items: ['Frontend implementation', 'Backend API', 'Integration testing'], completed: [true, false, false] },
      { title: 'Deployment', items: ['Staging deployment', 'QA testing', 'Production release'], completed: [false, false, false] },
    ];

    return (
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Project Checklist
        </Typography>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {tasks.map((task, index) => {
            const completedCount = task.completed.filter(Boolean).length;
            const isComplete = completedCount === task.items.length;
            
            return (
              <Accordion
                key={index}
                defaultExpanded={!isComplete}
                disableGutters
                sx={{
                  boxShadow: 'none',
                  borderLeft: isComplete ? `3px solid` : 'none',
                  borderLeftColor: isComplete ? 'success.main' : 'transparent',
                  '&:not(:last-child)': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { margin: 0 },
                }}
              >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  {isComplete ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <RadioButtonUncheckedIcon color="action" />
                  )}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography fontWeight={500}>{task.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {completedCount} of {task.items.length} complete
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {task.items.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {task.completed[i] ? (
                          <CheckCircleIcon color="success" fontSize="small" />
                        ) : (
                          <RadioButtonUncheckedIcon color="action" fontSize="small" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        sx={{
                          textDecoration: task.completed[i] ? 'line-through' : 'none',
                          color: task.completed[i] ? 'text.secondary' : 'text.primary',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Box>
    );
  }

  if (variant === 'outlined') {
    return (
      <Box sx={{ maxWidth: 600 }}>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {['Overview', 'Features', 'Technical Details', 'Pricing'].map((title, index) => (
            <Accordion
              key={index}
              disableGutters
              sx={{
                boxShadow: 'none',
                '&:not(:last-child)': {
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                },
                '&:before': { display: 'none' },
                '&.Mui-expanded': { margin: 0 },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={500}>{title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    );
  }

  // Default variant - connected style with wrapper
  const defaultItems = [
    {
      title: 'Getting Started',
      content: 'Welcome to Trinity Design System. This accordion demonstrates the default styling with elevation and smooth expand/collapse animations.',
      defaultExpanded: true,
    },
    {
      title: 'Components',
      content: 'Our component library includes buttons, inputs, navigation elements, data display components, and more - all themed with Trinity branding.',
    },
    {
      title: 'Theming',
      content: 'Easily customize colors, typography, and spacing to match your brand while maintaining accessibility standards.',
    },
  ];

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {defaultItems.map((item, index) => (
          <Accordion
            key={index}
            defaultExpanded={item.defaultExpanded}
            disableGutters
            sx={{
              boxShadow: 'none',
              '&:not(:last-child)': {
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
              '&:before': { display: 'none' },
              '&.Mui-expanded': { margin: 0 },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

const meta: Meta<typeof AccordionDemo> = {
  title: 'Surfaces/Accordion',
  component: AccordionDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Expandable accordion panels for organizing content.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'faq', 'settings', 'checklist'],
      description: 'Visual variant of the accordion',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple panels to be open at once',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive Accordion playground - use Controls to customize.
 * Try toggling expanded state and changing the variant.
 */
export const Playground: Story = {
  argTypes: {
    defaultExpanded: {
      control: 'boolean',
      description: 'Start expanded',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the accordion',
    },
    disableGutters: {
      control: 'boolean',
      description: 'Remove default padding',
    },
    square: {
      control: 'boolean',
      description: 'Remove rounded corners',
    },
  },
  render: (args: { defaultExpanded?: boolean; disabled?: boolean; disableGutters?: boolean; square?: boolean }) => (
    <Box sx={{ maxWidth: 500 }}>
      <Accordion defaultExpanded={args.defaultExpanded} disabled={args.disabled} disableGutters={args.disableGutters} square={args.square}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Accordion Header</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is the accordion content. Use the Controls panel to customize the accordion behavior.
            Try toggling expanded, disabled, gutters, and square options.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={args.disabled} disableGutters={args.disableGutters} square={args.square}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Second Panel</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Additional accordion panel content.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  ),
  args: {
    defaultExpanded: true,
    disabled: false,
    disableGutters: false,
    square: false,
  },
};

/**
 * Default accordion with elevation styling.
 */
export const Default: Story = {
  args: {
    variant: 'default',
  },
};

/**
 * Outlined variant without elevation.
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

/**
 * FAQ-style accordion for help content.
 */
export const FAQ: Story = {
  args: {
    variant: 'faq',
    allowMultiple: false,
  },
};

/**
 * Settings panel with icons and descriptions.
 */
export const Settings: Story = {
  args: {
    variant: 'settings',
    allowMultiple: false,
  },
};

/**
 * Checklist with progress tracking.
 */
export const Checklist: Story = {
  args: {
    variant: 'checklist',
  },
};
