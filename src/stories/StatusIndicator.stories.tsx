import type { Meta, StoryObj } from '@storybook/react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  IconIndicator,
  ShapeIndicator,
  StatusDot,
  BadgeIndicator,
  DifferentialIndicator,
  StatusChip,
  InlineStatus,
  StatusLegend,
  getStatusTypesBySeverity,
  StatusType,
  StatusShape,
} from '../components/StatusIndicator';
import { Icon, IconProvider } from '../components/Icon';

/**
 * # Status Indicators
 * 
 * Status indicators are an important method of communicating severity-level information to users.
 * Different shapes and colors enable users to quickly assess and identify status and respond accordingly.
 * 
 * ## Variants
 * 
 * | Variant | Description | Use Case |
 * |---------|-------------|----------|
 * | **Icon Indicator** | Icon + shape + color + label | Notifications, progress, data tables |
 * | **Shape Indicator** | Shape + color + label (no symbol) | Lists, dashboards, compact views |
 * | **Status Dot** | Minimal colored dot | Inline status, avatars |
 * | **Badge Indicator** | Overlay badge with count | Notifications, updates |
 * | **Differential Indicator** | Positive/negative change | Financial data, analytics |
 * | **Status Chip** | Compact chip with status | Tags, filters, labels |
 * | **Inline Status** | Text-based with optional indicator | Tables, lists |
 * 
 * ## Severity Levels
 * 
 * - **High Attention**: Red - Errors, critical issues, failures
 * - **Medium Attention**: Orange/Yellow - Warnings, pending, in progress
 * - **Low Attention**: Green - Success, complete, active
 * - **Informational**: Blue - Info, new, updated
 * - **Neutral**: Gray - Draft, inactive, unknown
 * 
 * ## Accessibility
 * 
 * Status indicators use multiple visual cues (color, shape, icon, text) to ensure
 * accessibility for users with color vision deficiencies.
 */

const meta: Meta = {
  title: 'Patterns/Status Indicator',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Status indicators communicate severity-level information using colors, shapes, and icons.',
      },
    },
  },
  decorators: [
    (Story) => (
      <IconProvider defaultLibrary="material">
        <Story />
      </IconProvider>
    ),
  ],
};

export default meta;

// ============================================================================
// GALLERY - All Status Types
// ============================================================================

