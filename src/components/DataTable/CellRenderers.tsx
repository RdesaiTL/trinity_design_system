/**
 * Custom Cell Renderers
 * Specialized cell components for Trinity DataTable
 */

import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Avatar,
  LinearProgress,
  Rating,
  Stack,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { GridValidRowModel } from '@mui/x-data-grid';
import { RowAction } from './types';
import { statusBadgeTokens, tableTypography } from './tokens';
import { brandColors } from '../../tokens';

// ============================================================================
// STATUS CELL
// ============================================================================

interface StatusCellProps {
  value: string;
  statusColors?: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'>;
}

export const StatusCell: React.FC<StatusCellProps> = ({ value, statusColors = {} }) => {
  const status = statusColors[value] || 'default';
  const tokens = statusBadgeTokens[status];

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon sx={{ fontSize: 14 }} />;
      case 'error':
        return <ErrorIcon sx={{ fontSize: 14 }} />;
      case 'warning':
        return <WarningIcon sx={{ fontSize: 14 }} />;
      case 'info':
        return <InfoIcon sx={{ fontSize: 14 }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Chip
        icon={getIcon() || undefined}
        label={value}
        size="small"
        sx={{
          backgroundColor: tokens.background,
          color: tokens.text,
          border: `1px solid ${tokens.border}`,
          fontFamily: tableTypography.fontFamily,
          fontWeight: 500,
          fontSize: 12,
          height: 24,
          '& .MuiChip-icon': {
            color: tokens.text,
          },
        }}
      />
    </Box>
  );
};

// ============================================================================
// AVATAR CELL
// ============================================================================

interface AvatarCellProps {
  name: string;
  email?: string;
  src?: string;
  size?: number;
  fontSize?: number;
  showEmail?: boolean;
}

