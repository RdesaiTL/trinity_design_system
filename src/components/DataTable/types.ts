/**
 * DataTable Types
 * Comprehensive type definitions for Trinity DataTable
 */

import { SxProps, Theme } from '@mui/material';
import {
  GridColDef,
  GridRowId,
  GridRowModel,
  GridFilterModel,
  GridSortModel,
  GridPaginationModel,
  GridRowSelectionModel,
  GridDensity,
  GridValidRowModel,
  GridCellParams,
  GridRowParams,
  GridSlots,
  GridSlotProps,
} from '@mui/x-data-grid';

// ============================================================================
// DENSITY
// ============================================================================

export type TableDensity = 'compact' | 'standard' | 'comfortable';

export const densityMap: Record<TableDensity, GridDensity> = {
  compact: 'compact',
  standard: 'standard',
  comfortable: 'comfortable',
};

// ============================================================================
// ROW TYPES
// ============================================================================

export interface TreeDataRow extends GridValidRowModel {
  id: GridRowId;
  hierarchy?: string[];
  parentId?: GridRowId | null;
  [key: string]: unknown;
}

export interface RowWithChildren extends GridValidRowModel {
  id: GridRowId;
  children?: RowWithChildren[];
  [key: string]: unknown;
}

// ============================================================================
// COLUMN TYPES
// ============================================================================

export interface TrinityColumnDef<R extends GridValidRowModel = GridValidRowModel> 
  extends Omit<GridColDef<R>, 'type'> {
  /** Column type with Trinity extensions */
  type?: GridColDef['type'] | 'status' | 'avatar' | 'progress' | 'rating' | 'currency' | 'actions';
  /** Enable inline editing for this column */
  inlineEditable?: boolean;
  /** Status color mapping for status type */
  statusColors?: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'>;
  /** Currency symbol for currency type */
  currencySymbol?: string;
  /** Format function for display */
  formatValue?: (value: unknown) => string;
  /** Validation function for edits */
  validate?: (value: unknown, row: R) => string | null;
}

// ============================================================================
// TOOLBAR CONFIGURATION
// ============================================================================

export interface ToolbarConfig {
  /** Show the toolbar */
  show?: boolean;
  /** Show search/quick filter */
  showSearch?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Show column visibility toggle */
  showColumnVisibility?: boolean;
  /** Show density selector */
  showDensitySelector?: boolean;
  /** Show export button */
  showExport?: boolean;
  /** Export formats */
  exportFormats?: ('csv' | 'print')[];
  /** Show filter button */
  showFilter?: boolean;
  /** Show refresh button */
  showRefresh?: boolean;
  /** Show add row button */
  showAddButton?: boolean;
  /** Custom toolbar actions */
  customActions?: React.ReactNode;
}

// ============================================================================
// INLINE ADD ROW
// ============================================================================

export interface InlineAddFieldConfig {
  type?: 'text' | 'number' | 'select' | 'date';
  options?: Array<{ value: string | number; label: string }>;
  prefix?: string;
  suffix?: string;
}

export interface InlineAddConfig<R extends GridValidRowModel = GridValidRowModel> {
  /** Enable inline add */
  enabled: boolean;
  /** Position of add row */
  position?: 'top' | 'bottom';
  /** Placeholder text */
  placeholder?: string;
  /** Default values for new row */
  defaultValues?: Partial<R>;
  /** Required fields */
  requiredFields?: string[];
  /** Editable fields (if not specified, all are editable) */
  editableFields?: string[];
  /** Fields to exclude from editing */
  excludeFields?: string[];
  /** Custom validation */
  validation?: (values: Partial<R>) => Record<string, string>;
  /** Field-specific configs */
  fieldConfigs?: Record<string, InlineAddFieldConfig>;
}

// ============================================================================
// TREE DATA CONFIGURATION
// ============================================================================

export interface TreeDataConfig<R extends GridValidRowModel = GridValidRowModel> {
  /** Enable tree data */
  enabled: boolean;
  /** Get tree data path function */
  getTreeDataPath?: (row: R) => string[];
  /** Default expanded state */
  defaultExpanded?: boolean;
  /** Controlled expanded row IDs */
  expandedRowIds?: GridRowId[];
  /** Callback when expansion changes */
  onExpandedChange?: (expandedIds: GridRowId[]) => void;
  /** Grouping column label */
  groupingColumnLabel?: string;
  /** Grouping column width */
  groupingColumnWidth?: number;
}

