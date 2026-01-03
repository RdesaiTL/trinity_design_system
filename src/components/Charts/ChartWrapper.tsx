/**
 * Chart Wrapper Component
 * Common container for all chart types with loading, error, and empty states
 */

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Skeleton,
  SxProps,
  Theme,
} from '@mui/material';
import { brandColors } from '../../tokens';
import { chartTypography, chartSpacing } from './tokens';

export interface ChartWrapperProps {
  /** Chart title */
  title?: string;
  /** Chart subtitle/description */
  subtitle?: string;
  /** Chart height */
  height?: number;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string;
  /** Empty state (no data) */
  empty?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Children (the actual chart) */
  children: React.ReactNode;
  /** Custom sx props */
  sx?: SxProps<Theme>;
  /** Use paper container */
  variant?: 'default' | 'outlined' | 'elevated';
}

/**
 * ChartWrapper - Container component for charts with built-in states
 */
export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  subtitle,
  height = 300,
  loading = false,
  error,
  empty = false,
  emptyMessage = 'No data available',
  children,
  sx,
  variant = 'default',
}) => {
  const containerStyles: SxProps<Theme> = {
    width: '100%',
    ...(variant === 'outlined' && {
      border: `1px solid ${brandColors.neutral.gray200}`,
      borderRadius: 2,
      p: 2,
    }),
    ...(variant === 'elevated' && {
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      borderRadius: 2,
      p: 2,
      backgroundColor: '#FFFFFF',
    }),
    ...sx,
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={containerStyles}>
        {title && (
          <Box sx={{ mb: 2 }}>
            <Skeleton variant="text" width={200} height={24} />
            {subtitle && <Skeleton variant="text" width={300} height={18} sx={{ mt: 0.5 }} />}
          </Box>
        )}
        <Skeleton 
          variant="rectangular" 
          height={height} 
          sx={{ borderRadius: 1 }}
        />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={containerStyles}>
        {title && (
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                ...chartTypography.title,
                fontFamily: chartTypography.fontFamily,
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                sx={{
                  ...chartTypography.subtitle,
                  fontFamily: chartTypography.fontFamily,
                  mt: 0.5,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        <Box
          sx={{
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(218, 30, 40, 0.05)',
            borderRadius: 1,
            border: '1px dashed rgba(218, 30, 40, 0.3)',
          }}
        >
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography
              sx={{
                color: '#DA1E28',
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              Error loading chart
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: brandColors.neutral.gray500 }}
            >
              {error}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // Empty state
  if (empty) {
    return (
      <Box sx={containerStyles}>
        {title && (
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                ...chartTypography.title,
                fontFamily: chartTypography.fontFamily,
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                sx={{
                  ...chartTypography.subtitle,
                  fontFamily: chartTypography.fontFamily,
                  mt: 0.5,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        <Box
          sx={{
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: brandColors.neutral.gray50,
            borderRadius: 1,
            border: `1px dashed ${brandColors.neutral.gray300}`,
          }}
        >
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Box
              component="svg"
              sx={{
                width: 48,
                height: 48,
                color: brandColors.neutral.gray400,
                mb: 1,
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 16l4-4 4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </Box>
            <Typography
              sx={{
                color: brandColors.neutral.gray500,
                fontWeight: 500,
              }}
            >
              {emptyMessage}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // Normal state with chart
  return (
    <Box sx={containerStyles}>
      {(title || subtitle) && (
        <Box sx={{ mb: chartSpacing.md }}>
          {title && (
            <Typography
              sx={{
                ...chartTypography.title,
                fontFamily: chartTypography.fontFamily,
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              sx={{
                ...chartTypography.subtitle,
                fontFamily: chartTypography.fontFamily,
                mt: 0.5,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      {children}
    </Box>
  );
};

export default ChartWrapper;
