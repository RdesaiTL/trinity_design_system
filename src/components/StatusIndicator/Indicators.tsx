/**
 * Status Indicator - Core Indicator Components
 * IconIndicator, ShapeIndicator, StatusDot
 */

import React from 'react';
import { Box, Typography, Stack, SxProps, Theme } from '@mui/material';
import { Icon } from '../Icon';
import { StatusType, StatusSize, StatusShape, statusConfigs, sizeConfigs } from './types';
import { ShapeComponents } from './Shapes';
import { semanticTokens } from '../../tokens';

// ============================================================================
// ICON INDICATOR
// ============================================================================

export interface IconIndicatorProps {
  /** The status type */
  status: StatusType;
  /** Size of the indicator */
  size?: StatusSize;
  /** Optional custom label (overrides default) */
  label?: string;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Whether to show only the icon without background */
  iconOnly?: boolean;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * Icon Indicator - Used when the layout offers ample space and the content requires maximum attention.
 * Consists of an icon, a shape, a meaningful color, and a descriptive label.
 */
export const IconIndicator: React.FC<IconIndicatorProps> = ({
  status,
  size = 'medium',
  label,
  showLabel = true,
  iconOnly = false,
  sx,
}) => {
  const config = statusConfigs[status];
  const sizeConfig = sizeConfigs[size];
  const displayLabel = label || config.label;

  if (iconOnly) {
    return (
      <Stack direction="row" alignItems="center" spacing={1} sx={sx}>
        <Icon 
          name={config.icon} 
          size={size} 
          sx={{ color: config.backgroundColor }}
        />
        {showLabel && (
          <Typography variant="body2" sx={{ fontSize: sizeConfig.fontSize }}>
            {displayLabel}
          </Typography>
        )}
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={sx}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.icon + 8,
          height: sizeConfig.icon + 8,
          borderRadius: `${semanticTokens.borders.radius.circle}px`, // Perfect circle
          backgroundColor: config.backgroundColor,
          color: config.color,
        }}
      >
        <Icon name={config.icon} size={size === 'large' ? 'medium' : 'small'} />
      </Box>
      {showLabel && (
        <Typography variant="body2" sx={{ fontSize: sizeConfig.fontSize }}>
          {displayLabel}
        </Typography>
      )}
    </Stack>
  );
};

// ============================================================================
// SHAPE INDICATOR
// ============================================================================

export interface ShapeIndicatorProps {
  /** The status type */
  status: StatusType;
  /** Override the default shape */
  shape?: StatusShape;
  /** Size of the indicator */
  size?: StatusSize;
  /** Optional custom label (overrides default) */
  label?: string;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Whether to show outline (recommended for light colors) */
  showOutline?: boolean;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * Shape Indicator - Useful in smaller spaces or when users need to scan large amounts of data.
 * Uses shape and color to convey status without relying on symbols.
 */
export const ShapeIndicator: React.FC<ShapeIndicatorProps> = ({
  status,
  shape,
  size = 'medium',
  label,
  showLabel = true,
  showOutline = true,
  sx,
}) => {
  const config = statusConfigs[status];
  const sizeConfig = sizeConfigs[size];
  const displayLabel = label || config.label;
  const displayShape = shape || config.shape;
  const ShapeComponent = ShapeComponents[displayShape];

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={sx}>
      <ShapeComponent 
        size={sizeConfig.shape * 1.6} 
        color={config.backgroundColor}
        outline={showOutline ? config.outlineColor : undefined}
      />
      {showLabel && (
        <Typography variant="body2" sx={{ fontSize: sizeConfig.fontSize }}>
          {displayLabel}
        </Typography>
      )}
    </Stack>
  );
};

// ============================================================================
// STATUS DOT
// ============================================================================

export interface StatusDotProps {
  /** The status type */
  status: StatusType;
  /** Size of the dot */
  size?: StatusSize;
  /** Whether to pulse/animate */
  pulse?: boolean;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * Status Dot - A minimal status indicator, useful for inline status display.
 */
export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  size = 'medium',
  pulse = false,
  sx,
}) => {
  const config = statusConfigs[status];
  const sizeConfig = sizeConfigs[size];

  return (
    <Box
      sx={{
        width: sizeConfig.dotSize,
        height: sizeConfig.dotSize,
        borderRadius: `${semanticTokens.borders.radius.circle}px`, // Perfect circle
        backgroundColor: config.backgroundColor,
        ...(pulse && {
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { boxShadow: `0 0 0 0 ${config.backgroundColor}80` },
            '70%': { boxShadow: `0 0 0 ${sizeConfig.dotSize}px transparent` },
            '100%': { boxShadow: `0 0 0 0 transparent` },
          },
        }),
        ...sx,
      }}
    />
  );
};