// ============================================================================
// ROW GROUPING CONFIGURATION
// ============================================================================

export interface RowGroupingConfig {
  /** Enable row grouping */
  enabled: boolean;
  /** Columns to group by */
  groupBy?: string[];
  /** Default expanded groups */
  defaultExpanded?: boolean;
}

// ============================================================================
// SELECTION CONFIGURATION
// ============================================================================

export interface SelectionConfig {
  /** Enable row selection */
  enabled?: boolean;
  /** Selection mode */
  mode?: 'single' | 'multiple';
  /** Checkbox selection */
  checkboxSelection?: boolean;
  /** Select row on click */
  selectOnClick?: boolean;
  /** Keep non-existent rows selected */
  keepNonExistentRowsSelected?: boolean;
}

// ============================================================================
// PAGINATION CONFIGURATION
// ============================================================================

export interface PaginationConfig {
  /** Enable pagination */
  enabled?: boolean;
  /** Page size options */
  pageSizeOptions?: number[];
  /** Default page size */
  pageSize?: number;
  /** Default page */
  defaultPage?: number;
  /** Pagination mode (client or server) */
  paginationMode?: 'client' | 'server';
  /** Total row count for server pagination */
  rowCount?: number;
}

// ============================================================================
// SORTING CONFIGURATION
// ============================================================================

export interface SortingConfig {
  /** Enable sorting */
  enabled?: boolean;
  /** Sorting mode */
  serverSide?: boolean;
  /** Allow multiple column sorting */
  multiSort?: boolean;
  /** Initial/default sort */
  defaultSort?: { field: string; sort: 'asc' | 'desc' };
}

// ============================================================================
// FILTERING CONFIGURATION
// ============================================================================

export interface FilteringConfig {
  /** Enable filtering */
  enabled?: boolean;
  /** Filtering mode */
  serverSide?: boolean;
  /** Quick filter */
  quickFilter?: boolean;
  /** Quick filter placeholder */
  quickFilterPlaceholder?: string;
  /** Default filters */
  defaultFilters?: GridFilterModel['items'];
  /** Disable multiple filters */
  disableMultipleFilters?: boolean;
}

// ============================================================================
// EDITING CONFIGURATION
// ============================================================================

export interface EditingConfig {
  /** Enable editing */
  enabled?: boolean;
  /** Edit mode */
  mode?: 'cell' | 'row';
  /** Confirm before save */
  confirmBeforeSave?: boolean;
  /** Confirmation message */
  confirmMessage?: string;
}

// ============================================================================
// COLUMN PINNING CONFIGURATION
// ============================================================================

export interface ColumnPinningConfig {
  /** Enable column pinning */
  enabled?: boolean;
  /** Columns pinned to the left */
  left?: string[];
  /** Columns pinned to the right */
  right?: string[];
}

// ============================================================================
// ROW REORDERING CONFIGURATION
// ============================================================================

export interface RowReorderConfig<R extends GridValidRowModel = GridValidRowModel> {
  /** Enable row reordering */
  enabled?: boolean;
  /** Show drag handle */
  showDragHandle?: boolean;
  /** Callback when rows are reordered */
  onRowOrderChange?: (oldIndex: number, newIndex: number, rows: R[]) => void;
}

// ============================================================================
// ROW ACTIONS
// ============================================================================

/** How row actions are displayed */
export type RowActionsMode = 'menu' | 'hover' | 'always';

export interface RowActionsConfig<R extends GridValidRowModel = GridValidRowModel> {
  /** Actions for each row */
  actions: RowAction<R>[];
  /** Display mode: 'menu' (3-dot), 'hover' (Gmail-style), 'always' (always visible) */
  mode?: RowActionsMode;
  /** Maximum inline actions before overflow to menu (for 'always' mode) */
  maxInline?: number;
  /** Column width */
  width?: number;
  /** Pin to right side */
  pinned?: boolean;
}

export interface RowAction<R extends GridValidRowModel = GridValidRowModel> {
  /** Action ID */
  id: string;
  /** Action label */
  label: string;
  /** Action icon */
  icon?: React.ReactNode;
  /** Action handler */
  onClick: (row: R) => void;
  /** Whether action is disabled */
  disabled?: boolean | ((row: R) => boolean);
  /** Action color */
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** Show in menu vs inline */
  showInMenu?: boolean;
}

