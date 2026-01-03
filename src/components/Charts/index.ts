/**
 * Trinity Design System - Charts Component Library
 * 
 * A comprehensive charting library built on Recharts with Trinity branding,
 * accessibility support, and consistent styling.
 * 
 * @example
 * ```tsx
 * import { 
 *   LineChart, 
 *   BarChart, 
 *   PieChart, 
 *   chartColorsPrimary 
 * } from '@trinity/design-system/components/Charts';
 * 
 * // Basic line chart
 * <LineChart
 *   data={salesData}
 *   series={[{ dataKey: 'revenue', name: 'Revenue' }]}
 *   xAxis={{ dataKey: 'month' }}
 *   title="Monthly Revenue"
 * />
 * 
 * // Bar chart with stacking
 * <BarChart
 *   data={data}
 *   series={[
 *     { dataKey: 'desktop', name: 'Desktop' },
 *     { dataKey: 'mobile', name: 'Mobile' },
 *   ]}
 *   variant="stacked"
 * />
 * ```
 */

// Core Components
export { ChartWrapper } from './ChartWrapper';
export { CustomTooltip, SimpleTooltip } from './CustomTooltip';
export { CustomLegend, InteractiveLegend, PieLegend } from './CustomLegend';

// Chart Components
export { LineChart } from './LineChart';
export { BarChart } from './BarChart';
export { AreaChart } from './AreaChart';
export { PieChart, DonutChart } from './PieChart';
export { ScatterChart, BubbleChart } from './ScatterChart';
export { RadialBarChart, GaugeChart } from './RadialChart';
export { ComposedChart } from './ComposedChart';
export { Sparkline } from './Sparkline';

// Design Tokens
export {
  // Color Palettes
  chartColorsPrimary,
  chartColorsCategorical,
  chartColorsSequential,
  chartColorsDiverging,
  chartColorsStatus,
  chartColorsStatusMap,
  
  // Typography
  chartTypography,
  
  // Spacing & Sizing
  chartSpacing,
  chartSizing,
  
  // Styling
  chartGridStyles,
  chartAxisStyles,
  chartTooltipStyles,
  chartLegendStyles,
  
  // Animation
  chartAnimation,
  
  // Theme
  chartTheme,
  
  // Utility Functions
  getChartColor,
  getChartColors,
} from './tokens';

// Types
export type {
  // Data Types
  DataPoint,
  NamedDataPoint,
  TimeSeriesDataPoint,
  MultiSeriesDataPoint,
  PieDataPoint,
  ScatterDataPoint,
  
  // Configuration Types
  SeriesConfig,
  AxisConfig,
  LegendConfig,
  LegendPosition,
  LegendAlign,
  TooltipConfig,
  ReferenceLineConfig,
  ReferenceAreaConfig,
  
  // Chart Props
  BaseChartProps,
  LineChartProps,
  BarChartProps,
  BarChartLayout,
  BarChartVariant,
  AreaChartProps,
  PieChartProps,
  ScatterChartProps,
  ComposedChartProps,
  ComposedSeriesConfig,
  ComposedChartReferenceLineConfig,
  RadialBarChartProps,
  GaugeChartProps,
  SparklineProps,
} from './types';
