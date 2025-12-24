import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  alpha,
  Skeleton,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { brandColors } from '../../theme';

export type DataTableSortDirection = 'asc' | 'desc';

export interface DataTableColumn<T> {
  /** Unique identifier for the column */
  id: keyof T | string;
  /** Header label */
  label: string;
  /** Whether column is numeric (right-aligned) */
  numeric?: boolean;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Minimum width */
  minWidth?: number;
  /** Custom render function */
  render?: (row: T, index: number) => React.ReactNode;
  /** Custom header render */
  renderHeader?: () => React.ReactNode;
  /** Alignment */
  align?: 'left' | 'center' | 'right';
}

export interface DataTableRowAction<T> {
  /** Action label */
  label: string;
  /** Action icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick: (row: T) => void;
  /** Whether action is disabled */
  disabled?: (row: T) => boolean;
  /** Color */
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export interface DataTableProps<T extends { id: string | number }> {
  /** Data rows */
  rows: T[];
  /** Column definitions */
  columns: DataTableColumn<T>[];
  /** Whether to show row selection checkboxes */
  selectable?: boolean;
  /** Currently selected row IDs */
  selected?: (string | number)[];
  /** Callback when selection changes */
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  /** Whether to show search input */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** External search value (controlled) */
  searchValue?: string;
  /** Callback when search changes */
  onSearchChange?: (value: string) => void;
  /** Search filter function */
  searchFilter?: (row: T, query: string) => boolean;
  /** Whether to show pagination */
  paginated?: boolean;
  /** Rows per page options */
  rowsPerPageOptions?: number[];
  /** Default rows per page */
  defaultRowsPerPage?: number;
  /** Current page (controlled) */
  page?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Whether to show toolbar */
  showToolbar?: boolean;
  /** Toolbar title */
  title?: string;
  /** Bulk actions (shown when rows selected) */
  bulkActions?: React.ReactNode;
  /** Row actions menu */
  rowActions?: DataTableRowAction<T>[];
  /** Dense mode */
  dense?: boolean;
  /** Whether data is loading */
  loading?: boolean;
  /** Number of skeleton rows to show when loading */
  loadingRows?: number;
  /** Empty state content */
  emptyState?: React.ReactNode;
  /** Custom row click handler */
  onRowClick?: (row: T) => void;
  /** Get row ID function (defaults to row.id) */
  getRowId?: (row: T) => string | number;
  /** Table container max height */
  maxHeight?: number | string;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Custom styles */
  sx?: object;
}

// Default comparator
function descendingComparator<T>(a: T, b: T, orderBy: keyof T | string): number {
  const aValue = (a as Record<string, unknown>)[orderBy as string] as string | number | null | undefined;
  const bValue = (b as Record<string, unknown>)[orderBy as string] as string | number | null | undefined;
  
  if (bValue == null) return -1;
  if (aValue == null) return 1;
  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
}

function getComparator<T>(
  order: DataTableSortDirection,
  orderBy: keyof T | string
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * DataTable displays data in a structured tabular format with support for
 * sorting, filtering, pagination, and row selection.
 *
 * @example
 * ```tsx
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 *   status: 'active' | 'inactive';
 * }
 *
 * const columns: DataTableColumn<User>[] = [
 *   { id: 'name', label: 'Name', sortable: true },
 *   { id: 'email', label: 'Email' },
 *   {
 *     id: 'status',
 *     label: 'Status',
 *     render: (row) => <Chip label={row.status} color={row.status === 'active' ? 'success' : 'default'} />
 *   },
 * ];
 *
 * <DataTable
 *   rows={users}
 *   columns={columns}
 *   selectable
 *   searchable
 *   paginated
 *   title="Users"
 * />
 * ```
 */
export function DataTable<T extends { id: string | number }>({
  rows,
  columns,
  selectable = false,
  selected = [],
  onSelectionChange,
  searchable = false,
  searchPlaceholder = 'Search...',
  searchValue: controlledSearchValue,
  onSearchChange,
  searchFilter,
  paginated = false,
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRowsPerPage = 10,
  page: controlledPage,
  onPageChange,
  showToolbar = true,
  title,
  bulkActions,
  rowActions,
  dense = false,
  loading = false,
  loadingRows = 5,
  emptyState,
  onRowClick,
  getRowId = (row) => row.id,
  maxHeight,
  stickyHeader = false,
  sx,
}: DataTableProps<T>) {
  // Internal state
  const [order, setOrder] = useState<DataTableSortDirection>('asc');
  const [orderBy, setOrderBy] = useState<keyof T | string>(columns[0]?.id || '');
  const [internalSelected, setInternalSelected] = useState<(string | number)[]>([]);
  const [internalPage, setInternalPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [internalSearch, setInternalSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuRowId, setMenuRowId] = useState<string | number | null>(null);

  // Use controlled or internal state
  const selectedIds = onSelectionChange ? selected : internalSelected;
  const setSelectedIds = onSelectionChange || setInternalSelected;
  const page = controlledPage !== undefined ? controlledPage : internalPage;
  const setPage = onPageChange || setInternalPage;
  const searchQuery = controlledSearchValue !== undefined ? controlledSearchValue : internalSearch;
  const setSearchQuery = onSearchChange || setInternalSearch;

  // Default search filter
  const defaultSearchFilter = useCallback((row: T, query: string) => {
    const lowerQuery = query.toLowerCase();
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(lowerQuery)
    );
  }, []);

  const filterFn = searchFilter || defaultSearchFilter;

  // Filtered and sorted rows
  const processedRows = useMemo(() => {
    let result = [...rows];

    // Filter
    if (searchQuery) {
      result = result.filter((row) => filterFn(row, searchQuery));
    }

    // Sort
    if (orderBy) {
      result.sort(getComparator(order, orderBy));
    }

    return result;
  }, [rows, searchQuery, filterFn, order, orderBy]);

  // Paginated rows
  const displayedRows = useMemo(() => {
    if (!paginated) return processedRows;
    return processedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [processedRows, paginated, page, rowsPerPage]);

  // Handlers
  const handleRequestSort = (property: keyof T | string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = processedRows.map((row) => getRowId(row));
      setSelectedIds(newSelected);
      return;
    }
    setSelectedIds([]);
  };

  const handleClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
      return;
    }

    if (!selectable) return;

    const id = getRowId(row);
    const selectedIndex = selectedIds.indexOf(id);
    let newSelected: (string | number)[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedIds, id];
    } else {
      newSelected = selectedIds.filter((s) => s !== id);
    }

