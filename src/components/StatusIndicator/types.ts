/**
 * Status Indicator - Types and Configuration
 * Centralized type definitions and status configs
 */

import { brandColors } from '../../theme';

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
    color: '#FFFFFF',
    backgroundColor: brandColors.secondary.main,
    icon: 'error',
    shape: 'circle',
    severity: 'high',
    label: 'Error',
  },
  critical: {
    color: '#FFFFFF',
    backgroundColor: '#da1e28',
    icon: 'warning',
    shape: 'hexagon',
    severity: 'high',
    label: 'Critical',
  },
  failed: {
    color: '#FFFFFF',
    backgroundColor: brandColors.secondary.main,
    icon: 'close',
    shape: 'circle',
    severity: 'high',
    label: 'Failed',
  },
  rejected: {
    color: '#FFFFFF',
    backgroundColor: brandColors.secondary.main,
    icon: 'close',
    shape: 'circle',
    severity: 'high',
    label: 'Rejected',
  },
  cancelled: {
    color: '#FFFFFF',
    backgroundColor: '#6f6f6f',
    icon: 'close',
    shape: 'circle',
    severity: 'neutral',
    label: 'Cancelled',
  },

  // Medium Attention - Orange/Yellow
  warning: {
    color: '#000000',
    backgroundColor: '#f1c21b',
    outlineColor: '#8e6a00',
    icon: 'warning',
    shape: 'triangle',
    severity: 'medium',
    label: 'Warning',
  },
  caution: {
    color: '#000000',
    backgroundColor: '#ff832b',
    outlineColor: '#ba4e00',
    icon: 'warning',
    shape: 'triangle',
    severity: 'medium',
    label: 'Caution',
  },
  pending: {
    color: '#000000',
    backgroundColor: '#f1c21b',
    outlineColor: '#8e6a00',
    icon: 'clock',
    shape: 'circle',
    severity: 'medium',
    label: 'Pending',
  },
  'in-progress': {
    color: '#FFFFFF',
    backgroundColor: brandColors.primary.main,
    icon: 'refresh',
    shape: 'circle',
    severity: 'medium',
    label: 'In Progress',
  },
  running: {
    color: '#FFFFFF',
    backgroundColor: brandColors.primary.main,
    icon: 'play',
    shape: 'circle',
    severity: 'medium',
    label: 'Running',
  },

  // Low Attention - Green
  success: {
    color: '#FFFFFF',
    backgroundColor: '#24a148',
    icon: 'check-circle',
    shape: 'circle',
    severity: 'low',
    label: 'Success',
  },
  complete: {
    color: '#FFFFFF',
    backgroundColor: '#24a148',
    icon: 'check',
    shape: 'circle',
    severity: 'low',
    label: 'Complete',
  },
  approved: {
    color: '#FFFFFF',
    backgroundColor: '#24a148',
    icon: 'check-circle',
    shape: 'circle',
    severity: 'low',
    label: 'Approved',
  },
  active: {
    color: '#FFFFFF',
    backgroundColor: '#24a148',
    icon: 'check',
    shape: 'circle',
    severity: 'low',
    label: 'Active',
  },
  enabled: {
    color: '#FFFFFF',
    backgroundColor: '#24a148',
    icon: 'check',
    shape: 'circle',
    severity: 'low',
    label: 'Enabled',
  },

  // Informational - Blue
  info: {
    color: '#FFFFFF',
    backgroundColor: '#0043ce',
    icon: 'info',
    shape: 'circle',
    severity: 'info',
    label: 'Info',
  },
  new: {
    color: '#FFFFFF',
    backgroundColor: '#0043ce',
    icon: 'star',
    shape: 'circle',
    severity: 'info',
    label: 'New',
  },
  updated: {
    color: '#FFFFFF',
    backgroundColor: '#0043ce',
    icon: 'refresh',
    shape: 'circle',
    severity: 'info',
    label: 'Updated',
  },

  // Neutral - Gray
  draft: {
    color: '#FFFFFF',
    backgroundColor: '#6f6f6f',
    icon: 'edit',
    shape: 'circle',
    severity: 'neutral',
    label: 'Draft',
  },
  inactive: {
    color: '#FFFFFF',
    backgroundColor: '#6f6f6f',
    icon: 'remove',
    shape: 'circle',
    severity: 'neutral',
    label: 'Inactive',
  },
  disabled: {
    color: '#FFFFFF',
    backgroundColor: '#6f6f6f',
    icon: 'close',
    shape: 'circle',
    severity: 'neutral',
    label: 'Disabled',
  },
  unknown: {
    color: '#FFFFFF',
    backgroundColor: '#6f6f6f',
    icon: 'help',
    shape: 'circle',
    severity: 'neutral',
    label: 'Unknown',
  },

  // Special - Purple
  beta: {
    color: '#FFFFFF',
    backgroundColor: '#8a3ffc',
    icon: 'zap',
    shape: 'diamond',
    severity: 'info',
    label: 'Beta',
  },
  experimental: {
    color: '#FFFFFF',
    backgroundColor: '#8a3ffc',
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
