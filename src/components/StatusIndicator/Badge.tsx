/**
 * Status Indicator - Badge and Differential Components
 * BadgeIndicator, DifferentialIndicator
 */

import React from 'react';
import { Typography, Stack, Badge as MuiBadge, SxProps, Theme } from '@mui/material';
import { Icon } from '../Icon';
import { StatusType, StatusSize, statusConfigs, sizeConfigs } from './types';

// ============================================================================
// BADGE INDICATOR
// ============================================================================

export interface BadgeIndicatorProps {
  /** The content to wrap with badge */
  children: React.ReactNode;
  /** Number to display (max 999+) */
  count?: number;
  /** Whether to show dot instead of number */
  dot?: boolean;
  /** The status type for color */
  status?: StatusType;
  /** Max count before showing + */
  max?: number;
  /** Whether badge is visible */
  invisible?: boolean;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * Badge Indicator - Used when a count of new or updated items is available.
 * Displays over an icon or other content.
 */
export const BadgeIndicator: React.FC<BadgeIndicatorProps> = ({
  children,
  count,
  dot = false,
  status = 'error',
  max = 999,
  invisible = false,
  sx,
}) => {
  const config = statusConfigs[status];

  return (
    <MuiBadge
      badgeContent={dot ? undefined : count}
      max={max}
      variant={dot ? 'dot' : 'standard'}
      invisible={invisible}
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: config.backgroundColor,
          color: config.color,
          fontSize: '0.7rem',
          minWidth: dot ? 8 : 18,
          height: dot ? 8 : 18,
          padding: dot ? 0 : '0 4px',
        },
        ...sx,
      }}
    >
      {children}
    </MuiBadge>
  );
};

// ============================================================================
// DIFFERENTIAL INDICATOR
// ============================================================================

export interface DifferentialIndicatorProps {
  /** The value (positive or negative) */
  value: number;
  /** Format as percentage */
  percentage?: boolean;
  /** Format as currency */
  currency?: string;
  /** Show arrow/caret icon */
  showIcon?: boolean;
  /** Size of the indicator */
  size?: StatusSize;
  /** Whether to show color */
  showColor?: boolean;
  /** Custom positive color */
  positiveColor?: string;
  /** Custom negative color */
  negativeColor?: string;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * Differential Indicator - Used for displaying positive or negative changes.
 * Common in financial dashboards and data visualizations.
 */
export const DifferentialIndicator: React.FC<DifferentialIndicatorProps> = ({
  value,
  percentage = false,
  currency,
  showIcon = true,
  size = 'medium',
  showColor = true,
  positiveColor = '#24a148',
  negativeColor = '#da1e28',
  sx,
}) => {
  const sizeConfig = sizeConfigs[size];
  const isPositive = value >= 0;
  const color = showColor ? (isPositive ? positiveColor : negativeColor) : 'inherit';
  
  const formatValue = () => {
    const absValue = Math.abs(value);
    const sign = isPositive ? '+' : '-';
    
    if (currency) {
      return `${sign}${currency}${absValue.toLocaleString()}`;
    }
    if (percentage) {
      return `${sign}${absValue}%`;
    }
    return `${sign}${absValue.toLocaleString()}`;
  };

  return (
    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color, ...sx }}>
      {showIcon && (
        <Icon 
          name={isPositive ? 'trending-up' : 'trending-down'} 
          size={size === 'large' ? 'medium' : 'small'}
        />
      )}
      <Typography 
        variant="body2" 
        sx={{ 
          fontSize: sizeConfig.fontSize,
          fontWeight: 500,
          fontFamily: 'monospace',
        }}
      >
        {formatValue()}
      </Typography>
    </Stack>
  );
};
