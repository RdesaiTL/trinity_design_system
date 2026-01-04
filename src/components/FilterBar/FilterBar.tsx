/**
 * @fileoverview FilterBar component with composable filters, chips, and presets
 * @module components/FilterBar
 */

import * as React from 'react';
import {
  Box,
  Chip,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Popover,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemButton,
  List,
  useTheme,
  alpha,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
  Add as AddIcon,
  BookmarkBorder as PresetIcon,
  ExpandMore as ExpandIcon,
  Check as CheckIcon,
  Refresh as ResetIcon,
} from '@mui/icons-material';
import { semanticTokens, baseTokens } from '../../tokens';

export type FilterType = 'select' | 'multiselect' | 'text' | 'date' | 'daterange' | 'number';

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface FilterConfig {
  /** Unique filter key */
  id: string;
  /** Display label */
  label: string;
  /** Filter type */
  type: FilterType;
  /** Options for select/multiselect */
  options?: FilterOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Icon for the filter */
  icon?: React.ReactNode;
  /** Default value */
  defaultValue?: FilterValue;
}

export type FilterValue = string | string[] | number | { from: string; to: string } | null;

export interface FilterPreset {
  id: string;
  label: string;
  filters: Record<string, FilterValue>;
  icon?: React.ReactNode;
}

export interface FilterBarProps {
  /** Available filter configurations */
  filters: FilterConfig[];
  /** Current filter values */
  values?: Record<string, FilterValue>;
  /** Callback when filters change */
  onChange?: (values: Record<string, FilterValue>) => void;
  /** Saved presets */
  presets?: FilterPreset[];
  /** Callback when preset is selected */
  onPresetSelect?: (preset: FilterPreset) => void;
  /** Callback to save current filters as preset */
  onSavePreset?: (filters: Record<string, FilterValue>) => void;
  /** Show quick filter chips */
  showQuickFilters?: boolean;
  /** Quick filter IDs to show as chips */
  quickFilterIds?: string[];
  /** Compact mode */
  compact?: boolean;
  /** Show active filter count badge */
  showBadge?: boolean;
  /** Max visible filter chips before collapsing */
  maxVisibleChips?: number;
  /** Disabled state */
  disabled?: boolean;
}

