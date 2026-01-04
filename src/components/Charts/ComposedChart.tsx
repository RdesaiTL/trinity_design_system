/**
 * ComposedChart Component
 * Trinity-styled combined line, bar, and area chart
 */

/* eslint-disable jsx-a11y/alt-text -- Recharts Area component is SVG-based, not HTML image map */

import React, { useMemo } from 'react';
import {
  ComposedChart as RechartsComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useTheme } from '@mui/material';
import { ChartWrapper } from './ChartWrapper';
import { CustomTooltip } from './CustomTooltip';
import { CustomLegend } from './CustomLegend';
import {
  chartColorsPrimary,
  chartGridStyles,
  chartAxisStyles,
  chartTypography,
  chartAnimation,
  getChartColor,
} from './tokens';
import { ComposedChartProps, ComposedSeriesConfig } from './types';
import { brandColors } from '../../tokens';

/**
 * ComposedChart - Combines line, bar, and area charts
 * 
 * @example
 * ```tsx
 * <ComposedChart
 *   data={salesData}
 *   xAxisKey="month"
 *   series={[
 *     { key: 'revenue', type: 'bar', name: 'Revenue' },
 *     { key: 'orders', type: 'line', name: 'Orders' },
 *     { key: 'target', type: 'area', name: 'Target' },
 *   ]}
 *   title="Sales Dashboard"
 * />
 * ```
 */
