/**
 * Chart Design Tokens
 * Consistent styling for all Trinity chart components
 */

import { brandColors, baseTokens, semanticTokens } from '../../tokens';

// Convenience alias for gray scale access
const gray = baseTokens.colors.gray;

// ============================================================================
// COLOR PALETTES
// ============================================================================

/**
 * Primary chart color palette - Trinity brand colors
 * Use for single-series or highlighted data
 */
export const chartColorsPrimary = [
  brandColors.primary.light,     // Purple (#7841C9)
  brandColors.secondary.main,    // Coral (#FF6150)
  brandColors.primary.main,      // Navy (#0A2540)
  '#24A148',                     // Green (success)
  '#F59E0B',                     // Amber (warning)
  '#3B82F6',                     // Blue
  '#8B5CF6',                     // Violet
  '#EC4899',                     // Pink
  '#14B8A6',                     // Teal
  '#F97316',                     // Orange
];

/**
 * Categorical palette - for distinct categories
 * Optimized for contrast and accessibility
 */
export const chartColorsCategorical = [
  '#7841C9',  // Purple
  '#FF6150',  // Coral
  '#3B82F6',  // Blue
  '#24A148',  // Green
  '#F59E0B',  // Amber
  '#EC4899',  // Pink
  '#14B8A6',  // Teal
  '#8B5CF6',  // Violet
  '#F97316',  // Orange
  '#6366F1',  // Indigo
];

/**
 * Sequential palette - for continuous data
 * Purple gradient from light to dark (uses baseTokens.colors.indigo scale)
 */
const indigo = baseTokens.colors.indigo;
export const chartColorsSequential = [
  indigo[50],   // #EDE7FD
  indigo[100],  // #D2C3FA
  indigo[200],  // #B49CF6
  indigo[300],  // #9574F2
  indigo[400],  // #7E57F0
  indigo[500],  // #6739ED
  indigo[600],  // #5F33EB
  indigo[700],  // #542CE8
  indigo[800],  // #4A24E5
  indigo[900],  // #3816A0
];

/**
 * Diverging palette - for data with a midpoint
 * Coral to Purple through neutral
 */
export const chartColorsDiverging = [
  '#FF6150',  // Coral (negative)
  '#FF8D85',  // Light coral
  '#FFD7D4',  // Very light coral
  '#F5F5F5',  // Neutral
  '#D2C3FA',  // Light purple
  '#9574F2',  // Medium purple
  '#7841C9',  // Purple (positive)
];

/**
 * Status colors for charts (as object for semantic access)
 */
export const chartColorsStatusMap = {
  success: '#24A148',
  warning: '#F59E0B',
  error: '#DA1E28',
  info: '#3B82F6',
  neutral: brandColors.neutral.gray500,
};

/**
 * Status colors for charts (as array for iteration)
 * Order: success, warning, error, info
 */
export const chartColorsStatus = [
  '#24A148',  // success
  '#F59E0B',  // warning
  '#DA1E28',  // error
  '#3B82F6',  // info
];

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const chartTypography = {
  fontFamily: '"Montserrat", sans-serif',
  title: {
    fontSize: 16,
    fontWeight: 600,
    fill: gray[900],
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 400,
    fill: brandColors.neutral.gray500,
  },
  axisLabel: {
    fontSize: 12,
    fontWeight: 500,
    fill: brandColors.neutral.gray600,
  },
  axisTick: {
    fontSize: 11,
    fontWeight: 400,
    fill: brandColors.neutral.gray500,
  },
  legend: {
    fontSize: 12,
    fontWeight: 500,
    fill: gray[700],
  },
  tooltip: {
    fontSize: 12,
    fontWeight: 400,
    fill: gray[700],
  },
  tooltipLabel: {
    fontSize: 13,
    fontWeight: 600,
    fill: gray[900],
  },
  dataLabel: {
    fontSize: 11,
    fontWeight: 500,
    fill: gray[700],
  },
};

