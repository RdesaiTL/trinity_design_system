/**
 * Sparkline Component
 * Small, inline charts for dashboards and tables
 */

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { Box, SxProps, Theme } from '@mui/material';
import {
  chartColorsPrimary,
  chartColorsStatusMap,
  chartAnimation,
} from './tokens';
import { SparklineProps } from './types';

/**
 * Sparkline - Compact inline chart
 * 
 * @example
 * ```tsx
 * // Simple line sparkline
 * <Sparkline
 *   data={[10, 20, 15, 30, 25, 40]}
 *   width={100}
 *   height={32}
 * />
 * 
 * // Bar sparkline with min/max highlighting
 * <Sparkline
 *   type="bar"
 *   data={[10, 20, 15, 30, 25, 40]}
 *   showMinMax
 * />
 * 
 * // Area sparkline with reference line
 * <Sparkline
 *   type="area"
 *   data={[10, 20, 15, 30, 25, 40]}
 *   referenceLine="average"
 * />
 * ```
 */
export const Sparkline: React.FC<SparklineProps> = ({
  data,
  type = 'line',
  width = 100,
  height = 32,
  color = chartColorsPrimary[0],
  referenceLine,
  referenceLineColor = chartColorsStatusMap.neutral,
  showMinMax = false,
  minColor = chartColorsStatusMap.error,
  maxColor = chartColorsStatusMap.success,
  animate = true,
  sx,
}) => {
  // Transform data to chart format
  const chartData = useMemo(() => 
    data.map((value, index) => ({ index, value })),
    [data]
  );

  // Calculate reference value
  const referenceValue = useMemo(() => {
    if (referenceLine === undefined) return null;
    if (typeof referenceLine === 'number') return referenceLine;
    
    const values = data.filter((v) => v !== null && v !== undefined);
    if (values.length === 0) return null;
    
    if (referenceLine === 'average') {
      return values.reduce((a, b) => a + b, 0) / values.length;
    }
    
    if (referenceLine === 'median') {
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
    }
    
    return null;
  }, [data, referenceLine]);

  // Find min/max indices
  const { minIndex, maxIndex } = useMemo(() => {
    if (!showMinMax || data.length === 0) {
      return { minIndex: -1, maxIndex: -1 };
    }
    
    let min = data[0];
    let max = data[0];
    let minIdx = 0;
    let maxIdx = 0;
    
    data.forEach((value, index) => {
      if (value < min) {
        min = value;
        minIdx = index;
      }
      if (value > max) {
        max = value;
        maxIdx = index;
      }
    });
    
    return { minIndex: minIdx, maxIndex: maxIdx };
  }, [data, showMinMax]);

  const containerSx: SxProps<Theme> = {
    display: 'inline-flex',
    alignItems: 'center',
    ...sx,
  };

  // Line Sparkline
  if (type === 'line') {
    return (
      <Box sx={containerSx}>
        <ResponsiveContainer width={width} height={height}>
          <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            {referenceValue !== null && (
              <ReferenceLine
                y={referenceValue}
                stroke={referenceLineColor}
                strokeDasharray="2 2"
                strokeWidth={1}
              />
            )}
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={1.5}
              dot={
                showMinMax
                  ? (props: any) => {
                      const { cx, cy, index } = props;
                      if (index === minIndex) {
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={3}
                            fill={minColor}
                            // eslint-disable-next-line no-restricted-syntax
                            stroke="#FFFFFF" // @intentional-color: white outline for visual emphasis
                            strokeWidth={1}
                          />
                        );
                      }
                      if (index === maxIndex) {
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={3}
                            fill={maxColor}
                            // eslint-disable-next-line no-restricted-syntax
                            stroke="#FFFFFF" // @intentional-color: white outline for visual emphasis
                            strokeWidth={1}
                          />
                        );
                      }
                      return null;
                    }
                  : false
              }
              isAnimationActive={animate}
              animationDuration={chartAnimation.duration}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  }

  // Bar Sparkline
  if (type === 'bar') {
    return (
      <Box sx={containerSx}>
        <ResponsiveContainer width={width} height={height}>
          <BarChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            {referenceValue !== null && (
              <ReferenceLine
                y={referenceValue}
                stroke={referenceLineColor}
                strokeDasharray="2 2"
                strokeWidth={1}
              />
            )}
            <Bar
              dataKey="value"
              radius={[1, 1, 0, 0]}
              isAnimationActive={animate}
              animationDuration={chartAnimation.duration}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    showMinMax && index === minIndex
                      ? minColor
                      : showMinMax && index === maxIndex
                      ? maxColor
                      : color
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    );
  }

  // Area Sparkline
  return (
    <Box sx={containerSx}>
      <ResponsiveContainer width={width} height={height}>
        <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <defs>
            <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {referenceValue !== null && (
            <ReferenceLine
              y={referenceValue}
              stroke={referenceLineColor}
              strokeDasharray="2 2"
              strokeWidth={1}
            />
          )}
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill="url(#sparkline-gradient)"
            dot={
              showMinMax
                ? (props: any) => {
                    const { cx, cy, index } = props;
                    if (index === minIndex) {
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={3}
                          fill={minColor}
                          // eslint-disable-next-line no-restricted-syntax
                          stroke="#FFFFFF" // @intentional-color: white outline for visual emphasis
                          strokeWidth={1}
                        />
                      );
                    }
                    if (index === maxIndex) {
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={3}
                          fill={maxColor}
                          // eslint-disable-next-line no-restricted-syntax
                          stroke="#FFFFFF" // @intentional-color: white outline for visual emphasis
                          strokeWidth={1}
                        />
                      );
                    }
                    return null;
                  }
                : false
            }
            isAnimationActive={animate}
            animationDuration={chartAnimation.duration}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Sparkline;
