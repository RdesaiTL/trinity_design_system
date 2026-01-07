/**
 * StatusIndicator - Unified Polymorphic Status Component
 * 
 * A single, flexible status indicator that can render in multiple variants.
 * Consolidates: IconIndicator, ShapeIndicator, StatusDot, StatusChip, InlineStatus,
 * BadgeIndicator, DifferentialIndicator into one component.
 * 
 * @module StatusIndicator
 * @version 2.0.0
 */

import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  Badge as MuiBadge,
  SxProps,
  Theme,
} from '@mui/material';
import { Icon } from '../Icon';
import { StatusType, StatusSize, StatusShape, statusConfigs, sizeConfigs } from './types';
import { ShapeComponents } from './Shapes';
import { semanticTokens } from '../../tokens';

// ============================================================================
// VARIANT TYPES
// ============================================================================

/**
 * Available display variants for the StatusIndicator
 * 
 * - `icon`: Icon with circular background and optional label
 * - `shape`: Geometric shape (circle, square, diamond, triangle, hexagon) with label
 * - `dot`: Minimal colored dot, optionally with pulse animation
 * - `chip`: MUI Chip-based status tag
 * - `inline`: Text label with optional dot/icon prefix
 * - `badge`: Wraps children with a notification badge
 * - `differential`: Shows positive/negative value changes
 */
export type StatusVariant = 
  | 'icon'
  | 'shape'
  | 'dot'
  | 'chip'
  | 'inline'
  | 'badge'
  | 'differential';

// ============================================================================
// PROPS INTERFACE
// ============================================================================

/**
 * Base props shared across all variants
 */
