/**
 * AI Label Component
 * Indicates AI-generated content and provides pathway to explainability
 */

import React, { useState } from 'react';
import { Box, Popover, SxProps, Theme } from '@mui/material';
import { aiTokens, aiRadiusPx } from './tokens';

// ============================================================================
// TYPES
// ============================================================================

export type AILabelSize = 'mini' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AILabelVariant = 'default' | 'inline';

export interface AILabelProps {
  /** Size of the AI label */
  size?: AILabelSize;
  /** Variant of the AI label */
  variant?: AILabelVariant;
  /** Custom text (default: "AI") */
  text?: string;
  /** Whether to show explainability popover on click */
  showPopover?: boolean;
  /** Content for the explainability popover */
  popoverContent?: React.ReactNode;
  /** Whether the label is clickable */
  clickable?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

// ============================================================================
// SIZE CONFIGURATIONS
// ============================================================================

const aiLabelSizes: Record<AILabelSize, { size: number; fontSize: string; padding: string }> = {
  mini: { size: 16, fontSize: '0.625rem', padding: '2px 4px' },
  '2xs': { size: 20, fontSize: '0.6875rem', padding: '2px 6px' },
  xs: { size: 24, fontSize: '0.75rem', padding: '3px 8px' },
  sm: { size: 32, fontSize: '0.8125rem', padding: '4px 10px' },
  md: { size: 40, fontSize: '0.875rem', padding: '6px 12px' },
  lg: { size: 48, fontSize: '1rem', padding: '8px 14px' },
  xl: { size: 64, fontSize: '1.125rem', padding: '10px 16px' },
};

// ============================================================================
// AI SPARKLE ICON
// ============================================================================

const AISparkleIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * AI Label - Indicates AI-generated content and provides pathway to explainability.
 * Use to mark any instance of AI in the interface.
 */
export const AILabel: React.FC<AILabelProps> = ({
  size = 'sm',
  variant = 'default',
  text = 'AI',
  showPopover = true,
  popoverContent,
  clickable = true,
  onClick,
  sx,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const sizeConfig = aiLabelSizes[size];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (showPopover) {
      setAnchorEl(event.currentTarget);
    }
    onClick?.();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const labelContent = (
    <Box
      component={clickable ? 'button' : 'span'}
      onClick={clickable ? handleClick : undefined}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        padding: variant === 'inline' ? '1px 6px' : sizeConfig.padding,
        borderRadius: variant === 'inline' ? '10px' : '100px',
        background: aiTokens.gradient.primary,
        color: 'brandColors.neutral.white',
        fontSize: sizeConfig.fontSize,
        fontWeight: 600,
        fontFamily: '"Montserrat", sans-serif',
        border: 'none',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 8px rgba(120, 65, 201, 0.3)',
        ...(clickable && {
          '&:hover': {
            boxShadow: aiTokens.gradient.glow,
            transform: 'scale(1.02)',
          },
          '&:focus': {
            outline: `2px solid ${aiTokens.colors.aiPrimary}`,
            outlineOffset: 2,
          },
        }),
        ...sx,
      }}
    >
      <Box
        component="span"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& svg': {
            width: variant === 'inline' ? 12 : sizeConfig.size * 0.4,
            height: variant === 'inline' ? 12 : sizeConfig.size * 0.4,
          },
        }}
      >
        <AISparkleIcon />
      </Box>
      {text}
    </Box>
  );

  return (
    <>
      {labelContent}
      {showPopover && popoverContent && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                borderRadius: aiRadiusPx.md,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                border: `1px solid ${aiTokens.colors.aiBorder}`,
                background: `linear-gradient(180deg, ${aiTokens.colors.aiBackground} 0%, brandColors.neutral.white 100%)`,
                maxWidth: 360,
                minWidth: 280,
              },
            },
          }}
        >
          {popoverContent}
        </Popover>
      )}
    </>
  );
};
