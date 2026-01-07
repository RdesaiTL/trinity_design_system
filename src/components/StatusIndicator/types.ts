/**
 * Status Indicator - Types and Configuration
 * Centralized type definitions and status configs
 */

import { semanticTokens } from '../../tokens';

// Helper to get indicator colors from semantic tokens
const indicator = semanticTokens.colors.indicator;

// ============================================================================
// STATUS TYPES
// ============================================================================

export type StatusType =
  // High Attention (Critical/Error states)
  | 'error'
  | 'critical'
  | 'failed'
  | 'rejected'
  | 'cancelled'
  // Medium Attention (Warning states)
  | 'warning'
  | 'caution'
  | 'pending'
  | 'in-progress'
  | 'running'
  // Low Attention (Success/Info states)
  | 'success'
  | 'complete'
  | 'approved'
  | 'active'
  | 'enabled'
  // Informational
  | 'info'
  | 'new'
  | 'updated'
  // Neutral
  | 'draft'
  | 'inactive'
  | 'disabled'
  | 'unknown'
  // Special
  | 'beta'
  | 'experimental';

export type SeverityLevel = 'high' | 'medium' | 'low' | 'info' | 'neutral';

export type StatusShape = 'circle' | 'square' | 'diamond' | 'triangle' | 'hexagon';

export type StatusSize = 'small' | 'medium' | 'large';

// ============================================================================
// STATUS CONFIGURATION INTERFACE
// ============================================================================

export interface StatusConfig {
  color: string;
  backgroundColor: string;
  outlineColor?: string;
  icon: string;
  shape: StatusShape;
  severity: SeverityLevel;
  label: string;
}

// ============================================================================
// STATUS CONFIGURATIONS
// ============================================================================

