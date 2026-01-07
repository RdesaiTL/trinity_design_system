/**
 * @fileoverview Timeline component for activity feeds, audit logs, and history
 * @module components/Timeline
 */

import * as React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Collapse,
  IconButton,
  Button,
  Skeleton,
  useTheme,
} from '@mui/material';
import {
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
} from '@mui/icons-material';
import { semanticTokens } from '../../tokens';

export type TimelineVariant = 'default' | 'compact' | 'detailed';
export type TimelineItemType = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface TimelineItem {
  /** Unique identifier */
  id: string;
  /** Main title/action */
  title: string;
  /** Optional description */
  description?: string;
  /** Timestamp */
  timestamp: string;
  /** Formatted relative time (e.g., "2 hours ago") */
  relativeTime?: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Avatar URL (alternative to icon) */
  avatar?: string;
  /** Avatar initials (if no image) */
  avatarInitials?: string;
  /** Item type for styling */
  type?: TimelineItemType;
  /** User/actor name */
  actor?: string;
  /** Additional metadata */
  metadata?: Record<string, string>;
  /** Expandable content */
  expandedContent?: React.ReactNode;
  /** Child timeline items */
  children?: TimelineItem[];
  /** Whether this is a group header */
  isGroupHeader?: boolean;
  /** Group label for date grouping */
  groupLabel?: string;
}

export interface TimelineProps {
  /** Timeline items */
  items: TimelineItem[];
  /** Display variant */
  variant?: TimelineVariant;
  /** Loading state */
  loading?: boolean;
  /** Number of skeleton items when loading */
  loadingCount?: number;
  /** Show connector line */
  showConnector?: boolean;
  /** Alternate sides (for detailed variant) */
  alternate?: boolean;
  /** Custom render function for items */
  renderItem?: (item: TimelineItem, index: number) => React.ReactNode;
  /** Group items by date */
  groupByDate?: boolean;
  /** Callback when item is clicked */
  onItemClick?: (item: TimelineItem) => void;
  /** Show "Load more" button */
  showLoadMore?: boolean;
  /** Load more callback */
  onLoadMore?: () => void;
  /** Loading more state */
  loadingMore?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Max height with scroll */
  maxHeight?: number | string;
}

export const TimelineItemComponent: React.FC<{
  item: TimelineItem;
  variant: TimelineVariant;
  showConnector: boolean;
  isLast: boolean;
  onClick?: (item: TimelineItem) => void;
}> = ({ item, variant, showConnector, isLast, onClick }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const hasExpandable = Boolean(item.expandedContent || (item.children && item.children.length > 0));

  const getTypeColor = () => {
    switch (item.type) {
      case 'success': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'error': return theme.palette.error.main;
      case 'info': return theme.palette.info.main;
      default: return theme.palette.primary.main;
    }
  };

  const typeColor = getTypeColor();

  const handleClick = () => {
    if (hasExpandable) {
      setExpanded(!expanded);
    } else {
      onClick?.(item);
    }
  };

  // Group header rendering
  if (item.isGroupHeader) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography
          variant="caption"
          fontWeight={600}
          color="text.secondary"
          textTransform="uppercase"
          letterSpacing={0.5}
        >
          {item.groupLabel || item.title}
        </Typography>
      </Box>
    );
  }

  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      {/* Connector Line */}
      {showConnector && !isLast && (
        <Box
          sx={{
            position: 'absolute',
            left: isCompact ? 14 : 18,
            top: isCompact ? 28 : 40,
            bottom: 0,
            width: 2,
            backgroundColor: theme.palette.divider,
          }}
        />
      )}

      {/* Icon/Avatar */}
      <Box
        sx={{
          flexShrink: 0,
          mr: 2,
          zIndex: 1,
        }}
      >
        {item.avatar || item.avatarInitials ? (
          <Avatar
            src={item.avatar}
            sx={{
              width: isCompact ? 28 : 36,
              height: isCompact ? 28 : 36,
              fontSize: isCompact ? 12 : 14,
              bgcolor: item.avatar ? undefined : typeColor,
            }}
          >
            {item.avatarInitials}
          </Avatar>
        ) : (
          <Box
            sx={{
              width: isCompact ? 28 : 36,
              height: isCompact ? 28 : 36,
              borderRadius: `${semanticTokens.borders.radius.circle}px`, // Perfect circle
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: semanticTokens.effects.overlay.pressed, // 12% - subtle icon background
              color: typeColor,
            }}
          >
            {item.icon || (
              <Box
                sx={{
                  width: isCompact ? 8 : 10,
                  height: isCompact ? 8 : 10,
                  borderRadius: `${semanticTokens.borders.radius.circle}px`, // Perfect circle
                  backgroundColor: typeColor,
                }}
              />
            )}
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          pb: isLast ? 0 : 3,
          cursor: hasExpandable || onClick ? 'pointer' : 'default',
        }}
        onClick={handleClick}
      >
        {isDetailed ? (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: semanticTokens.borders.radiusPx.sm, // 6px
              border: `1px solid ${theme.palette.divider}`,
              transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.default}`,
              '&:hover': (hasExpandable || onClick) ? {
                borderColor: theme.palette.primary.light,
                boxShadow: theme.shadows[2],
              } : {},
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  {item.title}
                </Typography>
                {item.actor && (
                  <Typography variant="caption" color="text.secondary">
                    by {item.actor}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {item.relativeTime || item.timestamp}
                </Typography>
                {hasExpandable && (
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
                    {expanded ? <CollapseIcon fontSize="small" /> : <ExpandIcon fontSize="small" />}
                  </IconButton>
                )}
              </Box>
            </Box>
            {item.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {item.description}
              </Typography>
            )}
            {item.metadata && Object.keys(item.metadata).length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1.5 }}>
                {Object.entries(item.metadata).map(([key, value]) => (
                  <Box key={key}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {key}
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        ) : (
          <Box
            sx={{
              transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.default}`,
              borderRadius: 1,
              mx: -1,
              px: 1,
              py: 0.5,
              '&:hover': (hasExpandable || onClick) ? {
                backgroundColor: theme.palette.action.hover,
              } : {},
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant={isCompact ? 'body2' : 'subtitle2'}
                  fontWeight={isCompact ? 400 : 500}
                  sx={{ display: 'inline' }}
                >
                  {item.actor && (
                    <Typography component="span" fontWeight={600}>
                      {item.actor}{' '}
                    </Typography>
                  )}
                  {item.title}
                </Typography>
                {item.description && !isCompact && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                    {item.description}
                  </Typography>
                )}
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 2, whiteSpace: 'nowrap' }}>
                {item.relativeTime || item.timestamp}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Expandable Content */}
        <Collapse in={expanded}>
          {item.expandedContent && (
            <Box sx={{ mt: 2, pl: isDetailed ? 0 : 1 }}>
              {item.expandedContent}
            </Box>
          )}
          {item.children && item.children.length > 0 && (
            <Box sx={{ mt: 2, pl: 2, borderLeft: `2px solid ${theme.palette.divider}` }}>
              {item.children.map((child, idx) => (
                <TimelineItemComponent
                  key={child.id}
                  item={child}
                  variant="compact"
                  showConnector={false}
                  isLast={idx === item.children!.length - 1}
                  onClick={onClick}
                />
              ))}
            </Box>
          )}
        </Collapse>
      </Box>
    </Box>
  );
};

