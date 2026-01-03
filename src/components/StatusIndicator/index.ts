/**
 * Status Indicator Module
 * Comprehensive status indicator components for Trinity Design System
 * 
 * @module StatusIndicator
 * @version 2.0.0
 * 
 * ## Migration to v2.0
 * 
 * The new unified `StatusIndicator` component replaces individual components:
 * 
 * | Old Component         | New Usage                                          |
 * |-----------------------|---------------------------------------------------|
 * | `IconIndicator`       | `<StatusIndicator variant="icon" />`              |
 * | `ShapeIndicator`      | `<StatusIndicator variant="shape" />`             |
 * | `StatusDot`           | `<StatusIndicator variant="dot" />`               |
 * | `StatusChip`          | `<StatusIndicator variant="chip" />`              |
 * | `InlineStatus`        | `<StatusIndicator variant="inline" />`            |
 * | `BadgeIndicator`      | `<StatusIndicator variant="badge">{children}</StatusIndicator>` |
 * | `DifferentialIndicator` | `<StatusIndicator variant="differential" value={n} />` |
 * 
 * Legacy exports are preserved for backward compatibility but are deprecated.
 */

// ============================================================================
// PRIMARY EXPORT - NEW UNIFIED COMPONENT
// ============================================================================
export {
  StatusIndicator,
  default as StatusIndicatorDefault,
  type StatusIndicatorProps,
  type StatusVariant,
} from './StatusIndicator';

// ============================================================================
// TYPES & CONFIGURATION
// ============================================================================
export {
  // Types
  type StatusType,
  type SeverityLevel,
  type StatusShape,
  type StatusSize,
  type StatusConfig,
  // Configuration
  statusConfigs,
  sizeConfigs,
  // Utility functions
  getStatusConfig,
  getAllStatusTypes,
  getStatusTypesBySeverity,
} from './types';

// ============================================================================
// SHAPE COMPONENTS (Internal use)
// ============================================================================
export {
  type ShapeProps,
  CircleShape,
  SquareShape,
  DiamondShape,
  TriangleShape,
  HexagonShape,
  ShapeComponents,
} from './Shapes';

// ============================================================================
// LEGACY EXPORTS (Deprecated - use StatusIndicator instead)
// ============================================================================

/**
 * @deprecated Use `<StatusIndicator variant="icon" />` instead
 */
export { IconIndicator } from './Indicators';

/**
 * @deprecated Use `<StatusIndicator variant="shape" />` instead
 */
export { ShapeIndicator } from './Indicators';

/**
 * @deprecated Use `<StatusIndicator variant="dot" />` instead
 */
export { StatusDot } from './Indicators';

/**
 * @deprecated Use `<StatusIndicator variant="chip" />` instead
 */
export { StatusChip } from './Chip';

/**
 * @deprecated Use `<StatusIndicator variant="inline" />` instead
 */
export { InlineStatus } from './Chip';

/**
 * @deprecated Use `<StatusIndicator variant="badge" />` instead
 */
export { BadgeIndicator } from './Badge';

/**
 * @deprecated Use `<StatusIndicator variant="differential" />` instead
 */
export { DifferentialIndicator } from './Badge';

// Legacy type exports for backward compatibility
export type { IconIndicatorProps, ShapeIndicatorProps, StatusDotProps } from './Indicators';
export type { StatusChipProps, InlineStatusProps } from './Chip';
export type { BadgeIndicatorProps, DifferentialIndicatorProps } from './Badge';

// ============================================================================
// LEGEND (Unchanged - still a separate component)
// ============================================================================
export {
  StatusLegend,
  type StatusLegendItem,
  type StatusLegendProps,
} from './Legend';
