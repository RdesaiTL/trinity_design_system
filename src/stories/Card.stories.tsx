import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardActions, CardMedia, CardHeader, Typography, Button, Avatar, IconButton, Box, Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { brandColors } from '../tokens';

/**
 * # Card
 * 
 * Cards contain content and actions about a single subject. They're used to
 * display related information in a contained, scannable format.
 * 
 * ## Trinity Design Specs
 * - **Border Radius**: 12px
 * - **Elevation**: Subtle shadow
 * - **Background**: White (#FFFFFF)
 * 
 * ## Usage Guidelines
 * - Use cards to group related information
 * - Keep card content focused on a single topic
 * - Use card actions for primary interactions
 */
const meta: Meta<typeof Card> = {
  title: 'Surfaces/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Cards for displaying grouped content with Trinity styling.',
      },
    },
  },
  argTypes: {
    elevation: {
      control: { type: 'range', min: 0, max: 24 },
      description: 'Shadow depth, corresponds to dp',
    },
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'],
      description: 'The variant to use',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground - use Controls to adjust elevation and variant.
 */
export const Playground: Story = {
  args: {
    elevation: 1,
    variant: 'elevation',
  },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a basic card with some content. Cards are surfaces that display
          content and actions on a single topic.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        <Button size="small" color="primary">Action</Button>
      </CardActions>
    </Card>
  ),
};

/**
 * Basic card with content and actions.
 */
export const Default: Story = {
  args: {
    elevation: 0,
    variant: 'elevation',
  },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a basic card with some content. Cards are surfaces that display
          content and actions on a single topic.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        <Button size="small" color="primary">Action</Button>
      </CardActions>
    </Card>
  ),
};

/**
 * Card with media (image) content.
 */
export const WithMedia: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"
        alt="Data visualization"
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Analytics Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gain insights from your data with our powerful analytics tools.
          Visualize trends and make data-driven decisions.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Dashboard</Button>
        <Button size="small" variant="contained">Get Started</Button>
      </CardActions>
    </Card>
  ),
};

/**
 * Card with header including avatar and actions.
 */
export const WithHeader: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: brandColors.primary.main }}>R</Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Rahul Desai"
        subheader="Product Designer"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Working on the Trinity Design System to create consistent and
          accessible user experiences across all applications.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  ),
};

/**
 * Outlined card variant without elevation.
 */
export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          Featured
        </Typography>
        <Typography variant="h6" gutterBottom>
          Outlined Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card uses the outlined variant with no shadow, just a border.
          Good for subtle grouping of content.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ),
};

/**
 * Interactive card with hover effect.
 */
export const Interactive: Story = {
  render: () => (
    <Card 
      sx={{ 
        maxWidth: 345,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Clickable Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card has hover effects. Try hovering over it to see the
          elevation and transform animation.
        </Typography>
      </CardContent>
    </Card>
  ),
};

/**
 * Grid of cards showing a typical layout.
 */
export const CardGrid: Story = {
  render: () => (
    <Grid container spacing={3}>
      {[
        { title: 'Launch Accelerator', desc: 'Speed up your product launches with data-driven insights.' },
        { title: 'CloudCast', desc: 'Forecasting and scenario planning for life sciences.' },
        { title: 'Terra', desc: 'Territory management and field force optimization.' },
        { title: 'Market Intelligence', desc: 'Real-time market data and competitive analysis.' },
      ].map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards arranged in a responsive grid layout.',
      },
    },
  },
};

/**
 * Cards with branded colors.
 */
export const BrandedCards: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card sx={{ bgcolor: brandColors.primary.main, color: 'white' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Navy Card</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Primary brand color for high-emphasis content.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card sx={{ bgcolor: brandColors.secondary.main, color: brandColors.primary.main }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Coral Card</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Accent color for promotional content.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card sx={{ bgcolor: brandColors.primary.light, color: 'white' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Purple Card</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Secondary accent for special features.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ),
};

/**
 * Complex card with all elements.
 */
export const CompleteCard: Story = {
  render: () => (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: brandColors.secondary.main }}>LA</Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Launch Accelerator"
        subheader="Trinity Life Sciences"
      />
      <CardMedia
        component="img"
        height="200"
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
        alt="Dashboard preview"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Accelerate your pharmaceutical product launches with Trinity's
          comprehensive market intelligence platform. Get real-time insights,
          competitive analysis, and forecasting tools.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" size="small">
          Open App
        </Button>
      </CardActions>
    </Card>
  ),
};
