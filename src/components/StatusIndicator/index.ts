/**
 * Status Indicator Module
 * Comprehensive status indicator components for Trinity Design System
 * 
 * @module StatusIndicator
 */

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
// SHAPE COMPONENTS
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
// CORE INDICATORS
// ============================================================================
export {
  IconIndicator,
  ShapeIndicator,
  StatusDot,
  type IconIndicatorProps,
  type ShapeIndicatorProps,
  type StatusDotProps,
} from './Indicators';

// ============================================================================
// BADGE & DIFFERENTIAL
// ============================================================================
export {
  BadgeIndicator,
  DifferentialIndicator,
  type BadgeIndicatorProps,
  type DifferentialIndicatorProps,
} from './Badge';

// ============================================================================
// CHIP & INLINE
// ============================================================================
export {
  StatusChip,
  InlineStatus,
  type StatusChipProps,
  type InlineStatusProps,
} from './Chip';

// ============================================================================
// LEGEND
// ============================================================================
export {
  StatusLegend,
  type StatusLegendItem,
  type StatusLegendProps,
} from './Legend';
