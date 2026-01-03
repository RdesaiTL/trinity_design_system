/**
 * BarChart Component
 * Trinity-styled bar chart with support for grouped, stacked, and horizontal layouts
 */

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { ChartWrapper } from './ChartWrapper';
import { CustomTooltip } from './CustomTooltip';
import { CustomLegend } from './CustomLegend';
import {
  chartColorsPrimary,
  chartTypography,
  chartGridStyles,
  chartAxisStyles,
  chartSizing,
  chartAnimation,
  getChartColor,
} from './tokens';
import { BarChartProps } from './types';

/**
 * BarChart - Versatile bar chart with Trinity styling
 * 
 * @example
 * ```tsx
 * // Grouped bar chart
 * <BarChart
 *   data={[
 *     { category: 'Q1', sales: 4000, profit: 2400 },
 *     { category: 'Q2', sales: 3000, profit: 1398 },
 *   ]}
 *   series={[
 *     { dataKey: 'sales', name: 'Sales' },
 *     { dataKey: 'profit', name: 'Profit' },
 *   ]}
 *   xAxis={{ dataKey: 'category' }}
 *   title="Quarterly Performance"
 * />
 * 
 * // Stacked bar chart
 * <BarChart
 *   variant="stacked"
 *   series={[
 *     { dataKey: 'desktop', name: 'Desktop', stackId: 'a' },
 *     { dataKey: 'mobile', name: 'Mobile', stackId: 'a' },
 *   ]}
 *   // ...
 * />
 * ```
 */
