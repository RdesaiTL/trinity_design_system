/**
 * AIFab Component
 * Floating Action Button for launching the AI chat panel
 */

import React from 'react';
import { Fab, Tooltip, Badge, Box, useTheme } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { brandColors } from '../../tokens';
import { aiTokens } from '../AI';

export interface AIFabProps {
  /** Whether the AI panel is currently open */
  open?: boolean;
  /** Callback when the FAB is clicked */
  onClick?: () => void;
  /** Position of the FAB */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Custom offset from the edge (in pixels) */
  offset?: { x?: number; y?: number };
  /** Whether to show a badge (e.g., for notifications) */
  showBadge?: boolean;
  /** Badge content (number or dot) */
  badgeContent?: number | string;
  /** Size of the FAB */
  size?: 'small' | 'medium' | 'large';
  /** Tooltip text */
  tooltip?: string;
  /** Whether the FAB is disabled */
  disabled?: boolean;
  /** Custom z-index */
  zIndex?: number;
}

/**
 * AIFab - Floating Action Button for launching AI chat
 * 
 * A beautifully styled FAB with Trinity AI branding that can be used
 * to open the InsightEnginePanel from anywhere in the application.
 */
export const AIFab: React.FC<AIFabProps> = ({
  open: _open = false,
  onClick,
  position = 'bottom-right',
  offset = { x: 24, y: 24 },
  showBadge = false,
  badgeContent,
  size = 'large',
  tooltip = 'Ask AI',
  disabled = false,
  zIndex = 1000,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Calculate position styles
  const positionStyles: React.CSSProperties = {
    position: 'fixed',
    zIndex,
  };

  switch (position) {
    case 'bottom-right':
      positionStyles.bottom = offset.y;
      positionStyles.right = offset.x;
      break;
    case 'bottom-left':
      positionStyles.bottom = offset.y;
      positionStyles.left = offset.x;
      break;
    case 'top-right':
      positionStyles.top = offset.y;
      positionStyles.right = offset.x;
      break;
    case 'top-left':
      positionStyles.top = offset.y;
      positionStyles.left = offset.x;
      break;
  }

  const fabContent = (
    <Fab
      color="primary"
      onClick={onClick}
      disabled={disabled}
      size={size}
      sx={{
        background: aiTokens.gradient.diagonal,
        boxShadow: aiTokens.gradient.glow,
        transition: 'all 0.3s ease',
        '&:hover': {
          background: aiTokens.gradient.diagonal,
          boxShadow: aiTokens.gradient.glow,
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
        '&.Mui-disabled': {
          background: isDark ? brandColors.neutral.gray600 : brandColors.neutral.gray400,
          boxShadow: 'none',
        },
      }}
    >
      <AutoAwesomeIcon sx={{ color: brandColors.neutral.white }} />
    </Fab>
  );

  return (
    <Box sx={positionStyles}>
      {showBadge ? (
        <Badge
          badgeContent={badgeContent}
          color="error"
          overlap="circular"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: brandColors.secondary.main,
              color: brandColors.neutral.white,
            },
          }}
        >
          <Tooltip title={tooltip} placement="left">
            {fabContent}
          </Tooltip>
        </Badge>
      ) : (
        <Tooltip title={tooltip} placement="left">
          {fabContent}
        </Tooltip>
      )}
    </Box>
  );
};

export default AIFab;
