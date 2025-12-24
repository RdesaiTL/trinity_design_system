/**
 * AI Container & Layout Components
 * Container, Expandable Section, and Persona Card components
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Stack,
  Collapse,
  Avatar,
  Divider,
  SxProps,
  Theme,
} from '@mui/material';
import { brandColors } from '../../theme';
import { Icon } from '../Icon';
import { aiTokens, aiSpacing, aiRadius } from './tokens';
import { AIAvatar } from './AIAvatar';

// ============================================================================
// AI CONTAINER
// ============================================================================

export interface AIContainerProps {
  /** Container title */
  title?: string;
  /** Container subtitle */
  subtitle?: string;
  /** Header actions */
  headerActions?: React.ReactNode;
  /** Whether to show AI avatar in header */
  showAvatar?: boolean;
  /** Container children */
  children: React.ReactNode;
  /** Whether container has border */
  bordered?: boolean;
  /** Whether container has background */
  filled?: boolean;
  /** Whether container has padding */
  padded?: boolean;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Container - Wrapper for AI content with optional header.
 */
export const AIContainer: React.FC<AIContainerProps> = ({
  title,
  subtitle,
  headerActions,
  showAvatar = false,
  children,
  bordered = true,
  filled = false,
  padded = true,
  sx,
}) => {
  const hasHeader = title || subtitle || headerActions || showAvatar;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: aiRadius.lg,
        border: bordered ? `1px solid ${aiTokens.colors.aiBorder}` : 'none',
        backgroundColor: filled ? aiTokens.colors.aiBackground : 'transparent',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Header */}
      {hasHeader && (
        <Box
          sx={{
            p: padded ? aiSpacing.base : 0,
            borderBottom: bordered ? `1px solid ${aiTokens.colors.aiBorder}` : 'none',
            backgroundColor: filled ? aiTokens.colors.aiHover : 'transparent',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1.5}>
              {showAvatar && <AIAvatar size="small" />}
              <Box>
                {title && (
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {title}
                  </Typography>
                )}
                {subtitle && (
                  <Typography variant="caption" color="text.secondary">
                    {subtitle}
                  </Typography>
                )}
              </Box>
            </Stack>
            {headerActions && <Box>{headerActions}</Box>}
          </Stack>
        </Box>
      )}

      {/* Content */}
      <Box sx={{ p: padded ? aiSpacing.base : 0 }}>{children}</Box>
    </Paper>
  );
};

// ============================================================================
// AI EXPANDABLE SECTION
// ============================================================================

export interface AIExpandableSectionProps {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle?: string;
  /** Leading icon */
  icon?: string;
  /** Section children */
  children: React.ReactNode;
  /** Default expanded state */
  defaultExpanded?: boolean;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Change handler */
  onChange?: (expanded: boolean) => void;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Expandable Section - Collapsible content section.
 */
export const AIExpandableSection: React.FC<AIExpandableSectionProps> = ({
  title,
  subtitle,
  icon,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onChange,
  sx,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    const newExpanded = !expanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpanded);
    }
    onChange?.(newExpanded);
  };

  return (
    <Box sx={sx}>
      {/* Header */}
      <Box
        onClick={handleToggle}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1.5,
          px: aiSpacing.base,
          cursor: 'pointer',
          borderRadius: expanded ? `${aiRadius.md}px ${aiRadius.md}px 0 0` : aiRadius.md,
          backgroundColor: aiTokens.colors.aiHover,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: `rgba(120, 65, 201, 0.12)`,
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {icon && <Icon name={icon} size="small" color={aiTokens.colors.aiPrimary} />}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Stack>
        <IconButton size="small" sx={{ ml: 1 }}>
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size="small"
            color={brandColors.neutral.gray500}
          />
        </IconButton>
      </Box>

      {/* Content */}
      <Collapse in={expanded}>
        <Box
          sx={{
            p: aiSpacing.base,
            borderRadius: `0 0 ${aiRadius.md}px ${aiRadius.md}px`,
            backgroundColor: '#FFFFFF',
            border: `1px solid ${aiTokens.colors.aiBorder}`,
            borderTop: 'none',
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

// ============================================================================
// AI PERSONA CARD
// ============================================================================

export interface AIPersonaCardProps {
  /** Persona name */
  name: string;
  /** Persona description */
  description?: string;
  /** Persona avatar */
  avatar?: React.ReactNode;
  /** Persona capabilities */
  capabilities?: string[];
  /** Whether persona is selected */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Persona Card - Card for selecting AI personas/agents.
 */
export const AIPersonaCard: React.FC<AIPersonaCardProps> = ({
  name,
  description,
  avatar,
  capabilities = [],
  selected = false,
  onClick,
  sx,
}) => {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: aiSpacing.base,
        borderRadius: aiRadius.lg,
        border: `2px solid ${selected ? aiTokens.colors.aiPrimary : brandColors.neutral.gray100}`,
        backgroundColor: selected ? aiTokens.colors.aiHover : '#FFFFFF',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': onClick
          ? {
              borderColor: aiTokens.colors.aiPrimary,
              backgroundColor: aiTokens.colors.aiHover,
            }
          : {},
        ...sx,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        {/* Avatar */}
        {avatar || <AIAvatar size="medium" />}

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          )}

          {/* Capabilities */}
          {capabilities.length > 0 && (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {capabilities.map((capability, index) => (
                  <Box
                    key={index}
                    sx={{
                      px: 1,
                      py: 0.25,
                      borderRadius: aiRadius.sm,
                      backgroundColor: 'rgba(120, 65, 201, 0.1)',
                      color: aiTokens.colors.aiPrimary,
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                    }}
                  >
                    {capability}
                  </Box>
                ))}
              </Stack>
            </>
          )}
        </Box>

        {/* Selected Indicator */}
        {selected && (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: aiRadius.circle,
              backgroundColor: aiTokens.colors.aiPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon name="check" size="small" color="#FFFFFF" />
          </Box>
        )}
      </Stack>
    </Paper>
  );
};
