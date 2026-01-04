/**
 * LineChart Component
 * Trinity-styled line chart with support for multiple series
 */

/* eslint-disable jsx-a11y/alt-text -- Recharts Area component is SVG-based, not HTML image map */

import React, { useMemo, useId } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
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
import { LineChartProps } from './types';

/**
 * LineChart - Multi-series line chart with Trinity styling
 * 
 * @example
 * ```tsx
 * <LineChart
 *   data={[
 *     { month: 'Jan', sales: 4000, profit: 2400 },
 *     { month: 'Feb', sales: 3000, profit: 1398 },
 *   ]}
 *   series={[
 *     { dataKey: 'sales', name: 'Sales' },
 *     { dataKey: 'profit', name: 'Profit' },
 *   ]}
 *   xAxis={{ dataKey: 'month' }}
 *   title="Monthly Performance"
 * />
 * ```
 */
export const LineChart: React.FC<LineChartProps> = ({
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
  curveType = 'monotone',
  showArea = false,
  connectNulls = false,
  referenceLines = [],
  onDataPointClick,
  ariaLabel,
}) => {
  // Generate stable gradient IDs using React's useId hook (deterministic)
  const chartId = useId();
  const gradientIds = useMemo(() => 
    series.map((_, i) => `line-gradient-${i}-${chartId.replace(/:/g, '-')}`),
    [series.length, chartId]
  );

  const isEmpty = !data || data.length === 0;

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
        <RechartsLineChart
          data={data}
          margin={margin}
          aria-label={ariaLabel || title || 'Line chart'}
        >
          {/* Gradient definitions for area fills */}
          {showArea && (
            <defs>
              {series.map((s, index) => {
                const color = s.color || colors[index % colors.length] || getChartColor(index);
                return (
                  <linearGradient
                    key={gradientIds[index]}
                    id={gradientIds[index]}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                );
              })}
            </defs>
          )}

          {/* Grid */}
          {showGrid && (
            <CartesianGrid
              strokeDasharray={chartGridStyles.strokeDasharray}
              stroke={chartGridStyles.stroke}
              vertical={gridDirection === 'vertical' || gridDirection === 'both'}
              horizontal={gridDirection === 'horizontal' || gridDirection === 'both'}
            />
          )}

          {/* X Axis */}
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

          {/* Y Axis */}
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
            width={yAxis.label ? 60 : 50}
            label={
              yAxis.label
                ? {
                    value: yAxis.label,
                    angle: -90,
                    position: 'insideLeft',
                    style: {
                      ...chartTypography.axisLabel,
                      fontFamily: chartTypography.fontFamily,
                    },
                  }
                : undefined
            }
          />

          {/* Tooltip */}
          {tooltip.show !== false && (
            <Tooltip
              content={
                <CustomTooltip
                  labelFormatter={tooltip.labelFormatter}
                  valueFormatter={tooltip.formatter as ((value: number) => string) | undefined}
                />
              }
              cursor={tooltip.cursor !== false ? { stroke: chartGridStyles.stroke } : false}
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
              y={ref.axis === 'y' ? ref.value : undefined}
              x={ref.axis === 'x' ? ref.value : undefined}
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

          {/* Area fills (if showArea) */}
          {showArea &&
            series.map((s, index) => {
              const _color = s.color || colors[index % colors.length] || getChartColor(index);
              return (
                <Area
                  key={`area-${s.dataKey}`}
                  type={curveType}
                  dataKey={s.dataKey}
                  fill={`url(#${gradientIds[index]})`}
                  stroke="none"
                  fillOpacity={1}
                  isAnimationActive={animate}
                  animationDuration={animationDuration}
                  connectNulls={connectNulls}
                />
              );
            })}

          {/* Lines */}
          {series.map((s, index) => {
            const color = s.color || colors[index % colors.length] || getChartColor(index);
            return (
              <Line
                key={s.dataKey}
                type={curveType}
                dataKey={s.dataKey}
                name={s.name || s.dataKey}
                stroke={color}
                strokeWidth={chartSizing.strokeWidth.default}
                strokeDasharray={s.strokeDasharray}
                dot={
                  s.showDots !== false
                    ? {
                        r: chartSizing.dotSize.small,
                        fill: color,
                        strokeWidth: 2,
                        // eslint-disable-next-line no-restricted-syntax
                        stroke: '#FFFFFF', // @intentional-color: white outline for visual emphasis
                      }
                    : false
                }
                activeDot={{
                  r: chartSizing.dotSize.default,
                  fill: color,
                  strokeWidth: 2,
                  // eslint-disable-next-line no-restricted-syntax
                  stroke: '#FFFFFF', // @intentional-color: white outline for visual emphasis
                  onClick: onDataPointClick
                    ? (_, payload) => {
                        if (payload && payload.payload) {
                          onDataPointClick(payload.payload, payload.index || 0);
                        }
                      }
                    : undefined,
                  style: onDataPointClick ? { cursor: 'pointer' } : undefined,
                }}
                isAnimationActive={animate}
                animationDuration={animationDuration}
                connectNulls={connectNulls}
              />
            );
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default LineChart;
