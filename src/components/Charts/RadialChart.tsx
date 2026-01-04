/**
 * RadialChart & GaugeChart Components
 * Trinity-styled radial bar and gauge charts
 */

import React, { useMemo } from 'react';
import {
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { ChartWrapper } from './ChartWrapper';
import {
  chartColorsPrimary,
  chartTypography,
  chartAnimation,
  getChartColor,
} from './tokens';
import { RadialBarChartProps, GaugeChartProps } from './types';
import { brandColors } from '../../tokens';

/**
 * RadialBarChart - Trinity-styled radial/circular bar chart
 * 
 * @example
 * ```tsx
 * <RadialBarChart
 *   data={[
 *     { name: 'Task A', value: 80 },
 *     { name: 'Task B', value: 60 },
 *     { name: 'Task C', value: 40 },
 *   ]}
 *   title="Progress Overview"
 * />
 * ```
 */
export const RadialBarChart: React.FC<RadialBarChartProps> = ({
  data,
  height = 300,
  width: _width = '100%',
  title,
  subtitle,
  innerRadius = '30%',
  outerRadius = '90%',
  startAngle = 90,
  endAngle = -270,
  colors = chartColorsPrimary,
  showLabels = true,
  legend = { show: true, position: 'right' },
  animate = true,
  sx,
  ariaLabel,
}) => {
  // Add colors to data
  const chartData = useMemo(() => 
    data.map((item, index) => ({
      ...item,
      fill: colors[index % colors.length] || getChartColor(index),
    })),
    [data, colors]
  );

  const isEmpty = !data || data.length === 0;

  // Custom legend
  const renderLegend = () => {
    if (!legend.show) return null;
    
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          py: 1,
        }}
      >
        {chartData.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: item.fill,
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  ...chartTypography.legend,
                  fontFamily: chartTypography.fontFamily,
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  color: brandColors.neutral.gray500,
                  fontFamily: chartTypography.fontFamily,
                }}
              >
                {item.value.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <ChartWrapper
      title={title}
      subtitle={subtitle}
      height={height}
      empty={isEmpty}
      sx={sx}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Box sx={{ flex: 1, height: '100%' }}>
          <ResponsiveContainer width="100%" height={height}>
            <RechartsRadialBarChart
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              barSize={20}
              data={chartData}
              startAngle={startAngle}
              endAngle={endAngle}
              aria-label={ariaLabel || title || 'Radial bar chart'}
            >
              <RadialBar
                background={{ fill: brandColors.neutral.gray100 }}
                dataKey="value"
                cornerRadius={10}
                isAnimationActive={animate}
                animationDuration={chartAnimation.duration}
                label={
                  showLabels
                    ? {
                        position: 'insideStart',
                        // eslint-disable-next-line no-restricted-syntax
                        fill: '#FFFFFF', // @intentional-color: white text for contrast on colored bars
                        fontFamily: chartTypography.fontFamily,
                        fontSize: 11,
                        fontWeight: 600,
                      }
                    : false
                }
              />
            </RechartsRadialBarChart>
          </ResponsiveContainer>
        </Box>

        {legend.show && (
          <Box sx={{ flexShrink: 0, pl: 2, minWidth: 120 }}>
            {renderLegend()}
          </Box>
        )}
      </Box>
    </ChartWrapper>
  );
};

/**
 * GaugeChart - Single-value gauge/meter chart
 * 
 * @example
 * ```tsx
 * <GaugeChart
 *   value={75}
 *   max={100}
 *   title="CPU Usage"
 *   unit="%"
 *   thresholds={[
 *     { value: 50, color: '#24A148' },
 *     { value: 80, color: '#F59E0B' },
 *     { value: 100, color: '#DA1E28' },
 *   ]}
 * />
 * ```
 */
export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  min = 0,
  max = 100,
  height = 200,
  width: _width = '100%',
  title,
  valueLabel,
  unit = '',
  thresholds,
  color = chartColorsPrimary[0],
  showValue = true,
  valueFormatter,
  animate = true,
  sx,
  ariaLabel,
}) => {
  // Determine color based on thresholds
  const gaugeColor = useMemo(() => {
    if (!thresholds || thresholds.length === 0) return color;
    
    // Sort thresholds by value
    const sorted = [...thresholds].sort((a, b) => a.value - b.value);
    
    // Find the appropriate color
    for (const threshold of sorted) {
      if (value <= threshold.value) {
        return threshold.color;
      }
    }
    
    // If value exceeds all thresholds, use the last color
    return sorted[sorted.length - 1].color;
  }, [value, thresholds, color]);

  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  // Chart data
  const chartData = [
    { name: 'Value', value: percentage, fill: gaugeColor },
  ];

  // Format value for display
  const displayValue = valueFormatter
    ? valueFormatter(value)
    : value.toLocaleString();

  return (
    <ChartWrapper title={title} height={height} sx={sx}>
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsRadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="90%"
            barSize={16}
            data={chartData}
            startAngle={180}
            endAngle={0}
            aria-label={ariaLabel || title || `Gauge showing ${value}${unit}`}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: brandColors.neutral.gray100 }}
              dataKey="value"
              cornerRadius={8}
              isAnimationActive={animate}
              animationDuration={chartAnimation.duration}
            />
          </RechartsRadialBarChart>
        </ResponsiveContainer>

        {/* Center content */}
        {showValue && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -30%)',
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: height / 6,
                fontWeight: 700,
                fontFamily: chartTypography.fontFamily,
                color: gaugeColor,
                lineHeight: 1,
              }}
            >
              {displayValue}
              {unit && (
                <Box
                  component="span"
                  sx={{
                    fontSize: '0.5em',
                    fontWeight: 500,
                    color: brandColors.neutral.gray500,
                  }}
                >
                  {unit}
                </Box>
              )}
            </Typography>
            {valueLabel && (
              <Typography
                sx={{
                  fontSize: 12,
                  fontFamily: chartTypography.fontFamily,
                  color: brandColors.neutral.gray500,
                  mt: 0.5,
                }}
              >
                {valueLabel}
              </Typography>
            )}
          </Box>
        )}

        {/* Min/Max labels */}
        <Box
          sx={{
            position: 'absolute',
            bottom: height * 0.25,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            px: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontFamily: chartTypography.fontFamily,
              color: brandColors.neutral.gray400,
            }}
          >
            {min}
          </Typography>
          <Typography
            sx={{
              fontSize: 11,
              fontFamily: chartTypography.fontFamily,
              color: brandColors.neutral.gray400,
            }}
          >
            {max}
          </Typography>
        </Box>
      </Box>
    </ChartWrapper>
  );
};

export default RadialBarChart;
