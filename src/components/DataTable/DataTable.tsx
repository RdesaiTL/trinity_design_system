/**
 * Trinity DataTable Component
 * A comprehensive data table built on MUI X DataGrid v8
 * Combines clean styling with powerful functionality
 * 
 * Features (Free Version):
 * - Density modes (compact, standard, comfortable)
 * - Inline editing
 * - Custom cell renderers
 * - Bulk actions & row actions (menu mode)
 * - Gmail-style hover actions
 * - Search, filtering, sorting
 * - Export (CSV, JSON, clipboard)
 * - Full light/dark mode support
 * - Loading skeleton states
 * - Inline add row
 * 
 * Features (Require @mui/x-data-grid-pro):
 * - Tree data support
 * - Column pinning
 * - Row reordering / drag-drop
 * - Row grouping
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Paper,
  useTheme,
  alpha,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Stack,
  Menu,
  MenuItem,
  ListItemText,
  Divider,
  Skeleton,
  Chip,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridSortModel,
  GridFilterModel,
  GridRowId,
  GridRowParams,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModesModel,
  GridRowSelectionModel,
  useGridApiRef,
  GridValidRowModel,
  GridDensity,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { DataTableProps, TableDensity, BulkAction, TreeDataRow } from './types';
import { InlineAddRow } from './InlineAddRow';
import { ActionsCell, HoverActionsCell } from './CellRenderers';
import {
  tableColors,
  tableTypography,
  densityTokens,
  tableAnimation,
} from './tokens';

// Map Trinity density to MUI density
const densityMap: Record<TableDensity, GridDensity> = {
  compact: 'compact',
  standard: 'standard',
  comfortable: 'comfortable',
};

// ============================================================================
// DETERMINISTIC WIDTH PATTERNS FOR SKELETON
// ============================================================================

// Pre-computed pseudo-random widths to avoid Math.random() during render
// These provide visual variety without impurity
const HEADER_WIDTHS = [75, 68, 82, 71, 88, 65, 79, 85, 72, 78];
const CELL_WIDTHS = [
  [62, 78, 55, 85, 70, 48, 92, 65, 73, 58],
  [71, 45, 88, 63, 52, 79, 67, 90, 54, 82],
  [58, 82, 68, 75, 45, 87, 60, 72, 93, 55],
  [85, 55, 73, 42, 88, 65, 78, 50, 82, 68],
  [68, 75, 52, 90, 58, 82, 47, 73, 88, 62],
  [45, 88, 65, 72, 82, 55, 78, 68, 50, 85],
  [78, 62, 88, 55, 70, 45, 82, 72, 65, 90],
  [52, 78, 70, 88, 62, 75, 55, 85, 48, 72],
];

const getHeaderWidth = (colIndex: number): string => 
  `${HEADER_WIDTHS[colIndex % HEADER_WIDTHS.length]}%`;

const getCellWidth = (rowIndex: number, colIndex: number): string => 
  `${CELL_WIDTHS[rowIndex % CELL_WIDTHS.length][colIndex % CELL_WIDTHS[0].length]}%`;

// ============================================================================
// LOADING SKELETON COMPONENT
// ============================================================================

interface LoadingSkeletonProps {
  columns: number;
  rows: number;
  density: TableDensity;
  showCheckbox?: boolean;
  colors: typeof tableColors.light;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  columns,
  rows,
  density,
  showCheckbox = false,
  colors,
}) => {
  const tokens = densityTokens[density];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: tokens.headerHeight,
          px: 2,
          gap: 2,
          backgroundColor: colors.headerBg,
          borderBottom: `2px solid ${colors.headerBorder || colors.borderColor}`,
        }}
      >
        {showCheckbox && (
          <Skeleton 
            variant="rectangular" 
            width={18} 
            height={18} 
            sx={{ borderRadius: '4px', flexShrink: 0 }} 
          />
        )}
        {Array.from({ length: columns }).map((_, i) => (
          <Box key={i} sx={{ flex: 1, px: 1 }}>
            <Skeleton width={getHeaderWidth(i)} height={14} />
          </Box>
        ))}
      </Box>

      {/* Data Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: tokens.rowHeight,
            px: 2,
            gap: 2,
            borderBottom: `1px solid ${colors.borderColor}`,
            backgroundColor: colors.background,
          }}
        >
          {showCheckbox && (
            <Skeleton 
              variant="rectangular" 
              width={18} 
              height={18} 
              sx={{ borderRadius: '4px', flexShrink: 0 }} 
            />
          )}
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Box key={colIndex} sx={{ flex: 1, px: 1 }}>
              <Skeleton 
                width={getCellWidth(rowIndex, colIndex)} 
                height={12} 
                sx={{ my: 0.5 }}
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

// ============================================================================
// CUSTOM TOOLBAR COMPONENT
// ============================================================================

interface ToolbarProps<R extends GridValidRowModel> {
  title?: string;
  subtitle?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  showSearch?: boolean;
  selectedCount: number;
  totalCount: number;
  bulkActions?: BulkAction<R>[];
  onBulkAction?: (action: BulkAction<R>) => void;
  onClearSelection?: () => void;
  onAddRow?: () => void;
  onRefresh?: () => void;
  onExport?: (format: 'csv' | 'json' | 'clipboard') => void;
  showExport?: boolean;
  showRefresh?: boolean;
  showColumnSelector?: boolean;
  showFilterButton?: boolean;
  showDensitySelector?: boolean;
  colors: typeof tableColors.light;
}

function DataTableToolbar<R extends GridValidRowModel>({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  showSearch = true,
  selectedCount,
  totalCount: _totalCount,
  bulkActions,
  onBulkAction,
  onClearSelection,
  onAddRow,
  onRefresh,
  onExport,
  showExport = true,
  showRefresh = true,
  showColumnSelector = true,
  showFilterButton = true,
  showDensitySelector = true,
  colors,
}: ToolbarProps<R>) {
  const muiTheme = useTheme();
  const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null);

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchor(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchor(null);
  };

  const handleExport = (format: 'csv' | 'json' | 'clipboard') => {
    onExport?.(format);
    handleExportClose();
  };

  const hasSelection = selectedCount > 0;

  return (
    <Toolbar
      sx={{
        pl: 2,
        pr: 1.5,
        py: 1.5,
        borderBottom: `1px solid ${colors.borderColor}`,
        backgroundColor: hasSelection ? alpha(muiTheme.palette.primary.main, 0.06) : colors.background,
        minHeight: 'auto !important',
        flexWrap: 'wrap',
        gap: 1,
        transition: 'background-color 0.2s ease',
      }}
    >
      {/* Left: Title or Selection Info */}
      <Box sx={{ flex: '1 1 auto', minWidth: 180 }}>
        {hasSelection ? (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Chip
              label={`${selectedCount} selected`}
              size="small"
              onDelete={onClearSelection}
              deleteIcon={<CloseIcon fontSize="small" />}
              sx={{
                backgroundColor: alpha(muiTheme.palette.primary.main, 0.12),
                color: 'primary.main',
                fontWeight: 600,
                '& .MuiChip-deleteIcon': {
                  color: 'primary.main',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                },
              }}
            />
            {bulkActions && bulkActions.length > 0 && (
              <Stack direction="row" spacing={0.5}>
                {bulkActions.map((action, index) => (
                  <Tooltip key={index} title={action.label}>
                    <IconButton
                      size="small"
                      onClick={() => onBulkAction?.(action)}
                      color={action.color || 'default'}
                      sx={{ 
                        borderRadius: '8px',
                        '&:hover': { 
                          backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      {action.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            )}
          </Stack>
        ) : (
          <Box>
            {title && (
              <Typography 
                variant="subtitle1" 
                fontWeight={600} 
                color="text.primary"
                sx={{ lineHeight: 1.3 }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {/* Right: Actions */}
      <Stack direction="row" spacing={0.5} alignItems="center">
        {/* Search */}
        {showSearch && (
          <TextField
            size="small"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: colors.textSecondary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: colors.background,
                fontSize: '0.875rem',
                '& fieldset': {
                  borderColor: colors.borderColor,
                },
                '&:hover fieldset': {
                  borderColor: colors.textSecondary,
                },
              },
            }}
          />
        )}

        {/* Add Button */}
        {onAddRow && (
          <Tooltip title="Add row">
            <IconButton
              size="small"
              onClick={onAddRow}
              sx={{
                borderRadius: '8px',
                border: `1px solid ${colors.borderColor}`,
                '&:hover': { 
                  backgroundColor: colors.hover,
                  borderColor: colors.textSecondary,
                },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 24, alignSelf: 'center' }} />

        {/* Column Visibility */}
        {showColumnSelector && (
          <GridToolbarColumnsButton 
            slotProps={{
              button: {
                size: 'small',
                style: { 
                  borderRadius: '8px',
                  minWidth: 'auto',
                  paddingLeft: 8,
                  paddingRight: 8,
                },
              },
            }}
          />
        )}

        {/* Filter */}
        {showFilterButton && (
          <GridToolbarFilterButton 
            slotProps={{
              button: {
                size: 'small',
                style: { 
                  borderRadius: '8px',
                  minWidth: 'auto',
                  paddingLeft: 8,
                  paddingRight: 8,
                },
              },
            }}
          />
        )}

        {/* Density Selector */}
        {showDensitySelector && (
          <GridToolbarDensitySelector 
            slotProps={{
              button: {
                size: 'small',
                style: { 
                  borderRadius: '8px',
                  minWidth: 'auto',
                  paddingLeft: 8,
                  paddingRight: 8,
                },
              },
            }}
          />
        )}

        {/* Export */}
        {showExport && onExport && (
          <>
            <Tooltip title="Export">
              <IconButton
                size="small"
                onClick={handleExportClick}
                sx={{
                  borderRadius: '8px',
                  '&:hover': { backgroundColor: colors.hover },
                }}
              >
                <FileDownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={exportAnchor}
              open={Boolean(exportAnchor)}
              onClose={handleExportClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              slotProps={{
                paper: {
                  sx: { borderRadius: '8px', minWidth: 160 },
                },
              }}
            >
              <MenuItem onClick={() => handleExport('csv')}>
                <ListItemText>Export as CSV</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleExport('json')}>
                <ListItemText>Export as JSON</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleExport('clipboard')}>
                <ListItemText>Copy to clipboard</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}

        {/* Refresh */}
        {showRefresh && onRefresh && (
          <Tooltip title="Refresh">
            <IconButton
              size="small"
              onClick={onRefresh}
              sx={{
                borderRadius: '8px',
                '&:hover': { backgroundColor: colors.hover },
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Toolbar>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const DataTable = <R extends GridValidRowModel>({
  // Core props
  rows,
  columns,
  loading = false,
  getRowId,

  // Density
  density: initialDensity = 'standard',
  allowDensityChange = true,

  // Selection
  selection,

  // Pagination
  pagination = { enabled: true, pageSize: 25 },

  // Sorting & Filtering
  sorting = { enabled: true },
  filtering = { enabled: true },

  // Editing
  editing,

  // Tree Data
  treeData,

  // Row Grouping
  rowGrouping: _rowGrouping,

  // Inline Add
  inlineAdd,

  // Column Pinning
  columnPinning,

  // Row Reordering
  rowReorder: _rowReorder,

  // Actions
  rowActions,
  rowActionsConfig,
  bulkActions,

  // Toolbar
  toolbar = {
    show: true,
    showSearch: true,
    showDensitySelector: true,
    showColumnVisibility: true,
    showExport: true,
    showFilter: true,
    showRefresh: true,
  },

  // Appearance
  title,
  subtitle,
  height = 500,
  maxHeight,
  minHeight = 300,
  stickyHeader: _stickyHeader = true,
  stripedRows = false,
  showBorders = true,
  elevation = 0,
  borderRadius = '12px',

  // Callbacks
  onRowClick,
  onRowDoubleClick,
  onCellClick,
  onSelectionChange,
  onSortChange,
  onFilterChange,
  onPageChange,
  onRowUpdate,
  onRowAdd,
  onRowDelete: _onRowDelete,
  onRefresh,
  onExport,

  // Styling
  sx,
  className,
  getRowClassName,
  getCellClassName,

  // Slot overrides
  slots,
  slotProps,
}: DataTableProps<R>) => {
  const theme = useTheme();
  const mode = theme.palette.mode as 'light' | 'dark';
  const colors = tableColors[mode];
  const apiRef = useGridApiRef();

  // State
  const [density, _setDensity] = useState<TableDensity>(initialDensity);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({ 
    type: 'include', 
    ids: new Set() 
  });
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: pagination.defaultPage || 0,
    pageSize: pagination.pageSize || 25,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>(
    sorting.defaultSort ? [sorting.defaultSort] : []
  );
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: filtering.defaultFilters || [],
  });
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [hoveredRowId, setHoveredRowId] = useState<GridRowId | null>(null);

  const densityTokensValue = densityTokens[density];

  // Determine the actions to use (prefer rowActionsConfig over rowActions)
  const effectiveRowActions = rowActionsConfig?.actions || rowActions || [];
  const rowActionsMode = rowActionsConfig?.mode || 'menu';

  // Process columns - add actions column if needed
  const processedColumns = useMemo((): GridColDef[] => {
    const cols = [...columns] as GridColDef[];
    
    // Add row actions column if actions are configured
    if (effectiveRowActions.length > 0) {
      const actionsColumn: GridColDef = {
        field: '__actions__',
        headerName: '',
        width: rowActionsConfig?.width || (rowActionsMode === 'hover' ? 180 : 60),
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => {
          const rowId = getRowId ? getRowId(params.row) : params.row.id;
          const isHovered = String(hoveredRowId) === String(rowId);
          
          if (rowActionsMode === 'hover') {
            // Gmail-style hover actions
            return (
              <HoverActionsCell
                row={params.row}
                actions={effectiveRowActions}
                isHovered={isHovered}
              />
            );
          } else {
            // Menu or always visible
            return (
              <ActionsCell
                row={params.row}
                actions={effectiveRowActions}
                maxInline={rowActionsConfig?.maxInline || 2}
              />
            );
          }
        },
      };
      cols.push(actionsColumn);
    }
    
    return cols;
  }, [columns, effectiveRowActions, rowActionsMode, rowActionsConfig, hoveredRowId, getRowId]);

  // Column pinning model
  const _pinnedColumns = useMemo(() => {
    if (!columnPinning?.enabled) return undefined;
    return {
      left: columnPinning.left || [],
      right: columnPinning.right || (effectiveRowActions.length > 0 && rowActionsConfig?.pinned ? ['__actions__'] : []),
    };
  }, [columnPinning, effectiveRowActions.length, rowActionsConfig?.pinned]);

  // Filter rows by search text
  const filteredRows = useMemo(() => {
    if (!searchText.trim()) return rows;

    const searchLower = searchText.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          String(value).toLowerCase().includes(searchLower)
      )
    );
  }, [rows, searchText]);

  // Handlers
  const handleSelectionChange = useCallback(
    (newSelection: GridRowSelectionModel) => {
      setSelectionModel(newSelection);
      onSelectionChange?.(Array.from(newSelection.ids));
    },
    [onSelectionChange]
  );

  const handleClearSelection = useCallback(() => {
    setSelectionModel({ type: 'include', ids: new Set() });
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  const handleSortChange = useCallback(
    (model: GridSortModel) => {
      setSortModel(model);
      if (model.length > 0) {
        onSortChange?.(model[0].field, model[0].sort || 'asc');
      }
    },
    [onSortChange]
  );

  const handleFilterChange = useCallback(
    (model: GridFilterModel) => {
      setFilterModel(model);
      onFilterChange?.(model);
    },
    [onFilterChange]
  );

  const handlePaginationChange = useCallback(
    (model: GridPaginationModel) => {
      setPaginationModel(model);
      onPageChange?.(model.page, model.pageSize);
    },
    [onPageChange]
  );

  const handleRowEditStop: GridEventListener<'rowEditStop'> = useCallback((params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  }, []);

  const handleProcessRowUpdate = useCallback(
    async (newRow: R, oldRow: R) => {
      if (onRowUpdate) {
        return await onRowUpdate(newRow, oldRow);
      }
      return newRow;
    },
    [onRowUpdate]
  );

  const handleAddRow = useCallback(
    (newRow: Partial<R>) => {
      onRowAdd?.(newRow);
      setIsAddingRow(false);
    },
    [onRowAdd]
  );

  const handleBulkAction = useCallback(
    (action: BulkAction<R>) => {
      const selectedRows = rows.filter((row) => {
        const rowId = getRowId ? getRowId(row) : (row as unknown as { id: GridRowId }).id;
        return selectionModel.ids.has(rowId);
      });
      action.onClick(selectedRows);
    },
    [rows, selectionModel, getRowId]
  );

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleExport = useCallback(
    (format: 'csv' | 'json' | 'clipboard') => {
      if (onExport) {
        onExport(format as 'csv' | 'excel' | 'pdf');
      } else if (apiRef.current) {
        if (format === 'csv') {
          apiRef.current.exportDataAsCsv();
        } else if (format === 'json') {
          const data = apiRef.current.getRowModels();
          const jsonData = JSON.stringify(Array.from(data.values()), null, 2);
          const blob = new Blob([jsonData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${title || 'data'}.json`;
          link.click();
          URL.revokeObjectURL(url);
        } else if (format === 'clipboard') {
          const data = apiRef.current.getRowModels();
          const text = Array.from(data.values())
            .map((row) => Object.values(row).join('\t'))
            .join('\n');
          navigator.clipboard.writeText(text);
        }
      }
    },
    [onExport, apiRef, title]
  );

  // Tree data configuration
  const treeDataProps = useMemo(() => {
    if (!treeData?.enabled) return {};

    return {
      treeData: true,
      getTreeDataPath: (row: R) => {
        if (treeData.getTreeDataPath) {
          return treeData.getTreeDataPath(row);
        }
        const treeRow = row as unknown as TreeDataRow;
        return treeRow.hierarchy || [String((row as unknown as { id: GridRowId }).id)];
      },
      groupingColDef: {
        headerName: treeData.groupingColumnLabel || 'Group',
        width: treeData.groupingColumnWidth || 200,
      },
      defaultGroupingExpansionDepth: treeData.defaultExpanded ? -1 : 0,
    };
  }, [treeData]);

  // Row class names for striping
  const getRowClassNameFn = useCallback(
    (params: GridRowParams) => {
      const classes: string[] = [];

      if (stripedRows) {
        const rowIndex = filteredRows.findIndex(r => {
          const rowId = getRowId ? getRowId(r) : (r as unknown as { id: GridRowId }).id;
          return rowId === params.id;
        });
        if (rowIndex % 2 === 1) {
          classes.push('striped-row');
        }
      }

      if (getRowClassName) {
        const customClass = getRowClassName(params.row as R);
        if (customClass) classes.push(customClass);
      }

      return classes.join(' ');
    },
    [stripedRows, getRowClassName, filteredRows, getRowId]
  );

  // Custom Toolbar Wrapper
  const ToolbarWrapper = useCallback(
    () => (
      <DataTableToolbar<R>
        title={title}
        subtitle={subtitle}
        searchValue={searchText}
        onSearchChange={handleSearch}
        showSearch={toolbar.showSearch}
        selectedCount={selectionModel.ids.size}
        totalCount={filteredRows.length}
        bulkActions={bulkActions}
        onBulkAction={handleBulkAction}
        onClearSelection={handleClearSelection}
        onAddRow={inlineAdd?.enabled ? () => setIsAddingRow(true) : undefined}
        onRefresh={onRefresh}
        onExport={toolbar.showExport ? handleExport : undefined}
        showExport={toolbar.showExport}
        showRefresh={toolbar.showRefresh}
        showColumnSelector={toolbar.showColumnVisibility}
        showFilterButton={toolbar.showFilter}
        showDensitySelector={toolbar.showDensitySelector && allowDensityChange}
        colors={colors}
      />
    ),
    [
      title, subtitle, searchText, handleSearch, toolbar, selectionModel.ids.size,
      filteredRows.length, bulkActions, handleBulkAction, handleClearSelection,
      inlineAdd?.enabled, onRefresh, handleExport, allowDensityChange, colors,
    ]
  );

  // Render loading state
  if (loading) {
    return (
      <Paper
        elevation={elevation}
        sx={{
          width: '100%',
          height: typeof height === 'number' ? height : height,
          borderRadius,
          overflow: 'hidden',
          border: showBorders ? `1px solid ${colors.borderColor}` : 'none',
          backgroundColor: colors.background,
          ...sx,
        }}
        className={className}
      >
        {toolbar.show && (
          <Toolbar
            sx={{
              pl: 2,
              pr: 1.5,
              py: 1.5,
              borderBottom: `1px solid ${colors.borderColor}`,
              minHeight: 'auto !important',
              gap: 2,
            }}
          >
            <Skeleton width={120} height={24} sx={{ borderRadius: '4px' }} />
            <Box sx={{ flex: 1 }} />
            <Skeleton width={180} height={36} sx={{ borderRadius: '8px' }} />
            <Skeleton width={32} height={32} sx={{ borderRadius: '8px' }} />
            <Skeleton width={32} height={32} sx={{ borderRadius: '8px' }} />
          </Toolbar>
        )}
        <LoadingSkeleton
          columns={Math.min(columns.length, 5)}
          rows={Math.floor((height as number - 120) / densityTokensValue.rowHeight)}
          density={density}
          showCheckbox={selection?.enabled}
          colors={colors}
        />
      </Paper>
    );
  }

  return (
    <Box sx={{ width: '100%', ...sx }} className={className}>
      <Paper
        elevation={elevation}
        sx={{
          width: '100%',
          height: typeof height === 'number' ? height : height,
          maxHeight,
          minHeight,
          borderRadius,
          overflow: 'hidden',
          border: showBorders ? `1px solid ${colors.borderColor}` : 'none',
          backgroundColor: colors.background,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* DataGrid with integrated toolbar */}
        <DataGrid
          apiRef={apiRef}
          rows={filteredRows}
          columns={processedColumns}
          loading={false}
          getRowId={getRowId}
          density={densityMap[density]}
          // Selection
          checkboxSelection={selection?.enabled}
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={handleSelectionChange}
          disableRowSelectionOnClick={!selection?.selectOnClick}
          // Pagination
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationChange}
          pageSizeOptions={pagination.pageSizeOptions || [10, 25, 50, 100]}
          // Sorting
          sortingMode={sorting.serverSide ? 'server' : 'client'}
          sortModel={sortModel}
          onSortModelChange={handleSortChange}
          disableColumnSorting={!sorting.enabled}
          // Filtering
          filterMode={filtering.serverSide ? 'server' : 'client'}
          filterModel={filterModel}
          onFilterModelChange={handleFilterChange}
          disableColumnFilter={!filtering.enabled}
          // Editing
          editMode={editing?.mode || 'cell'}
          rowModesModel={rowModesModel}
          onRowModesModelChange={setRowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={handleProcessRowUpdate}
          // Tree Data
          {...treeDataProps}
          // Column Pinning - Note: pinnedColumns requires DataGridPro
          // pinnedColumns={pinnedColumns}
          // Appearance
          disableColumnMenu={false}
          columnHeaderHeight={densityTokensValue.headerHeight}
          rowHeight={densityTokensValue.rowHeight}
          // Callbacks
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          onCellClick={onCellClick}
          // Styling
          getRowClassName={getRowClassNameFn}
          getCellClassName={getCellClassName}
          // Slots
          slots={{
            toolbar: toolbar.show ? ToolbarWrapper : undefined,
            ...slots,
          }}
          slotProps={{
            ...slotProps,
            row: {
              ...slotProps?.row,
              onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => {
                const rowId = event.currentTarget.getAttribute('data-id');
                if (rowId) setHoveredRowId(rowId);
                // Call user's handler if provided
                const rowProps = slotProps?.row as { onMouseEnter?: (e: React.MouseEvent) => void } | undefined;
                rowProps?.onMouseEnter?.(event);
              },
              onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => {
                setHoveredRowId(null);
                // Call user's handler if provided
                const rowProps = slotProps?.row as { onMouseLeave?: (e: React.MouseEvent) => void } | undefined;
                rowProps?.onMouseLeave?.(event);
              },
            },
          }}
          // Styling overrides
          sx={{
            border: 'none',
            borderRadius: 0, // DataGrid itself should have no border radius (Paper handles it)
            fontFamily: tableTypography.fontFamily,
            flex: 1,
            
            // MUI X DataGrid v8 CSS Variables - these control the theme
            '--DataGrid-t-header-background-base': colors.headerBg,
            '--DataGrid-t-color-border-base': colors.headerBorder || colors.borderColor,
            '--DataGrid-t-color-background-base': colors.background,
            '--DataGrid-t-color-foreground-base': colors.text,
            '--DataGrid-t-color-foreground-muted': colors.textSecondary,
            '--DataGrid-t-cell-background-pinned': colors.background,
            '--DataGrid-t-radius-base': '0px', // No internal border radius

            // Header styles - with !important to override CSS variables
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: `${colors.headerBg} !important`,
              borderBottom: `2px solid ${colors.headerBorder} !important`,
              borderRadius: '0 !important', // Remove any internal border radius
            },
            '& .MuiDataGrid-columnHeader': {
              fontWeight: tableTypography.headerWeight,
              fontSize: densityTokensValue.fontSize,
              color: `${colors.headerText} !important`,
              backgroundColor: `${colors.headerBg} !important`,
              borderRadius: '0 !important', // No rounded corners on header cells
              '&:focus, &:focus-within': {
                outline: 'none',
              },
              // Remove rounded corners from first and last header cells
              '&:first-of-type': {
                borderTopLeftRadius: '0 !important',
                borderBottomLeftRadius: '0 !important',
              },
              '&:last-of-type': {
                borderTopRightRadius: '0 !important',
                borderBottomRightRadius: '0 !important',
              },
            },
            // Target the row containing headers
            '& .MuiDataGrid-columnHeaderRow': {
              backgroundColor: `${colors.headerBg} !important`,
              borderRadius: 0,
            },
            // Target the scrollable header container
            '& .MuiDataGrid-scrollableHeaders': {
              borderRadius: 0,
            },
            // Main container to clip properly
            '& .MuiDataGrid-main': {
              borderRadius: 0,
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: tableTypography.headerWeight,
            },
            '& .MuiDataGrid-columnSeparator': {
              color: colors.borderColor,
              opacity: 0.5,
            },

            // Cell styles
            '& .MuiDataGrid-cell': {
              fontSize: densityTokensValue.fontSize,
              borderBottom: `1px solid ${colors.borderColor}`,
              color: colors.text,
              display: 'flex',
              alignItems: 'center',
              '&:focus, &:focus-within': {
                outline: 'none',
              },
            },

            // Row styles
            '& .MuiDataGrid-row': {
              transition: tableAnimation.hover,
              '&:hover': {
                backgroundColor: colors.hover,
              },
              '&.Mui-selected': {
                backgroundColor: colors.selected,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                },
              },
            },
            '& .MuiDataGrid-row.striped-row': {
              backgroundColor: colors.alternateRow,
              '&:hover': {
                backgroundColor: colors.hover,
              },
            },

            // Footer styles
            '& .MuiDataGrid-footerContainer': {
              borderTop: `1px solid ${colors.borderColor}`,
              backgroundColor: colors.background,
              minHeight: 48,
            },
            '& .MuiTablePagination-root': {
              color: colors.text,
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '0.8125rem',
              color: colors.textSecondary,
            },

            // Checkbox styles
            '& .MuiCheckbox-root': {
              color: colors.textSecondary,
              padding: '6px',
              '&.Mui-checked': {
                color: 'primary.main',
              },
            },

            // Empty/loading overlay
            '& .MuiDataGrid-overlay': {
              backgroundColor: 'transparent',
            },

            // Virtual scroller
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.background,
            },

            // Toolbar container
            '& .MuiDataGrid-toolbarContainer': {
              padding: 0,
            },

            // Scrollbar styling
            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
              width: 8,
              height: 8,
            },
            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
              backgroundColor: colors.borderColor,
              borderRadius: 4,
              '&:hover': {
                backgroundColor: colors.textSecondary,
              },
            },
          }}
        />

        {/* Inline Add Row */}
        {inlineAdd?.enabled && (
          <InlineAddRow
            columns={processedColumns}
            config={inlineAdd}
            density={density}
            onAdd={handleAddRow}
            onCancel={() => setIsAddingRow(false)}
            isActive={isAddingRow}
            onActivate={() => setIsAddingRow(true)}
            mode={mode}
          />
        )}
      </Paper>
    </Box>
  );
};

export default DataTable;
