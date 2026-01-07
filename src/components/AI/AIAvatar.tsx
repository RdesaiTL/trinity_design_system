/**
 * AI Avatar Component
 * Visual representation of the AI assistant
 */

import React from 'react';
import { Avatar, SxProps, Theme } from '@mui/material';
import { Icon } from '../Icon';
import { aiTokens } from './tokens';

// ============================================================================
// TYPES
// ============================================================================

export interface AIAvatarProps {
  /** Size of the avatar */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show animated pulse */
  animated?: boolean;
  /** Custom icon name */
  icon?: string;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

// ============================================================================
// SIZE CONFIGURATIONS
// ============================================================================

const avatarSizes = {
  small: 32,
  medium: 40,
  large: 56,
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * AI Avatar - Visual representation of the AI assistant.
 */
export const AIAvatar: React.FC<AIAvatarProps> = ({
  size = 'medium',
  animated = false,
  icon = 'zap',
  sx,
}) => {
  const avatarSize = avatarSizes[size];

  return (
    <Avatar
      sx={{
        width: avatarSize,
        height: avatarSize,
        background: aiTokens.gradient.primary,
        boxShadow: animated ? aiTokens.gradient.glow : '0 2px 8px rgba(120, 65, 201, 0.3)',
        ...(animated && {
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { boxShadow: '0 0 0 0 rgba(120, 65, 201, 0.4)' },
            '70%': { boxShadow: '0 0 0 10px transparent' },
            '100%': { boxShadow: '0 0 0 0 transparent' },
          },
        }),
        ...sx,
      }}
    >
      <Icon name={icon} size={size === 'large' ? 'medium' : 'small'} />
    </Avatar>
  );
};
