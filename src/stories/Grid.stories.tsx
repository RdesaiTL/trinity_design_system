import type { Meta, StoryObj } from '@storybook/react';
import {
  Grid,
  Box,
  Paper,
  Typography,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { brandColors } from '../theme';

/**
 * # Grid (v2)
 * 
 * The responsive layout grid adapts to screen size and orientation, ensuring
 * consistency across layouts. The Grid component works well for a layout with 
 * a known number of columns.
 * 
 * ## How it works
 * - Uses **CSS Flexbox** for high flexibility
 * - The grid is always a flex item. Use the `container` prop to add a flex container
 * - Item widths are set in percentages, so they're always fluid and sized relative to their parent
 * - **Five default breakpoints**: xs, sm, md, lg, and xl
 * - Uses the **gap CSS property** to add spacing between items
 * 
 * ## Key Props
 * - `container` - Makes the Grid a flex container
 * - `size` - Column span (1-12) or object with breakpoint values
 * - `spacing` - Gap between items (uses theme.spacing)
 * - `columns` - Total columns (default: 12)
 * - `offset` - Push item to the right
 * 
 * ## Breakpoints
 * | Breakpoint | Width |
 * |------------|-------|
 * | xs | 0px+ |
 * | sm | 600px+ |
 * | md | 900px+ |
 * | lg | 1200px+ |
 * | xl | 1536px+ |
 */

// Styled item for demos
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? brandColors.neutral.darkPaper : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 8,
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
}));

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A responsive 12-column grid layout system based on CSS Flexbox.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic grid layout with fixed column sizes.
 * Column widths are integers between 1 and 12.
 */
export const BasicGrid: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Item>size=8</Item>
        </Grid>
        <Grid size={4}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={4}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={8}>
          <Item>size=8</Item>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Items can have multiple widths defined for different breakpoints.
 * Width values apply to all wider breakpoints.
 * 
 * Resize the browser to see the responsive behavior:
 * - **xs-sm**: 6 columns each (2 per row)
 * - **md+**: First row 8+4, second row 4+8
 */
export const MultipleBreakpoints: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 8 }}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Control the space between children using the `spacing` prop.
 * The spacing value can be any positive number.
 */
export const Spacing: Story = {
  render: function SpacingDemo() {
    const [spacing, setSpacing] = useState(2);

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Spacing: {spacing}</Typography>
          <Slider
            value={spacing}
            onChange={(_, value) => setSpacing(value as number)}
            min={0}
            max={8}
            step={0.5}
            marks
            sx={{ maxWidth: 300 }}
            aria-label="Grid spacing"
          />
        </Box>
        <Grid container spacing={spacing}>
          {[0, 1, 2, 3].map((value) => (
            <Grid key={value} size={{ xs: 6, sm: 3 }}>
              <Item>{value + 1}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  },
};

/**
 * Use `rowSpacing` and `columnSpacing` to control gaps independently.
 */
export const RowAndColumnSpacing: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={6}>
          <Item>1</Item>
        </Grid>
        <Grid size={6}>
          <Item>2</Item>
        </Grid>
        <Grid size={6}>
          <Item>3</Item>
        </Grid>
        <Grid size={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * The auto-layout feature gives equal space to all items.
 * Use `size="grow"` to fill remaining space.
 */
export const AutoLayout: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid size="grow">
          <Item>size=grow</Item>
        </Grid>
        <Grid size={6}>
          <Item>size=6</Item>
        </Grid>
        <Grid size="grow">
          <Item>size=grow</Item>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Use `size="auto"` to size columns based on content width.
 */
export const VariableWidthContent: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid size="auto">
          <Item>size=auto (content width)</Item>
        </Grid>
        <Grid size={6}>
          <Item>size=6</Item>
        </Grid>
        <Grid size="grow">
          <Item>size=grow</Item>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Change the default number of columns (12) using the `columns` prop.
 */
export const CustomColumns: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="subtitle2" gutterBottom color="text.secondary">
        16-column grid
      </Typography>
      <Grid container spacing={2} columns={16}>
        <Grid size={8}>
          <Item>size=8/16</Item>
        </Grid>
        <Grid size={8}>
          <Item>size=8/16</Item>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Use the `offset` prop to push items to the right.
 * Accepts numbers or "auto" for far-right positioning.
 */
export const Offset: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}>
          <Item>1</Item>
        </Grid>
        <Grid size={{ xs: 4, md: 2 }} offset={{ md: 'auto' }}>
          <Item>2</Item>
        </Grid>
        <Grid size={{ xs: 4, md: 2 }} offset={{ xs: 4, md: 0 }}>
          <Item>3</Item>
        </Grid>
        <Grid size={{ xs: 'grow', md: 6 }} offset={{ md: 2 }}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Nested grid containers inherit columns and spacing from their parent.
 */
export const NestedGrid: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Item sx={{ p: 0, overflow: 'hidden' }}>
            <Box sx={{ p: 2, bgcolor: brandColors.primary.main, color: 'white' }}>
              Parent Grid (md=6)
            </Box>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={1}>
                <Grid size={6}>
                  <Item sx={{ bgcolor: brandColors.neutral.lightGray }}>Nested 1</Item>
                </Grid>
                <Grid size={6}>
                  <Item sx={{ bgcolor: brandColors.neutral.lightGray }}>Nested 2</Item>
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Item sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Right Column (md=6)
          </Item>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Interactive demo to explore direction, justifyContent, and alignItems.
 */
export const Interactive: Story = {
  render: function InteractiveDemo() {
    const [direction, setDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
    const [justifyContent, setJustifyContent] = useState('center');
    const [alignItems, setAlignItems] = useState('center');

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 3 }}>
          <FormControl>
            <FormLabel id="direction-label">direction</FormLabel>
            <RadioGroup
              aria-labelledby="direction-label"
              value={direction}
              onChange={(e) => setDirection(e.target.value as typeof direction)}
              row
            >
              <FormControlLabel value="row" control={<Radio size="small" />} label="row" />
              <FormControlLabel value="row-reverse" control={<Radio size="small" />} label="row-reverse" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="justify-label">justifyContent</FormLabel>
            <RadioGroup
              aria-labelledby="justify-label"
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value)}
              row
            >
              <FormControlLabel value="flex-start" control={<Radio size="small" />} label="flex-start" />
              <FormControlLabel value="center" control={<Radio size="small" />} label="center" />
              <FormControlLabel value="flex-end" control={<Radio size="small" />} label="flex-end" />
              <FormControlLabel value="space-between" control={<Radio size="small" />} label="space-between" />
              <FormControlLabel value="space-around" control={<Radio size="small" />} label="space-around" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="align-label">alignItems</FormLabel>
            <RadioGroup
              aria-labelledby="align-label"
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value)}
              row
            >
              <FormControlLabel value="flex-start" control={<Radio size="small" />} label="flex-start" />
              <FormControlLabel value="center" control={<Radio size="small" />} label="center" />
              <FormControlLabel value="flex-end" control={<Radio size="small" />} label="flex-end" />
              <FormControlLabel value="stretch" control={<Radio size="small" />} label="stretch" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Paper sx={{ p: 2, bgcolor: brandColors.neutral.lightGray, minHeight: 200 }}>
          <Grid
            container
            direction={direction}
            spacing={2}
            sx={{
              justifyContent,
              alignItems,
              minHeight: 150,
            }}
          >
            <Grid>
              <Item>Cell 1</Item>
            </Grid>
            <Grid>
              <Item>Cell 2</Item>
            </Grid>
            <Grid>
              <Item>Cell 3</Item>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
{`<Grid
  container
  direction="${direction}"
  sx={{
    justifyContent: "${justifyContent}",
    alignItems: "${alignItems}",
  }}
>`}
          </Typography>
        </Box>
      </Box>
    );
  },
};

