/**
 * PieChart & DonutChart Components
 * Trinity-styled pie and donut charts
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { ChartWrapper } from './ChartWrapper';
import { PieLegend } from './CustomLegend';
import {
  chartColorsPrimary,
  chartTypography,
  chartTooltipStyles,
  chartAnimation,
  getChartColor,
} from './tokens';
import { PieChartProps, PieDataPoint, PieActiveShapeProps, ChartTooltipRenderProps, PieLabelRenderProps } from './types';
import { brandColors } from '../../tokens';

/**
 * Custom active shape for pie hover state
 */
const renderActiveShape = (props: PieActiveShapeProps) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))' }}
      />
    </g>
  );
};

/**
 * PieTooltipContent - Hoisted tooltip component for pie charts
 * Defined outside the render function to avoid creating components during render
 */
interface PieTooltipContentProps extends ChartTooltipRenderProps {
  total: number;
}

const PieTooltipContent: React.FC<PieTooltipContentProps> = ({
  active,
  payload,
  total,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const item = payload[0];
  const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';

  return (
    <Box
      sx={{
        backgroundColor: chartTooltipStyles.backgroundColor,
        border: `1px solid ${chartTooltipStyles.borderColor}`,
        borderRadius: `${chartTooltipStyles.borderRadius}px`,
        boxShadow: chartTooltipStyles.boxShadow,
        padding: chartTooltipStyles.padding,
        minWidth: 120,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: item.payload.fill,
          }}
        />
        <Typography
          sx={{
            ...chartTypography.tooltipLabel,
            fontFamily: chartTypography.fontFamily,
          }}
        >
          {item.name}
        </Typography>
      </Box>
      <Typography
        sx={{
          ...chartTypography.tooltip,
          fontFamily: chartTypography.fontFamily,
          fontWeight: 600,
        }}
      >
        {item.value.toLocaleString()} ({percent}%)
      </Typography>
    </Box>
  );
};

/**
 * getLabelText - Pure function to generate pie chart labels
 */
const getLabelText = (
  entry: PieLabelRenderProps,
  total: number,
  showLabels: boolean,
  labelType: 'percent' | 'value' | 'name'
): string | null => {
  if (!showLabels) return null;
  
  const percent = total > 0 ? ((entry.value / total) * 100).toFixed(0) : '0';
  
  switch (labelType) {
    case 'value':
      return entry.value.toLocaleString();
    case 'name':
      return entry.name;
    case 'percent':
    default:
      return `${percent}%`;
  }
};

/**
 * PieChart - Trinity-styled pie chart
 * 
 * @example
 * ```tsx
 * <PieChart
 *   data={[
 *     { name: 'Desktop', value: 400 },
 *     { name: 'Mobile', value: 300 },
 *     { name: 'Tablet', value: 200 },
 *   ]}
 *   title="Traffic by Device"
 * />
 * ```
 */
export const PieChart: React.FC<PieChartProps> = ({
  data,
  height = 300,
  width = '100%',
  title,
  subtitle,
  innerRadius = 0,
  paddingAngle = 2,
  cornerRadius = 4,
  startAngle = 90,
  endAngle = -270,
  showLabels = false,
  labelType = 'percent',
  colors = chartColorsPrimary,
  legend = { show: true, position: 'right' },
  tooltip = { show: true },
  animate = true,
  animationDuration = chartAnimation.duration,
  loading = false,
  emptyMessage,
  error,
  centerContent,
  sx,
  onSegmentClick,
  ariaLabel,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isEmpty = !data || data.length === 0;

  // Calculate total for percentages
  const total = useMemo(() => 
    data?.reduce((sum, item) => sum + item.value, 0) || 0,
    [data]
  );

  // Memoized tooltip render function (avoids creating component during render)
  const renderTooltip = useCallback(
    (props: ChartTooltipRenderProps) => (
      <PieTooltipContent {...props} total={total} />
    ),
    [total]
  );

  // Memoized label renderer (avoids creating function during render)
  const renderLabel = useCallback(
    (entry: PieLabelRenderProps) => getLabelText(entry, total, showLabels, labelType),
    [total, showLabels, labelType]
  );

  // Calculate pie dimensions
  const isDonut = innerRadius > 0;
  const legendOnSide = legend.position === 'left' || legend.position === 'right';
  
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: legendOnSide ? 'row' : 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {/* Legend on left */}
        {legend.show !== false && legend.position === 'left' && (
          <Box sx={{ flexShrink: 0, pr: 2 }}>
            <PieLegend
              payload={data?.map((d, i) => ({
                value: d.name,
                color: d.color || colors[i % colors.length] || getChartColor(i),
              }))}
              data={data}
              direction="vertical"
              showValues
              showPercent
            />
          </Box>
        )}

        {/* Chart */}
        <Box sx={{ flex: 1, position: 'relative', minWidth: 0, height: '100%' }}>
          <ResponsiveContainer width="100%" height={height}>
            <RechartsPieChart aria-label={ariaLabel || title || 'Pie chart'}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={isDonut ? `${innerRadius * 100}%` : 0}
                outerRadius="80%"
                paddingAngle={paddingAngle}
                cornerRadius={cornerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                dataKey="value"
                nameKey="name"
                label={showLabels ? renderLabel : false}
                labelLine={showLabels ? { stroke: brandColors.neutral.gray400 } : false}
                activeIndex={activeIndex ?? undefined}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={
                  onSegmentClick
                    ? (data, index) => onSegmentClick(data as PieDataPoint, index)
                    : undefined
                }
                isAnimationActive={animate}
                animationDuration={animationDuration}
                style={onSegmentClick ? { cursor: 'pointer' } : undefined}
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || colors[index % colors.length] || getChartColor(index)}
                  />
                ))}
              </Pie>

              {tooltip.show !== false && <Tooltip content={renderTooltip} />}
            </RechartsPieChart>
          </ResponsiveContainer>

          {/* Center content for donut chart */}
          {isDonut && centerContent && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              {centerContent}
            </Box>
          )}
        </Box>

        {/* Legend on right */}
        {legend.show !== false && legend.position === 'right' && (
          <Box sx={{ flexShrink: 0, pl: 2 }}>
            <PieLegend
              payload={data?.map((d, i) => ({
                value: d.name,
                color: d.color || colors[i % colors.length] || getChartColor(i),
              }))}
              data={data}
              direction="vertical"
              showValues
              showPercent
            />
          </Box>
        )}

        {/* Legend on bottom */}
        {legend.show !== false && legend.position === 'bottom' && (
          <Box sx={{ pt: 2, width: '100%' }}>
            <PieLegend
              payload={data?.map((d, i) => ({
                value: d.name,
                color: d.color || colors[i % colors.length] || getChartColor(i),
              }))}
              data={data}
              direction="horizontal"
              showValues={false}
              showPercent
            />
          </Box>
        )}
      </Box>
    </ChartWrapper>
  );
};

/**
 * DonutChart - Convenience wrapper for PieChart with inner radius
 * 
 * @example
 * ```tsx
 * <DonutChart
 *   data={[
 *     { name: 'Completed', value: 75 },
 *     { name: 'Remaining', value: 25 },
 *   ]}
 *   centerContent={
 *     <Box>
 *       <Typography variant="h4">75%</Typography>
 *       <Typography variant="caption">Complete</Typography>
 *     </Box>
 *   }
 * />
 * ```
 */
export const DonutChart: React.FC<PieChartProps> = (props) => {
  return <PieChart {...props} innerRadius={props.innerRadius || 0.6} />;
};

export default PieChart;
