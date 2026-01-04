import * as React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  KeyboardDoubleArrowRight as DoubleRightIcon,
  KeyboardDoubleArrowLeft as DoubleLeftIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

// ============================================
// Types
// ============================================

export interface TransferListItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Secondary text */
  secondary?: string;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Custom data */
  data?: Record<string, unknown>;
}

export interface TransferListProps {
  /** Items in the left (available) list */
  leftItems: TransferListItem[];
  /** Items in the right (selected) list */
  rightItems: TransferListItem[];
  /** Title for left list */
  leftTitle?: string;
  /** Title for right list */
  rightTitle?: string;
  /** Enable search filtering */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Height of the lists */
  height?: number | string;
  /** Callback when items are transferred */
  onChange?: (leftItems: TransferListItem[], rightItems: TransferListItem[]) => void;
  /** Custom render function for items */
  renderItem?: (item: TransferListItem, selected: boolean) => React.ReactNode;
  /** Show "move all" buttons */
  showMoveAll?: boolean;
  /** Disable the entire component */
  disabled?: boolean;
  /** Dense mode */
  dense?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  sx?: Record<string, unknown>;
}

// ============================================
// Helper Components
// ============================================

interface TransferListPanelProps {
  title: string;
  items: TransferListItem[];
  checked: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  searchable: boolean;
  searchPlaceholder: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  renderItem?: (item: TransferListItem, selected: boolean) => React.ReactNode;
  disabled: boolean;
  dense: boolean;
  height: number | string;
}

