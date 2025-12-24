/**
 * Status Indicator - Legend Component
 * StatusLegend for dashboards and charts
 */

import React from 'react';
import { Box, Typography, Stack, SxProps, Theme } from '@mui/material';
import { Icon } from '../Icon';
import { StatusType, StatusSize, statusConfigs, sizeConfigs } from './types';
import { ShapeComponents } from './Shapes';
import { StatusDot } from './Indicators';

// ============================================================================
// STATUS LEGEND TYPES
// ============================================================================

export interface StatusLegendItem {
  status: StatusType;
  label?: string;
  count?: number;
}

export interface StatusLegendProps {
  /** Items to display in legend */
  items: StatusLegendItem[];
  /** Variant: icon or shape */
  variant?: 'icon' | 'shape' | 'dot';
  /** Layout direction */
  direction?: 'row' | 'column';
  /** Size */
  size?: StatusSize;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

// ============================================================================
// STATUS LEGEND
// ============================================================================

/**
 * Status Legend - A collection of status indicators for use in dashboards and charts.
 */
export const StatusLegend: React.FC<StatusLegendProps> = ({
  items,
  variant = 'dot',
  direction = 'row',
  size = 'small',
  sx,
}) => {
  const sizeConfig = sizeConfigs[size];

  return (
    <Stack 
      direction={direction} 
      spacing={direction === 'row' ? 3 : 1}
      flexWrap="wrap"
      useFlexGap
      sx={sx}
    >
      {items.map((item, index) => {
        const config = statusConfigs[item.status];
        const displayLabel = item.label || config.label;
        
        return (
          <Stack key={index} direction="row" alignItems="center" spacing={1}>
            {variant === 'icon' && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: sizeConfig.icon + 4,
                  height: sizeConfig.icon + 4,
                  borderRadius: '50%',
                  backgroundColor: config.backgroundColor,
                  color: config.color,
                }}
              >
                <Icon name={config.icon} size="small" />
              </Box>
            )}
            {variant === 'shape' && (() => {
              const ShapeComp = ShapeComponents[config.shape];
              return (
                <ShapeComp
                  size={sizeConfig.shape * 1.4}
                  color={config.backgroundColor}
                  outline={config.outlineColor}
                />
              );
            })()}
            {variant === 'dot' && (
              <StatusDot status={item.status} size={size} />
            )}
            <Typography variant="body2" sx={{ fontSize: sizeConfig.fontSize }}>
              {displayLabel}
              {item.count !== undefined && (
                <Typography 
                  component="span" 
                  sx={{ 
                    ml: 0.5, 
                    color: 'text.secondary',
                    fontSize: sizeConfig.fontSize,
                  }}
                >
                  ({item.count})
                </Typography>
              )}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};
