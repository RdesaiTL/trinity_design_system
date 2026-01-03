import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArchiveIcon from '@mui/icons-material/Archive';
import SaveIcon from '@mui/icons-material/Save';
import ScheduleIcon from '@mui/icons-material/Schedule';
import {
  DataTable,
  StatusCell,
  AvatarCell,
  ProgressCell,
  RatingCell,
  CurrencyCell,
  TextCell,
  RowAction,
  BulkAction,
} from '../components/DataTable';

// ============================================================================
// DOCUMENTATION
// ============================================================================

/**
 * # DataTable
 *
 * A powerful data table built on MUI X DataGrid with Trinity styling.
 * Uses design tokens from `tokens.ts` for consistent theming.
 *
 * ## Features
 * - **Density Modes**: Compact, Standard, Comfortable
 * - **Selection**: Checkbox selection with bulk actions
 * - **Actions**: Row actions (menu or hover) and bulk actions
 * - **Editing**: Inline cell/row editing
 * - **Toolbar**: Search, filters, export, column visibility
 *
 * ## Usage
 * ```tsx
 * import { DataTable, StatusCell, AvatarCell } from '@trinity/design-system';
 *
 * <DataTable
 *   rows={data}
 *   columns={columns}
 *   title="My Table"
 * />
 * ```
 *
 * ## Theme Integration
 * The DataTable uses tokens from `theme.ts` for colors and `tokens.ts` for
 * density, typography, and spacing. It automatically adapts to light/dark mode.
 */

// ============================================================================
// TYPES
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  status: 'Active' | 'Pending' | 'Inactive';
  role: string;
  revenue: number;
  progress: number;
  rating: number;
}

// ============================================================================
// SAMPLE DATA
// ============================================================================

const sampleUsers: User[] = [
  { id: 1, name: 'John Smith', email: 'john@pharma.com', company: 'Pharma Corp', status: 'Active', role: 'Account Manager', revenue: 125000, progress: 75, rating: 4 },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@biotech.com', company: 'BioTech Labs', status: 'Active', role: 'Sales Director', revenue: 342000, progress: 90, rating: 5 },
  { id: 3, name: 'Michael Chen', email: 'michael@meddev.com', company: 'MedDevice Inc', status: 'Pending', role: 'Analyst', revenue: 89000, progress: 45, rating: 3 },
  { id: 4, name: 'Emily Davis', email: 'emily@health.com', company: 'Healthcare Plus', status: 'Active', role: 'VP Sales', revenue: 567000, progress: 100, rating: 5 },
  { id: 5, name: 'Robert Wilson', email: 'robert@genomix.com', company: 'Genomix', status: 'Inactive', role: 'Consultant', revenue: 45000, progress: 20, rating: 2 },
  { id: 6, name: 'Lisa Anderson', email: 'lisa@neuro.com', company: 'NeuroCare', status: 'Active', role: 'Regional Manager', revenue: 234000, progress: 65, rating: 4 },
  { id: 7, name: 'David Brown', email: 'david@onco.com', company: 'OncoPharma', status: 'Active', role: 'Director', revenue: 890000, progress: 85, rating: 5 },
  { id: 8, name: 'Jennifer Martinez', email: 'jennifer@cardio.com', company: 'CardioMed', status: 'Pending', role: 'Analyst', revenue: 67000, progress: 30, rating: 3 },
];

// ============================================================================
// STATUS COLOR MAPPING
// ============================================================================

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  Active: 'success',
  Pending: 'warning',
  Inactive: 'error',
};

// ============================================================================
// COLUMN DEFINITIONS
// ============================================================================

/** Standard columns with cell renderers */
const columns: GridColDef<User>[] = [
  {
    field: 'name',
    headerName: 'User',
    width: 220,
    flex: 1,
    renderCell: (params: GridRenderCellParams<User>) => (
      <AvatarCell name={params.row.name} email={params.row.email} />
    ),
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 150,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params: GridRenderCellParams<User>) => (
      <StatusCell value={params.value} statusColors={statusColors} />
    ),
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
    editable: true,
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    width: 130,
    type: 'number',
    renderCell: (params: GridRenderCellParams<User>) => (
      <CurrencyCell value={params.value} />
    ),
  },
  {
    field: 'progress',
    headerName: 'Progress',
    width: 150,
    renderCell: (params: GridRenderCellParams<User>) => (
      <ProgressCell value={params.value} />
    ),
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 130,
    renderCell: (params: GridRenderCellParams<User>) => (
      <RatingCell value={params.value} />
    ),
  },
];

