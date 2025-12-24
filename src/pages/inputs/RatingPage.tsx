import * as React from 'react';
import { Rating, Box, Typography, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const RatingPage: React.FC = () => {
  const [value, setValue] = React.useState<number | null>(3);
  const [hover, setHover] = React.useState(-1);

  const labels: { [index: number]: string } = {
    1: 'Useless', 2: 'Poor', 3: 'Ok', 4: 'Good', 5: 'Excellent',
  };

  return (
    <ComponentPage
      title="Rating"
      description="Ratings provide insight regarding others' opinions and experiences."
    >
      <Section title="Basic">
        <Showcase direction="column">
          <Box>
            <Typography component="legend">Controlled</Typography>
            <Rating value={value} onChange={(_, newValue) => setValue(newValue)} />
          </Box>
          <Box>
            <Typography component="legend">Read only</Typography>
            <Rating value={4} readOnly />
          </Box>
          <Box>
            <Typography component="legend">Disabled</Typography>
            <Rating value={3} disabled />
          </Box>
          <Box>
            <Typography component="legend">No rating</Typography>
            <Rating value={null} />
          </Box>
        </Showcase>
      </Section>

      <Section title="Precision">
        <Showcase direction="column">
          <Rating defaultValue={2.5} precision={0.5} />
          <Rating defaultValue={3.3} precision={0.1} readOnly />
        </Showcase>
      </Section>

      <Section title="Hover Feedback">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Rating
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            onChangeActive={(_, newHover) => setHover(newHover)}
          />
          {value !== null && (
            <Typography>{labels[hover !== -1 ? hover : value]}</Typography>
          )}
        </Box>
      </Section>

      <Section title="Sizes">
        <Showcase direction="column">
          <Rating defaultValue={3} size="small" />
          <Rating defaultValue={3} />
          <Rating defaultValue={3} size="large" />
        </Showcase>
      </Section>

      <Section title="Custom Icons">
        <Showcase direction="column">
          <Rating
            defaultValue={3}
            icon={<FavoriteIcon color="error" />}
            emptyIcon={<FavoriteBorderIcon />}
          />
          <Rating
            defaultValue={4}
            icon={<StarIcon sx={{ color: '#faaf00' }} />}
            emptyIcon={<StarIcon sx={{ opacity: 0.3 }} />}
          />
        </Showcase>
      </Section>

      <Section title="Max Rating">
        <Showcase>
          <Rating defaultValue={5} max={10} />
        </Showcase>
      </Section>
    </ComponentPage>
  );
};
