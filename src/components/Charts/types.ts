/**
 * Chart Types and Common Interfaces
 * Shared type definitions for all chart components
 */

import { SxProps, Theme } from '@mui/material';

// ============================================================================
// DATA TYPES
// ============================================================================

/**
 * Base data point interface
 */
export interface DataPoint {
  [key: string]: string | number | null | undefined;
}

/**
 * Named data point with label
 */
export interface NamedDataPoint extends DataPoint {
  name: string;
  value: number;
}

/**
 * Time series data point
 */
export interface TimeSeriesDataPoint extends DataPoint {
  date: string | Date;
  value: number;
}

/**
 * Multi-series data point
 */
export interface MultiSeriesDataPoint {
  name: string;
  [key: string]: string | number;
}

/**
 * Pie/Donut segment data
 */
export interface PieDataPoint {
  name: string;
  value: number;
  color?: string;
}

/**
 * Scatter plot data point
 */
export interface ScatterDataPoint {
  x: number;
  y: number;
  z?: number; // For bubble charts
  name?: string;
  category?: string;
}

// ============================================================================
// SERIES CONFIGURATION
// ============================================================================

/**
 * Series configuration for line/area/bar charts
 */
export interface SeriesConfig {
  /** Data key for this series */
  dataKey: string;
  /** Display name for legend/tooltip */
  name?: string;
  /** Series color */
  color?: string;
  /** Stack ID for stacked charts */
  stackId?: string;
  /** Whether to show dots/points */
  showDots?: boolean;
  /** Stroke/line style */
  strokeDasharray?: string;
  /** Fill opacity for area charts */
  fillOpacity?: number;
}

// ============================================================================
// AXIS CONFIGURATION
// ============================================================================

/**
 * Axis configuration
 */
export interface AxisConfig {
  /** Data key for the axis */
  dataKey?: string;
  /** Axis label */
  label?: string;
  /** Format function for tick values */
  tickFormatter?: (value: number | string) => string;
  /** Domain for numeric axes [min, max] or 'auto' */
  domain?: [number | string, number | string];
  /** Number of ticks */
  tickCount?: number;
  /** Hide axis */
  hide?: boolean;
  /** Axis type */
  type?: 'number' | 'category';
  /** Angle for tick labels */
  angle?: number;
  /** Unit suffix for values */
  unit?: string;
}

// ============================================================================
// LEGEND CONFIGURATION
// ============================================================================

export type LegendPosition = 'top' | 'bottom' | 'left' | 'right';
export type LegendAlign = 'left' | 'center' | 'right';

export interface LegendConfig {
  /** Show/hide legend */
  show?: boolean;
  /** Legend position */
  position?: LegendPosition;
  /** Legend alignment */
  align?: LegendAlign;
  /** Custom legend formatter */
  formatter?: (value: string) => string;
}

// ============================================================================
// TOOLTIP CONFIGURATION
// ============================================================================

export interface TooltipConfig {
  /** Show/hide tooltip */
  show?: boolean;
  /** Custom tooltip formatter */
  formatter?: (value: number, name: string) => [string, string];
  /** Label formatter */
  labelFormatter?: (label: string) => string;
  /** Cursor style */
  cursor?: boolean | object;
}

// ============================================================================
// REFERENCE LINE/AREA
// ============================================================================

export interface ReferenceLineConfig {
  /** Value for the reference line */
  value: number | string;
  /** Axis for the reference line */
  axis: 'x' | 'y';
  /** Label for the reference line */
  label?: string;
  /** Line color */
  color?: string;
  /** Line style */
  strokeDasharray?: string;
}

export interface ReferenceAreaConfig {
  /** Start value */
  start: number | string;
  /** End value */
  end: number | string;
  /** Axis for the reference area */
  axis: 'x' | 'y';
  /** Label for the reference area */
  label?: string;
  /** Fill color */
  color?: string;
  /** Fill opacity */
  opacity?: number;
}

// ============================================================================
// CHART CONTAINER PROPS
// ============================================================================

/**
 * Common props for all chart components
 */
export interface BaseChartProps {
  /** Chart data */
  data: DataPoint[];
  /** Chart height */
  height?: number;
  /** Chart width (defaults to 100% responsive) */
  width?: number | string;
  /** Chart title */
  title?: string;
  /** Chart subtitle/description */
  subtitle?: string;
  /** Chart margin */
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  /** Custom colors array */
  colors?: string[];
  /** Show grid lines */
  showGrid?: boolean;
  /** Grid line direction */
  gridDirection?: 'horizontal' | 'vertical' | 'both';
  /** X-axis configuration */
  xAxis?: AxisConfig;
  /** Y-axis configuration */
  yAxis?: AxisConfig;
  /** Legend configuration */
  legend?: LegendConfig;
  /** Tooltip configuration */
  tooltip?: TooltipConfig;
  /** Enable animation */
  animate?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Error state */
  error?: string;
  /** Custom sx props for container */
  sx?: SxProps<Theme>;
  /** Click handler for data points */
  onDataPointClick?: (data: DataPoint, index: number) => void;
  /** Accessibility label */
  ariaLabel?: string;
}