const FilterChip: React.FC<{
  filter: FilterConfig;
  value: FilterValue;
  onRemove: () => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}> = ({ filter, value, onRemove, onClick }) => {
  const getDisplayValue = (): string => {
    if (value === null || value === undefined) return '';
    
    if (Array.isArray(value)) {
      if (value.length === 0) return '';
      if (value.length === 1) {
        const opt = filter.options?.find(o => o.value === value[0]);
        return opt?.label || value[0];
      }
      return `${value.length} selected`;
    }
    
    if (typeof value === 'object' && 'from' in value) {
      return `${value.from} - ${value.to}`;
    }
    
    if (filter.options) {
      const opt = filter.options.find(o => o.value === value);
      return opt?.label || String(value);
    }
    
    return String(value);
  };

  const displayValue = getDisplayValue();
  if (!displayValue) return null;

  return (
    <Chip
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {filter.label}:
          </Typography>
          <Typography variant="caption" fontWeight={600}>
            {displayValue}
          </Typography>
        </Box>
      }
      onClick={onClick}
      onDelete={onRemove}
      deleteIcon={<CloseIcon sx={{ fontSize: 16 }} />}
      sx={{
        height: 28,
        borderRadius: semanticTokens.borders.radius.badge,
        '& .MuiChip-label': {
          px: 1,
        },
      }}
    />
  );
};

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  values: controlledValues,
  onChange,
  presets = [],
  onPresetSelect,
  onSavePreset,
  showQuickFilters = true,
  quickFilterIds,
  compact = false,
  showBadge = true,
  maxVisibleChips = 5,
  disabled = false,
}) => {
  const theme = useTheme();
  const [values, setValues] = React.useState<Record<string, FilterValue>>({});
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [presetAnchor, setPresetAnchor] = React.useState<null | HTMLElement>(null);
  const [activeFilter, setActiveFilter] = React.useState<FilterConfig | null>(null);
  const [filterAnchor, setFilterAnchor] = React.useState<null | HTMLElement>(null);

  const currentValues = controlledValues !== undefined ? controlledValues : values;

  const activeFilters = React.useMemo(() => {
    return Object.entries(currentValues).filter(([, v]) => {
      if (v === null || v === undefined) return false;
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === 'string') return v.length > 0;
      return true;
    });
  }, [currentValues]);

  const quickFilters = React.useMemo(() => {
    if (!showQuickFilters) return [];
    const ids = quickFilterIds || filters.slice(0, 3).map(f => f.id);
    return filters.filter(f => ids.includes(f.id));
  }, [filters, quickFilterIds, showQuickFilters]);

  const updateValue = (filterId: string, value: FilterValue) => {
    const newValues = { ...currentValues, [filterId]: value };
    if (controlledValues === undefined) {
      setValues(newValues);
    }
    onChange?.(newValues);
  };

  const removeFilter = (filterId: string) => {
    const newValues = { ...currentValues };
    delete newValues[filterId];
    if (controlledValues === undefined) {
      setValues(newValues);
    }
    onChange?.(newValues);
  };

  const clearAll = () => {
    if (controlledValues === undefined) {
      setValues({});
    }
    onChange?.({});
  };

  const handleFilterClick = (filter: FilterConfig) => (event: React.MouseEvent<HTMLElement>) => {
    setActiveFilter(filter);
    setFilterAnchor(event.currentTarget);
    setMenuAnchor(null);
  };

  const handlePresetClick = (preset: FilterPreset) => {
    if (controlledValues === undefined) {
      setValues(preset.filters);
    }
    onChange?.(preset.filters);
    onPresetSelect?.(preset);
    setPresetAnchor(null);
  };

  const renderFilterPopover = () => {
    if (!activeFilter) return null;

    const currentValue = currentValues[activeFilter.id];

    const handleChange = (newValue: FilterValue) => {
      updateValue(activeFilter.id, newValue);
    };

    return (
      <Popover
        open={Boolean(filterAnchor)}
        anchorEl={filterAnchor}
        onClose={() => {
          setFilterAnchor(null);
          setActiveFilter(null);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              minWidth: 240,
              borderRadius: semanticTokens.borders.radius.menu,
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            {activeFilter.label}
          </Typography>

          {activeFilter.type === 'select' && activeFilter.options && (
            <FormControl fullWidth size="small">
              <Select
                value={currentValue || ''}
                onChange={(e) => handleChange(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {activeFilter.options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.icon && (
                      <ListItemIcon sx={{ minWidth: 28 }}>{opt.icon}</ListItemIcon>
                    )}
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {activeFilter.type === 'multiselect' && activeFilter.options && (
            <List dense disablePadding sx={{ maxHeight: 200, overflow: 'auto' }}>
              {activeFilter.options.map((opt) => {
                const selected = Array.isArray(currentValue) && currentValue.includes(opt.value);
                return (
                  <ListItemButton
                    key={opt.value}
                    onClick={() => {
                      const current = Array.isArray(currentValue) ? currentValue : [];
                      const newValue = selected
                        ? current.filter((v) => v !== opt.value)
                        : [...current, opt.value];
                      handleChange(newValue);
                    }}
                    sx={{ borderRadius: 1 }}
                  >
                    <Checkbox checked={selected} size="small" sx={{ p: 0, mr: 1 }} />
                    {opt.icon && (
                      <ListItemIcon sx={{ minWidth: 28 }}>{opt.icon}</ListItemIcon>
                    )}
                    <ListItemText primary={opt.label} />
                  </ListItemButton>
                );
              })}
            </List>
          )}

          {activeFilter.type === 'text' && (
            <TextField
              fullWidth
              size="small"
              placeholder={activeFilter.placeholder}
              value={currentValue || ''}
              onChange={(e) => handleChange(e.target.value)}
              autoFocus
            />
          )}

          {activeFilter.type === 'number' && (
            <TextField
              fullWidth
              size="small"
              type="number"
              placeholder={activeFilter.placeholder}
              value={currentValue || ''}
              onChange={(e) => handleChange(e.target.value ? Number(e.target.value) : null)}
              autoFocus
            />
          )}

          {activeFilter.type === 'date' && (
            <TextField
              fullWidth
              size="small"
              type="date"
              value={currentValue || ''}
              onChange={(e) => handleChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          )}

          {activeFilter.type === 'daterange' && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                type="date"
                label="From"
                value={typeof currentValue === 'object' && currentValue && 'from' in currentValue ? currentValue.from : ''}
                onChange={(e) =>
                  handleChange({
                    from: e.target.value,
                    to: typeof currentValue === 'object' && currentValue && 'to' in currentValue ? currentValue.to : '',
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                size="small"
                type="date"
                label="To"
                value={typeof currentValue === 'object' && currentValue && 'to' in currentValue ? currentValue.to : ''}
                onChange={(e) =>
                  handleChange({
                    from: typeof currentValue === 'object' && currentValue && 'from' in currentValue ? currentValue.from : '',
                    to: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <Button
              size="small"
              onClick={() => {
                removeFilter(activeFilter.id);
                setFilterAnchor(null);
                setActiveFilter(null);
              }}
            >
              Clear
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                setFilterAnchor(null);
                setActiveFilter(null);
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        flexWrap: 'wrap',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      {/* Filter Button */}
      <Badge
        badgeContent={showBadge ? activeFilters.length : 0}
        color="primary"
        invisible={activeFilters.length === 0}
      >
        <Button
          variant="outlined"
          size={compact ? 'small' : 'medium'}
          startIcon={<FilterIcon />}
          endIcon={<ExpandIcon />}
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          sx={{
            borderRadius: semanticTokens.borders.radius.button,
            textTransform: 'none',
          }}
        >
          Filters
        </Button>
      </Badge>

      {/* Quick Filters */}
      {showQuickFilters && quickFilters.map((filter) => {
        const hasValue = currentValues[filter.id] !== undefined && currentValues[filter.id] !== null;
        return (
          <Button
            key={filter.id}
            variant={hasValue ? 'contained' : 'outlined'}
            size={compact ? 'small' : 'medium'}
            onClick={handleFilterClick(filter)}
            endIcon={<ExpandIcon sx={{ fontSize: 18 }} />}
            sx={{
              borderRadius: semanticTokens.borders.radius.button,
              textTransform: 'none',
              ...(hasValue && {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                },
              }),
            }}
          >
            {filter.label}
          </Button>
        );
      })}

      {/* Active Filter Chips */}
      {activeFilters.slice(0, maxVisibleChips).map(([filterId, value]) => {
        const filter = filters.find((f) => f.id === filterId);
        if (!filter) return null;
        return (
          <FilterChip
            key={filterId}
            filter={filter}
            value={value}
            onRemove={() => removeFilter(filterId)}
            onClick={handleFilterClick(filter)}
          />
        );
      })}

      {/* Overflow indicator */}
      {activeFilters.length > maxVisibleChips && (
        <Chip
          label={`+${activeFilters.length - maxVisibleChips} more`}
          size="small"
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          sx={{ height: 28 }}
        />
      )}

      {/* Presets Button */}
      {presets.length > 0 && (
        <Tooltip title="Saved filters">
          <IconButton
            size="small"
            onClick={(e) => setPresetAnchor(e.currentTarget)}
            sx={{ ml: 'auto' }}
          >
            <PresetIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* Clear All */}
      {activeFilters.length > 0 && (
        <Tooltip title="Clear all filters">
          <IconButton size="small" onClick={clearAll}>
            <ResetIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* Filter Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              minWidth: 220,
              borderRadius: semanticTokens.borders.radius.menu,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            ADD FILTER
          </Typography>
        </Box>
        {filters.map((filter) => {
          const hasValue = currentValues[filter.id] !== undefined;
          return (
            <MenuItem
              key={filter.id}
              onClick={(e) => {
                handleFilterClick(filter)(e);
              }}
            >
              {filter.icon && <ListItemIcon>{filter.icon}</ListItemIcon>}
              <ListItemText>{filter.label}</ListItemText>
              {hasValue && <CheckIcon fontSize="small" color="primary" />}
            </MenuItem>
          );
        })}
        {activeFilters.length > 0 && [
          <Divider key="divider" />,
          <MenuItem key="clear" onClick={clearAll}>
            <ListItemIcon>
              <ResetIcon />
            </ListItemIcon>
            <ListItemText>Clear all filters</ListItemText>
          </MenuItem>,
        ]}
        {onSavePreset && activeFilters.length > 0 && (
          <MenuItem onClick={() => onSavePreset(currentValues)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>Save as preset</ListItemText>
          </MenuItem>
        )}
      </Menu>

      {/* Presets Menu */}
      <Menu
        anchorEl={presetAnchor}
        open={Boolean(presetAnchor)}
        onClose={() => setPresetAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              minWidth: 200,
              borderRadius: semanticTokens.borders.radius.menu,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            SAVED PRESETS
          </Typography>
        </Box>
        {presets.map((preset) => (
          <MenuItem key={preset.id} onClick={() => handlePresetClick(preset)}>
            {preset.icon && <ListItemIcon>{preset.icon}</ListItemIcon>}
            <ListItemText>{preset.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {/* Filter Popover */}
      {renderFilterPopover()}
    </Box>
  );
};
