/**
 * AI Action Components
 * Components for AI actions: Suggested Actions, Circular Actions
 */

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Stack,
  Tooltip,
  SxProps,
  Theme,
} from '@mui/material';
import { brandColors } from '../../tokens';
import { Icon } from '../Icon';
import { aiTokens, aiSpacing, aiRadiusPx } from './tokens';

// ============================================================================
// AI SUGGESTED ACTION
// ============================================================================

export interface AISuggestedActionProps {
  /** Action label */
  label: string;
  /** Action description */
  description?: string;
  /** Icon name */
  icon?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether action is disabled */
  disabled?: boolean;
  /** Variant */
  variant?: 'default' | 'primary' | 'outlined';
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Suggested Action - Actionable suggestion card.
 */
export const AISuggestedAction: React.FC<AISuggestedActionProps> = ({
  label,
  description,
  icon = 'arrow-right',
  onClick,
  disabled = false,
  variant = 'default',
  sx,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: aiTokens.colors.aiPrimary,
          color: 'brandColors.neutral.white',
          border: 'none',
          '&:hover': {
            backgroundColor: brandColors.primary.dark,
          },
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          color: aiTokens.colors.aiPrimary,
          border: `1px solid ${aiTokens.colors.aiPrimary}`,
          '&:hover': {
            backgroundColor: aiTokens.colors.aiHover,
          },
        };
      default:
        return {
          backgroundColor: 'brandColors.neutral.white',
          color: 'text.primary',
          border: `1px solid ${brandColors.neutral.gray100}`,
          '&:hover': {
            borderColor: aiTokens.colors.aiPrimary,
            backgroundColor: aiTokens.colors.aiHover,
          },
        };
    }
  };

  return (
    <Paper
      elevation={0}
      onClick={disabled ? undefined : onClick}
      sx={{
        p: aiSpacing.base,
        borderRadius: aiRadiusPx.md,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        ...getVariantStyles(),
        ...sx,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: aiRadiusPx.sm,
            backgroundColor:
              variant === 'primary'
                ? 'rgba(255, 255, 255, 0.2)'
                : aiTokens.colors.aiHover,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon
            name={icon}
            size="small"
            color={variant === 'primary' ? 'brandColors.neutral.white' : aiTokens.colors.aiPrimary}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: variant === 'primary' ? 'brandColors.neutral.white' : 'inherit',
            }}
          >
            {label}
          </Typography>
          {description && (
            <Typography
              variant="caption"
              sx={{
                color:
                  variant === 'primary'
                    ? 'rgba(255, 255, 255, 0.8)'
                    : 'text.secondary',
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        <Icon
          name="chevron-right"
          size="small"
          color={
            variant === 'primary' ? 'brandColors.neutral.white' : brandColors.neutral.gray400
          }
        />
      </Stack>
    </Paper>
  );
};

// ============================================================================
// AI CIRCULAR ACTION
// ============================================================================

export interface AICircularActionProps {
  /** Tooltip label */
  label: string;
  /** Icon name */
  icon: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether action is disabled */
  disabled?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Variant */
  variant?: 'default' | 'primary' | 'gradient';
  /** Whether to show badge */
  showBadge?: boolean;
  /** Badge content */
  badgeContent?: React.ReactNode;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Circular Action - Circular action button with icon.
 */
export const AICircularAction: React.FC<AICircularActionProps> = ({
  label,
  icon,
  onClick,
  disabled = false,
  size = 'medium',
  variant = 'default',
  showBadge = false,
  badgeContent,
  sx,
}) => {
  const sizeMap = {
    small: 32,
    medium: 44,
    large: 56,
  };

  const iconSizeMap = {
    small: 'small' as const,
    medium: 'medium' as const,
    large: 'medium' as const,
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: aiTokens.colors.aiPrimary,
          color: 'brandColors.neutral.white',
          '&:hover': {
            backgroundColor: brandColors.primary.dark,
          },
        };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${aiTokens.colors.aiPrimary} 0%, ${aiTokens.colors.aiSecondary} 100%)`,
          color: 'brandColors.neutral.white',
          '&:hover': {
            background: `linear-gradient(135deg, ${brandColors.primary.dark} 0%, ${aiTokens.colors.aiSecondary} 100%)`,
          },
        };
      default:
        return {
          backgroundColor: 'brandColors.neutral.white',
          color: aiTokens.colors.aiPrimary,
          border: `1px solid ${brandColors.neutral.gray100}`,
          '&:hover': {
            borderColor: aiTokens.colors.aiPrimary,
            backgroundColor: aiTokens.colors.aiHover,
          },
        };
    }
  };

  const buttonContent = (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{
          width: sizeMap[size],
          height: sizeMap[size],
          transition: 'all 0.2s ease',
          ...getVariantStyles(),
          ...sx,
        }}
      >
        <Icon name={icon} size={iconSizeMap[size]} />
      </IconButton>
      {showBadge && (
        <Box
          sx={{
            position: 'absolute',
            top: -4,
            right: -4,
            minWidth: 18,
            height: 18,
            borderRadius: aiRadiusPx.circle,
            backgroundColor: brandColors.secondary.main,
            color: 'brandColors.neutral.white',
            fontSize: '0.625rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
          }}
        >
          {badgeContent}
        </Box>
      )}
    </Box>
  );

  return label ? (
    <Tooltip title={label}>{buttonContent}</Tooltip>
  ) : (
    buttonContent
  );
};

// ============================================================================
// AI ACTIONS GROUP
// ============================================================================

export interface AIActionsGroupProps {
  /** List of actions */
  actions: AISuggestedActionProps[];
  /** Layout direction */
  direction?: 'row' | 'column';
  /** Spacing between actions */
  spacing?: number;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Actions Group - Group of suggested actions.
 */
export const AIActionsGroup: React.FC<AIActionsGroupProps> = ({
  actions,
  direction = 'column',
  spacing = 1,
  sx,
}) => {
  return (
    <Stack direction={direction} spacing={spacing} sx={sx}>
      {actions.map((action, index) => (
        <AISuggestedAction key={index} {...action} />
      ))}
    </Stack>
  );
};