/** Simple columns using TextCell instead of AvatarCell */
const simpleColumns: GridColDef<User>[] = [
  {
    field: 'name',
    headerName: 'User',
    width: 200,
    flex: 1,
    renderCell: (params: GridRenderCellParams<User>) => (
      <TextCell primary={params.row.name} secondary={params.row.email} />
    ),
  },
  { field: 'company', headerName: 'Company', width: 150 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params: GridRenderCellParams<User>) => (
      <StatusCell value={params.value} statusColors={statusColors} />
    ),
  },
  { field: 'role', headerName: 'Role', width: 150 },
  {
    field: 'revenue',
    headerName: 'Revenue',
    width: 130,
    type: 'number',
    renderCell: (params: GridRenderCellParams<User>) => (
      <CurrencyCell value={params.value} />
    ),
  },
];

// ============================================================================
// ACTIONS
// ============================================================================

const rowActions: RowAction<User>[] = [
  { id: 'view', label: 'View', icon: <VisibilityIcon fontSize="small" />, onClick: (row) => console.log('View:', row) },
  { id: 'edit', label: 'Edit', icon: <EditIcon fontSize="small" />, onClick: (row) => console.log('Edit:', row) },
  { id: 'archive', label: 'Archive', icon: <ArchiveIcon fontSize="small" />, onClick: (row) => console.log('Archive:', row), showInMenu: true },
  { id: 'delete', label: 'Delete', icon: <DeleteIcon fontSize="small" />, onClick: (row) => console.log('Delete:', row), color: 'error', showInMenu: true },
];

const hoverActions: RowAction<User>[] = [
  { id: 'save', label: 'Save', icon: <SaveIcon fontSize="small" />, onClick: (row) => console.log('Save:', row) },
  { id: 'archive', label: 'Archive', icon: <ArchiveIcon fontSize="small" />, onClick: (row) => console.log('Archive:', row) },
  { id: 'delete', label: 'Delete', icon: <DeleteIcon fontSize="small" />, onClick: (row) => console.log('Delete:', row), color: 'error' },
  { id: 'schedule', label: 'Schedule', icon: <ScheduleIcon fontSize="small" />, onClick: (row) => console.log('Schedule:', row) },
];

const bulkActions: BulkAction<User>[] = [
  { id: 'export', label: 'Export', onClick: (rows) => console.log('Export:', rows) },
  { id: 'archive', label: 'Archive', icon: <ArchiveIcon fontSize="small" />, onClick: (rows) => console.log('Archive:', rows) },
  { id: 'delete', label: 'Delete', icon: <DeleteIcon fontSize="small" />, onClick: (rows) => console.log('Delete:', rows), color: 'error', confirmMessage: 'Delete selected items?' },
];

