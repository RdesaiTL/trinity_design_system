/**
 * @fileoverview DataCard component for displaying metrics with trends and sparklines
 * @module components/DataCard
 */

import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Skeleton,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon,
  TrendingFlat as TrendFlatIcon,
  MoreVert as MoreIcon,
  InfoOutlined as InfoIcon,
} from '@mui/icons-material';
import { semanticTokens, baseTokens } from '../../tokens';

export type TrendDirection = 'up' | 'down' | 'flat';

interface SparklineProps {
  data: number[];
  color: string;
  height?: number;
}

const Sparkline: React.FC<SparklineProps> = ({ data, color, height = 40 }) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const width = 100;
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sparkline-gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#sparkline-gradient-${color})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export interface DataCardProps {
  /** Card title */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Unit or suffix for the value */
  unit?: string;
  /** Trend direction */
  trend?: TrendDirection;
  /** Trend percentage value */
  trendValue?: number;
  /** Trend label (e.g., "vs last month") */
  trendLabel?: string;
  /** Sparkline data points */
  sparklineData?: number[];
  /** Optional subtitle or description */
  subtitle?: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Icon background color */
  iconColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Comparison value (e.g., "Target: 1,000") */
  comparison?: string;
  /** Loading state */
  loading?: boolean;
  /** Tooltip info text */
  infoTooltip?: string;
  /** Callback when more options clicked */
  onMoreClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Card click handler */
  onClick?: () => void;
  /** Custom footer content */
  footer?: React.ReactNode;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Highlight/emphasis variant */
  variant?: 'default' | 'outlined' | 'filled';
  /** Full height */
  fullHeight?: boolean;
}

const sizeStyles = {
  small: {
    padding: baseTokens.spacing[3],
    titleSize: 'caption' as const,
    valueSize: 'h5' as const,
    iconSize: 32,
  },
  medium: {
    padding: baseTokens.spacing[4],
    titleSize: 'body2' as const,
    valueSize: 'h4' as const,
    iconSize: 40,
  },
  large: {
    padding: baseTokens.spacing[5],
    titleSize: 'body1' as const,
    valueSize: 'h3' as const,
    iconSize: 48,
  },
};

export const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  unit,
  trend,
  trendValue,
  trendLabel = 'vs last period',
  sparklineData,
  subtitle,
  icon,
  iconColor = 'primary',
  comparison,
  loading = false,
  infoTooltip,
  onMoreClick,
  onClick,
  footer,
  size = 'medium',
  variant = 'default',
  fullHeight = false,
}) => {
  const theme = useTheme();
  const styles = sizeStyles[size];

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return theme.palette.success.main;
      case 'down':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendUpIcon sx={{ fontSize: 18 }} />;
      case 'down':
        return <TrendDownIcon sx={{ fontSize: 18 }} />;
      default:
        return <TrendFlatIcon sx={{ fontSize: 18 }} />;
    }
  };

  const getIconBgColor = () => {
    const palette = theme.palette[iconColor];
    return alpha(palette.main, 0.1);
  };

  const cardStyles = {
    default: {},
    outlined: {
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: 'none',
    },
    filled: {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
      boxShadow: 'none',
    },
  };

  return (
    <Card
      elevation={variant === 'default' ? 1 : 0}
      onClick={onClick}
      sx={{
        borderRadius: semanticTokens.borders.radiusPx.sm,
        height: fullHeight ? '100%' : 'auto',
        cursor: onClick ? 'pointer' : 'default',
        transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.default}`,
        '&:hover': onClick
          ? {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-2px)',
            }
          : {},
        ...cardStyles[variant],
      }}
    >
      <CardContent sx={{ p: `${styles.padding}px !important` }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {icon && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: styles.iconSize,
                  height: styles.iconSize,
                  borderRadius: semanticTokens.borders.radius.iconContainer,
                  backgroundColor: getIconBgColor(),
                  color: theme.palette[iconColor].main,
                }}
              >
                {icon}
              </Box>
            )}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {loading ? (
                  <Skeleton width={80} height={20} />
                ) : (
                  <Typography
                    variant={styles.titleSize}
                    color="text.secondary"
                    fontWeight={500}
                  >
                    {title}
                  </Typography>
                )}
                {infoTooltip && (
                  <Tooltip title={infoTooltip} arrow>
                    <InfoIcon
                      sx={{
                        fontSize: 14,
                        color: theme.palette.text.disabled,
                        cursor: 'help',
                      }}
                    />
                  </Tooltip>
                )}
              </Box>
              {subtitle && !loading && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>

          {onMoreClick && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onMoreClick(e);
              }}
              sx={{ mr: -1, mt: -0.5 }}
            >
              <MoreIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {/* Value */}
        <Box sx={{ mb: sparklineData ? 2 : trend ? 1 : 0 }}>
          {loading ? (
            <Skeleton width={120} height={40} />
          ) : (
            <Typography
              variant={styles.valueSize}
              fontWeight={700}
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 0.5,
              }}
            >
              {value}
              {unit && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  fontWeight={400}
                >
                  {unit}
                </Typography>
              )}
            </Typography>
          )}
        </Box>

        {/* Sparkline */}
        {sparklineData && sparklineData.length > 1 && !loading && (
          <Box sx={{ mb: 2, mx: -1 }}>
            <Sparkline
              data={sparklineData}
              color={getTrendColor()}
              height={size === 'small' ? 30 : size === 'large' ? 50 : 40}
            />
          </Box>
        )}

        {/* Trend */}
        {trend && !loading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: getTrendColor(),
              }}
            >
              {getTrendIcon()}
              {trendValue !== undefined && (
                <Typography variant="body2" fontWeight={600}>
                  {trendValue > 0 ? '+' : ''}
                  {trendValue}%
                </Typography>
              )}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {trendLabel}
            </Typography>
          </Box>
        )}

        {/* Comparison */}
        {comparison && !loading && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {comparison}
          </Typography>
        )}

        {/* Footer */}
        {footer && (
          <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            {footer}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