interface BaseStatusProps {
  /** Visual variant of the indicator */
  variant?: StatusVariant;
  /** The semantic status type - determines color, icon, and default label */
  status?: StatusType;
  /** Size of the indicator */
  size?: StatusSize;
  /** Custom label (overrides status default) */
  label?: string;
  /** Whether to show the label text */
  showLabel?: boolean;
  /** Custom MUI sx props */
  sx?: SxProps<Theme>;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

/**
 * Props specific to 'icon' variant
 */
interface IconVariantProps {
  variant: 'icon';
  /** Show only the icon without background shape */
  iconOnly?: boolean;
}

/**
 * Props specific to 'shape' variant
 */
interface ShapeVariantProps {
  variant: 'shape';
  /** Override the default shape for the status */
  shape?: StatusShape;
  /** Show outline around shape (recommended for light colors) */
  showOutline?: boolean;
}

/**
 * Props specific to 'dot' variant
 */
interface DotVariantProps {
  variant: 'dot';
  /** Enable pulsing animation */
  pulse?: boolean;
}

/**
 * Props specific to 'chip' variant
 */
interface ChipVariantProps {
  variant: 'chip';
  /** Show icon in chip */
  showIcon?: boolean;
  /** Chip click handler */
  onClick?: () => void;
  /** Chip delete handler */
  onDelete?: () => void;
}

/**
 * Props specific to 'inline' variant
 */
interface InlineVariantProps {
  variant: 'inline';
  /** Show colored dot before label */
  showDot?: boolean;
  /** Show icon before label (mutually exclusive with showDot) */
  showIcon?: boolean;
}

/**
 * Props specific to 'badge' variant
 */
interface BadgeVariantProps {
  variant: 'badge';
  /** Content to wrap with badge */
  children: React.ReactNode;
  /** Badge count (0-999+) */
  count?: number;
  /** Show dot instead of count */
  dot?: boolean;
  /** Maximum count before showing + */
  max?: number;
  /** Hide the badge */
  invisible?: boolean;
}

/**
 * Props specific to 'differential' variant
 */
interface DifferentialVariantProps {
  variant: 'differential';
  /** The numeric value (positive or negative) */
  value: number;
  /** Format as percentage */
  percentage?: boolean;
  /** Format with currency symbol */
  currency?: string;
  /** Show trending arrow icon */
  showIcon?: boolean;
  /** Show color based on positive/negative */
  showColor?: boolean;
  /** Custom color for positive values */
  positiveColor?: string;
  /** Custom color for negative values */
  negativeColor?: string;
}

/**
 * Default variant props (when variant is omitted or 'icon')
 */
interface DefaultVariantProps {
  variant?: undefined;
  iconOnly?: boolean;
}

/**
 * Union type of all StatusIndicator props
 */
export type StatusIndicatorProps = BaseStatusProps & (
  | IconVariantProps
  | ShapeVariantProps
  | DotVariantProps
  | ChipVariantProps
  | InlineVariantProps
  | BadgeVariantProps
  | DifferentialVariantProps
  | DefaultVariantProps
);

// ============================================================================
// INTERNAL VARIANT RENDERERS
// ============================================================================

const renderIcon = (
  status: StatusType,
  size: StatusSize,
  label: string,
  showLabel: boolean,
  iconOnly: boolean,
  sx?: SxProps<Theme>
) => {
  const config = statusConfigs[status];
  const sizeConfig = sizeConfigs[size];

  if (iconOnly) {
    return (
      <Stack direction="row" alignItems="center" spacing={1} sx={sx} role="status">
        <Icon 
          name={config.icon} 
          size={size} 
          sx={{ color: config.backgroundColor }}
          aria-hidden="true"
        />
        {showLabel && (
          <Typography variant="body2" sx={{ fontSize: sizeConfig.fontSize }}>
            {label}
          </Typography>
        )}
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={sx} role="status">
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
        aria-hidden="true"
      >
        <Icon name={config.icon} size={size === 'large' ? 'medium' : 'small'} />
      </Box>
      {showLabel && (
        <Typography variant="body2" sx={{ fontSize: sizeConfig.fontSize }}>
          {label}
        </Typography>
      )}
    </Stack>
  );
};

const renderShape = (
  status: StatusType,
  size: StatusSize,
  label: string,
  showLabel: boolean,
  shape?: StatusShape,
  showOutline?: boolean,
  sx?: SxProps<Theme>
) => {
  const config = statusConfigs[status];
  const sizeConfig = sizeConfigs[size];
  const displayShape = shape || config.shape;
  const ShapeComponent = ShapeComponents[displayShape];

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={sx} role="status">
      <Box aria-hidden="true">
        <ShapeComponent 
          size={sizeConfig.shape * 1.6} 
          color={config.backgroundColor}
          outline={showOutline ? config.outlineColor : undefined}
        />
      </Box>
      {showLabel && (
        <Typography variant="body2" sx={{ fontSize: sizeConfig.fontSize }}>
          {label}
        </Typography>
      )}
    </Stack>
  );
};

const renderDot = (
  status: StatusType,
  size: StatusSize,
  pulse: boolean,
  sx?: SxProps<Theme>
) => {
  const config = statusConfigs[status];
  const sizeConfig = sizeConfigs[size];

  return (
    <Box
      role="status"
      aria-label={config.label}
      sx={{
        width: sizeConfig.dotSize,
        height: sizeConfig.dotSize,
        borderRadius: `${semanticTokens.borders.radius.circle}px`, // Perfect circle
        backgroundColor: config.backgroundColor,
        flexShrink: 0,
        ...(pulse && {
          animation: 'statusPulse 2s infinite',
          '@keyframes statusPulse': {
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

const renderChip = (
  status: StatusType,
  size: 'small' | 'medium',
  label: string,
  showIcon: boolean,
  onClick?: () => void,
  onDelete?: () => void,
  sx?: SxProps<Theme>
) => {
  const config = statusConfigs[status];

  return (
    <Chip
      label={label}
      size={size}
      icon={showIcon ? <Icon name={config.icon} size="small" aria-hidden="true" /> : undefined}
      onClick={onClick}
      onDelete={onDelete}
      role="status"
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

const renderInline = (
  status: StatusType,
  size: StatusSize,
  label: string,
  showDot: boolean,
  showIcon: boolean,
  sx?: SxProps<Theme>
) => {
  const config = statusConfigs[status];
  const sizeConfig = sizeConfigs[size];

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={sx} role="status">
      {showDot && (
        <Box
          aria-hidden="true"
          sx={{
            width: sizeConfig.dotSize,
            height: sizeConfig.dotSize,
            borderRadius: `${semanticTokens.borders.radius.circle}px`, // Perfect circle
            backgroundColor: config.backgroundColor,
            flexShrink: 0,
          }}
        />
      )}
      {showIcon && !showDot && (
        <Icon 
          name={config.icon} 
          size={size === 'large' ? 'medium' : 'small'} 
          sx={{ color: config.backgroundColor }}
          aria-hidden="true"
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
        {label}
      </Typography>
    </Stack>
  );
};

const renderBadge = (
  status: StatusType,
  children: React.ReactNode,
  count?: number,
  dot?: boolean,
  max?: number,
  invisible?: boolean,
  sx?: SxProps<Theme>
) => {
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

const renderDifferential = (
  value: number,
  size: StatusSize,
  percentage: boolean,
  currency?: string,
  showIcon?: boolean,
  showColor?: boolean,
  positiveColor?: string,
  negativeColor?: string,
  sx?: SxProps<Theme>
) => {
  const sizeConfig = sizeConfigs[size];
  const isPositive = value >= 0;
  // eslint-disable-next-line no-restricted-syntax
  const effectivePositiveColor = positiveColor || '#24a148'; // @intentional-color: default green
  // eslint-disable-next-line no-restricted-syntax
  const effectiveNegativeColor = negativeColor || '#da1e28'; // @intentional-color: default red
  const color = showColor !== false ? (isPositive ? effectivePositiveColor : effectiveNegativeColor) : 'inherit';
  
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
    <Stack 
      direction="row" 
      alignItems="center" 
      spacing={0.5} 
      sx={{ color, ...sx }}
      role="status"
      aria-label={`${isPositive ? 'Increased' : 'Decreased'} by ${formatValue()}`}
    >
      {showIcon !== false && (
        <Icon 
          name={isPositive ? 'trending-up' : 'trending-down'} 
          size={size === 'large' ? 'medium' : 'small'}
          aria-hidden="true"
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * StatusIndicator - A unified, polymorphic status indicator component.
 * 
 * Renders different visual representations based on the `variant` prop:
 * - `icon`: Icon with background (default)
 * - `shape`: Geometric shape indicator
 * - `dot`: Minimal colored dot
 * - `chip`: Tag-style chip
 * - `inline`: Text with dot/icon prefix
 * - `badge`: Notification badge wrapper
 * - `differential`: Positive/negative value indicator
 * 
 * @example
 * // Basic icon indicator
 * <StatusIndicator status="success" />
 * 
 * @example
 * // Chip variant
 * <StatusIndicator variant="chip" status="warning" label="Pending Review" />
 * 
 * @example
 * // Dot with pulse animation
 * <StatusIndicator variant="dot" status="running" pulse />
 * 
 * @example
 * // Badge wrapping an icon
 * <StatusIndicator variant="badge" status="error" count={5}>
 *   <NotificationsIcon />
 * </StatusIndicator>
 * 
 * @example
 * // Differential value
 * <StatusIndicator variant="differential" value={12.5} percentage />
 */
export const StatusIndicator: React.FC<StatusIndicatorProps> = (props) => {
  const {
    variant = 'icon',
    status = 'info',
    size = 'medium',
    label,
    showLabel = true,
    sx,
    'aria-label': _ariaLabel,
  } = props;

  const config = statusConfigs[status];
  const displayLabel = label || config.label;

  // Route to appropriate renderer based on variant
  switch (variant) {
    case 'icon':
    case undefined: {
      const iconProps = props as IconVariantProps | DefaultVariantProps;
      return renderIcon(
        status,
        size,
        displayLabel,
        showLabel,
        iconProps.iconOnly || false,
        sx
      );
    }

    case 'shape': {
      const shapeProps = props as ShapeVariantProps;
      return renderShape(
        status,
        size,
        displayLabel,
        showLabel,
        shapeProps.shape,
        shapeProps.showOutline ?? true,
        sx
      );
    }

    case 'dot': {
      const dotProps = props as DotVariantProps;
      return renderDot(status, size, dotProps.pulse || false, sx);
    }

    case 'chip': {
      const chipProps = props as ChipVariantProps;
      return renderChip(
        status,
        size === 'large' ? 'medium' : size,
        displayLabel,
        chipProps.showIcon ?? true,
        chipProps.onClick,
        chipProps.onDelete,
        sx
      );
    }

    case 'inline': {
      const inlineProps = props as InlineVariantProps;
      return renderInline(
        status,
        size,
        displayLabel,
        inlineProps.showDot ?? true,
        inlineProps.showIcon ?? false,
        sx
      );
    }

    case 'badge': {
      const badgeProps = props as BadgeVariantProps;
      return renderBadge(
        status,
        badgeProps.children,
        badgeProps.count,
        badgeProps.dot,
        badgeProps.max ?? 999,
        badgeProps.invisible,
        sx
      );
    }

    case 'differential': {
      const diffProps = props as DifferentialVariantProps;
      return renderDifferential(
        diffProps.value,
        size,
        diffProps.percentage || false,
        diffProps.currency,
        diffProps.showIcon,
        diffProps.showColor,
        diffProps.positiveColor,
        diffProps.negativeColor,
        sx
      );
    }

    default:
      return null;
  }
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default StatusIndicator;