export const statusConfigs: Record<StatusType, StatusConfig> = {
  // High Attention - Red
  error: {
    color: indicator.error.fg,
    backgroundColor: indicator.error.bg,
    icon: 'error',
    shape: 'circle',
    severity: 'high',
    label: 'Error',
  },
  critical: {
    color: indicator.critical.fg,
    backgroundColor: indicator.critical.bg,
    icon: 'warning',
    shape: 'hexagon',
    severity: 'high',
    label: 'Critical',
  },
  failed: {
    color: indicator.failed.fg,
    backgroundColor: indicator.failed.bg,
    icon: 'close',
    shape: 'circle',
    severity: 'high',
    label: 'Failed',
  },
  rejected: {
    color: indicator.rejected.fg,
    backgroundColor: indicator.rejected.bg,
    icon: 'close',
    shape: 'circle',
    severity: 'high',
    label: 'Rejected',
  },
  cancelled: {
    color: indicator.cancelled.fg,
    backgroundColor: indicator.cancelled.bg,
    icon: 'close',
    shape: 'circle',
    severity: 'neutral',
    label: 'Cancelled',
  },

  // Medium Attention - Orange/Yellow
  warning: {
    color: indicator.warning.fg,
    backgroundColor: indicator.warning.bg,
    outlineColor: indicator.warning.outline,
    icon: 'warning',
    shape: 'triangle',
    severity: 'medium',
    label: 'Warning',
  },
  caution: {
    color: indicator.caution.fg,
    backgroundColor: indicator.caution.bg,
    outlineColor: indicator.caution.outline,
    icon: 'warning',
    shape: 'triangle',
    severity: 'medium',
    label: 'Caution',
  },
  pending: {
    color: indicator.pending.fg,
    backgroundColor: indicator.pending.bg,
    outlineColor: indicator.pending.outline,
    icon: 'clock',
    shape: 'circle',
    severity: 'medium',
    label: 'Pending',
  },
  'in-progress': {
    color: indicator.inProgress.fg,
    backgroundColor: indicator.inProgress.bg,
    icon: 'refresh',
    shape: 'circle',
    severity: 'medium',
    label: 'In Progress',
  },
  running: {
    color: indicator.running.fg,
    backgroundColor: indicator.running.bg,
    icon: 'play',
    shape: 'circle',
    severity: 'medium',
    label: 'Running',
  },

  // Low Attention - Green
  success: {
    color: indicator.success.fg,
    backgroundColor: indicator.success.bg,
    icon: 'check-circle',
    shape: 'circle',
    severity: 'low',
    label: 'Success',
  },
  complete: {
    color: indicator.complete.fg,
    backgroundColor: indicator.complete.bg,
    icon: 'check',
    shape: 'circle',
    severity: 'low',
    label: 'Complete',
  },
  approved: {
    color: indicator.approved.fg,
    backgroundColor: indicator.approved.bg,
    icon: 'check-circle',
    shape: 'circle',
    severity: 'low',
    label: 'Approved',
  },
  active: {
    color: indicator.active.fg,
    backgroundColor: indicator.active.bg,
    icon: 'check',
    shape: 'circle',
    severity: 'low',
    label: 'Active',
  },
  enabled: {
    color: indicator.enabled.fg,
    backgroundColor: indicator.enabled.bg,
    icon: 'check',
    shape: 'circle',
    severity: 'low',
    label: 'Enabled',
  },

  // Informational - Blue
  info: {
    color: indicator.info.fg,
    backgroundColor: indicator.info.bg,
    icon: 'info',
    shape: 'circle',
    severity: 'info',
    label: 'Info',
  },
  new: {
    color: indicator.new.fg,
    backgroundColor: indicator.new.bg,
    icon: 'star',
    shape: 'circle',
    severity: 'info',
    label: 'New',
  },
  updated: {
    color: indicator.updated.fg,
    backgroundColor: indicator.updated.bg,
    icon: 'refresh',
    shape: 'circle',
    severity: 'info',
    label: 'Updated',
  },

  // Neutral - Gray
  draft: {
    color: indicator.draft.fg,
    backgroundColor: indicator.draft.bg,
    icon: 'edit',
    shape: 'circle',
    severity: 'neutral',
    label: 'Draft',
  },
  inactive: {
    color: indicator.inactive.fg,
    backgroundColor: indicator.inactive.bg,
    icon: 'remove',
    shape: 'circle',
    severity: 'neutral',
    label: 'Inactive',
  },
  disabled: {
    color: indicator.disabled.fg,
    backgroundColor: indicator.disabled.bg,
    icon: 'close',
    shape: 'circle',
    severity: 'neutral',
    label: 'Disabled',
  },
  unknown: {
    color: indicator.unknown.fg,
    backgroundColor: indicator.unknown.bg,
    icon: 'help',
    shape: 'circle',
    severity: 'neutral',
    label: 'Unknown',
  },

  // Special - Purple
  beta: {
    color: indicator.beta.fg,
    backgroundColor: indicator.beta.bg,
    icon: 'zap',
    shape: 'diamond',
    severity: 'info',
    label: 'Beta',
  },
  experimental: {
    color: indicator.experimental.fg,
    backgroundColor: indicator.experimental.bg,
    icon: 'code',
    shape: 'diamond',
    severity: 'info',
    label: 'Experimental',
  },
};

// ============================================================================
// SIZE CONFIGURATIONS
// ============================================================================

export const sizeConfigs: Record<StatusSize, { icon: number; shape: number; fontSize: string; dotSize: number }> = {
  small: { icon: 16, shape: 8, fontSize: '0.75rem', dotSize: 8 },
  medium: { icon: 20, shape: 10, fontSize: '0.875rem', dotSize: 10 },
  large: { icon: 24, shape: 12, fontSize: '1rem', dotSize: 12 },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get the configuration for a status type
 */
export const getStatusConfig = (status: StatusType): StatusConfig => statusConfigs[status];

/**
 * Get all available status types
 */
export const getAllStatusTypes = (): StatusType[] => Object.keys(statusConfigs) as StatusType[];

/**
 * Get status types by severity level
 */
export const getStatusTypesBySeverity = (severity: SeverityLevel): StatusType[] => {
  return (Object.entries(statusConfigs) as [StatusType, StatusConfig][])
    .filter(([_, config]) => config.severity === severity)
    .map(([status]) => status);
};
