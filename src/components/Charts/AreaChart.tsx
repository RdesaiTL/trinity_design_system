/**
 * AreaChart Component
 * Trinity-styled area chart with support for stacked and gradient fills
 */

import React, { useMemo } from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
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
import { AreaChartProps } from './types';

/**
 * AreaChart - Multi-series area chart with Trinity styling
 * 
 * @example
 * ```tsx
 * <AreaChart
 *   data={[
 *     { month: 'Jan', users: 4000, sessions: 2400 },
 *     { month: 'Feb', users: 3000, sessions: 1398 },
 *   ]}
 *   series={[
 *     { dataKey: 'users', name: 'Users' },
 *     { dataKey: 'sessions', name: 'Sessions' },
 *   ]}
 *   xAxis={{ dataKey: 'month' }}
 *   stacked
 *   gradient
 *   title="User Activity"
 * />
 * ```
 */
export const AreaChart: React.FC<AreaChartProps> = ({
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
  gradient = true,
  stacked = false,
  connectNulls = false,
  referenceLines = [],
  onDataPointClick,
  ariaLabel,
}) => {
  // Generate gradient IDs
  const gradientIds = useMemo(() => 
    series.map((_, i) => `area-gradient-${i}-${Math.random().toString(36).substr(2, 9)}`),
    [series.length]
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
        <RechartsAreaChart
          data={data}
          margin={margin}
          aria-label={ariaLabel || title || 'Area chart'}
        >
          {/* Gradient definitions */}
          {gradient && (
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
                    <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.05} />
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
                  showTotal={stacked}
                />
              }
              cursor={{ stroke: chartGridStyles.stroke }}
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

          {/* Areas */}
          {series.map((s, index) => {
            const color = s.color || colors[index % colors.length] || getChartColor(index);
            const fillOpacity = s.fillOpacity ?? (gradient ? 1 : 0.3);
            
            return (
              <Area
                key={s.dataKey}
                type={curveType}
                dataKey={s.dataKey}
                name={s.name || s.dataKey}
                stroke={color}
                strokeWidth={chartSizing.strokeWidth.default}
                fill={gradient ? `url(#${gradientIds[index]})` : color}
                fillOpacity={fillOpacity}
                stackId={stacked ? 'stack' : undefined}
                isAnimationActive={animate}
                animationDuration={animationDuration}
                connectNulls={connectNulls}
                activeDot={{
                  r: chartSizing.dotSize.default,
                  fill: color,
                  strokeWidth: 2,
                  stroke: '#FFFFFF',
                  onClick: onDataPointClick
                    ? (_, payload) => {
                        if (payload && payload.payload) {
                          onDataPointClick(payload.payload, payload.index || 0);
                        }
                      }
                    : undefined,
                  style: onDataPointClick ? { cursor: 'pointer' } : undefined,
                }}
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default AreaChart;