// ============================================================================
// BULK ACTIONS
// ============================================================================

export interface BulkAction<R extends GridValidRowModel = GridValidRowModel> {
  /** Action ID */
  id: string;
  /** Action label */
  label: string;
  /** Action icon */
  icon?: React.ReactNode;
  /** Action handler */
  onClick: (selectedRows: R[]) => void;
  /** Action color */
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** Whether action is destructive (shows confirmation) */
  destructive?: boolean;
  /** Confirmation message */
  confirmMessage?: string;
}

// ============================================================================
// MAIN PROPS
// ============================================================================

export interface DataTableProps<R extends GridValidRowModel = GridValidRowModel> {
  // Core
  /** Data rows */
  rows: R[];
  /** Column definitions */
  columns: GridColDef<R>[];
  /** Get row ID function */
  getRowId?: (row: R) => GridRowId;
  /** Loading state */
  loading?: boolean;
  
  // Density
  /** Table density */
  density?: TableDensity;
  /** Allow density change in toolbar */
  allowDensityChange?: boolean;
  
  // Appearance
  /** Title for the table */
  title?: string;
  /** Subtitle */
  subtitle?: string;
  /** Fixed height */
  height?: number | string;
  /** Minimum height */
  minHeight?: number;
  /** Maximum height */
  maxHeight?: number;
  /** Show borders */
  showBorders?: boolean;
  /** Paper elevation */
  elevation?: number;
  /** Border radius */
  borderRadius?: number | string;
  /** Striped rows */
  stripedRows?: boolean;
  /** Sticky header */
  stickyHeader?: boolean;
  
  // Features
  /** Toolbar configuration */
  toolbar?: ToolbarConfig;
  /** Selection configuration */
  selection?: SelectionConfig;
  /** Pagination configuration */
  pagination?: PaginationConfig;
  /** Sorting configuration */
  sorting?: SortingConfig;
  /** Filtering configuration */
  filtering?: FilteringConfig;
  /** Editing configuration */
  editing?: EditingConfig;
  /** Tree data configuration */
  treeData?: TreeDataConfig<R>;
  /** Row grouping configuration */
  rowGrouping?: RowGroupingConfig;
  /** Inline add configuration */
  inlineAdd?: InlineAddConfig<R>;
  /** Column pinning configuration */
  columnPinning?: ColumnPinningConfig;
  /** Row reordering configuration */
  rowReorder?: RowReorderConfig<R>;
  /** Row actions configuration (replaces rowActions) */
  rowActionsConfig?: RowActionsConfig<R>;
  
  // Actions
  /** Row actions (deprecated - use rowActionsConfig) */
  rowActions?: RowAction<R>[];
  /** Bulk actions */
  bulkActions?: BulkAction<R>[];
  
  // Callbacks
  /** Row click handler */
  onRowClick?: (params: GridRowParams<R>) => void;
  /** Row double-click handler */
  onRowDoubleClick?: (params: GridRowParams<R>) => void;
  /** Cell click handler */
  onCellClick?: (params: GridCellParams<R>) => void;
  /** Selection change handler */
  onSelectionChange?: (selectedIds: GridRowId[]) => void;
  /** Sort change handler */
  onSortChange?: (field: string, direction: 'asc' | 'desc') => void;
  /** Filter change handler */
  onFilterChange?: (filterModel: GridFilterModel) => void;
  /** Page change handler */
  onPageChange?: (page: number, pageSize: number) => void;
  /** Row update handler (for inline editing) */
  onRowUpdate?: (newRow: R, oldRow: R) => Promise<R> | R;
  /** Row add handler (for inline add) */
  onRowAdd?: (newRow: Partial<R>) => void;
  /** Row delete handler */
  onRowDelete?: (row: R) => void;
  /** Refresh handler */
  onRefresh?: () => void;
  /** Export handler */
  onExport?: (format: 'csv' | 'excel' | 'pdf') => void;
  
  // Styling
  /** Custom sx props */
  sx?: SxProps<Theme>;
  /** Custom class name */
  className?: string;
  /** Get custom row class name */
  getRowClassName?: (row: R) => string | undefined;
  /** Get custom cell class name */
  getCellClassName?: (params: GridCellParams<R>) => string;
  
  // Slots
  /** Custom slot components */
  slots?: Partial<GridSlots>;
  /** Custom slot props */
  slotProps?: GridSlotProps;
}
