/**
 * @fileoverview ListDetail Template - Master-detail split view
 * @module components/templates/ListDetail
 */

import * as React from 'react';
import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  InputBase,
  Divider,
  Skeleton,
  useTheme,
  useMediaQuery,
  Drawer,
  Chip,
  Badge,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  ArrowBack as BackIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { semanticTokens, baseTokens } from '../../../tokens';

export interface ListItem {
  /** Unique identifier */
  id: string;
  /** Primary text */
  title: string;
  /** Secondary text */
  subtitle?: string;
  /** Avatar URL */
  avatar?: string;
  /** Avatar initials */
  avatarInitials?: string;
  /** Additional info (e.g., timestamp) */
  meta?: string;
  /** Status indicator */
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Is unread/new */
  unread?: boolean;
  /** Badge content */
  badge?: string | number;
  /** Custom icon instead of avatar */
  icon?: React.ReactNode;
}

export interface ListDetailTemplateProps {
  /** List items */
  items: ListItem[];
  /** Currently selected item ID */
  selectedId?: string | null;
  /** Callback when item is selected */
  onSelect?: (item: ListItem) => void;
  /** Detail panel content */
  detailContent?: React.ReactNode;
  /** Placeholder when no item selected */
  emptyDetailContent?: React.ReactNode;
  /** Search value */
  searchValue?: string;
  /** Callback when search changes */
  onSearchChange?: (value: string) => void;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** List header content */
  listHeader?: React.ReactNode;
  /** Detail header content */
  detailHeader?: React.ReactNode;
  /** List actions (shown in header) */
  listActions?: React.ReactNode;
  /** Detail actions (shown in header) */
  detailActions?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Loading item count */
  loadingCount?: number;
  /** List width (px or %) */
  listWidth?: number | string;
  /** Min list width */
  minListWidth?: number;
  /** Max list width */
  maxListWidth?: number;
  /** Show search bar */
  showSearch?: boolean;
  /** Custom render function for list items */
  renderListItem?: (item: ListItem, selected: boolean) => React.ReactNode;
  /** Show filter button */
  showFilter?: boolean;
  /** Filter click handler */
  onFilterClick?: () => void;
  /** Active filter count */
  filterCount?: number;
  /** Empty list message */
  emptyListMessage?: string;
}

const DefaultListItem: React.FC<{
  item: ListItem;
  selected: boolean;
  onClick: () => void;
}> = ({ item, selected, onClick }) => {
  const theme = useTheme();

  const getStatusColor = () => {
    switch (item.status) {
      case 'success': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'error': return theme.palette.error.main;
      case 'info': return theme.palette.info.main;
      default: return theme.palette.primary.main;
    }
  };

  return (
    <ListItemButton
      selected={selected}
      onClick={onClick}
      sx={{
        px: 2,
        py: 1.5,
        borderLeft: selected ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
        backgroundColor: item.unread ? alpha(theme.palette.primary.main, 0.04) : 'transparent',
        '&.Mui-selected': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
      }}
    >
      <ListItemAvatar>
        <Badge
          overlap="circular"
          variant="dot"
          invisible={!item.unread}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {item.icon ? (
            <Avatar sx={{ bgcolor: alpha(getStatusColor(), 0.1), color: getStatusColor() }}>
              {item.icon}
            </Avatar>
          ) : (
            <Avatar src={item.avatar}>
              {item.avatarInitials}
            </Avatar>
          )}
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              fontWeight={item.unread ? 600 : 400}
              noWrap
              sx={{ flex: 1 }}
            >
              {item.title}
            </Typography>
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                sx={{
                  height: 18,
                  fontSize: baseTokens.fontSize.xs,
                  backgroundColor: getStatusColor(),
                  color: theme.palette.getContrastText(getStatusColor()),
                }}
              />
            )}
          </Box>
        }
        secondary={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.25 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{ flex: 1, pr: 1 }}
            >
              {item.subtitle}
            </Typography>
            {item.meta && (
              <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                {item.meta}
              </Typography>
            )}
          </Box>
        }
        primaryTypographyProps={{ component: 'div' }}
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItemButton>
  );
};

const ListSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <Box key={i} sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, gap: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="60%" height={20} />
          <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
        </Box>
      </Box>
    ))}
  </>
);

export const ListDetailTemplate: React.FC<ListDetailTemplateProps> = ({
  items,
  selectedId,
  onSelect,
  detailContent,
  emptyDetailContent,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  listHeader,
  detailHeader,
  listActions,
  detailActions,
  loading = false,
  loadingCount = 8,
  listWidth = 360,
  minListWidth = 280,
  maxListWidth = 480,
  showSearch = true,
  renderListItem,
  showFilter = false,
  onFilterClick,
  filterCount = 0,
  emptyListMessage = 'No items found',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileDetailOpen, setMobileDetailOpen] = React.useState(false);

  const selectedItem = items.find((item) => item.id === selectedId);

  const handleItemSelect = (item: ListItem) => {
    onSelect?.(item);
    if (isMobile) {
      setMobileDetailOpen(true);
    }
  };

  const handleBack = () => {
    setMobileDetailOpen(false);
  };

  // Filter items based on search
  const filteredItems = React.useMemo(() => {
    if (!searchValue) return items;
    const search = searchValue.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(search) ||
        item.subtitle?.toLowerCase().includes(search)
    );
  }, [items, searchValue]);

  const listPanel = (
    <Paper
      elevation={0}
      sx={{
        width: isMobile ? '100%' : listWidth,
        minWidth: isMobile ? '100%' : minListWidth,
        maxWidth: isMobile ? '100%' : maxListWidth,
        flexShrink: 0,
        borderRadius: isMobile ? 0 : semanticTokens.borders.radius.card,
        border: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* List Header */}
      {(listHeader || showSearch || listActions) && (
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          {listHeader}
          {showSearch && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: listHeader ? 2 : 0,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: semanticTokens.borders.radius.input,
                  px: 1.5,
                  py: 0.5,
                }}
              >
                <SearchIcon sx={{ color: theme.palette.text.secondary, fontSize: 20, mr: 1 }} />
                <InputBase
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder={searchPlaceholder}
                  fullWidth
                  sx={{ fontSize: baseTokens.fontSize.sm }}
                />
                {searchValue && (
                  <IconButton size="small" onClick={() => onSearchChange?.('')}>
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </Box>
              {showFilter && (
                <Badge badgeContent={filterCount} color="primary">
                  <IconButton onClick={onFilterClick} size="small">
                    <FilterIcon />
                  </IconButton>
                </Badge>
              )}
              {listActions}
            </Box>
          )}
        </Box>
      )}

      {/* List Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {loading ? (
          <ListSkeleton count={loadingCount} />
        ) : filteredItems.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {emptyListMessage}
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {filteredItems.map((item) => (
              <React.Fragment key={item.id}>
                {renderListItem ? (
                  renderListItem(item, selectedId === item.id)
                ) : (
                  <DefaultListItem
                    item={item}
                    selected={selectedId === item.id}
                    onClick={() => handleItemSelect(item)}
                  />
                )}
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );

  const detailPanel = (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 0,
        borderRadius: isMobile ? 0 : semanticTokens.borders.radius.card,
        border: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {selectedItem || detailContent ? (
        <>
          {/* Detail Header */}
          {(detailHeader || detailActions || isMobile) && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.5,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {isMobile && (
                  <IconButton edge="start" onClick={handleBack}>
                    <BackIcon />
                  </IconButton>
                )}
                {detailHeader}
              </Box>
              {detailActions}
            </Box>
          )}
          {/* Detail Content */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {detailContent}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          {emptyDetailContent || (
            <Typography variant="body1" color="text.secondary">
              Select an item to view details
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );

  if (isMobile) {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {!mobileDetailOpen && listPanel}
        <Drawer
          anchor="right"
          open={mobileDetailOpen}
          onClose={handleBack}
          sx={{
            '& .MuiDrawer-paper': {
              width: '100%',
            },
          }}
        >
          {detailPanel}
        </Drawer>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
      {listPanel}
      {detailPanel}
    </Box>
  );
};