// ============================================================================
// SPACING & SIZING
// ============================================================================

export const chartSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const chartSizing = {
  // Default chart dimensions
  minHeight: 200,
  defaultHeight: 300,
  maxHeight: 600,
  
  // Stroke widths
  strokeWidth: {
    thin: 1,
    default: 2,
    thick: 3,
  },
  
  // Dot/point sizes
  dotSize: {
    small: 4,
    default: 6,
    large: 8,
  },
  
  // Bar sizing
  barRadius: 4,
  barMaxWidth: 60,
  
  // Pie/Donut sizing
  innerRadiusRatio: 0.6, // For donut charts
  outerPadding: 8,
};

// ============================================================================
// GRID & AXIS STYLES
// ============================================================================

export const chartGridStyles = {
  // Flat properties for simple access
  stroke: gray[200],
  strokeDasharray: '3 3',
  strokeWidth: 1,
  // Theme-specific properties
  light: {
    stroke: gray[200],
    strokeOpacity: 1,
  },
  dark: {
    stroke: gray[700],
    strokeOpacity: 0.5,
  },
};

export const chartAxisStyles = {
  // Flat properties for simple access
  stroke: gray[300],
  strokeWidth: 1,
  tickSize: 6,
  tickPadding: 8,
  tickFontSize: 11,
  labelFontSize: 12,
  // Theme-specific properties
  light: {
    lineColor: gray[300],
    lineOpacity: 1,
    tickColor: brandColors.neutral.gray500,
  },
  dark: {
    lineColor: brandColors.neutral.gray600,
    lineOpacity: 0.5,
    tickColor: brandColors.neutral.gray400,
  },
};

// ============================================================================
// TOOLTIP STYLES
// ============================================================================

export const chartTooltipStyles = {
  backgroundColor: '#FFFFFF',
  borderColor: gray[200],
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '12px 16px',
};

// ============================================================================
// LEGEND STYLES
// ============================================================================

export const chartLegendStyles = {
  iconSize: 12,
  iconType: 'circle' as const,
  itemGap: 24,
  verticalAlign: 'bottom' as const,
  align: 'center' as const,
  wrapperStyle: {
    paddingTop: 16,
  },
};

// ============================================================================
// ANIMATION
// ============================================================================

export const chartAnimation = {
  duration: 400,
  easing: 'ease-out',
};

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const chartAccessibility = {
  // Minimum contrast ratio for text
  minContrastRatio: 4.5,
  // Focus ring styles
  focusRing: {
    color: brandColors.primary.light,
    width: 2,
    offset: 2,
  },
};

// ============================================================================
// THEME PRESETS
// ============================================================================

export const chartTheme = {
  light: {
    background: '#FFFFFF',
    text: gray[900],
    textSecondary: brandColors.neutral.gray500,
    grid: gray[200],
    axis: gray[300],
    tooltip: {
      background: '#FFFFFF',
      border: gray[200],
      text: gray[700],
    },
  },
  dark: {
    background: brandColors.neutral.darkPaper,
    text: brandColors.neutral.white,
    textSecondary: brandColors.neutral.gray400,
    grid: semanticTokens.effects.onDark.emphasis, // 8% white - grid lines
    axis: semanticTokens.effects.onDark.divider, // 12% white - axis (slightly stronger)
    tooltip: {
      background: brandColors.neutral.darkPaper,
      border: semanticTokens.effects.onDark.emphasis, // 8% white - tooltip border
      text: gray[300],
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get a color from the primary palette by index (wraps around)
 */
export const getChartColor = (index: number): string => {
  return chartColorsPrimary[index % chartColorsPrimary.length];
};

/**
 * Get multiple colors for a given number of series
 */
export const getChartColors = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => getChartColor(i));
};

/**
 * Generate gradient ID for unique gradients
 */
export const generateGradientId = (prefix: string = 'gradient'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};