// ============================================================================
// STORYBOOK META
// ============================================================================

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    density: {
      control: 'select',
      options: ['compact', 'standard', 'comfortable'],
      description: 'Row density affects height, font size, and spacing',
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: 'Table height in pixels',
    },
    stripedRows: {
      control: 'boolean',
      description: 'Alternating row colors for readability',
    },
    loading: {
      control: 'boolean',
      description: 'Shows skeleton loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

// ============================================================================
// BASIC STORIES
// ============================================================================

/** Default table with all cell renderers */
export const Default: Story = {
  args: {
    rows: sampleUsers,
    columns: columns,
    title: 'Users',
    subtitle: 'Manage team members',
    height: 500,
  },
};

/** Simple layout using TextCell instead of AvatarCell */
export const SimpleLayout: Story = {
  args: {
    rows: sampleUsers,
    columns: simpleColumns,
    title: 'Users',
    subtitle: 'Without avatars',
    height: 500,
  },
};

/** Loading skeleton state */
export const Loading: Story = {
  args: {
    rows: [],
    columns: columns,
    title: 'Loading...',
    loading: true,
    height: 400,
  },
};

// ============================================================================
// DENSITY STORIES
// ============================================================================

/** Compact density - maximum data visibility */
export const DensityCompact: Story = {
  args: {
    rows: sampleUsers,
    columns: columns,
    title: 'Compact View',
    density: 'compact',
    height: 450,
  },
};

/** Comfortable density - improved readability */
export const DensityComfortable: Story = {
  args: {
    rows: sampleUsers,
    columns: columns,
    title: 'Comfortable View',
    density: 'comfortable',
    height: 550,
  },
};

/** Side-by-side density comparison */
export const DensityComparison: Story = {
  render: () => (
    <Stack spacing={3}>
      {(['compact', 'standard', 'comfortable'] as const).map((density) => (
        <Box key={density}>
          <Typography variant="subtitle2" sx={{ mb: 1, textTransform: 'capitalize' }}>
            {density}
          </Typography>
          <DataTable
            rows={sampleUsers.slice(0, 3)}
            columns={columns.slice(0, 5)}
            density={density}
            toolbar={{ show: false }}
            height={density === 'compact' ? 180 : density === 'standard' ? 200 : 240}
          />
        </Box>
      ))}
    </Stack>
  ),
};

// ============================================================================
// SELECTION & ACTIONS STORIES
// ============================================================================

/** Checkbox selection with bulk actions */
export const WithSelection: Story = {
  args: {
    rows: sampleUsers,
    columns: columns,
    title: 'Users',
    selection: { enabled: true },
    bulkActions: bulkActions,
    height: 500,
  },
};

/** Row actions in dropdown menu */
export const WithRowActions: Story = {
  args: {
    rows: sampleUsers,
    columns: columns,
    title: 'Users',
    rowActions: rowActions,
    height: 500,
  },
};

/** Gmail-style hover actions */
export const HoverActions: Story = {
  args: {
    rows: sampleUsers,
    columns: columns,
    title: 'Hover Actions',
    subtitle: 'Move mouse over rows to see actions',
    rowActionsConfig: {
      actions: hoverActions,
      mode: 'hover',
      width: 160,
    },
    height: 500,
  },
};

// ============================================================================
// EDITING STORIES
// ============================================================================

/** Inline cell editing - double-click to edit */
export const InlineEditing: Story = {
  args: {
    rows: sampleUsers,
    columns: columns.map(col => ({
      ...col,
      editable: !['rating', 'progress'].includes(col.field),
    })),
    title: 'Editable Table',
    subtitle: 'Double-click cells to edit',
    editing: { enabled: true, mode: 'cell' },
    onRowUpdate: async (newRow) => {
      console.log('Updated:', newRow);
      return newRow;
    },
    height: 500,
  },
};

/** Inline row addition */
export const InlineAddRow: Story = {
  args: {
    rows: sampleUsers.slice(0, 5),
    columns: columns,
    title: 'Add Users',
    inlineAdd: {
      enabled: true,
      placeholder: 'Click to add user...',
      requiredFields: ['name', 'email', 'company'],
      defaultValues: { status: 'Active', progress: 0, rating: 0, revenue: 0 },
    },
    onRowAdd: (row) => console.log('Added:', row),
    height: 500,
  },
};

// ============================================================================
// TOOLBAR & FEATURES STORIES
// ============================================================================

/** Custom toolbar configuration */
export const CustomToolbar: Story = {
  args: {
    rows: sampleUsers,
    columns: columns,
    title: 'Full Toolbar',
    toolbar: {
      show: true,
      showSearch: true,
      showDensitySelector: true,
      showColumnVisibility: true,
      showExport: true,
      showFilter: true,
      showRefresh: true,
      showAddButton: true,
    },
    onRefresh: () => console.log('Refresh'),
    height: 500,
  },
};

/** Pagination with custom page sizes */
export const WithPagination: Story = {
  args: {
    rows: sampleUsers,
    columns: columns,
    title: 'Paginated',
    pagination: {
      enabled: true,
      pageSize: 5,
      pageSizeOptions: [5, 10, 25],
    },
    height: 400,
  },
};

/** Striped rows for readability */
export const StripedRows: Story = {
  args: {
    rows: sampleUsers,
    columns: columns,
    title: 'Striped Rows',
    stripedRows: true,
    height: 500,
  },
};

/** Minimal table without toolbar */
export const Minimal: Story = {
  args: {
    rows: sampleUsers.slice(0, 5),
    columns: columns.slice(0, 4),
    toolbar: { show: false },
    showBorders: false,
    elevation: 0,
    height: 280,
  },
};

// ============================================================================
// FULL FEATURED STORY
// ============================================================================

/** All features enabled */
export const FullFeatured: Story = {
  args: {
    rows: sampleUsers,
    columns: columns.map(col => ({
      ...col,
      editable: !['rating', 'progress'].includes(col.field),
    })),
    title: 'Full-Featured DataTable',
    subtitle: 'All capabilities enabled',
    density: 'standard',
    allowDensityChange: true,
    selection: { enabled: true },
    pagination: { enabled: true, pageSize: 10 },
    sorting: { enabled: true },
    filtering: { enabled: true },
    editing: { enabled: true, mode: 'cell' },
    inlineAdd: {
      enabled: true,
      placeholder: 'Add user...',
      requiredFields: ['name', 'email'],
    },
    rowActions: rowActions,
    bulkActions: bulkActions,
    toolbar: {
      show: true,
      showSearch: true,
      showDensitySelector: true,
      showColumnVisibility: true,
      showExport: true,
      showFilter: true,
      showRefresh: true,
    },
    stripedRows: true,
    height: 600,
    onRowUpdate: async (row) => row,
    onRowAdd: (row) => console.log('Added:', row),
    onSelectionChange: (ids) => console.log('Selected:', ids),
    onRefresh: () => console.log('Refresh'),
  },
};