// ============================================================================
// LINE CHART PROPS
// ============================================================================

export interface LineChartProps extends BaseChartProps {
  /** Series configuration */
  series: SeriesConfig[];
  /** Curve type */
  curveType?: 'linear' | 'monotone' | 'step' | 'natural';
  /** Show area fill under lines */
  showArea?: boolean;
  /** Connect null values */
  connectNulls?: boolean;
  /** Reference lines */
  referenceLines?: ReferenceLineConfig[];
}

// ============================================================================
// BAR CHART PROPS
// ============================================================================

export type BarChartLayout = 'vertical' | 'horizontal';
export type BarChartVariant = 'grouped' | 'stacked' | 'stacked-percent';

export interface BarChartProps extends BaseChartProps {
  /** Series configuration */
  series: SeriesConfig[];
  /** Chart layout */
  layout?: BarChartLayout;
  /** Bar chart variant */
  variant?: BarChartVariant;
  /** Bar corner radius */
  barRadius?: number | [number, number, number, number];
  /** Maximum bar width */
  maxBarWidth?: number;
  /** Gap between bar groups (0-1) */
  barGap?: number;
  /** Gap between bars in a group (0-1) */
  barCategoryGap?: number;
  /** Reference lines */
  referenceLines?: ReferenceLineConfig[];
}

// ============================================================================
// AREA CHART PROPS
// ============================================================================

export interface AreaChartProps extends BaseChartProps {
  /** Series configuration */
  series: SeriesConfig[];
  /** Curve type */
  curveType?: 'linear' | 'monotone' | 'step' | 'natural';
  /** Use gradient fill */
  gradient?: boolean;
  /** Stacked area chart */
  stacked?: boolean;
  /** Connect null values */
  connectNulls?: boolean;
  /** Reference lines */
  referenceLines?: ReferenceLineConfig[];
}

// ============================================================================
// PIE/DONUT CHART PROPS
// ============================================================================

export interface PieChartProps {
  /** Pie data */
  data: PieDataPoint[];
  /** Chart height */
  height?: number;
  /** Chart width */
  width?: number | string;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Make it a donut chart (inner radius ratio 0-1) */
  innerRadius?: number;
  /** Padding angle between segments */
  paddingAngle?: number;
  /** Corner radius of segments */
  cornerRadius?: number;
  /** Start angle in degrees */
  startAngle?: number;
  /** End angle in degrees */
  endAngle?: number;
  /** Show labels on segments */
  showLabels?: boolean;
  /** Label type */
  labelType?: 'value' | 'percent' | 'name';
  /** Custom colors */
  colors?: string[];
  /** Legend configuration */
  legend?: LegendConfig;
  /** Tooltip configuration */
  tooltip?: TooltipConfig;
  /** Enable animation */
  animate?: boolean;
  /** Animation duration */
  animationDuration?: number;
  /** Loading state */
  loading?: boolean;
  /** Empty message */
  emptyMessage?: string;
  /** Error state */
  error?: string;
  /** Custom center content (for donut) */
  centerContent?: React.ReactNode;
  /** Custom sx props */
  sx?: SxProps<Theme>;
  /** Click handler */
  onSegmentClick?: (data: PieDataPoint, index: number) => void;
  /** Accessibility label */
  ariaLabel?: string;
}

// ============================================================================
// SCATTER/BUBBLE CHART PROPS
// ============================================================================

export interface ScatterChartProps {
  /** Scatter data (can be multiple series) */
  data: ScatterDataPoint[] | { name: string; data: ScatterDataPoint[]; color?: string }[];
  /** Chart height */
  height?: number;
  /** Chart width */
  width?: number | string;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** X-axis configuration */
  xAxis?: AxisConfig & { label?: string };
  /** Y-axis configuration */
  yAxis?: AxisConfig & { label?: string };
  /** Z-axis (size) configuration for bubble charts */
  zAxis?: { domain?: [number, number]; range?: [number, number] };
  /** Custom colors */
  colors?: string[];
  /** Show grid */
  showGrid?: boolean;
  /** Legend configuration */
  legend?: LegendConfig;
  /** Tooltip configuration */
  tooltip?: TooltipConfig;
  /** Enable animation */
  animate?: boolean;
  /** Animation duration */
  animationDuration?: number;
  /** Loading state */
  loading?: boolean;
  /** Empty message */
  emptyMessage?: string;
  /** Error state */
  error?: string;
  /** Custom sx props */
  sx?: SxProps<Theme>;
  /** Click handler */
  onPointClick?: (data: ScatterDataPoint, index: number) => void;
  /** Accessibility label */
  ariaLabel?: string;
}

