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
// brandColors removed - use MUI theme tokens
import { Icon } from '../Icon';
import { aiTokens, aiSpacing, aiRadiusPx } from './tokens';
import { semanticTokens } from '../../tokens';

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
          backgroundColor: aiTokens.colors.aiPrimary, // @intentional-color: AI domain color
          color: 'common.white', // Use MUI theme
          border: 'none',
          '&:hover': {
            backgroundColor: aiTokens.colors.aiHover, // @intentional-color: AI domain hover
          },
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          color: aiTokens.colors.aiPrimary, // @intentional-color: AI domain color
          border: `1px solid ${aiTokens.colors.aiPrimary}`, // @intentional-color: AI domain border
          '&:hover': {
            backgroundColor: aiTokens.colors.aiHover, // @intentional-color: AI domain hover
          },
        };
      default:
        return {
          backgroundColor: 'background.paper', // Use MUI theme
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider', // Use MUI theme
          '&:hover': {
            borderColor: aiTokens.colors.aiPrimary, // @intentional-color: AI domain color
            backgroundColor: aiTokens.colors.aiHover, // @intentional-color: AI domain hover
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
            // eslint-disable-next-line no-restricted-syntax -- @intentional-color: white on primary variant
            color={variant === 'primary' ? '#FFFFFF' : aiTokens.colors.aiPrimary}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: variant === 'primary' ? 'common.white' : 'inherit', // Use MUI theme
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
          // eslint-disable-next-line no-restricted-syntax -- @intentional-color: white on primary variant
          color={variant === 'primary' ? '#FFFFFF' : 'text.disabled'}
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
          backgroundColor: aiTokens.colors.aiPrimary, // @intentional-color: AI domain color
          color: 'common.white', // Use MUI theme
          '&:hover': {
            backgroundColor: aiTokens.colors.aiHover, // @intentional-color: AI domain hover
          },
        };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${aiTokens.colors.aiPrimary} 0%, ${aiTokens.colors.aiSecondary} 100%)`, // @intentional-color: AI gradient
          color: 'common.white', // Use MUI theme
          '&:hover': {
            background: `linear-gradient(135deg, ${aiTokens.colors.aiHover} 0%, ${aiTokens.colors.aiSecondary} 100%)`, // @intentional-color: AI gradient hover
          },
        };
      default:
        return {
          backgroundColor: 'background.paper', // Use MUI theme
          color: aiTokens.colors.aiPrimary, // @intentional-color: AI domain color
          border: '1px solid',
          borderColor: 'divider', // Use MUI theme
          '&:hover': {
            borderColor: aiTokens.colors.aiPrimary, // @intentional-color: AI domain color
            backgroundColor: aiTokens.colors.aiHover, // @intentional-color: AI domain hover
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
            backgroundColor: 'secondary.main', // Use MUI theme
            color: 'common.white', // Use MUI theme
            fontSize: semanticTokens.typography.dense.badge, // 10px badge text
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