export const Gallery: StoryObj = {
  render: () => {
    const severityLevels = ['high', 'medium', 'low', 'info', 'neutral'] as const;
    
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Status Indicator Gallery</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          All available status types organized by severity level.
        </Typography>

        {severityLevels.map(severity => {
          const statuses = getStatusTypesBySeverity(severity);
          const severityLabels = {
            high: { label: 'High Attention', description: 'Critical issues requiring immediate action' },
            medium: { label: 'Medium Attention', description: 'Warnings and ongoing processes' },
            low: { label: 'Low Attention', description: 'Success states and positive confirmations' },
            info: { label: 'Informational', description: 'General information and updates' },
            neutral: { label: 'Neutral', description: 'Inactive or undefined states' },
          };
          
          return (
            <Box key={severity} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {severityLabels[severity].label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {severityLabels[severity].description}
              </Typography>
              
              <Grid container spacing={2}>
                {statuses.map(status => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={status}>
                    <Paper sx={{ p: 2 }}>
                      <Stack spacing={2}>
                        <IconIndicator status={status} size="medium" />
                        <ShapeIndicator status={status} size="medium" />
                        <InlineStatus status={status} size="small" />
                        <StatusChip status={status} />
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
      </Box>
    );
  },
};

// ============================================================================
// ICON INDICATORS
// ============================================================================

export const IconIndicators: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Icon Indicators</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Icon indicators use an icon, shape, color, and label for maximum attention.
        Best for notifications, progress indicators, and data tables.
      </Typography>

      <Stack spacing={4}>
        {/* Sizes */}
        <Box>
          <Typography variant="h6" gutterBottom>Sizes</Typography>
          <Stack direction="row" spacing={4} alignItems="center">
            <IconIndicator status="success" size="small" label="Small" />
            <IconIndicator status="success" size="medium" label="Medium" />
            <IconIndicator status="success" size="large" label="Large" />
          </Stack>
        </Box>

        {/* Icon Only Mode */}
        <Box>
          <Typography variant="h6" gutterBottom>Icon Only (No Background)</Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
            <IconIndicator status="error" iconOnly />
            <IconIndicator status="warning" iconOnly />
            <IconIndicator status="success" iconOnly />
            <IconIndicator status="info" iconOnly />
            <IconIndicator status="pending" iconOnly />
          </Stack>
        </Box>

        {/* Common Use Cases */}
        <Box>
          <Typography variant="h6" gutterBottom>Common Status Types</Typography>
          <Grid container spacing={2}>
            {(['error', 'warning', 'success', 'info', 'pending', 'in-progress', 'complete', 'draft'] as StatusType[]).map(status => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={status}>
                <Paper sx={{ p: 2 }}>
                  <IconIndicator status={status} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Without Labels */}
        <Box>
          <Typography variant="h6" gutterBottom>Without Labels</Typography>
          <Stack direction="row" spacing={2}>
            <IconIndicator status="error" showLabel={false} />
            <IconIndicator status="warning" showLabel={false} />
            <IconIndicator status="success" showLabel={false} />
            <IconIndicator status="info" showLabel={false} />
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// SHAPE INDICATORS
// ============================================================================

export const ShapeIndicators: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Shape Indicators</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Shape indicators use geometric shapes and colors without symbols.
        Useful in compact spaces and for scanning large amounts of data.
      </Typography>

      <Stack spacing={4}>
        {/* All Shapes */}
        <Box>
          <Typography variant="h6" gutterBottom>Available Shapes</Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
            {(['circle', 'square', 'diamond', 'triangle', 'hexagon'] as StatusShape[]).map(shape => (
              <Paper key={shape} sx={{ p: 2 }}>
                <ShapeIndicator status="success" shape={shape} label={shape} />
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* Severity with Shapes */}
        <Box>
          <Typography variant="h6" gutterBottom>Shapes by Severity</Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
            <ShapeIndicator status="critical" shape="hexagon" />
            <ShapeIndicator status="warning" shape="triangle" />
            <ShapeIndicator status="success" shape="circle" />
            <ShapeIndicator status="info" shape="square" />
            <ShapeIndicator status="beta" shape="diamond" />
          </Stack>
        </Box>

        {/* With and Without Outline */}
        <Box>
          <Typography variant="h6" gutterBottom>Outline Comparison</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Outlines improve accessibility for lighter colors like yellow and orange.
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={3}>
              <ShapeIndicator status="warning" showOutline={true} label="With Outline" />
              <ShapeIndicator status="warning" showOutline={false} label="Without Outline" />
            </Stack>
            <Stack direction="row" spacing={3}>
              <ShapeIndicator status="caution" showOutline={true} label="With Outline" />
              <ShapeIndicator status="caution" showOutline={false} label="Without Outline" />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// BADGE INDICATORS
// ============================================================================

export const BadgeIndicators: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Badge Indicators</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Badge indicators display counts or dots over icons to indicate new or updated items.
      </Typography>

      <Stack spacing={4}>
        {/* With Numbers */}
        <Box>
          <Typography variant="h6" gutterBottom>With Numbers</Typography>
          <Stack direction="row" spacing={3}>
            <BadgeIndicator count={3}>
              <IconButton><Icon name="notification" size="medium" /></IconButton>
            </BadgeIndicator>
            <BadgeIndicator count={12}>
              <IconButton><Icon name="email" size="medium" /></IconButton>
            </BadgeIndicator>
            <BadgeIndicator count={99}>
              <IconButton><Icon name="chat" size="medium" /></IconButton>
            </BadgeIndicator>
            <BadgeIndicator count={1500} max={999}>
              <IconButton><Icon name="notification" size="medium" /></IconButton>
            </BadgeIndicator>
          </Stack>
        </Box>

        {/* Dot Badge */}
        <Box>
          <Typography variant="h6" gutterBottom>Dot Badge (No Number)</Typography>
          <Stack direction="row" spacing={3}>
            <BadgeIndicator dot>
              <IconButton><Icon name="notification" size="medium" /></IconButton>
            </BadgeIndicator>
            <BadgeIndicator dot status="info">
              <IconButton><Icon name="email" size="medium" /></IconButton>
            </BadgeIndicator>
            <BadgeIndicator dot status="success">
              <IconButton><Icon name="chat" size="medium" /></IconButton>
            </BadgeIndicator>
          </Stack>
        </Box>

        {/* Different Status Colors */}
        <Box>
          <Typography variant="h6" gutterBottom>Status Colors</Typography>
          <Stack direction="row" spacing={3}>
            <BadgeIndicator count={5} status="error">
              <IconButton><Icon name="notification" size="medium" /></IconButton>
            </BadgeIndicator>
            <BadgeIndicator count={5} status="warning">
              <IconButton><Icon name="notification" size="medium" /></IconButton>
            </BadgeIndicator>
            <BadgeIndicator count={5} status="success">
              <IconButton><Icon name="notification" size="medium" /></IconButton>
            </BadgeIndicator>
            <BadgeIndicator count={5} status="info">
              <IconButton><Icon name="notification" size="medium" /></IconButton>
            </BadgeIndicator>
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// DIFFERENTIAL INDICATORS
// ============================================================================

export const DifferentialIndicators: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Differential Indicators</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Differential indicators show positive or negative changes, commonly used in financial dashboards.
      </Typography>

      <Stack spacing={4}>
        {/* Basic */}
        <Box>
          <Typography variant="h6" gutterBottom>Basic Values</Typography>
          <Stack direction="row" spacing={4}>
            <DifferentialIndicator value={25} />
            <DifferentialIndicator value={-15} />
            <DifferentialIndicator value={0} />
          </Stack>
        </Box>

        {/* Percentages */}
        <Box>
          <Typography variant="h6" gutterBottom>Percentages</Typography>
          <Stack direction="row" spacing={4}>
            <DifferentialIndicator value={12.5} percentage />
            <DifferentialIndicator value={-8.3} percentage />
            <DifferentialIndicator value={42} percentage size="large" />
          </Stack>
        </Box>

        {/* Currency */}
        <Box>
          <Typography variant="h6" gutterBottom>Currency</Typography>
          <Stack direction="row" spacing={4}>
            <DifferentialIndicator value={1250} currency="$" />
            <DifferentialIndicator value={-850} currency="$" />
            <DifferentialIndicator value={15000} currency="€" />
          </Stack>
        </Box>

        {/* Without Icons */}
        <Box>
          <Typography variant="h6" gutterBottom>Without Icons</Typography>
          <Stack direction="row" spacing={4}>
            <DifferentialIndicator value={25} showIcon={false} />
            <DifferentialIndicator value={-15} showIcon={false} percentage />
          </Stack>
        </Box>

        {/* Without Color */}
        <Box>
          <Typography variant="h6" gutterBottom>Without Color</Typography>
          <Stack direction="row" spacing={4}>
            <DifferentialIndicator value={25} showColor={false} />
            <DifferentialIndicator value={-15} showColor={false} percentage />
          </Stack>
        </Box>

        {/* Dashboard Example */}
        <Box>
          <Typography variant="h6" gutterBottom>Dashboard Example</Typography>
          <Grid container spacing={2}>
            {[
              { label: 'Revenue', value: 125000, change: 12.5, currency: '$' },
              { label: 'Users', value: 45200, change: -3.2 },
              { label: 'Orders', value: 1850, change: 8.7 },
              { label: 'Conversion', value: 4.2, change: 0.5, suffix: '%' },
            ].map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" sx={{ my: 1 }}>
                      {stat.currency || ''}{stat.value.toLocaleString()}{stat.suffix || ''}
                    </Typography>
                    <DifferentialIndicator value={stat.change} percentage size="small" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// STATUS CHIPS
// ============================================================================

export const StatusChips: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Status Chips</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Compact status indicators using the Chip component. Useful for tags, filters, and labels.
      </Typography>

      <Stack spacing={4}>
        {/* All Statuses */}
        <Box>
          <Typography variant="h6" gutterBottom>All Status Types</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {(['error', 'warning', 'success', 'info', 'pending', 'in-progress', 'complete', 'draft', 'beta'] as StatusType[]).map(status => (
              <StatusChip key={status} status={status} />
            ))}
          </Stack>
        </Box>

        {/* Without Icons */}
        <Box>
          <Typography variant="h6" gutterBottom>Without Icons</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {(['error', 'warning', 'success', 'info'] as StatusType[]).map(status => (
              <StatusChip key={status} status={status} showIcon={false} />
            ))}
          </Stack>
        </Box>

        {/* Clickable & Deletable */}
        <Box>
          <Typography variant="h6" gutterBottom>Interactive</Typography>
          <Stack direction="row" spacing={1}>
            <StatusChip status="success" onClick={() => alert('Clicked!')} />
            <StatusChip status="warning" onDelete={() => alert('Deleted!')} />
            <StatusChip status="error" onClick={() => {}} onDelete={() => {}} />
          </Stack>
        </Box>

        {/* Custom Labels */}
        <Box>
          <Typography variant="h6" gutterBottom>Custom Labels</Typography>
          <Stack direction="row" spacing={1}>
            <StatusChip status="success" label="Published" />
            <StatusChip status="warning" label="Review Required" />
            <StatusChip status="error" label="Overdue" />
            <StatusChip status="info" label="Featured" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// INLINE STATUS
// ============================================================================

export const InlineStatuses: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Inline Status</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Text-based status indicators with optional dot or icon. Ideal for tables and lists.
      </Typography>

      <Stack spacing={4}>
        {/* With Dot */}
        <Box>
          <Typography variant="h6" gutterBottom>With Dot</Typography>
          <Stack spacing={1}>
            {(['error', 'warning', 'success', 'info', 'pending', 'draft'] as StatusType[]).map(status => (
              <InlineStatus key={status} status={status} />
            ))}
          </Stack>
        </Box>

        {/* With Icon */}
        <Box>
          <Typography variant="h6" gutterBottom>With Icon</Typography>
          <Stack spacing={1}>
            {(['error', 'warning', 'success', 'info'] as StatusType[]).map(status => (
              <InlineStatus key={status} status={status} showDot={false} showIcon={true} />
            ))}
          </Stack>
        </Box>

        {/* Sizes */}
        <Box>
          <Typography variant="h6" gutterBottom>Sizes</Typography>
          <Stack spacing={1}>
            <InlineStatus status="success" size="small" label="Small" />
            <InlineStatus status="success" size="medium" label="Medium" />
            <InlineStatus status="success" size="large" label="Large" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// STATUS LEGEND
// ============================================================================

export const Legends: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Status Legend</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Collection of status indicators for dashboards and charts.
      </Typography>

      <Stack spacing={4}>
        {/* Dot Legend */}
        <Box>
          <Typography variant="h6" gutterBottom>Dot Legend</Typography>
          <Paper sx={{ p: 2 }}>
            <StatusLegend
              items={[
                { status: 'success', label: 'Active', count: 45 },
                { status: 'warning', label: 'Pending', count: 12 },
                { status: 'error', label: 'Failed', count: 3 },
                { status: 'draft', label: 'Draft', count: 8 },
              ]}
            />
          </Paper>
        </Box>

        {/* Shape Legend */}
        <Box>
          <Typography variant="h6" gutterBottom>Shape Legend</Typography>
          <Paper sx={{ p: 2 }}>
            <StatusLegend
              variant="shape"
              items={[
                { status: 'critical', label: 'Critical' },
                { status: 'warning', label: 'Warning' },
                { status: 'success', label: 'Normal' },
                { status: 'info', label: 'Info' },
              ]}
            />
          </Paper>
        </Box>

        {/* Icon Legend */}
        <Box>
          <Typography variant="h6" gutterBottom>Icon Legend</Typography>
          <Paper sx={{ p: 2 }}>
            <StatusLegend
              variant="icon"
              items={[
                { status: 'complete', label: 'Complete' },
                { status: 'in-progress', label: 'In Progress' },
                { status: 'pending', label: 'Pending' },
                { status: 'error', label: 'Error' },
              ]}
            />
          </Paper>
        </Box>

        {/* Vertical Legend */}
        <Box>
          <Typography variant="h6" gutterBottom>Vertical Legend</Typography>
          <Paper sx={{ p: 2, maxWidth: 200 }}>
            <StatusLegend
              direction="column"
              items={[
                { status: 'success', label: 'Healthy', count: 127 },
                { status: 'warning', label: 'Warning', count: 23 },
                { status: 'error', label: 'Critical', count: 5 },
                { status: 'draft', label: 'Unknown', count: 2 },
              ]}
            />
          </Paper>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// STATUS DOTS
// ============================================================================

export const StatusDots: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Status Dots</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Minimal status indicators for inline use.
      </Typography>

      <Stack spacing={4}>
        {/* Sizes */}
        <Box>
          <Typography variant="h6" gutterBottom>Sizes</Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <StatusDot status="success" size="small" />
              <Typography variant="body2">Small</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <StatusDot status="success" size="medium" />
              <Typography variant="body2">Medium</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <StatusDot status="success" size="large" />
              <Typography variant="body2">Large</Typography>
            </Stack>
          </Stack>
        </Box>

        {/* All Statuses */}
        <Box>
          <Typography variant="h6" gutterBottom>Status Colors</Typography>
          <Stack direction="row" spacing={2}>
            {(['error', 'warning', 'success', 'info', 'pending', 'draft'] as StatusType[]).map(status => (
              <Stack key={status} alignItems="center" spacing={0.5}>
                <StatusDot status={status} size="medium" />
                <Typography variant="caption">{status}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Pulsing */}
        <Box>
          <Typography variant="h6" gutterBottom>Pulsing Animation</Typography>
          <Stack direction="row" spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <StatusDot status="success" pulse />
              <Typography variant="body2">Online</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <StatusDot status="warning" pulse />
              <Typography variant="body2">Processing</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <StatusDot status="error" pulse />
              <Typography variant="body2">Alert</Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// DATA TABLE EXAMPLE
// ============================================================================

export const DataTableExample: StoryObj = {
  render: () => {
    const data = [
      { id: 'SRV-001', name: 'Production API', status: 'active' as StatusType, uptime: '99.9%', change: 0.2 },
      { id: 'SRV-002', name: 'Staging Server', status: 'warning' as StatusType, uptime: '98.5%', change: -1.5 },
      { id: 'SRV-003', name: 'Database Primary', status: 'active' as StatusType, uptime: '99.99%', change: 0.01 },
      { id: 'SRV-004', name: 'Database Replica', status: 'error' as StatusType, uptime: '95.2%', change: -4.8 },
      { id: 'SRV-005', name: 'Cache Server', status: 'in-progress' as StatusType, uptime: '100%', change: 0 },
      { id: 'SRV-006', name: 'Worker Node 1', status: 'active' as StatusType, uptime: '99.8%', change: 0.3 },
      { id: 'SRV-007', name: 'Worker Node 2', status: 'draft' as StatusType, uptime: '-', change: 0 },
    ];

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Data Table Example</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Status indicators integrated in a data table for system monitoring.
        </Typography>

        <Paper>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <StatusLegend
              items={[
                { status: 'active', label: 'Active', count: 3 },
                { status: 'warning', label: 'Warning', count: 1 },
                { status: 'error', label: 'Error', count: 1 },
                { status: 'in-progress', label: 'Deploying', count: 1 },
                { status: 'draft', label: 'Offline', count: 1 },
              ]}
              size="small"
            />
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Uptime</TableCell>
                  <TableCell align="right">Change (24h)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">{row.id}</Typography>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <InlineStatus status={row.status} size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontFamily="monospace">{row.uptime}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      {row.change !== 0 ? (
                        <DifferentialIndicator value={row.change} percentage size="small" />
                      ) : (
                        <Typography variant="body2" color="text.secondary">—</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );
  },
};

// ============================================================================
// NOTIFICATION HEADER EXAMPLE
// ============================================================================

export const NotificationHeaderExample: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Notification Header Example</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Badge indicators used in a header toolbar.
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <BadgeIndicator count={3} status="error">
            <IconButton>
              <Icon name="notification" size="medium" />
            </IconButton>
          </BadgeIndicator>
          <BadgeIndicator count={12}>
            <IconButton>
              <Icon name="email" size="medium" />
            </IconButton>
          </BadgeIndicator>
          <BadgeIndicator dot status="info">
            <IconButton>
              <Icon name="chat" size="medium" />
            </IconButton>
          </BadgeIndicator>
          <IconButton>
            <Icon name="settings" size="medium" />
          </IconButton>
          <IconButton>
            <Icon name="user" size="medium" />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  ),
};