export const BarChart: React.FC<BarChartProps> = ({
  data,
  series,
  height = chartSizing.defaultHeight,
  width = '100%',
  title,
  subtitle,
  margin = { top: 20, right: 30, left: 20, bottom: 20 },
  colors = chartColorsPrimary,
  showGrid = true,
  gridDirection = 'horizontal',
  xAxis = {},
  yAxis = {},
  legend = { show: true, position: 'bottom' },
  tooltip = { show: true },
  animate = true,
  animationDuration = chartAnimation.duration,
  loading = false,
  emptyMessage,
  error,
  sx,
  layout = 'vertical',
  variant = 'grouped',
  barRadius = chartSizing.barRadius,
  maxBarWidth = chartSizing.barMaxWidth,
  barGap,
  barCategoryGap,
  referenceLines = [],
  onDataPointClick,
  ariaLabel,
}) => {
  const isEmpty = !data || data.length === 0;
  const isHorizontal = layout === 'horizontal';

  // Generate stack IDs for stacked variants
  const getStackId = (s: typeof series[0], index: number) => {
    if (variant === 'stacked' || variant === 'stacked-percent') {
      return s.stackId || 'stack';
    }
    return undefined;
  };

  // Calculate bar radius based on position for stacked charts
  const getBarRadius = (index: number, total: number) => {
    if (variant === 'grouped' || total === 1) {
      return barRadius;
    }
    // For stacked, only round the top bar
    if (index === total - 1) {
      return isHorizontal
        ? [0, barRadius, barRadius, 0]
        : [barRadius, barRadius, 0, 0];
    }
    return 0;
  };

  return (
    <ChartWrapper
      title={title}
      subtitle={subtitle}
      height={height}
      loading={loading}
      error={error}
      empty={isEmpty}
      emptyMessage={emptyMessage}
      sx={sx}
    >
      <ResponsiveContainer width={width} height={height}>
        <RechartsBarChart
          data={data}
          margin={margin}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          barGap={barGap}
          barCategoryGap={barCategoryGap}
          aria-label={ariaLabel || title || 'Bar chart'}
        >
          {/* Grid */}
          {showGrid && (
            <CartesianGrid
              strokeDasharray={chartGridStyles.strokeDasharray}
              stroke={chartGridStyles.stroke}
              vertical={
                isHorizontal
                  ? gridDirection === 'horizontal' || gridDirection === 'both'
                  : gridDirection === 'vertical' || gridDirection === 'both'
              }
              horizontal={
                isHorizontal
                  ? gridDirection === 'vertical' || gridDirection === 'both'
                  : gridDirection === 'horizontal' || gridDirection === 'both'
              }
            />
          )}

          {/* Axes */}
          {isHorizontal ? (
            <>
              <XAxis
                type="number"
                hide={xAxis.hide}
                domain={xAxis.domain as [number, number] | undefined}
                tickFormatter={xAxis.tickFormatter}
                tick={{
                  ...chartTypography.axisTick,
                  fontFamily: chartTypography.fontFamily,
                }}
                axisLine={{ stroke: chartAxisStyles.stroke }}
                tickLine={{ stroke: chartAxisStyles.stroke }}
              />
              <YAxis
                type="category"
                dataKey={yAxis.dataKey || xAxis.dataKey || 'name'}
                hide={yAxis.hide}
                tick={{
                  ...chartTypography.axisTick,
                  fontFamily: chartTypography.fontFamily,
                }}
                axisLine={{ stroke: chartAxisStyles.stroke }}
                tickLine={{ stroke: chartAxisStyles.stroke }}
                width={80}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xAxis.dataKey || 'name'}
                hide={xAxis.hide}
                tickFormatter={xAxis.tickFormatter}
                tick={{
                  ...chartTypography.axisTick,
                  fontFamily: chartTypography.fontFamily,
                }}
                axisLine={{ stroke: chartAxisStyles.stroke }}
                tickLine={{ stroke: chartAxisStyles.stroke }}
                angle={xAxis.angle}
                textAnchor={xAxis.angle ? 'end' : 'middle'}
                height={xAxis.angle ? 60 : 30}
              />
              <YAxis
                hide={yAxis.hide}
                domain={yAxis.domain as [number, number] | undefined}
                tickFormatter={yAxis.tickFormatter}
                tick={{
                  ...chartTypography.axisTick,
                  fontFamily: chartTypography.fontFamily,
                }}
                axisLine={{ stroke: chartAxisStyles.stroke }}
                tickLine={{ stroke: chartAxisStyles.stroke }}
                tickCount={yAxis.tickCount}
                unit={yAxis.unit}
              />
            </>
          )}

          {/* Tooltip */}
          {tooltip.show !== false && (
            <Tooltip
              content={
                <CustomTooltip
                  labelFormatter={tooltip.labelFormatter}
                  valueFormatter={tooltip.formatter as ((value: number) => string) | undefined}
                  showTotal={variant === 'stacked' || variant === 'stacked-percent'}
                />
              }
              cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
            />
          )}

          {/* Legend */}
          {legend.show !== false && (
            <Legend
              content={<CustomLegend formatter={legend.formatter} />}
              verticalAlign={legend.position === 'top' ? 'top' : 'bottom'}
              align={legend.align || 'center'}
            />
          )}

          {/* Reference Lines */}
          {referenceLines.map((ref, index) => (
            <ReferenceLine
              key={`ref-${index}`}
              y={ref.axis === 'y' && !isHorizontal ? ref.value : undefined}
              x={ref.axis === 'x' || (ref.axis === 'y' && isHorizontal) ? ref.value : undefined}
              stroke={ref.color || chartColorsPrimary[0]}
              strokeDasharray={ref.strokeDasharray || '5 5'}
              label={
                ref.label
                  ? {
                      value: ref.label,
                      position: 'insideTopRight',
                      style: {
                        ...chartTypography.dataLabel,
                        fontFamily: chartTypography.fontFamily,
                      },
                    }
                  : undefined
              }
            />
          ))}

          {/* Bars */}
          {series.map((s, index) => {
            const color = s.color || colors[index % colors.length] || getChartColor(index);
            return (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name || s.dataKey}
                fill={color}
                stackId={getStackId(s, index)}
                radius={getBarRadius(index, series.length) as number | [number, number, number, number]}
                maxBarSize={maxBarWidth}
                isAnimationActive={animate}
                animationDuration={animationDuration}
                onClick={
                  onDataPointClick
                    ? (data, index) => onDataPointClick(data, index)
                    : undefined
                }
                style={onDataPointClick ? { cursor: 'pointer' } : undefined}
              />
            );
          })}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default BarChart;
