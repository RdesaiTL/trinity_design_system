/**
 * AI Explainability Component
 * Provides details about AI-generated content
 */

import React from 'react';
import { Box, Typography, Stack, Divider, Button, SxProps, Theme } from '@mui/material';
import { AILabel } from './AILabel';

// ============================================================================
// TYPES
// ============================================================================

export interface AIExplainabilityProps {
  /** Title/overview of the AI */
  title?: string;
  /** Description of what the AI does */
  description?: string;
  /** Model name or version */
  modelName?: string;
  /** Confidence score (0-100) */
  confidence?: number;
  /** Last updated date */
  lastUpdated?: string;
  /** Additional details */
  details?: Array<{ label: string; value: string }>;
  /** Action buttons */
  actions?: Array<{ label: string; onClick: () => void }>;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * AI Explainability Content - Provides details about AI-generated content.
 */
export const AIExplainability: React.FC<AIExplainabilityProps> = ({
  title = 'AI-generated content',
  description,
  modelName,
  confidence,
  lastUpdated,
  details,
  actions,
  sx,
}) => {
  return (
    <Box sx={{ p: 2, ...sx }}>
      <Stack spacing={2}>
        {/* Header */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
            <AILabel size="2xs" clickable={false} showPopover={false} />
            <Typography variant="subtitle2" fontWeight={600}>
              {title}
            </Typography>
          </Stack>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>

        {/* Details */}
        {(modelName || confidence !== undefined || lastUpdated || details) && (
          <Box>
            <Divider sx={{ my: 1 }} />
            <Stack spacing={1}>
              {modelName && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Model</Typography>
                  <Typography variant="caption" fontWeight={500}>{modelName}</Typography>
                </Stack>
              )}
              {confidence !== undefined && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Confidence</Typography>
                  <Typography variant="caption" fontWeight={500}>{confidence}%</Typography>
                </Stack>
              )}
              {lastUpdated && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Last updated</Typography>
                  <Typography variant="caption" fontWeight={500}>{lastUpdated}</Typography>
                </Stack>
              )}
              {details?.map((detail, index) => (
                <Stack key={index} direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">{detail.label}</Typography>
                  <Typography variant="caption" fontWeight={500}>{detail.value}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}

        {/* Actions */}
        {actions && actions.length > 0 && (
          <Box>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" spacing={1}>
              {actions.map((action, index) => (
                <Button
                  key={index}
                  size="small"
                  variant="text"
                  onClick={action.onClick}
                  sx={{ fontSize: '0.75rem' }}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
