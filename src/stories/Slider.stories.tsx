import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Slider,
  Stack,
  Input,
  TextField,
  Paper,
} from '@mui/material';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useState } from 'react';
import { brandColors } from '../theme';

/**
 * # Sliders
 * 
 * Sliders allow users to select a value or range from a continuous or discrete set of values.
 * 
 * ## Types
 * - **Continuous**: Any value within range
 * - **Discrete**: Specific step values
 * - **Range**: Select min and max values
 * 
 * ## Features
 * - Custom marks and labels
 * - Value tooltips
 * - Input field synchronization
 */

interface SliderDemoProps {
  variant?: 'continuous' | 'discrete' | 'range' | 'withInput' | 'custom' | 'marks';
  size?: 'small' | 'medium';
}

const SliderDemo = ({ variant = 'continuous', size = 'small' }: SliderDemoProps) => {
  const [value, setValue] = useState<number>(30);
  const [rangeValue, setRangeValue] = useState<number[]>([20, 80]);
  const [inputValue, setInputValue] = useState<number>(50);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (inputValue < 0) {
      setInputValue(0);
    } else if (inputValue > 100) {
      setInputValue(100);
    }
  };

  if (variant === 'discrete') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Discrete Sliders</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sliders with specific step values. Size: {size}
        </Typography>
        <Stack spacing={5} sx={{ maxWidth: 400 }}>
          {/* Step 10 */}
          <Box>
            <Typography variant="subtitle2" gutterBottom id="step-10-slider-label">Step: 10</Typography>
            <Slider
              defaultValue={30}
              step={10}
              marks
              min={0}
              max={100}
              valueLabelDisplay="auto"
              size={size}
              aria-labelledby="step-10-slider-label"
            />
          </Box>

          {/* Step 5 */}
          <Box>
            <Typography variant="subtitle2" gutterBottom id="step-5-slider-label">Step: 5</Typography>
            <Slider
              defaultValue={25}
              step={5}
              marks
              min={0}
              max={50}
              valueLabelDisplay="auto"
              size={size}
              aria-labelledby="step-5-slider-label"
            />
          </Box>

          {/* Custom steps */}
          <Box>
            <Typography variant="subtitle2" gutterBottom id="price-tiers-slider-label">Price Tiers ($)</Typography>
            <Slider
              defaultValue={50}
              step={null}
              marks={[
                { value: 0, label: '$0' },
                { value: 25, label: '$25' },
                { value: 50, label: '$50' },
                { value: 75, label: '$75' },
                { value: 100, label: '$100' },
              ]}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              size={size}
              aria-labelledby="price-tiers-slider-label"
            />
          </Box>

          {/* Restricted values */}
          <Box>
            <Typography variant="subtitle2" gutterBottom id="quantity-slider-label">Quantity (1, 5, 10, 25, 50, 100)</Typography>
            <Slider
              defaultValue={10}
              step={null}
              marks={[
                { value: 1, label: '1' },
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 25, label: '25' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
              min={1}
              max={100}
              valueLabelDisplay="auto"
              size={size}
              aria-labelledby="quantity-slider-label"
            />
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'range') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Range Sliders</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Select a range with min and max values. Size: {size}
        </Typography>
        <Stack spacing={5} sx={{ maxWidth: 400 }}>
          {/* Basic range */}
          <Box>
            <Typography variant="subtitle2" gutterBottom id="price-range-label">Price Range: ${rangeValue[0]} - ${rangeValue[1]}</Typography>
            <Slider
              value={rangeValue}
              onChange={(_, newValue) => setRangeValue(newValue as number[])}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              size={size}
              aria-labelledby="price-range-label"
              getAriaLabel={() => 'Price range'}
              getAriaValueText={(value) => `$${value}`}
            />
          </Box>

          {/* Range with marks */}
          <Box>
            <Typography variant="subtitle2" gutterBottom id="temp-range-label">Temperature Range</Typography>
            <Slider
              value={rangeValue}
              onChange={(_, newValue) => setRangeValue(newValue as number[])}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}°F`}
              min={32}
              max={100}
              marks={[
                { value: 32, label: '32°F' },
                { value: 50, label: '50°F' },
                { value: 75, label: '75°F' },
                { value: 100, label: '100°F' },
              ]}
              size={size}
              aria-labelledby="temp-range-label"
              getAriaValueText={(value) => `${value} degrees Fahrenheit`}
            />
          </Box>

          {/* Date range style */}
          <Box>
            <Typography variant="subtitle2" gutterBottom id="year-range-label">Year Range</Typography>
            <Slider
              defaultValue={[2015, 2023]}
              valueLabelDisplay="auto"
              min={2000}
              max={2025}
              marks={[
                { value: 2000, label: '2000' },
                { value: 2010, label: '2010' },
                { value: 2020, label: '2020' },
                { value: 2025, label: '2025' },
              ]}
              size={size}
              aria-labelledby="year-range-label"
              getAriaValueText={(value) => `Year ${value}`}
            />
          </Box>

          {/* Minimum distance */}
          <Box>
            <Typography variant="subtitle2" gutterBottom id="min-distance-label">Min Distance: 10</Typography>
            <Slider
              value={rangeValue}
              onChange={(_, newValue, activeThumb) => {
                const newRange = newValue as number[];
                if (activeThumb === 0) {
                  setRangeValue([Math.min(newRange[0], rangeValue[1] - 10), rangeValue[1]]);
                } else {
                  setRangeValue([rangeValue[0], Math.max(newRange[1], rangeValue[0] + 10)]);
                }
              }}
              valueLabelDisplay="auto"
              disableSwap
              size={size}
            />
            <Typography variant="caption" color="text.secondary">
              Handles maintain minimum 10 unit distance
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'withInput') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Slider with Input Field</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Synchronized slider and input. Size: {size}
        </Typography>
        <Stack spacing={5} sx={{ maxWidth: 500 }}>
          {/* Basic with input */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Volume</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <VolumeDownIcon />
              <Slider
                value={inputValue}
                onChange={(_, newValue) => setInputValue(newValue as number)}
                aria-labelledby="input-slider"
                size={size}
                sx={{ flex: 1 }}
              />
              <VolumeUpIcon />
              <Input
                value={inputValue}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: 'number',
                  style: { width: 50, textAlign: 'center' },
                }}
              />
            </Box>
          </Box>

          {/* Percentage with input */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Discount Percentage</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Slider
                value={inputValue}
                onChange={(_, newValue) => setInputValue(newValue as number)}
                size={size}
                sx={{ flex: 1 }}
              />
              <TextField
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                size="small"
                type="number"
                InputProps={{
                  endAdornment: <Typography>%</Typography>,
                }}
                sx={{ width: 100 }}
                inputProps={{ min: 0, max: 100 }}
              />
            </Box>
          </Box>

          {/* Currency input */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Budget Amount</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Slider
                value={inputValue * 100}
                onChange={(_, newValue) => setInputValue((newValue as number) / 100)}
                min={0}
                max={10000}
                step={100}
                size={size}
                sx={{ flex: 1 }}
              />
              <TextField
                value={inputValue * 100}
                onChange={(e) => setInputValue(Number(e.target.value) / 100)}
                size="small"
                type="number"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 0.5 }}>$</Typography>,
                }}
                sx={{ width: 120 }}
                inputProps={{ min: 0, max: 10000, step: 100 }}
              />
            </Box>
          </Box>

          {/* Range with inputs */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Price Range</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                value={rangeValue[0]}
                onChange={(e) => setRangeValue([Number(e.target.value), rangeValue[1]])}
                size="small"
                type="number"
                label="Min"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 0.5 }}>$</Typography>,
                }}
                sx={{ width: 100 }}
              />
              <Slider
                value={rangeValue}
                onChange={(_, newValue) => setRangeValue(newValue as number[])}
                size={size}
                sx={{ flex: 1 }}
              />
              <TextField
                value={rangeValue[1]}
                onChange={(e) => setRangeValue([rangeValue[0], Number(e.target.value)])}
                size="small"
                type="number"
                label="Max"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 0.5 }}>$</Typography>,
                }}
                sx={{ width: 100 }}
              />
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'custom') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Custom Styled Sliders</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Size: {size}
        </Typography>
        <Stack spacing={5} sx={{ maxWidth: 400 }}>
          {/* Brand colored */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Brand Primary</Typography>
            <Slider
              defaultValue={60}
              sx={{
                color: brandColors.primary.main,
                '& .MuiSlider-thumb': {
                  bgcolor: brandColors.primary.main,
                },
              }}
              size={size}
            />
          </Box>

          {/* Secondary color */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Brand Secondary</Typography>
            <Slider
              defaultValue={40}
              sx={{
                color: brandColors.secondary.main,
                '& .MuiSlider-thumb': {
                  bgcolor: brandColors.secondary.main,
                },
              }}
              size={size}
            />
          </Box>

          {/* Gradient track */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Gradient Track</Typography>
            <Slider
              defaultValue={70}
              sx={{
                '& .MuiSlider-track': {
                  background: `linear-gradient(90deg, ${brandColors.primary.main}, ${brandColors.secondary.main})`,
                  border: 'none',
                },
                '& .MuiSlider-rail': {
                  bgcolor: 'grey.300',
                },
              }}
              size={size}
            />
          </Box>

          {/* Thick slider */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Thick Track</Typography>
            <Slider
              defaultValue={50}
              sx={{
                height: 10,
                '& .MuiSlider-track': {
                  borderRadius: 5,
                },
                '& .MuiSlider-rail': {
                  borderRadius: 5,
                },
                '& .MuiSlider-thumb': {
                  width: 24,
                  height: 24,
                },
              }}
              size={size}
            />
          </Box>

          {/* iOS style */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>iOS Style</Typography>
            <Slider
              defaultValue={60}
              sx={{
                height: 4,
                padding: '13px 0',
                '& .MuiSlider-thumb': {
                  height: 20,
                  width: 20,
                  backgroundColor: '#fff',
                  border: '1px solid currentColor',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  '&:hover': {
                    boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                  },
                },
                '& .MuiSlider-track': {
                  border: 'none',
                },
              }}
              size={size}
            />
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'marks') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Sliders with Marks</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Size: {size}
        </Typography>
        <Stack spacing={6} sx={{ maxWidth: 400 }}>
          {/* Auto marks */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Auto Marks (step: 10)</Typography>
            <Slider
              defaultValue={50}
              step={10}
              marks
              min={0}
              max={100}
              valueLabelDisplay="auto"
              size={size}
            />
          </Box>

          {/* Custom labels */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Custom Labels</Typography>
            <Slider
              defaultValue={50}
              marks={[
                { value: 0, label: 'Low' },
                { value: 25, label: '' },
                { value: 50, label: 'Medium' },
                { value: 75, label: '' },
                { value: 100, label: 'High' },
              ]}
              valueLabelDisplay="auto"
              size={size}
            />
          </Box>

          {/* Temperature */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Temperature (°C)</Typography>
            <Slider
              defaultValue={20}
              min={-10}
              max={40}
              marks={[
                { value: -10, label: '-10°' },
                { value: 0, label: '0°' },
                { value: 10, label: '10°' },
                { value: 20, label: '20°' },
                { value: 30, label: '30°' },
                { value: 40, label: '40°' },
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v}°C`}
              size={size}
            />
          </Box>

          {/* Rating style */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Satisfaction Score</Typography>
            <Slider
              defaultValue={3}
              min={1}
              max={5}
              step={1}
              marks={[
                { value: 1, label: '😠' },
                { value: 2, label: '😕' },
                { value: 3, label: '😐' },
                { value: 4, label: '🙂' },
                { value: 5, label: '😄' },
              ]}
              valueLabelDisplay="off"
              size={size}
            />
          </Box>
        </Stack>
      </Box>
    );
  }

  // continuous variant (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Continuous Sliders</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Size: {size}
      </Typography>
      <Stack spacing={4} sx={{ maxWidth: 400 }}>
        {/* Basic */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Basic</Typography>
          <Slider
            value={value}
            onChange={(_, newValue) => setValue(newValue as number)}
            size={size}
          />
        </Box>

        {/* With value label */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>With Value Label</Typography>
          <Slider
            defaultValue={50}
            valueLabelDisplay="auto"
            size={size}
          />
        </Box>

        {/* Always show label */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Always Show Label</Typography>
          <Slider
            defaultValue={30}
            valueLabelDisplay="on"
            size={size}
          />
        </Box>

        {/* Disabled */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Disabled</Typography>
          <Slider
            defaultValue={40}
            disabled
            size={size}
          />
        </Box>

        {/* Colors */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Colors</Typography>
          <Stack spacing={2}>
            <Slider defaultValue={60} color="primary" size={size} />
            <Slider defaultValue={60} color="secondary" size={size} />
            <Slider defaultValue={60} color="error" size={size} />
            <Slider defaultValue={60} color="warning" size={size} />
            <Slider defaultValue={60} color="success" size={size} />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof SliderDemo> = {
  title: 'Inputs/Slider',
  component: SliderDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Slider components for value selection.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['continuous', 'discrete', 'range', 'withInput', 'custom', 'marks'],
      description: 'Slider variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'Size of the slider',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the slider',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'success'],
      description: 'Slider color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive Slider playground - use Controls to customize.
 * This story uses the actual MUI Slider component directly.
 */
export const Playground: Story = {
  render: (args) => (
    <Box sx={{ width: 300, p: 4 }}>
      <Typography gutterBottom>Slider Playground</Typography>
      <Slider
        defaultValue={50}
        size={args.size}
        disabled={args.disabled}
        color={args.color}
        valueLabelDisplay="auto"
      />
    </Box>
  ),
  args: {
    size: 'medium',
    disabled: false,
    color: 'primary',
  },
};

/**
 * Continuous sliders.
 */
export const Continuous: Story = {
  args: {
    variant: 'continuous',
    size: 'small',
  },
};

/**
 * Discrete sliders with steps.
 */
export const Discrete: Story = {
  args: {
    variant: 'discrete',
    size: 'small',
  },
};

/**
 * Range sliders.
 */
export const Range: Story = {
  args: {
    variant: 'range',
    size: 'small',
  },
};

/**
 * Slider with input field.
 */
export const WithInput: Story = {
  args: {
    variant: 'withInput',
    size: 'small',
  },
};

/**
 * Custom styled sliders.
 */
export const Custom: Story = {
  args: {
    variant: 'custom',
    size: 'small',
  },
};

/**
 * Sliders with marks and labels.
 */
export const Marks: Story = {
  args: {
    variant: 'marks',
    size: 'small',
  },
};
