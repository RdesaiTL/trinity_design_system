/**
 * StatusIndicator Stories - Unified Component Documentation
 * 
 * Demonstrates the new polymorphic StatusIndicator component with all variants.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, Typography, Paper, IconButton, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { StatusIndicator, StatusType, StatusVariant, getAllStatusTypes } from '../components/StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# StatusIndicator

A unified, polymorphic status indicator component that consolidates multiple status display patterns into a single, flexible API.

## Variants

| Variant | Use Case |
|---------|----------|
| \`icon\` | Default. Icon with circular background, good for maximum attention |
| \`shape\` | Geometric shapes for scanning large data sets |
| \`dot\` | Minimal indicator for inline status |
| \`chip\` | Tag-style chips for filters and labels |
| \`inline\` | Text-based status with optional dot/icon |
| \`badge\` | Notification badge wrapper for icons |
| \`differential\` | Positive/negative value changes |

## Migration from Legacy Components

| Old Component | New Usage |
|---------------|-----------|
| \`IconIndicator\` | \`<StatusIndicator variant="icon" />\` |
| \`ShapeIndicator\` | \`<StatusIndicator variant="shape" />\` |
| \`StatusDot\` | \`<StatusIndicator variant="dot" />\` |
| \`StatusChip\` | \`<StatusIndicator variant="chip" />\` |
| \`InlineStatus\` | \`<StatusIndicator variant="inline" />\` |
| \`BadgeIndicator\` | \`<StatusIndicator variant="badge">{children}</StatusIndicator>\` |
| \`DifferentialIndicator\` | \`<StatusIndicator variant="differential" value={n} />\` |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['icon', 'shape', 'dot', 'chip', 'inline', 'badge', 'differential'],
      description: 'Visual variant of the indicator',
    },
    status: {
      control: 'select',
      options: getAllStatusTypes(),
      description: 'Semantic status type',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the indicator',
    },
    label: {
      control: 'text',
      description: 'Custom label (overrides status default)',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show label text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  args: {
    status: 'success',
    variant: 'icon',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Icon Variant (Default)</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusIndicator variant="icon" status="success" />
          <StatusIndicator variant="icon" status="warning" />
          <StatusIndicator variant="icon" status="error" />
          <StatusIndicator variant="icon" status="info" />
          <StatusIndicator variant="icon" status="pending" />
        </Stack>
      </Box>
      
      <Divider />
      
      <Box>
        <Typography variant="h6" gutterBottom>Shape Variant</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusIndicator variant="shape" status="success" />
          <StatusIndicator variant="shape" status="warning" />
          <StatusIndicator variant="shape" status="critical" shape="hexagon" />
          <StatusIndicator variant="shape" status="beta" shape="diamond" />
        </Stack>
      </Box>
      
      <Divider />
      
      <Box>
        <Typography variant="h6" gutterBottom>Dot Variant</Typography>
        <Stack direction="row" spacing={3} alignItems="center">
          <StatusIndicator variant="dot" status="success" />
          <StatusIndicator variant="dot" status="warning" />
          <StatusIndicator variant="dot" status="error" />
          <StatusIndicator variant="dot" status="in-progress" pulse />
        </Stack>
      </Box>
      
      <Divider />
      
      <Box>
        <Typography variant="h6" gutterBottom>Chip Variant</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <StatusIndicator variant="chip" status="success" />
          <StatusIndicator variant="chip" status="warning" label="Pending Review" />
          <StatusIndicator variant="chip" status="error" />
          <StatusIndicator variant="chip" status="beta" />
        </Stack>
      </Box>
      
      <Divider />
      
      <Box>
        <Typography variant="h6" gutterBottom>Inline Variant</Typography>
        <Stack spacing={1}>
          <StatusIndicator variant="inline" status="success" />
          <StatusIndicator variant="inline" status="in-progress" showDot showIcon={false} />
          <StatusIndicator variant="inline" status="error" showDot={false} showIcon />
        </Stack>
      </Box>
      
      <Divider />
      
      <Box>
        <Typography variant="h6" gutterBottom>Badge Variant</Typography>
        <Stack direction="row" spacing={3}>
          <StatusIndicator variant="badge" status="error" count={5}>
            <IconButton><NotificationsIcon /></IconButton>
          </StatusIndicator>
          <StatusIndicator variant="badge" status="info" count={99}>
            <IconButton><MailIcon /></IconButton>
          </StatusIndicator>
          <StatusIndicator variant="badge" status="success" dot>
            <IconButton><ShoppingCartIcon /></IconButton>
          </StatusIndicator>
        </Stack>
      </Box>
      
      <Divider />
      
      <Box>
        <Typography variant="h6" gutterBottom>Differential Variant</Typography>
        <Stack direction="row" spacing={3}>
          <StatusIndicator variant="differential" value={12.5} percentage />
          <StatusIndicator variant="differential" value={-8.3} percentage />
          <StatusIndicator variant="differential" value={1250} currency="$" />
          <StatusIndicator variant="differential" value={-500} currency="$" />
        </Stack>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// ICON VARIANT
// ============================================================================

export const IconVariant: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Standard (with background)
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusIndicator variant="icon" status="success" />
          <StatusIndicator variant="icon" status="warning" />
          <StatusIndicator variant="icon" status="error" />
          <StatusIndicator variant="icon" status="info" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Icon Only (no background)
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusIndicator variant="icon" status="success" iconOnly />
          <StatusIndicator variant="icon" status="warning" iconOnly />
          <StatusIndicator variant="icon" status="error" iconOnly />
          <StatusIndicator variant="icon" status="info" iconOnly />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Sizes
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <StatusIndicator variant="icon" status="success" size="small" />
          <StatusIndicator variant="icon" status="success" size="medium" />
          <StatusIndicator variant="icon" status="success" size="large" />
        </Stack>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// SHAPE VARIANT
// ============================================================================

export const ShapeVariant: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Default Shapes (from status config)
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusIndicator variant="shape" status="success" />
          <StatusIndicator variant="shape" status="warning" />
          <StatusIndicator variant="shape" status="critical" />
          <StatusIndicator variant="shape" status="beta" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Custom Shape Override
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusIndicator variant="shape" status="success" shape="circle" />
          <StatusIndicator variant="shape" status="success" shape="square" />
          <StatusIndicator variant="shape" status="success" shape="diamond" />
          <StatusIndicator variant="shape" status="success" shape="triangle" />
          <StatusIndicator variant="shape" status="success" shape="hexagon" />
        </Stack>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// DOT VARIANT
// ============================================================================

export const DotVariant: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Static Dots
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <StatusIndicator variant="dot" status="success" />
          <StatusIndicator variant="dot" status="warning" />
          <StatusIndicator variant="dot" status="error" />
          <StatusIndicator variant="dot" status="info" />
          <StatusIndicator variant="dot" status="draft" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Pulsing Dots (for active states)
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <StatusIndicator variant="dot" status="in-progress" pulse />
          <StatusIndicator variant="dot" status="running" pulse />
          <StatusIndicator variant="dot" status="active" pulse />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Inline Usage
        </Typography>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <StatusIndicator variant="dot" status="success" />
            <Typography>Server Online</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <StatusIndicator variant="dot" status="warning" />
            <Typography>High CPU Usage</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <StatusIndicator variant="dot" status="error" />
            <Typography>Connection Lost</Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// CHIP VARIANT
// ============================================================================

export const ChipVariant: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Status Tags
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <StatusIndicator variant="chip" status="success" />
          <StatusIndicator variant="chip" status="warning" />
          <StatusIndicator variant="chip" status="error" />
          <StatusIndicator variant="chip" status="info" />
          <StatusIndicator variant="chip" status="draft" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Custom Labels
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <StatusIndicator variant="chip" status="success" label="Approved" />
          <StatusIndicator variant="chip" status="warning" label="Needs Review" />
          <StatusIndicator variant="chip" status="error" label="Rejected" />
          <StatusIndicator variant="chip" status="beta" label="Experimental" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Interactive Chips
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <StatusIndicator 
            variant="chip" 
            status="success" 
            onClick={() => alert('Clicked!')}
          />
          <StatusIndicator 
            variant="chip" 
            status="warning" 
            onDelete={() => alert('Deleted!')}
          />
        </Stack>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// INLINE VARIANT
// ============================================================================

export const InlineVariant: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>Task List</Typography>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Design Review</Typography>
          <StatusIndicator variant="inline" status="complete" />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Code Implementation</Typography>
          <StatusIndicator variant="inline" status="in-progress" />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Testing</Typography>
          <StatusIndicator variant="inline" status="pending" />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Deployment</Typography>
          <StatusIndicator variant="inline" status="draft" />
        </Stack>
      </Stack>
    </Paper>
  ),
};

// ============================================================================
// BADGE VARIANT
// ============================================================================

export const BadgeVariant: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Notification Counts
        </Typography>
        <Stack direction="row" spacing={3}>
          <StatusIndicator variant="badge" status="error" count={3}>
            <IconButton><NotificationsIcon /></IconButton>
          </StatusIndicator>
          <StatusIndicator variant="badge" status="info" count={12}>
            <IconButton><MailIcon /></IconButton>
          </StatusIndicator>
          <StatusIndicator variant="badge" status="warning" count={999} max={99}>
            <IconButton><NotificationsIcon /></IconButton>
          </StatusIndicator>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Dot Badges
        </Typography>
        <Stack direction="row" spacing={3}>
          <StatusIndicator variant="badge" status="success" dot>
            <IconButton><ShoppingCartIcon /></IconButton>
          </StatusIndicator>
          <StatusIndicator variant="badge" status="error" dot>
            <IconButton><MailIcon /></IconButton>
          </StatusIndicator>
        </Stack>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// DIFFERENTIAL VARIANT
// ============================================================================

export const DifferentialVariant: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Percentage Changes
        </Typography>
        <Stack direction="row" spacing={4}>
          <Box textAlign="center">
            <Typography variant="h4">$12,450</Typography>
            <StatusIndicator variant="differential" value={12.5} percentage />
          </Box>
          <Box textAlign="center">
            <Typography variant="h4">8,234</Typography>
            <StatusIndicator variant="differential" value={-8.3} percentage />
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Currency Values
        </Typography>
        <Stack direction="row" spacing={4}>
          <StatusIndicator variant="differential" value={1250} currency="$" />
          <StatusIndicator variant="differential" value={-500} currency="$" />
          <StatusIndicator variant="differential" value={89} currency="€" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Raw Numbers
        </Typography>
        <Stack direction="row" spacing={4}>
          <StatusIndicator variant="differential" value={42} />
          <StatusIndicator variant="differential" value={-17} />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Custom Colors
        </Typography>
        <Stack direction="row" spacing={4}>
          <StatusIndicator 
            variant="differential" 
            value={15} 
            percentage 
            positiveColor="#0066cc"
            negativeColor="#ff6600"
          />
          <StatusIndicator 
            variant="differential" 
            value={-10} 
            percentage 
            positiveColor="#0066cc"
            negativeColor="#ff6600"
          />
        </Stack>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// ALL STATUS TYPES
// ============================================================================

export const AllStatusTypes: Story = {
  render: () => {
    const statusGroups = {
      'High Attention (Error)': ['error', 'critical', 'failed', 'rejected', 'cancelled'] as StatusType[],
      'Medium Attention (Warning)': ['warning', 'caution', 'pending', 'in-progress', 'running'] as StatusType[],
      'Low Attention (Success)': ['success', 'complete', 'approved', 'active', 'enabled'] as StatusType[],
      'Informational': ['info', 'new', 'updated'] as StatusType[],
      'Neutral': ['draft', 'inactive', 'disabled', 'unknown'] as StatusType[],
      'Special': ['beta', 'experimental'] as StatusType[],
    };

    return (
      <Stack spacing={4}>
        {Object.entries(statusGroups).map(([groupName, statuses]) => (
          <Box key={groupName}>
            <Typography variant="h6" gutterBottom>{groupName}</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {statuses.map(status => (
                <StatusIndicator key={status} status={status} />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    );
  },
};

// ============================================================================
// SIZE COMPARISON
// ============================================================================

export const SizeComparison: Story = {
  render: () => (
    <Stack spacing={4}>
      {(['icon', 'shape', 'dot', 'chip', 'inline'] as StatusVariant[]).map(variant => (
        <Box key={variant}>
          <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
            {variant} Variant
          </Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box>
              <Typography variant="caption" color="text.secondary">Small</Typography>
              <StatusIndicator variant={variant as StatusVariant} status="success" size="small" />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Medium</Typography>
              <StatusIndicator variant={variant as StatusVariant} status="success" size="medium" />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Large</Typography>
              <StatusIndicator variant={variant as StatusVariant} status="success" size="large" />
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};
