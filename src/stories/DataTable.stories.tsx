import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, DataTableColumn } from '../components/DataTable';
import { Chip, Avatar, Box, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

/**
 * # DataTable
 * 
 * The DataTable component displays data in a structured tabular format with
 * support for sorting, filtering, pagination, and row selection.
 * 
 * ## Features
 * - **Sorting**: Click column headers to sort
 * - **Selection**: Checkbox selection for bulk actions
 * - **Pagination**: Navigate through large datasets
 * - **Search**: Filter rows by search query
 * - **Actions**: Row-level and bulk actions
 * - **Loading state**: Skeleton loading
 * 
 * ## Accessibility
 * - Proper table semantics with headers
 * - Keyboard navigation support
 * - Screen reader friendly selection states
 */

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  status: 'Active' | 'Pending' | 'Inactive';
  role: string;
  revenue: number;
}

const sampleData: User[] = [
  { id: 1, name: 'John Smith', email: 'john@pharma.com', company: 'Pharma Corp', status: 'Active', role: 'Account Manager', revenue: 125000 },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@biotech.com', company: 'BioTech Labs', status: 'Active', role: 'Sales Director', revenue: 342000 },
  { id: 3, name: 'Michael Chen', email: 'michael@meddev.com', company: 'MedDevice Inc', status: 'Pending', role: 'Analyst', revenue: 89000 },
  { id: 4, name: 'Emily Davis', email: 'emily@health.com', company: 'Healthcare Plus', status: 'Active', role: 'VP Sales', revenue: 567000 },
  { id: 5, name: 'Robert Wilson', email: 'robert@genomix.com', company: 'Genomix', status: 'Inactive', role: 'Consultant', revenue: 45000 },
  { id: 6, name: 'Lisa Anderson', email: 'lisa@neuro.com', company: 'NeuroCare', status: 'Active', role: 'Regional Manager', revenue: 234000 },
  { id: 7, name: 'David Brown', email: 'david@onco.com', company: 'OncoPharma', status: 'Active', role: 'Director', revenue: 890000 },
  { id: 8, name: 'Jennifer Martinez', email: 'jennifer@cardio.com', company: 'CardioMed', status: 'Pending', role: 'Analyst', revenue: 67000 },
  { id: 9, name: 'James Taylor', email: 'james@immuno.com', company: 'ImmunoGen', status: 'Active', role: 'Account Executive', revenue: 178000 },
  { id: 10, name: 'Amanda White', email: 'amanda@diag.com', company: 'DiagnostiCorp', status: 'Inactive', role: 'Consultant', revenue: 23000 },
];

const columns: DataTableColumn<User>[] = [
  {
    id: 'name',
    label: 'Name',
    render: (row) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
          {row.name.split(' ').map((n) => n[0]).join('')}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {row.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  { id: 'company', label: 'Company', sortable: true },
  {
    id: 'status',
    label: 'Status',
    render: (row) => (
      <Chip
        label={row.status}
        size="small"
        color={
          row.status === 'Active'
            ? 'success'
            : row.status === 'Pending'
            ? 'warning'
            : 'default'
        }
      />
    ),
  },
  { id: 'role', label: 'Role', sortable: true },
  {
    id: 'revenue',
    label: 'Revenue',
    numeric: true,
    sortable: true,
    render: (row) => `$${row.revenue.toLocaleString()}`,
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Enhanced table with sorting, filtering, pagination, and selection.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

/**
 * Basic table with sorting.
 */
export const Default: Story = {
  args: {
    rows: sampleData,
    columns,
    title: 'Users',
  },
};

/**
 * Table with row selection.
 */
export const WithSelection: Story = {
  args: {
    rows: sampleData,
    columns,
    title: 'Users',
    selectable: true,
  },
};

/**
 * Table with search functionality.
 */
export const WithSearch: Story = {
  args: {
    rows: sampleData,
    columns,
    title: 'Users',
    searchable: true,
    searchPlaceholder: 'Search users...',
  },
};

/**
 * Table with pagination.
 */
export const WithPagination: Story = {
  args: {
    rows: sampleData,
    columns,
    title: 'Users',
    paginated: true,
    defaultRowsPerPage: 5,
  },
};

/**
 * Table with row actions menu.
 */
export const WithRowActions: Story = {
  args: {
    rows: sampleData,
    columns,
    title: 'Users',
    rowActions: [
      {
        label: 'View Details',
        icon: <VisibilityIcon fontSize="small" />,
        onClick: (row) => console.log('View:', row),
      },
      {
        label: 'Edit',
        icon: <EditIcon fontSize="small" />,
        onClick: (row) => console.log('Edit:', row),
      },
      {
        label: 'Delete',
        icon: <DeleteIcon fontSize="small" />,
        onClick: (row) => console.log('Delete:', row),
        color: 'error',
      },
    ],
  },
};

/**
 * Full-featured table with all options.
 */
export const FullFeatured: Story = {
  args: {
    rows: sampleData,
    columns,
    title: 'Users',
    selectable: true,
    searchable: true,
    paginated: true,
    defaultRowsPerPage: 5,
    rowActions: [
      {
        label: 'View',
        icon: <VisibilityIcon fontSize="small" />,
        onClick: (row) => console.log('View:', row),
      },
      {
        label: 'Edit',
        icon: <EditIcon fontSize="small" />,
        onClick: (row) => console.log('Edit:', row),
      },
    ],
    bulkActions: (
      <Button size="small" startIcon={<DeleteIcon />} color="error">
        Delete Selected
      </Button>
    ),
  },
};

/**
 * Dense mode table.
 */
export const Dense: Story = {
  args: {
    rows: sampleData,
    columns,
    title: 'Users',
    dense: true,
    paginated: true,
    defaultRowsPerPage: 10,
  },
};

/**
 * Loading state with skeletons.
 */
export const Loading: Story = {
  args: {
    rows: [],
    columns,
    title: 'Users',
    loading: true,
    loadingRows: 5,
  },
};

/**
 * Empty state.
 */
export const Empty: Story = {
  args: {
    rows: [],
    columns,
    title: 'Users',
    searchable: true,
    emptyState: (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          No users found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Try adjusting your search or add a new user.
        </Typography>
        <Button variant="contained">Add User</Button>
      </Box>
    ),
  },
};

/**
 * Table with sticky header and max height.
 */
export const StickyHeader: Story = {
  args: {
    rows: sampleData,
    columns,
    title: 'Users',
    stickyHeader: true,
    maxHeight: 300,
  },
};
