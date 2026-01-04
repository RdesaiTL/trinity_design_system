/**
 * ScatterChart Component
 * Trinity-styled scatter and bubble charts
 */

import React from 'react';
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { ChartWrapper } from './ChartWrapper';
import { CustomLegend } from './CustomLegend';
import {
  chartColorsPrimary,
  chartTypography,
  chartGridStyles,
  chartAxisStyles,
  chartTooltipStyles,
  chartSizing,
  chartAnimation,
  getChartColor,
} from './tokens';
import { ScatterChartProps, ScatterDataPoint, ChartTooltipRenderProps } from './types';
import { brandColors } from '../../tokens';

/**
 * ScatterChart - Trinity-styled scatter and bubble chart
 * 
 * @example
 * ```tsx
 * // Simple scatter plot
 * <ScatterChart
 *   data={[
 *     { x: 100, y: 200, name: 'A' },
 *     { x: 120, y: 100, name: 'B' },
 *   ]}
 *   xAxis={{ label: 'X Value' }}
 *   yAxis={{ label: 'Y Value' }}
 *   title="Scatter Plot"
 * />
 * 
 * // Bubble chart with size (z axis)
 * <ScatterChart
 *   data={[
 *     { x: 100, y: 200, z: 50, name: 'A' },
 *     { x: 120, y: 100, z: 80, name: 'B' },
 *   ]}
 *   zAxis={{ range: [50, 400] }}
 * />
 * 
 * // Multiple series
 * <ScatterChart
 *   data={[
 *     { name: 'Group A', data: [...], color: '#7841C9' },
 *     { name: 'Group B', data: [...], color: '#FF6150' },
 *   ]}
 * />
 * ```
 */
