import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Stack, Paper, Grid } from '@mui/material';
import {
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  DonutChart,
  ScatterChart,
  BubbleChart,
  RadialBarChart,
  GaugeChart,
  ComposedChart,
  Sparkline,
  chartColorsPrimary,
  chartColorsCategorical,
  chartColorsSequential,
  chartColorsDiverging,
  chartColorsStatus,
} from '../components/Charts';

// ============================================================================
// SAMPLE DATA
// ============================================================================

const monthlyData = [
  { month: 'Jan', revenue: 4000, orders: 2400, target: 3500 },
  { month: 'Feb', revenue: 3000, orders: 1398, target: 3500 },
  { month: 'Mar', revenue: 5000, orders: 4800, target: 4000 },
  { month: 'Apr', revenue: 4780, orders: 3908, target: 4000 },
  { month: 'May', revenue: 5890, orders: 4800, target: 4500 },
  { month: 'Jun', revenue: 4390, orders: 3800, target: 4500 },
  { month: 'Jul', revenue: 6490, orders: 5300, target: 5000 },
];

const quarterlyData = [
  { quarter: 'Q1', desktop: 4000, mobile: 2400, tablet: 1200 },
  { quarter: 'Q2', desktop: 3000, mobile: 1398, tablet: 1800 },
  { quarter: 'Q3', desktop: 5000, mobile: 4800, tablet: 2200 },
  { quarter: 'Q4', desktop: 4780, mobile: 3908, tablet: 2600 },
];

const pieData = [
  { name: 'Chrome', value: 400 },
  { name: 'Firefox', value: 300 },
  { name: 'Safari', value: 200 },
  { name: 'Edge', value: 100 },
  { name: 'Other', value: 50 },
];

const scatterData = [
  { x: 10, y: 30, z: 200 },
  { x: 30, y: 200, z: 400 },
  { x: 45, y: 100, z: 280 },
  { x: 50, y: 180, z: 500 },
  { x: 70, y: 400, z: 350 },
  { x: 100, y: 250, z: 600 },
  { x: 110, y: 280, z: 700 },
  { x: 125, y: 320, z: 300 },
];

const radialData = [
  { name: 'Task A', value: 80 },
  { name: 'Task B', value: 65 },
  { name: 'Task C', value: 45 },
  { name: 'Task D', value: 30 },
];

const sparklineData = [10, 15, 8, 20, 14, 25, 18, 30, 22, 28, 35, 32];

// ============================================================================
// META
// ============================================================================

