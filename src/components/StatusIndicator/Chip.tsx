/**
 * Status Indicator - Chip and Inline Components
 * StatusChip, InlineStatus
 */

import React from 'react';
import { Typography, Stack, Chip, SxProps, Theme } from '@mui/material';
import { Icon } from '../Icon';
import { StatusType, StatusSize, statusConfigs, sizeConfigs } from './types';
import { StatusDot } from './Indicators';

// ============================================================================
// STATUS CHIP
// ============================================================================

export interface StatusChipProps {
  /** The status type */
  status: StatusType;
  /** Optional custom label (overrides default) */
  label?: string;
  /** Size of the chip */
  size?: 'small' | 'medium';
  /** Whether to show icon */
  showIcon?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Delete handler */
  onDelete?: () => void;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * Status Chip - A compact status indicator using MUI Chip component.
 * Useful for tags, filters, and inline status labels.
 */
export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  label,
  size = 'small',
  showIcon = true,
  onClick,
  onDelete,
  sx,
}) => {
  const config = statusConfigs[status];
  const displayLabel = label || config.label;

  return (
    <Chip
      label={displayLabel}
      size={size}
      icon={showIcon ? <Icon name={config.icon} size="small" /> : undefined}
      onClick={onClick}
      onDelete={onDelete}
      sx={{
        backgroundColor: `${config.backgroundColor}20`,
        color: config.backgroundColor,
        borderColor: config.backgroundColor,
        '& .MuiChip-icon': {
          color: config.backgroundColor,
        },
        '& .MuiChip-deleteIcon': {
          color: config.backgroundColor,
          '&:hover': {
            color: config.backgroundColor,
          },
        },
        ...sx,
      }}
      variant="outlined"
    />
  );
};

// ============================================================================
// INLINE STATUS
// ============================================================================

export interface InlineStatusProps {
  /** The status type */
  status: StatusType;
  /** Optional custom label (overrides default) */
  label?: string;
  /** Whether to show dot */
  showDot?: boolean;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Size */
  size?: StatusSize;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * Inline Status - A text-based status indicator with optional dot/icon.
 * Useful for status in tables and lists.
 */
export const InlineStatus: React.FC<InlineStatusProps> = ({
  status,
  label,
  showDot = true,
  showIcon = false,
  size = 'medium',
  sx,
}) => {
  const config = statusConfigs[status];
  const sizeConfig = sizeConfigs[size];
  const displayLabel = label || config.label;

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={sx}>
      {showDot && <StatusDot status={status} size={size} />}
      {showIcon && !showDot && (
        <Icon 
          name={config.icon} 
          size={size === 'large' ? 'medium' : 'small'} 
          sx={{ color: config.backgroundColor }}
        />
      )}
      <Typography 
        variant="body2" 
        sx={{ 
          fontSize: sizeConfig.fontSize,
          color: config.backgroundColor,
          fontWeight: 500,
        }}
      >
        {displayLabel}
      </Typography>
    </Stack>
  );
};