// ============================================================================
// COMPOSED CHART PROPS
// ============================================================================

export interface ComposedSeriesConfig {
  /** Data key for this series */
  key: string;
  /** Chart type for this series */
  type: 'line' | 'bar' | 'area';
  /** Display name for legend/tooltip */
  name?: string;
  /** Series color */
  color?: string;
  /** Y-axis ID ('left' or 'right') */
  yAxisId?: 'left' | 'right';
  /** Curve type for line/area */
  curve?: 'linear' | 'monotone' | 'step' | 'natural';
  /** Stroke width */
  strokeWidth?: number;
  /** Show dots on line */
  showDots?: boolean;
  /** Stroke dash array for dashed lines */
  strokeDasharray?: string;
  /** Fill opacity for area charts */
  fillOpacity?: number;
  /** Max bar size for bar charts */
  maxBarSize?: number;
}

export interface ComposedChartReferenceLineConfig {
  /** Y value for horizontal line */
  y?: number;
  /** X value for vertical line */
  x?: number | string;
  /** Line color */
  color?: string;
  /** Dash pattern */
  strokeDasharray?: string;
  /** Line width */
  strokeWidth?: number;
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom' | 'insideLeft' | 'insideRight';
  /** Y-axis ID */
  yAxisId?: 'left' | 'right';
}

export interface ComposedChartProps {
  /** Chart data */
  data: DataPoint[];
  /** X-axis data key */
  xAxisKey: string;
  /** Series configuration with type */
  series: ComposedSeriesConfig[];
  /** Chart height */
  height?: number;
  /** Chart width */
  width?: number | string;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** X-axis configuration */
  xAxis?: AxisConfig;
  /** Left Y-axis configuration */
  yAxis?: AxisConfig;
  /** Right Y-axis configuration */
  yAxisRight?: AxisConfig;
  /** Grid configuration */
  grid?: { show?: boolean; horizontal?: boolean; vertical?: boolean };
  /** Legend configuration */
  legend?: LegendConfig;
  /** Tooltip configuration */
  tooltip?: TooltipConfig;
  /** Enable animation */
  animate?: boolean;
  /** Reference lines */
  referenceLines?: ComposedChartReferenceLineConfig[];
  /** Custom colors array */
  colors?: string[];
  /** Gap between bars */
  barGap?: number;
  /** Gap between bar categories */
  barCategoryGap?: number | string;
  /** Custom sx props */
  sx?: SxProps<Theme>;
  /** Accessibility label */
  ariaLabel?: string;
}

// ============================================================================
// RADIAL/GAUGE CHART PROPS
// ============================================================================

export interface RadialBarChartProps {
  /** Data for radial bars */
  data: NamedDataPoint[];
  /** Chart height */
  height?: number;
  /** Chart width */
  width?: number | string;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Inner radius (0-1 or pixels) */
  innerRadius?: number | string;
  /** Outer radius (0-1 or pixels) */
  outerRadius?: number | string;
  /** Start angle */
  startAngle?: number;
  /** End angle */
  endAngle?: number;
  /** Custom colors */
  colors?: string[];
  /** Show labels */
  showLabels?: boolean;
  /** Legend configuration */
  legend?: LegendConfig;
  /** Enable animation */
  animate?: boolean;
  /** Custom sx props */
  sx?: SxProps<Theme>;
  /** Accessibility label */
  ariaLabel?: string;
}

export interface GaugeChartProps {
  /** Current value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Chart height */
  height?: number;
  /** Chart width */
  width?: number | string;
  /** Chart title */
  title?: string;
  /** Value label */
  valueLabel?: string;
  /** Unit suffix */
  unit?: string;
  /** Color thresholds */
  thresholds?: { value: number; color: string }[];
  /** Default color */
  color?: string;
  /** Show value in center */
  showValue?: boolean;
  /** Value formatter */
  valueFormatter?: (value: number) => string;
  /** Enable animation */
  animate?: boolean;
  /** Custom sx props */
  sx?: SxProps<Theme>;
  /** Accessibility label */
  ariaLabel?: string;
}

// ============================================================================
// SPARKLINE PROPS
// ============================================================================

export interface SparklineProps {
  /** Sparkline data (array of numbers) */
  data: number[];
  /** Sparkline type */
  type?: 'line' | 'bar' | 'area';
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Color */
  color?: string;
  /** Show reference line (e.g., average) */
  referenceLine?: number | 'average' | 'median';
  /** Reference line color */
  referenceLineColor?: string;
  /** Show min/max points */
  showMinMax?: boolean;
  /** Min point color */
  minColor?: string;
  /** Max point color */
  maxColor?: string;
  /** Enable animation */
  animate?: boolean;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}
