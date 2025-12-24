import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Rating,
  Stack,
  IconButton,
  FormControlLabel,
  Paper,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useState } from 'react';
import { brandColors } from '../theme';

/**
 * # Ratings
 * 
 * Rating components allow users to provide feedback on products,
 * services, or content using visual indicators.
 * 
 * ## Types
 * - **Star Rating**: Traditional 5-star rating
 * - **Thumbs Up/Down**: Binary feedback
 * - **Custom Icons**: Hearts, emojis, etc.
 * 
 * ## Features
 * - Labels for each rating level
 * - Hover feedback
 * - Half ratings
 * - Read-only display
 */

interface RatingsDemoProps {
  variant?: 'stars' | 'thumbs' | 'withLabels' | 'customIcons' | 'sizes' | 'interactive';
  size?: 'small' | 'medium' | 'large';
}

const starLabels: { [key: number]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const customIcons: { [key: number]: { icon: React.ReactElement; label: string } } = {
  1: { icon: <SentimentVeryDissatisfiedIcon color="error" />, label: 'Very Dissatisfied' },
  2: { icon: <SentimentDissatisfiedIcon color="error" />, label: 'Dissatisfied' },
  3: { icon: <SentimentSatisfiedIcon color="warning" />, label: 'Neutral' },
  4: { icon: <SentimentSatisfiedAltIcon color="success" />, label: 'Satisfied' },
  5: { icon: <SentimentVerySatisfiedIcon color="success" />, label: 'Very Satisfied' },
};

function IconContainer(props: { value: number }) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const RatingsDemo = ({ variant = 'stars', size = 'small' }: RatingsDemoProps) => {
  const [starValue, setStarValue] = useState<number | null>(3);
  const [hoverValue, setHoverValue] = useState(-1);
  const [thumbsValue, setThumbsValue] = useState<'up' | 'down' | null>(null);
  const [heartValue, setHeartValue] = useState<number | null>(3);
  const [emojiValue, setEmojiValue] = useState<number | null>(4);

  if (variant === 'thumbs') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Thumbs Up / Down Rating</Typography>
        <Stack spacing={4}>
          {/* Basic thumbs */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Was this helpful?</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                onClick={() => setThumbsValue(thumbsValue === 'up' ? null : 'up')}
                color={thumbsValue === 'up' ? 'primary' : 'default'}
                sx={{
                  bgcolor: thumbsValue === 'up' ? 'primary.light' : 'grey.100',
                  '&:hover': { bgcolor: thumbsValue === 'up' ? 'primary.light' : 'grey.200' },
                }}
              >
                {thumbsValue === 'up' ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              </IconButton>
              <IconButton
                onClick={() => setThumbsValue(thumbsValue === 'down' ? null : 'down')}
                color={thumbsValue === 'down' ? 'error' : 'default'}
                sx={{
                  bgcolor: thumbsValue === 'down' ? 'error.light' : 'grey.100',
                  '&:hover': { bgcolor: thumbsValue === 'down' ? 'error.light' : 'grey.200' },
                }}
              >
                {thumbsValue === 'down' ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
              </IconButton>
            </Stack>
          </Box>

          {/* With counts */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>With Vote Counts</Typography>
            <Stack direction="row" spacing={3} alignItems="center">
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <IconButton color="primary" size={size}>
                  <ThumbUpIcon />
                </IconButton>
                <Typography variant="body2">1,234</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <IconButton color="default" size={size}>
                  <ThumbDownOutlinedIcon />
                </IconButton>
                <Typography variant="body2">56</Typography>
              </Stack>
            </Stack>
          </Box>

          {/* In context */}
          <Paper sx={{ p: 2, maxWidth: 400 }}>
            <Typography variant="subtitle1" gutterBottom>Article Feedback</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Did you find this article helpful?
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{ 
                  border: 1, 
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'success.light', borderColor: 'success.main' },
                }}
              >
                <ThumbUpOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ 
                  border: 1, 
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'error.light', borderColor: 'error.main' },
                }}
              >
                <ThumbDownOutlinedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Paper>

          {/* Labeled thumbs */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>With Labels</Typography>
            <Stack direction="row" spacing={2}>
              <Paper 
                sx={{ 
                  p: 1.5, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  cursor: 'pointer',
                  border: 2,
                  borderColor: thumbsValue === 'up' ? 'success.main' : 'transparent',
                  '&:hover': { bgcolor: 'grey.50' },
                }}
                onClick={() => setThumbsValue('up')}
              >
                <ThumbUpOutlinedIcon color={thumbsValue === 'up' ? 'success' : 'action'} />
                <Typography variant="body2">Yes, helpful</Typography>
              </Paper>
              <Paper 
                sx={{ 
                  p: 1.5, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  cursor: 'pointer',
                  border: 2,
                  borderColor: thumbsValue === 'down' ? 'error.main' : 'transparent',
                  '&:hover': { bgcolor: 'grey.50' },
                }}
                onClick={() => setThumbsValue('down')}
              >
                <ThumbDownOutlinedIcon color={thumbsValue === 'down' ? 'error' : 'action'} />
                <Typography variant="body2">Not helpful</Typography>
              </Paper>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'withLabels') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Rating with Labels</Typography>
        <Stack spacing={4}>
          {/* Hover labels */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Hover to see labels</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Rating
                value={starValue}
                precision={0.5}
                size={size}
                onChange={(_, newValue) => setStarValue(newValue)}
                onChangeActive={(_, newHover) => setHoverValue(newHover)}
                emptyIcon={<StarBorderIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {starValue !== null && (
                <Typography variant="body2" sx={{ minWidth: 80 }}>
                  {starLabels[hoverValue !== -1 ? hoverValue : starValue]}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Fixed labels */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>With Fixed Label Descriptions</Typography>
            <Stack spacing={1}>
              {[5, 4, 3, 2, 1].map((value) => (
                <Box key={value} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Rating value={value} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    {value === 5 && 'Excellent - Exceeded expectations'}
                    {value === 4 && 'Good - Met expectations'}
                    {value === 3 && 'Average - Acceptable'}
                    {value === 2 && 'Below Average - Needs improvement'}
                    {value === 1 && 'Poor - Did not meet expectations'}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Rating breakdown */}
          <Paper sx={{ p: 2, maxWidth: 350 }}>
            <Typography variant="subtitle2" gutterBottom>Rating Breakdown</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h3">4.5</Typography>
              <Box>
                <Rating value={4.5} readOnly precision={0.1} />
                <Typography variant="body2" color="text.secondary">
                  Based on 2,456 reviews
                </Typography>
              </Box>
            </Box>
            <Stack spacing={0.5}>
              {[
                { stars: 5, percent: 68 },
                { stars: 4, percent: 20 },
                { stars: 3, percent: 8 },
                { stars: 2, percent: 3 },
                { stars: 1, percent: 1 },
              ].map((item) => (
                <Box key={item.stars} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ width: 12 }}>{item.stars}</Typography>
                  <StarIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                  <Box sx={{ flex: 1, bgcolor: 'grey.200', height: 8, borderRadius: 4 }}>
                    <Box 
                      sx={{ 
                        width: `${item.percent}%`, 
                        bgcolor: 'warning.main', 
                        height: '100%',
                        borderRadius: 4,
                      }} 
                    />
                  </Box>
                  <Typography variant="caption" sx={{ width: 32 }}>{item.percent}%</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    );
  }

  if (variant === 'customIcons') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Custom Icon Ratings</Typography>
        <Stack spacing={4}>
          {/* Heart rating */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Heart Rating</Typography>
            <Rating
              value={heartValue}
              onChange={(_, newValue) => setHeartValue(newValue)}
              icon={<FavoriteIcon sx={{ color: brandColors.tertiary.main }} />}
              emptyIcon={<FavoriteBorderIcon />}
              size={size}
            />
          </Box>

          {/* Emoji rating */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Satisfaction Rating</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Rating
                value={emojiValue}
                onChange={(_, newValue) => setEmojiValue(newValue)}
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
                size={size}
              />
              {emojiValue && (
                <Typography variant="body2">
                  {customIcons[emojiValue].label}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Custom colored stars */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Brand Colored</Typography>
            <Rating
              value={4}
              readOnly
              icon={<StarIcon sx={{ color: brandColors.secondary.main }} />}
              emptyIcon={<StarBorderIcon sx={{ color: brandColors.secondary.light }} />}
              size={size}
            />
          </Box>

          {/* 10-star rating */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>10-Point Scale</Typography>
            <Rating
              max={10}
              value={7}
              size="small"
              icon={<StarIcon sx={{ color: brandColors.accent.main }} />}
              emptyIcon={<StarBorderIcon />}
            />
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'sizes') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Rating Sizes</Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Small</Typography>
            <Rating value={4} size="small" />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Medium (default)</Typography>
            <Rating value={4} size="medium" />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Large</Typography>
            <Rating value={4} size="large" />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Custom Size (48px)</Typography>
            <Rating 
              value={4} 
              sx={{ 
                fontSize: 48,
                '& .MuiRating-icon': { fontSize: 'inherit' },
              }} 
            />
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'interactive') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Interactive Rating Examples</Typography>
        <Stack spacing={4}>
          {/* Product review */}
          <Paper sx={{ p: 3, maxWidth: 400 }}>
            <Typography variant="subtitle1" gutterBottom>Rate this product</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating
                value={starValue}
                onChange={(_, newValue) => setStarValue(newValue)}
                size="large"
              />
              {starValue && (
                <Typography variant="body2" color="primary.main" fontWeight={500}>
                  {starValue} star{starValue !== 1 ? 's' : ''}
                </Typography>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Click to rate
            </Typography>
          </Paper>

          {/* Half-star precision */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Half-Star Precision</Typography>
            <Rating
              value={starValue}
              precision={0.5}
              onChange={(_, newValue) => setStarValue(newValue)}
              size={size}
            />
          </Box>

          {/* Read-only with value */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Read-Only Display</Typography>
            <Stack direction="row" spacing={3}>
              <Box>
                <Rating value={4.5} readOnly precision={0.1} size={size} />
                <Typography variant="caption" display="block">4.5 / 5</Typography>
              </Box>
              <Box>
                <Rating value={3.7} readOnly precision={0.1} size={size} />
                <Typography variant="caption" display="block">3.7 / 5</Typography>
              </Box>
              <Box>
                <Rating value={2.3} readOnly precision={0.1} size={size} />
                <Typography variant="caption" display="block">2.3 / 5</Typography>
              </Box>
            </Stack>
          </Box>

          {/* Disabled */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Disabled</Typography>
            <Rating value={3} disabled size={size} />
          </Box>
        </Stack>
      </Box>
    );
  }

  // stars variant (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Star Rating</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Size: {size}
      </Typography>
      <Stack spacing={3}>
        {/* Basic rating */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Basic Rating</Typography>
          <Rating
            value={starValue}
            onChange={(_, newValue) => setStarValue(newValue)}
            size={size}
          />
        </Box>

        {/* With precision */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Half Stars (precision: 0.5)</Typography>
          <Rating
            value={3.5}
            precision={0.5}
            size={size}
          />
        </Box>

        {/* Read-only */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Read-Only</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Rating value={4} readOnly size={size} />
            <Typography variant="body2" color="text.secondary">(4.0)</Typography>
          </Stack>
        </Box>

        {/* No rating */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>No Rating Yet</Typography>
          <Rating value={null} size={size} />
        </Box>

        {/* Disabled */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Disabled</Typography>
          <Rating value={3} disabled size={size} />
        </Box>

        {/* Custom max */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Custom Max (10 stars)</Typography>
          <Rating value={7} max={10} size="small" />
        </Box>
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof RatingsDemo> = {
  title: 'Inputs/Rating',
  component: RatingsDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Rating components for user feedback.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['stars', 'thumbs', 'withLabels', 'customIcons', 'sizes', 'interactive'],
      description: 'Rating variant to display',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the rating',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the rating',
    },
    readOnly: {
      control: 'boolean',
      description: 'Make rating read-only',
    },
    max: {
      control: 'number',
      description: 'Maximum rating value (1-10)',
    },
    precision: {
      control: 'select',
      options: [0.5, 1],
      description: 'Rating precision (half or full stars)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive Rating playground - use Controls to customize.
 * Try changing size, precision, max stars, and toggling read-only.
 */
export const Playground: Story = {
  argTypes: {
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum rating value',
    },
    precision: {
      control: 'select',
      options: [0.5, 1],
      description: 'Rating precision',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Rating size',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only mode',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  render: (args: { max?: number; precision?: number; size?: 'small' | 'medium' | 'large'; readOnly?: boolean; disabled?: boolean }) => (
    <Box sx={{ p: 4 }}>
      <Typography gutterBottom>Rating Playground</Typography>
      <Rating
        defaultValue={3}
        max={args.max}
        precision={args.precision}
        size={args.size}
        readOnly={args.readOnly}
        disabled={args.disabled}
      />
    </Box>
  ),
  args: {
    max: 5,
    precision: 1,
    size: 'medium',
    readOnly: false,
    disabled: false,
  },
};

/**
 * Star rating component.
 */
export const Stars: Story = {
  args: {
    variant: 'stars',
    size: 'small',
  },
};

/**
 * Thumbs up/down rating.
 */
export const Thumbs: Story = {
  args: {
    variant: 'thumbs',
    size: 'small',
  },
};

/**
 * Ratings with labels.
 */
export const WithLabels: Story = {
  args: {
    variant: 'withLabels',
    size: 'small',
  },
};

/**
 * Custom icon ratings.
 */
export const CustomIcons: Story = {
  args: {
    variant: 'customIcons',
    size: 'small',
  },
};

/**
 * Different rating sizes.
 */
export const Sizes: Story = {
  args: {
    variant: 'sizes',
    size: 'small',
  },
};

/**
 * Interactive rating examples.
 */
export const Interactive: Story = {
  args: {
    variant: 'interactive',
    size: 'small',
  },
};
