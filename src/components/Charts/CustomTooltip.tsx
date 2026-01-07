/**
 * Custom Tooltip Component
 * Trinity-styled tooltip for all chart types
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { chartTooltipStyles, chartTypography } from './tokens';
import { brandColors, semanticTokens } from '../../tokens';

export interface CustomTooltipProps {
  /** Whether the tooltip is active */
  active?: boolean;
  /** Tooltip payload data from recharts */
  payload?: Array<{ color?: string; name?: string; value?: number | string }>;
  /** Label for the tooltip */
  label?: string | number;
  /** Custom formatter for values */
  valueFormatter?: (value: number) => string;
  /** Custom formatter for labels */
  labelFormatter?: (label: string) => string;
  /** Show total for stacked charts */
  showTotal?: boolean;
  /** Unit suffix */
  unit?: string;
}

/**
 * CustomTooltip - Trinity-styled chart tooltip
 */
export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  valueFormatter,
  labelFormatter,
  showTotal = false,
  unit = '',
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const formattedLabel = labelFormatter ? labelFormatter(String(label)) : label;
  
  const formatValue = (value: number) => {
    if (valueFormatter) return valueFormatter(value);
    return typeof value === 'number' ? value.toLocaleString() : value;
  };

  const total = showTotal
    ? payload.reduce((sum: number, entry: { value?: number | string }) => sum + (Number(entry.value) || 0), 0)
    : null;

  return (
    <Box
      sx={{
        backgroundColor: chartTooltipStyles.backgroundColor,
        border: `1px solid ${chartTooltipStyles.borderColor}`,
        borderRadius: `${chartTooltipStyles.borderRadius}px`,
        boxShadow: chartTooltipStyles.boxShadow,
        padding: chartTooltipStyles.padding,
        minWidth: 140,
      }}
    >
      {/* Label */}
      {formattedLabel && (
        <Typography
          sx={{
            ...chartTypography.tooltipLabel,
            fontFamily: chartTypography.fontFamily,
            mb: 1,
            pb: 1,
            borderBottom: `1px solid ${brandColors.neutral.gray100}`,
          }}
        >
          {formattedLabel}
        </Typography>
      )}

      {/* Values */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {payload.map((entry: { color?: string; name?: string; value?: number | string }, index: number) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: `${semanticTokens.borders.radius.circle}px`, // Perfect circle
                  backgroundColor: entry.color,
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  ...chartTypography.tooltip,
                  fontFamily: chartTypography.fontFamily,
                  color: brandColors.neutral.gray600,
                }}
              >
                {entry.name}
              </Typography>
            </Box>
            <Typography
              sx={{
                ...chartTypography.tooltip,
                fontFamily: chartTypography.fontFamily,
                fontWeight: 600,
                color: brandColors.neutral.gray900,
              }}
            >
              {formatValue(entry.value as number)}{unit}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Total */}
      {showTotal && total !== null && (
        <Box
          sx={{
            mt: 1,
            pt: 1,
            borderTop: `1px solid ${brandColors.neutral.gray100}`,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              ...chartTypography.tooltip,
              fontFamily: chartTypography.fontFamily,
              fontWeight: 600,
            }}
          >
            Total
          </Typography>
          <Typography
            sx={{
              ...chartTypography.tooltip,
              fontFamily: chartTypography.fontFamily,
              fontWeight: 600,
            }}
          >
            {formatValue(total)}{unit}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

/**
 * Simple tooltip for single values
 */
export const SimpleTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  valueFormatter?: (value: number) => string;
  unit?: string;
}> = ({ active, payload, valueFormatter, unit = '' }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entry = payload[0];
  const formattedValue = valueFormatter 
    ? valueFormatter(entry.value) 
    : entry.value.toLocaleString();

  return (
    <Box
      sx={{
        backgroundColor: chartTooltipStyles.backgroundColor,
        border: `1px solid ${chartTooltipStyles.borderColor}`,
        borderRadius: `${chartTooltipStyles.borderRadius}px`,
        boxShadow: chartTooltipStyles.boxShadow,
        px: 1.5,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: `${semanticTokens.borders.radius.circle}px`, // Perfect circle
          backgroundColor: entry.color,
        }}
      />
      <Typography
        sx={{
          ...chartTypography.tooltip,
          fontFamily: chartTypography.fontFamily,
          fontWeight: 600,
        }}
      >
        {formattedValue}{unit}
      </Typography>
    </Box>
  );
};

export default CustomTooltip;