export const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  height = chartSizing.defaultHeight,
  width = '100%',
  title,
  subtitle,
  xAxis = {},
  yAxis = {},
  zAxis = {},
  colors = chartColorsPrimary,
  showGrid = true,
  legend = { show: true, position: 'bottom' },
  tooltip = { show: true },
  animate = true,
  animationDuration = chartAnimation.duration,
  loading = false,
  emptyMessage,
  error,
  sx,
  onPointClick,
  ariaLabel,
}) => {
  // Normalize data to always be an array of series
  const series = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Check if data is already in series format
    if ('data' in data[0]) {
      return data as { name: string; data: ScatterDataPoint[]; color?: string }[];
    }
    
    // Single series - wrap in array
    return [{
      name: 'Data',
      data: data as ScatterDataPoint[],
      color: colors[0],
    }];
  }, [data, colors]);

  const isEmpty = !data || data.length === 0;
  const hasBubble = series.some(s => s.data.some(d => d.z !== undefined));

  // Custom tooltip
  const CustomScatterTooltip = ({ active, payload }: ChartTooltipRenderProps) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const point = payload[0].payload as ScatterDataPoint;
    const seriesName = payload[0].name;

    return (
      <Box
        sx={{
          backgroundColor: chartTooltipStyles.backgroundColor,
          border: `1px solid ${chartTooltipStyles.borderColor}`,
          borderRadius: `${chartTooltipStyles.borderRadius}px`,
          boxShadow: chartTooltipStyles.boxShadow,
          padding: chartTooltipStyles.padding,
          minWidth: 140,
        }}
      >
        {point.name && (
          <Typography
            sx={{
              ...chartTypography.tooltipLabel,
              fontFamily: chartTypography.fontFamily,
              mb: 1,
            }}
          >
            {point.name}
          </Typography>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Typography
              sx={{
                ...chartTypography.tooltip,
                fontFamily: chartTypography.fontFamily,
                color: brandColors.neutral.gray600,
              }}
            >
              {xAxis.label || 'X'}
            </Typography>
            <Typography
              sx={{
                ...chartTypography.tooltip,
                fontFamily: chartTypography.fontFamily,
                fontWeight: 600,
              }}
            >
              {point.x?.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Typography
              sx={{
                ...chartTypography.tooltip,
                fontFamily: chartTypography.fontFamily,
                color: brandColors.neutral.gray600,
              }}
            >
              {yAxis.label || 'Y'}
            </Typography>
            <Typography
              sx={{
                ...chartTypography.tooltip,
                fontFamily: chartTypography.fontFamily,
                fontWeight: 600,
              }}
            >
              {point.y?.toLocaleString()}
            </Typography>
          </Box>
          {hasBubble && point.z !== undefined && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Typography
                sx={{
                  ...chartTypography.tooltip,
                  fontFamily: chartTypography.fontFamily,
                  color: brandColors.neutral.gray600,
                }}
              >
                Size
              </Typography>
              <Typography
                sx={{
                  ...chartTypography.tooltip,
                  fontFamily: chartTypography.fontFamily,
                  fontWeight: 600,
                }}
              >
                {point.z?.toLocaleString()}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
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
        <RechartsScatterChart
          margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
          aria-label={ariaLabel || title || 'Scatter chart'}
        >
          {/* Grid */}
          {showGrid && (
            <CartesianGrid
              strokeDasharray={chartGridStyles.strokeDasharray}
              stroke={chartGridStyles.stroke}
            />
          )}

          {/* X Axis */}
          <XAxis
            type="number"
            dataKey="x"
            name={xAxis.label || 'X'}
            hide={xAxis.hide}
            domain={xAxis.domain as [number, number] | undefined}
            tickFormatter={xAxis.tickFormatter}
            tick={{
              ...chartTypography.axisTick,
              fontFamily: chartTypography.fontFamily,
            }}
            axisLine={{ stroke: chartAxisStyles.stroke }}
            tickLine={{ stroke: chartAxisStyles.stroke }}
            label={
              xAxis.label
                ? {
                    value: xAxis.label,
                    position: 'insideBottom',
                    offset: -10,
                    style: {
                      ...chartTypography.axisLabel,
                      fontFamily: chartTypography.fontFamily,
                    },
                  }
                : undefined
            }
          />

          {/* Y Axis */}
          <YAxis
            type="number"
            dataKey="y"
            name={yAxis.label || 'Y'}
            hide={yAxis.hide}
            domain={yAxis.domain as [number, number] | undefined}
            tickFormatter={yAxis.tickFormatter}
            tick={{
              ...chartTypography.axisTick,
              fontFamily: chartTypography.fontFamily,
            }}
            axisLine={{ stroke: chartAxisStyles.stroke }}
            tickLine={{ stroke: chartAxisStyles.stroke }}
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

          {/* Z Axis for bubble charts */}
          {hasBubble && (
            <ZAxis
              type="number"
              dataKey="z"
              domain={zAxis.domain || [0, 'auto']}
              range={zAxis.range || [50, 400]}
            />
          )}

          {/* Tooltip */}
          {tooltip.show !== false && <Tooltip content={<CustomScatterTooltip />} />}

          {/* Legend */}
          {legend.show !== false && series.length > 1 && (
            <Legend
              content={<CustomLegend formatter={legend.formatter} />}
              verticalAlign={legend.position === 'top' ? 'top' : 'bottom'}
              align={legend.align || 'center'}
            />
          )}

          {/* Scatter series */}
          {series.map((s, seriesIndex) => {
            const color = s.color || colors[seriesIndex % colors.length] || getChartColor(seriesIndex);
            
            return (
              <Scatter
                key={s.name}
                name={s.name}
                data={s.data}
                fill={color}
                isAnimationActive={animate}
                animationDuration={animationDuration}
                onClick={
                  onPointClick
                    ? (data) => onPointClick(data as ScatterDataPoint, 0)
                    : undefined
                }
                style={onPointClick ? { cursor: 'pointer' } : undefined}
              >
                {/* Optional: individual point colors based on category */}
                {s.data.map((entry, pointIndex) => (
                  <Cell
                    key={`cell-${pointIndex}`}
                    fill={color}
                    fillOpacity={0.8}
                  />
                ))}
              </Scatter>
            );
          })}
        </RechartsScatterChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

/**
 * BubbleChart - Convenience wrapper for ScatterChart with z-axis
 */
export const BubbleChart: React.FC<ScatterChartProps> = (props) => {
  return (
    <ScatterChart
      {...props}
      zAxis={props.zAxis || { range: [50, 400] }}
    />
  );
};

export default ScatterChart;