/**
 * Responsive grid that adapts to Material Design recommendations.
 * Resize the browser to see the layout change.
 */
export const ResponsiveGrid: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>{index + 1}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  ),
};

/**
 * Center content within grid items using flex properties.
 */
export const CenteredElements: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ minHeight: 160 }}>
        <Grid size="grow" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: brandColors.primary.main }}>A</Avatar>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: brandColors.secondary.main }}>B</Avatar>
        </Grid>
        <Grid size="grow" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: brandColors.primary.light }}>C</Avatar>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Full-width items on mobile, multi-column on larger screens.
 * A common pattern for card layouts.
 */
export const CardLayout: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
            <Item sx={{ py: 4 }}>
              <Typography variant="h6" gutterBottom>
                Card {item}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Full width on mobile, 2 columns on tablet, 3 columns on desktop.
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  ),
};

/**
 * Use Stack inside Grid for vertical layouts within columns.
 * Note: `direction="column"` is not recommended for Grid itself.
 */
export const WithStackForVerticalLayout: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Stack spacing={2}>
            <Item>Column 1 - Row 1</Item>
            <Item>Column 1 - Row 2</Item>
            <Item>Column 1 - Row 3</Item>
          </Stack>
        </Grid>
        <Grid size={8}>
          <Item sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Column 2 (Full Height)
          </Item>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Common dashboard layout pattern with sidebar and main content area.
 */
export const DashboardLayout: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* Sidebar - hidden on mobile */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Item sx={{ minHeight: { xs: 'auto', md: 400 } }}>
            <Typography variant="subtitle2" gutterBottom>
              Sidebar
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {['Dashboard', 'Reports', 'Analytics', 'Settings'].map((item) => (
                <Box
                  key={item}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: item === 'Dashboard' ? brandColors.primary.main : 'transparent',
                    color: item === 'Dashboard' ? 'white' : 'inherit',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: item === 'Dashboard' ? brandColors.primary.main : 'action.hover',
                    },
                  }}
                >
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Stack>
          </Item>
        </Grid>

        {/* Main content */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Grid container spacing={2}>
            {/* Stats row */}
            {['Users', 'Revenue', 'Orders', 'Growth'].map((stat, i) => (
              <Grid key={stat} size={{ xs: 6, sm: 3 }}>
                <Item>
                  <Typography variant="caption" color="text.secondary">
                    {stat}
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {['1,234', '$45.6K', '89', '+12%'][i]}
                  </Typography>
                </Item>
              </Grid>
            ))}

            {/* Chart area */}
            <Grid size={12}>
              <Item sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">Chart Area</Typography>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ),
};
