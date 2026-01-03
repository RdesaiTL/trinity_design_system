/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * DOMAIN TOKENS: Charts
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Chart-specific tokens that extend the canonical token system.
 * ALL values derive from base/semantic tokens — NO raw hex codes allowed.
 * 
 * @module foundations/tokens/domains/charts
 */

import { colors, spacing, fontSize, fontWeight, borderRadius, duration, easing } from '../base';
import { brand, text, background, border } from '../semantic';
import { darkMode } from '../contextual';

// ═══════════════════════════════════════════════════════════════════════════════
// CHART COLOR PALETTES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Primary chart colors - Trinity brand colors first
 * Optimized for contrast and accessibility
 */
export const chartColorsPrimary = [
  colors.purple[700],      // Primary brand purple
  colors.coral[800],       // Accent coral
  colors.navy[900],        // Primary navy
  colors.status.success[600],   // Green
  colors.status.warning[500],   // Amber
  colors.status.info[500],      // Blue
  colors.purple[500],      // Lighter purple
  colors.coral[500],       // Lighter coral
  colors.azure[500],       // Teal
  colors.coral[600],       // Orange-ish coral
] as const;

/**
 * Categorical palette - for distinct categories
 * 10 colors optimized for maximum differentiation
 */
export const chartColorsCategorical = [
  colors.purple[700],
  colors.coral[800],
  colors.status.info[500],
  colors.status.success[600],
  colors.status.warning[500],
  colors.coral[500],
  colors.azure[500],
  colors.purple[500],
  colors.coral[600],
  colors.indigo[600],
] as const;

/**
 * Sequential palette - for continuous data
 * Indigo gradient from light to dark
 */
export const chartColorsSequential = [
  colors.indigo[50],
  colors.indigo[100],
  colors.indigo[200],
  colors.indigo[300],
  colors.indigo[400],
  colors.indigo[500],
  colors.indigo[600],
  colors.indigo[700],
  colors.indigo[800],
  colors.indigo[900],
] as const;

/**
 * Diverging palette - for data with a midpoint
 * Coral (negative) → Neutral → Purple (positive)
 */
export const chartColorsDiverging = [
  colors.coral[800],
  colors.coral[400],
  colors.coral[100],
  colors.gray[100],
  colors.purple[100],
  colors.purple[400],
  colors.purple[700],
] as const;

/**
 * Status colors for semantic chart data
 */
