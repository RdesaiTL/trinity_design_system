/**
 * AI Source Components
 * Components for displaying AI source citations and references
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Stack,
  Collapse,
  Link,
  Chip,
  SxProps,
  Theme,
} from '@mui/material';
import { brandColors } from '../../tokens';
import { Icon } from '../Icon';
import { aiTokens, aiSpacing, aiRadiusPx } from './tokens';

// ============================================================================
// AI SOURCE
// ============================================================================

export interface AISourceProps {
  /** Source number */
  number: number;
  /** Source title */
  title: string;
  /** Source URL */
  url?: string;
  /** Source description/snippet */
  description?: string;
  /** Source type (webpage, document, etc.) */
  type?: 'webpage' | 'document' | 'article' | 'video' | 'other';
  /** Favicon URL */
  favicon?: string;
  /** Click handler */
  onClick?: () => void;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Source - Individual source citation card.
 */
export const AISource: React.FC<AISourceProps> = ({
  number,
  title,
  url,
  description,
  type = 'webpage',
  favicon,
  onClick,
  sx,
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'document':
        return 'document';
      case 'article':
        return 'document';
      case 'video':
        return 'trending-up';
      default:
        return 'external-link';
    }
  };

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: aiSpacing.sm,
        borderRadius: aiRadiusPx.sm,
        border: `1px solid ${brandColors.neutral.gray100}`,
        backgroundColor: 'brandColors.neutral.white',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': onClick
          ? {
              borderColor: aiTokens.colors.aiPrimary,
              boxShadow: `0 2px 8px ${aiTokens.colors.aiHover}`,
            }
          : {},
        ...sx,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        {/* Source Number Badge */}
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: aiRadiusPx.circle,
            backgroundColor: aiTokens.colors.aiHover,
            color: aiTokens.colors.aiPrimary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          {number}
        </Box>

        {/* Source Content */}
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {favicon && (
              <Box
                component="img"
                src={favicon}
                alt=""
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: 0.5,
                }}
              />
            )}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Typography>
            <Icon name={getTypeIcon()} size="small" />
          </Stack>

          {url && (
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              sx={{
                fontSize: '0.75rem',
                color: 'text.secondary',
                textDecoration: 'none',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {url}
            </Link>
          )}

          {description && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mt: 0.5,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

// ============================================================================
// AI SOURCES SECTION
// ============================================================================

export interface AISourcesSectionProps {
  /** List of sources */
  sources: Omit<AISourceProps, 'number'>[];
  /** Section title */
  title?: string;
  /** Whether section is collapsible */
  collapsible?: boolean;
  /** Default expanded state */
  defaultExpanded?: boolean;
  /** Maximum sources to show initially (rest collapsed) */
  maxVisible?: number;
  /** Source click handler */
  onSourceClick?: (index: number, source: Omit<AISourceProps, 'number'>) => void;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Sources Section - Collapsible section displaying source citations.
 */
export const AISourcesSection: React.FC<AISourcesSectionProps> = ({
  sources,
  title = 'Sources',
  collapsible = true,
  defaultExpanded = true,
  maxVisible = 3,
  onSourceClick,
  sx,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showAll, setShowAll] = useState(false);

  const visibleSources = showAll ? sources : sources.slice(0, maxVisible);
  const hasMore = sources.length > maxVisible;

  return (
    <Box sx={sx}>
      {/* Section Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={collapsible ? () => setExpanded(!expanded) : undefined}
        sx={{
          cursor: collapsible ? 'pointer' : 'default',
          mb: expanded ? 1.5 : 0,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Chip
            label={sources.length}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.75rem',
              backgroundColor: aiTokens.colors.aiHover,
              color: aiTokens.colors.aiPrimary,
            }}
          />
        </Stack>
        {collapsible && (
          <IconButton size="small">
            <Icon
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size="small"
            />
          </IconButton>
        )}
      </Stack>

      {/* Sources List */}
      <Collapse in={expanded}>
        <Stack spacing={1}>
          {visibleSources.map((source, index) => (
            <AISource
              key={index}
              number={index + 1}
              {...source}
              onClick={() => onSourceClick?.(index, source)}
            />
          ))}

          {/* Show More/Less Button */}
          {hasMore && (
            <Box
              onClick={() => setShowAll(!showAll)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                py: 1,
                cursor: 'pointer',
                color: aiTokens.colors.aiPrimary,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Typography variant="body2">
                {showAll ? 'Show less' : `Show ${sources.length - maxVisible} more`}
              </Typography>
              <Icon name={showAll ? 'chevron-up' : 'chevron-down'} size="small" />
            </Box>
          )}
        </Stack>
      </Collapse>
    </Box>
  );
};