const TimelineSkeleton: React.FC<{ variant: TimelineVariant; count: number }> = ({ variant, count }) => {
  const isCompact = variant === 'compact';
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} sx={{ display: 'flex', mb: 3 }}>
          <Skeleton variant="circular" width={isCompact ? 28 : 36} height={isCompact ? 28 : 36} sx={{ mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton width="60%" height={20} />
            <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
          </Box>
        </Box>
      ))}
    </>
  );
};

export const Timeline: React.FC<TimelineProps> = ({
  items,
  variant = 'default',
  loading = false,
  loadingCount = 5,
  showConnector = true,
  renderItem,
  groupByDate = false,
  onItemClick,
  showLoadMore = false,
  onLoadMore,
  loadingMore = false,
  emptyMessage = 'No activity to display',
  maxHeight,
}) => {
  // Process items for date grouping
  const processedItems = React.useMemo(() => {
    if (!groupByDate) return items;

    const grouped: TimelineItem[] = [];
    let currentGroup = '';

    items.forEach((item) => {
      const date = new Date(item.timestamp);
      const groupLabel = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (groupLabel !== currentGroup) {
        currentGroup = groupLabel;
        grouped.push({
          id: `group-${groupLabel}`,
          title: groupLabel,
          timestamp: item.timestamp,
          isGroupHeader: true,
          groupLabel,
        });
      }
      grouped.push(item);
    });

    return grouped;
  }, [items, groupByDate]);

  if (loading) {
    return (
      <Box sx={{ maxHeight, overflow: maxHeight ? 'auto' : undefined }}>
        <TimelineSkeleton variant={variant} count={loadingCount} />
      </Box>
    );
  }

  if (processedItems.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxHeight, overflow: maxHeight ? 'auto' : undefined }}>
      {processedItems.map((item, index) =>
        renderItem ? (
          renderItem(item, index)
        ) : (
          <TimelineItemComponent
            key={item.id}
            item={item}
            variant={variant}
            showConnector={showConnector && !item.isGroupHeader}
            isLast={index === processedItems.length - 1}
            onClick={onItemClick}
          />
        )
      )}

      {showLoadMore && onLoadMore && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="text"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load more'}
          </Button>
        </Box>
      )}
    </Box>
  );
};
