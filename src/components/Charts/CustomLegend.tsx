/**
 * Custom Legend Component
 * Trinity-styled legend for all chart types
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { LegendProps } from 'recharts';
import { chartTypography, chartLegendStyles } from './tokens';
import { brandColors } from '../../tokens';

export interface CustomLegendProps {
  /** Payload from Recharts */
  payload?: Array<{
    value: string;
    type: string;
    id: string;
    color: string;
    dataKey?: string;
  }>;
  /** Legend layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Custom formatter */
  formatter?: (value: string) => string;
  /** Click handler for legend items */
  onClick?: (dataKey: string) => void;
  /** Disabled items */
  disabledKeys?: string[];
}

/**
 * CustomLegend - Trinity-styled chart legend
 */
export const CustomLegend: React.FC<CustomLegendProps> = ({
  payload,
  direction = 'horizontal',
  formatter,
  onClick,
  disabledKeys = [],
}) => {
  if (!payload || payload.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: direction === 'horizontal' ? 3 : 1,
        pt: 2,
      }}
    >
      {payload.map((entry, index) => {
        const isDisabled = disabledKeys.includes(entry.dataKey || entry.value);
        const displayValue = formatter ? formatter(entry.value) : entry.value;

        return (
          <Box
            key={`legend-${index}`}
            onClick={() => onClick?.(entry.dataKey || entry.value)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: onClick ? 'pointer' : 'default',
              opacity: isDisabled ? 0.4 : 1,
              transition: 'opacity 0.2s ease',
              '&:hover': onClick ? {
                opacity: isDisabled ? 0.4 : 0.7,
              } : {},
            }}
          >
            <Box
              sx={{
                width: chartLegendStyles.iconSize,
                height: chartLegendStyles.iconSize,
                borderRadius: chartLegendStyles.iconType === 'circle' ? '50%' : 2,
                backgroundColor: entry.color,
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                ...chartTypography.legend,
                fontFamily: chartTypography.fontFamily,
                textDecoration: isDisabled ? 'line-through' : 'none',
              }}
            >
              {displayValue}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

/**
 * Interactive legend with toggle functionality
 */
export const InteractiveLegend: React.FC<
  CustomLegendProps & {
    onToggle: (dataKey: string) => void;
    hiddenKeys: string[];
  }
> = ({ payload, direction = 'horizontal', formatter, onToggle, hiddenKeys }) => {
  if (!payload || payload.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: direction === 'horizontal' ? 3 : 1,
        pt: 2,
      }}
    >
      {payload.map((entry, index) => {
        const dataKey = entry.dataKey || entry.value;
        const isHidden = hiddenKeys.includes(dataKey);
        const displayValue = formatter ? formatter(entry.value) : entry.value;

        return (
          <Box
            key={`legend-${index}`}
            onClick={() => onToggle(dataKey)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              opacity: isHidden ? 0.4 : 1,
              transition: 'all 0.2s ease',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: brandColors.neutral.gray100,
              },
            }}
          >
            <Box
              sx={{
                width: chartLegendStyles.iconSize,
                height: chartLegendStyles.iconSize,
                borderRadius: chartLegendStyles.iconType === 'circle' ? '50%' : 2,
                backgroundColor: isHidden ? brandColors.neutral.gray300 : entry.color,
                flexShrink: 0,
                transition: 'background-color 0.2s ease',
              }}
            />
            <Typography
              sx={{
                ...chartTypography.legend,
                fontFamily: chartTypography.fontFamily,
                textDecoration: isHidden ? 'line-through' : 'none',
                color: isHidden ? brandColors.neutral.gray400 : chartTypography.legend.fill,
              }}
            >
              {displayValue}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

/**
 * Pie chart legend with values
 */
export const PieLegend: React.FC<{
  payload?: Array<{
    value: string;
    color: string;
  }>;
  data?: Array<{ name: string; value: number }>;
  direction?: 'horizontal' | 'vertical';
  showValues?: boolean;
  showPercent?: boolean;
  valueFormatter?: (value: number) => string;
}> = ({
  payload,
  data,
  direction = 'vertical',
  showValues = true,
  showPercent = true,
  valueFormatter,
}) => {
  if (!payload || payload.length === 0) {
    return null;
  }

  const total = data?.reduce((sum, item) => sum + item.value, 0) || 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        flexWrap: 'wrap',
        gap: direction === 'horizontal' ? 3 : 1.5,
        py: 1,
      }}
    >
      {payload.map((entry, index) => {
        const dataItem = data?.find((d) => d.name === entry.value);
        const value = dataItem?.value || 0;
        const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
        const formattedValue = valueFormatter ? valueFormatter(value) : value.toLocaleString();

        return (
          <Box
            key={`legend-${index}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              minWidth: direction === 'horizontal' ? 'auto' : 160,
            }}
          >
            <Box
              sx={{
                width: chartLegendStyles.iconSize,
                height: chartLegendStyles.iconSize,
                borderRadius: '50%',
                backgroundColor: entry.color,
                flexShrink: 0,
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{
                  ...chartTypography.legend,
                  fontFamily: chartTypography.fontFamily,
                }}
              >
                {entry.value}
              </Typography>
              {(showValues || showPercent) && (
                <Typography
                  sx={{
                    fontSize: 11,
                    color: brandColors.neutral.gray500,
                    fontFamily: chartTypography.fontFamily,
                  }}
                >
                  {showValues && formattedValue}
                  {showValues && showPercent && ' • '}
                  {showPercent && `${percent}%`}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default CustomLegend;