const meta: Meta = {
  title: 'Data Visualization/Charts',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Trinity Charts Library

A comprehensive charting library built on **Recharts** with Trinity Design System branding and styling.

## Features

- 🎨 **Trinity Brand Colors** - Consistent color palettes matching the design system
- 📊 **Multiple Chart Types** - Line, Bar, Area, Pie, Donut, Scatter, Bubble, Radial, Gauge, Composed, Sparkline
- ♿ **Accessible** - ARIA labels and keyboard navigation support
- 🌓 **Dark Mode** - Automatic theme adaptation
- 📱 **Responsive** - Charts resize to fit containers
- ✨ **Animated** - Smooth entrance and interaction animations

## Quick Start

\`\`\`tsx
import { LineChart, chartColorsPrimary } from '@trinity/design-system';

<LineChart
  data={salesData}
  series={[
    { dataKey: 'revenue', name: 'Revenue' },
    { dataKey: 'profit', name: 'Profit' },
  ]}
  xAxis={{ dataKey: 'month' }}
  title="Monthly Performance"
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;

// ============================================================================
// COLOR PALETTES STORY
// ============================================================================

const ColorSwatch: React.FC<{ color: string; index: number }> = ({ color, index }) => (
  <Box
    sx={{
      width: 40,
      height: 40,
      backgroundColor: color,
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography
      sx={{
        fontSize: 10,
        color: '#FFFFFF',
        fontWeight: 600,
        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
      }}
    >
      {index}
    </Typography>
  </Box>
);

const PaletteDisplay: React.FC<{ name: string; colors: string[]; description: string }> = ({
  name,
  colors,
  description,
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
      {name}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
      {description}
    </Typography>
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {colors.map((color, index) => (
        <ColorSwatch key={index} color={color} index={index} />
      ))}
    </Stack>
  </Box>
);

export const ColorPalettes: StoryObj = {
  render: () => (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Chart Color Palettes
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Pre-defined color palettes for different visualization needs.
      </Typography>

      <PaletteDisplay
        name="Primary (Default)"
        colors={chartColorsPrimary}
        description="Main palette for most charts. Uses Trinity brand colors as anchors."
      />

      <PaletteDisplay
        name="Categorical"
        colors={chartColorsCategorical}
        description="High-contrast colors for categorical data with clear distinctions."
      />

      <PaletteDisplay
        name="Sequential"
        colors={chartColorsSequential}
        description="Purple gradient for ordered data (low to high values)."
      />

      <PaletteDisplay
        name="Diverging"
        colors={chartColorsDiverging}
        description="For data with a meaningful midpoint (e.g., positive/negative)."
      />

      <PaletteDisplay
        name="Status"
        colors={chartColorsStatus}
        description="Semantic colors for status indicators (success, warning, error, info)."
      />
    </Box>
  ),
};

// ============================================================================
// LINE CHART STORIES
// ============================================================================

export const LineChartBasic: StoryObj = {
  name: 'Line Chart - Basic',
  render: () => (
    <LineChart
      data={monthlyData}
      series={[{ dataKey: 'revenue', name: 'Revenue', color: chartColorsPrimary[0] }]}
      xAxis={{ dataKey: 'month' }}
      title="Monthly Revenue"
      subtitle="2024 fiscal year"
      height={350}
    />
  ),
};

export const LineChartMultiSeries: StoryObj = {
  name: 'Line Chart - Multi Series',
  render: () => (
    <LineChart
      data={monthlyData}
      series={[
        { dataKey: 'revenue', name: 'Revenue' },
        { dataKey: 'orders', name: 'Orders' },
        { dataKey: 'target', name: 'Target', strokeDasharray: '5 5' },
      ]}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ label: 'Amount ($)' }}
      title="Revenue vs Orders"
      height={400}
    />
  ),
};

export const LineChartWithArea: StoryObj = {
  name: 'Line Chart - With Area Fill',
  render: () => (
    <LineChart
      data={monthlyData}
      series={[{ dataKey: 'revenue', name: 'Revenue' }]}
      xAxis={{ dataKey: 'month' }}
      title="Revenue Trend"
      showArea
      curveType="monotone"
      height={350}
    />
  ),
};

// ============================================================================
// BAR CHART STORIES
// ============================================================================

export const BarChartGrouped: StoryObj = {
  name: 'Bar Chart - Grouped',
  render: () => (
    <BarChart
      data={quarterlyData}
      series={[
        { dataKey: 'desktop', name: 'Desktop' },
        { dataKey: 'mobile', name: 'Mobile' },
        { dataKey: 'tablet', name: 'Tablet' },
      ]}
      xAxis={{ dataKey: 'quarter' }}
      title="Traffic by Device"
      subtitle="Quarterly breakdown"
      variant="grouped"
      height={400}
    />
  ),
};

export const BarChartStacked: StoryObj = {
  name: 'Bar Chart - Stacked',
  render: () => (
    <BarChart
      data={quarterlyData}
      series={[
        { dataKey: 'desktop', name: 'Desktop' },
        { dataKey: 'mobile', name: 'Mobile' },
        { dataKey: 'tablet', name: 'Tablet' },
      ]}
      xAxis={{ dataKey: 'quarter' }}
      title="Total Traffic"
      variant="stacked"
      height={400}
    />
  ),
};

export const BarChartHorizontal: StoryObj = {
  name: 'Bar Chart - Horizontal',
  render: () => (
    <BarChart
      data={[
        { category: 'Electronics', sales: 4500 },
        { category: 'Clothing', sales: 3200 },
        { category: 'Food', sales: 2800 },
        { category: 'Books', sales: 1500 },
        { category: 'Home', sales: 2100 },
      ]}
      series={[{ dataKey: 'sales', name: 'Sales' }]}
      xAxis={{ dataKey: 'category' }}
      title="Sales by Category"
      layout="horizontal"
      height={350}
    />
  ),
};

// ============================================================================
// AREA CHART STORIES
// ============================================================================

export const AreaChartBasic: StoryObj = {
  name: 'Area Chart - Basic',
  render: () => (
    <AreaChart
      data={monthlyData}
      series={[{ dataKey: 'revenue', name: 'Revenue' }]}
      xAxis={{ dataKey: 'month' }}
      title="Revenue Over Time"
      height={350}
    />
  ),
};

export const AreaChartStacked: StoryObj = {
  name: 'Area Chart - Stacked',
  render: () => (
    <AreaChart
      data={quarterlyData}
      series={[
        { dataKey: 'desktop', name: 'Desktop' },
        { dataKey: 'mobile', name: 'Mobile' },
        { dataKey: 'tablet', name: 'Tablet' },
      ]}
      xAxis={{ dataKey: 'quarter' }}
      title="Traffic Sources"
      stacked
      height={400}
    />
  ),
};

// ============================================================================
// PIE CHART STORIES
// ============================================================================

export const PieChartBasic: StoryObj = {
  name: 'Pie Chart - Basic',
  render: () => (
    <PieChart
      data={pieData}
      title="Browser Market Share"
      height={350}
      showLabels
      labelType="percent"
    />
  ),
};

export const DonutChartWithCenter: StoryObj = {
  name: 'Donut Chart - With Center Content',
  render: () => {
    const total = pieData.reduce((sum, d) => sum + d.value, 0);
    return (
      <DonutChart
        data={pieData}
        title="Browser Market Share"
        height={350}
        centerContent={
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700}>
              {total.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Users
            </Typography>
          </Box>
        }
      />
    );
  },
};

// ============================================================================
// SCATTER CHART STORIES
// ============================================================================

export const ScatterChartBasic: StoryObj = {
  name: 'Scatter Chart - Basic',
  render: () => (
    <ScatterChart
      data={scatterData}
      xAxis={{ label: 'Time (hours)' }}
      yAxis={{ label: 'Value' }}
      title="Distribution Analysis"
      height={400}
    />
  ),
};

export const BubbleChartExample: StoryObj = {
  name: 'Bubble Chart',
  render: () => (
    <BubbleChart
      data={[
        { name: 'Series A', data: scatterData.slice(0, 4), color: chartColorsPrimary[0] },
        { name: 'Series B', data: scatterData.slice(4), color: chartColorsPrimary[1] },
      ]}
      xAxis={{ label: 'X Axis' }}
      yAxis={{ label: 'Y Axis' }}
      zAxis={{ range: [20, 60] }}
      title="Multi-Dimensional Analysis"
      height={400}
    />
  ),
};

// ============================================================================
// RADIAL CHART STORIES
// ============================================================================

export const RadialBarChartExample: StoryObj = {
  name: 'Radial Bar Chart',
  render: () => (
    <RadialBarChart
      data={radialData}
      title="Task Completion"
      height={300}
    />
  ),
};

export const GaugeChartExample: StoryObj = {
  name: 'Gauge Chart',
  render: () => (
    <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
      <GaugeChart
        value={75}
        max={100}
        title="CPU Usage"
        unit="%"
        height={200}
        thresholds={[
          { value: 50, color: chartColorsStatus[0] },
          { value: 80, color: chartColorsStatus[1] },
          { value: 100, color: chartColorsStatus[2] },
        ]}
      />
      <GaugeChart
        value={42}
        max={100}
        title="Memory"
        unit="%"
        height={200}
        color={chartColorsPrimary[0]}
      />
      <GaugeChart
        value={92}
        max={100}
        title="Disk"
        unit="%"
        height={200}
        thresholds={[
          { value: 70, color: chartColorsStatus[0] },
          { value: 90, color: chartColorsStatus[1] },
          { value: 100, color: chartColorsStatus[2] },
        ]}
      />
    </Stack>
  ),
};

// ============================================================================
// COMPOSED CHART STORIES
// ============================================================================

export const ComposedChartExample: StoryObj = {
  name: 'Composed Chart',
  render: () => (
    <ComposedChart
      data={monthlyData}
      xAxisKey="month"
      series={[
        { key: 'revenue', type: 'bar', name: 'Revenue' },
        { key: 'orders', type: 'line', name: 'Orders' },
        { key: 'target', type: 'area', name: 'Target', fillOpacity: 0.3 },
      ]}
      title="Sales Dashboard"
      subtitle="Combined visualization"
      height={400}
      referenceLines={[
        { y: 4500, label: 'Goal', color: chartColorsStatus[0], strokeDasharray: '4 4' },
      ]}
    />
  ),
};

// ============================================================================
// SPARKLINE STORIES
// ============================================================================

const SparklineExamplesDemo = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Sparkline Charts
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Compact inline charts for data-dense UIs like tables and dashboards.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Revenue
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Sparkline
                data={sparklineData}
                type="line"
                width={100}
                height={32}
                color={chartColorsPrimary[0]}
              />
              <Typography variant="h6" color="success.main">
                +12%
              </Typography>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Orders
            </Typography>
            <Sparkline
              data={sparklineData}
              type="bar"
              width={100}
              height={32}
              color={chartColorsPrimary[1]}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Trend
            </Typography>
            <Sparkline
              data={sparklineData}
              type="area"
              width={100}
              height={32}
              color={chartColorsPrimary[2]}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Status
            </Typography>
            <Sparkline
              data={sparklineData}
              type="line"
              width={100}
              height={32}
              color={chartColorsStatus.error}
              showDots
            />
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export const SparklineExamples: StoryObj = {
  name: 'Sparklines',
  render: () => <SparklineExamplesDemo />,
};

// ============================================================================
// DASHBOARD EXAMPLE
// ============================================================================

export const DashboardExample: StoryObj = {
  name: 'Dashboard Layout',
  render: () => (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Cards with Sparklines */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Total Revenue
            </Typography>
            <Stack direction="row" alignItems="flex-end" spacing={2}>
              <Typography variant="h4" fontWeight={700}>
                $124,500
              </Typography>
              <Sparkline
                data={sparklineData}
                type="area"
                width={80}
                height={28}
                color={chartColorsStatus[0]}
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Active Users
            </Typography>
            <Stack direction="row" alignItems="flex-end" spacing={2}>
              <Typography variant="h4" fontWeight={700}>
                8,234
              </Typography>
              <Sparkline
                data={[15, 12, 18, 14, 20, 25, 22, 28, 30, 26]}
                type="line"
                width={80}
                height={28}
                color={chartColorsPrimary[0]}
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Conversion Rate
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <GaugeChart
                value={68}
                max={100}
                unit="%"
                height={80}
                showValue
                color={chartColorsPrimary[0]}
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Main Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <ComposedChart
              data={monthlyData}
              xAxisKey="month"
              series={[
                { key: 'revenue', type: 'bar', name: 'Revenue' },
                { key: 'orders', type: 'line', name: 'Orders' },
              ]}
              title="Monthly Performance"
              height={350}
            />
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <DonutChart
              data={pieData}
              title="Traffic Sources"
              height={350}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  ),
};
