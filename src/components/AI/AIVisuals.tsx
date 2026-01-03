/**
 * AI Visual Components
 * Gradient text, stat cards, and decorative elements
 */

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  SxProps,
  Theme,
} from '@mui/material';
import { brandColors } from '../../tokens';
import { Icon } from '../Icon';
import { aiTokens, aiSpacing, aiRadiusPx } from './tokens';

// Success/Error colors (matching tokens)
const statusColors = {
  success: '#24a148',
  error: '#da1e28',
};

// ============================================================================
// GRADIENT TEXT
// ============================================================================

export interface GradientTextProps {
  /** Text content */
  children: React.ReactNode;
  /** Gradient start color */
  startColor?: string;
  /** Gradient end color */
  endColor?: string;
  /** Gradient direction */
  direction?: string;
  /** Typography variant */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2';
  /** Font weight */
  fontWeight?: number | string;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * Gradient Text - Text with gradient fill effect.
 */
export const GradientText: React.FC<GradientTextProps> = ({
  children,
  startColor = aiTokens.colors.aiPrimary,
  endColor = aiTokens.colors.aiSecondary,
  direction = '135deg',
  variant = 'h6',
  fontWeight = 600,
  sx,
}) => {
  return (
    <Typography
      variant={variant}
      sx={{
        fontWeight,
        background: `linear-gradient(${direction}, ${startColor} 0%, ${endColor} 100%)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

// ============================================================================
// STAT CARD
// ============================================================================

export interface StatCardProps {
  /** Stat label */
  label: string;
  /** Stat value */
  value: string | number;
  /** Icon name */
  icon?: string;
  /** Trend value (positive or negative number) */
  trend?: number;
  /** Trend label */
  trendLabel?: string;
  /** Card variant */
  variant?: 'default' | 'gradient' | 'outlined';
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * Stat Card - Display statistical metrics with optional trend.
 */
export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  trendLabel,
  variant = 'default',
  size = 'medium',
  sx,
}) => {
  const sizeStyles = {
    small: { p: 1.5, valueSize: 'h6', labelSize: 'caption' },
    medium: { p: 2, valueSize: 'h5', labelSize: 'body2' },
    large: { p: 3, valueSize: 'h4', labelSize: 'body1' },
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${aiTokens.colors.aiPrimary} 0%, ${aiTokens.colors.aiSecondary} 100%)`,
          color: '#FFFFFF',
          border: 'none',
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${brandColors.neutral.gray100}`,
        };
      default:
        return {
          backgroundColor: '#FFFFFF',
          border: `1px solid ${brandColors.neutral.gray100}`,
        };
    }
  };

  const styles = sizeStyles[size];

  return (
    <Paper
      elevation={0}
      sx={{
        p: styles.p,
        borderRadius: aiRadiusPx.lg,
        ...getVariantStyles(),
        ...sx,
      }}
    >
      <Stack spacing={1}>
        {/* Header with icon */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
            variant={styles.labelSize as 'caption' | 'body1' | 'body2'}
            sx={{
              color: variant === 'gradient' ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary',
              fontWeight: 500,
            }}
          >
            {label}
          </Typography>
          {icon && (
            <Box
              sx={{
                width: size === 'small' ? 28 : 36,
                height: size === 'small' ? 28 : 36,
                borderRadius: aiRadiusPx.sm,
                backgroundColor:
                  variant === 'gradient' ? 'rgba(255, 255, 255, 0.2)' : aiTokens.colors.aiHover,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                name={icon}
                size="small"
                color={variant === 'gradient' ? '#FFFFFF' : aiTokens.colors.aiPrimary}
              />
            </Box>
          )}
        </Stack>

        {/* Value */}
        <Typography
          variant={styles.valueSize as 'h4' | 'h5' | 'h6'}
          sx={{
            fontWeight: 700,
            color: variant === 'gradient' ? '#FFFFFF' : 'text.primary',
          }}
        >
          {value}
        </Typography>

        {/* Trend */}
        {trend !== undefined && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Icon
              name={trend >= 0 ? 'trending-up' : 'trending-down'}
              size="small"
              color={
                variant === 'gradient'
                  ? '#FFFFFF'
                  : trend >= 0
                  ? statusColors.success
                  : statusColors.error
              }
            />
            <Typography
              variant="caption"
              sx={{
                color:
                  variant === 'gradient'
                    ? 'rgba(255, 255, 255, 0.9)'
                    : trend >= 0
                    ? statusColors.success
                    : statusColors.error,
                fontWeight: 500,
              }}
            >
              {trend >= 0 ? '+' : ''}
              {trend}%
            </Typography>
            {trendLabel && (
              <Typography
                variant="caption"
                sx={{
                  color: variant === 'gradient' ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                }}
              >
                {trendLabel}
              </Typography>
            )}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

// ============================================================================
// GRADIENT ICON BADGE
// ============================================================================

export interface GradientIconBadgeProps {
  /** Icon name */
  icon: string;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Gradient start color */
  startColor?: string;
  /** Gradient end color */
  endColor?: string;
  /** Badge label */
  label?: string;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * Gradient Icon Badge - Icon with gradient background.
 */
export const GradientIconBadge: React.FC<GradientIconBadgeProps> = ({
  icon,
  size = 'medium',
  startColor = aiTokens.colors.aiPrimary,
  endColor = aiTokens.colors.aiSecondary,
  label,
  sx,
}) => {
  const sizeMap = {
    small: { container: 32, icon: 'small' as const },
    medium: { container: 44, icon: 'medium' as const },
    large: { container: 56, icon: 'medium' as const },
  };

  const styles = sizeMap[size];

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={sx}>
      <Box
        sx={{
          width: styles.container,
          height: styles.container,
          borderRadius: aiRadiusPx.md,
          background: `linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 12px ${startColor}33`,
        }}
      >
        <Icon name={icon} size={styles.icon} color="#FFFFFF" />
      </Box>
      {label && (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
      )}
    </Stack>
  );
};

// ============================================================================
// AI SHIMMER EFFECT
// ============================================================================

export interface AIShimmerProps {
  /** Width of shimmer */
  width?: string | number;
  /** Height of shimmer */
  height?: string | number;
  /** Border radius */
  borderRadius?: number;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Shimmer - Loading shimmer effect with AI gradient.
 */
export const AIShimmer: React.FC<AIShimmerProps> = ({
  width = '100%',
  height = 20,
  borderRadius = aiRadiusPx.sm,
  sx,
}) => {
  return (
    <Box
      sx={{
        width,
        height,
        borderRadius,
        background: `linear-gradient(
          90deg,
          ${aiTokens.colors.aiBackground} 0%,
          ${aiTokens.colors.aiHover} 50%,
          ${aiTokens.colors.aiBackground} 100%
        )`,
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        '@keyframes shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        ...sx,
      }}
    />
  );
};