    setSelectedIds(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, rowId: string | number) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const isSelected = (id: string | number) => selectedIds.indexOf(id) !== -1;
  const numSelected = selectedIds.length;

  // Loading skeleton
  if (loading) {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden', ...sx }}>
        {showToolbar && (
          <Toolbar sx={{ pl: 2, pr: 1 }}>
            <Skeleton width={200} height={32} />
            {searchable && <Skeleton width={240} height={40} sx={{ ml: 'auto' }} />}
          </Toolbar>
        )}
        <TableContainer sx={{ maxHeight }}>
          <Table size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Skeleton variant="rectangular" width={20} height={20} />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={String(column.id)}>
                    <Skeleton width={100} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: loadingRows }).map((_, index) => (
                <TableRow key={index}>
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Skeleton variant="rectangular" width={20} height={20} />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={String(column.id)}>
                      <Skeleton width="80%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', ...sx }}>
      {/* Toolbar */}
      {showToolbar && (
        <Toolbar
          sx={{
            pl: 2,
            pr: 1,
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
              {title}
            </Typography>
          )}

          {numSelected > 0 ? (
            <Stack direction="row" spacing={1}>
              {bulkActions}
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              {searchable && (
                <TextField
                  size="small"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: 240 }}
                />
              )}
              <Tooltip title="Filter list">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Toolbar>
      )}

      {/* Table */}
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader={stickyHeader} size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < processedRows.length}
                    checked={processedRows.length > 0 && numSelected === processedRows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align || (column.numeric ? 'right' : 'left')}
                  sortDirection={orderBy === column.id ? order : false}
                  sx={{ minWidth: column.minWidth }}
                >
                  {column.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.renderHeader ? column.renderHeader() : column.label}
                    </TableSortLabel>
                  ) : column.renderHeader ? (
                    column.renderHeader()
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {rowActions && rowActions.length > 0 && <TableCell align="right" />}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  align="center"
                  sx={{ py: 8 }}
                >
                  {emptyState || (
                    <Typography color="text.secondary">No data available</Typography>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              displayedRows.map((row, index) => {
                const id = getRowId(row);
                const isItemSelected = isSelected(id);

                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row)}
                    role={selectable ? 'checkbox' : undefined}
                    aria-checked={selectable ? isItemSelected : undefined}
                    tabIndex={-1}
                    key={id}
                    selected={isItemSelected}
                    sx={{
                      cursor: onRowClick || selectable ? 'pointer' : 'default',
                    }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isItemSelected} />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = (row as Record<string, unknown>)[column.id as string];
                      return (
                        <TableCell
                          key={String(column.id)}
                          align={column.align || (column.numeric ? 'right' : 'left')}
                        >
                          {column.render ? column.render(row, index) : String(value ?? '')}
                        </TableCell>
                      );
                    })}
                    {rowActions && rowActions.length > 0 && (
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, id)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {paginated && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={processedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}

      {/* Row Actions Menu */}
      {rowActions && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {rowActions.map((action, index) => {
            const row = rows.find((r) => getRowId(r) === menuRowId);
            const isDisabled = row && action.disabled ? action.disabled(row) : false;

            return (
              <MenuItem
                key={index}
                disabled={isDisabled}
                onClick={() => {
                  if (row) action.onClick(row);
                  handleMenuClose();
                }}
              >
                {action.icon && (
                  <Box component="span" sx={{ mr: 1, display: 'flex' }}>
                    {action.icon}
                  </Box>
                )}
                {action.label}
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </Paper>
  );
}

export default DataTable;