export const chartColorsStatus = {
  success: colors.status.success[600],
  warning: colors.status.warning[500],
  error: colors.status.error[600],
  info: colors.status.info[500],
  neutral: colors.gray[500],
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════════════════

export const chartTypography = {
  fontFamily: '"Montserrat", sans-serif',
  
  title: {
    fontSize: 16,
    fontWeight: fontWeight.semibold,
    fill: colors.gray[900],
  },
  subtitle: {
    fontSize: 13,
    fontWeight: fontWeight.regular,
    fill: colors.gray[500],
  },
  axisLabel: {
    fontSize: 12,
    fontWeight: fontWeight.medium,
    fill: colors.gray[600],
  },
  axisTick: {
    fontSize: 11,
    fontWeight: fontWeight.regular,
    fill: colors.gray[500],
  },
  legend: {
    fontSize: 12,
    fontWeight: fontWeight.medium,
    fill: colors.gray[700],
  },
  tooltip: {
    fontSize: 12,
    fontWeight: fontWeight.regular,
    fill: colors.gray[700],
  },
  tooltipLabel: {
    fontSize: 13,
    fontWeight: fontWeight.semibold,
    fill: colors.gray[900],
  },
  dataLabel: {
    fontSize: 11,
    fontWeight: fontWeight.medium,
    fill: colors.gray[700],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART SPACING & SIZING
// ═══════════════════════════════════════════════════════════════════════════════

export const chartSpacing = {
  xs: spacing[1],   // 4px
  sm: spacing[2],   // 8px
  md: spacing[3],   // 12px
  lg: spacing[4],   // 16px
  xl: spacing[6],   // 24px
  xxl: spacing[8],  // 32px
} as const;

export const chartSizing = {
  minHeight: 200,
  defaultHeight: 300,
  maxHeight: 600,
  
  strokeWidth: {
    thin: 1,
    default: 2,
    thick: 3,
  },
  
  dotSize: {
    small: 4,
    default: 6,
    large: 8,
  },
  
  barRadius: borderRadius.xs,
  barMaxWidth: 60,
  
  innerRadiusRatio: 0.6,
  outerPadding: spacing[2],
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART GRID & AXIS STYLES
// ═══════════════════════════════════════════════════════════════════════════════

export const chartGrid = {
  stroke: colors.gray[200],
  strokeDasharray: '3 3',
  strokeWidth: 1,
  
  light: {
    stroke: colors.gray[200],
    strokeOpacity: 1,
  },
  dark: {
    stroke: colors.gray[700],
    strokeOpacity: 0.5,
  },
} as const;

export const chartAxis = {
  stroke: colors.gray[300],
  strokeWidth: 1,
  tickSize: 6,
  tickPadding: spacing[2],
  tickFontSize: 11,
  labelFontSize: 12,
  
  light: {
    lineColor: colors.gray[300],
    lineOpacity: 1,
    tickColor: colors.gray[500],
  },
  dark: {
    lineColor: colors.gray[600],
    lineOpacity: 0.5,
    tickColor: colors.gray[400],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART TOOLTIP STYLES
// ═══════════════════════════════════════════════════════════════════════════════

export const chartTooltip = {
  backgroundColor: background.elevated,
  borderColor: border.default,
  borderRadius: borderRadius.md,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: `${spacing[3]}px ${spacing[4]}px`,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART LEGEND STYLES
// ═══════════════════════════════════════════════════════════════════════════════

export const chartLegend = {
  iconSize: 12,
  iconType: 'circle' as const,
  itemGap: spacing[6],
  verticalAlign: 'bottom' as const,
  align: 'center' as const,
  wrapperStyle: {
    paddingTop: spacing[4],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART ANIMATION
// ═══════════════════════════════════════════════════════════════════════════════

export const chartAnimation = {
  duration: 400,
  easing: easing.out,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART ACCESSIBILITY
// ═══════════════════════════════════════════════════════════════════════════════

export const chartAccessibility = {
  minContrastRatio: 4.5,
  focusRing: {
    color: brand.secondary,
    width: 2,
    offset: 2,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART THEME PRESETS
// ═══════════════════════════════════════════════════════════════════════════════

export const chartTheme = {
  light: {
    background: background.primary,
    text: colors.gray[900],
    textSecondary: colors.gray[500],
    grid: colors.gray[200],
    axis: colors.gray[300],
    tooltip: {
      background: background.primary,
      border: border.default,
      text: colors.gray[700],
    },
  },
  dark: {
    background: darkMode.background.primary,
    text: darkMode.text.primary,
    textSecondary: darkMode.text.secondary,
    grid: 'rgba(255, 255, 255, 0.1)',
    axis: 'rgba(255, 255, 255, 0.2)',
    tooltip: {
      background: darkMode.background.elevated,
      border: darkMode.border.default,
      text: darkMode.text.secondary,
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED CHART TOKENS EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const chartTokens = {
  colors: {
    primary: chartColorsPrimary,
    categorical: chartColorsCategorical,
    sequential: chartColorsSequential,
    diverging: chartColorsDiverging,
    status: chartColorsStatus,
  },
  typography: chartTypography,
  spacing: chartSpacing,
  sizing: chartSizing,
  grid: chartGrid,
  axis: chartAxis,
  tooltip: chartTooltip,
  legend: chartLegend,
  animation: chartAnimation,
  accessibility: chartAccessibility,
  theme: chartTheme,
  utils: {
    getChartColor,
    getChartColors,
  },
} as const;

export type ChartTokens = typeof chartTokens;

export default chartTokens;