const TransferListPanel: React.FC<TransferListPanelProps> = ({
  title,
  items,
  checked,
  onToggle,
  onToggleAll,
  searchable,
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  renderItem,
  disabled,
  dense,
  height,
}) => {
  const theme = useTheme();

  const filteredItems = React.useMemo(() => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.secondary?.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  const numChecked = Array.from(checked).filter((id) =>
    items.some((item) => item.id === id)
  ).length;
  const allChecked = numChecked === items.length && items.length > 0;
  const someChecked = numChecked > 0 && numChecked < items.length;

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 200,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        }}
      >
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onChange={onToggleAll}
          disabled={disabled || items.length === 0}
          size="small"
        />
        <Box sx={{ flex: 1, ml: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {numChecked}/{items.length} selected
          </Typography>
        </Box>
      </Box>

      {/* Search */}
      {searchable && (
        <Box sx={{ px: 1.5, py: 1 }}>
          <TextField
            size="small"
            fullWidth
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={disabled}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => onSearchChange('')}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {/* List */}
      <List
        sx={{
          flex: 1,
          overflow: 'auto',
          height: height,
          minHeight: 200,
        }}
        dense={dense}
      >
        {filteredItems.map((item) => {
          const isChecked = checked.has(item.id);
          const isDisabled = disabled || item.disabled;

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => onToggle(item.id)}
                disabled={isDisabled}
                sx={{ py: dense ? 0.5 : 1 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Checkbox
                    checked={isChecked}
                    tabIndex={-1}
                    disableRipple
                    disabled={isDisabled}
                    size="small"
                  />
                </ListItemIcon>
                {renderItem ? (
                  renderItem(item, isChecked)
                ) : (
                  <ListItemText
                    primary={item.label}
                    secondary={item.secondary}
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}

        {filteredItems.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: 100,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {searchQuery ? 'No matches found' : 'No items'}
            </Typography>
          </Box>
        )}
      </List>
    </Paper>
  );
};

// ============================================
// TransferList Component
// ============================================

export const TransferList: React.FC<TransferListProps> = ({
  leftItems: initialLeftItems,
  rightItems: initialRightItems,
  leftTitle = 'Available',
  rightTitle = 'Selected',
  searchable = false,
  searchPlaceholder = 'Search...',
  height = 300,
  onChange,
  renderItem,
  showMoveAll = true,
  disabled = false,
  dense = false,
  className,
  sx,
}) => {
  const [leftItems, setLeftItems] = React.useState(initialLeftItems);
  const [rightItems, setRightItems] = React.useState(initialRightItems);
  const [leftChecked, setLeftChecked] = React.useState<Set<string>>(new Set());
  const [rightChecked, setRightChecked] = React.useState<Set<string>>(new Set());
  const [leftSearch, setLeftSearch] = React.useState('');
  const [rightSearch, setRightSearch] = React.useState('');

  // Sync with props when they change
  React.useEffect(() => {
    setLeftItems(initialLeftItems);
  }, [initialLeftItems]);

  React.useEffect(() => {
    setRightItems(initialRightItems);
  }, [initialRightItems]);

  const handleToggleLeft = (id: string) => {
    const newChecked = new Set(leftChecked);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setLeftChecked(newChecked);
  };

  const handleToggleRight = (id: string) => {
    const newChecked = new Set(rightChecked);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setRightChecked(newChecked);
  };

  const handleToggleAllLeft = () => {
    if (leftChecked.size === leftItems.length) {
      setLeftChecked(new Set());
    } else {
      setLeftChecked(new Set(leftItems.filter((i) => !i.disabled).map((i) => i.id)));
    }
  };

  const handleToggleAllRight = () => {
    if (rightChecked.size === rightItems.length) {
      setRightChecked(new Set());
    } else {
      setRightChecked(new Set(rightItems.filter((i) => !i.disabled).map((i) => i.id)));
    }
  };

  const moveToRight = (ids: string[]) => {
    const itemsToMove = leftItems.filter((item) => ids.includes(item.id));
    const newLeftItems = leftItems.filter((item) => !ids.includes(item.id));
    const newRightItems = [...rightItems, ...itemsToMove];

    setLeftItems(newLeftItems);
    setRightItems(newRightItems);
    setLeftChecked(new Set());
    onChange?.(newLeftItems, newRightItems);
  };

  const moveToLeft = (ids: string[]) => {
    const itemsToMove = rightItems.filter((item) => ids.includes(item.id));
    const newRightItems = rightItems.filter((item) => !ids.includes(item.id));
    const newLeftItems = [...leftItems, ...itemsToMove];

    setLeftItems(newLeftItems);
    setRightItems(newRightItems);
    setRightChecked(new Set());
    onChange?.(newLeftItems, newRightItems);
  };

  const handleMoveCheckedRight = () => {
    moveToRight(Array.from(leftChecked));
  };

  const handleMoveCheckedLeft = () => {
    moveToLeft(Array.from(rightChecked));
  };

  const handleMoveAllRight = () => {
    moveToRight(leftItems.filter((i) => !i.disabled).map((i) => i.id));
  };

  const handleMoveAllLeft = () => {
    moveToLeft(rightItems.filter((i) => !i.disabled).map((i) => i.id));
  };

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        gap: 2,
        ...sx,
      }}
    >
      {/* Left Panel */}
      <TransferListPanel
        title={leftTitle}
        items={leftItems}
        checked={leftChecked}
        onToggle={handleToggleLeft}
        onToggleAll={handleToggleAllLeft}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        searchQuery={leftSearch}
        onSearchChange={setLeftSearch}
        renderItem={renderItem}
        disabled={disabled}
        dense={dense}
        height={height}
      />

      {/* Transfer Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {showMoveAll && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleMoveAllRight}
            disabled={disabled || leftItems.length === 0}
            sx={{ minWidth: 40 }}
          >
            <DoubleRightIcon />
          </Button>
        )}

        <Button
          variant="outlined"
          size="small"
          onClick={handleMoveCheckedRight}
          disabled={disabled || leftChecked.size === 0}
          sx={{ minWidth: 40 }}
        >
          <ChevronRightIcon />
        </Button>

        <Divider sx={{ my: 1 }} />

        <Button
          variant="outlined"
          size="small"
          onClick={handleMoveCheckedLeft}
          disabled={disabled || rightChecked.size === 0}
          sx={{ minWidth: 40 }}
        >
          <ChevronLeftIcon />
        </Button>

        {showMoveAll && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleMoveAllLeft}
            disabled={disabled || rightItems.length === 0}
            sx={{ minWidth: 40 }}
          >
            <DoubleLeftIcon />
          </Button>
        )}
      </Box>

      {/* Right Panel */}
      <TransferListPanel
        title={rightTitle}
        items={rightItems}
        checked={rightChecked}
        onToggle={handleToggleRight}
        onToggleAll={handleToggleAllRight}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        searchQuery={rightSearch}
        onSearchChange={setRightSearch}
        renderItem={renderItem}
        disabled={disabled}
        dense={dense}
        height={height}
      />
    </Box>
  );
};

export default TransferList;