export const ComposedChart: React.FC<ComposedChartProps> = ({
  data,
  xAxisKey,
  series,
  height = 400,
  width = '100%',
  title,
  subtitle,
  xAxis,
  yAxis,
  yAxisRight,
  grid = { show: true },
  legend = { show: true, position: 'bottom' },
  tooltip = { show: true },
  animate = true,
  referenceLines,
  colors = chartColorsPrimary,
  barGap = 4,
  barCategoryGap = '20%',
  sx,
  ariaLabel,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const isEmpty = !data || data.length === 0;
  const gridStyleKey = isDarkMode ? 'dark' : 'light';

  // Generate unique gradient IDs
  const gradientIds = useMemo(() => {
    return series.map((s, i) => `composed-gradient-${s.key}-${i}`);
  }, [series]);

  // Render series element based on type
  const renderSeries = (config: ComposedSeriesConfig, index: number) => {
    const seriesColor = config.color || colors[index % colors.length] || getChartColor(index);
    const gradientId = gradientIds[index];

    const commonProps = {
      key: config.key,
      name: config.name || config.key,
      dataKey: config.key,
      isAnimationActive: animate,
      animationDuration: chartAnimation.duration,
      animationEasing: chartAnimation.easing as 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out',
      yAxisId: config.yAxisId || 'left',
    };

    switch (config.type) {
      case 'line':
        return (
          <Line
            {...commonProps}
            type={config.curve || 'monotone'}
            stroke={seriesColor}
            strokeWidth={config.strokeWidth || 2}
            dot={
              config.showDots !== false
                ? {
                    // eslint-disable-next-line no-restricted-syntax
                    fill: isDarkMode ? brandColors.neutral.gray800 : '#FFFFFF', // @intentional-color: white/dark fill for mode contrast
                    stroke: seriesColor,
                    strokeWidth: 2,
                    r: 4,
                  }
                : false
            }
            activeDot={{
              r: 6,
              fill: seriesColor,
              // eslint-disable-next-line no-restricted-syntax
              stroke: isDarkMode ? brandColors.neutral.gray800 : '#FFFFFF', // @intentional-color: white/dark stroke for mode contrast
              strokeWidth: 2,
            }}
            strokeDasharray={config.strokeDasharray}
          />
        );

      case 'bar':
        return (
          <Bar
            {...commonProps}
            fill={seriesColor}
            radius={[4, 4, 0, 0]}
            maxBarSize={config.maxBarSize || 40}
          />
        );

      case 'area':
        return (
          <Area
            {...commonProps}
            type={config.curve || 'monotone'}
            fill={`url(#${gradientId})`}
            stroke={seriesColor}
            strokeWidth={config.strokeWidth || 2}
            fillOpacity={config.fillOpacity || 0.6}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ChartWrapper
      title={title}
      subtitle={subtitle}
      height={height}
      empty={isEmpty}
      sx={sx}
    >
      {/* @ts-expect-error - recharts ResponsiveContainer height type is overly restrictive */}
      <ResponsiveContainer width={width} height={height}>
        <RechartsComposedChart
          data={data}
          margin={{
            top: 10,
            right: yAxisRight ? 20 : 10,
            left: 10,
            bottom: xAxis?.angle ? 40 : 20,
          }}
          barGap={barGap}
          barCategoryGap={barCategoryGap}
          aria-label={ariaLabel || title || 'Composed chart'}
        >
          {/* Gradient definitions for area charts */}
          <defs>
            {series
              .filter((s) => s.type === 'area')
              .map((config, _i) => {
                const seriesIndex = series.findIndex((s) => s.key === config.key);
                const seriesColor =
                  config.color || colors[seriesIndex % colors.length] || getChartColor(seriesIndex);
                const gradientId = gradientIds[seriesIndex];

                return (
                  <linearGradient
                    key={gradientId}
                    id={gradientId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={seriesColor}
                      stopOpacity={isDarkMode ? 0.4 : 0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={seriesColor}
                      stopOpacity={isDarkMode ? 0.05 : 0.1}
                    />
                  </linearGradient>
                );
              })}
          </defs>

          {/* Grid */}
          {grid.show && (
            <CartesianGrid
              strokeDasharray={chartGridStyles.strokeDasharray}
              stroke={chartGridStyles[gridStyleKey].stroke}
              strokeOpacity={chartGridStyles[gridStyleKey].strokeOpacity}
              horizontal={grid.horizontal !== false}
              vertical={grid.vertical !== false}
            />
          )}

          {/* X Axis */}
          <XAxis
            dataKey={xAxisKey}
            axisLine={{
              stroke: chartAxisStyles[gridStyleKey].lineColor,
              strokeOpacity: chartAxisStyles[gridStyleKey].lineOpacity,
            }}
            tickLine={false}
            tick={{
              fill: chartAxisStyles[gridStyleKey].tickColor,
              fontSize: chartAxisStyles.tickFontSize,
              fontFamily: chartTypography.fontFamily,
            }}
            label={
              xAxis?.label
                ? {
                    value: xAxis.label,
                    position: 'bottom',
                    offset: 0,
                    style: {
                      fill: chartAxisStyles[gridStyleKey].tickColor,
                      fontSize: chartAxisStyles.labelFontSize,
                      fontFamily: chartTypography.fontFamily,
                    },
                  }
                : undefined
            }
            angle={xAxis?.angle}
            textAnchor={xAxis?.angle ? 'end' : 'middle'}
            tickFormatter={xAxis?.tickFormatter}
            interval={xAxis?.interval}
          />

          {/* Left Y Axis */}
          <YAxis
            yAxisId="left"
            axisLine={{
              stroke: chartAxisStyles[gridStyleKey].lineColor,
              strokeOpacity: chartAxisStyles[gridStyleKey].lineOpacity,
            }}
            tickLine={false}
            tick={{
              fill: chartAxisStyles[gridStyleKey].tickColor,
              fontSize: chartAxisStyles.tickFontSize,
              fontFamily: chartTypography.fontFamily,
            }}
            label={
              yAxis?.label
                ? {
                    value: yAxis.label,
                    angle: -90,
                    position: 'insideLeft',
                    style: {
                      fill: chartAxisStyles[gridStyleKey].tickColor,
                      fontSize: chartAxisStyles.labelFontSize,
                      fontFamily: chartTypography.fontFamily,
                      textAnchor: 'middle',
                    },
                  }
                : undefined
            }
            tickFormatter={yAxis?.tickFormatter}
            domain={yAxis?.domain}
          />

          {/* Right Y Axis (optional) */}
          {yAxisRight && (
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={{
                stroke: chartAxisStyles[gridStyleKey].lineColor,
                strokeOpacity: chartAxisStyles[gridStyleKey].lineOpacity,
              }}
              tickLine={false}
              tick={{
                fill: chartAxisStyles[gridStyleKey].tickColor,
                fontSize: chartAxisStyles.tickFontSize,
                fontFamily: chartTypography.fontFamily,
              }}
              label={
                yAxisRight.label
                  ? {
                      value: yAxisRight.label,
                      angle: 90,
                      position: 'insideRight',
                      style: {
                        fill: chartAxisStyles[gridStyleKey].tickColor,
                        fontSize: chartAxisStyles.labelFontSize,
                        fontFamily: chartTypography.fontFamily,
                        textAnchor: 'middle',
                      },
                    }
                  : undefined
              }
              tickFormatter={yAxisRight.tickFormatter}
              domain={yAxisRight.domain}
            />
          )}

          {/* Reference lines */}
          {referenceLines?.map((line, index) => (
            <ReferenceLine
              key={index}
              y={line.y}
              x={line.x}
              stroke={line.color || brandColors.neutral.gray400}
              strokeDasharray={line.strokeDasharray || '4 4'}
              strokeWidth={line.strokeWidth || 1}
              yAxisId={line.yAxisId || 'left'}
              label={
                line.label
                  ? {
                      value: line.label,
                      position: line.labelPosition || 'right',
                      fill: line.color || brandColors.neutral.gray500,
                      fontSize: 11,
                      fontFamily: chartTypography.fontFamily,
                    }
                  : undefined
              }
            />
          ))}

          {/* Tooltip */}
          {tooltip.show && (
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              }}
            />
          )}

          {/* Legend */}
          {legend.show && (
            <Legend
              content={<CustomLegend />}
              verticalAlign={
                legend.position === 'top'
                  ? 'top'
                  : legend.position === 'bottom'
                  ? 'bottom'
                  : 'middle'
              }
              align={
                legend.position === 'left'
                  ? 'left'
                  : legend.position === 'right'
                  ? 'right'
                  : 'center'
              }
            />
          )}

          {/* Render all series */}
          {series.map((config, index) => renderSeries(config, index))}
        </RechartsComposedChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default ComposedChart;