export const AvatarCell: React.FC<AvatarCellProps> = ({ 
  name, 
  email, 
  src,
  size = 32,
  fontSize = 12,
  showEmail = true,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
      <Avatar
        src={src}
        sx={{
          width: size,
          height: size,
          fontSize: fontSize,
          fontWeight: 600,
          backgroundColor: brandColors.neutral.gray200,
          color: brandColors.neutral.gray600,
          fontFamily: tableTypography.fontFamily,
          flexShrink: 0,
        }}
      >
        {initials}
      </Avatar>
      <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography
          variant="body2"
          sx={{
            fontFamily: tableTypography.fontFamily,
            fontWeight: 500,
            fontSize: fontSize,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Typography>
        {showEmail && email && (
          <Typography
            variant="caption"
            sx={{
              fontFamily: tableTypography.fontFamily,
              color: brandColors.neutral.gray500,
              fontSize: Math.max(10, fontSize - 2),
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {email}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

// ============================================================================
// PROGRESS CELL
// ============================================================================

interface ProgressCellProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

export const ProgressCell: React.FC<ProgressCellProps> = ({
  value,
  max = 100,
  showLabel = true,
  color = 'primary',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ flex: 1, minWidth: 60, maxWidth: 100 }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          color={color}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: brandColors.neutral.gray100,
          }}
        />
      </Box>
      {showLabel && (
        <Typography
          variant="caption"
          sx={{
            fontFamily: tableTypography.fontFamily,
            fontWeight: 500,
            color: brandColors.neutral.gray600,
            minWidth: 35,
          }}
        >
          {Math.round(percentage)}%
        </Typography>
      )}
    </Stack>
  );
};

// ============================================================================
// RATING CELL
// ============================================================================

interface RatingCellProps {
  value: number;
  max?: number;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const RatingCell: React.FC<RatingCellProps> = ({
  value,
  max = 5,
  readOnly = true,
  size = 'small',
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Rating
        value={value}
        max={max}
        readOnly={readOnly}
        size={size}
        sx={{
          '& .MuiRating-iconFilled': {
            // eslint-disable-next-line no-restricted-syntax
            color: '#F59E0B', // @intentional-color: standard amber/gold for star ratings
          },
        }}
      />
    </Box>
  );
};

// ============================================================================
// CURRENCY CELL
// ============================================================================

interface CurrencyCellProps {
  value: number;
  currency?: string;
  locale?: string;
}

export const CurrencyCell: React.FC<CurrencyCellProps> = ({
  value,
  currency = 'USD',
  locale = 'en-US',
}) => {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Typography
        variant="body2"
        sx={{
          fontFamily: tableTypography.fontFamily,
          fontWeight: 500,
          fontFeatureSettings: '"tnum"',
        }}
      >
        {formatted}
      </Typography>
    </Box>
  );
};

// ============================================================================
// ACTIONS CELL
// ============================================================================

interface ActionsCellProps<R extends GridValidRowModel> {
  row: R;
  actions: RowAction<R>[];
  maxInline?: number;
}

export const ActionsCell = <R extends GridValidRowModel>({
  row,
  actions,
  maxInline = 2,
}: ActionsCellProps<R>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const inlineActions = actions.filter((a) => !a.showInMenu).slice(0, maxInline);
  const menuActions = [
    ...actions.filter((a) => a.showInMenu),
    ...actions.filter((a) => !a.showInMenu).slice(maxInline),
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: RowAction<R>) => {
    handleClose();
    action.onClick(row);
  };

  const isDisabled = (action: RowAction<R>) => {
    if (typeof action.disabled === 'function') {
      return action.disabled(row);
    }
    return action.disabled;
  };

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      {inlineActions.map((action) => (
        <Tooltip key={action.id} title={action.label}>
          <span>
            <IconButton
              size="small"
              color={action.color || 'default'}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(row);
              }}
              disabled={isDisabled(action)}
              sx={{ p: 0.5 }}
            >
              {action.icon}
            </IconButton>
          </span>
        </Tooltip>
      ))}

      {menuActions.length > 0 && (
        <>
          <IconButton
            size="small"
            onClick={handleClick}
            sx={{ p: 0.5 }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={(e) => e.stopPropagation()}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                sx: {
                  minWidth: 160,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
              },
            }}
          >
            {menuActions.map((action) => (
              <MenuItem
                key={action.id}
                onClick={() => handleAction(action)}
                disabled={isDisabled(action)}
                sx={{
                  fontFamily: tableTypography.fontFamily,
                  fontSize: 13,
                }}
              >
                {action.icon && (
                  <ListItemIcon sx={{ color: action.color ? `${action.color}.main` : undefined }}>
                    {action.icon}
                  </ListItemIcon>
                )}
                <ListItemText>{action.label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Stack>
  );
};

// ============================================================================
// EDITABLE CELL
// ============================================================================

interface EditableCellProps {
  value: string | number;
  onSave: (newValue: string | number) => void;
  type?: 'text' | 'number';
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  onSave,
  type = 'text',
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onSave(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  if (isEditing) {
    return (
      <input
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(type === 'number' ? Number(e.target.value) : e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        style={{
          width: '100%',
          padding: '4px 8px',
          border: `2px solid ${brandColors.primary.light}`,
          borderRadius: 4,
          fontFamily: tableTypography.fontFamily,
          fontSize: 14,
          outline: 'none',
        }}
      />
    );
  }

  return (
    <Box
      onDoubleClick={handleDoubleClick}
      sx={{
        cursor: 'text',
        '&:hover': {
          backgroundColor: brandColors.neutral.gray100,
          borderRadius: 1,
        },
        px: 1,
        py: 0.5,
        mx: -1,
        my: -0.5,
      }}
    >
      {value}
    </Box>
  );
};

// ============================================================================
// HOVER ACTIONS CELL (Gmail-style)
// ============================================================================

interface HoverActionsCellProps<R extends GridValidRowModel> {
  row: R;
  actions: RowAction<R>[];
  isHovered?: boolean;
}

export const HoverActionsCell = <R extends GridValidRowModel>({
  row,
  actions,
  isHovered = false,
}: HoverActionsCellProps<R>) => {
  const isDisabled = (action: RowAction<R>) => {
    if (typeof action.disabled === 'function') {
      return action.disabled(row);
    }
    return action.disabled;
  };

  return (
    <Stack
      direction="row"
      spacing={0.5}
      alignItems="center"
      sx={{
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.15s ease-in-out',
        visibility: isHovered ? 'visible' : 'hidden',
      }}
    >
      {actions.map((action) => (
        <Tooltip key={action.id} title={action.label}>
          <span>
            <IconButton
              size="small"
              color={action.color || 'default'}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(row);
              }}
              disabled={isDisabled(action)}
              sx={{
                p: 0.5,
                '&:hover': {
                  backgroundColor: brandColors.neutral.gray100,
                },
              }}
            >
              {action.icon}
            </IconButton>
          </span>
        </Tooltip>
      ))}
    </Stack>
  );
};

// ============================================================================
// DRAG HANDLE CELL
// ============================================================================

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface DragHandleCellProps {
  isDragging?: boolean;
}

export const DragHandleCell: React.FC<DragHandleCellProps> = ({ isDragging = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        color: brandColors.neutral.gray400,
        '&:hover': {
          color: brandColors.neutral.gray600,
        },
        '&:active': {
          cursor: 'grabbing',
        },
        ...(isDragging && {
          cursor: 'grabbing',
          color: brandColors.primary.light,
        }),
      }}
    >
      <DragIndicatorIcon fontSize="small" />
    </Box>
  );
};

// ============================================================================
// TEXT CELL (Simple text without avatar)
// ============================================================================

interface TextCellProps {
  primary: string;
  secondary?: string;
}

export const TextCell: React.FC<TextCellProps> = ({ primary, secondary }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <Typography
        variant="body2"
        sx={{
          fontFamily: tableTypography.fontFamily,
          fontWeight: 500,
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {primary}
      </Typography>
      {secondary && (
        <Typography
          variant="caption"
          sx={{
            fontFamily: tableTypography.fontFamily,
            color: brandColors.neutral.gray500,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {secondary}
        </Typography>
      )}
    </Box>
  );
};

export default StatusCell;
